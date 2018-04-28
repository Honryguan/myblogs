import React, {PropTypes,Component} from 'react'
import { Button, Row, Form, Input,Icon,Checkbox} from 'antd'
import styles from './Login.less'
import topimg from '../assets/login/logo.png'
import logintip from '../assets/login/logintip.jpg'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    var mainwidth = document.body.clientWidth;
    var offset1 = 120;
    var offset2 = 230;
    var offsetbg = 0;
     this.timer = setInterval(  
      () => { 
        if (offset1 >= mainwidth) {
          offset1 =  -580;
        }

        if (offset2 >= mainwidth) {
           offset2 =  -580;
        }
        offset1 += 1.1;
        offset2 += 1;

        document.getElementById("cloud1").style.backgroundPosition=offset1 + "px -150px";
        document.getElementById("cloud2").style.backgroundPosition=offset2 + "px 180px";
        },  
        100  
    );
     
  }

componentWillUnmount() {   
    this.timer && clearInterval(this.timer);  
  }    

  handleOk = () => {
    const { onOk } = this.props;
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  toRemember = () =>{
    console.info("aaaaa");
  }

  render(){
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return (
  <div style={{"height":"100vh","width":"100vw"}}>
    <div className={styles.lgntop}>
      <img src={topimg} />
    </div>
    <div className={styles.lgnmain}>
      <div id="cloud1" className={styles.cloud2}></div>
      <div id="cloud2" className={styles.cloud}></div>
      <div className={styles.logcon} >
        <div className={styles.logtb}>
          <h2 ><img  className={styles.logintip} src={logintip} /></h2>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请填写用户名'
                  }
                ]
              })(<Input size='large' prefix={<Icon type="user" style={{ fontSize: 16,color: "#ccc"}} />} onPressEnter={this.handleOk} placeholder='请输入账号' />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码'
                  }
                ]
              })(<Input size='large' prefix={<Icon type="lock" style={{ fontSize: 16,color: "#ccc" }} />} type='password' onPressEnter={this.handleOk} placeholder='请输入密码' />)}
            </FormItem>
            <Row>
              <Checkbox onChange={this.toRemember}>记住用户名</Checkbox>
            </Row>
            <Row>
              <Button type='primary' style={{width:"100%",marginTop:5,marginBottom:5}} size='large' onClick={this.handleOk} loading={this.props.loginButtonLoading}>
                登录
              </Button>
            </Row>
            <Row>
            {/*<p>
              <span>默认账号：CSYYS</span>
              <span>密码：123456</span>
            </p>*/}
            </Row>
            <Row>
            <p className={styles.errmsg}>
              {this.props.errMessages}
            </p>
            </Row>
          </form>
       </div>
      </div>
    </div>
    <div className={styles.lgnfooter}>
    Copyright 2017 *******有限公司 版权所有 All Right Reserved
    </div>
  </div>
  )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(Login)
