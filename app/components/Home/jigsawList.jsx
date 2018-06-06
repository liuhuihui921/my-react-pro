// 首页拼图精选
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item'
import './style.less'

class JigsawList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
          <div className="list-container">
            {
              this.props.data.map((item,key)=>{
                return <Item key={key} data={item} setDetailId={this.props.setDetailId} dianzanFun={this.props.dianzanFun} dianzanArr={this.props.dianzanArr}/>
              })
            }
          </div>
        )
    }
}

export default JigsawList
