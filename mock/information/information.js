// 使用 Mock
var Mock = require('mockjs');
var data = Mock.mock({
  'data|3-5':[{
    'id|+1':1,
    'title':'@ctitle',
    'img':"@image('240x130','#dfd29b')"
  }]
});
// 输出结果
module.exports=data;
