import request from '../utils/request';
import { PAGE_URL_PATH } from '../constants';
import qs from 'qs';
const Cookie = require('js-cookie');
import {requestJsonp,request2} from '../utils/request';

export  function login (params) {
  let data={
    userCode:params.username,
    password:params.password
  };
   return request('/alog-oss-web/loginInfo', {
  	method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(data),
  });
}

export  function getMenus (params) {
   return request('/alog-oss-web/ahome', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params),
  });
}

export  function logout (params) {
    /*Cookie.remove('otms_name', { path: '' });
    var response={
      success: true,
      message: '退出成功'
    }
    return response;*/
    return request('/alog-oss-web/logouts', {
      method: 'post',
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      body: qs.stringify(params),
    });
    
}

export  function userInfo (params) {
  
 /*let name=Cookie.get('otms_name');
  console.info("the cookie name is ------"+name);
  let response={};
  if(name){
    response = {
      username: Cookie.get('otms_name') || '',
      success: true,
    }
  }else{
    response = {
      success: false
    }
  }
    
    return response;*/
  return request('/alog-oss-web/getUserInfo', {
  method: 'post',
  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  body: qs.stringify(params),
  });
}
