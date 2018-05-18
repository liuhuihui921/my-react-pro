import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//导入接口操作
import { getHotBrandList } from 'fetch/hotBrand/hotBrand'

import './css/hotBrand.less'

class HotBrand extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          data:[]
        }
    }

    initData()
    {
      const result =  getHotBrandList();
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
        return (
            <div className="hotbrand-main">
              <div className="hotbrand-title">美间资讯</div>
              <div className="hotbrand-content">
              {
                this.state.data.length?
                  this.state.data.map((item,key)=>{
                    return (
                      <div key={key} className="hotbrand-item">
                        <div className="hotbrand-top">
                          <div className="hotbrand-top-img">
                            <img src={item.logo} alt={item.title}/>
                          </div>
                          <div className="hotbrand-top-text">
                            <p>{item.title}</p>
                            <p>{item.content}</p>
                          </div>
                        </div>
                        <div className="hotbrand-foot">
                          {
                            item.img.map((itemImg,key)=>{
                              return (
                                <div key={key} className="hotbrand-foot-img"><img src={itemImg.img} alt={itemImg.title}/></div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                :'加载中。。。'
              }
              </div>
            </div>
        )
    }
}

export default HotBrand
