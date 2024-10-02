require('whatwg-fetch')
export const state = () => ({
  tickets: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  subjects: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  ticket: null,
})

export const mutations = {
  setTickets(state, tickets) {
    state.tickets = tickets
  },
  setSubjects(state, subjects) {
    state.subjects = subjects
  },
  setTicketsList(state, list) {
    state.list = list
  },
  setTicket(state, ticket) {
    state.ticket = ticket
  },
}

export const actions = {
  getTicket(ctx, id) {
    return this.$axios.get(`/admin/tickets/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setTicket', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getTickets(ctx, filter) {
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
    return this.$axios.get(`/admin/tickets?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setTickets', data)
        } else {
          ctx.commit('setTicketsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getSubjects(ctx, filter) {
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
    return this.$axios.get(`/admin/subjects?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setSubjects', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllTickets(ctx, filter) {
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
    return this.$axios.get(`/admin/tickets?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setTickets', data)
        } else {
          ctx.commit('setTicketsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createTicket(ctx, data) {
    return this.$axios.post(`/admin/tickets`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createTicketAnswer(ctx, data) {
    return this.$axios.post(`/admin/tickets/${data.id}/answer`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  acceptOrRejectTicket(ctx, data) {
    return this.$axios.patch(`/admin/tickets/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateTicket(ctx, data) {
    return this.$axios.put(`/admin/tickets/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeTicket(ctx, id) {
    return this.$axios.delete(`/admin/tickets/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createSubject(ctx, data) {
    return this.$axios.post(`/admin/subjects`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSubject(ctx, data) {
    return this.$axios.put(`/admin/subjects/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeSubject(ctx, id) {
    return this.$axios.delete(`/admin/subjects/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getTickets(state) {
    return state.tickets
  },
  getSubjects(state) {
    return state.subjects
  },
  getList(state) {
    return state.list
  },
}
