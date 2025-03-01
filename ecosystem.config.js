module.exports = {
  apps: [
    {
      name: 'PolmapAdmin',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
