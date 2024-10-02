require('whatwg-fetch')
export const state = () => ({
  intros: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  intro: null,
})

export const mutations = {
  setIntro(state, intro) {
    state.intro = intro
  },
  setIntros(state, intros) {
    state.intros = intros
  }
}

export const actions = {
  getIntro(ctx, id) {
    return this.$axios.get(`/admin/intros/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setIntro', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getIntros(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/admin/intros?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setIntros', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllIntros(ctx, filter) {
    return this.$axios.get(`/admin/intros`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createIntro(ctx, data) {
    return this.$axios.post(`/admin/intros`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateIntro(ctx, data) {
    return this.$axios.put(`/admin/intros/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeIntro(ctx, id) {
    return this.$axios.delete(`/admin/intros/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getIntros(state) {
    return state.intros
  },
}
