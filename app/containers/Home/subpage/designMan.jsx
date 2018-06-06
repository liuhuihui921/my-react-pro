import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import {hashHistory} from 'react-router';
import { Link } from 'react-router'
//导入接口操作
import { getDesignManList } from 'fetch/designMan/designMan'

// import { followUserAction } from 'actions/userinfo'

import Alert from 'components/Alert'

import './css/designMan.less'
class DesignMan extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          data:[]
          // alertStatus:false,//弹窗状态：默认隐藏
          // alertTip:'',
          // followId:''//取消关注Id，保存到state，点击弹窗确定按钮回调时使用
        }
    }

    initData()
    {
      const result = getDesignManList(0);
      this.resultHandle(result);
    }

    resultHandle(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        let data = json.data;
        data.map(item=>item.showCollection = false);
        this.setState({
          data:data
        });
      })
    }

    componentDidMount()
    {
      this.initData();
    }

    handleChange()
    {
      const result = getDesignManList(1);
      this.resultHandle(result);
    }

    // handleClick(e,itemId)
    // {
    //   console.log(this.refs)
    //   if(!this.refs.follow)//关注按钮点击不跳转
    //   {
    //     hashHistory.push('/user/'+ itemId);
    //   }
    //   // if('designMan-btn-follow' !== e.target.className)
    //   // {
    //   //   hashHistory.push('/user/'+ itemId);
    //   // }
    // }

    handleMouseOver(key)
    {
      this.mouseFun(this.state.data,key,true);
    }

    handleMouseOut(key)
    {
      this.mouseFun(this.state.data,key,false);
    }

    mouseFun(statedata,key,type)
    {
      let statedataNew = statedata.map((item,k)=>{
        if( key===k )
        {
          return {...item,showCollection:type}
        }else{
          return item
        }
      })
      this.setState({
        data: statedataNew
      })
    }
    // //关闭弹窗
    // closeAlert = () => {
    //   this.setState({
    //     followId:'',
    //     alertStatus:false,
    //     alertTip:''
    //   });
    // }
    // //弹窗点击确定按钮
    // confirmFun = () => {
    //   this.localFollowFun(2,this.state.followId,this.props.userId);
    //   //关闭弹窗
    //   this.setState({
    //     followId:'',
    //     alertStatus:false,
    //     alertTip:''
    //   });
    // }
    // //关注/取消关注
    // followUser(e,dataId,type)
    // {
    //   e.preventDefault();//防止Link自动跳转
    //   if(!this.props.userId)
    //   {
    //     alert("请先登录");
    //   }else{
    //     if(type === 1)//收藏
    //     {
    //       this.localFollowFun(type,dataId,this.props.userId);
    //     }else{//取消收藏，先显示弹窗
    //       this.setState({
    //         followId:dataId,
    //         alertStatus:true,
    //         alertTip:'你确定要取消关注吗？'
    //       });
    //     }
    //   }
    // }
    //
    // localFollowFun(type,dataId,userId)
    // {
    //   //更新数据到后台
    //   const result  = followUser(type,dataId,userId);
    //   result.then((res)=>{
    //     return res.json();
    //   }).then((json)=>{
    //     let errorTip = "";
    //     if(json.errno)//提交数据失败
    //     {
    //       errorTip = '提交关注数据失败啦~~~~~';
    //     }else{//提交数据成功
    //       errorTip = '提交关注数据成功';
    //       //保存成功更新redux userinfo中的关注数据,将关注成功接口返回的关注的用户的信息保存到redux
    //       this.props.followUserAction(type,json.data);
    //     }
    //     console.log(errorTip);
    //   })
    // }

    render() {
      const result = this.state.data;
      const followIds = this.props.followIds;
        return (
          <div className="designMan-main">
            <div className="designMan-title">
              设计达人
              <span className="designMan-btn-change" onClick={()=>this.handleChange()}>换一换</span>
            </div>
            <div className="designMan-content">
              {
                result.length?
                result.map((item,key)=>{
                  return (
                    <Link to={ '/user/'+ item.id }  key={ key }>
                      <div className="designMan-item" key={ key } ref="designMan"
                        onMouseOver={()=>this.handleMouseOver(key)}
                        onMouseOut={()=>this.handleMouseOut(key)}
                      >
                        <div className="designMan-item-info">
                          <span className="designMan-face">
                            <img src={ item.face } alt={ item.nickName }/>
                          </span>
                          <div className="designMan-userinfo">
                            <span className="designMan-username">{ item.nickName }</span>
                            {
                              item.showCollection?
                              (
                                // item.followStatus? 正常情况下应该通过接口返回的数据item.followStatus判断用户是否已经关注，
                                // 但由于本地api接口通过mock模拟数据，不好操作原数据，所以通过ids来判断，方便测试
                                followIds.indexOf(item.id) !== -1?
                                <div className="designMan-btn-follow designMan-btn-cancel" ref="follow" onClick={(e)=>this.props.followUser(e,item.id,2)}><span>已关注</span></div>
                                :<div className="designMan-btn-follow" ref="follow" onClick={(e)=>this.props.followUser(e,item.id,1)}><span>关注</span></div>
                              )
                              :(
                                <div className="designMan-info">
                                    <span>{ item.sex }</span>
                                    <span>{ item.city }</span>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
                :'加载中。。。'
              }
            </div>

            {/* <Alert alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} closeAlert={this.closeAlert} confirmFun={this.confirmFun}/> */}
          </div>
        )
    }
}
export default connect(state => ({
    userId:state.userinfo.userId
  }),{}
)(DesignMan)
// export default DesignMan
