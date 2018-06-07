import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './style.less'
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          collectBtnShow:false
        }
    }

    handleMouseOver = () =>
    {
      this.setState({
        collectBtnShow: true
      })
    }

    handleMouseOut = () =>
    {
      this.setState({
        collectBtnShow: false
      })
    }

    render() {
        const dianzanArr = this.props.dianzanArr;
        const followIds = this.props.followIds;
        const collectionDesignIds = this.props.collectionDesignIds;
        // console.log(followIds)
        // console.log(this.props.detailData.auterId)
        // console.log(followIds.indexOf(this.props.detailData.auterId))
        return (
            this.props.detailStatus && <div className="detail-viewer">
              <p className="detail-btns-wrapper">
                <span className="detail-close-btn" onClick={this.props.closeDetailAlert}></span>
              </p>
              <section className="detail-content">
                <div className="detail-board-viewer">
                  <div className="detail-main-body">
                    <div className="detail-booth">
                      <div className="detail-booth-frame">
                        <div className="detail-frame-wrapper">
                          <div className="detail-frame-container">
                            <p className="detail-frame-img"></p>
                          </div>
                          <i className="detail-next-btn"></i>
                        </div>
                      </div>
                      <aside className="detail-booth-aside">
                        <div className="detail-summary">
                          <div className="detail-board detail-common-panel">
                            <h1 className="detail-board-name"></h1>
                            <p className="detail-board-tag">#简约</p>
                            <Link to={ '/design/'+ this.props.detailData.id }>
                              <p className="detail-edit-btn">再创作</p>
                            </Link>
                            {
                              collectionDesignIds.indexOf(this.props.detailData.id) === -1?
                              <p className="detail-collect-btn" onClick={()=>this.props.collectionFun(this.props.detailData.id,1)}>收藏</p>
                              :<p className="detail-collect-btn detail-collected-btn" onClick={()=>this.props.collectionFun(this.props.detailData.id,2)}>已收藏</p>
                            }
                            <div className="detail-group-btn">
                              {/* 已关注  detail-liked-btn */}
                              {
                                dianzanArr.indexOf(this.props.detailData.id) === -1 ?
                                <i data-title="点赞" className="detail-like-btn" onClick={(e)=>this.props.dianzanFun(e,1,this.props.detailData.id)}>
                                  <span className="detail_likeAni">+1</span>
                                  <span className="detail_unlikeAni">-1</span>
                                </i>
                                :<i data-title="已点赞" className="detail-like-btn detail-liked-btn" onClick={(e)=>this.props.dianzanFun(e,2,this.props.detailData.id)}>
                                  <span className="detail_likeAni">+1</span>
                                  <span className="detail_unlikeAni">-1</span>
                                </i>
                              }

                            </div>
                          </div>
                          <div className="detail-designer detail-common-panel">
                            <div className="detail-designer-title">
                              作者
                              {/* 已关注加class  detail-followed-btn */}
                              {
                                followIds.indexOf(this.props.detailData.auterId) !== -1?
                                <span className="detail-follow-btn detail-followed-btn" onClick={(e)=>this.props.followUser(e,this.props.detailData.auterId,2)}></span>
                                :<span className="detail-follow-btn" onClick={(e)=>this.props.followUser(e,this.props.detailData.auterId,1)}></span>
                              }

                            </div>
                            <div className="detail-designer-content">
                              <Link to={ '/user/'+ this.props.detailData.auterId }>
                                <span className="detail-designer-avatar Avatar-avatar" style={this.props.detailData.img?{backgroundColor: 'transparent',backgroundImage:'url('+this.props.detailData.img+')'}:{backgroundColor: 'transparent'}}></span>
                              </Link>
                              <div className="detail-designer-info">
                                <p className="detail-designer-name"><span>{this.props.detailData.auter}</span></p>
                                <p className="detail-designer-time">更新于 {this.props.detailData.ctime}</p>
                              </div>
                            </div>
                          </div>
                          <div className="detail-avators detail-common-panel">
                            <p className="detail-avators-amout">{this.props.detailData.zan}人赞了</p>
                            <div className="detail-avators-groups">
                              <span className="detail-group-avator Avator-avator" data-title="自★在" style={{zIndex: '9',backgroundColor: 'rgb(195, 161, 186)'}}><i style={{fontSize: "30px"}}>自</i></span>
                              <span className="detail-group-avator Avator-avator" data-title="自★在" style={{zIndex: '8',backgroundColor: 'transparent',backgroundImage: 'url(http://dummyimage.com/40X40/dfd29b)'}}></span>
                            </div>
                          </div>
                        </div>
                      </aside>
                    </div>
                    <section className="detail-items-panel">
                      <p className="detail-items-title">单品列表</p>
                      <div style={{position:'relative'}}>
                        <section className="detail-item-list-panel">
                          <div className="detail-item-box global__item-box"
                            onMouseOver={this.handleMouseOver}
                            onMouseOut={this.handleMouseOut}>
                            <div className="detail-item-inner">
                              <i className="detail-item-img" style={{backgroundImage:'url(http://dummyimage.com/170X300/dfd29b&text=单)'}}></i>
                              <p className="detail-item-btns-wrapper" style={this.state.collectBtnShow?{display: "block"}:{display: "none"}}>
                                <i className="detail-collect-btn CollectBtn__collect-btn" data-title="收藏" data-disabled="false"></i>
                              </p>
                            </div>
                            <div className="detail-item-show-info">
                              <span>物设家</span>
                              <div className="detail-font-color"><span>¥569</span></div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </section>
                  </div>
                  <div className="detail-log-mask">
                  </div>
                </div>
              </section>
            </div>
        )
    }
}
export default connect(state => ({
    userId: state.userinfo.userId
  }),{

  }
)(Detail)
// export default Detail
