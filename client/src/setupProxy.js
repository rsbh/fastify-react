const { createProxyMiddleware } = require('http-proxy-middleware');

const SERVER_HOST = process.env.SERVER_HOST || 'http://localhost:8000'

console.log(SERVER_HOST)

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: SERVER_HOST,
      changeOrigin: true,
    })
  );
};