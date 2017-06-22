//////////////////////////////////////////////////////////////////
// Tip: built files are meant to be served over an HTTP server. //
// Opening index.html over file:// won't work.                  //
//////////////////////////////////////////////////////////////////

// 本地 HTTP server 调试使用

var express = require('express')
var config = require('./config/index.js')

var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()
router.get('/', function (req, res, next) {
  req.url = './index.html'
  next()
})

app.use(router)

// 获取 data.json 中的数据（商家、商品、评论）
var appDate = require('./data.json');
var seller = appDate.seller;
var goods = appDate.goods;
var ratings = appDate.ratings;

// 定义路由和接口(获取 json 键值对)
var apiRoutes = express.Router();
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});
apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

// 调用 express 的 app.use() 方法，请求数据
// 如：http://localhost:8080/api/seller
app.use('/api', apiRoutes);

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    var uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n');
});

