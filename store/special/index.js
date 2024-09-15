require('whatwg-fetch')
export const state = () => ({
  specials: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  special: null,
})

export const mutations = {
  setSpecials(state, specials) {
    state.specials = specials
  },
  setSpecialsList(state, list) {
    state.list = list
  },
}

export const actions = {
  getSpecials(ctx, filter) {
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
    return this.$axios.get(`/specials?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setSpecials', data)
        } else {
          ctx.commit('setSpecialsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createSpecial(ctx, data) {
    return this.$axios.post(`/specials`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSpecial(ctx, data) {
    return this.$axios.put(`/specials/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeSpecial(ctx, id) {
    return this.$axios.delete(`/specials/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getSpecials(state) {
    return state.specials
  },
  getList(state) {
    return state.list
  },
}
