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
        <div>
            <div class="flex head">
                <div v-for="item in tableConfig" class="cell resizeAble">{{item.text}}</div>
            </div>
            <div v-for="item in scheduleList" class="flex rows" @dblclick="edit(item)">
                <div  v-for="cell in tableConfig" class="cell" >
                    <div v-if="cell.type!='select'">
                        {{item[cell.value]}}
                    </div>
                    <div v-if="cell.type=='select'">
                        <select v-model="item[cell.value]">  
                          <option v-for="option in options" v-bind:value="option.userId">  
                            {{ option.userName }}
                          </option>
                        </select>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="mask pCenter" v-if="mask">
            <div class="infoModal">
                <div class="modalHead"></div>
                <div class="modalBody">
                    <div v-for="item in tableConfig" class="flex">
                        <div class="label">{{item.text}}</div>
                        <input type="" name="" v-model="handleItem[item.value]">
                    </div>
                </div>
                <div class="modalFoot">
                    <button @click="modalSure">确定</button>
                    <button @click="modalCancel">取消</button>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import {dataTable,dataTableColumn} from "vue-data-table"
export default {
name: 'login',
	data () {
  		return {
            options:[],
            handleItem:{},
            tableConfig:[
            {
                text:'手术间号',
                value:'operatingRoomNo'
            },{
                text:'台次',
                value:'sequence'
            },{
                text:'时间',
                value:'scheduledDateTime'
            },{
                text:'病人ID',
                value:'patientId'
            },{
                text:'病人姓名',
                value:'patientName'
            },{
                text:'年龄',
                value:'operatingRoomNo'
            },{
                text:'住院号',
                value:'inpNo'
            },{
                text:'床号',
                value:'bedNo'
            },{
                text:'性别',
                value:'patientSex'
            },{
                text:'诊断',
                value:'diagBeforeOperation'
            },{
                text:'手术名称',
                value:'operationName'
            },{
                text:'手术医师',
                value:'surgeon'
            },{
                text:'助手1',
                value:'firstAssistant'
            },{
                text:'助手2',
                value:'secondAssistant'
            },{
                text:'麻醉方法',
                value:'anesthesiaMethod'
            },{
                text:'主麻',
                value:'anesthesiaDoctor'
            },{
                text:'副麻1',
                value:'anesthesiaAssistant'
            },{
                text:'副麻2',
                value:'secondAnesthesiaAssistant'
            },{
                text:'洗手1',
                value:'firstOperationNurse'
            },{
                text:'洗手2',
                value:'secondOperationNurse'
            },{
                text:'巡回1',
                value:'firstSupplyNurse',
                type:'select'
            },{
                text:'巡回2',
                value:'secondSupplyNurse',
                type:'select'
            },{
                text:'隔离',
                value:'isolationIndicator'
            },{
                text:'备注',
                value:'notesOnOperation'
            }
            ],
      		msg: '欢迎登陆！',
            dateValue:new Date(2014,6,8),
            scheduleList:[],
            mask:false,
    	}
    },
    methods:{
        modalSure(){
            let params = this.handleItem
            this.api.editSchedule(params)
            .then(
                res=>{
                    console.log(res);
                }
            )
            this.mask = false;
        },
        modalCancel(){
            this.mask = false;
        },
        edit(item){
            console.log(item);
            this.handleItem = item;
            this.mask = true;
        },
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
                "dateTime":"2014/07/08", //查询日期
                "page":1,   //第几页
                "count":2   //每页显示条数
            }
            this.api.getScheduleList(params)
                .then(res=>{
                    this.scheduleList = res;
                     console.log(res);
                 });
        },
        getSupplyNurseList(){
            let params = {

            }
            this.api.getSupplyNurseList(params)
                .then(res=>{
                    console.log(res);
                    this.options = res;
                    this.getList();
                })
        }
    },
    mounted(){
        
        this.getSupplyNurseList();
    },
    components: {
        Datepicker:Datepicker,
        "data-table": dataTable,
        "data-table-column": dataTableColumn
    }
}
</script>
<style scoped>
.mySelect{
    width:100%;
    height:20px;
}
.cellTd{
    overflow-x: auto;
}
.tableCell{
    width:auto;
}
.infoTable{
    border:1px solid #B3B3B3;
}
.resizeAble{
    resize: horizontal;
    overflow:auto;
    font-weight: 200;
    text-overflow:ellipsis;
    white-space: nowrap;

}
.modalFoot{
    height:20px;
    width:100%;
    text-align: right;
}
.modalHead{
    height:10px;
    background: #999999;
    width:100%;
}
.modalBody{
    height:calc(100% - 10px - 20px);
    overflow-y: auto;
}
.label{
    width:100px;
}
.cell{
    width:60px;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.head .cell{
    border:1px solid #666666;
}

.rows .cell{
    border:1px solid #B3B3B3;
}
.rows:hover{
    background-color:yellow;
    cursor:pointer;
}
.pCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mask{
    position: absolute;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    z-index: 2;
    background: rgba(0,0,0,0.1);
}
.infoModal{
  width:400px;
  height:300px;
  background: #fff;
}


</style>