require('whatwg-fetch')
export const state = () => ({
  settings: {
    site_logo: '/main/logo.png',
    site_name_fa: 'فروشگاه',
    titleTemplate: 'فروشگاه الیت برد',
    title: 'فروشگاه الیت برد',
  }
})

export const mutations = {
}

export const actions = {
  getSettings(ctx) {
    return this.$axios.get(`/settings`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSettings(ctx, data) {
    return this.$axios.put(`/settings`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getSettings(state) {
    return state.settings
  },
}