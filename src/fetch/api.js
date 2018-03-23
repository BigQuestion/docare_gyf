import axios from 'axios'
axios.defaults.baseURL = 'http://182.61.36.247:8080';
//axios.defaults.baseURL = 'http://192.168.0.101:8088';

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
    config.timeout = 500000;
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
        datatype: "json",
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
   * 获取获取麻醉科的医生
   * 
   */
  getMzkUsers(params, config) {
    return fetch('medicalsystem/rest/medHisUsers/getMzkUsers', params)
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
  doSql(params, config) {
    return fetch('medicalsystem/rest/jdbcConn/sqlExqute', params)

  },
  /**
   * 提交安排手术排班
   * 
   */
  getScheduleReportView(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/getScheduleReportView', params)

  },
  /**
   * 提交安排手术排班
   * 
   */
  getMedOperationMasterList(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/getMedOperationMasterList', params)

  },
  /**
   * 取消手术安排
   * 
   */
  cancleMedOperationSchedule(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/cancleMedOperationSchedule', params)

  },
  /**
   * 恢复取消手术安排
   * 
   */
  addCancleMedOperationSchedule(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/addCancleMedOperationSchedule', params)

  },
  /**
   * 获取患者信息详情
   * 
   */
  getPatienDetailInfo(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/selectPatientInfoMaster', params)
  },

  /**
   * 获取字典里面常用术语
   * 
   */
  getMedAnesthesiaCommType(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/medAnesthesiaCommType/getAllType', params)
  },

  /**
   * 获取常用术语字典列表
   * 
   */
  getMedAnesthesiaCommDictByItemClass(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/medAnesthesiaCommDictByItemClass', params)
  },

  /**
   * 删除常用术语具体某条数据
   * 
   */
  deleteByMedAnesthesiaInputDict(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/deleteByMedAnesthesiaInputDict', params)
  },

  /**
   * 修改常用术语具体某条数据
   * 
   */
  updateMedAnesthesiaInputDict(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/updateMedAnesthesiaInputDict', params)
  },

  /**
   * 新增常用术语具体某条数据
   * 
   */
  insertMedAnesthesiaInputDict(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/insertMedAnesthesiaInputDict', params)
  },

  /**
   * 新增单子名称
   * 
   */
  insertMedFormTemp(params, config) {
    return fetch('medicalsystem/rest/medFormCon/insertMedFormTemp', params)
  },

  /**
   * 获取单子信息
   * 
   */
  selectMedFormTemp(params, config) {
    return fetch('medicalsystem/rest/medFormCon/selectMedFormTemp', params)
  },

  /**
   * 修改单子信息
   * 
   */
  updateMedFormContent(params, config) {
    return fetch('medicalsystem/rest/medFormCon/updateMedFormContent', params)
  },

  /**
   * 获取所有单子信息
   * 
   */
  selectMedFormList(params, config) {
    return fetch('medicalsystem/rest/medFormCon/selectMedFormList', params)
  },

  /**
   * 修改病人在手术间状态
   * 
   */
  changeOperationStatus(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/changeOperationStatus', params)
  },

  /**
   * 获取术中登记病人的麻醉事件
   * 
   */
  selectMedAnesthesiaEventList(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/selectMedAnesthesiaEventList', params)
  },

  /**
   * 获取麻醉事件类型
   * 
   */
  allMedAnesthesiaEventType(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/allMedAnesthesiaEventType', params)
  },

  /**
   * 获取某项麻醉事件内容
   * 
   */
  medAnesthesiaEventOpenByItemClass(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/medAnesthesiaEventOpenByItemClass', params)
  },
  /**
   * 插入麻醉事件记录
   * 
   */
  insertMedAnesthesiaEventOpen(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/insertMedAnesthesiaEventOpen', params)
  },

  /**
   * 修改麻醉事件记录
   * 
   */
  updateMedAnesthesiaEventOpenBatch(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/updateMedAnesthesiaEventOpenBatch', params)
  },

  /**
   * 删除麻醉事件记录
   * 
   */
  deleteMedAnesthesiaEventOpen(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/deleteMedAnesthesiaEventOpen', params)
  },
  /**
   * 插入病人麻醉事件记录
   * 
   */
  insertMedAnesthesiaEvent(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/insertMedAnesthesiaEvent', params)
  },

  /**
   * 修改病人麻醉事件记录
   * 
   */
  updateMedAnesthesiaEvent(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/updateMedAnesthesiaEvent', params)
  },

  /**
   * 批量修改病人麻醉事件记录
   * 
   */
  updateMedAnesthesiaEventBatch(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/updateMedAnesthesiaEventBatch', params)
  },

  /**
   * 删除病人麻醉事件记录
   * 
   */
  deleteMedAnesthesiaEvent(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/deleteMedAnesthesiaEvent', params)
  },

  /**
   * 获取所有生命体征选项
   * 
   */
  selectAllItems(params, config) {
    return fetch('medicalsystem/rest/medSignData/selectAllItems', params)
  },

  /**
   * 获取病人生命体征数据显示名称
   * 
   */
  getSignName(params, config) {
    return fetch('medicalsystem/rest/medSignData/getSignName', params)
  },

  /**
   * 获取病人生命体征数据
   * 
   */
  getSignTimeData(params, config) {
    return fetch('medicalsystem/rest/medSignData/getSignTimeData', params)
  },

  /**
   * 删除病人某个时间点的生命体征数据
   * 
   */
  deleteMedPatientMonitorData(params, config) {
    return fetch('medicalsystem/rest/medSignData/deleteMedPatientMonitorData', params)
  },

  /**
   * 插入生命体征数据
   * 
   */
  insertBatchMedPatientMonitorData(params, config) {
    return fetch('medicalsystem/rest/medSignData/insertBatchMedPatientMonitorData', params)
  },

  /**
   * 修改病人生命体征数据
   * 
   */
  updateMedPatientMonitorDatas(params, config) {
    return fetch('medicalsystem/rest/medSignData/updateMedPatientMonitorDatas', params)
  },

  /**
   * 删除生命体征项目
   * 
   */
  deleteMedPatientMonitorDataCode(params, config) {
    return fetch('medicalsystem/rest/medSignData/deleteMedPatientMonitorDataCode', params)
  },

  /**
   * 查询所有的麻醉方法字典
   * 
   */
  selectAllMedAnaesthesiaDict(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/selectAllMedAnaesthesiaDict', params)
  },

  /**
   * 新增麻醉方法
   * 
   */
  insertMedAnaesthesiaDict(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/insertMedAnaesthesiaDict', params)
  },
  /**
   * 修改麻醉方法
   * 
   */
  updateMedAnaesthesiaDict(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/updateMedAnaesthesiaDict', params)
  },
  /**
   * 删除麻醉方法
   * 
   */
  deleteMedAnaesthesiaDict(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/deleteMedAnaesthesiaDict', params)
  },
  /**
   * 获取麻醉方法
   * 
   */
  medAnaesthesiaDictList(params, config) {
    return fetch('medicalsystem/rest/medAnaesthesiaDict/medAnaesthesiaDictList', params)
  },

  /**
   * 获取模板里面麻醉方法名称
   * 
   */
  getMethodNames(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getMethodNames', params)
  },

  /**
   * 根据麻醉方法和模板类别获取模板名称
   * 
   */
  getTempletNames(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getTempletNames', params)
  },

  /**
   * 获取模板对应的详细记录内容
   * 
   */
  getTempletDetail(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getTempletDetail', params)
  },

  /**
   * 批量插入模板内容
   * 
   */
  insertBtchMedAnesthesiaEventTemplet(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/insertBtchMedAnesthesiaEventTemplet', params)
  },

  /**
   * 根据单子读取相关信息
   * 
   */
  getFormSqlResult(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getFormSqlResult', params)
  },

  /**
   * 获取单子下拉部分内容
   * 
   */
  getColumContext(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getColumContext', params)
  },

  /**
   * 获取单子下拉全部内容
   * 
   */
  allColumContext(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/allColumContext', params)
  },


  /**
   * 批量修改单子的数据
   * 
   */
  updateSqlBatch(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/updateSqlBatch', params)
  },

  /**
   * 获取病人麻醉过程里面最久的时间
   * 
   */
  selectMaxTime(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/selectMaxTime', params)
  },
  /**
   * 获取监护仪(麻醉仪)列表
   * 
   */
  selectMonitorList(params, config) {
    return fetch('medicalsystem/rest/medMonitorDictCon/selectMonitorList', params)
  },
  /**
   * 修改监护仪(麻醉仪)列表
   * 
   */
  updatePatientMonitor(params, config) {
    return fetch('medicalsystem/rest/medMonitorDictCon/updatePatientMonitor', params)
  },
  /**
   * 绑定监护仪(麻醉仪)列表
   * 
   */
  bindPatientMonitor(params, config) {
    return fetch('medicalsystem/rest/medMonitorDictCon/bindPatientMonitor', params)
  },
  /**
   * 取消绑定监护仪
   * 
   */
  cancleBindPatientMonitor(params, config) {
    return fetch('medicalsystem/rest/medMonitorDictCon/cancleBindPatientMonitor', params)
  },
  /**
   * 麻醉程序取消手术
   * 
   */
  cancleOperationMaster(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/cancleOperationMaster', params)
  },

}
