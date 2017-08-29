<template>
	<div>
        
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
        
    },
    mounted(){
        let params = {
            dateTime:'2014/07/08', //"2014/07/08"查询日期
        }
        this.api.getScheduleReportView(params)
        .then(
            res=>{
                debugger
            }
        )
    },
    components: {
    }
}
</script>
<style scoped>

</style>