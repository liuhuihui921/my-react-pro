import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from 'actions/userinfo'

import Header from 'components/Header'
import './style.less'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div className="main">
                <Header pathName={this.props.location.pathname} userinfo={ this.props.userinfo }/>
                {
                    this.state.initDone
                    ? this.props.children
                    : <div>正在加载...</div>
                }
            </div>
        )
    }
    componentDidMount() {
        // 获取位置信息
        // let cityName = LocalStore.getItem(CITYNAME)
        // if (cityName == null) {
        //     cityName = '北京'
        // }
        // // cityName  = '杭州'
        // this.props.userInfoActions.update({
        //     cityName: cityName
        // })

        // 更改状态
        this.setState({
            initDone: true
        })
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
      userinfo : state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
