require('whatwg-fetch')
export const state = () => ({
  openDrawer: false,
})

export const mutations = {
  toggleDrawer(state) {
    state.openDrawer = !state.openDrawer
  }
}

export const actions = {
  toggleDrawer(ctx) {
    ctx.commit('toggleDrawer')
  },
}

export const getters = {
  openDrawer(state) {
    return state.openDrawer
  },
}
