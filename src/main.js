// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/index.css'
// import './assets/css/inputdate.css'

import config from './components/configFile/config'

import Toast from './components/toast/toast'


Vue.config.productionTip = false
//空的全局的Vue实例,其他的组件利用这个实例emit和on自定义事件
window.eventHub = new Vue();
import api from '@/fetch/api.js';
Vue.prototype.api = api;
// Vue.prototype.ipc = ipc;
Vue.prototype.config = config;

Vue.use(Toast);

//datatimelocal的格式转换为date
Vue.prototype.datetimeLocalToDate = function(time) {

  if (time) {
    var dateChange = new Date();
    dateChange.setFullYear(parseInt(time.substring(0, 4)));
    dateChange.setMonth(parseInt(time.substring(5, 7)) - 1);
    dateChange.setDate(parseInt(time.substring(8, 10)));
    dateChange.setHours(parseInt(time.substring(11, 13)));
    dateChange.setMinutes(parseInt(time.substring(14, 16)));
    return dateChange;
  } else {

    return null;
  }


}

//字符串转换date
Vue.prototype.stringToDate = function(remindTime) {
  if (remindTime) {
    var str = remindTime.toString();
    str = str.replace("/-/g", "/");
    //// str =  str.replace("T"," ");
    var oDate1 = new Date(str);
    return oDate1;
  } else {
    return null;
  }
}
//为了设置datetime-local 必须要加个T格式
Vue.prototype.changeDateFormat = function(dateObj) {
  if (dateObj) {
    var str = dateObj.split(" ");
    var str1 = str[0] + "T" + str[1];
    return str1;
  } else {
    return "";
  }

}

//date转换格式
Date.prototype.Format = function(fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//计算时间
Vue.prototype.coutTimes = function(startTime, endTime, diffType) {
  if (startTime && endTime && diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    // startTime = startTime.replace(/\-/g, "/");
    // endTime = endTime.replace(/\-/g, "/");

    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    let sTime = new Date(startTime); //开始时间
    let eTime = new Date(endTime); //结束时间
    //作为除数的数字
    let timeType = 1;
    switch (diffType) {
      case "second":
        timeType = 1000;
        break;
      case "minute":
        timeType = 1000 * 60;
        break;
      case "hour":
        timeType = 1000 * 3600;
        break;
      case "day":
        timeType = 1000 * 3600 * 24;
        break;
      default:
        break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
  } else
    return "格式不支持"

}

//比较时间大小返回最小的 date date
Vue.prototype.compareTime = function(time1, time2) {
  if (time1 > time2) {
    return time2
  } else {
    return time1
  }
}

Vue.filter('discount', function(time) {
  return time.split(" ")[1];
});

//后台时间戳转换成日期string
Vue.filter('timeStampToDateStr', function(time) {
  let str = new Date(time).Format("yyyy/MM/dd")
  return str;
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
