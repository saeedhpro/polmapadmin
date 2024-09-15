require('whatwg-fetch')
export const state = () => ({
  attributes: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  attribute: null,
})

export const mutations = {
  setAttributes(state, attributes) {
    state.attributes = attributes
  },
  setAttributesList(state, list) {
    state.list = list
  },
}

export const actions = {
  getAttributes(ctx, filter) {
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
    return this.$axios.get(`/attributes?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setAttributes', data)
        } else {
          ctx.commit('setAttributesList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createAttribute(ctx, data) {
    return this.$axios.post(`/attributes`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateAttribute(ctx, data) {
    return this.$axios.put(`/attributes/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeAttribute(ctx, id) {
    return this.$axios.delete(`/attributes/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getAttributes(state) {
    return state.attributes
  },
  getList(state) {
    return state.list
  },
}
