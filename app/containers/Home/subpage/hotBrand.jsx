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
          data : []
        }
        // this.handleMouseOver  = this.handleMouseOver.bind(this);
        // this.handleMouseOut  = this.handleMouseOut.bind(this);
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
        let data = json.data;
        data.map((item)=>{
          item.showCollection = false;
        });
        this.setState({
          data:data
        });
      })
    }

    componentDidMount()
    {
      this.initData();
    }

    handleMouseOver(key)
    {
      let statedata = this.state.data;
      let statedataNew = statedata.map((item,k)=>{
        if( key===k )
        {
          return {...item,showCollection:true}
        }else{
          return item
        }
      })
      console.log(statedataNew);
      this.setState({
        data: statedataNew
      })
      console.log(this.state.data);
    }

    handleMouseOut(key)
    {
      let statedataOut = this.state.data;
      let statedataOutNew = statedataOut.map((item,k)=>{
        if( key===k )
        {
          return {...item,showCollection:false}
        }else{
          return item
        }
      });
      this.setState({
        data: statedataOutNew
      })
    }
    render() {
        return (
            <div className="hotbrand-main">
              <div className="hotbrand-title">
                热门品牌
                <span className="hotbrand-btn-change">换一换</span>
              </div>
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
                          <div className="hotbrand-top-text"
                               onMouseOver={()=>this.handleMouseOver(key)}
                               onMouseOut={()=>this.handleMouseOut(key)}>
                            <p className="hotbrand-text-name">{item.title}</p>
                            {
                              item.showCollection?
                              <div className="hotbrand-btn-collection"><span>收藏</span></div>
                              :<p className="hotbrand-text-content">{item.content}</p>
                            }
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
