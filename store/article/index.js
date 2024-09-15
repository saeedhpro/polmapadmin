require('whatwg-fetch')
export const state = () => ({
  articles: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  article: null,
})

export const mutations = {
  setArticle(state, article) {
    state.article = article
  },
  setArticles(state, articles) {
    state.articles = articles
  }
}

export const actions = {
  getArticle(ctx, slug) {
    return this.$axios.get(`/articles/${slug}`)
      .then(res => {
        const data = res.data
        ctx.commit('setArticle', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getArticles(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/articles?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setArticles', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createArticle(ctx, data) {
    return this.$axios.post(`/articles`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateArticle(ctx, data) {
    return this.$axios.put(`/articles/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeArticle(ctx, id) {
    return this.$axios.delete(`/articles/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getArticles(state) {
    return state.articles
  },
}
