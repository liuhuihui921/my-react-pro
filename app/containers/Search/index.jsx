import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

//导入接口操作
import { getKeyWordData,getSearchData } from 'fetch/search/search'

import './style.less'
class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          worddata:[],
          word:'',
          resultData:[],
          searchTlemShow:false
        }
    }

    //保存表单输入
    handleInput = (event)=>{
      let value = event.target.value;
      this.setState({
        word:value
      });
    }

    //根据关键词返回结果
    searchResult(e,item)
    {
      const result = getSearchData(1,item);
      this.resultHandleSearch(result);
    }
    resultHandleSearch(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        const data = json.data;
        this.setState({
          resultData:data,
          searchTlemShow:false
        });
      })
    }
    //返回匹配的关键词
    searchFun(e)
    {
      if(e.keyCode === 13)//按下回车键
      {
        const result = getKeyWordData(this.state.word);
        this.resultHandle(result);
      }
    }

    resultHandle(result)
    {
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        this.setState({
          worddata:json,
          searchTlemShow:true
        });
      })
    }

    render() {
        return (
            <div className="search-main">
              <div className="search-content">
                <div className="search-wrapper">
                  <div className="search-div">
                    <header className="search-header">
                      <p className="search-hint">搜索你想要的</p>
                    </header>
                    <div className="search-input">
                      <div className="search-input-in">
                        <header className="search-box">
                          <div className="search-tab-selector-wrapper">
                            <div className="search-tab-selector">

                            </div>
                          </div>
                          <div className="search-input-wrapper">
                            <input type="text" placeholder="输入搜索" className="search-input-box" value={this.state.word} onChange={this.handleInput} onKeyDown={(e)=>this.searchFun(e)} />
                          </div>
                          {
                            this.state.searchTlemShow && this.state.worddata.length && <div className="search-elem">
                              <div data-botm="true" className="search-column">
                                <ul data-font="true" data-type="false">
                                  {
                                    this.state.worddata.map((item,key)=>{
                                      return (
                                        <li data-type="word" key={key} onClick={(e)=>this.searchResult(e,item)}>
                                          <p>{item}</p>
                                        </li>
                                      )
                                    })
                                  }
                                </ul>
                              </div>
                            </div>
                          }
                        </header>
                      </div>
                    </div>
                  </div>
                  {
                    this.state.resultData.length?
                    <div className="search-content-wrapper">
                        <ul>
                          {
                            this.state.resultData.map((item,key)=>{
                              return (
                                  <li key={key}>{item.auter}</li>
                              )
                            })
                          }
                        </ul>
                    </div>
                    :
                      <div className="search-home">
                          <span>搜索指定内容</span>
                          <ul>
                            <li>单品</li>
                            <li>品牌</li>
                            <li>拼图</li>
                            <li>用户</li>
                          </ul>
                      </div>
                  }
                </div>
              </div>
            </div>
        )
    }
}

export default Search
