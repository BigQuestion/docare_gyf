<template>
	<div style="display: flex">
        <div class="flex1" @click="goUrl('/scheduleList')">排班系统</div>
        <div class="flex1" @click="goUrl('/operationMaster')">麻醉手术系统</div>
        <div class="flex1" @click="goUrl('/statistics')">工作量统计</div>
        <div class="flex1" @click="goUrl('/formDesigner')">表单设计器</div>
	</div>
</template>
<script>
export default {
    name: 'login',
	data () {
  		return {
            
    	}
    },
    methods:{
        goUrl(url){
            this.$router.push(
            {
                path:url
            })
        }
    },
    mounted(){
        
    },
    components: {
    }
}
</script>
<style scoped>
.flex1{
    flex:1;
}
</style>