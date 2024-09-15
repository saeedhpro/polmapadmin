require('whatwg-fetch')
export const state = () => ({
  socials: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  social: null,
})

export const mutations = {
  setSocials(state, socials) {
    state.socials = socials
  },
  setSocialsList(state, list) {
    state.list = list
  },
}

export const actions = {
  getSocials(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    let paged = false
    for (let i = 0; i < filters.length; i++) {
      if (filters[i][1]) {
        if (filters[i][0] === 'page') {
          paged = true
        }
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/socials?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setSocials', data)
        } else {
          ctx.commit('setSocialsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createSocial(ctx, data) {
    return this.$axios.post(`/socials`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSocial(ctx, data) {
    return this.$axios.put(`/socials/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeSocial(ctx, id) {
    return this.$axios.delete(`/socials/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getSocials(state) {
    return state.socials
  },
  getList(state) {
    return state.list
  },
}
