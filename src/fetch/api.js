import axios from 'axios'
// axios.defaults.baseURL = 'http://182.61.36.247:8080';
// axios.defaults.baseURL = 'http://111.111.111.156:8080';
axios.defaults.baseURL = 'http://localhost:8088';




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
    config.timeout = 300000;
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
      .then(function (response) {
        resolve(response.data);
        // if (!config.noAlert) {
        //   if (response.data.success) {
        //     alert("操作成功")
        //   } else if (response.data.success == false) {
        //     alert("操作失败")
        //   } else {

        //   }
        // }

      }).catch(function (error) {
        reject(error);
        alert("网络请求失败")
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
   * 获取用户信息列表
   * 
   */
  medUsersList(params, config) {
    return fetch('/medicalsystem/rest/medUsers/medUsersList', params)
  },
  /**
   * 获取所有科室
   * 
   */
  getAllDept(params, config) {
    return fetch('/medicalsystem/rest/medAnesthesiaComm/getAllDept', params)
  },
  /**
   * 新增用户接口
   * 
   */
  userRegister(params, config) {
    return fetch('/medicalsystem/rest/medUsers/userRegister', params)
  },
  /**
   * 修改用户接口
   * 
   */
  updateMedUsers(params, config) {
    return fetch('/medicalsystem/rest/medUsers/updateMedUsers', params)
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
   * 批量修改排版手术信息
   * 
   */
  updateBatchMedOperationSchedule(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/updateBatchMedOperationSchedule', params)
  },
  /**
 * 批量撤销已提交手术
 * 
 */
  cancleSubmit(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/cancleSubmit', params)
  },

  /**
   * 获取排班护士
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
   * 获取麻醉医生护士角色
   * 
   */
  selectUserListByType(params, config) {
    return fetch('medicalsystem/rest/medOperationScheduleCommCon/selectUserListByType', params)
  },

  /**
   * 提交安排手术排班
   * 
   */
  submitMedOperationScheduleList(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/submitMedOperationScheduleList', params)

  },

  /**
   * 执行sql
   * 
   */
  doSql(params, config) {
    return fetch('medicalsystem/rest/jdbcConn/sqlExqute', params)

  },
  /**
   * 获取手术通知安排表
   * 
   */
  getScheduleReportView(params, config) {
    return fetch('medicalsystem/rest/medOperationSchedule/getScheduleReportView', params)

  },
  /**
   * 获取麻醉主程序列表
   * 
   */
  getMedOperationMasterList(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/getMedOperationMasterList', params)

  },
  /**
   * 获取单个病人的列表信息
   * 
   */
  selectMedOperationMaster(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/selectMedOperationMaster', params)

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
   * 撤销病人在手术间状态
   * 
   */
  changeBeforeStatus(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/changeBeforeStatus', params)
  },
  /**
   * 获取术中登记病人的麻醉事件
   * 
   */
  selectMedAnesthesiaEventList(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/selectMedAnesthesiaEventList', params)
  },
  /**
   * 获取标记内容
   * 
   */
  selectSignMedAnesthesiaEventList(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/selectSignMedAnesthesiaEventList', params)
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
  insertMedAnesthesiaEventBatch(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/insertMedAnesthesiaEventBatch', params)
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
   * 批量删除病人麻醉事件记录
   * 
   */
  deleteBatchMedAnesthesiaEvent(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/deleteBatchMedAnesthesiaEvent', params)
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

  getNewTimeData(params, config) {
    return fetch('medicalsystem/rest/medSignData/getNewTimeData', params)
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
    return fetch('medicalsystem/rest/medSignData/updateMedPatientMonitorDatas', params, config)
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
   * 批量修改模板内容
   * 
   */
  updateBatch(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/updateBatch', params)
  },
  /**
   * 删除模板内容
   * 
   */
  deleteMedAnesthesiaEventTemplet(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/deleteMedAnesthesiaEventTemplet', params)
  },

  /**
   * 批量删除模板内容
   * 
   */
  deleteBatchTemplet(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/deleteBatchTemplet', params)
  },

  /**
   * 修改模板名称或者方法
   * 
   */
  updateMethodTemp(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/updateMethodTemp', params)
  },

  /**
   * 删除模板名称或者方法
   * 
   */
  deleteTempMethod(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/deleteTempMethod', params)
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
   * 获取病人最早时间
   * 
   */
  getBeginTime(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getBeginTime', params)
  },
  /**
   * 获取监护仪(麻醉仪)列表
   * 
   */
  selectMonitorList(params, config) {
    return fetch('medicalsystem/rest/medMonitorDictCon/selectMonitorList', params)
  },
  /**
   * 获取监护仪(麻醉仪)详情
   * 
   */
  selectMonitor(params, config) {
    return fetch('medicalsystem/rest/medMonitorDictCon/selectMonitor', params)
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

  /**
   * 获取器械清单单子的栏目
   * 
   */
  selectQiXieTitle(params, config) {
    return fetch('medicalsystem/rest/medFormCon/selectQiXieTitle', params)
  },

  /**
   * 批量插入器械清单标题
   * 
   */
  insertMedQiXieTitleColumnBatch(params, config) {
    return fetch('medicalsystem/rest/medFormCon/insertMedQiXieTitleColumnBatch', params)
  },

  /**
   * 批量修改器械清单标题
   * 
   */
  updateMedQiXieTitleColumnBatch(params, config) {
    return fetch('medicalsystem/rest/medFormCon/updateMedQiXieTitleColumnBatch', params)
  },

  /**
   * 批量删除器械清单标题
   * 
   */
  deleteMedQiXieTitleColumnBatch(params, config) {
    return fetch('medicalsystem/rest/medFormCon/deleteMedQiXieTitleColumnBatch', params)
  },

  /**
   * 获取病人器械清单数据
   * 
   */
  getPatientQiXieList(params, config) {
    return fetch('medicalsystem/rest/medFormCon/getPatientQiXieList', params)
  },
  /**
   * 获取病人已存在体征
   * 
   */
  getPatientAllCode(params, config) {
    return fetch('medicalsystem/rest/medSignData/getPatientAllCode', params)
  },
  /**
   * 批量插入病人器械清单数据
   * 
   */
  insertBatchMedQiXieQingDian(params, config) {
    return fetch('medicalsystem/rest/medFormCon/insertBatchMedQiXieQingDian', params)
  },
  /**
   * 批量修改病人器械清单数据
   * 
   */
  updateBatchMedQiXieQingDian(params, config) {
    return fetch('medicalsystem/rest/medFormCon/updateBatchMedQiXieQingDian', params)
  },
  /**
   * 批量删除病人器械清单数据
   * 
   */
  deleteBatchMedQiXieQingDian(params, config) {
    return fetch('medicalsystem/rest/medFormCon/deleteBatchMedQiXieQingDian', params)
  },

  /**
   * 获取所有器械清单默认表格数据
   * 
   */
  selectAllListMedQiXieDefaultCulumn(params, config) {
    return fetch('medicalsystem/rest/medFormCon/selectAllListMedQiXieDefaultCulumn', params)
  },

  /**
   * 批量插入器械清单默认表格数据
   * 
   */
  insertBatchMedQiXieDefaultCulumn(params, config) {
    return fetch('medicalsystem/rest/medFormCon/insertBatchMedQiXieDefaultCulumn', params)
  },

  /**
   * 批量修改器械清单默认表格数据
   * 
   */
  updateBatchMedQiXieDefaultCulumn(params, config) {
    return fetch('medicalsystem/rest/medFormCon/updateBatchMedQiXieDefaultCulumn', params)
  },

  /**
   * 批量删除器械清单默认表格数据
   * 
   */
  deleteBatchMedQiXieDefaultCulumn(params, config) {
    return fetch('medicalsystem/rest/medFormCon/deleteBatchMedQiXieDefaultCulumn', params)
  },

  /**
   * 批量插入手术清点单模板数据
   * 
   */
  insertBatchMedQiXieTemplate(params, config) {
    return fetch('medicalsystem/rest/medFormCon/insertBatchMedQiXieTemplate', params)
  },

  /**
   * 获取所有清单模板
   * 
   */
  selectAllMedQiXieTemplate(params, config) {
    return fetch('medicalsystem/rest/medFormCon/selectAllMedQiXieTemplate', params)
  },

  /**
   * 根据清单模板名称获取数据
   * 
   */
  selectUserTemlate(params, config) {
    return fetch('medicalsystem/rest/medFormCon/selectUserTemlate', params)
  },
  /**
   * 删除病人器械数据
   * 
   */
  deletePatientData(params, config) {
    return fetch('medicalsystem/rest/medFormCon/deletePatientData', params)
  },


  /**
   * 获取急诊病人信息
   * 
   */
  getJzHisPatInfo(params, config) {
    return fetch('medicalsystem/rest/getHisDataCon/getJzHisPatInfo', params)
  },


  /**
   * 获取所有手术间
   * 
   */
  selectAllRoomNo(params, config) {
    return fetch('medicalsystem/rest/medOperatingRoom/selectAllRoomNo', params)
  },

  /**
   * 获取部分手术诊断
   * 
   */
  getPartsDialog(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getPartsDialog', params)
  },
  /**
   * 获取全部手术诊断
   * 
   */
  getAllDialog(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getAllDialog', params)
  },

  /**
   * 获取部分手术名称
   * 
   */
  getPartsOperationNames(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getPartsOperationNames', params)
  },
  /**
   * 获取所有手术名称
   * 
   */
  getAllOperationNames(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getAllOperationNames', params)
  },
  /**
   * 获取急诊登记需要的医生护士
   * 
   */
  getAllUsers(params, config) {
    return fetch('medicalsystem/rest/medAnesthesiaComm/getAllUsers', params)
  },

  /**
   * 急诊登记
   * 
   */
  insertEmergencyWrite(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/insertEmergencyWrite', params)
  },

  /**
   * 同步his预约信息
   * 
   */
  synchroSchedule(params, config) {
    return fetch('medicalsystem/rest/synchro/synchroWebSchedule', params)
  },

  /**
   * 同步his用户与部门
   * 
   */
  synchroUserAndDept(params, config) {
    return fetch('medicalsystem/rest/synchro/synchroUserAndDept', params)
  },

  /**
   * 修改用户密码
   * 
   */
  updateUserPassword(params, config) {
    return fetch('medicalsystem/rest/medUsers/updateUserPassword', params)
  },

  /**
   * 获取用户检验信息
   * 
   */
  getMedLabTestMasterList(params, config) {
    return fetch('medicalsystem/rest/medLab/getMedLabTestMasterList', params)
  },

  /**
   * 修改手术主表信息
   * 
   */
  updateMedOperationMaster(params, config) {
    return fetch('medicalsystem/rest/medOperationMaster/updateMedOperationMaster', params)
  },

  /**
   * 插入设置体征数据
   * 
   */
  setPatMonitor(params, config) {
    return fetch('medicalsystem/rest/medSignData/setPatMonitor', params)
  },

  /**
   * 获取体征设置数据
   * 
   */
  getMedPatSetting(params, config) {
    return fetch('medicalsystem/rest/medSignData/getMedPatSetting', params)
  },

  /**
   * 获取体征设置数据
   * 
   */
  deletePatMonitor(params, config) {
    return fetch('medicalsystem/rest/medSignData/deletePatMonitor', params)
  },


}
