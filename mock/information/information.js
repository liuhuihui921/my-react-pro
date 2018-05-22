// 使用 Mock
var Mock = require('mockjs');
var data = Mock.mock({
  'data|3-5':[{
    'id|+1':1,
    'link':'@url',
    'title':'@ctitle',
    'img':"@image('340x200','#dfd29b')"
  }]
});
// 输出结果
module.exports=data;
