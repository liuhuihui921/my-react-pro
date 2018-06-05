import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="detail-viewer">
              <p className="detail-btns-wrapper">
                <span className="detail-close-btn"></span>
              </p>
              <section className="detail-content">
                <div className="detail-board-viewer">
                  <div className="detail-main-body">
                    <div className="detail-booth">
                      <div className="detail-booth-frame">
                        <div className="detail-frame-wrapper">
                          
                        </div>
                      </div>
                      <aside className="detail-booth-aside">

                      </aside>
                    </div>
                    <section className="detail-items-panel"></section>
                  </div>
                  <div className="detail-log-mask">

                  </div>
                </div>
              </section>
            </div>
        )
    }
}

export default Detail
