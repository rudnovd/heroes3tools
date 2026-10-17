<template>
  <section class="creatures-library-page">
    <section class="library-header">
      <div class="towns-anchors">
        <button
          v-for="town in towns"
          :key="town.id"
          :title="town.name"
          @click="router.replace(`#${town.name}`)"
        >
          <img
            :src="`/images/towns/portraits/large/${town.id}.webp`"
            :alt="town.name"
            width="80px"
            height="70px"
          >
        </button>
        <button @click="router.replace(`#${$t('common.neutralTown')}`)">
          <img
            :src="`/images/towns/portraits/large/${0}.webp`"
            :alt="$t('common.neutralTown')"
            width="80px"
            height="70px"
          >
        </button>
      </div>
      <div class="search-creature">
        <input
          name="search-creatures"
          :value="search"
          :placeholder="$t('components.selectUnitModal.searchCreature')"
          @input="setSearch"
        >
      </div>
    </section>
    <div v-for="town in towns" :key="town.name" class="town">
      <h2 :id="town.name" class="town-name">
        {{ town.name }}
      </h2>
      <CreatureCard
        v-for="creature in creatures.filter((creature) => creature.townId === town.id)"
        :key="creature.id"
        :creature="creature"
        :class="{ selected: selectedCreature && creature.id === selectedCreature.id }"
        @click="onSelectCreature"
      />
    </div>
    <div class="town">
      <h2 :id="$t('common.neutralTown')" class="town-name">
        {{ $t('common.neutralCreatures') }}
      </h2>
      <CreatureCard
        v-for="creature in creatures.filter((creature) => creature.townId === 0)"
        :key="creature.id"
        :creature="creature"
        :class="{ selected: selectedCreature && creature.id === selectedCreature.id }"
        @click="onSelectCreature"
      />
    </div>
    <PageFooter border="none" />
  </section>
</template>

<script setup lang="ts">
import type { Creature } from '@/models/Creature'
import type { HeadData } from '@/utilities'
import { useHead } from '@unhead/vue'
import { refDebounced } from '@vueuse/core'
import { computed, defineAsyncComponent, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAppLocale } from '@/i18n'
import { useStore } from '@/store'
import { getHead } from '@/utilities'

const CreatureCard = defineAsyncComponent(() => import('@/components/creaturesLibrary/CreatureCard.vue'))
const PageFooter = defineAsyncComponent(() => import('@/components/PageFooter.vue'))

definePage({
  beforeEnter: async (to) => {
    const head = await import(`@/assets/head/${getAppLocale()}/creatures.ts`) as { default: HeadData }
    if (head.default) {
      to.meta.head = head.default
    }
  },
})
const route = useRoute('/[[locale]]/creatures')
if (route.meta.head) {
  useHead(
    getHead(route.meta.head),
    { onRendered() { document.documentElement.dataset.prerenderReady = window.location.pathname } },
  )
}

const store = useStore()
const towns = computed(() => store.towns)
const creatures = computed(() => store.creatures)

const selectedCreature = ref<Creature | null>(null)
const search = ref('')
const debouncedSearch = refDebounced(search, 500)

const router = useRouter()
function keyboardSearch(value: KeyboardEvent) {
  if (value.key === 'Enter') {
    if (search.value.length > 0) {
      search.value = ''
    }
    else if (route.hash.length > 0) {
      router.replace({ hash: '' })
    }
  }
}

document.addEventListener('keyup', keyboardSearch)
onUnmounted(() => {
  document.removeEventListener('keyup', keyboardSearch)
})

watch(debouncedSearch, (searchValue) => {
  if (!searchValue.length)
    return

  const searchQuery = searchValue.trim().toLowerCase()
  const foundCreature = creatures.value.find((creature: Creature) => {
    return creature.name.toLowerCase().includes(searchQuery)
  })

  if (foundCreature) {
    router.replace({ hash: `#${foundCreature.name.replaceAll(' ', '')}` })
  }
})

function setSearch(event: Event) {
  const target = event.target as HTMLInputElement
  search.value = target.value
}

function onSelectCreature(creature: Creature) {
  if (selectedCreature.value && selectedCreature.value.id === creature.id) {
    selectedCreature.value = null
  }
  else {
    selectedCreature.value = creature
  }
}
</script>

<style>
.creatures-library-page {
  min-width: 20rem;
  max-width: 120rem;
  padding: 0 0.5rem 1rem;
  margin: 0 auto;
  @media screen and (width >= 768px) {
    padding: 0 1.5rem 1rem;
  }
  .library-header {
    display: flex;
    flex-direction: row;
  }
  .search-creature {
    position: fixed;
    right: 1rem;
    input {
      width: 7.5rem;
      height: 2rem;
      padding: 0.25rem 0.5rem;
      font-family: inherit;
      font-size: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--color-text);
      background: var(--color-bg-deep);
      border: 1px solid var(--color-text);
      border-radius: 0.25rem;
      transition: opacity 0.25s;
      transition:
        color 0.2s linear,
        background-color 0.2s linear,
        border 0.2s linear;
      &:hover {
        opacity: 1;
      }
      @media screen and (width >= 768px) {
        width: 10.625rem;
      }
    }
  }
  .towns-anchors {
    display: grid;
    grid-template-columns: repeat(4, 5rem);
    gap: 0.3125rem;
    img {
      cursor: pointer;
      &:hover {
        filter: contrast(110%);
      }
    }
  }
  .town {
    display: grid;
    grid-template-columns: 100%;
    margin-bottom: 3rem;
    &:nth-last-child(-n + 2) {
      margin-bottom: 0;
    }
    @media screen and (width >= 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .town-name {
    grid-column: 1 / -1;
    margin-bottom: 1rem;
    text-align: center;
  }
  .creature-card {
    &:nth-child(2),
    &:nth-child(3) {
      border-top: 1px solid var(--color-text);
    }
  }
}
</style>
