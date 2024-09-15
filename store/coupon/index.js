require('whatwg-fetch')
export const state = () => ({
  coupons: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  coupon: null,
})

export const mutations = {
  setCoupons(state, coupons) {
    state.coupons = coupons
  },
  setCouponsList(state, list) {
    state.list = list
  },
}

export const actions = {
  getCoupons(ctx, filter) {
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
    return this.$axios.get(`/coupons?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setCoupons', data)
        } else {
          ctx.commit('setCouponsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createCoupon(ctx, data) {
    return this.$axios.post(`/coupons`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateCoupon(ctx, data) {
    return this.$axios.put(`/coupons/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeCoupon(ctx, id) {
    return this.$axios.delete(`/coupons/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getCoupons(state) {
    return state.coupons
  },
  getList(state) {
    return state.list
  },
}
