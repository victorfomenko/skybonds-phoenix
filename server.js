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
var compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(compression());
app.use(hotMiddleware(compiler));

// app.get('*', function(req, res, next) {
//   var urlPieces = url.parse(req.url).pathname.split(/[/\\]/);
//   var p = path.join(__dirname, req.url);
//   if (urlPieces[urlPieces.length - 1] != '' && fs.existsSync(p)) {
//     res.sendFile(path.join(__dirname, 'vendors/skybonds.components.js'));
//     // res.sendFile(p);
//   } else {
//     res.sendFile(path.join(__dirname, 'index.html'));
//   }
//   // return next();
// });

app.get('**/skybonds.components.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'vendors/skybonds.components.js'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
