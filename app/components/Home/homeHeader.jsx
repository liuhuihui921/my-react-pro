// 首页header
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="home-header">
              <p className="home-header-title">寻找你的创作灵感</p>
              <p style={{height:'20px'}}>浏览其他设计师的作品，分享你的设计杰作</p>
            </div>
        )
    }
}

export default HomeHeader
