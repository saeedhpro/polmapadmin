require('whatwg-fetch')
export const state = () => ({
  plans: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  plan: null,
})

export const mutations = {
  setPlans(state, plans) {
    state.plans = plans
  },
  setPlansList(state, list) {
    state.list = list
  },
  setPlan(state, plan) {
    state.plan = plan
  },
}

export const actions = {
  getPlan(ctx, id) {
    return this.$axios.get(`/admin/plans/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setPlan', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllPlans(ctx, filter) {
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
    return this.$axios.get(`/admin/plans?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setPlans', data)
        } else {
          ctx.commit('setPlansList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updatePlan(ctx, data) {
    return this.$axios.put(`/admin/plans/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export const getters = {
  getPlans(state) {
    return state.plans
  },
  getList(state) {
    return state.list
  },
}
