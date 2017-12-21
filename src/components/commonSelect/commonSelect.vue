<template>
	<div style="position: relative;" >
        <div v-if="conInfo.dictTableName">
            <input @dblclick="showView"  v-model="infoData[attrName]" :style="{width:conInfo.width+'px'}" :readonly="conInfo.isEdit">
            <div v-if="nameView" style="position: absolute;top: 0px;height: 300px;overflow: auto;border:1px solid;z-index: 1;background-color:white;" :style="{width:conInfo.width+'px',}">
                <div>
                    <input v-model="serchZm" @keyup="serchJm" >
                </div>
                <div @click="getSelected(item)" v-for="item in medAnaesthesiaDictList" style="background-color: white;" :style="{width:conInfo.width+'px'}">
                    {{item.SPENAME}}
                </div>
            </div>
        </div>
        <div v-else>
                <input :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,}" v-model="infoData.value" style="min-width: 20px;min-height: 20px;" :readonly="conInfo.isEdit">
        </div>
		
	</div>
</template>
<script>
	export default{
		data () {
  		return {
  			nameView:false,
  			medAnaesthesiaDictList:[],
            allList:[],
            serchZm:'',
            updateData:[],
            infoData:this.conInfo,

    	}
    },
    methods:{
        showView(){
        	this.nameView = true;
        	let params={
                tableName:this.conInfo.dictTableName,
                dictSelect:this.conInfo.dictSelect,
                coluName:this.conInfo.dictField
            }
            this.api.getColumContext(params)
                .then(res=>{
                    this.medAnaesthesiaDictList = res;
                })

            this.api.allColumContext(params)
                .then(res=>{
                    this.allList = res;
                })

        },
        getSelected(item){
            if(this.infoData.MultiSelect){ 
                if(this.conInfo.value==null){
                    this.conInfo.value = item.SPENAME;
                }
                else
                {
                    this.conInfo.value = this.conInfo.value+","+item.SPENAME; 
                }
            }
            else
            {
                this.conInfo.value = item.SPENAME;
            }
            
            this.nameView = !this.nameView;
        },
        //失去焦点的时候消失
        disShowView(){
            this.nameView = false;
        },
        //对于输入拼音简码进行筛选
        serchJm(){
            var list = this.allList;
            var m = this.serchZm.toUpperCase();
                var newList = [];
                for (var i = 0; i < list.length; i++) {
                    if(list[i].PYJM&&list[i].PYJM.indexOf(m)>=0){
                        newList.push(list[i]);
                    }

                }
                this.medAnaesthesiaDictList = newList;
        },
         
    },
    computed:{
        
    },
    props:['conInfo','attrName','data'],
    mounted(){
        
    },
    created() {
        // 点击其他不在的区域触发事件
        document.addEventListener('click', (e) => {
          //console.log(this.$el.contains(e.target));
          if (!this.$el.contains(e.target)){
              this.nameView = false;
              this.serchZm = '';
          }
        })
      },
    watch:{
    "infoData.value":function(){
        this.updateData.push(this.value);
            }
        }
	}
</script>
<style scoped>
    
</style>