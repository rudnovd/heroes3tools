<template>
  <footer>
    <router-link v-if="!about.hide" to="#about">
      {{ about.text || t('components.pageFooter.about') }}
    </router-link>

    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="locale in locales" :key="locale.name" :value="locale.name">
        {{ locale.value }}
      </option>
    </select>

    <slot></slot>

    <router-link to="send-error" class="send-error-link">
      {{ t('components.pageFooter.foundAnError') }}
    </router-link>

    <router-link to="#license">
      {{ t('components.pageFooter.licenseInformation') }}
    </router-link>

    <a href="https://github.com/rudnovd/heroes3tools" target="_blank" rel="noopener">
      {{ t('components.pageFooter.sourceCode') }}
    </a>

    <span>{{ t('components.pageFooter.appVersion') }}: {{ appVersion }}</span>

    <div class="theme-switch">
      <input id="mode-input" type="checkbox" :value="isDark" @change="isDark = !isDark" />
      <label for="mode-input">
        <span v-if="isDark" role="img" aria-label="Dark mode">🌒</span>
        <span v-else role="img" aria-label="Light mode">☀️</span>
      </label>
    </div>
  </footer>

  <RouterView v-slot="{ route }">
    <BaseDialog v-if="route.hash === '#about'" show size="small" @close="router.go(-1)">
      <template #content>
        <slot name="aboutModal"></slot>
      </template>
    </BaseDialog>
  </RouterView>

  <RouterView v-slot="{ route }">
    <BaseDialog v-if="route.hash === '#license'" show @close="router.go(-1)">
      <template #content>
        <p>{{ t('components.pageFooter.license.1') }}</p>
        <i18n-t keypath="components.pageFooter.license.2" tag="p">
          <template #url>
            <a href="https://github.com/rudnovd" target="_blank">https://github.com/rudnovd</a>
          </template>
        </i18n-t>
        <p>{{ t('components.pageFooter.license.3') }}</p>
        <p>{{ t('components.pageFooter.license.4') }}</p>
        <p>{{ t('components.pageFooter.license.5') }}</p>
      </template>
    </BaseDialog>
  </RouterView>
</template>

<script lang="ts">
import { selectedLanguage, setLanguage } from '@/i18n'
import { isDark } from '@/utilities'
import { defineAsyncComponent, defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageFooter',
  components: {
    BaseDialog: defineAsyncComponent(() => import('@/components/base/BaseDialog.vue')),
  },
  props: {
    about: {
      type: Object as PropType<{ hide?: boolean; text?: string }>,
      default: () => ({ hide: false, text: null }),
    },
    border: {
      type: String,
      default: '1px solid var(--color-border)',
    },
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const selectedLocale = ref(selectedLanguage.value)
    const locales = ref([
      {
        name: 'en',
        value: 'English',
      },
      {
        name: 'ru',
        value: 'Русский',
      },
    ])

    const changeLocale = (event: Event) => {
      const value = (event.target as HTMLButtonElement).value
      setLanguage(value).then(() => (document.title = t(route.meta.title as string)))
    }

    return {
      t,
      isDark,
      router,

      locales,
      selectedLocale,
      appVersion: import.meta.env.__APP_VERSION__,

      changeLocale,
    }
  },
})
</script>

<style lang="scss">
footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  min-width: 300px;
  padding: 4px 8px;
  font-size: 0.875rem;
  color: var(--color-link);
  border-top: v-bind(border);
  transition: border-top 0.2s linear;

  & > * {
    flex: 0 0 calc(50% - 8px);
  }

  & > *:nth-child(even) {
    text-align: right;
  }

  @include media-large {
    gap: 16px;

    & > * {
      flex: unset;
      text-align: unset;
    }

    .send-error-link {
      margin-left: auto;
    }
  }

  a,
  button,
  span,
  select {
    color: inherit;
    text-align: left;
  }

  select {
    padding: 0;
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.theme-switch {
  & > input[type='checkbox'] {
    display: none;
    appearance: none;
  }

  label {
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
