require('whatwg-fetch')
export const state = () => ({
  orders: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  order: null,
})

export const mutations = {
  setOrders(state, orders) {
    state.orders = orders
  },
  setOrdersList(state, list) {
    state.list = list
  },
  setOrder(state, order) {
    state.order = order
  },
}

export const actions = {
  getOrder(ctx, id) {
    return this.$axios.get(`/orders/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setOrder', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrders(ctx, data) {
    this.orders = {
      data: [],
      meta: {
        current_page: 1,
        last_page: 1,
      },
      per_page: 10,
      total: 1,
    }
    let query = [];
    const filters = Object.entries(data)
    for (let i = 0; i < filters.length; i++) {
      if (filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/orders?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setOrders', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserOrders(ctx, data) {
    let query = [];
    const filters = Object.entries(data.filter)
    let paged = false
    for (let i = 0; i < filters.length; i++) {
      if (filters[i][1]) {
        if (filters[i][0] === 'page') {
          paged = true
        }
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/users/${data.id}/orders?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setOrders', data)
        } else {
          ctx.commit('setOrdersList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createOrder(ctx, data) {
    return this.$axios.post(`/orders`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOrder(ctx, data) {
    return this.$axios.put(`/orders/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  actionOrder(ctx, data) {
    return this.$axios.post(`/orders/${data.id}/action`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getOrders(state) {
    return state.orders
  },
  getList(state) {
    return state.list
  },
}
