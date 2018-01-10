<template>
	<div>
		<div v-if="!isEdit" style="display: flex;" >
			<div v-for="item in boxValue.listData" style="margin:0px 2px;">
				<div v-if="item.ItemValue==resultValue">
					<label><input type="checkbox" @change="test" v-model="content.state" v-bind:value="item.ItemValue"/>{{item.ItemName}}</label>
				</div>
				<div v-else>
					<label><input type="checkbox"   v-bind:value="item.ItemValue"/>{{item.ItemName}}</label>
				</div>
			</div>
			 
		</div>
		<div v-else style="display: flex;">
			<div v-for="item in boxValue.listData" style="margin:0px 2px;">
				<label><input type="checkbox" disabled="disabled" v-on:value="item.ItemValue"/>{{item.ItemName}}</label>
			</div>
		</div>
		<div style="width: 14px;height: 14px;position: relative;background: white;display: flex;align-items: center;justify-content: center;box-shadow: 1px 1px 1px #b3b3b3 inset;border-bottom: 1px solid #b3b3b3;border-right: 1px solid #b3b3b3;">
			<div style="
				    font-size: 14px;
				    font-weight: bold;
				">√</div>
		</div>
	</div>
	
</template>
<script> 
export default {
	data () {
  		return { 
  			content:{
  				state:true,
  				data:[]
  			},
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

    	},
    	test(){
    		console.log(this.content)
    	},
    }, 
    props:['boxValue','isEdit'],
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