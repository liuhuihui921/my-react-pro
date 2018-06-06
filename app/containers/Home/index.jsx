import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomeHeader from 'components/Home/homeHeader'
import Jigsaw from './subpage/jigsaw'
import Information from './subpage/information'
import HotBrand from './subpage/hotBrand'
import DesignMan from './subpage/designMan'
//详情弹窗
import Detail from 'containers/Detail'
//导入接口操作
import { getListDetail,updateUserDianzan } from 'fetch/jigsaw/jigsaw'
import { followUser } from 'fetch/designMan/designMan'
//导入action
import { updateDianzan,followUserAction } from 'actions/userinfo'

import Alert from 'components/Alert'
import './style.less'
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          detailStatus:false,//详情弹窗状态：默认隐藏
          detailData:'',//拼图详情数据
          alertStatus:false,//提示弹窗状态：默认隐藏
          alertTip:'',
          followId:''//取消关注Id，保存到state，点击弹窗确定按钮回调时使用
        }
    }
    //关闭详情弹窗
    closeDetailAlert = () => {
      this.setState({
        detailStatus:false,
        detailData:''
      });
    }

    setDetailId = (e,detailId) =>{
      e.preventDefault();
      //通过异步接口获取detail详情
      const result = getListDetail(detailId);
      this.resultHandle(result);
    }

    resultHandle(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        const jigsaweDetail = json.jigsaweDetail;
        this.setState({
          detailStatus:true,
          detailData:jigsaweDetail
        });
      })
    }

    //type 1:点赞  2：取消点赞
    //这里如果写成函数形式dianzanFun(e,type,dataId)为什么不行 this.props.userId  undefined
    dianzanFun = (e,type,dataId) =>
    {
      e.preventDefault();
      if(!this.props.userId)
      {
        alert("请先登录");
      }else{
        //更新数据到后台
        const result  = updateUserDianzan(dataId,this.props.userId,type);
        result.then((res)=>{
          return res.json();
        }).then((json)=>{
          let errorTip = "";
          if(json.errno)//提交数据失败
          {
            errorTip = '提交数据失败啦~~~~~';
          }else{//提交数据成功
            errorTip = '提交数据成功';
            //保存成功更新redux userinfo中的点赞数据
            this.props.updateDianzan(type,dataId);
          }
          alert(errorTip);
        })
      }
    }

    //关闭弹窗
    closeAlert = () => {
      this.setState({
        followId:'',
        alertStatus:false,
        alertTip:''
      });
    }

    //弹窗点击确定按钮
    confirmFun = () => {
      this.localFollowFun(2,this.state.followId,this.props.userId);
      //关闭弹窗
      this.setState({
        followId:'',
        alertStatus:false,
        alertTip:''
      });
    }
    //关注/取消关注
    followUser = (e,dataId,type) =>
    {
      e.preventDefault();//防止Link自动跳转
      if(!this.props.userId)
      {
        alert("请先登录");
      }else{
        if(type === 1)//关注
        {
          this.localFollowFun(type,dataId,this.props.userId);
        }else{//取消关注，先显示弹窗
          this.setState({
            followId:dataId,
            alertStatus:true,
            alertTip:'你确定要取消关注吗？'
          });
        }
      }
    }

    localFollowFun(type,dataId,userId)
    {
      //更新数据到后台
      const result  = followUser(type,dataId,userId);
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        let errorTip = "";
        if(json.errno)//提交数据失败
        {
          errorTip = '提交关注数据失败啦~~~~~';
        }else{//提交数据成功
          errorTip = '提交关注数据成功';
          //保存成功更新redux userinfo中的关注数据,将关注成功接口返回的关注的用户的信息保存到redux
          this.props.followUserAction(type,json.data);
        }
        console.log(errorTip);
      })
    }

    render() {
      const followIds = this.props.myfollow.map(item=>item.id*1);

      //首页header+拼图精选+右侧美间资讯+热门品牌+设计达人
        return (
          <div className="main-container">
            <div className="main-content">
              <div className="discover-home">
                <HomeHeader/>
                <Jigsaw setDetailId={this.setDetailId} dianzanFun={this.dianzanFun} dianzanArr={this.props.dianzanArr}/>
                <Information/>
                <HotBrand/>
                <DesignMan followIds={followIds}
                followUser={this.followUser}/>
              </div>
              <Detail detailData={this.state.detailData}
                detailStatus={this.state.detailStatus}
                closeDetailAlert={this.closeDetailAlert}
                dianzanFun={this.dianzanFun}
                dianzanArr={this.props.dianzanArr}
                followIds={followIds}
                followUser={this.followUser} />
            </div>
            <Alert alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} closeAlert={this.closeAlert} confirmFun={this.confirmFun}/>
          </div>
        )
    }
}
export default connect(state => ({
    userId: state.userinfo.userId,
    dianzanArr: state.userinfo.dianzan,
    myfollow:state.userinfo.myfollow
  }),{
    updateDianzan,
    followUserAction
  }
)(Home)
// export default Home
// function mapStateToProps(state) {
//     return {
//         // userinfo: state.userinfo
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//     }
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Home)
