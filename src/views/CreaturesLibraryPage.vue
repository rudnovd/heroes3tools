<!-- <template>
  <section class="creatures-library-page">
    <div class="library-header">
      <div class="towns-anchors">
        <img
          v-for="town in data.towns"
          :key="town.id"
          :src="`images/towns_portraits/large/${town.name.en}.webp`"
          width="80"
          height="70"
          @click="$router.push({ path: `#${town.name.en}` })"
        />
      </div>

      <div class="search-creature">
        <input :value="search" placeholder="Search creature" @input="searchUnit" />
      </div>
    </div>

    <div v-for="town in data.towns" :key="town.name.en" class="town">
      <h2 :id="town.name.en" class="town-name">{{ town.name[$i18n.locale] }}</h2>
      <CreatureCard
        v-for="creature in data.creatures.filter((creature) => creature.townId === town.id)"
        :id="creature.name.en.replace(/\s/g, '_')"
        :key="creature.id"
        :image-path="`images/creatures/${creature.name.en.replace(/\s/g, '_')}.webp`"
        :creature-data="creature"
        :class="{ selected: creature.id === selectedCreature.id }"
        @click="$event.id === selectedCreature.id ? (selectedCreature = {}) : (selectedCreature = $event)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import type { Creature } from '@/models/Creature'
import CreatureCard from '@/components/creaturesLibrary/CreatureCard.vue'

export default defineComponent({
  name: 'CreaturesLibrary',
  components: {
    CreatureCard,
  },
  data() {
    return {
      selectedCreature: {},
      search: '',
      searchTimeout: 0,
    }
  },
  computed: {
    ...mapGetters({
      data: 'data/data',
    }),
  },
  created() {
    document.addEventListener('keyup', this.keyboardSearch)
    this.getCreatures()
    this.getTowns()
  },
  unmounted() {
    document.removeEventListener('keyup', this.keyboardSearch)
  },
  methods: {
    ...mapActions({
      getCreatures: 'data/getCreatures',
      getTowns: 'data/getTowns',
    }),
    keyboardSearch(value: KeyboardEvent): void {
      if (value.keyCode === 8) {
        this.search = this.search.slice(0, this.search.length - 1)
      } else if (value.keyCode === 13) {
        if (this.search.length > 0) {
          this.search = ''
        } else {
          if (this.$route.hash.length > 0) {
            this.$router.push({ path: this.$route.path })
          }
          window.scrollTo(0, 0)
        }
      } else if (value.keyCode > 64 && value.keyCode < 91) {
        this.search += value.key
        this.searchUnit()
      }
    },
    searchUnit(): void {
      if (!this.search.length) {
        return
      }

      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = 0
      }

      if (this.search.length) {
        const creatures = this.data.creatures.filter((creature: any) => {
          const creatureName = creature.name[this.$i18n.locale].toLowerCase()
          const searchValue = this.search.toLowerCase()
          return creatureName.indexOf(searchValue) > -1
        })

        if (creatures.length) {
          if (this.$route.hash !== `#${creatures[0].name.en.replace(/\s/g, '_')}`) {
            this.$router.push({ path: `#${creatures[0].name.en.replace(/\s/g, '_')}` })
          }
        }
      }
    },
  },
})
</script>

<style lang="scss">
.creatures-library-page {
  display: flex;
  margin: 20px auto 0 auto;
  flex-direction: column;
  min-width: 320px;
  max-width: 90%;

  @include media-large {
    max-width: 80%;
  }

  @include media-large {
    max-width: 60%;
  }
}

.library-header {
  display: flex;
  flex-direction: row;
}

.search-creature {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-left: auto;
  flex: 0 0 30%;

  input {
    min-width: 150px;
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

.town-name {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  flex: 0 0 100%;
}

.town {
  display: flex;
  flex: 0 0 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.creature-card {
  flex: 0 0 100%;

  @include media-small {
    flex: 0 0 50%;
  }

  &:nth-child(2),
  &:nth-child(3) {
    border-top: 1px solid black;
  }
}
</style> -->
