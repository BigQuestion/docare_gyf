import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = resolve => {
    require(['../components/login/login.vue'], resolve)
};
const index = resolve => {
    require(['../components/index/index.vue'], resolve)
};
const userManage = resolve => {
    require(['../components/userManage/userManage.vue'], resolve)
};
const goScheduleReportView = resolve => {
    require(['../components/goScheduleReportView/goScheduleReportView.vue'], resolve)
};
export default new Router({
  routes: [ {
    path: '/',
    redirect: '/login'
  },{
    path: '/login',
    component: login
  },{
    path: '/index',
    component: index
  },{
    path: '/userManage',
    component: userManage
  },{
    path: '/goScheduleReportView',
    component: goScheduleReportView
  },]
})
