import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'

import './style.less'

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const data = this.props.data;
        const dianzanArr = this.props.dianzanArr;
        return (
            <div className="list-item clear-fix">
                {/* <Link to={'/detail/' + data.id} > */}
                    <div className="item-img-container" onClick={(e)=>this.props.setDetailId(e,data.id)}>
                        <img src={data.img} alt={data.auter}/>
                    </div>
                    <Link to={ '/user/'+ data.auterId }>
                      <div className="item-content">
                        <img src={data.face} alt={data.auter}/>
                        <p className="item-user">{data.auter}</p>
                        <p className="item-dianzan-num">{data.zan}人赞了</p>
                      </div>
                    </Link>
                {/* </Link> */}
                {
                  dianzanArr.indexOf(data.id) === -1 ?
                  <button className="item-dianzan" onClick={(e)=>this.props.dianzanFun(e,1,data.id)}>点赞</button>
                  :<button className="item-dianzan-cancel" onClick={(e)=>this.props.dianzanFun(e,2,data.id)}>取消</button>
                }
            </div>
        )
    }
}

export default ListItem
