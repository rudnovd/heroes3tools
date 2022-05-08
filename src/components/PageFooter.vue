<template>
  <footer>
    <div class="left-side">
      <button v-if="!about.hide" @click="showAboutModal = true">
        {{ about.text || t('components.pageFooter.about') }}
      </button>

      <select v-model="selectedLocale" @change="changeLocale">
        <option v-for="locale in locales" :key="locale.name" :value="locale.name">
          {{ locale.value }}
        </option>
      </select>

      <slot></slot>
    </div>

    <div class="right-side">
      <router-link to="send-error">
        {{ t('components.pageFooter.foundAnError') }}
      </router-link>

      <button @click="showLicenseModal = true">
        {{ t('components.pageFooter.licenseInformation') }}
      </button>

      <a href="https://github.com/rudnovd/heroes3tools" target="_blank" rel="noopener">
        {{ t('components.pageFooter.sourceCode') }}
      </a>

      <span>{{ t('components.pageFooter.appVersion') }}: {{ appVersion }}</span>
    </div>

    <BaseDialog v-if="showAboutModal" :show="showAboutModal" size="small" @close="showAboutModal = false">
      <template #content>
        <slot name="aboutModal"></slot>
      </template>
    </BaseDialog>

    <BaseDialog v-if="showLicenseModal" :show="showLicenseModal" @close="showLicenseModal = false">
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
  </footer>
</template>

<script lang="ts">
import { selectedLanguage, setLanguage } from '@/i18n'
import type { PropType } from 'vue'
import { defineAsyncComponent, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

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
      default: '1px solid rgb(222, 226, 230)',
    },
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()

    const showAboutModal = ref(false)
    const showLicenseModal = ref(false)
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

      locales,
      selectedLocale,
      showLicenseModal,
      showAboutModal,
      appVersion: import.meta.env.__APP_VERSION__,

      changeLocale,
    }
  },
})
</script>

<style lang="scss">
footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-width: 300px;
  padding: 4px 8px;
  font-size: 0.875rem;
  border-top: v-bind(border);

  a,
  button,
  span,
  select {
    color: rgb(108, 117, 125);
  }

  a,
  button {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

footer span {
  text-align: end;
}

footer select {
  padding: 0;
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.left-side,
.right-side {
  display: grid;
  grid-template-columns: max-content;
  grid-auto-flow: row;

  @include media-medium {
    grid-auto-flow: column;
    gap: 0 16px;
  }
}

.left-side {
  justify-content: start;

  & > * {
    text-align: left;
  }
}

.right-side {
  justify-content: end;

  & > * {
    text-align: right;
  }
}

.modal-content p {
  margin-bottom: 1rem;
}
</style>
