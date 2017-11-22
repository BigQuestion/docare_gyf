<template>
	<div style="position: relative;">
		<input @dblclick="showView"  v-model="conInfo[attrName]"  >
		<div v-if="nameView" style="position: absolute;top: 0px;width: 150px;height: 300px;overflow-y: auto;border:1px solid;z-index: 1;" v-on:blur="disShowView">
			<div @click="getSelected(item)" v-for="item in medAnaesthesiaDictList" style="background-color: white;">
				{{item[toAttrName]}}
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data () {
  		return {	
  			nameView:false,
  			medAnaesthesiaDictList:[],
    	}
    },
    methods:{

        showView(){
        	this.nameView = true;
        	let params = {}
        	this.api[this.methodName](params)
        	.then(res =>{
        			 this.medAnaesthesiaDictList = res.list;
        		})
        },
        getSelected(item){
            this.conInfo[this.attrName] = item[this.toAttrName];
            this.nameView = !this.nameView;
        },
        //失去焦点的时候消失
        disShowView(){
            this.nameView = false;
            
        },
    },
    computed:{
         
    },
    props:['conInfo','methodName','attrName','toAttrName'],
    mounted(){
        //this.showView();
    }
	}
</script>
<style scoped></style>