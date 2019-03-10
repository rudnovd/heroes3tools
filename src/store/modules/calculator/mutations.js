export default {
  SET_UNITS_IMAGES (state) {
    for (let i = 0; i <= 160; i++) {
      state.images.units.push({ id: i, src: require(`@/assets/images/${i}.gif`) })
      state.attacker.unit = 'biba'
    }
  }
}
