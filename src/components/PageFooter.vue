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
      <button @click="foundErrorModal = true">
        {{ t('components.pageFooter.foundAnError') }}
      </button>

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

    <BaseDialog v-if="foundErrorModal" :show="foundErrorModal" @close="foundErrorModal = false">
      <template #content>
        <p>
          Send issue in
          <a href="https://github.com/rudnovd/heroes3tools/issues" target="_blank" rel="noopener">Github</a>
          or use anonymous form:
        </p>

        <form class="send-error" name="send-error" method="POST" netlify>
          <textarea name="error" :placeholder="t('components.pageFooter.sendErrorForm.placeholder')" />
          <button class="send-error-button" type="submit">
            {{ t('components.pageFooter.sendErrorForm.button') }}
          </button>
        </form>
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
import { defineAsyncComponent, defineComponent, PropType, ref } from 'vue'
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
    const foundErrorModal = ref(false)
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
      foundErrorModal,
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

.send-error {
  display: flex;
  flex-direction: column;
  gap: 8px;

  textarea {
    height: 100px;
    font: inherit;
    border: 1px solid #dee2e6;
  }

  .send-error-button {
    max-width: 200px;
    font-weight: bold;
    line-height: 1.5;
    color: $color-attacker-text;
    background-color: $color-attacker;
    border: 1px solid $color-attacker;
    border-radius: 5px;
  }
}
</style>
