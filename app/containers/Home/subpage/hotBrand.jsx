import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux';
//导入接口操作
import { getHotBrandList,collectionBrand } from 'fetch/hotBrand/hotBrand'

import Alert from 'components/Alert'

import { collectionBrandAction } from 'actions/userinfo'
import './css/hotBrand.less'

class HotBrand extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          data : [],
          alertStatus:false,//弹窗状态：默认隐藏
          alertTip:'',
          alertType:1,//1：有确定，取消按钮 2：纯提示弹窗
          closeTime:0,
          collectionId:''//取消收藏Id，保存到state，点击弹窗确定按钮回调时使用
        }
        // this.collectionFun = this.collectionFun.bind(this);
        // this.handleMouseOver  = this.handleMouseOver.bind(this);
        // this.handleMouseOut  = this.handleMouseOut.bind(this);
    }

    initData()
    {
      const result =  getHotBrandList(0);
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

    handleMouseOver(key)
    {
      let statedata = this.state.data;
      let statedataNew = statedata.map((item,k)=>{
        if( key===k )
        {
          return {...item,showCollection:true}
        }else{
          return item
        }
      })
      this.setState({
        data: statedataNew
      })
    }

    handleMouseOut(key)
    {
      let statedataOut = this.state.data;
      let statedataOutNew = statedataOut.map((item,k)=>{
        if( key===k )
        {
          return {...item,showCollection:false}
        }else{
          return item
        }
      });
      this.setState({
        data: statedataOutNew
      })
    }

    handleChange()
    {
      const result =  getHotBrandList(1);
      this.resultHandle(result);
    }
    /*提示弹窗
    alertTip:提示内容
    closeTime：自动关闭时间
    */
    textAlert = (alertTip,closeTime) =>
    {
      this.setState({
        collectionId:'',//收藏的设计Id
        alertStatus:true,
        alertTip:alertTip,
        alertType:2,
        closeTime:closeTime//2秒自动关闭弹窗
      });
    }

    //关闭弹窗
    closeAlert = () => {
      this.setState({
        alertType:1,
        collectionId:'',
        alertStatus:false,
        alertTip:'',
        closeTime:0
      });
    }
    //弹窗点击确定按钮
    confirmFun = () => {
      this.localCollectionFun(2,this.state.collectionId,this.props.userId);
      //关闭弹窗
      this.setState({
        collectionId:'',
        alertStatus:false,
        alertTip:'',
        alertType:1,
        closeTime:0
      });
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
      const result  = collectionBrand(type,dataId,userId);
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
          this.props.collectionBrandAction(type,json.data);
        }
        this.textAlert(errorTip,1000);
        // console.log(errorTip);
      })
    }
    render() {
      const ids = this.props.mycollection.map(item=>item.id);
        return (
            <div className="hotbrand-main">
              <div className="hotbrand-title">
                热门品牌
                <span className="hotbrand-btn-change" onClick={()=>this.handleChange()}>换一换</span>
              </div>
              <div className="hotbrand-content">
              {
                this.state.data.length?
                  this.state.data.map((item,key)=>{
                    return (
                      <div key={key} className="hotbrand-item">
                        <div className="hotbrand-top"
                             onMouseOver={()=>this.handleMouseOver(key)}
                             onMouseOut={()=>this.handleMouseOut(key)}>
                          <div className="hotbrand-top-img">
                            <img src={item.logo} alt={item.title}/>
                          </div>
                          <div className="hotbrand-top-text">
                            <p className="hotbrand-text-name">{item.title}</p>
                            {
                              item.showCollection?
                              (
                                // item.collectionStatus? 正常情况下应该通过接口返回的数据item.collectionStatus判断用户是否已经收藏，
                                // 但由于本地api接口通过mock模拟数据，不好操作原数据，所以通过ids来判断，方便测试
                                ids.indexOf(item.id) !== -1?
                                // this.props.mycollection.indexOf(item.id) === -1?
                                <div className="hotbrand-btn-collection hotbrand-btn-cancel" onClick={()=>this.collectionFun(item.id,2)}><span>已收藏</span></div>
                                :<div className="hotbrand-btn-collection" onClick={()=>this.collectionFun(item.id,1)}><span>收藏</span></div>
                              )
                              :<p className="hotbrand-text-content">{item.content}</p>
                            }
                          </div>
                        </div>
                        <div className="hotbrand-foot">
                          {
                            item.img.map((itemImg,key)=>{
                              return (
                                <div key={key} className="hotbrand-foot-img"><img src={itemImg.img} alt={itemImg.title}/></div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                :'加载中。。。'
              }
              </div>

              <Alert alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} alertType={this.state.alertType} closeAlert={this.closeAlert} confirmFun={this.confirmFun} closeTime={this.state.closeTime}/>
            </div>
        )
    }
}
export default connect(state => ({
    userId:state.userinfo.userId,
    mycollection:state.userinfo.mycollection.brand
  }),{collectionBrandAction}
)(HotBrand)
// export default HotBrand
