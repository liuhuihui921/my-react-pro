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
        return (
            <div className="list-item clear-fix">
                <Link to={'/detail/' + data.id} >
                    <div className="item-img-container">
                        <img src={data.img} alt={data.auter}/>
                    </div>
                    <div className="item-content">
                      <img src={data.face} alt={data.auter}/>
                      <p className="item-user">{data.auter}</p>
                      <p className="item-dianzan-num">{data.zan}人赞了</p>
                    </div>
                </Link>
                <button className="item-dianzan">点赞</button>
            </div>
        )
    }
}

export default ListItem
