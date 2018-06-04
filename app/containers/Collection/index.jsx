import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class Collection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="collection-main">
              <div className="collection-content">
                <div className="collection-item-nav">
                  <div className="collection-my-item">
                    <div>
                      <div data-rule="rule_3" className="collection-upload-item">
                        <div className="collection-upload-box"></div>
                        <div className="collection-item-title">
                          <span>我收藏的单品</span>
                          <label className="collection-drag-box" for="upload_wicFt">
                            <span className="collection-drag-info">上传单品</span>
                            <input type="file" accept="image/jpeg, image/jpg, image/png" multiple="" id="upload_wicFt" style={{display: "none"}} />
                          </label>
                        </div>
                      </div>
                      <div className="collection-toggle-bar">
                        <div className="collection-toggle-wrapper">
                          <ul>
                            <li>
                              <span className="collection-toggle-active">
                                单品
                                <span className="collection-toggle-a"></span>
                              </span>
                            </li>
                            <li>
                              <span>
                                设计
                                <span className="collection-toggle-a"></span>
                              </span>
                            </li>
                            <li>
                              <span>
                                品牌
                                <span className="collection-toggle-a"></span>
                              </span>
                            </li>
                          </ul>
                          <div className="collection-wrapper-line">

                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="collection-collect-brand">
                        <div className="collection-item-list">
                          <div className="collection-list-container">
                            <section className="collection-list">
                              <div className="collection-collect-box">
                                <div className="collection-brand-wrap">
                                  <div className="collection-brand-logo">
                                    <img src="" draggable="false" />
                                  </div>
                                  <div className="collection-brand-desc">
                                    <div className="collection-brand-name">
                                      百易尚品
                                    </div>
                                    <div className="collection-brand-info">
                                      已入驻
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Collection
