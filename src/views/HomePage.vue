<template>
  <section class="home-page">
    <h1>Heroes III tools</h1>

    <main class="page-links">
      <div v-for="page in pages" :key="page.path" class="link-card">
        <ObjectPortrait
          folder="/images/pages/home"
          :file="{ name: page.image, alt: page.image }"
          :width="176"
          :height="198"
          @click-picture="router.push(page.path)"
        />

        <h2>
          <router-link :to="page.path">{{ page.name }}</router-link>
        </h2>
      </div>
    </main>

    <PageFooter>
      <template #aboutModal>
        <h2>{{ t('components.homePage.data.1') }}</h2>
        <p>{{ t('components.homePage.data.2') }}</p>

        <i18n-t keypath="components.homePage.data.3" tag="p">
          <template #email>
            <a href="mailto:7fudz69mu@mozmail.com" target="_blank">7fudz69mu@mozmail.com</a>
          </template>
        </i18n-t>
      </template>
    </PageFooter>
  </section>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HomePage',
  components: {
    ObjectPortrait: defineAsyncComponent(() => import('@/components/ObjectPortrait.vue')),
    PageFooter: defineAsyncComponent(() => import('@/components/PageFooter.vue')),
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const pages = computed(() => [
      {
        name: t('pages.damageCalculator'),
        path: '/damage',
        image: 'Tactics',
      },
      {
        name: t('pages.magicCalculator'),
        path: '/magic',
        image: 'Water',
      },
      {
        name: t('pages.creaturesLibrary'),
        path: '/creatures',
        image: 'Scholar',
      },
    ])

    return {
      t,
      router,

      pages,
    }
  },
})
</script>

<style lang="scss" scoped>
.home-page {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: 16px;
  min-width: 300px;
  min-height: 100vh;
  margin: 0 auto;
  content-visibility: auto;
  contain-intrinsic-size: 100vh;

  @include media-medium {
    align-content: center;
    padding-bottom: unset;
  }

  @include media-large {
    grid-template-rows: 1fr 2fr 30px;
  }

  & > h1 {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
}

.page-links {
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: min-content;
  gap: 1rem;
  align-items: start;
  justify-items: center;
  padding: 0px 16px 16px;

  @include media-medium {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    justify-content: center;
  }

  @include media-large {
    grid-template-columns: repeat(3, minmax(300px, 400px));
    gap: 3rem;
    padding: 0;
  }
}

.link-card {
  display: grid;
  grid-template-rows: 200px 3rem;
  width: 100%;
  max-width: 400px;
  user-select: none;
  box-shadow: 0 0 8px black;
  transition:
    filter 1s,
    box-shadow 1s,
    transform 1s;

  picture {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/images/pages/home/links-background.webp');
    background-position-y: -1px;

    &:hover {
      cursor: pointer;
    }
  }

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: transform 0.15s linear;
  }

  a,
  span {
    overflow: hidden;
    color: var(--color-text);
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: transform 0.15s linear;
  }

  &:hover {
    filter: contrast(110%);
    box-shadow: 0 0 20px black;
    transform: translateY(-5px);

    h2 {
      transform: translateY(-2px);
    }

    a {
      text-decoration: underline;
    }
  }
}
</style>
