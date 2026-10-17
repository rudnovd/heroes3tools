<template>
  <section class="index-page">
    <h1 class="page-title">
      Heroes III tools
    </h1>
    <ul class="pages-list">
      <li v-for="page in pages" :key="page.path" class="pages-list__item">
        <router-link class="pages-list__item-link" :to="page.path">
          <img
            class="pages-list__item-img"
            :src="`/images/pages/home/${page.image}.webp`"
            :alt="page.name"
            width="176px"
            height="198px"
            draggable="false"
          >
          <h2 class="pages-list__item-title">
            {{ page.name }}
          </h2>
        </router-link>
      </li>
    </ul>
    <PageFooter />
  </section>
</template>

<script setup lang="ts">
import type { HeadData } from '@/utilities'
import { useHead } from '@unhead/vue'
import { computed, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { getAppLocale } from '@/i18n'
import { getHead } from '@/utilities'

definePage({
  beforeEnter: async (to) => {
    const head = await import(`@/assets/head/${getAppLocale()}/index.ts`) as { default: HeadData }
    if (head.default) {
      to.meta.head = head.default
    }
  },
})

const PageFooter = defineAsyncComponent(() => import('@/components/PageFooter.vue'))

const route = useRoute('/[[locale]]/')
if (route.meta.head) {
  useHead(
    getHead(route.meta.head),
    { onRendered() { document.documentElement.dataset.prerenderReady = window.location.pathname } },
  )
}

const { t } = useI18n()
const pages = computed(() => [
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
])
</script>

<style>
.index-page {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: 1rem;
  min-width: 18.75rem;
  min-height: calc(100dvh - env(safe-area-inset-bottom));
  margin: 0 auto;
  @media screen and (width >= 768px) {
    align-content: center;
    padding-bottom: unset;
  }
  @media screen and (width >= 1280px) {
    grid-template-rows: 1fr 2fr 1.875rem;
  }
  .page-title {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.125rem;
  }
  .pages-list {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: min-content;
    gap: 1rem;
    place-items: start center;
    padding: 0 1rem 1rem;
    @media screen and (width >= 768px) {
      grid-template-columns: repeat(2, minmax(18.75rem, 1fr));
      justify-content: center;
    }
    @media screen and (width >= 1280px) {
      grid-template-columns: repeat(3, minmax(18.75rem, 25rem));
      gap: 3rem;
      padding: 0;
    }
    .pages-list__item {
      width: 100%;
      max-width: 25rem;
      user-select: none;
      box-shadow:
        0 0 0 0.125rem rgb(0 0 0),
        0 0 0 0.1875rem rgb(124 111 64),
        0 0 0 0.25rem rgb(255 251 139),
        0 0 0 0.3125rem rgb(138 121 74),
        0 0 0 0.375rem rgb(114 90 44),
        0 0 0 0.4375rem rgb(33 27 23);
      transition:
        filter 0.5s,
        box-shadow 0.5s,
        transform 0.5s;
      .pages-list__item-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: oklch(100% 0.0001 271.152deg);
        text-decoration: none;
        background: url('/images/pages/home/links-background.webp');
        background-position-y: -0.0625rem;
        transition: transform 0.15s linear;
      }
      .pages-list__item-img {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pages-list__item-title {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      &:hover {
        box-shadow:
          0 0 0 0.125rem rgb(0 0 0),
          0 0 0 0.1875rem rgb(124 111 64),
          0 0 0 0.375rem rgb(255 251 139),
          0 0 0 0.3125rem rgb(138 121 74),
          0 0 0 0.375rem rgb(114 90 44),
          0 0 0 0.4375rem rgb(33 27 23);
        filter: contrast(110%);
        transform: translateY(-0.3125rem);
        .pages-list__item-title {
          text-decoration: underline;
          transform: translateY(-0.125rem);
        }
      }
    }
  }
}
</style>
