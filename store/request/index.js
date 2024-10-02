require('whatwg-fetch')
export const state = () => ({
  requests: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  request: null,
})

export const mutations = {
  setRequests(state, requests) {
    state.requests = requests
  },
  setRequestsList(state, list) {
    state.list = list
  },
  setRequest(state, request) {
    state.request = request
  },
}

export const actions = {
  getRequest(ctx, id) {
    return this.$axios.get(`/admin/requests/${data.id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setRequest', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getRequests(ctx, filter) {
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
    return this.$axios.get(`/admin/${filter.user_id}/requests?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setRequests', data)
        } else {
          ctx.commit('setRequestsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllRequests(ctx, filter) {
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
    return this.$axios.get(`/admin/requests?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setRequests', data)
        } else {
          ctx.commit('setRequestsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createRequest(ctx, data) {
    return this.$axios.post(`/admin/requests`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  acceptOrRejectRequest(ctx, data) {
    return this.$axios.patch(`/admin/requests/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateRequest(ctx, data) {
    return this.$axios.put(`/admin/requests/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeRequest(ctx, data) {
    return this.$axios.delete(`/admin/requests/${data.id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getRequests(state) {
    return state.requests
  },
  getList(state) {
    return state.list
  },
}
