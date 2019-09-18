const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use('/auth/google', proxy({
    target: 'http://localhost:8000',
    changeOrigin: true,
  }));

  app.use('/api', proxy({
    target: 'http://localhost:8000',
    changeOrigin: true,
  }));
}