import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import './style.less'

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="header">

              <Link to='/'><span className={`nav ${this.props.pathName == '/'?'active':''}`}>美间</span></Link>
              <Link to='/search'><span className='nav'>搜索</span></Link>
              {
                this.props.userinfo.userId?
                (
                  <div><Link to='/my/design'><span className='nav'>我的设计</span></Link>
                  <Link to='/my/collection'><span className='nav'>收藏夹</span></Link>
                  <Link to='/my/userinfo'><span className='nav'>个人中心</span></Link></div>
                )
                :<Link to='/login'><span className='nav'>登录</span></Link>
              }
            </div>
        )
    }
}

export default Header
