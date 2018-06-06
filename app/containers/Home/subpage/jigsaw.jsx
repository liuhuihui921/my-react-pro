import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//导入UI组件
import HomeHeader from 'components/Home/homeHeader'
import JigsawList from 'components/Home/jigsawList'
import ListLoadMore from 'components/LoadMore/index'

//导入接口操作
import { getListData } from 'fetch/jigsaw/jigsaw'
//导入action
// import { updateDianzan } from 'actions/userinfo'

import './css/jigsaw.less'
class Jigsaw extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          data:[],
          hasMore : false,
          isLoadingMore : false,
          nextPage : 1,
        }
        this.loadMoreData = this.loadMoreData.bind(this);
        // this.dianzanFun = this.dianzanFun.bind(this);
    }
    // 获取数据
    initData()
    {
      const result = getListData(0);
      this.resultHandle(result);
    }
    resultHandle(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        const data = json.data;
        const hasMore = json.hasMore;
        this.setState((prevState)=>{
          return {
            data:prevState.data.concat(data),
            hasMore : hasMore
          }
        });
      })
    }
    componentDidMount()
    {
      this.initData();
    }

    loadMoreData()
    {
      this.setState({
          isLoadingMore : true
      });
      const result = getListData(this.state.nextPage);
      this.resultHandle(result);
      this.setState((prevState)=>{
        return {
          isLoadingMore:false,
          nextPage:prevState.nextPage + 1
        }
      });
    }

    // //type 1:点赞  2：取消点赞
    // dianzanFun(type,dataId)
    // {
    //   if(!this.props.userId)
    //   {
    //     alert("请先登录");
    //   }else{
    //     //更新数据到后台
    //     const result  = updateUserDianzan(dataId,this.props.userId,type);
    //     result.then((res)=>{
    //       return res.json();
    //     }).then((json)=>{
    //       let errorTip = "";
    //       if(json.errno)//提交数据失败
    //       {
    //         errorTip = '提交数据失败啦~~~~~';
    //       }else{//提交数据成功
    //         errorTip = '提交数据成功';
    //         //保存成功更新redux userinfo中的点赞数据
    //         this.props.updateDianzan(type,dataId);
    //       }
    //       alert(errorTip);
    //     })
    //   }
    // }

    render() {
        return (
          <div className="jigsaw-main">
            <div className="jigsaw-title">拼图精选</div>
            {
              this.state.data.length?
              <JigsawList data={this.state.data} dianzanFun={this.props.dianzanFun} setDetailId={this.props.setDetailId} dianzanArr={this.props.dianzanArr}/>:
              "加载中..."
            }
            {
              this.state.hasMore ?
              <ListLoadMore isLoadingMore={this.state.isLoadingMore}  loadMoreFn={this.loadMoreData}/>:
              '么有更多啦~~~~~'
            }
          </div>
        )
    }
}
export default connect(state => ({
    userId: state.userinfo.userId
  }),{}
)(Jigsaw)
// export default Jigsaw
// function mapStateToProps(state) {
//     return {
//         // userinfo: state.userinfo
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//       // listSaw:bindActionCreators(listSaw,dispatch)
//     }
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Home)
