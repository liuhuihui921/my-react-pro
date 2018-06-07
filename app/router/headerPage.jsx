import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux';

import NotFound from 'containers/404'
import Home from 'containers/Home'
import Login from 'containers/Login'
import UserInfo from 'containers/UserInfo'
import Collection from 'containers/Collection'
import Search from 'containers/Search'
import User from 'containers/UserInfo/user'
import Header from 'components/Header'

class Headerpage extends React.Component {
    render() {
        return (
          <div>
            <Header pathName={this.props.location.pathname} userinfo={ this.props.userinfo }/>
            <IndexRoute component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/my/userinfo' component={UserInfo}/>
            <Route path='/my/collection' component={Collection}/>
            <Route path='/user/:userId' component={User}/>
            <Route path='/Search' component={Search}/>
            <Route path='/design/:designId' component={Design}/>
            <Route path='*' component={NotFound}/>
          </div>
        )
    }
}
export default connect(state => ({
    userinfo: state.userinfo
  }),{
  }
)(Headerpage)
// export default Headerpage
