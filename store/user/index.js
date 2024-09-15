require('whatwg-fetch')
export const state = () => ({
  users: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  user: null,
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setUsersList(state, list) {
    state.list = list
  },
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  getUser(ctx, id) {
    return this.$axios.get(`/users/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setUser', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUsers(ctx, filter) {
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
    return this.$axios.get(`/users?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setUsers', data)
        } else {
          ctx.commit('setUsersList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createUser(ctx, data) {
    return this.$axios.post(`/users`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateUser(ctx, data) {
    return this.$axios.put(`/users/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeUser(ctx, id) {
    return this.$axios.delete(`/users/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getUsers(state) {
    return state.users
  },
  getList(state) {
    return state.list
  },
}
