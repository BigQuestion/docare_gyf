// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/index.css'


Vue.config.productionTip = false


import api from '@/fetch/api.js';
Vue.prototype.api = api;
Vue.prototype.datetimeLocalToDate = function(time){

		var dateChange = new Date();
        dateChange.setFullYear(parseInt(time.substring(0, 4)));
        dateChange.setMonth(parseInt(time.substring(5, 7)) - 1);
        dateChange.setDate(parseInt(time.substring(8, 10)));
        dateChange.setHours(parseInt(time.substring(11, 13)));
        dateChange.setMinutes(parseInt(time.substring(14, 16)));
        return dateChange;
}

Vue.prototype.stringToDate = function(remindTime) { 
	if (remindTime) {
	var str = remindTime.toString();
	str = str.replace("/-/g", "/");
	//// str =  str.replace("T"," "); 
	var oDate1 = new Date(str);
	return oDate1;
	}
}
//为了设置datetime-local 必须要加个T格式
Vue.prototype.changeDateFormat = function(dateObj){
	    	var str = dateObj.split(" ");
	    	var str1 = str[0]+"T"+str[1];
	    	return str1;
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
