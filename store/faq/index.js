require('whatwg-fetch')
export const state = () => ({
  faqs: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  faq: null,
})

export const mutations = {
  setFaq(state, faq) {
    state.faq = faq
  },
  setFaqs(state, faqs) {
    state.faqs = faqs
  }
}

export const actions = {
  getFaq(ctx, id) {
    return this.$axios.get(`/faqs/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setFaq', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getFaqs(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/faqs?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setFaqs', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createFaq(ctx, data) {
    return this.$axios.post(`/faqs`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateFaq(ctx, data) {
    return this.$axios.put(`/faqs/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeFaq(ctx, id) {
    return this.$axios.delete(`/faqs/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getFaqs(state) {
    return state.faqs
  },
}
