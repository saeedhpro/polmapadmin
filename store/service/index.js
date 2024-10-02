require('whatwg-fetch')
export const state = () => ({
  services: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  service: null,
})

export const mutations = {
  setService(state, service) {
    state.service = service
  },
  setServices(state, services) {
    state.services = services
  }
}

export const actions = {
  getService(ctx, id) {
    return this.$axios.get(`/admin/services/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setService', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getServices(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/admin/services?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setServices', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllServices(ctx, filter) {
    return this.$axios.get(`/admin/services`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createService(ctx, data) {
    return this.$axios.post(`/admin/services`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateService(ctx, data) {
    return this.$axios.put(`/admin/services/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeService(ctx, id) {
    return this.$axios.delete(`/admin/services/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getServices(state) {
    return state.services
  },
}
