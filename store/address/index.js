require('whatwg-fetch')
export const state = () => ({
  addresses: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  address: null,
})

export const mutations = {
  setAddress(state, address) {
    state.address = address
  },
  setAddresses(state, addresses) {
    state.addresses = addresses
  }
}

export const actions = {
  getAddress(ctx, slug) {
    return this.$axios.get(`/addresses/${slug}`)
      .then(res => {
        const data = res.data
        ctx.commit('setAddress', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAddresses(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/addresses?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setAddresses', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createAddress(ctx, data) {
    return this.$axios.post('/addresses', data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateAddress(ctx, data) {
    return this.$axios.put(`/addresses/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeAddress(ctx, id) {
    return this.$axios.delete(`/addresses/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getAddresses(state) {
    return state.addresses
  },
}
