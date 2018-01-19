<template>
    <div>
        <div class="tableOut">
            <div class="timechose">
                <div>
                    <!-- <datepicker :value="dateValue" language="zh" @change="dateChange"></datepicker> -->
                    <input type="date" name="" v-model="dateValue" @change="test($event)">
                    <button @click="dateChange">查询</button>
                </div>
            </div>
            <div style="width: 80%;overflow:auto;">
                <div class="tableBox" :style="{width:totalWidth+'px'}">
                    <div class="flex head" :style="{width:totalWidth+'px'}">
                        <div v-for="(item,index) in tableConfig" class="cell resizeAble" :style="{width:item.width+'px'}" style="text-align: center;position: relative;border: 1px solid #E6E6E6;display: inline-block;box-sizing: border-box;">
                            <div style="width:100%;overflow-x: hidden;white-space: nowrap">{{item.text}}</div>
                            <div class="resizeIcon" :style="{left:item.width-2}" @mousedown="resizeStart($event,index,item)"></div>
                        </div>
                    </div>

                    <div>
                        <div v-for="(item,index) in scheduleList" :style="{width:totalWidth+'px'}" class="flex rows" @dblclick="edit(item)" :class="{state2:item.state==2,state3:item.state==3}">
                            <div v-for="cell in tableConfig" class="cell" :style="{width:cell.width+'px'}" style="box-sizing: border-box; ">

                                <div v-if="cell.type=='select'&&(item.state==0||item.state==1)" class="selectInThere">
                                    <select class="selectBox noneTriangle" v-model="item[cell.value]" @change="nameDataType(item)">
                                        <!-- <option v-if="cell.value == 'anesthesiaAssistant'||cell.value == 'secondAnesthesiaAssistantName'" v-for="MzkUser in MzkUsers" v-bind:value="MzkUser.userId">
                                                                                                {{ MzkUser.userName }}
                                                                                             </option> -->
                                        <!-- 副麻，洗手列表 -->
                                        <option v-if="cell.value == 'firstAnesthesiaAssistantName'||cell.value == 'secondAnesthesiaAssistantName'" v-for="MzkUser in MzkUsers" v-bind:value="MzkUser.userName">
                                            {{ MzkUser.userName }}
                                        </option>
                                        <option v-if="cell.value == 'firstOperationNurseName'||cell.value == 'secondOperationNurseName'" v-for="MzkUser in MzkUsers" v-bind:value="MzkUser.userName">
                                            {{ MzkUser.userName }}
                                        </option>
                                        <!-- 巡回列表 -->
                                        <option v-if="cell.value == 'firstSupplyNurseName'||cell.value == 'secondtSupplyNurseName'" v-for="option in options" v-bind:value="option.userName">
                                            {{ option.userName }}
                                        </option>
                                    </select>
                                </div>
                                <div class="selectInThere" v-else-if="cell.type=='inSelect'">
                                    <select class="selectBox" @change="operateFun(item,index)" v-model="item[cell.value]">
                                        <option v-for="option in OptInfo" v-bind:value="option.opt">
                                            {{ option.opt }}
                                        </option>
                                    </select>
                                </div>
                                <div class="selectInThere" v-else>
                                    <div style="overflow: hidden;white-space: nowrap;box-sizing: border-box;text-overflow:ellipsis; ">
                                        {{item[cell.value]}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div style="display:flex;flex-direction:row-reverse;padding-top:10px;">
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
            MzkUsers: [],
            handleItem: {},
            OptInfo: [{
                opt: '开展'
            }, {
                opt: '取消'
            }, {
                opt: '作废'
            }],
            tableConfig: [
                {
                    text: "操作",
                    type: "inSelect",
                    value: "selectInfo",
                    width: 100
                },
                {
                    text: '手术间号',
                    value: 'operatingRoomNo',
                    width: 60,
                }, {
                    text: '台次',
                    value: 'sequence',
                    width: 60,
                }, {
                    text: '时间',
                    value: 'scheduledDateTime',
                    width: 150,
                }, {
                    text: '病人ID',
                    value: 'patientId',
                    width: 100,
                }, {
                    text: '病人姓名',
                    value: 'patientName',
                    width: 100,
                }, {
                    text: '年龄',
                    value: 'patienAge',
                    width: 60,
                }, {
                    text: '住院号',
                    value: 'inpNo',
                    width: 100,
                }, {
                    text: '床号',
                    value: 'bedNo',
                    width: 60,
                }, {
                    text: '性别',
                    value: 'patientSex',
                    width: 60,
                }, {
                    text: '诊断',
                    value: 'diagBeforeOperation',
                    width: 200,
                }, {
                    text: '手术名称',
                    value: 'operationSchName',
                    width: 250,
                }, {
                    text: '手术医师',
                    value: 'surgeonName',
                    width: 100,
                }, {
                    text: '助手1',
                    value: 'firstAssistantName',
                    width: 100,
                }, {
                    text: '助手2',
                    value: 'secondAssistantName',
                    width: 100,
                }, {
                    text: '麻醉方法',
                    value: 'anesthesiaMethod',
                    width: 200,
                }, {
                    text: '主麻',
                    value: 'anesthesiaDoctorName',
                    width: 100,
                }, {
                    text: '副麻1',
                    value: 'firstAnesthesiaAssistantName',
                    type: 'select',
                    width: 100,
                }, {
                    text: '副麻2',
                    value: 'secondAnesthesiaAssistantName',
                    type: 'select',
                    width: 100,
                }, {
                    text: '洗手1',
                    value: 'firstOperationNurseName',
                    type: 'select',
                    width: 100,
                }, {
                    text: '洗手2',
                    value: 'secondOperationNurseName',
                    type: 'select',
                    width: 100,
                }, {
                    text: '巡回1',
                    value: 'firstSupplyNurseName',
                    type: 'select',
                    width: 100,
                }, {
                    text: '巡回2',
                    value: 'secondtSupplyNurseName',
                    type: 'select',
                    width: 100,
                }, {
                    text: '隔离',
                    value: 'isolationIndicator',
                    width: 100,
                }, {
                    text: '备注',
                    value: 'notesOnOperation',
                    width: 100,
                }
            ],
            msg: '欢迎登陆！',
            dateValue: '2014-07-08',
            dataInData:'',
            scheduleList: [],
            mask: false,
            area: '',
            startX: '',
            handleCol: '',
            nextCol: '',
            minWidth: 20,
            maxWidth: '',
            totalWidth: 10,
        }
    },
    methods: {
        operateFun(item, index) {
            debugger
            let cancleData;
            console.log(item.selectInfo)
            if (item.selectInfo == '取消' && item.state == 2) {
                if (confirm("你确定要取消手术吗？")) {
                    item.selectInfo = "开展";
                    this.$set(this.scheduleList, index, item);
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
                    this.$set(this.scheduleList, index, item);
                }
            } else if (item.selectInfo == '开展' && (item.state == 500 || item.state == -1)) {
                if (confirm("你确定要恢复手术吗？")) {
                    item.selectInfo = "取消";
                    this.$set(this.scheduleList, index, item);
                    cancleData = {
                        patientId: item.patientId,
                        scheduleId: item.scheduleId,
                        visitId: item.visitId,
                    }
                    this.api.addCancleMedOperationSchedule(cancleData)
                        .then(
                        res => {
                            this.getList(this.dateValue);
                        })
                    // alert("手术已恢复");
                } else {
                    item.selectInfo = "取消";
                    this.$set(this.scheduleList, index, item);
                }
            } else if (item.selectInfo == '作废' && (item.state == 0 || item.state == 1)) {
                if (confirm("你确定要作废该手术吗？")) {
                    item.selectInfo = "开展";
                    this.$set(this.scheduleList, index, item);
                    cancleData = {
                        patientId: item.patientId,
                        scheduleId: item.scheduleId,
                        visitId: item.visitId,
                        state: -1,
                    }
                    this.api.editSchedule(cancleData)
                        .then(
                        res => {
                            this.getList(this.dateValue);
                        })
                    // alert("手术已取消");
                } else {
                    item.selectInfo = "开展";
                    this.$set(this.scheduleList, index, item);
                }
            } else {
                debugger
                alert("你不能这样操作此手术！");
                if (item.selectInfo == '开展' && (item.state == 0 || item.state == 1)) {
                    item.selectInfo = "取消";
                    this.$set(this.scheduleList, index, item);
                } else if (item.selectInfo == '作废' && (item.state == 500 || item.state == -1)) {
                    item.selectInfo = "取消";
                    this.$set(this.scheduleList, index, item);
                } else {
                    item.selectInfo = "开展";
                    this.$set(this.scheduleList, index, item);
                }

            }

        },
        nameDataType(item) {
            console.log(item)
        },
        submit() {
            let params = [];
            let nameDoc = [];
            let dataInName;
            for (var i = 0; i < this.scheduleList.length; i++) {
                console.log(this.scheduleList[i].state);
                if (this.scheduleList[i].state == 1 || this.scheduleList[i].state == 0) {
                    nameDoc.push({
                        firstAnesthesiaAssistantName: this.scheduleList[i].firstAnesthesiaAssistantName,
                        secondAnesthesiaAssistantName: this.scheduleList[i].secondAnesthesiaAssistantName,
                        firstOperationNurseName: this.scheduleList[i].firstOperationNurseName,
                        secondOperationNurseName: this.scheduleList[i].secondOperationNurseName,
                        firstSupplyNurseName: this.scheduleList[i].firstSupplyNurseName,
                        secondtSupplyNurseName: this.scheduleList[i].secondtSupplyNurseName,
                    })
                }
            }

            console.log(nameDoc)
            console.log(nameDoc.length)
            // debugger
            for (var j = 0; j < nameDoc.length; j++) {
                if (nameDoc[j].firstAnesthesiaAssistantName != null && nameDoc[j].firstOperationNurseName != null && nameDoc[j].firstSupplyNurseName != null) {
                    dataInName = true;
                    params.push({
                        patientId: this.scheduleList[j].patientId,
                        scheduleId: this.scheduleList[j].scheduleId,
                        visitId: this.scheduleList[j].visitId
                    })
                } else {

                }
            }
            console.log(params)
            if (dataInName) {
                this.api.submitMedOperationScheduleList(params)
                    .then(
                    res => {
                        // debugger
                        dataInName = false;
                        this.getList(this.dateValue);
                    })
                alert('提交成功!')
            } else {
                alert('必要的选项不能为空！')
            }

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
        test(event) {
            console.log(event.srcElement.value)
            // var change = this.dateValue.replace(/-/g, '/')
            // console.log(change)
            this.dateValue = event.srcElement.value;
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
            var changeData = date.replace(/-/g, '/')
            let params = {
                "dateTime": changeData, //"2014/07/08"查询日期
                // "page":1,   //第几页
                // "count":2   //每页显示条数
            }
            this.api.getScheduleList(params)
                .then(res => {
                    for (var i = 0; i < res.list.length; i++) {
                        if (res.list[i].state == -1) {
                            res.list[i].selectInfo = "取消";
                        } else if (res.list[i].state == 500) {
                            res.list[i].selectInfo = "取消";
                        } else {
                            res.list[i].selectInfo = "开展";
                        }

                    }
                    this.scheduleList = res.list;
                    console.log(res);
                });
        },
        getSupplyNurseList() {
            this.api.getSupplyNurseList()
                .then(res => {
                    // debugger
                    console.log(res);
                    this.options = res.list;
                    this.getList(this.dateValue);
                })
        },
        getMzkUsersList() {
            this.api.getMzkUsers()
                .then(res => {
                    // debugger
                    console.log(res);
                    this.MzkUsers = res.list;
                    this.getList(this.dateValue);
                })
        },
        resizeStart(e, index, col) {
            if (index == this.tableConfig.length - 1) {
                return;
            }
            console.log('start');
            this.startX = e.clientX;
            //this.handleCol = col;
            this.handleCol = this.tableConfig[index - 1];
            this.nextCol = this.tableConfig[index + 1];
            this.maxWidth = this.handleCol.width + this.nextCol.width - 10;
            this.area.addEventListener('mousemove', this.resizeMove);
            this.area.addEventListener('mouseup', this.stopDrag);
        },
        resizeMove(e) {
            let dX = e.clientX - this.startX;

            if (this.maxWidth >= this.handleCol.width + dX && this.minWidth <= this.handleCol.width + dX) {
                this.startX = e.clientX;
                this.handleCol.width += dX;
                this.totalWidth += dX;
                //this.nextCol.width -= dX;
            }
        },
        stopDrag(e) {
            this.area.removeEventListener('mousemove', this.resizeMove);
            this.area.removeEventListener('mouseup', this.stopDrag);
        },
        plusAll() {
            let totalWidth = 0;
            for (let i = 0; i < this.tableConfig.length; i++) {
                totalWidth += this.tableConfig[i].width;
            }
            return totalWidth;
        }
    },
    mounted() {
        this.getSupplyNurseList();
        this.getMzkUsersList();
        this.area = window;
        let totalWidth = this.plusAll();
        console.log(totalWidth);
        this.$set(this.$data, 'totalWidth', totalWidth)
    },
    components: {
        Datepicker: Datepicker,
        "data-table": dataTable,
        "data-table-column": dataTableColumn
    }
}
</script>
<style scoped>
.flex {
    height: 25px;
    line-height: 25px;
}

.state2 {
    background: #0080FF;
}

.state3 {
    background: #FF6666;
}

.tableBox {
    width: 100%;
    /*overflow-x: auto;*/
    height: 550px;
    /*border: 1px solid #999999;*/
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
    /* resize: horizontal; */
    overflow: auto;
    font-weight: 200;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #39578A;
    color: #fff;
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

.cell {
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

.selectInThere {
    width: 100%;
    height: 100%;
}

.selectBox {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    display: block;
}

.noneTriangle {
    appearance: none;
}

.resizeIcon {
    position: absolute;
    top: 0px;
    height: 100%;
    width: 5px;
    background: rgba(0, 0, 0, 0);
    z-index: 2;
}

.resizeIcon:hover {
    cursor: w-resize;
}
</style>