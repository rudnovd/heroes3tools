<template>
  <section class="home-page">
    <h1>Heroes III tools</h1>

    <section class="page-links">
      <div v-for="page in pages" :key="page.path" class="link-card" :class="{ disabled: page.disabled }">
        <picture @click="router.push(page.path)">
          <source :srcset="`${page.image}.webp`" type="image/webp" />
          <source :srcset="`${page.image}.avif`" type="image/avif" />
          <source :srcset="`${page.image}.png`" type="image/png" />
          <img :src="page.image" :alt="page.name" loading="lazy" decoding="async" />
        </picture>

        <h2>
          <router-link :to="page.path">{{ page.name }}</router-link>
        </h2>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const pages = [
      {
        name: t('pages.damageCalculator'),
        path: '/damage',
        image: '/images/pages/home/Tactics',
      },
      {
        name: t('pages.magicCalculator'),
        path: '/magic',
        image: '/images/pages/home/Water',
        disabled: true,
      },
      {
        name: t('pages.creaturesLibrary'),
        path: '/creatures',
        image: '/images/pages/home/Scholar',
        disabled: true,
      },
    ]

    return { pages, router }
  },
})
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  display: grid;
  grid-template-rows: 4rem 1fr 1fr 1fr;
  overflow: auto;
  margin: 0 auto 0 auto;
  min-width: 300px;
  padding-top: 2rem;
  align-content: flex-start;
  margin: auto;
  max-width: min(95%, 2000px);

  @include media-medium {
    grid-template-rows: 8rem auto;
    padding-top: 0;
    align-content: center;
  }

  & h1 {
    text-align: center;
  }
}

.page-links {
  display: grid;
  grid-template-columns: clamp(200px, 50vw, 400px);
  grid-template-rows: repeat(3, 1fr);
  justify-content: center;
  gap: 1rem;
  user-select: none;

  @include media-medium {
    grid-template-columns: repeat(3, clamp(200px, 25vw, 400px));
    grid-template-rows: 1fr;
    gap: 3rem;
  }
}

.link-card {
  box-shadow: 0 0 10px black;
  display: grid;
  grid-template-rows: auto 2.6rem;
  height: 200px;
  text-align: center;
  transition: filter 1s, box-shadow 1s, transform 1s;

  @include media-large {
    height: 300px;
  }

  & picture {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/images/pages/home/links-background.webp');
    background-position-y: -1px;
    cursor: pointer;

    & img {
      color: white;
      height: 100px;
      width: auto;

      @include media-large {
        height: auto;
      }
    }
  }

  & h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: transform 0.15s linear;

    & a {
      color: black;
      text-decoration: none;
    }
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

  &.disabled {
    filter: grayscale(1);
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
