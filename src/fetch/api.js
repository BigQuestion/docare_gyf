import axios from 'axios'

axios.defaults.baseURL = 'http://119.29.6.121:8080';


//返回状态判断
axios.interceptors.response.use((res) => {
  return res;
}, (error) => {
  return Promise.reject(error);
});

export function fetch(url, params, config) {
  if (!config) {
    config = {};
  }
  if (!config.timeout) {
    config.timeout = 5000;
  }
  return new Promise((resolve, reject) => {
    params = params?params:'';
    axios({
        method: 'post',
        url: url,
        data: params,
        timeout: config.timeout
      })
      .then(function(response) {
        resolve(response.data);
      }).catch(function(error) {
        reject(error);
      });
  })
}

export default {
  /**
   * 用户注册
   */
  Regist(params, config) {
    return fetch('/medicalsystem/rest/medUsers/medUsersList', params)
  }
}
