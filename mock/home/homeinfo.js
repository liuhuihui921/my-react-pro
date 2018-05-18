// 使用 Mock
var Mock = require('mockjs');
var data = Mock.mock({
  'data|6':[{
    'name':'@ctitle',
    'img':"@image('200x100')",
    'ctime':'@datetime'
  }]
});
// 输出结果
module.exports=data.data;
