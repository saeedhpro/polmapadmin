require('whatwg-fetch')
export const state = () => ({
  comments: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  productComments: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  articleComments: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  comment: null,
})

export const mutations = {
  setComments(state, comments) {
    state.comments = comments
  },
  setCommentsList(state, list) {
    state.list = list
  },
  productComments(state, productComments) {
    state.productComments = productComments
  },
  articleComments(state, articleComments) {
    state.articleComments = articleComments
  },
}

export const actions = {
  getComments(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    let paged = false
    let type = ''
    for (let i = 0; i < filters.length; i++) {
      if (filters[i][1]) {
        if (filters[i][0] === 'page') {
          paged = true
        }
        if (filters[i][0] === 'type') {
          type = filters[i][1]
        }
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/comments?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          if (type === 'article') {
            ctx.commit('articleComments', data)
          } else if(type === 'product') {
            ctx.commit('productComments', data)
          }
          ctx.commit('setComments', data)
        } else {
          ctx.commit('setCommentsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createComment(ctx, data) {
    return this.$axios.post(`/comments`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateComment(ctx, data) {
    return this.$axios.put(`/comments/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeComment(ctx, id) {
    return this.$axios.delete(`/comments/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getComments(state) {
    return state.comments
  },
  productComments(state) {
    return state.productComments
  },
  articleComments(state) {
    return state.articleComments
  },
  getList(state) {
    return state.list
  },
}
