import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomeHeader from 'components/Home/homeHeader'
import Jigsaw from './subpage/jigsaw'
import Information from './subpage/information'
import HotBrand from './subpage/hotBrand'
import DesignMan from './subpage/designMan'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
      //首页header+拼图精选+右侧美间资讯+热门品牌+设计达人
        return (
          <div>
            <HomeHeader/>
            <Jigsaw/>
            <Information/>
            <HotBrand/>
            <DesignMan/>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
