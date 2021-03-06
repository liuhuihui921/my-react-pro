// 使用 Mock
var Mock = require('mockjs');
var data = Mock.mock({
  'data|3':[{
    'id|+1':1,
    'title':'@ctitle(3,5)',
    'content':'@ctitle',
    'logo':"@image('56X56','#dfd29b','品牌')",
    'img|3':[{
      'imgId|+1':1,
      'title|3-5':'@ctitle',
      'img':"@image('60X60','#dfd29b')"
    }]
  }]
});
// 输出结果
module.exports=data;
