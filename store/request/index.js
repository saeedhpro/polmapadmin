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
  consultations: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  cooperations: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
})

export const mutations = {
  setServices(state, services) {
    state.services = services
  },
  setConsultations(state, consultations) {
    state.consultations = consultations
  },
  setCooperations(state, cooperations) {
    state.cooperations = cooperations
  },
}

export const actions = {
  getServices(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/services/requests?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setServices', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeService(ctx, id) {
    return this.$axios.delete(`/services/requests/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getConsultations(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/consultations?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setConsultations', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeConsultation(ctx, id) {
    return this.$axios.delete(`/consultations/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCooperations(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/cooperations/requests?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setCooperations', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeCooperation(ctx, id) {
    return this.$axios.delete(`/cooperations/requests/${id}`)
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
  getCooperations(state) {
    return state.cooperations
  },
  getConsultations(state) {
    return state.consultations
  },
}
