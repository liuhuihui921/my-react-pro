import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './style.less'
class UserInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        this.clickTab = this.clickTab.bind(this);

        this.state = {
          activeTab:'design'
        }
    }

    clickTab(type){
      this.setState((prevState)=>{
        return {...prevState,activeTab:type}
      });
    }
// className={`icon-jian ${item.selectNum > 0? 'edit-active':''}`}
    render() {
        return (
            <div className="userInfo-main">
              <section className="userInfo-content">
                <div className="userInfo-content-info">
                  <div className="userInfo-info">
                    <div className="userInfo-main-box">
                      <div className="userInfo-user-box">
                        <div className="userInfo-user-info">
                          <div className="userInfo-user-profile">
                              <span className="userInfo-user-face"><i>美</i></span>
                          </div>
                          <div className="userInfo-user-detail">
                            <span className="userInfo-name"><label>{this.props.userinfo.nickName}</label></span>
                            <span className="userInfo-brief"></span>
                            <span className="userInfo-desc">{this.props.userinfo.desc}</span>
                          </div>
                        </div>
                        <div className="userInfo-user-bar">
                          <ul>
                            <li className="userInfo-tab">
                              <span className={this.state.activeTab === 'design'?"userInfo-active":""}  onClick={()=>this.clickTab('design')}>
                                <p className="userInfo-num">0</p>
                                <p className="userInfo-font">设计</p>
                              </span>
                            </li>
                            <li className="userInfo-tab">
                              <span className={this.state.activeTab === 'single'?"userInfo-active":""} onClick={()=>this.clickTab('single')}>
                                <p className="userInfo-num">0</p>
                                <p className="userInfo-font">单品</p>
                              </span>
                            </li>
                            <li className="userInfo-tab">
                              <span className={this.state.activeTab === 'follow'?"userInfo-active":""} onClick={()=>this.clickTab('follow')}>
                                <p className="userInfo-num">0</p>
                                <p className="userInfo-font">关注</p>
                              </span>
                            </li>
                            <li className="userInfo-tab">
                              <span className={this.state.activeTab === 'fans'?"userInfo-active":""} onClick={()=>this.clickTab('fans')}>
                                <p className="userInfo-num">0</p>
                                <p className="userInfo-font">粉丝</p>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="userInfo-switchBar">

                    </div>
                  </div>
                </div>
              </section>
            </div>
        )
    }
}

export default connect(state => ({
    userinfo: state.userinfo
  }),{}
)(UserInfo)
