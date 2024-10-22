require('whatwg-fetch')
export const state = () => ({
  courses: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
    per_page: 10,
    total: 1,
  },
  list: [],
  course: null,
})

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
  setCoursesList(state, list) {
    state.list = list
  },
  setCourse(state, course) {
    state.course = course
  },
}

export const actions = {
  getCourse(ctx, id) {
    return this.$axios.get(`/admin/courses/${id}`)
      .then(res => {
        const data = res.data
        ctx.commit('setCourse', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCourses(ctx, filter) {
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
    return this.$axios.get(`/admin/courses?${query.join('&')}`)
      .then(res => {
        const data = res.data
        if (paged) {
          ctx.commit('setCourses', data)
        } else {
          ctx.commit('setCoursesList', data.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createCourse (ctx, data) {
    return this.$axios.post(`/admin/courses`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateCourse(ctx, data) {
    return this.$axios.put(`/admin/courses/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeCourse(ctx, id) {
    return this.$axios.delete(`/admin/courses/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export const getters = {
  getCourses(state) {
    return state.courses
  },
  getList(state) {
    return state.list
  },
}
