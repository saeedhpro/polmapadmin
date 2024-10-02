require('whatwg-fetch')
export const state = () => ({
  sliders: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  slider: null,
})

export const mutations = {
  setSlider(state, slider) {
    state.slider = slider
  },
  setSliders(state, sliders) {
    state.sliders = sliders
  }
}

export const actions = {
  getSlider(ctx, id) {
    return this.$axios.get(`/admin/sliders/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setSlider', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getSliders(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/admin/sliders?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setSliders', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAllSliders(ctx, filter) {
    return this.$axios.get(`/admin/sliders`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createSlider(ctx, data) {
    return this.$axios.post(`/admin/sliders`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSlider(ctx, data) {
    return this.$axios.put(`/admin/sliders/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeSlider(ctx, id) {
    return this.$axios.delete(`/admin/sliders/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getSliders(state) {
    return state.sliders
  },
}
