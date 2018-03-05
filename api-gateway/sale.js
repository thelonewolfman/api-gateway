const express = require('express');
// const httpProxy = require('http-proxy');
const proxy = require('http-proxy-middleware');

const router = express.Router();

// const apiProxy = httpProxy.createProxyServer();

router.use(proxy({ target: 'http://localhost:3001', changeOrigin: true }));

// router.route('/*')
//   .post((req, res) => {
//     apiProxy.web(req, res, { target: 'http://localhost:3001/api/sale' });
//   });

module.exports = router;
