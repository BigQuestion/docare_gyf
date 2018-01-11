<template>
    <div>
        <div class="tableOut">
            <div class="timechose">
                <div>
                    <!-- <datepicker :value="dateValue" language="zh" @change="dateChange"></datepicker> -->
                    <input type="text" name="" v-model="dateValue">
                    <button @click="dateChange">查询</button>
                </div>
            </div>
            <div class="tableBox">
                <div class="flex head">
                    <div v-for="item in tableConfig" class="cell resizeAble">{{item.text}}</div>
                </div>
                <div v-for="(item,index) in scheduleList" class="flex rows" @dblclick="edit(item)" :class="{state2:item.state==2,state3:item.state==3}">
                    <div v-for="cell in tableConfig" class="cell">
                       
                        <div v-if="cell.type=='select'">
                            <select v-model="item[cell.value]">
                                <option v-for="option in options" v-bind:value="option.userId">
                                    {{ option.userName }}
                                </option>
                            </select>
                        </div>
                        <div v-else-if="cell.type=='inSelect'" >
                            <select  @change="test11(item,index)" v-model="item[cell.value]">
                                <option v-for="option in testinfo" v-bind:value="option.opt">
                                    {{ option.opt }}
                                </option>
                            </select>
                        </div>
                         <div v-else>
                            {{item[cell.value]}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <button @click="submit">提交</button>
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
import { dataTable, dataTableColumn } from "vue-data-table"
export default {
    name: 'login',
    data() {
        return {
            options: [],
            handleItem: {},
            testinfo:[{ opt:'开展'
                        },{
                            opt:'取消'
                        }],
            tableConfig: [
                {
                    text:"操作",
                    type:"inSelect",
                    value:"selectInfo",
                },
                {
                    text: '手术间号',
                    value: 'operatingRoomNo'
                }, {
                    text: '台次',
                    value: 'sequence'
                }, {
                    text: '时间',
                    value: 'scheduledDateTime'
                }, {
                    text: '病人ID',
                    value: 'patientId'
                }, {
                    text: '病人姓名',
                    value: 'patientName'
                }, {
                    text: '年龄',
                    value: 'patienAge'
                }, {
                    text: '住院号',
                    value: 'inpNo'
                }, {
                    text: '床号',
                    value: 'bedNo'
                }, {
                    text: '性别',
                    value: 'patientSex'
                }, {
                    text: '诊断',
                    value: 'diagBeforeOperation'
                }, {
                    text: '手术名称',
                    value: 'operationSchName'
                }, {
                    text: '手术医师',
                    value: 'surgeonName'
                }, {
                    text: '助手1',
                    value: 'firstAssistantName'
                }, {
                    text: '助手2',
                    value: 'secondAssistantName'
                }, {
                    text: '麻醉方法',
                    value: 'anesthesiaMethod'
                }, {
                    text: '主麻',
                    value: 'anesthesiaDoctorName'
                }, {
                    text: '副麻1',
                    value: 'anesthesiaAssistant'
                }, {
                    text: '副麻2',
                    value: 'secondAnesthesiaAssistant'
                }, {
                    text: '洗手1',
                    value: 'firstOperationNurseName'
                }, {
                    text: '洗手2',
                    value: 'secondOperationNurseName'
                }, {
                    text: '巡回1',
                    value: 'firstSupplyNurseName',
                    type: 'select'
                }, {
                    text: '巡回2',
                    value: 'secondtSupplyNurseName',
                    type: 'select'
                }, {
                    text: '隔离',
                    value: 'isolationIndicator'
                }, {
                    text: '备注',
                    value: 'notesOnOperation'
                }
            ],
            msg: '欢迎登陆！',
            dateValue: '2014/07/08',
            scheduleList: [],
            mask: false,
        }
    },
    methods: {
        test11(item,index){
            // debugger
            let cancleData;
            console.log(item)
            if (item.selectInfo == '取消' && item.state == 2) {
                if (confirm("你确定要取消手术吗？")) {
                    item.selectInfo = "开展";
                    this.$set(this.scheduleList,index,item);
                    cancleData = {
                        patientId: item.patientId,
                        scheduleId: item.scheduleId,
                        visitId: item.visitId,
                    }
                    this.api.cancleMedOperationSchedule(cancleData)
                        .then(
                        res => {
                            this.getList(this.dateValue);
                        })
                    // alert("手术已取消");
                }
                else {
                     item.selectInfo = "开展";
                     this.$set(this.scheduleList,index,item);
                }
            } else {
                alert("此手术不能被取消！");
                item.selectInfo = "开展";
                this.$set(this.scheduleList,index,item);
            }
             
        },
        submit() {
            let params = [];
            for (var i = this.scheduleList.length - 1; i >= 0; i--) {
                console.log(this.scheduleList[i].state);
                if (this.scheduleList[i].state == 1 || this.scheduleList[i].state == 0) {
                    params.push({
                        patientId: this.scheduleList[i].patientId,
                        scheduleId: this.scheduleList[i].scheduleId,
                        visitId: this.scheduleList[i].visitId
                    })
                }
            }
            this.api.submitMedOperationScheduleList(params)
                .then(
                res => {
                    debugger
                    this.getList(this.dateValue);
                })
        },
        modalSure() {
            let params = this.handleItem
            this.api.editSchedule(params)
                .then(
                res => {
                    console.log(res);
                }
                )
            this.mask = false;
        },
        modalCancel() {
            this.mask = false;
        },
        edit(item) {
            console.log(item);
            this.handleItem = item;
            this.mask = true;
        },
        dateChange() {
            // console.log(this.dateValue);
            // debugger
            // let date = new Date(this.dateValue);
            // let y = date.getFullYear();
            // let m = date.getMonth()+1;
            // if(m<10){
            //     m = '0'+m;
            // }
            // let d = date.getDate()+1;
            // if(d<10){
            //     d = '0'+d;
            // }
            // let dateStr = y+'/'+m+'/'+d;
            this.getList(this.dateValue)
        },
        getList(date) {
            let params = {
                "dateTime": date, //"2014/07/08"查询日期
                // "page":1,   //第几页
                // "count":2   //每页显示条数
            }
            this.api.getScheduleList(params)
                .then(res => {
                    for (var i = 0; i < res.list.length; i++) {
                        res.list[i].selectInfo = "开展";
                    }
                    this.scheduleList = res.list;
                    console.log(res);
                });
        },
        getSupplyNurseList() {
            this.api.getSupplyNurseList()
                .then(res => {
                    debugger
                    console.log(res);
                    this.options = res.list;
                    this.getList(this.dateValue);
                })
        }
    },
    mounted() {
        // this.getList();

        this.getSupplyNurseList();
    },
    components: {
        Datepicker: Datepicker,
        "data-table": dataTable,
        "data-table-column": dataTableColumn
    }
}
</script>
<style scoped>
.state2 {
    background: #0080FF;
}

.state3 {
    background: #FF6666;
}

.tableBox {
    width: 80%;
    overflow-x: auto;
    height: 400px;
    border: 1px solid #999999;
}

.mySelect {
    width: 100%;
    height: 20px;
}

.cellTd {
    overflow-x: auto;
}

.tableCell {
    width: auto;
}

.infoTable {
    border: 1px solid #B3B3B3;
}

.resizeAble {
    resize: horizontal;
    overflow: auto;
    font-weight: 200;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #39578A;
}

.modalFoot {
    height: 20px;
    width: 100%;
    text-align: right;
}

.modalHead {
    height: 10px;
    background: #999999;
    width: 100%;
}

.modalBody {
    height: calc(100% - 10px - 20px);
    overflow-y: auto;
}

.label {
    width: 100px;
}

.cell {
    width: 60px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.head .cell {
    border: 1px solid #666666;
}

.rows .cell {
    border: 1px solid #B3B3B3;
}

.rows:hover {
    background-color: yellow;
    cursor: pointer;
}

.pCenter {
    display: flex;
    align-items: center;
    justify-content: center;
}

.mask {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, 0.1);
}

.infoModal {
    width: 400px;
    height: 300px;
    background: #fff;
}


.tableOut {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.timechose {
    width: 20%;
    border: 1px solid #999;
    box-sizing: border-box;
    margin-right: 5px;
    padding-left: 5px;
}
</style>