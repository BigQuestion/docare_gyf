import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = resolve => {
    require(['../components/login/login.vue'], resolve)
};
const scheduleList = resolve => {
    require(['../components/scheduleList/scheduleList.vue'], resolve)
};
const userManage = resolve => {
    require(['../components/userManage/userManage.vue'], resolve)
};
const goScheduleReportView = resolve => {
    require(['../components/goScheduleReportView/goScheduleReportView.vue'], resolve)
};
const menu = resolve => {
    require(['../components/menu/menu.vue'], resolve)
};
const statistics = resolve => {
    require(['../components/statistics/statistics.vue'], resolve)
};
const operationMaster = resolve => {
    require(['../components/operationMaster/operationMaster.vue'], resolve)
};
const formDesigner = resolve => {
    require(['../components/formDesigner/formDesigner.vue'], resolve)
};
const drawTable = resolve => {
  require(['../components/drawTable/drawTable.vue'], resolve)
};
const management = resolve => {
  require(['../components/management/management.vue'], resolve)
};
const statsFilesLogin = resolve => {
  require(['../components/statsFiles/login/login.vue'], resolve)
};
export default new Router({
  routes: [ {
    path: '/',
    redirect: '/login'
  },{
    path: '/login',
    component: login
  },{
    path: '/menu',
    component: menu
  },{
    path: '/scheduleList',
    component: scheduleList
  },{
    path: '/userManage',
    component: userManage
  },{
    path: '/goScheduleReportView',
    component: goScheduleReportView
  },{
    path: '/statistics',
    component: statistics
  }
  ,{
    path: '/operationMaster',
    component: operationMaster
  }
  ,{
    path: '/formDesigner',
    component: formDesigner
  },{
    path: '/drawTable',
    component: drawTable
  },{
    path: '/management',
    component: management
  },{
    path: '/statsFilesLogin',
    component: statsFilesLogin
  },]
})
