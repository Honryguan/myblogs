const Cookie = require('js-cookie');
const orders = require('./data/orders');
const login = require('./data/login');
const menus = require('./data/menus');
const userInfo = require('./data/userInfo');

export default {
  'POST /users'(req, res) {
    res.json(users); 
  },
  'POST /orders'(req, res) {
    res.json(orders); 
  },

  'POST /alog-oss-web/loginInfo' (req, res) {
    res.json(login);
  },
  'POST /alog-oss-web/ahome'(req, res) {
    res.json(menus);
  },

  'POST /alog-oss-web/getUserInfo' (req, res) {
    res.json(userInfo);
  },
  
  'POST /alog-oss-web/logouts' (req, res) {
    res.json({
      code: '1',
      message: '退出成功'
    })
  },
};