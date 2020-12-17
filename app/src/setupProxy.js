const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      // redirect to Django Server
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
    }),
  );
}