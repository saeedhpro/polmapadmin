require('whatwg-fetch')
export const state = () => ({
  skills: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  skill: null,
})

export const mutations = {
  setSkill(state, skill) {
    state.skill = skill
  },
  setSkills(state, skills) {
    state.skills = skills
  }
}

export const actions = {
  getSkill(ctx, slug) {
    return this.$axios.get(`/skills/${slug}`)
      .then(res => {
        const data = res.data
        ctx.commit('setSkill', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getSkills(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/skills?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setSkills', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createSkill(ctx, data) {
    return this.$axios.post(`/skills`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSkill(ctx, data) {
    return this.$axios.put(`/skills/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeSkill(ctx, id) {
    return this.$axios.delete(`/skills/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getSkills(state) {
    return state.skills
  },
}
