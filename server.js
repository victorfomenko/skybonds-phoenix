var path = require('path');
var url = require('url');
var fs = require('fs');
var webpack = require('webpack');
var express = require('express');
var compression = require('compression');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = express();
var dev = process.env.NODE_ENV !== 'production';
var compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
  historyApiFallback: true,
}));

app.use(compression());
app.use(hotMiddleware(compiler));

if (dev) {
  const httpProxy = require('http-proxy');
  const proxy = httpProxy.createProxyServer({
    secure: false,
    xfwd: false,
    changeOrigin: true,
    hostRewrite: true,
    autoRewrite: true,
    protocolRewrite: true,
    cookieDomainRewrite: '*'
  });
  const apiHost = process.env.DEV_API_HOST || 'http://sit.skybonds.net';
  app.use('/api/', (req, res)=> {
    proxy.web(req, res, {target: apiHost + '/api/'});
  });
}

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
