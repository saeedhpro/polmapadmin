require('whatwg-fetch')
export const state = () => ({
  brands: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  brand: null,
})

export const mutations = {
  setBrands(state, brands) {
    state.brands = brands
  },
  setBrandsList(state, list) {
    state.list = list
  },
}

export const actions = {
  getBrands(ctx, filter) {
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
    return this.$axios.get(`/brands${all ? '/all' : ''}?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setBrands', data)
        } else {
          ctx.commit('setBrandsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createBrand(ctx, data) {
    return this.$axios.post(`/brands`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateBrand(ctx, data) {
    return this.$axios.put(`/brands/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeBrand(ctx, id) {
    return this.$axios.delete(`/brands/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getBrands(state) {
    return state.brands
  },
  getList(state) {
    return state.list
  },
}
