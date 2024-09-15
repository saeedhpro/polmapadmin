require('whatwg-fetch')
export const state = () => ({
  products: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  product: null,
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setProductsList(state, list) {
    state.list = list
  },
  setProduct(state, product) {
    state.product = product
  },
}

export const actions = {
  getProduct(ctx, slug) {
    return this.$axios.get(`/products/${slug}`)
      .then(res => {
        const data = res.data
        ctx.commit('setProduct', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getProducts(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    let paged = false
    for (let i = 0; i < filters.length; i++) {
      if (filters[i][1]) {
        if(filters[i][0] === 'page') {
          paged = true
        }
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/products?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setProducts', data)
        } else {
          ctx.commit('setProductsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createProduct(ctx, data) {
    return this.$axios.post(`/products`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateProduct(ctx, data) {
    return this.$axios.put(`/products/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeProduct(ctx, id) {
    return this.$axios.delete(`/products/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getProducts(state) {
    return state.products
  },
  getList(state) {
    return state.list
  },
}
