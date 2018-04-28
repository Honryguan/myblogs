import fetch from 'dva/fetch';
import fetchJsonp from 'fetch-jsonp';
import Promise from 'promise-polyfill';
import { Modal } from 'antd'

if (!window.Promise) {
  window.Promise = Promise;
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function requestJsonp(url, options) {
  return fetchJsonp(url, options)
    .then(parseJSON)
    .then(data => data)
    .catch(err => (err));
}

export default function request(url, options = {}) {
	
  if(!options.credentials){
    options.credentials = 'include'
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => (err));
}

export function request2(url, options = {}) {
  return fetch(url, options)
    .then(function(response){
      console.info(response);
      console.info(response.status);
    })
    .then(parseJSON)
    .then(data => data)
    .catch(err => (err));
}