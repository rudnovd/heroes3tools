import heroesJson from '@/assets/json/heroes.json'

export default {
  GET_UNITS_IMAGES (state) {
    for (let i = 0; i <= 160; i++) {
      state.images.units.push({ id: i, src: require(`@/assets/images/${i}.gif`) })
    }
  },
  GET_HEROES (state) {
    state.heroes = heroesJson
  }
}
