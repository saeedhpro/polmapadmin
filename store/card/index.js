require('whatwg-fetch')
export const state = () => ({
  cards: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  card: null,
})

export const mutations = {
  setCard(state, card) {
    state.card = card
  },
  setCards(state, cards) {
    state.cards = cards
  }
}

export const actions = {
  getCard(ctx, slug) {
    return this.$axios.get(`/cards/${slug}`)
      .then(res => {
        const data = res.data
        ctx.commit('setCard', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCards(ctx, filter) {
    let query = [];
    const filters = Object.entries(filter)
    for (let i = 0; i < filters.length; i++) {
      if(filters[i][1]) {
        query.push(`${filters[i][0]}=${filters[i][1]}`)
      }
    }
    return this.$axios.get(`/cards?${query.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setCards', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createCard(ctx, data) {
    return this.$axios.post('/cards', data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateCard(ctx, data) {
    return this.$axios.put(`/cards/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeCard(ctx, id) {
    return this.$axios.delete(`/cards/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getCards(state) {
    return state.cards
  },
}
