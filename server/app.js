const express = require('express');
const logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const indexRouter = require('./routes/index');

const PORT = 3000
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiProxy = createProxyMiddleware({
  target: `http://localhost:${PORT}/api'`,
  changeOrigin: true,
});
const viteProxy = createProxyMiddleware({
  target: 'http://localhost:5173',
  changeOrigin: true,
  ws: true,
});
app.use('/api', apiProxy);
app.use(viteProxy);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})