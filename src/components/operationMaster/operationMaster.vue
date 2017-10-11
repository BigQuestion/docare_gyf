<template>
	<div style="height:100%;position:relative;">
		<div class="head">
            <div class="logo">{{nowTime}}</div>
            <div class="currentPatientInfo">{{patientId}}</div>
            <div class="procedure">procedure</div>
        </div>
        <div class="down">
            <div class="left">
                <button @click="dictShow">字典</button>
            </div>
            <div class="content">
                <div class="patientList">
                    <div style="padding-left: 5px;">
                        日期 <input v-model="getTime" type="date" name="">
                    </div>
                    <div style="padding-left: 5px;">
                        <button @click='searchPatientList'>搜索</button>
                    </div>
                    <div>
                        <div class="container" style="padding-left: 5px;">
                            <div>
                                <input type="radio" id="all"  v-model="operStatus">
                                <label for="all">全部</label>
                                <input type="radio" id="one" value="0" v-model="operStatus">
                                <label for="one">术前</label>
                                <input type="radio" id="two" value="15" v-model="operStatus">
                                <label for="two">术中</label>
                                <input type="radio" id="three" value="25" v-model="operStatus">
                                <label for="three">术后</label>
                                <br> 
                            </div>
                        </div>
                        <div class="container" style="padding-left: 5px;">
                            <div>ID</div>
                            <div class="left15"><input style="width: 100px;" type="text" v-model="patientId"></div>
                            <div class="left15">姓名</div>
                            <div class="left15"><input style="width: 100px;" type="text" v-model="patientName"></div>
                        </div>
                    </div>
                    <div v-for="item in patientList" class="listBorder" v-on:click="patientDeatilInfo(item)" v-on:dblclick="lockedPatient(item)">
                        <div class="patientContent">
                            <span>手术间 {{item.operatingRoom}}</span>
                        </div>
                        <ul>
                            <li>患者 {{item.patientName}}  {{item.patientId}} 住院号 {{item.inpNo}}</li>
                            <li>手术 {{item.operationName}}</li>
                            <li v-if="item.inDateTime==null">时间 {{item.scheduledDateTime}}</li>
                            <li v-if="item.inDateTime!=null">时间 {{item.inDateTime}}</li>
                            <li>术者 {{item.surgeonName}} 麻醉 {{item.anesthesiaDoctorName}} {{item.anesthesiaAssistantName}}</li>
                        </ul>
                    </div>
                </div>
                <div class="patientInfo" v-if="viewInfo">
                    <div class="pat_title">患者详情</div>
                    <div style="margin-top: 5px;">
                        <div style="border:1px solid rgb(177,207,243);padding-left: 30px;">基本信息</div>
                        <div style="padding:15px 5px 10px 40px;border-bottom:1px solid rgb(177,207,243);">
                            <div class="container">
                                <div>患者ID</div>
                                <div class="in_con">
                                    {{patientInfo.PATIENT_ID}}
                                </div>
                                <div class="left15">住院号</div>
                                <div class="in_con">
                                    {{patientInfo.INP_NO}}
                                </div>
                                <div class="left15">姓名</div>
                                <div class="in_con">
                                    {{patientInfo.NAME}}
                                </div>
                                <div class="left15">年龄</div>
                                <div class="in_con">
                                    {{patientInfo.PAT_AGE}}
                                </div>
                                <div class="left15">性别</div>
                                <div class="in_con">
                                    {{patientInfo.SEX}}
                                </div>
                            </div>
                            <div class="container">
                                <div>床号</div>
                                <div class="in_con">
                                    {{patientInfo.BED_NO}}
                                </div>
                                <div class="left15">所在科室</div>
                                <div class="in_con">
                                    {{patientInfo.DEPT_NAME}}
                                </div>
                                <div class="left15">付费方式</div>
                                <div class="in_con">
                                    {{patientInfo.NAME}}
                                </div> 
                            </div>
                            <div class="container">
                                <div>住址</div>
                                <div class="in_con" style="width: 600px;">{{patientInfo.MAILING_ADDRESS}}</div>
                            </div>
                            <div class="container">
                                <div>身份证号</div>
                                <div class="in_con" style="width: 200px;">
                                    {{patientInfo.ID_NO}}
                                </div>
                                <div class="left15">联系电话</div>
                                <div class="in_con">
                                    {{patientInfo.NEXT_OF_KIN_PHONE}}
                                </div>
                                <div class="left15">联系人</div>
                                <div class="in_con">
                                    {{patientInfo.NEXT_OF_KIN}}
                                </div> 
                            </div>
                            <div class="container">
                                <div>职业</div>
                                <div class="in_con" style="width: 300px;"> </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 5px;">
                        <div style="border:1px solid rgb(177,207,243);padding-left: 30px;">手术信息</div>
                        <div style="padding:15px 5px 10px 40px;border-bottom:1px solid rgb(177,207,243);">
                            <div class="container">
                                <div>主要诊断</div>
                                <div class="in_con" style="width: 600px;">{{patientInfo.DIAG_BEFORE_OPERATION}}</div>
                            </div>
                            <div class="container">
                                <div>病情</div>
                                <div class="in_con" style="width: 600px;">{{patientInfo.PATIENT_CONDITION}}</div>
                            </div>
                            <div class="container">
                                <div>手术名称</div>
                                <div class="in_con" style="width: 600px;">{{patientInfo.OPERATION_NAME}}</div>
                                <div class="left15">急诊择期</div>
                                <div class="in_con">
                                    {{patientInfo.NEXT_OF_KIN}}
                                </div>
                            </div>
                            <div class="container">
                                <div>手术时间</div>
                                <div class="in_con" style="width: 200px;">{{patientInfo.SCHEDULED_DATE_TIME}}</div>
                                <div class="left15">台次</div>
                                <div class="in_con">
                                    {{patientInfo.SEQUENCE}}
                                </div>
                                <div class="left15">手术间</div>
                                <div class="in_con">
                                    {{patientInfo.OPERATING_ROOM_NO}}
                                </div>
                            </div>
                            <div class="container">
                                <div>隔离</div>
                                <div class="in_con">{{patientInfo.ISOLATION_INDICATOR}}</div>
                                <div class="left15">手术等级</div>
                                <div class="in_con">
                                    {{patientInfo.OPERATION_SCALE}}
                                </div>
                                <div class="left15">麻醉方法</div>
                                <div class="in_con">
                                    {{patientInfo.ANESTHESIA_METHOD}}
                                </div>
                            </div>
                            <div class="container">
                                <div>切口等级</div>
                                <div class="in_con">{{patientInfo.QIEKOU_CLASS}}</div>
                                <div class="left15">切口个数</div>
                                <div class="in_con">
                                    {{patientInfo.QIEKOU_NUMBER}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 5px;">
                        <div style="border:1px solid rgb(177,207,243);padding-left: 30px;">手术人员</div>
                        <div style="padding:15px 5px 10px 40px;border-bottom:1px solid rgb(177,207,243);">
                            <div class="container">
                                <div>麻醉医师</div>
                                <div class="in_con100">{{patientInfo.ANESTHESIA_DOCTOR_NAME}}</div>
                                <div class="in_con100">{{patientInfo.ANESTHESIA_ASSISTANT_NAME}}</div>
                                <div class="in_con100">{{patientInfo.THIRD_ANESTHESIA_DOCTOR_NAME}}</div>
                                <div class="left30">灌注医师</div>
                                <div class="in_con">
                                    {{patientInfo.QIEKOU_NUMBER}}
                                </div>
                            </div>
                            <div class="container">
                                <div>手术医师</div>
                                <div class="in_con100">{{patientInfo.SURGEON_NAME}}</div>
                                <div class="left30">手术助手</div>
                                <div class="in_con100">{{patientInfo.FIRST_ASSISTANT_NAME}}</div>
                                <div class="in_con100">{{patientInfo.SECOND_ASSISTANT_NAME}}</div>
                                <div class="in_con100">{{patientInfo.THIRD_ASSISTANT_NAME}}</div>
                                <div class="in_con100">{{patientInfo.FOURTH_ASSISTANT_NAME}}</div>
                            </div>
                            <div class="container">
                                <div>洗手护士</div> 
                                <div class="in_con100">{{patientInfo.FIRST_OPERATION_NURSE_NAME}}</div>
                                <div class="in_con100">{{patientInfo.SECOND_OPERATION_NURSE_NAME}}</div>
                                <div class="left30">巡回护士</div>
                                <div class="in_con100">{{patientInfo.FIRST_SUPPLY_NURSE_NAME}}</div>
                                <div class="in_con100">{{patientInfo.SECOND_SUPPLY_NURSE_NAME}}</div>
                                <div class="in_con100">{{patientInfo.THIRD_SUPPLY_NURSE_NAME}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--         <div class="mask">
            <div class="">
                
            </div>
        </div> -->
        <div v-if="dictView" style="position: absolute;width: 60%;height: 80%;left:20%;top:10%;background:rgb(227,239,255);border:2px solid rgb(60,163,203);">
            <div style="height: 30px;line-height: 30px;background:rgb(60,163,203);color: white;display: flex;
            ">
                <span>字典</span>
                <span>X</span>
            </div>
            <div style="height: 50px;line-height: 50px;font-weight: bold;border-bottom: 2px solid rgb(177,207,243);">
                <span style="margin-left: 30px;">字典维护</span>
            </div>
            <div style="display: flex;padding-left:10px;padding-top: 5px;">
                <div class="tab_div" @click="getComType"><span>常用术语</span></div>
                <div class="tab_div"><span>麻醉事件</span></div>
                <div class="tab_div"><span>麻醉方法</span></div>

            </div>
            <div style="display: flex;height: 65%;background:white;margin:10px;">
            <!-- 显示类别 -->
                <div style="height: 100%;width: 30%;overflow-x: auto;margin-top:5px;border-right: 2px solid rgb(177,207,243);">
                    <ul v-for="item in comTypeList">
                        <li style="cursor:pointer;" @click="getTypeDetail(item)">
                            <div style="margin-left: 20px;">{{item.typeName}}</div>
                        </li>
                    </ul>
                </div>
                <!-- 显示详细内容 -->
                <div style="width: 70%;margin-top:5px;overflow-y: auto;">
                    <div style="display: flex;margin-left: 10px;">
                        <div style="width: 24%;border:1px solid rgb(177,207,243);" v-for="cell in contentConfig">{{cell.text}}</div>
                    </div>
                    <div style="overflow-y: auto;">
                        <div v-for="list in commonTypeList" style="display: flex;margin-left: 10px;" @click="getItem(list)">
                            <div v-for="cl in contentConfig" style="width: 24%;border:1px solid rgb(177,207,243);">
                            <div v-if="cl.status=='inable'" @dblclick="changeInputEdit(cl)">
                                <input type="text" v-model="list[cl.value]" v-bind:readonly="cl.isWriteAble" v-on:input="getEditItem(list)">
                            </div>
                            <div v-if="cl.status!='inable'">
                                {{list[cl.value]}}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align: right;margin-right: 30px;">
                <button style="width: 100px;height: 30px;">新增</button>
                <button style="width: 100px;height: 30px;">保存</button>
                <button style="width: 100px;height: 30px;">取消</button>
                <button style="width: 100px;height: 30px;" @click="deleteByMedAnesthesiaInputDict">删除</button>
            </div>
        </div>

	</div>
</template>
<script>
export default {
	data () {
  		return {
            patientList:[],
            viewInfo:false,
            patientInfo:{},
            nowTime:"",
            dateTime:"",
            count:"",
            getTime:"",
            operStatus:"",
            patientId:"",
            patientName:"",
            comTypeList:[],
            itemClass:"",
            obj:"",
            tempTypeItem:"",
            itemName:"",
            contentConfig:[
                {
                    text:"序号",
                    value:"serialNo"

                },
                {
                    text:"分类",
                    value:"itemClass"
                },
                {
                    text:"名称",
                    value:"itemName",
                    status:"inable",
                    isWriteAble:true,
                },
                {
                    text:"编码",
                    value:"itemCode",
                    status:"inable",
                    isWriteAble:true
                },

            ],
            commonTypeList:[],
            dictView:false

    	}
    },
    methods:{
        searchPatientList(){

            let params = {
                count:10,
                dateTime:this.getTime,
                operStatus:this.operStatus,
                patientName:this.patientName,
                patientId:this.patientId
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
                    this.patientInfo = res;
                });
             this.viewInfo=true;
        },
        setIntervaled(){
            var _this = this;
            setInterval(function() {
            var dateObj = new Date(); //表示当前系统时间的Date对象
            var year = dateObj.getFullYear(); //当前系统时间的完整年份值
            var month = dateObj.getMonth() + 1; //当前系统时间的月份值
            var date = dateObj.getDate(); //当前系统时间的月份中的日
            var day = dateObj.getDay(); //当前系统时间中的星期值 
            var hour = dateObj.getHours(); //当前系统时间的小时值
            var minute = dateObj.getMinutes(); //当前系统时间的分钟值
            var second = dateObj.getSeconds(); //当前系统时间的秒钟值
            //如果月、日、小时、分、秒的值小于10，在前面补0
            if(month < 10) {
                month = "0" + month;
            }
            if(date < 10) {
                date = "0" + date;
            }
            if(hour < 10) {
                hour = "0" + hour;
            }
            if(minute < 10) {
                minute = "0" + minute;
            }
            if(second < 10) {
                second = "0" + second;
            }
            var time = new Date();
            // 程序计时的月从0开始取值后+1
            var m = time.getMonth() + 1;
            var t = year + "-" + month + "-" +
                day + " " + time.getHours() + ":" +
                minute + ":" + second;
            _this.nowTime = t;
        }, 1000);
        },
        lockedPatient(item){
             this.patientId = item.patientId;
        },
        getComType(){
            let params = {
            }
            this.api.getMedAnesthesiaCommType(params)
            .then(
                res=>{
                    this.comTypeList = res.list;
                });
        },
        getTypeDetail(item){
            this.tempTypeItem = item;
             let params = {
                itemClass:item.typeName
            }
            this.api.getMedAnesthesiaCommDictByItemClass(params)
            .then(
                res=>{
                    this.commonTypeList = res.list;
                });
        },
        dictShow(){
            this.dictView = !this.dictView;
        },
        getItem(item){
            this.obj = item;
        },
        deleteByMedAnesthesiaInputDict(){
            console.log(this.obj.itemCode);
             let params = {
                itemClass:this.obj.itemClass,
                itemName:this.obj.itemName
            }
            this.api.deleteByMedAnesthesiaInputDict(params)
            .then(
                res=>{
                    this.getTypeDetail(this.tempTypeItem);
                });
        },
        changeInputEdit(item){
            console.log(item.isWriteAble);
            item.isWriteAble = false;
            console.log(item.isWriteAble);
        },
        getEditItem(item){
            console.log(item.itemName);
        }

    },
    mounted(){
        this.searchPatientList();
        this.setIntervaled();
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
    /*background: #0080FF;*/
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
    padding-left: 5px;
}
.patientInfo{
    width: calc(100% - 350px);
}
.pat_title{
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    border: 1px solid rgb(177,207,243);
}
.container{
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */  
    display: -moz-box; /* Firefox 17- */  
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */  
    display: -moz-flex; /* Firefox 18+ */  
    display: -ms-flexbox; /* IE 10 */  
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */  
    margin-bottom: 15px;
}
.in_con{
    width: 150px;
    border:1px solid rgb(197,197,197);
    margin-left: 10px;
}
.left15{
    margin-left: 15px;
}
.in_con100{
    width: 100px;
    border:1px solid rgb(197,197,197);
    margin-left: 10px;
}
.left30{
    margin-left: 30px;
}
.tab_div{
    height: 30px;
    line-height: 30px;
    width: 100px;
    border:1px solid rgb(177,207,243);
    background:rgb(76,121,187);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
    color: white;
    margin-left: 2px;
}
</style>