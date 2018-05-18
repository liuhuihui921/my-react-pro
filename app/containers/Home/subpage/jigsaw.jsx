import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

//导入UI组件
import HomeHeader from 'components/Home/homeHeader'
import JigsawList from 'components/Home/jigsawList'
import ListLoadMore from 'components/LoadMore/index'
//导入接口操作
import { getListData } from 'fetch/jigsaw/jigsaw'

import './css/jigsaw.less'
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          data:[],
          hasMore : false,
          isLoadingMore : false,
          nextPage : 1
        }
        this.loadMoreData = this.loadMoreData.bind(this);
    }
    // 获取数据
    initData()
    {
      const result = getListData(0);
      this.resultHandle(result);
    }
    resultHandle(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        const data = json.data;
        const hasMore = json.hasMore;
        this.setState((prevState)=>{
          return {
            data:prevState.data.concat(data),
            hasMore : hasMore
          }
        });
      })
    }
    componentDidMount()
    {
      this.initData();
    }

    loadMoreData()
    {
      this.setState({
          isLoadingMore : true
      });
      const result = getListData(this.state.nextPage);
      this.resultHandle(result);
      this.setState((prevState)=>{
        return {
          isLoadingMore:false,
          nextPage:prevState.nextPage + 1
        }
      });
    }

    render() {
        return (
          <div className="jigsaw-main">
            <div className="jigsaw-title">拼图精选</div>
            {
              this.state.data.length?
              <JigsawList data={this.state.data} />:
              "加载中..."
            }
            {
              this.state.hasMore ?
              <ListLoadMore isLoadingMore={this.state.isLoadingMore}  loadMoreFn={this.loadMoreData}/>:
              '么有更多啦~~~~~'
            }
          </div>
        )
    }
}
export default Home
// function mapStateToProps(state) {
//     return {
//         // userinfo: state.userinfo
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//       // listSaw:bindActionCreators(listSaw,dispatch)
//     }
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Home)
