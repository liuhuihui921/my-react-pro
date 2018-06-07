import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux';
import {hashHistory} from 'react-router';
//导入接口操作
import { saveDanpinImg } from 'fetch/user/userinfo'

import { saveDanpinImgAction } from 'actions/userinfo';

import Alert from 'components/Alert'
import './style.less'
class Collection extends React.Component {
    constructor(props, context) {
        super(props, context);
        if(!this.props.userId)
        {
          hashHistory.push('/login');
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        //all:单品  design：设计 brand：品牌
        this.state = {
          collectionType:'all',
          alertStatus:false,//弹窗状态：默认隐藏
          alertTip:'',
          closeTime:0,
          alertType:2
        }
    }

    handleChangeTab(collectionType)
    {
      this.setState({
        collectionType:collectionType
      });
    }

    //上传单品：先通过api更新到后端，然后直接更新到我收藏的单品
    uploadImg = (e) => {
      const danpinImg = e.target.files[0].name;
      //通过接口保存到后端
      const result = saveDanpinImg(this.props.userId,danpinImg);
      this.resultHandle(result);
    }

    resultHandle(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        if(json.errno)//保存失败
        {
          this.setState({
            alertStatus:true,
            alertTip:'保存失败',
            closeTime:2000
          });
        }else{
          //更新到我收藏的设计
          this.props.saveDanpinImgAction(json.imgval);

          this.setState({
            alertStatus:true,
            alertTip:'保存成功',
            closeTime:2000
          });
        }
      })
    }

    //关闭弹窗
    closeAlert = () => {
      this.setState({
        alertStatus:false,
        alertTip:'',
        closeTime:0
      });
    }

    render() {
        return (
            <div className="collection-main">
              <div className="collection-content">
                <div className="collection-item-nav" data-switch="all">
                  <div className="collection-my-item">
                    <div>
                      <div data-rule="rule_3" className="collection-upload-item">
                        <div className="collection-upload-box"></div>
                        <div className="collection-item-title">
                          <span>我收藏的单品</span>
                          <label className="collection-drag-box" for="upload_wicFt">
                            <span className="collection-drag-info">上传单品</span>
                            <input type="file" accept="image/jpeg, image/jpg, image/png" multiple="" id="upload_wicFt" onChange={this.uploadImg} style={{display: "none"}} />
                          </label>
                        </div>
                      </div>
                      <div className="collection-toggle-bar">
                        <div className="collection-toggle-wrapper">
                          <ul>
                            <li className={this.state.collectionType==='all'?"collection-toggle-active":""} onClick={()=>this.handleChangeTab('all')}>
                              <span>
                                单品
                                <span className="collection-toggle-a"></span>
                              </span>
                            </li>
                            <li  className={this.state.collectionType==='design'?"collection-toggle-active":""} onClick={()=>this.handleChangeTab('design')}>
                              <span>
                                设计
                                <span className="collection-toggle-a"></span>
                              </span>
                            </li>
                            <li  className={this.state.collectionType==='brand'?"collection-toggle-active":""} onClick={()=>this.handleChangeTab('brand')}>
                              <span>
                                品牌
                                <span className="collection-toggle-a"></span>
                              </span>
                            </li>
                          </ul>
                          {/* <div className="collection-wrapper-line">
                            <div className="collection-tab collection-tab-0"></div>
                            <div className={`collection-tab ${this.state.collectionType==='all'?'collection-tab-0':(this.state.collectionType==='design'?'collection-tab-1':'collection-tab-2')}`}></div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      {
                        this.state.collectionType==='brand'?
                        (
                          this.props.mycollection.brand.length?
                            <div className="collection-collect-brand">
                              <div className="collection-item-list">
                                <div className="collection-list-container">
                                  <section className="collection-list">
                                    {
                                      this.props.mycollection.brand.map((item,key)=>{
                                        return (
                                          <div key={key} className="collection-collect-box">
                                            <div className="collection-brand-wrap">
                                              <div className="collection-brand-logo">
                                                <img src={item.logo} draggable="false" />
                                              </div>
                                              <div className="collection-brand-desc">
                                                <div className="collection-brand-name">
                                                  {item.title}
                                                </div>
                                                <div className="collection-brand-info">
                                                  已入驻
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })
                                    }
                                  </section>
                                </div>
                              </div>
                            </div>
                          :<p className="collection-desc-no-child">你没有收藏的品牌</p>
                        )
                        :''
                      }
                      {
                        this.state.collectionType==='design'?
                        (
                          this.props.mycollection.design.length?
                            <div className="collection-collect-brand">
                              <div className="collection-item-list">
                                <div className="collection-list-container">
                                  <section className="collection-list">
                                {
                                  this.props.mycollection.design.map((item,key)=>{
                                  return (
                                    <div key={key} className="collection-collect-box">
                                      <div className="collection-brand-wrap">
                                        <div className="collection-brand-logo">
                                          <img src={item.img} draggable="false" />
                                        </div>
                                        <div className="collection-brand-desc">
                                          <div className="collection-brand-name">
                                            {item.auter}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </section>
                            </div>
                          </div>
                        </div>
                        :<p className="collection-desc-no-child">你没有收藏的设计</p>
                        )
                      :''
                    }
                    {
                      this.state.collectionType==='all'?
                      (
                        this.props.mycollection.danpin.length?
                          <div className="collection-collect-brand">
                            <div className="collection-item-list">
                              <div className="collection-list-container">
                                <section className="collection-list">
                                  {
                                    this.props.mycollection.danpin.map((item,key)=>{
                                    return (
                                      <div key={key} className="collection-collect-box">
                                        <div className="collection-brand-wrap">
                                          <div className="collection-brand-logo">
                                            <img src={item.path} draggable="false" />
                                          </div>
                                          <div className="collection-brand-desc">
                                            <div className="collection-brand-name">
                                              {item.name}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                                </section>
                              </div>
                            </div>
                          </div>
                        :<p className="collection-desc-no-child">你没有收藏的单品</p>
                      )
                      :''
                    }
                    </div>
                  </div>
                </div>
              </div>
              <Alert alertTip={this.state.alertTip} alertStatus={this.state.alertStatus} alertType={this.state.alertType} closeAlert={this.closeAlert} confirmFun={false} closeTime={this.state.closeTime}/>
            </div>
        )
    }
}
export default connect(state => ({
    userId:state.userinfo.userId,
    mycollection: state.userinfo.mycollection
  }),{saveDanpinImgAction}
)(Collection)

// export default Collection
