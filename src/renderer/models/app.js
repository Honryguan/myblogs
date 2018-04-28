import {login, userInfo, logout,getMenus} from '../services/app';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'app',
  state: {
    login: true,
    loading: false,
    loginUser: {},
    tokenUrl:"",
    menulist:[],
    loginButtonLoading: false,
    menuPopoverVisible: false,
    errMessages:"",
    siderFold: localStorage.getItem('618SiderFold') === 'true',
    darkTheme: localStorage.getItem('618DarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769
  },
  subscriptions: {
    setup({ dispatch }) {
      if(location.pathname === '/'){
           dispatch({type: 'queryUser'});
        }
      window.onresize = function () {
        dispatch({type: 'changeNavbar'});
      };
    },
  },
  effects: {
  	*login ({ payload }, {call, put}){
      yield put({type: 'showLoginButtonLoading'});
      const data = yield call(login, parse(payload));
      if (data && data.code=='0') {
        let domain="";
        let cookieVal="";
        let totalUrl="";
        if(data.extStr) {
          let arrTemp=data.extStr.split("||"); 
           domain=arrTemp[0];
           cookieVal=arrTemp[1];
          totalUrl=domain+"centervalidate/sysUser/writeCookieByToken?uasSSOToken="+cookieVal;
        }
          yield put({
            type: 'loginSuccess',
            payload: {
                tokenUrl:totalUrl
            }
          }); 
          //获取当前用户菜单
          yield put({type: 'getMenus'});       
          let loginUser=data.data;
          if(loginUser){
            yield put(routerRedux.push({pathname:"/homePage"}));
          }
          yield put({
            type: 'loginSuccess',
            payload: {
              loginUser: data.data
            }
          });
      } else {     
      	let errMsg="";
      if(!data.code){errMsg="连接服务器失败！";
      }else{
        let loginCode=data.code;
        switch (loginCode){
        case '-1':
          errMsg="暂无权限！";
          break;
        case '-2':
          errMsg="认证校验失败！";
          break;
        case '-3':
          errMsg="用户名不能为空！";
          break;
        case '-4':
          errMsg="密码不能为空！";
          break;
        case '-5':
          errMsg="密码错误！";
          break;
        case '-6':
          errMsg="用户名不存在或不可用！";
          break;
        case '-8':
          errMsg="登录错误次数已达上限，请明天再试！";
          break;
        case '-9':
          errMsg="您无权限登录此系统！";
          break;
        }
      }
        yield put({
          type: 'loginFail',
          payload:{
            errMessages:errMsg
          }
        });
      }
    },

    *getMenus ({ payload }, {call, put,select}) {      
        const dataMenu = yield call(getMenus, parse({}));
           if (dataMenu && dataMenu.code=='0'){
              yield put({
                type: 'loginSuccess',
                payload: {
                    menulist: dataMenu.data.sysAppMenuNodes,   
                }
              });
            } 
          yield put({type: 'hideLoading'});      
    },

    *logout ({ payload }, {call, put}){
    	const data = yield call(logout, parse(payload));
        if (data.code=='1') {
          yield put({
            type: 'logoutSuccess'
          });         
          let host=window.location.host;
          if(host.indexOf('localhost')<0){
            window.location.href='/';
          }
        }
    },
    *switchSider ({ payload }, {put}){
    	yield put({
    		type: 'handleSwitchSider'
    	});
    },
    *changeTheme ({ payload }, {put}) {
    	yield put({
    		type: 'handleChangeTheme'
    	});
    },
    *changeNavbar ({ payload }, {put}) {
    	if(document.body.clientWidth < 769) {
    		yield put({type: 'showNavbar'});
    	} else {
    		yield put({type: 'hideNavbar'});
    	}
    },
    *switchMenuPopver ({ payload }, {put}) {
    	yield put({
    		type: 'handleSwitchMenuPopver'
    	});
    }
  },
  reducers: {
  	loginSuccess (state, action) {
  		return {
  			...state,
  			...action.payload,
  			login: true,
  			loginButtonLoading: false
  		};
  	},
  	logoutSuccess (state) {
  		return {
  			...state,
  			login: false,
        loading:false
  		};
  	},
  	loginFail (state,action) {
  		return {
  			...state,
        ...action.payload,
  			login: false,
  			loginButtonLoading: false
  		};
  	},
  	showLoginButtonLoading (state) {
  		return {
  			...state,
  			loginButtonLoading: true
  		};
  	},
  	showLoading (state) {
  		return {
  			...state,
  			loading: true
  		}
  	},
  	hideLoading (state) {
  		return {
  			...state,
  			loading: false
  		}
  	},
  	handleSwitchSider (state) {
  		localStorage.setItem('618SiderFold', !state.siderFold);
  		return {
  			...state,
  			siderFold: !state.siderFold
  		};
  	},
  	handleChangeTheme (state) {
  		localStorage.setItem('618DarkTheme', !state.darkTheme);
  		return {
  			...state,
  			darkTheme: !state.darkTheme
  		};
  	},
  	showNavbar (state) {
  		return {
  			...state,
  			isNavbar: true
  		};
  	},
  	hideNavbar (state) {
  		return {
  			...state,
  			isNavbar: false
  		};
  	},
    handleSwitchMenuPopver (state) {
    	return {
    		...state,
    		menuPopoverVisible: !state.menuPopoverVisible
    	};
    },

    querySuccess (state, action) {
      return { ...state, ...action.payload, loading: false }
    },

  },
};
