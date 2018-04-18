<template>
    <div>
        <div style="display:flex;justify-content:space-between;padding:10px 5px 10px 0px;">
            <div class="dataOfDoc">
                <span>手术间号：{{hasChooseRoom.name}}</span>
                <span>主麻医师：{{hasChooseRoom.docoptions}}</span>
                <span>副麻医师1：{{hasChooseRoom.docmzkUsers}}</span>
                <span>副麻医师2：{{hasChooseRoom.docmzkUsers2}}</span>
                <span>麻醉助手1：{{hasChooseRoom.assistant}}</span>
                <span>麻醉助手2：{{hasChooseRoom.assistant2}}</span>
                <span>洗手护士1：{{hasChooseRoom.docwash}}</span>
                <span>洗手护士2：{{hasChooseRoom.docwash2}}</span>
                <span>巡回护士1：{{hasChooseRoom.doctour}}</span>
                <span>巡回护士2：{{hasChooseRoom.doctour2}}</span>
            </div>
            <button @click="submit">手术提交</button>
        </div>
        <div class="tableOut">
            <div class="timechose">
                <div style="height:75px;padding-left: 5px;">
                    <!-- <datepicker :value="dateValue" language="zh" @change="dateChange"></datepicker> -->
                    <input type="date" name="" v-model="dateValue" @change="test($event)">
                    <button @click="dateChange">查询</button>
                </div>
                <div class="itemChoose">
                    {{chooseData}}
                </div>
                <div class="itemChooseContent" @click="noneDulClick()">
                    <div v-if="chooseOneType=='list'">
                        <div class="flex head" :style="{width:totalWidth+'px'}">
                            <div v-for="(item,index) in tableConfig" class="cell resizeAble" :style="{width:item.width+'px'}" style="text-align: center;position: relative;border: 1px solid #E6E6E6;display: inline-block;box-sizing: border-box;">
                                <div style="width:100%;overflow-x: hidden;white-space: nowrap">{{item.text}}</div>
                                <div class="resizeIcon" :style="{left:item.width-2}" @mousedown="resizeStart($event,index,item)"></div>
                            </div>
                        </div>
                        <div style="position:relative;">
                            <div v-for="(item,index) in scheduleList" :style="{width:totalWidth+'px'}" class="flex rows" @contextmenu.prevent="arrange($event,item,index)" @dblclick="edit(item)" :class="{state2:item.state==2,state3:item.state==3}">
                                <div v-for="cell in tableConfig" class="cell" :style="{width:cell.width+'px'}" style="box-sizing: border-box; ">
                                    {{item[cell.value]}}
                                </div>
                            </div>
                            <div @click="pushData()" v-if="showarrange" style="width:100px;height:25px;position:absolute;background-color:red;z-index:99;" :style="{top:clickTop+'px',left:clickLeft+'px'}">
                                分配手术
                            </div>
                        </div>
                    </div>
                    <div v-if="chooseOneType=='docoptions'" v-for="item in options" @click="joinData('docoptions',item)" class="docList rows">
                        {{item.userName}}
                    </div>
                    <div v-if="chooseOneType=='docmzkUsers'" v-for="item in MzkUsers" @click="joinData('docmzkUsers',item)" class="docList rows">
                        {{item.userName}}
                    </div>
                    <div v-if="chooseOneType=='assistant'" v-for="item in assistant" @click="joinData('assistant',item)" class="docList rows">
                        {{item.userName}}
                    </div>
                    <div v-if="chooseOneType=='docwash'" v-for="item in wash" @click="joinData('docwash',item)" class="docList rows">
                        {{item.userName}}
                    </div>
                    <div v-if="chooseOneType=='doctour'" v-for="item in tour" @click="joinData('doctour',item)" class="docList rows">
                        {{item.userName}}
                    </div>
                </div>
                <div class="itemChooseBox">
                    <div v-if="item.dataLength !== undefined" class="itemBox" v-for="item in listChooseBody" @click="chooseOne(item)">
                        {{item.data}}({{item.dataLength}})
                    </div>
                    <div v-else class="itemBox" @click="chooseOne(item)">
                        {{item.data}}
                    </div>
                </div>
            </div>
            <div style="width: 80%;overflow:auto;background-color:#E7EBEC;">
                <div style="width:auto;height:auto;">
                    <div class="timeLine"></div>
                    <div class="BoxOf" v-for="(item,index) in roomId">
                        <div class="operationRoom" @click="chooseClassFun(item,index)" :class="{backgroundColor:item.chooseClass}">
                            {{item.name}}
                        </div>
                        <div style="width:auto;height:100%;display:flex;">
                            <div v-if="cell.operatingRoomNo == item.name" v-for="(cell,index) in scheduleListRight">
                                <div v-if="cell.state == 2||cell.state == 3||cell.state == 4" class="roomData">
                                    <div style="color:#5298EE;border-bottom:1px solid #E9E9ED;padding:2px 0;">
                                        <span style="padding-right:10px;">09:30-11:01</span>
                                        <span>{{cell.patientName}}</span>
                                    </div>
                                    <div style="color:#222;padding:2px 0;">
                                        <span style="padding-right:10px;">{{cell.patientName}}</span>
                                        <span style="padding-right:10px;">{{cell.patientId}}</span>
                                        <span style="padding-right:10px;">{{cell.patientSex}}</span>
                                        <span>{{cell.patienAge}}</span>
                                    </div>
                                    <div style="color:#222;padding:2px 0;font-weight:bold;">
                                        {{cell.operationSchName}}
                                    </div>
                                    <div style="color:#222;padding:2px 0;width:100%;">
                                        <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">{{cell.anesthesiaDoctorName}}</span>
                                        <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">副麻</span>
                                    </div>
                                    <div style="padding:2px 0;font-weight:bold;">
                                        备注：
                                        <span style="color:red;">{{cell.notesOnOperation}}</span>
                                    </div>
                                </div>
                                <div v-else style="border:1px solid #95DDB6;position:relative;" class="roomData">
                                    <div @click="goBackFun(cell,index)" class="goBack">X</div>
                                    <div style="color:#5298EE;border-bottom:1px solid #E9E9ED;padding:2px 0;">
                                        <span style="padding-right:10px;">09:30-11:01</span>
                                        <span>{{cell.patientName}}</span>
                                    </div>
                                    <div style="color:#222;padding:2px 0;">
                                        <span style="padding-right:10px;">{{cell.patientName}}</span>
                                        <span style="padding-right:10px;">{{cell.patientId}}</span>
                                        <span style="padding-right:10px;">{{cell.patientSex}}</span>
                                        <span>{{cell.patienAge}}</span>
                                    </div>
                                    <div style="color:#222;padding:2px 0;font-weight:bold;">
                                        {{cell.operationSchName}}
                                    </div>
                                    <div style="color:#222;padding:2px 0;width:100%;">
                                        <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">{{cell.anesthesiaDoctorName}}</span>
                                        <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">副麻</span>
                                    </div>
                                    <div style="padding:2px 0;font-weight:bold;">
                                        备注：
                                        <span style="color:red;">{{cell.notesOnOperation}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mask pCenter" v-if="mask">
            <div class="infoModal">
                <div class="modalHead">
                    <span>集合编辑器</span>
                    <div @click="modalCancel" class="font_active">X</div>
                </div>
                <div class="modalBody">
                    <div v-for="item in tableConfig" class="flex">
                        <div class="label">{{item.text}}：</div>
                        <textarea v-if="item.text == '备注'" name="" id="" v-model="handleItem[item.value]"></textarea>
                        <input v-else style="width:130px;" type="" name="" v-model="handleItem[item.value]">
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
            assistant: [],
            wash: [],
            tour: [],
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
                    text: "手术审核时间",
                    type: "inSelect",
                    value: "sqrdatatime",
                    width: 120
                }, {
                    text: '申请时间',
                    value: 'scheduledDateTime',
                    width: 60,
                }, {
                    text: '科室名称',
                    value: 'deptName',
                    width: 60,
                }, {
                    text: '床号',
                    value: 'bedNo',
                    width: 60,
                }, {
                    text: '台次',
                    value: 'sequence',
                    width: 60,
                }, {
                    text: '病人姓名',
                    value: 'patientName',
                    width: 100,
                }, {
                    text: '年龄',
                    value: 'patienAge',
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
                    text: '手术助手1',
                    value: 'firstAssistantName',
                    width: 100,
                }, {
                    text: '手术助手2',
                    value: 'secondAssistantName',
                    width: 100,
                }, {
                    text: '麻醉方法',
                    value: 'anesthesiaMethod',
                    width: 200,
                }, {
                    text: '备注',
                    value: 'notesOnOperation',
                    width: 100,
                }
            ],
            getLength: '0',
            listChooseBody: [
                { data: '手术', dataLength: 0, type: 'list' },
                { data: '主麻医生', type: 'docoptions' },
                { data: '副麻医生', type: 'docmzkUsers' },
                { data: '麻醉助手', type: 'assistant' },
                { data: '洗手护士', type: 'docwash' },
                { data: '巡回护士', type: 'doctour' },
            ],
            roomId: [
                {
                    name: '01',
                    chooseClass: true,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '02',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '03',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '04',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '05',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '06',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '07',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '08',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '09',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '10',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '11',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '12',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '13',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
                {
                    name: '14',
                    chooseClass: false,
                    docoptions: '',
                    docmzkUsers: '',
                    docmzkUsers2: '',
                    assistant: '',
                    assistant2: '',
                    docwash: '',
                    docwash2: '',
                    doctour: '',
                    doctour2: '',
                },
            ],
            hasChooseRoom: {},
            hasChooseIndex: 0,
            chooseData: '手术(0)',
            chooseOneType: 'list',
            dateValue: '2014-07-08',
            scheduleList: [],
            scheduleListRight: [],
            mask: false,
            area: '',
            startX: '',
            handleCol: '',
            nextCol: '',
            minWidth: 20,
            maxWidth: '',
            totalWidth: 10,
            showarrange: false,
            clickTop: '',
            clickLeft: '',
            pushDataBody: '',
            spliceIndex: '',
            newUpdata: [],
        }
    },
    methods: {
        nameDataType(item) {
            console.log(item)
        },
        submit() {
            let params = [];
            let dataInName;

            // debugger
            for (var j = 0; j < this.newUpdata.length; j++) {
                if (this.newUpdata[j].anesthesiaDoctorName != '') {
                    dataInName = true;
                    params.push({
                        patientId: this.newUpdata[j].patientId,
                        scheduleId: this.newUpdata[j].scheduleId,
                        visitId: this.newUpdata[j].visitId,
                        anesthesiaDoctor: this.newUpdata[j].anesthesiaDoctorName,
                        anesthesiaAssistant: this.newUpdata[j].firstAnesthesiaAssistantName,
                        secondAnesthesiaAssistant: this.newUpdata[j].secondAnesthesiaAssistantName,
                        firstOperationNurse: this.newUpdata[j].firstOperationNurseName,
                        secondOperationNurse: this.newUpdata[j].secondOperationNurseName,
                        firstSupplyNurse: this.newUpdata[j].firstSupplyNurseName,
                        secondSupplyNurse: this.newUpdata[j].secondtSupplyNurseName,
                        operatingRoomNo: this.newUpdata[j].operatingRoomNo,
                        sequence: this.newUpdata[j].sequence,
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
                        this.getList(this.dateValue)
                        this.newUpdata = [];

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
            this.getList(this.dateValue)
        },
        chooseOne(item) {
            console.log(item)
            this.chooseOneType = item.type;
            console.log(this.chooseOneType)
            if (item.dataLength !== undefined) {
                this.chooseData = item.data + '(' + item.dataLength + ')'
            } else {
                this.chooseData = item.data
            }
        },
        chooseClassFun(item, index) {
            console.log(this.roomId.length)
            for (var i = 0; i < this.roomId.length; i++) {
                this.$set(this.roomId[i], 'chooseClass', false)
            }
            item.chooseClass = true;
            this.hasChooseRoom = item;
            console.log(this.hasChooseRoom)
            this.hasChooseIndex = index;
            console.log(index)
        },
        joinData(type, item) {
            console.log(item)
            if (type == 'docoptions') {
                this.roomId[this.hasChooseIndex].docoptions = item.userId;
                this.hasChooseRoom.docoptions = item.userId;
                for (var a = 0; a < this.newUpdata.length; a++) {
                    this.newUpdata[a].anesthesiaDoctorName = item.userId;
                }
            } else if (type == 'docmzkUsers') {
                if (this.roomId[this.hasChooseIndex].docmzkUsers == '') {
                    this.roomId[this.hasChooseIndex].docmzkUsers = item.userId;
                    this.hasChooseRoom.docmzkUsers = item.userId;
                    for (var b = 0; b < this.newUpdata.length; b++) {
                        this.newUpdata[b].firstAnesthesiaAssistantName = item.userId;
                    }
                } else {
                    this.roomId[this.hasChooseIndex].docmzkUsers2 = item.userId;
                    this.hasChooseRoom.docmzkUsers2 = item.userId;
                    for (var b = 0; b < this.newUpdata.length; b++) {
                        this.newUpdata[b].secondAnesthesiaAssistantName = item.userId;
                    }
                }

            } else if (type == 'assistant') {
                if (this.roomId[this.hasChooseIndex].assistant == '') {
                    this.roomId[this.hasChooseIndex].assistant = item.userId;
                    this.hasChooseRoom.assistant = item.userId;
                    for (var c = 0; c < this.newUpdata.length; c++) {
                        this.newUpdata[c].firstAssistantName = item.userId;
                    }
                } else {
                    this.roomId[this.hasChooseIndex].assistant2 = item.userId;
                    this.hasChooseRoom.assistant2 = item.userId;
                    for (var c = 0; c < this.newUpdata.length; c++) {
                        this.newUpdata[c].secondAssistantName = item.userId;
                    }
                }
            } else if (type == 'docwash') {
                if (this.roomId[this.hasChooseIndex].docwash == '') {
                    this.roomId[this.hasChooseIndex].docwash = item.userId;
                    this.hasChooseRoom.docwash = item.userId;
                    for (var d = 0; d < this.newUpdata.length; d++) {
                        this.newUpdata[d].firstOperationNurseName = item.userId;
                    }
                } else {
                    this.roomId[this.hasChooseIndex].docwash2 = item.userId;
                    this.hasChooseRoom.docwash2 = item.userId;
                    for (var d = 0; d < this.newUpdata.length; d++) {
                        this.newUpdata[d].secondOperationNurseName = item.userId;
                    }
                }

            } else if (type == 'doctour') {
                if (this.roomId[this.hasChooseIndex].doctour == '') {
                    this.roomId[this.hasChooseIndex].doctour = item.userId;
                    this.hasChooseRoom.doctour = item.userId;
                    for (var e = 0; e < this.newUpdata.length; e++) {
                        this.newUpdata[e].firstSupplyNurseName = item.userId;
                    }
                } else {
                    this.roomId[this.hasChooseIndex].doctour2 = item.userId;
                    this.hasChooseRoom.doctour2 = item.userId;
                    for (var e = 0; e < this.newUpdata.length; e++) {
                        this.newUpdata[e].secondtSupplyNurseName = item.userId;
                    }
                }

            }
            console.log(this.hasChooseRoom)
        },
        getList(date) {
            this.scheduleList = [];
            this.scheduleListRight = [];
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
                    for (var j = 0; j < res.list.length; j++) {
                        if (res.list[j].state == 0 || res.list[j].state == 1) {
                            this.scheduleList.push(res.list[j])
                            console.log(res.list[j])
                        }
                    }
                    console.log(this.scheduleList.length)
                    this.listChooseBody[0].dataLength = this.scheduleList.length;
                    this.chooseData = '手术(' + this.scheduleList.length + ')';
                    for (var a = 0; a < res.list.length; a++) {
                        if (res.list[a].state == 2 || res.list[a].state == 3 || res.list[a].state == 4) {
                            this.scheduleListRight.push(res.list[a])
                        }
                    }
                    console.log(this.scheduleList)
                    console.log(this.scheduleListRight)
                    // this.scheduleList = res.list;
                    console.log(res.list);
                });
        },
        getSupplyNurseList() {
            this.getList(this.dateValue);
            this.api.selectUserListByType({ userType: '主麻医师' })
                .then(res => {
                    // debugger
                    console.log(res)
                    this.options = res;
                    console.log(this.options)
                })
            this.api.selectUserListByType({ userType: '副麻医师' })
                .then(res => {
                    // debugger
                    console.log(res);
                    this.MzkUsers = res;
                })
            this.api.selectUserListByType({ userType: '麻醉助手' })
                .then(res => {
                    // debugger
                    console.log(res);
                    this.assistant = res;
                })
            this.api.selectUserListByType({ userType: '洗手护士' })
                .then(res => {
                    // debugger
                    console.log(res);
                    this.wash = res;
                })
            this.api.selectUserListByType({ userType: '巡回护士' })
                .then(res => {
                    // debugger
                    console.log(res);
                    this.tour = res;
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
        },
        noneDulClick() {
            this.showarrange = false;
        },
        arrange(event, item, index) {
            console.log(event)
            console.log(item)
            this.showarrange = true;
            this.clickTop = event.layerY;
            this.clickLeft = event.layerX;
            this.pushDataBody = item;
            this.spliceIndex = index;
        },
        pushData() {
            let roomNum = [];
            var dataR = false;
            var dataNum = 0;
            console.log(this.pushDataBody)
            this.pushDataBody.operatingRoomNo = this.hasChooseRoom.name;
            this.pushDataBody.anesthesiaDoctorName = this.hasChooseRoom.docoptions;
            for (var a = 0; a < this.scheduleListRight.length; a++) {
                if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name) {
                    dataR = true;
                    roomNum.push(this.scheduleListRight[a].sequence)
                }
            }
            if (dataR == true) {
                this.pushDataBody.sequence = Math.max.apply(Math, roomNum) + 1
            } else {
                this.pushDataBody.sequence = dataNum + 1
            }
            console.log(this.pushDataBody.sequence)
            this.scheduleList.splice(this.spliceIndex, 1);
            this.scheduleListRight.push(this.pushDataBody)
            this.newUpdata.push(this.pushDataBody)
            console.log(this.newUpdata)
        },
        goBackFun(cell, index) {
            console.log(cell)
            console.log(index)
            this.scheduleListRight.splice(index, 1);
            this.scheduleList.push(cell);
        }
    },
    mounted() {
        this.getSupplyNurseList();
        this.area = window;
        let totalWidth = this.plusAll();
        console.log(totalWidth);
        this.$set(this.$data, 'totalWidth', totalWidth)
        this.hasChooseRoom = this.roomId[0];
        console.log(this.hasChooseRoom)
    },
    components: {
        Datepicker: Datepicker,
        "data-table": dataTable,
        "data-table-column": dataTableColumn
    }
}
</script>
<style scoped>
.dataOfDoc {
    padding-left: 5px;
}

.dataOfDoc span {
    padding: 0 5px;
}

.flex {
    height: 25px;
    line-height: 25px;
}

.flex:last-child {
    height: auto !important;
}

.flex textarea {
    resize: none;
    width: 280px;
    height: 40px;
}

.state2 {
    /* background: #0080FF; */
    color: #0080FF;
}

.state3 {
    /* background: #FF6666; */
    color: #FF6666;
}

.tableBox {
    width: 100%;
    /*overflow-x: auto;*/
    /* height: 550px; */
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
    /* height: 20px; */
    width: 100%;
    text-align: right;
    padding: 10px 10px 15px 0;
    box-sizing: border-box;
}

.modalHead {
    width: 100%;
    height: 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
}

.font_active {
    width: 35px;
    height: 100%;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: rgb(153, 153, 153);
    font-family: microsoft YaHei;
}

.font_active:hover {
    animation: colorChange 0.5s infinite;
    animation-iteration-count: 1;
    color: #fff;
    background-color: rgb(232, 17, 35);
}

.font_active:active {
    background-color: rgb(241, 112, 112);
    color: #fff;
}

.modalBody {
    display: flex;
    flex-wrap: wrap;
    height: auto;
}

.label {
    width: 80px;
    text-align: right;
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
    background-color: #D8EAF9;
    cursor: pointer;
}

.docList {
    background-color: #ECECEC;
    border: 1px dashed #999;
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 5px;
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
    width: 500px;
    height: auto;
    background: #fff;
    background: rgb(240, 240, 240);
    border: 1px solid rgb(24, 131, 215);
    cursor: auto;
    box-shadow: 1px 1px 20px #AAA;
}


.tableOut {
    width: 100%;
    height: 677px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 5px;
}

.timechose {
    width: 20%;
    min-width: 322px;
    border: 1px solid #999;
    box-sizing: border-box;
    margin-right: 10px;
    background-color: #A3BDD9;
    padding-top: 5px;
}

.itemChoose {
    width: 100%;
    color: white;
    background: #597CA6;
    box-sizing: border-box;
    padding: 2px 0 2px 5px;
}

.itemChooseContent {
    width: 100%;
    height: 330px;
    background-color: #fff;
    overflow: auto;
}

.itemChooseBox {
    width: 100%;
    height: 240px;
    background-color: #597CA6;
}

.itemBox {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #0D508B;
    color: #fff;
    line-height: 40px;
    padding-left: 5px;
}

.itemBox:hover {
    background-color: #8383A6;
    cursor: pointer;
}

.itemBox:last-child {
    border-bottom: 1px solid #0D508B;
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
    background-color: rgba(0, 0, 0, 0);
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

.timeLine {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 5px;
}

.BoxOf {
    width: auto;
    height: 113px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    display: flex;
}

.operationRoom {
    min-width: 60px;
    height: 100%;
    background-color: #fff;
    text-align: center;
    line-height: 113px;
    cursor: pointer;
}

.backgroundColor {
    background: url('../../assets/bottomBack2.jpg') no-repeat;
    background-size: cover;
}

.roomData {
    /* border: 1px solid #95DDB6; */
    border: 1px solid #F5AF93;
    font-size: 12px;
    margin: 5px 10px;
    min-width: 250px;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 5px;
}

.goBack {
    width: 20px;
    height: 20px;
    background-color: #95DDB6;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
    text-align: center;
    cursor: pointer;
}
</style>