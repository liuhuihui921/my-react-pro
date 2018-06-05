import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomeHeader from 'components/Home/homeHeader'
import Jigsaw from './subpage/jigsaw'
import Information from './subpage/information'
import HotBrand from './subpage/hotBrand'
import DesignMan from './subpage/designMan'
//详情弹窗
import Detail from 'containers/Detail'

import './style.less'
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          detailStatus:false,//详情弹窗状态：默认隐藏
          detailData:''
        }
    }
    //关闭详情弹窗
    closeDetailAlert = () => {
      this.setState({
        detailStatus:false,
        detailData:''
      });
    }

    render() {
      //首页header+拼图精选+右侧美间资讯+热门品牌+设计达人
        return (
          <div className="main-container">
            <div className="main-content">
              <div className="discover-home">
                <HomeHeader/>
                <Jigsaw/>
                <Information/>
                <HotBrand/>
                <DesignMan/>
              </div>
              <Detail detailData={this.state.detailData} detailStatus={this.state.detailStatus} closeDetailAlert={this.closeDetailAlert} />
            </div>
          </div>
        )
    }
}
export default connect(state => ({
    userId: state.userinfo.userId
  }),{}
)(Home)
// export default Home
// function mapStateToProps(state) {
//     return {
//         // userinfo: state.userinfo
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//     }
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Home)
