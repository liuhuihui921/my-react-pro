import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {hashHistory} from 'react-router';

import { saveUserData,clearData,loginUserData,saveImg } from 'actions/userinfo';

//导入接口操作
import { registerUser,loginUser } from 'fetch/user/userinfo'

import mixin, { padStr } from 'util/mixin';

import './style.less'
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          isRegister:false,
          errorTip:''//错误提示
        }
    }

    //保存表单输入
    handleInput = (type, event)=>{
      let value = event.target.value;
      switch(type){
        case 'nickName':
        break;
        case 'phone':
          // value = padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
        break;
        case 'password':
        break;
        default:;
      }
      this.props.saveUserData(value, type);
    }

    // 提交表单
    submitForm = () => {
      const {nickName, phone, password} = this.props.userinfo;
      let errorTip = '';
      if(!nickName.toString().length){
        errorTip = '请填写昵称';
      }else if(!phone.toString().length){
        errorTip = '请填写手机号';
      }else if(!password.toString().length){
        errorTip = '请填写账户密码';
      }else{
        //保存数据到后台
        const result  = registerUser(nickName, phone, password);
        result.then((res)=>{
          return res.json();
        }).then((json)=>{
          if(json.errno)//注册失败
          {
            errorTip = '注册失败啦~~~~~';
          }else{//注册成功
            errorTip = '添加数据成功';
            this.props.clearData();
          }
          this.setState((prevState)=>{
              return {...prevState,...{errorTip:errorTip,isRegister:false}}
          })
        })
      }
      if(errorTip)
      {
        this.setState((prevState)=>{
            return {...prevState,errorTip:errorTip}
        })
      }
    }

    //登录
    handleLogin = ()=>{
      const {phone, password} = this.props.userinfo;
      const result  = loginUser(phone, password);
      let errorTip = '';
      result.then((res)=>{
        return res.json();
      }).then((json)=>{
        if(json.errno)//登录失败
        {
          errorTip = '登录失败啦~~~~~';
          this.setState((prevState)=>{
              return {...prevState,errorTip:errorTip}
          })
        }else{//登录成功
          errorTip = '登录成功';
          this.props.clearData();
          //更新数据到redux
          this.props.loginUserData(json.data);
          //跳转
          hashHistory.push('/');
        }
      })
    }

    //切换登录注册
    handleChange = ()=>
    {
      this.setState((prevState)=>{
        return {...prevState,isRegister:!prevState.isRegister}
      })
    }

    uploadImg = event => {
      // let userinfo = new userinfo();
      // userinfo.append('file', event.target.files[0]);
      this.props.saveImg(event.target.files[0].name);
      console.log(event.target.files[0].name);
    }

    render() {
      const { isRegister,errorTip } = this.state;
        return (
            <div className='register-main'>
              <div className="register-login-wrap">
                <div className="register-login-box">
                  {
                    isRegister
                    ?<span>已经有账号？</span>
                    :<span>还没有账号？</span>
                  }
                </div>
                {
                  isRegister
                  ?<span className="register-login-btn" onClick={this.handleChange}>登录</span>
                  :<span className="register-login-btn" onClick={this.handleChange}>注册</span>
                }

              </div>
              <div className="register-wrap">
                <section className="register-info">
                  {
                    isRegister?
                    <div className="register-title">
                      欢迎来到美间.
                      <span>注册</span>
                    </div>
                    :
                    <div className="register-title">
                      欢迎回到美间.
                    </div>
                  }

                  <p className="register-error-tip">{ errorTip }</p>
                  {
                    isRegister?
                      <div className="register-input-area">
                        <div className="register-input-tip">昵称</div>
                        <div className="register-input-box">
                          <input type="text" placeholder="起一个闪亮的大名" maxLength="20" value={ this.props.userinfo.nickName } onChange={this.handleInput.bind(this, 'nickName')}/>
                        </div>
                        <div className="register-input-tip">手机号</div>
                        <div className="register-input-box">
                          <input type="tel" placeholder="仅支持中国大陆手机号" value={ this.props.userinfo.phone } onChange={this.handleInput.bind(this, 'phone')}/>
                        </div>
                        <div className="register-input-tip">密码</div>
                        <div className="register-input-box">
                          <input type="password" placeholder="请输入6-20位密码" value={ this.props.userinfo.password } data-type="password" onChange={(e)=>this.handleInput('password',e)}/>
                        </div>
                        <div className="register-input-tip">头像</div>
                        <div className="register-input-box">
                          <input type="file" value={ this.props.userinfo.face } onChange={this.uploadImg}/>
                        </div>
                      </div>
                      :
                      <div className="register-input-area">
                        <div className="register-input-tip">手机号</div>
                        <div className="register-input-box">
                          <input type="tel" placeholder="仅支持中国大陆手机号" value={ this.props.userinfo.phone } onChange={this.handleInput.bind(this, 'phone')}/>
                        </div>
                        <div className="register-input-tip">密码</div>
                        <div className="register-input-box">
                          <input type="password" placeholder="请输入6-20位密码" value={ this.props.userinfo.password } data-type="password" onChange={(e)=>this.handleInput('password',e)}/>
                        </div>
                      </div>
                    }
                  <div className="register-btns">
                    {
                      isRegister?
                      <span onClick={this.submitForm}>立即体验</span>
                      :<span onClick={this.handleLogin}>登录</span>
                    }
                  </div>
                </section>
              </div>
            </div>
        )
    }
}

export default connect(state => ({
    userinfo: state.userinfo
  }),{
    saveUserData,
    clearData,
    loginUserData,
    saveImg
  }
)(Login)
