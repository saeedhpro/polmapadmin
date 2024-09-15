require('whatwg-fetch')
export const state = () => ({
  contacts: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  contact: null,
})

export const mutations = {
  setContact(state, contact) {
    state.contact = contact
  },
  setContacts(state, contacts) {
    state.contacts = contacts
  }
}

export const actions = {
  getContact(ctx, id) {
    return this.$axios.get(`/contacts/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setContact', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getContacts(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/contacts?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setContacts', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createContact(ctx, data) {
    return this.$axios.post(`/contacts`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateContact(ctx, data) {
    return this.$axios.put(`/contacts/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeContact(ctx, id) {
    return this.$axios.delete(`/contacts/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getContacts(state) {
    return state.contacts
  },
}
