require('whatwg-fetch')
export const state = () => ({
  options: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  option: null,
})

export const mutations = {
  setOptions(state, options) {
    state.options = options
  },
  setOptionsList(state, list) {
    state.list = list
  },
  setOption(state, option) {
    state.option = option
  },
}

export const actions = {
  getOption(ctx, id) {
    return this.$axios.get(`/admin/payment-options/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setOption', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllOptions(ctx, filter) {
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
    return this.$axios.get(`/admin/payment-options?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setOptions', data)
        } else {
          ctx.commit('setOptionsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOption(ctx, data) {
    return this.$axios.put(`/admin/payment-options/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export const getters = {
  getOptions(state) {
    return state.options
  },
  getList(state) {
    return state.list
  },
}
