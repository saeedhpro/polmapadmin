require('whatwg-fetch')
export const state = () => ({
  questions: {
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
  setQuestions(state, questions) {
    state.questions = questions
  },
  setQuestionsList(state, list) {
    state.list = list
  },
}

export const actions = {
  getQuestions(ctx, filter) {
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
    return this.$axios.get(`/admin/questions?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setQuestions', data)
        } else {
          ctx.commit('setQuestionsList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getQuestion(ctx, id) {
    return this.$axios.get(`/admin/questions/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createQuestion(ctx, data) {
    return this.$axios.post(`/admin/questions`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateQuestion(ctx, data) {
    return this.$axios.put(`/admin/questions/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeQuestion(ctx, id) {
    return this.$axios.delete(`/admin/questions/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  questions(state) {
    return state.questions
  },
  getList(state) {
    return state.list
  },
}
