<template>
  <main>
    <h1>Heroes III tools</h1>

    <section>
      <article v-for="page in pages" :key="page.link">
        <picture @click="router.push(page.link)">
          <img :src="`${page.image}.webp`" :alt="t(page.name)" width="176" height="198" />
        </picture>

        <h2>
          <router-link v-t="page.name" :to="page.link" />
        </h2>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()

const pages = [
  {
    name: 'pages.damageCalculator',
    link: '/damage',
    image: '/secondary-skills/Offense-Expert_upscayled',
  },
  {
    name: 'pages.magicCalculator',
    link: '/magic',
    image: '/secondary-skills/FireMagic-Expert_upscayled',
  },
  {
    name: 'pages.creaturesLibrary',
    link: '/creatures',
    image: '/secondary-skills/Scholar-Expert_upscayled',
  },
]
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: 2rem;
  align-items: start;
  padding: 0 16px 16px;
}

h1 {
  text-align: center;
}

section {
  display: grid;
  gap: 1rem;
  justify-items: center;

  @include media-medium {
    grid-template-columns: repeat(2, 1fr);
  }

  @include media-large {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

article {
  display: grid;
  grid-template-rows: 200px 3rem;
  grid-auto-columns: 100%;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgb(0, 0, 0);
  box-shadow: 0 0 8px rgb(0, 0, 0);
  transition: filter 1s ease-out, box-shadow 1s ease-out, transform 1s ease-out;

  picture {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    background: url('/backgrounds/base-window.webp');

    &:hover {
      cursor: pointer;
    }
  }

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.5rem;
  }

  a {
    overflow: hidden;
    color: var(--color-text);
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    filter: contrast(110%);
    box-shadow: 0 0 20px rgb(0, 0, 0);
    transform: translateY(-8px);

    a {
      text-decoration: underline;
    }
  }
}
</style>
