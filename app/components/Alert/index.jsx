import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
/*
提示弹窗
alertTip：弹窗msg信息
alertStatus：弹窗状态（显示/隐藏）
closeAlert：关闭弹窗函数
confirmFun：确定按钮执行操作
 */
class Alert extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            this.props.alertStatus&&<div className="modal-main">
              <div className="modal-content">
                <div className="modal-msg">
                    {this.props.alertTip}
                </div>
                <div className="modal-footer">
                  <div className="modal-item-dialog"></div>
                  <div>
                    <span className="modal-btn modal-btn-cancel" onClick={this.props.closeAlert}>取消</span>
                    <span className="modal-btn modal-btn-confirm" onClick={this.props.confirmFun}>确定</span>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Alert
