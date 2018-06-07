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
import { followUser,collectionDesign } from 'fetch/designMan/designMan'
//导入action
import { updateDianzan,followUserAction,collectionDesignAction } from 'actions/userinfo'

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
          alertType:1,
          closeTime:0,//提示弹窗关闭时间
          followId:'',//关注、取消关注Id，保存到state，点击弹窗确定按钮回调时使用
          collectId:''//收藏设计，取消收藏Id，保存到state，点击弹窗确定按钮回调时使用
        }
        //初始化弹窗
        this.defaultAlert = {
          followId:'',
          collectId:'',
          alertStatus:false,
          alertTip:'',
          alertType:1,
          closeTime:0
        };
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
        this.textAlert('请先登录',2000);
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
          this.textAlert(errorTip,2000);
          // alert(errorTip);
        })
      }
    }

    /*提示弹窗
    alertTip:提示内容
    closeTime：自动关闭时间
    */
    textAlert = (alertTip,closeTime) =>
    {
      this.setState({
        followId:'',//关注的账户Id
        collectId:'',//收藏的设计Id
        alertStatus:true,
        alertTip:alertTip,
        alertType:2,
        closeTime:closeTime//2秒自动关闭弹窗
      });
    }


    //关闭弹窗
    closeAlert = () => {
      this.setState(this.defaultAlert);
    }

    //弹窗点击确定按钮
    confirmFun = () => {
      if(this.state.followId)
      {
        this.localFollowFun(2,this.state.followId,this.props.userId);
      }else if(this.state.collectionId){
        this.localCollectionFun(2,this.state.collectionId,this.props.userId);
      }

      //关闭弹窗
      this.setState(this.defaultAlert);
    }

    //关注/取消关注
    followUser = (e,dataId,type) =>
    {
      e.preventDefault();//防止Link自动跳转
      if(!this.props.userId)
      {
        this.textAlert('请先登录',2000);
      }else{
        if(type === 1)//关注
        {
          this.localFollowFun(type,dataId,this.props.userId);
        }else{//取消关注，先显示弹窗
          this.setState({
            followId:dataId,
            alertStatus:true,
            alertType:1,
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
        this.textAlert(errorTip,1000);
        // console.log(errorTip);
      })
    }

    //收藏品牌
    collectionFun = (dataId,type) =>
    {
      if(!this.props.userId)
      {
        this.textAlert('请先登录',2000);
      }else{
        if(type === 1)//收藏
        {
          this.localCollectionFun(type,dataId,this.props.userId);
        }else{//取消收藏，先显示弹窗
          this.setState({
            collectionId:dataId,
            alertStatus:true,
            alertType:1,
            alertTip:'你确定要取消收藏吗？'
          });
        }
      }
    }

    localCollectionFun(type,dataId,userId)
    {
      //更新数据到后台
      const result  = collectionDesign(type,dataId,userId);
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        let errorTip = "";
        if(json.errno)//提交数据失败
        {
          errorTip = '提交收藏数据失败啦~~~~~';
        }else{//提交数据成功
          errorTip = '提交收藏数据成功';
          //保存成功更新redux userinfo中的收藏数据
          // this.props.collectionBrandAction(type,dataId);
          this.props.collectionDesignAction(type,json.data);
        }
        this.textAlert(errorTip,1000);
        // console.log(errorTip);
      })
    }

    render() {
      const followIds = this.props.myfollow.map(item=>item.id*1);//已关注的用户ID
      const collectionDesignIds = this.props.mycollectiondesign.map(item=>item.id*1);//已收藏的设计Id
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
                //点赞相关
                dianzanFun={this.dianzanFun}
                dianzanArr={this.props.dianzanArr}
                //关注相关
                followIds={followIds}
                followUser={this.followUser}
                //收藏相关
                collectionDesignIds={collectionDesignIds}
                collectionFun={this.collectionFun}/>
            </div>
            <Alert alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} alertType={this.state.alertType} closeAlert={this.closeAlert} confirmFun={this.confirmFun} closeTime={this.state.closeTime}/>
          </div>
        )
    }
}
export default connect(state => ({
    userId: state.userinfo.userId,
    dianzanArr: state.userinfo.dianzan,
    myfollow:state.userinfo.myfollow,
    mycollectiondesign:state.userinfo.mycollection.design
  }),{
    updateDianzan,
    followUserAction,
    collectionDesignAction
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
