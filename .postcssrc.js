// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    // "postcss-mixins": true,
    "postcss-cssnext": {
      features: {
        rem: false
      }
    },
    'postcss-nested': {}
  }
}
