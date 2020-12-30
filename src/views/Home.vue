<template>
  <section class="home-page">
    <header class="page-title">
      <h1>Heroes III tools</h1>
    </header>

    <main class="page-links">
      <div v-for="page in pages" :key="page.path" class="link-card" :class="{ disabled: page.disabled }">
        <div class="link-image" @click="router.push(page.path)">
          <picture>
            <source :srcset="`${page.image.path}.webp`" type="image/webp" />
            <source :srcset="`${page.image.path}.avif`" type="image/avif" />
            <source :srcset="`${page.image.path}.png`" type="image/png" />
            <img
              :src="page.image.path"
              :alt="page.name"
              :width="page.image.width"
              :height="page.image.height"
              loading="lazy"
            />
          </picture>
        </div>

        <div class="link-name">
          <h2>
            <router-link :to="page.path">{{ page.name }}</router-link>
          </h2>
        </div>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Home',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const pages = [
      {
        name: t('pages.damageCalculator'),
        path: '/damage',
        image: {
          path: '/images/pages/home/Tactics',
          height: 198,
          width: 176,
        },
      },
      {
        name: t('pages.magicCalculator'),
        path: '/magic',
        image: {
          path: '/images/pages/home/Water',
          height: 198,
          width: 176,
        },
        disabled: true,
      },
      {
        name: t('pages.creaturesLibrary'),
        path: '/creatures',
        image: {
          path: '/images/pages/home/Scholar',
          height: 198,
          width: 176,
        },
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
  align-items: center;
  justify-content: center;
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
}

.page-title {
  text-align: center;
}

.page-links {
  display: grid;
  user-select: none;
  grid-template-columns: clamp(200px, 50vw, 400px);
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  gap: 1rem;

  @include media-medium {
    grid-template-columns: repeat(3, clamp(200px, 25vw, 400px));
    grid-template-rows: 1fr;
    gap: 3rem;
  }
}

.link-card {
  box-shadow: 0 0 10px black;
  display: flex;
  flex-direction: column;
  height: 200px;
  transition: filter 1s, box-shadow 1s, transform 1s;

  @include media-large {
    height: 300px;
  }

  &:hover {
    filter: contrast(110%);
    box-shadow: 0 0 20px black;
    transform: translateY(-5px);

    .link-name {
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

.link-image,
.link-name {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.link-image {
  height: 80%;
  background: url('/images/pages/home/links-background.webp');
  background-position-y: -1px;
  cursor: pointer;
}

.link-image img {
  height: 100px;
  width: auto;

  @include media-large {
    height: auto;
    width: auto;
  }
}

.link-name {
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  transition: transform 0.15s linear;
}

.link-name a {
  color: black;
  text-decoration: none;
}

.link-name {
  height: 20%;
}
</style>
