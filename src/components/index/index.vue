<template>
	<div>
		<div class="flex w100">
            <div class="flex1">
                <datepicker :value="dateValue" language="zh" @selected="dateChange"></datepicker>
            </div>
            <div class="flex1">1.手术排班</div>
            <div class="flex1">2.手术申请</div>
            <div class="flex1">3.手术撤销</div>
            <div class="flex1">4.手术通知单</div>
            <div class="flex1">5.系统配置</div>
            <div class="flex1">6.HIS同步</div>
            <div class="flex1">7.退出系统</div>
        </div>
	</div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
export default {
name: 'login',
	data () {
  		return {
      		msg: '欢迎登陆！',
            dateValue:new Date(2014,6,8)
    	}
    },
    methods:{
        dateChange(){
            console.log(this.dateValue);
            let date = new Date(this.dateValue);
            let y = date.getFullYear();
            let m = date.getMonth()+1;
            if(m<10){
                m = '0'+m;
            }
            let d = date.getDate()+1;
            if(d<10){
                d = '0'+d;
            }
            let dateStr = y+m+d;
            this.getList(dateStr)
        },
        getList(date){
            let params = {
                dateTime:'2014/0708'
            }
            this.api.getScheduleList(params)
                .then(res=>{
                     debugger
                     console.log(res);
                 });
        }
    },
    mounted(){
    },
    components: {
        Datepicker
    }
}
</script>