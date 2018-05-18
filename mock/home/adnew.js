// 使用 Mock
var Mock = require('mockjs');
// var fileNmaeArr = Mock.Random.range(1,19);
// var data=[];
// for(let i=0;i<fileNmaeArr.length;i++)
// {
//   let mockVal = Mock.mock({
//     'fileName':fileNmaeArr[i]+'.jpg',
//     'title':'几米的猜想',
//     'desc':'几米的故事'
//   });
//   data.push(mockVal);
// };

// var Random =Mock.Random;
// Random.ctitle( 4, 6 );
// Random.csentence(10, 20);
// Random.region();
// Random.province();
// Random.city();
var data = Mock.mock({
  'data|6':[{
    'title':'@ctitle',
    'img':"@image('200x100')",
    'link':'@url'
  }]
});
// 输出结果
module.exports=data.data;
