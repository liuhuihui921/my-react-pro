// 使用 Mock
var Mock = require('mockjs');
var data = Mock.mock({
  'data|3':[{
    'id|+1':1,
    'nickName':'@cname',
    'introduction':'@ctitle(5,10)',
    'city':'@city',
    'face':"@image('70X70','#dc6464','face')",
    'sex|1':['男','女'],
    'followStatus|1':true
  }]
});
// 输出结果
module.exports=data;
