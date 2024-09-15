require('whatwg-fetch')
export const state = () => ({
  customers: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  customer: null,
})

export const mutations = {
  setCustomers(state, customers) {
    state.customers = customers
  },
  setCustomersList(state, list) {
    state.list = list
  },
}

export const actions = {
  getCustomers(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    let paged = false
    let type = ''
    let all = false
    for (let i = 0; i < filters.length; i++) {
      if (filters[i][1]) {
        if (filters[i][0] === 'page') {
          paged = true
        }
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/customers${all ? '/all' : ''}?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setCustomers', data)
        } else {
          ctx.commit('setCustomersList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createCustomer(ctx, data) {
    return this.$axios.post(`/customers`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateCustomer(ctx, data) {
    return this.$axios.put(`/customers/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeCustomer(ctx, id) {
    return this.$axios.delete(`/customers/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getCustomers(state) {
    return state.customers
  },
  getList(state) {
    return state.list
  },
}
