import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
/*
提示弹窗
alertTip：弹窗msg信息
alertStatus：弹窗状态（显示/隐藏）
closeAlert：关闭弹窗函数
confirmFun：确定按钮执行操作
alertType:1说明有回调需要执行 2:纯提示弹窗，没有按钮
没有值则只是一个单纯的提示弹窗，给定时间自动关闭
closeTime:自动关闭弹窗时间
 */
class Alert extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    //更新发生后立即被调用，这里不能用componentDidMount()
    componentDidUpdate()
    {
      if(this.props.closeTime && this.props.alertType === 2)
      {
        setTimeout(this.props.closeAlert,this.props.closeTime);//多少时间后自动关闭弹窗
      }
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
                  {
                    this.props.confirmFun && this.props.alertType === 1?
                    <div>
                      <span className="modal-btn modal-btn-cancel" onClick={this.props.closeAlert}>取消</span>
                      <span className="modal-btn modal-btn-confirm" onClick={this.props.confirmFun}>确定</span>
                    </div>
                    :''
                  }
                </div>
              </div>
            </div>
        )
    }
}

export default Alert
