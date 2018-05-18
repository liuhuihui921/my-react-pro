// 使用 Mock
var Mock = require('mockjs');
var data = Mock.mock({
  'data|10-20':[{
    'id|+1':1,
    'auter':'@ctitle',
    'face':"@image('30X30','#556a9a')",
    'img':"@image('240x130','#dfd29b')",
    'zan|10-100':10,
    'ctime':'@datetime',
    'zanUser':[1,2]
  }],
  hasMore: true,
});
// 输出结果
module.exports=data;
