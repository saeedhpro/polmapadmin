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
  list: [],
  slider: null,
})

export const mutations = {
  setSliders(state, sliders) {
    state.sliders = sliders
  },
  setSlidersList(state, list) {
    state.list = list
  },
}

export const actions = {
  getSliders(ctx, filter) {
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
    return this.$axios.get(`/sliders?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setSliders', data)
        } else {
          ctx.commit('setSlidersList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createSlider(ctx, data) {
    return this.$axios.post(`/sliders`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSlider(ctx, data) {
    return this.$axios.put(`/sliders/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeSlider(ctx, id) {
    return this.$axios.delete(`/sliders/${id}`)
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
  getList(state) {
    return state.list
  },
}
