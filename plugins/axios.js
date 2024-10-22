import Axios from 'axios'

const axiosExtra = {
  setBaseURL (baseURL) {
    this.defaults.baseURL = baseURL
  },
  setHeader (name, value, scopes = 'common') {
    for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope][name]
        return
      }
      this.defaults.headers[scope][name] = value
    }
  },
  setToken (token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  },
  onRequest (fn) {
    this.interceptors.request.use(config => fn(config) || config)
  },
  onResponse (fn) {
    this.interceptors.response.use(response => fn(response) || response)
  },
  onRequestError (fn) {
    this.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onResponseError (fn) {
    this.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onError (fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  }
}

for (const method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  axiosExtra['$' + method] = function () { return this[method].apply(this, arguments).then(res => res && res.data) }
}

const extendAxiosInstance = (axios) => {
  for (const key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
}

const setupProgress = (axios, ctx) => {
  if (process.server) {
    return
  }

  // A noop loading interface for when $nuxt is not yet ready
  const noopLoading = {
    finish: () => { },
    start: () => { },
    fail: () => { },
    set: () => { }
  }

  const $loading = () => (window.$nuxt && window.$nuxt.$loading && window.$nuxt.$loading.set) ? window.$nuxt.$loading : noopLoading

  let currentRequests = 0

  axios.onRequest((config) => {
    if (config && config.progress === false) {
      return
    }

    currentRequests++
  })

  axios.onResponse((response) => {
    if (response && response.config && response.config.progress === false) {
      return
    }

    currentRequests--
    if (currentRequests <= 0) {
      currentRequests = 0
      $loading().finish()
    }
  })

  axios.onError((error) => {
    if (error && error.config && error.config.progress === false) {
      return
    }

    currentRequests--

    if (Axios.isCancel(error)) {
      return
    }

    $loading().fail()
    $loading().finish()
  })

  const onProgress = (e) => {
    if (!currentRequests) {
      return
    }
    const progress = ((e.loaded * 100) / (e.total * currentRequests))
    $loading().set(Math.min(100, progress))
  }

  axios.defaults.onUploadProgress = onProgress
  axios.defaults.onDownloadProgress = onProgress
}

export default (ctx, inject) => {
  const baseURL = 'http://localhost:8000/api'
  // const baseURL = 'https://api.beautymap.ir/api'
  const token = ctx.$cookies.get('token');
  const headers = {
    common: {
      ContentType: 'multipart/form-data',
      Accept: 'application/json'
    },
    delete: {},
    get: {},
    head: {},
    post: {},
    put: {},
    patch: {}
  }

  const axiosOptions = {
    baseURL,
    headers
  }

  // Proxy SSR request headers headers
  axiosOptions.headers.common = (ctx.req && ctx.req.headers) ? Object.assign({}, ctx.req.headers) : {}
  delete axiosOptions.headers.common.accept
  delete axiosOptions.headers.common.host
  delete axiosOptions.headers.common['cf-ray']
  delete axiosOptions.headers.common['cf-connecting-ip']
  delete axiosOptions.headers.common['content-length']
  delete axiosOptions.headers.common['content-md5']
  delete axiosOptions.headers.common['content-type']

  if (process.server) {
    axiosOptions.headers.common['accept-encoding'] = 'gzip, deflate'
  }
  axiosOptions.headers.common['Authorization'] = `Bearer ${token}`

  const axios = Axios.create(axiosOptions)
  axios.CancelToken = Axios.CancelToken
  axios.isCancel = Axios.isCancel

  extendAxiosInstance(axios)

  setupProgress(axios, ctx)

  ctx.$axios = axios
  inject('axios', axios)
}
