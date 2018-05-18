//首页右侧美间资讯
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe';
//导入接口操作
import { getInformationList } from 'fetch/information/information'

import './information.less'
class Information extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state  = {
          data:[],
          index:0
        }
    }

    initData(){
      const result  = getInformationList();
      this.resultHandle(result);
    }

    resultHandle(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        const data = json.data;
        const hasMore = json.hasMore;
        this.setState({
          data:data
        });
      })
    }

    componentDidMount()
    {
      this.initData();
    }

    render() {
        let opt = {
            swipeOptions : true,
            auto : 2000,
            callback : (index) => {
                this.setState({index : index})
            }
        };
        return (
          <div className="information-main">
            {
              this.state.data.length?
              this.state.data.map((item)=>{
                return (
                  <ReactSwipe swipeOptions={opt}>
                    <div className="information-item">
                      <img src={item.img} alt={data.title}/>
                    </div>
                  </ReactSwipe>
                )
              })
              :"加载中..."
            }
            information
          </div>
        )
    }
}

export default Information
