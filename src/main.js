// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/index.css'

import config from './components/configFile/config'


Vue.config.productionTip = false


import api from '@/fetch/api.js';
Vue.prototype.api = api;

Vue.prototype.config=config;

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
		console.log(dateChange)
	}
	else
	{
		 
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
	}
	else
	{
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

Vue.filter('discount', function(time) {
	return time.split(" ")[1];
});


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})