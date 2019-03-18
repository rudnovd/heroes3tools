export default {
  UPDATE_SCREEN_RESOLUTION (state, { width, height }) {
    state.width = width
    state.height = height
  },
  SET_LOCALE (state, locale) {
    state.locale = locale
  }
}
