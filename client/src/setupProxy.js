const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // /api 로 요청이 오면 localhost:5000 으로 보내주라는 뜻 
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};