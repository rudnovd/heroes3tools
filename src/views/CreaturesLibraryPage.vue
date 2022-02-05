<template>
  <section class="creatures-library-page">
    <div class="library-header">
      <div class="towns-anchors">
        <ObjectPortrait
          v-for="town in towns.slice(0, 10)"
          :key="town.id"
          :object="town"
          folder="/images/towns/portraits/large"
          width="80px"
          height="70px"
          @click="router.replace(`#${town.name}`)"
        />
        <ObjectPortrait
          :object="{ id: 0, name: 'Neutral' }"
          folder="/images/towns/portraits/large"
          width="80px"
          height="70px"
          @click="router.replace(`#Neutral`)"
        />
      </div>

      <div class="search-creature">
        <input ref="searchInput" v-model="search" placeholder="Search creature" @input="searchUnit" />
      </div>
    </div>

    <div v-for="town in towns.slice(0, 10)" :key="town.name" class="town">
      <h2 :id="town.name" class="town-name">{{ town.name }}</h2>
      <CreatureCard
        v-for="creature in creatures.filter((creature) => creature.townId === town.id)"
        :key="creature.id"
        :creature="creature"
        :class="{ selected: selectedCreature && creature.id === selectedCreature.id }"
        @click="onSelectCreature"
      />
    </div>
    <div class="town">
      <h2 id="Neutral" class="town-name">Neutral</h2>
      <CreatureCard
        v-for="creature in creatures.filter((creature) => creature.townId === 0)"
        :key="creature.id"
        :creature="creature"
        :class="{ selected: selectedCreature && creature.id === selectedCreature.id }"
        @click="onSelectCreature"
      />
    </div>
  </section>
</template>

<script lang="ts">
import CreatureCard from '@/components/creaturesLibrary/CreatureCard.vue'
import ObjectPortrait from '@/components/ObjectPortrait.vue'
import { Creature } from '@/models/Creature'
import { useStore } from '@/store'
import { computed, defineComponent, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

let searchTimeout = 0

export default defineComponent({
  name: 'CreaturesLibraryPage',
  components: {
    CreatureCard,
    ObjectPortrait,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const towns = computed(() => store.towns)
    const creatures = computed(() => store.creatures)

    const selectedCreature = ref<Creature | null>(null)
    const search = ref('')
    const searchInput = ref()

    if (!store.isDataLoaded) store.initData()

    const keyboardSearch = (value: KeyboardEvent) => {
      if (value.key === 'Enter') {
        if (search.value.length > 0) {
          searchUnit()
          search.value = ''
        } else if (route.hash.length > 0) {
          router.replace({ hash: '' })
        }
      } else {
        searchUnit()
      }
    }

    document.addEventListener('keyup', keyboardSearch)
    onUnmounted(() => {
      document.removeEventListener('keyup', keyboardSearch)
    })

    const searchUnit = () => {
      if (!search.value.length) {
        return
      }

      if (searchTimeout) {
        clearTimeout(searchTimeout)
        searchTimeout = 0
      }

      if (search.value.length) {
        const foundCreature = creatures.value.find((creature: Creature) => {
          return creature.name.toLowerCase().indexOf(search.value.trim().toLowerCase()) > -1
        })

        if (foundCreature) {
          router.replace({ hash: `#${foundCreature.name}` })
        }
      }
    }

    const onSelectCreature = (creature: Creature) => {
      if (selectedCreature.value && selectedCreature.value.id === creature.id) {
        selectedCreature.value = null
      } else {
        selectedCreature.value = creature
      }
    }

    return {
      router,
      towns,
      creatures,

      search,
      selectedCreature,
      searchInput,

      searchUnit,
      onSelectCreature,
    }
  },
})
</script>

<style lang="scss">
.creatures-library-page {
  display: flex;
  margin: 20px auto 0 auto;
  flex-direction: column;
  min-width: 320px;
  max-width: min(90%, 1920px);
}

.library-header {
  display: flex;
  flex-direction: row;
}

.search-creature {
  position: fixed;
  right: 16px;

  input {
    min-width: 150px;
    height: 32px;
    opacity: 0.5;
    transition: opacity 0.25s;

    &:hover {
      opacity: 1;
    }
  }
}

.towns-anchors {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(4, 80px);

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

  @include media-medium {
    grid-template-columns: 1fr 1fr;
  }
}

.town-name {
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 1rem;
}

.creature-card {
  &:nth-child(2),
  &:nth-child(3) {
    border-top: 1px solid black;
  }
}
</style>
