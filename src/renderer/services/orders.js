import request from '../utils/request';
import qs from 'qs';
import {PAGE_URL_PATH } from '../constants';

export async function query (params) {
  return request(PAGE_URL_PATH + '/orders', {
  //return request(PAGE_URL_PATH + '/alog-oss-web/ahome', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function create (params) {//新增订单
  return request(PAGE_URL_PATH + '/alog-oss-web/ordermgmt/order/toInsert', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function remove (params) {
  return request(PAGE_URL_PATH + '/orders', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function update (params) {
  return request(PAGE_URL_PATH + '/orders', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function getAccountCooperationByUserId (params) {//查询商家列表
  return request(PAGE_URL_PATH + '/alog-oss-web/basemgmt/cooperation/getAccountCooperation', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function getWarehouseByAccountCode (params) {//查询仓库列表
  return request(PAGE_URL_PATH + '/alog-oss-web/basemgmt/warehouse/getWarehouse', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function toInsert (params) {//新建订单
  return request(PAGE_URL_PATH + '/alog-oss-web/ordermgmt/order/toInsert', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function selectBoxList (params) {//箱规下拉
  return request(PAGE_URL_PATH + '/alog-oss-web/basemgmt/boxsize/selectBoxList', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function selectWhList (params) {//商家-仓库联动
  return request(PAGE_URL_PATH + '/alog-oss-web/basemgmt/cooperation/selectWhList', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function selectCustList (params) {//商家-仓库联动
  return request(PAGE_URL_PATH + '/alog-oss-web/basemgmt/customerwarehouse/selectCustList', {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}
