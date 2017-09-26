<template>
	<div style="height:100%;position:relative;">
		<div class="head">
            <div class="logo">logo</div>
            <div class="currentPatientInfo">currentPatientInfo</div>
            <div class="procedure">procedure</div>
        </div>
        <div class="down">
            <div class="left">
                <button>字典</button>
            </div>
            <div class="content">
                <div class="patientList">
                    <div>
                        <input v-model="dateTime" type="" name="">
                    </div>
                    <div>
                        <button @click='searchPatientList'>搜索</button>
                    </div>
                    <div v-for="item in patientList" class="listBorder" v-on:click="patientDeatilInfo(item)">
                        <!-- <div>{{item.patientName}}</div> -->
                        <div class="patientContent">
                            <span>手术间 {{item.operatingRoom}}</span>
                        </div>
                        <ul>
                            <li>患者 {{item.patientName}}  {{item.patientId}} 住院号 {{item.inpNo}}</li>
                            <li>手术 {{item.operationName}}</li>
                            <li>时间 {{item.scheduledDateTime}}</li>
                            <li>术者 {{item.surgeonName}} 麻醉 {{item.anesthesiaDoctorName}} {{item.anesthesiaAssistantName}}</li>
                        </ul>
                    </div>
                </div>
                <div class="patientInfo">
                    <div class="pat_title">患者详情</div>
                </div>
            </div>
        </div>
        <!--<div class="mask">
            <div class="">
                
            </div>
        </div>-->
        
	</div>
</template>
<script>
export default {
	data () {
  		return {
            patientList:[],
            date:'2014/07/08'
    	}
    },
    methods:{
        searchPatientList(){
            let params = {
                count:10,
                dateTime:this.date,
            }
            this.api.getMedOperationMasterList(params)
            .then(
                res=>{
                    this.patientList = res.list;
                });

        },
        patientDeatilInfo(item){
            let params = {
                patientId:item.patientId,
                operId:item.operId,
                visitId:item.visitId

            }
             this.api.getPatienDetailInfo(params)
             .then(
                res=>{
                    this.patientInfo = res.list;
                });
        }
    },
    mounted(){
        this.searchPatientList();
    },
    components: {
        
    }
}
</script>
<style scoped>
.mask{
    position: absolute;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    left:0px;
    top:0px;
}
.patientList{
    height:100%;
    overflow-y: auto;
    width:350px;
    border-right: 1px solid #7F7F7F;
}
.patientContent{
    height: 30px;
    border-bottom: 1px solid rgb(177,207,243);
    line-height: 30px;
    color: rgb(23,68,140);
}
.procedure{
    flex:1;
}
.logo{
    width:150px;
    background: #0080FF;
}
.currentPatientInfo{
    width:150px;
    background: #E6E6E6;
}
.head{
    height:120px;
    width:100%;
    background: #CCCCCC;
    display: flex;
}
.down{
    width:100%;
    height:calc(100% - 120px);
    background: #B3B3B3;
    display: flex;
}
.left{
    width:100px;
    height:100%;
    background: #808080;
}
.content{
    display: flex; 
    width:calc(100% - 100px);
    height:100%;
    background: rgb(227,239,255);
}
.listBorder{
    border:1px solid rgb(177,207,243);
    padding-bottom: 5px;
}
.patientInfo{
    width: calc(100% - 350px);
}
.pat_title{
    height: 50px;

    border: 1px solid rgb(177,207,243);
}
</style>