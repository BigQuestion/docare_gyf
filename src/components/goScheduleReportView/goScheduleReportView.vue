<template>
	<div>
        <input type="text" name="" v-model="dateValue">
        <button @click="search()">查询</button>
        <div class="tableBox">
            <div class="flex head">
                <div v-for="item in tableConfig" class="cell resizeAble">{{item.text}}</div>
            </div>
            <div v-for="item in scheduleList" class="flex rows">
                <div  v-for="cell in tableConfig" class="cell" >
                        {{item[cell.value]}}
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
    name: 'login',
	data () {
  		return {
            tableConfig:[
            {
                text:'手术安排标识',
                value:'SCHEDULE_ID'
            },{
                text:'姓名',
                value:'PAT_NAME'
            },{
                text:'年龄',
                value:'PAT_AGE'
            },{
                text:'床号',
                value:'BED_NO'
            },{
                text:'性别',
                value:'SEX'
            },{
                text:'术前诊断',
                value:'DIAG_BEFORE_OPERATION'
            },{
                text:'手术室',
                value:'OPERATING_ROOM'
            }
            ],
            dateValue:'2014/07/08',
            scheduleList:[],
    	}
    },
    methods:{
        getList(date){
            let params = {
                "dateTime":date, //"2014/07/08"查询日期
                // "page":1,   //第几页
                // "count":2   //每页显示条数
            }
            debugger
            this.api.getScheduleReportView(params)
                .then(res=>{
                    debugger
                    this.scheduleList = res;
                     console.log(res);
                 });
        },
        search(){
            this.getList(this.dateValue);
        }
    },
    mounted(){
        
    },
    components: {
    }
}
</script>
<style scoped>
.state2{
    background: #0080FF;
}
.state3{
    background:#FF6666;
}
.tableBox{
    width:100%;
    overflow-x: auto;
    height:400px;
    border:1px solid #999999;
}
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