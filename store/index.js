require('whatwg-fetch')
export const actions = {
  async nuxtServerInit({ commit }) {
    const token = this.$cookies.get('token')
    if (token) {
      try{
        this.$axios.setHeader('Authorization', `Bearer ${token}`)
        const res = await this.$axios.get('/own')
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
