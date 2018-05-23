var app = require('koa')();
var router = require('koa-router')();
const bodyParser = require('koa-bodyparser');//获取post数据中间件
// router.get('/', function *(next) {
//     this.body = 'hello koa !'
// });

// router.get('/api', function *(next) {
//     this.body = 'test data'
// });
//获取首页拼图设计列表
var jigsaweListData = require('./jigsaw/jigsawlist.js')
router.get('/api/jigsawlist/:page', function *(next) {
    console.log('拼图设计列表')
    const params = this.params
    const paramsPage = params.page

    console.log('当前页数：' + paramsPage)

    this.body = jigsaweListData
});
//点赞
router.post('/api/updateDianzan', function *(next) {
    console.log('点赞')

    // 获取参数
    console.log(this.request.body)//获取post数据，需要中间件koa-bodyparser支持
    this.body = {
        errno: 0,
        msg: 'ok'
    }
});

//获取首页右侧资讯
var informationData = require('./information/information.js')
router.get('/api/informationList', function *(next) {
    console.log('首页资讯图片列表')

    this.body = informationData
});

//获取首页右侧品牌
var hotBrandData = require('./hotBrand/hotBrand.js')
var hotBrandDataNew = require('./hotBrand/hotBrandNew.js')
router.get('/api/hotBrandList/:type', function *(next) {
    console.log('首页热门品牌列表')

    const params = this.params
    const paramsType = params.type
    console.log('是否点击换一换热门品牌：' + paramsType)
    if(paramsType == 1)
    {
      this.body = hotBrandDataNew
    }else{
      this.body = hotBrandData
    }
});

//获取右侧设计达人
var designManData = require('./designMan/designMan.js')
var designManDataNew = require('./designMan/designManNew.js')
router.get('/api/designManList/:type', function *(next) {
    console.log('首页设计达人列表')

    const params = this.params
    const paramsType = params.type
    console.log('是否点击换一换设计达人：' + paramsType)
    if(paramsType == 1)
    {
      this.body = designManDataNew
    }else{
      this.body = designManData
    }
});

//注册用户
router.post('/api/registerUser', function *(next) {
    console.log('注册用户')

    // 获取参数
    console.log(this.request.body)//获取post数据，需要中间件koa-bodyparser支持
    this.body = {
        errno: 0,
        msg: '注册成功'
    }
});

//登录
router.post('/api/loginUser', function *(next) {
    console.log('登录')

    // 获取参数
    console.log(this.request.body)//获取post数据，需要中间件koa-bodyparser支持
    let result = {userId:1,nickName:'liuhuihui',phone:'13516718179',sex:'女',job:'老师',desc:'比较神秘，什么都没介绍'};//登录成功返回该用户基本信息
    if(this.request.body.phone === '13516718179' && this.request.body.password === '123123')
    {
      console.log('登录成功');
      this.body = {
          errno: 0,
          msg: '登录成功',
          data:result
      }
    }else{
      console.log('登录失败');
      this.body = {
          errno: 1,
          msg: '登录失败'
      }
    }

});


// 首页 —— 广告（超值特惠）
var homeAdData = require('./home/adnew.js')
router.get('/api/homead', function *(next) {
    console.log('首页 —— 广告（超值特惠）')
    // return homeAdData
    this.body = homeAdData
});

var homeinfoData = require('./home/homeinfo.js')
router.get('/api/homeinfo', function *(next) {
    // console.log('首页 —— 广告（超值特惠）')
    // return homeAdData
    this.body = {
        http_code: 200,
        data: homeinfoData
    }
});

// 首页 —— 推荐列表（猜你喜欢）
var homeListData = require('./home/list.js')
router.get('/api/homelist/:city/:page', function *(next) {
    console.log('首页 —— 推荐列表（猜你喜欢）')

    // 参数
    const params = this.params
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('当前城市：' + paramsCity)
    console.log('当前页数：' + paramsPage)

    this.body = homeListData
});

// 搜索结果页 - 搜索结果 - 三个参数
var searchListData = require('./search/list.js')
router.get('/api/search/:page/:city/:category/:keyword', function *(next) {
    console.log('搜索结果页 - 搜索结果')

    // 参数
    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category
    const paramsKeyword = params.keyword

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)
    console.log('关键字：' + paramsKeyword)

    this.body = searchListData
})
// 搜索结果页 - 搜索结果 - 两个参数
router.get('/api/search/:page/:city/:category', function *(next) {
    console.log('搜索结果页 - 搜索结果')

    // 参数
    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)

    this.body = searchListData
})

// 详情页 - 商户信息
const detailInfo = require('./detail/info.js')
router.get('/api/detail/info/:id', function *(next) {
    console.log('详情页 - 商户信息')

    const params = this.params
    const id = params.id

    console.log('商户id: ' + id)

    this.body = detailInfo
})
// 详情页 - 用户评论
const detailComment = require('./detail/comment.js')
router.get('/api/detail/comment/:page/:id', function *(next) {
    console.log('详情页 - 用户点评')

    const params = this.params
    const page = params.page
    const id = params.id

    console.log('商户id: ' + id)
    console.log('当前页数: ' + page)

    this.body = detailComment
})

// 订单列表
const orderList = require('./orderlist/orderList.js')
router.get('/api/orderlist/:username', function *(next) {
    console.log('订单列表')

    const params = this.params
    const username = params.username
    console.log('用户名：' + username)

    this.body = orderList
})

// 提交评论
router.post('/api/submitComment', function *(next) {
    console.log('提交评论')

    // 获取参数
    const params = this.params
    console.log(this.request.body)//获取post数据，需要中间件koa-bodyparser支持
    this.body = {
        errno: 0,
        msg: 'ok'
    }
})
// router.post('/api/submitComment', function *(next) {
//     console.log('提交评论')
//
//     // 获取参数
//     const params = this.params
//     console.log(this)
//     this.body = {
//         errno: 0,
//         msg: 'ok'
//     }
// })

// 开始服务并生成路由
app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);//监听3000端口
