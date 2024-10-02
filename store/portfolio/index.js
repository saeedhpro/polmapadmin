require('whatwg-fetch')
export const state = () => ({
  portfolios: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  portfolio: null,
})

export const mutations = {
  setPortfolios(state, portfolios) {
    state.portfolios = portfolios
  },
  setPortfoliosList(state, list) {
    state.list = list
  },
  setPortfolio(state, portfolio) {
    state.portfolio = portfolio
  },
}

export const actions = {
  getPortfolio(ctx, data) {
    return this.$axios.get(`/admin/users/${data.user_id}/portfolios/${data.id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setPortfolio', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getPortfolios(ctx, filter) {
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
    return this.$axios.get(`/admin/users/${filter.user_id}/portfolios?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setPortfolios', data)
        } else {
          ctx.commit('setPortfoliosList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllPortfolios(ctx, filter) {
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
    return this.$axios.get(`/admin/portfolios?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setPortfolios', data)
        } else {
          ctx.commit('setPortfoliosList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createPortfolio(ctx, data) {
    return this.$axios.post(`/admin/users/${data.user_id}/portfolios`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  acceptOrRejectPortfolio(ctx, data) {
    return this.$axios.patch(`/admin/users/${data.user_id}/portfolios/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updatePortfolio(ctx, data) {
    return this.$axios.put(`/admin/users/${data.user_id}/portfolios/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removePortfolio(ctx, data) {
    return this.$axios.delete(`/admin/users/${data.user_id}/portfolios/${data.id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getPortfolios(state) {
    return state.portfolios
  },
  getList(state) {
    return state.list
  },
}
