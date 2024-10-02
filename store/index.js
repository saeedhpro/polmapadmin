require('whatwg-fetch')
export const actions = {
  async nuxtServerInit({ commit }) {
    const token = this.$cookies.get('token')
    const application = this.$cookies.get('application')
    if (application) {
      commit('application/setApplication', application)
    }
    if (token) {
      try{
        this.$axios.setHeader('Authorization', `Bearer ${token}`)
        this.$axios.setHeader('Accept', 'application/json')
        this.$axios.setHeader('Content-Type', 'application/json')
        const res = await this.$axios.get('/admin/own')
        if (res.status === 200) {
          const data = res.data.data
          commit('login/setToken', token)
          commit('login/setUser', data)
        } else {
          commit('login/setToken', null)
          commit('login/setUser', null)
          this.$cookies.remove('token')
          this.$axios.setToken('')
        }
      } catch (e) {
        commit('login/setToken', null)
        commit('login/setUser', null)
        this.$cookies.remove('token')
        this.$axios.setToken('')
      }
    } else {
      commit('login/setToken', null)
      commit('login/setUser', null)
      this.$cookies.remove('token')
      this.$axios.setHeader('Authorization', ``)
    }
    return Promise.resolve()
  },
}
