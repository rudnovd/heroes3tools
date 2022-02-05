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
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

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
      },
    ]

    return {
      router,

      pages,
    }
  },
})
</script>

<style lang="scss" scoped>
.home-page {
  display: grid;
  margin: 0 auto;
  gap: 16px;
  min-width: 300px;
  padding-bottom: 16px;
  height: 100%;
  grid-auto-rows: min-content;

  @include media-small {
    align-content: center;
    padding-bottom: unset;
  }

  h1 {
    text-align: center;
  }
}

.page-links {
  display: grid;
  grid-template-columns: 90%;
  justify-content: center;
  gap: 1rem;
  user-select: none;

  @include media-small {
    grid-template-columns: repeat(3, clamp(200px, 25vw, 400px));
  }

  @include media-medium {
    gap: 3rem;
  }
}

.link-card {
  box-shadow: 0 0 8px black;
  display: grid;
  grid-template-rows: 1fr 3rem;
  height: 200px;
  text-align: center;
  transition: filter 1s, box-shadow 1s, transform 1s;
  cursor: pointer;

  @include media-large {
    height: 300px;
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

  picture {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/images/pages/home/links-background.webp');
    background-position-y: -1px;

    img {
      height: 100px;

      @include media-large {
        height: auto;
      }
    }
  }

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: transform 0.15s linear;

    & a {
      color: black;
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: transform 0.15s linear;
    }
  }
}
</style>
