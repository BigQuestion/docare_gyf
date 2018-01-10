<template>
	<div style="display: flex;">
		<div v-for="item in boxValue.listData" style="margin:0px 2px;">
			<div v-if="item.ItemValue==resultValue">
				<label><input type="checkbox" v-model="content" v-on:value="item.ItemValue"/>{{item.ItemName}}</label>
			</div>
			<div v-else>
				<label><input type="checkbox"   v-on:value="item.ItemValue"/>{{item.ItemName}}</label>
			</div>
		</div>
		 
	</div>
</template>
<script> 
export default {
	data () {
  		return { 
  			content:true,
  			resultValue:'',
    	}
    },
    methods:{ 
    	getItemValue(){
    		let params = [];
    		params.push({
    			"patientId": this.config.userInfo.patientId,
                "visitId": this.config.userInfo.visitId,
                "operId": this.config.userInfo.operId,
                "tableName": this.boxValue.SourceTableName,
                "coluName": this.boxValue.SourceFieldName,
    		})

    		this.api.getFormSqlResult(params)
	    		.then(res => {
	    				this.resultValue = res[this.boxValue.SourceFieldName];
                    })

    	}
    }, 
    props:['boxValue'],
    computed:{
        
    },
    components: {
        
    },
    mounted(){  
         console.log(this.config.userInfo);
         this.getItemValue();
    }
}
</script>
<style type="text/css" scoped>

</style>