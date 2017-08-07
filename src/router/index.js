import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = resolve => {
    require(['../components/login/login.vue'], resolve)
};
const index = resolve => {
    require(['../components/index/index.vue'], resolve)
};
export default new Router({
  routes: [ {
    path: '/login',
    component: login
  },{
    path: '/index',
    component: index
  },]
})
