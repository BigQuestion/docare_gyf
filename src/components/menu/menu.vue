<template>
	<div style="display: flex">
        <div class="flex1" @click="goUrl('/scheduleList')">排班</div>
        <div class="flex1" @click="goUrl('/operationMaster')">麻醉系统</div>
        <div class="flex1" @click="goUrl('/statistics')">工作量统计</div>
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