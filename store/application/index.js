require('whatwg-fetch')
export const state = () => ({
  applications: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  application: null,
})

export const mutations = {
  setApplication(state, application) {
    state.application = application
  },
  setApplications(state, applications) {
    state.applications = applications
  },
  setApplicationsList(state, list) {
    state.list = list
  },
}

export const actions = {
  getApplication(ctx, id) {
    return this.$axios.get(`/admin/applications/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setApplication', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getApplications(ctx, filter) {
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
    return this.$axios.get(`/admin/applications?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setApplications', data)
        } else {
          ctx.commit('setApplicationsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createApplication(ctx, data) {
    return this.$axios.post(`/admin/applications`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateApplication(ctx, data) {
    return this.$axios.put(`/admin/applications/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeApplication(ctx, id) {
    return this.$axios.delete(`/admin/applications/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getApplication(state) {
    return state.application
  },
  getApplications(state) {
    return state.applications
  },
  getList(state) {
    return state.list
  },
}
