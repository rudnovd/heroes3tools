<template>
  <header>
    <nav>
      <router-link v-for="link in links" :key="link.link" :to="link.link" active-class="active-link" class="link">
        <img :src="link.image" :alt="t(link.name)" height="32" :title="t(link.name)" />
      </router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const route = useRoute()
const { t } = useI18n()

const links = computed(() => {
  if (route.path === '/') return []

  return [
    {
      name: 'pages.home',
      link: '/',
      image: '/spells/book/TownPortal.webp',
    },
    {
      name: 'pages.damageCalculator',
      link: '/damage',
      image: '/secondary-skills/Offense-Expert.webp',
    },
    {
      name: 'pages.magicCalculator',
      link: '/magic',
      image: '/secondary-skills/FireMagic-Expert.webp',
    },
    {
      name: 'pages.library',
      link: '/library',
      image: '/secondary-skills/Scholar-Expert.webp',
    },
  ]
})
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  gap: 0.5rem;
}

.link {
  filter: grayscale(1);
  transition: filter 0.2s ease-in;

  &:hover {
    filter: grayscale(0.5);
  }
}

.active-link {
  filter: unset;
}
</style>
