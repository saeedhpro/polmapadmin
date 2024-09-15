require('whatwg-fetch')
export const state = () => ({
  categories: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  productCategories: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  articleCategories: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  faqCategories: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  category: null,
})

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
  setCategoriesList(state, list) {
    state.list = list
  },
  productCategories(state, productCategories) {
    state.productCategories = productCategories
  },
  articleCategories(state, articleCategories) {
    state.articleCategories = articleCategories
  },
  faqCategories(state, faqCategories) {
    state.faqCategories = faqCategories
  }
}

export const actions = {
  getCategories(ctx, filter) {
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
        if (filters[i][0] === 'type') {
          type = filters[i][1]
        }
        if (filters[i][0] === 'all' && filters[i][1]) {
          all = true
        }
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/categories${all ? '/all' : ''}?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          if (type === 'article') {
            ctx.commit('articleCategories', data)
          } else if(type === 'product') {
            ctx.commit('productCategories', data)
          } else if (type === 'faq') {
            ctx.commit('faqCategories', data)
          }
          ctx.commit('setCategories', data)
        } else {
          ctx.commit('setCategoriesList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createCategory(ctx, data) {
    return this.$axios.post(`/categories`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateCategory(ctx, data) {
    return this.$axios.put(`/categories/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeCategory(ctx, id) {
    return this.$axios.delete(`/categories/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getCategories(state) {
    return state.categories
  },
  productCategories(state) {
    return state.productCategories
  },
  articleCategories(state) {
    return state.articleCategories
  },
  faqCategories(state) {
    return state.faqCategories
  },
  getList(state) {
    return state.list
  },
}
