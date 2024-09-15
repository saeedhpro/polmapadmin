require('whatwg-fetch')
export const state = () => ({
  list: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
}

export const actions = {
  getProvinces(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if (filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/provinces?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setList', data.data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getList(state) {
    return state.list
  },
}
