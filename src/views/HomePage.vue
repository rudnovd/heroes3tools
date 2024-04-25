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
        <p>{{ t('components.homePage.aboutModal') }}</p>
      </template>
    </PageFooter>
  </section>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const ObjectPortrait = defineAsyncComponent(() => import('@/components/ObjectPortrait.vue'))
const PageFooter = defineAsyncComponent(() => import('@/components/PageFooter.vue'))

const props = defineProps<{ head: string }>()
useHead(JSON.parse(props.head))

const { t } = useI18n()
const router = useRouter()

const pages = [
  {
    name: t('pages.damageCalculator'),
    path: '/damage',
    image: 'Tactics',
  },
  {
    name: t('pages.magicCalculator'),
    path: 'magic',
    image: 'Water',
  },
  {
    name: t('pages.creaturesLibrary'),
    path: 'creatures',
    image: 'Scholar',
  },
]
</script>

<style lang="scss" scoped>
.home-page {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: 16px;
  min-width: 300px;
  min-height: calc(100dvh - 2rem);
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
    text-transform: uppercase;
    letter-spacing: 2px;
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
  box-shadow:
    0 0 0 2px rgb(0, 0, 0),
    0 0 0 3px rgb(124, 111, 64),
    0 0 0 4px rgb(255, 251, 139),
    0 0 0 5px rgb(138, 121, 74),
    0 0 0 6px rgb(114, 90, 44),
    0 0 0 7px rgb(33, 27, 23);
  transition:
    filter 0.5s,
    box-shadow 0.5s,
    transform 0.5s;

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
    box-shadow:
      0 0 0 2px rgb(0, 0, 0),
      0 0 0 3px rgb(124, 111, 64),
      0 0 0 6px rgb(255, 251, 139),
      0 0 0 5px rgb(138, 121, 74),
      0 0 0 6px rgb(114, 90, 44),
      0 0 0 7px rgb(33, 27, 23);
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
