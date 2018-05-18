//首页右侧美间资讯
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe';
//导入接口操作
import { getInformationList } from 'fetch/information/information'

import './css/information.less'
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
        this.setState({
          data:data
        });
        console.log(this.state.data)
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
            <div className="information-title">美间资讯</div>
            {
              this.state.data.length?
              <ReactSwipe swipeOptions={opt}>
                {
                  this.state.data.map((item,key)=>{
                    return (
                        <div className="information-item" key={key}>
                          <img src={item.img} alt={item.title}/>
                        </div>
                    )
                  })
                }
              </ReactSwipe>
              :"加载中..."
            }
          </div>
        )
    }
}

export default Information
