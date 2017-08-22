import axios from 'axios'

axios.defaults.baseURL = 'http://119.29.6.121:8080';
axios.defaults.baseURL = 'http://192.168.0.103:8088';

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
    params = params ? params : {};
    axios({
        method: 'post',
        url: url,
        data: JSON.stringify(params),
        timeout: config.timeout,
        headers: {
          'Content-type': 'application/json',
          "Accept": "*/*",
        },
        datatype : "json",
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
   * 登录
   * 
   */
  login(params, config) {
    return fetch('/medicalsystem/rest/medUsers/userLogin', params)
  },
  /**
   * 获取预备排班手术列表
   * 
   */
  getUserList(params, config) {
    return fetch('/medicalsystem/rest/medUsers/medUsersList', params)
  },
  /**
   * 获取预备排班手术列表
   * 
   */
  getScheduleList(params, config) {
    return fetch('/medicalsystem/rest/medOperationSchedule/medOperationScheduleList', params)
  },
  /**
   * 获取预备排班手术列表
   * 
   */
  getScheduleList1(params, config) {
    return fetch('/medicalsystem/rest/medOperationSchedule/medOperationScheduleList', params)
  },
  /**
   * 预备排班手术编辑
   * 
   */
  editSchedule(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/updateMedOperationSchedule', params)
  },
  /**
   * 预备排班手术编辑
   * 
   */
  getSupplyNurseList(params, config) {
    return fetch('medicalsystem/rest/medHisUsers/getHsUsers', params)
  },
  /**
   * 提交安排手术排班
   * 
   */
  submitMedOperationScheduleList(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/submitMedOperationScheduleList', params)

  },
  /**
   * 提交安排手术排班
   * 
   */
  scheduleReportView(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/scheduleReportView', params)

  },
  /**
   * 提交安排手术排班
   * 
   */
  getScheduleReportView(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/getScheduleReportView', params)

  }

}
