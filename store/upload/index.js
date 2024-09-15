require('whatwg-fetch')
export const actions = {
  async upload(ctx, data) {
    return this.$axios.post(`/upload`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}
