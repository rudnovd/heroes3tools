export default {
  updateScreenResolution ({ commit }, { width, height }) {
    commit('UPDATE_SCREEN_RESOLUTION', { width, height })
  }
}
