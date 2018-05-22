import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { Link } from 'react-router'
//导入接口操作
import { getDesignManList } from 'fetch/designMan/designMan'

import './css/designMan.less'
class DesignMan extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          data:[]
        }
    }
    initData()
    {
      const result = getDesignManList(0);
      this.resultHandle(result);
    }

    resultHandle(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        let data = json.data;
        data.map(item=>item.showCollection = false);
        this.setState({
          data:data
        });
      })
    }

    componentDidMount()
    {
      this.initData();
    }

    handleChange()
    {
      const result = getDesignManList(1);
      this.resultHandle(result);
    }

    handleMouseOver(key)
    {
      this.mouseFun(this.state.data,key,true);
    }

    handleMouseOut(key)
    {
      this.mouseFun(this.state.data,key,false);
    }

    mouseFun(statedata,key,type)
    {
      let statedataNew = statedata.map((item,k)=>{
        if( key===k )
        {
          return {...item,showCollection:type}
        }else{
          return item
        }
      })
      this.setState({
        data: statedataNew
      })
    }

    render() {
      const result = this.state.data;
        return (
          <div className="designMan-main">
            <div className="designMan-title">
              设计达人
              <span className="designMan-btn-change" onClick={()=>this.handleChange()}>换一换</span>
            </div>
            <div className="designMan-content">
              {
                result.length?
                result.map((item,key)=>{
                  return (
                    <Link to={ '/user/'+ item.id }  key={ key }>
                      <div className="designMan-item"
                        onMouseOver={()=>this.handleMouseOver(key)}
                        onMouseOut={()=>this.handleMouseOut(key)}>
                        <div className="designMan-item-info">
                          <span className="designMan-face">
                            <img src={ item.face } alt={ item.nickName }/>
                          </span>
                          <div className="designMan-userinfo">
                            <span className="designMan-username">{ item.nickName }</span>
                            {
                              item.showCollection?
                              <div className="designMan-btn-follow"><span>关注</span></div>
                              :(
                                <div className="designMan-info">
                                    <span>{ item.sex }</span>
                                    <span>{ item.city }</span>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
                :'加载中。。。'
              }

            </div>
          </div>
        )
    }
}

export default DesignMan
