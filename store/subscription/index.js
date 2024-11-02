require('whatwg-fetch')
export const state = () => ({
  subscriptions: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  subscription: null,
})

export const mutations = {
  setSubscriptions(state, subscriptions) {
    state.subscriptions = subscriptions
  },
  setSubscriptionsList(state, list) {
    state.list = list
  },
  setSubscription(state, subscription) {
    state.subscription = subscription
  },
}

export const actions = {
  getSubscription(ctx, id) {
    return this.$axios.get(`/admin/subscriptions/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setSubscription', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllSubscriptions(ctx, filter) {
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
    return this.$axios.get(`/admin/subscriptions?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setSubscriptions', data)
        } else {
          ctx.commit('setSubscriptionsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSubscription(ctx, data) {
    return this.$axios.put(`/admin/subscriptions/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createSubscription(ctx, data) {
    return this.$axios.post(`/admin/subscriptions`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteSubscription(ctx, id) {
    return this.$axios.delete(`/admin/subscriptions/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export const getters = {
  getSubscriptions(state) {
    return state.subscriptions
  },
  getList(state) {
    return state.list
  },
}
