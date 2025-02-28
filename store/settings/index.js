require('whatwg-fetch')
export const state = () => ({
  settings: {
    site_logo: '/main/logo.png',
    site_name_fa: 'پنل ادمین',
    titleTemplate: 'پنل ادمین',
    title: 'پنل ادمین',
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
  updateRules(ctx, data) {
    return this.$axios.put(`/rule`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateHelp(ctx, data) {
    return this.$axios.put(`/help`, data)
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
