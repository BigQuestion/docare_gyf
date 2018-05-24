<template>
    <div>
        <div class="dataOfButton">
            <span></span>
            <span style="font-weight: bold;">手术人员安排表</span>
            <button @click="submit">手术提交</button>
        </div>
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
                <div class="itemChooseContent" ref="normal" @click="noneDulClick()">
                    <div v-if="chooseOneType=='list'">
                        <div class="flex head" :style="{width:totalWidth+'px'}">
                            <div v-for="(item,index) in tableConfig" class="cell resizeAble" :style="{width:item.width+'px'}" style="text-align: center;position: relative;border: 1px solid #E6E6E6;display: inline-block;box-sizing: border-box;">
                                <div style="width:100%;overflow-x: hidden;white-space: nowrap">{{item.text}}</div>
                                <div class="resizeIcon" :style="{left:item.width-2}" @mousedown="resizeStart($event,index,item)"></div>
                            </div>
                        </div>
                        <div style="position:relative;">
                            <div v-for="(item,index) in scheduleList" :style="{width:totalWidth+'px'}" class="flex rows" @contextmenu.prevent="arrange($event,item,index)" :class="{state2:item.state==2,state3:item.state==3}">
                                <div v-for="cell in tableConfig" class="cell" :style="{width:cell.width+'px'}" style="box-sizing: border-box; ">
                                    {{item[cell.value]}}
                                </div>
                            </div>
                            <div @click="pushData()" v-if="showarrange" class="pushAuto" :style="{top:clickTop+'px',left:clickLeft+'px'}">
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
            <div style="width: 80%;overflow:auto;background-color:#E7EBEC;position:relative">
                <div style="position:absolute;left:0;top:55px;z-index:999;">
                    <div v-for="(item,index) in roomId" class="operationRoom" @click="chooseClassFun(item,index)" :class="{backgroundColor:item.chooseClass}">
                        {{item.name}}
                    </div>
                </div>
                <!-- <div style="width:auto;height:auto;"> -->
                <div class="timeLine"></div>
                <div style="padding-left: 60px;">
                    <div class="BoxOf" v-for="(item,index) in roomId">
                        <div style="width:auto;height:100%;display:flex;">
                            <div v-if="cell.operatingRoomNo == item.name" v-for="(cell,index) in scheduleListRight">
                                <div @click="showShadow(cell)" @dblclick="edit(cell)" v-if="cell.state == 2||cell.state == 3||cell.state == 4" class="roomData" :class="{boxshadow:cell.clickShadowData}">
                                    <div style="color:#5298EE;border-bottom:1px solid #E9E9ED;padding:2px 0;">
                                        <span style="padding-right:10px;">{{cell.scheduledDateTime}}</span>
                                        <span>{{cell.patientName}}</span>
                                    </div>
                                    <div style="color:#222;padding:2px 0;">
                                        <span style="padding-right:10px;">{{cell.patientName}}</span>
                                        <span style="padding-right:10px;">{{cell.patientId}}</span>
                                        <span style="padding-right:10px;">{{cell.patientSex}}</span>
                                        <span>{{cell.patienAge}}岁</span>
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
                                <div v-else @click="showShadow(cell)" @dblclick="edit(cell)" style="border:1px solid #95DDB6;position:relative;" class="roomData" :class="{boxshadow:cell.clickShadowData}">
                                    <div @click="goBackFun(cell,index)" class="goBack">X</div>
                                    <div @click="goTaoLeft(cell,index)" class="leftLost" title="台次向前排列">←</div>
                                    <div @click="goTaoRight(cell,index)" class="rightAdd" title="台次向后排列">→</div>
                                    <div style="color:#5298EE;border-bottom:1px solid #E9E9ED;padding:2px 0;">
                                        <span style="padding-right:10px;">{{cell.scheduledDateTime}}</span>
                                        <span>{{cell.patientName}}</span>
                                    </div>
                                    <div style="color:#222;padding:2px 0;">
                                        <span style="padding-right:10px;">{{cell.patientName}}</span>
                                        <span style="padding-right:10px;">{{cell.patientId}}</span>
                                        <span style="padding-right:10px;">{{cell.patientSex}}</span>
                                        <span>{{cell.patienAge}}岁</span>
                                    </div>
                                    <div style="color:#222;padding:2px 0;font-weight:bold;">
                                        {{cell.operationSchName}}
                                    </div>
                                    <div style="color:#222;padding:2px 0;width:100%;">
                                        <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">{{cell.anesthesiaDoctorName}}</span>
                                        <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">{{cell.firstAnesthesiaAssistantName}}</span>
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
                <!-- </div> -->
            </div>
        </div>
        <div class="mask pCenter" v-if="mask">
            <div class="infoModal">
                <div class="modalHead">
                    <span>集合编辑器</span>
                    <div @click="modalCancel" class="font_active">X</div>
                </div>
                <div class="modalBody">
                    <div v-for="(item,index) in tableConfig" class="flex">
                        <div class="label">{{item.text}}：</div>
                        <textarea style="outline:none;" v-if="item.text == '备注'" readonly name="" id="" v-model="handleItem[item.value]"></textarea>
                        <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&item.value == 'anesthesiaDoctorName'" style="width:134px;" v-model="handleItem[item.value]">
                            <option v-for="all in options" v-bind:value="all.userName">{{all.userName}}</option>
                        </select>
                        <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&(item.value == 'firstAnesthesiaAssistantName'||item.value == 'secondAnesthesiaAssistantName')" style="width:134px;" v-model="handleItem[item.value]">
                            <option v-for="all in MzkUsers" v-bind:value="all.userName">{{all.userName}}</option>
                        </select>
                        <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&(item.value == 'firstAssistantName'||item.value == 'secondAssistantName')" style="width:134px;" v-model="handleItem[item.value]">
                            <option v-for="all in assistant" v-bind:value="all.userName">{{all.userName}}</option>
                        </select>
                        <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&(item.value == 'firstOperationNurseName'||item.value == 'secondOperationNurseName')" style="width:134px;" v-model="handleItem[item.value]">
                            <option v-for="all in wash" v-bind:value="all.userName">{{all.userName}}</option>
                        </select>
                        <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&(item.value == 'firstSupplyNurseName'||item.value == 'secondSupplyNurseName')" style="width:134px;" v-model="handleItem[item.value]">
                            <option v-for="all in tour" v-bind:value="all.userName">{{all.userName}}</option>
                        </select>
                        <input v-else style="width:130px;outline:none;" readonly type="" name="" v-model="handleItem[item.value]">
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
            dataPpppp: {},
            tableConfig: [{
                text: "手术审核时间",
                type: "inSelect",
                value: "reqDateTime",
                width: 120,
                optin: false,
            }, {
                text: '申请时间',
                value: 'scheduledDateTime',
                width: 60,
                optin: false,
            }, {
                text: '科室名称',
                value: 'deptName',
                width: 60,
                optin: false,
            }, {
                text: '床号',
                value: 'bedNo',
                width: 60,
                optin: false,
            }, {
                text: '台次',
                value: 'sequence',
                width: 60,
                optin: false,
            }, {
                text: '病人姓名',
                value: 'patientName',
                width: 100,
                optin: false,
            }, {
                text: '年龄',
                value: 'patienAge',
                width: 60,
            }, {
                text: '性别',
                value: 'patientSex',
                width: 60,
                optin: false,
            }, {
                text: '诊断',
                value: 'diagBeforeOperation',
                width: 200,
                optin: false,
            }, {
                text: '手术名称',
                value: 'operationSchName',
                width: 250,
                optin: false,
            }, {
                text: '手术医师',
                value: 'surgeonName',
                width: 100,
                optin: false,
            }, {
                text: '主麻医师',
                value: 'anesthesiaDoctorName',
                width: 100,
                optin: false,
            }, {
                text: '副麻医师1',
                value: 'firstAnesthesiaAssistantName',
                width: 100,
                optin: false,
            }, {
                text: '副麻医师2',
                value: 'secondAnesthesiaAssistantName',
                width: 100,
                optin: false,
            }, {
                text: '手术助手1',
                value: 'firstAssistantName',
                width: 100,
                optin: false,
            }, {
                text: '手术助手2',
                value: 'secondAssistantName',
                width: 100,
                optin: false,
            }, {
                text: '洗手护士1',
                value: 'firstOperationNurseName',
                width: 100,
                optin: false,
            }, {
                text: '洗手护士2',
                value: 'secondOperationNurseName',
                width: 100,
                optin: false,
            }, {
                text: '巡回护士1',
                value: 'firstSupplyNurseName',
                width: 100,
                optin: false,
            }, {
                text: '巡回护士2',
                value: 'secondSupplyNurseName',
                width: 100,
                optin: false,
            }, {
                text: '麻醉方法',
                value: 'anesthesiaMethod',
                width: 200,
                optin: false,
            }, {
                text: '备注',
                value: 'notesOnOperation',
                width: 100,
                optin: false,
            }],
            getLength: '0',
            listChooseBody: [
                { data: '手术', dataLength: 0, type: 'list' },
                { data: '主麻医生', type: 'docoptions' },
                { data: '副麻医生', type: 'docmzkUsers' },
                { data: '麻醉助手', type: 'assistant' },
                { data: '洗手护士', type: 'docwash' },
                { data: '巡回护士', type: 'doctour' },
            ],
            roomId: [{
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
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
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsers2Id: '',
                assistantId: '',
                assistant2Id: '',
                docwashId: '',
                docwash2Id: '',
                doctourId: '',
                doctour2Id: '',
            },
            ],
            hasChooseRoom: {},
            hasChooseIndex: 0,
            chooseData: '手术(0)',
            chooseOneType: 'list',
            dateValue: '',
            scheduleList: [],
            scheduleListRight: [],
            scheduleListRight2: [],
            MaxLeftNum: '',
            MaxRightNum: '',
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
            onchangeData: {
                anesthesiaDoctorName: '',
                firstAnesthesiaAssistantName: '',
                secondAnesthesiaAssistantName: '',
                firstOperationNurseName: '',
                secondOperationNurseName: '',
                firstSupplyNurseName: '',
                secondtSupplyNurseName: '',
            }
        }
    },
    methods: {
        nameDataType(item) {
            console.log(item)
        },
        submit() {
            let params = [];
            let dataInName;

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

                        dataInName = false;
                        this.getList(this.dateValue)
                        this.newUpdata = [];

                    })
                alert('提交成功!')

            } else {
                alert('必要的选项不能为空！')
            }

        },
        getNewPushData(item, index) {
            console.log(item)
            console.log(index)
            console.log(this.handleItem[item.value])
            console.log(this.tableConfig[index])
            if (this.tableConfig[index].value == 'anesthesiaDoctorName') {
                console.log(this.options)
                for (var a = 0; a < this.options.length; a++) {
                    if (this.options[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.anesthesiaDoctorName = this.options[a].userId;
                    }
                }
            } else if (this.tableConfig[index].value == 'firstAnesthesiaAssistantName') {
                console.log(this.MzkUsers)
                for (var a = 0; a < this.MzkUsers.length; a++) {
                    if (this.MzkUsers[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.firstAnesthesiaAssistantName = this.MzkUsers[a].userId;
                    }
                }
            } else if (this.tableConfig[index].value == 'secondAnesthesiaAssistantName') {
                console.log(this.MzkUsers)
                for (var a = 0; a < this.MzkUsers.length; a++) {
                    if (this.MzkUsers[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.secondAnesthesiaAssistantName = this.MzkUsers[a].userId;
                    }
                }
            } else if (this.tableConfig[index].value == 'firstAssistantName') {
                console.log(this.assistant)
                for (var a = 0; a < this.assistant.length; a++) {
                    if (this.assistant[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.firstAssistantName = this.assistant[a].userId;
                    }
                }
            } else if (this.tableConfig[index].value == 'secondAssistantName') {
                console.log(this.assistant)
                for (var a = 0; a < this.assistant.length; a++) {
                    if (this.assistant[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.secondAssistantName = this.assistant[a].userId;
                    }
                }
            } else if (this.tableConfig[index].value == 'firstOperationNurseName') {
                console.log(this.wash)
                for (var a = 0; a < this.wash.length; a++) {
                    if (this.wash[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.firstOperationNurseName = this.wash[a].userId;
                    }
                }
            } else if (this.tableConfig[index].value == 'secondOperationNurseName') {
                console.log(this.wash)
                for (var a = 0; a < this.wash.length; a++) {
                    if (this.wash[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.secondOperationNurseName = this.wash[a].userId;
                    }
                }
            } else if (this.tableConfig[index].value == 'firstSupplyNurseName') {
                console.log(this.tour)
                for (var a = 0; a < this.tour.length; a++) {
                    if (this.tour[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.firstSupplyNurseName = this.tour[a].userId;
                    }
                }
            } else if (this.tableConfig[index].value == 'secondSupplyNurseName') {
                console.log(this.tour)
                for (var a = 0; a < this.tour.length; a++) {
                    if (this.tour[a].userName == this.handleItem[item.value]) {
                        this.onchangeData.secondSupplyNurseName = this.tour[a].userId;
                    }
                }
            }
        },
        modalSure() {
            console.log(this.handleItem)
            for (var b = 0; b < this.newUpdata.length; b++) {
                if (this.handleItem.visitId == this.newUpdata[b].visitId && this.handleItem.patientId == this.newUpdata[b].patientId && this.handleItem.scheduleId == this.newUpdata[b].scheduleId) {
                    console.log(this.newUpdata[b])
                    this.newUpdata[b].anesthesiaDoctorName = this.onchangeData.anesthesiaDoctorName;
                    this.newUpdata[b].firstAnesthesiaAssistantName = this.onchangeData.firstAnesthesiaAssistantName;
                    this.newUpdata[b].secondAnesthesiaAssistantName = this.onchangeData.secondAnesthesiaAssistantName;
                    this.newUpdata[b].firstOperationNurseName = this.onchangeData.firstOperationNurseName;
                    this.newUpdata[b].secondOperationNurseName = this.onchangeData.secondOperationNurseName;
                    this.newUpdata[b].firstSupplyNurseName = this.onchangeData.firstSupplyNurseName;
                    this.newUpdata[b].secondtSupplyNurseName = this.onchangeData.secondtSupplyNurseName;
                }
            }
            // let params = this.handleItem

            console.log(this.newUpdata)
            this.mask = false;

        },
        modalCancel() {
            console.log(this.handleItemTow)
            this.handleItem = this.handleItemTow;
            for (var a = 0; a < this.scheduleListRight.length; a++) {
                if (this.scheduleListRight[a].visitId == this.handleItem.visitId && this.scheduleListRight[a].patientId == this.handleItem.patientId && this.scheduleListRight[a].scheduleId == this.handleItem.scheduleId) {
                    this.scheduleListRight[a] = this.handleItemTow;
                }
            }
            this.mask = false;
        },
        edit(item) {
            this.handleItem = item;
            this.handleItemTow = JSON.parse(JSON.stringify(item));
            console.log(this.tableConfig)
            if (item.state == 0 || item.state == 1) {
                for (var a = 0; a < this.tableConfig.length; a++) {
                    if (this.tableConfig[a].value == 'anesthesiaDoctorName') {
                        console.log('主治医生')
                        this.tableConfig[a].optin = true;
                    } else if (this.tableConfig[a].value == 'firstAnesthesiaAssistantName') {
                        console.log('副麻医生1')
                        this.tableConfig[a].optin = true;
                    } else if (this.tableConfig[a].value == 'secondAnesthesiaAssistantName') {
                        console.log('副麻医生2')
                        this.tableConfig[a].optin = true;
                    } else if (this.tableConfig[a].value == 'firstAssistantName') {
                        console.log('手术助手1')
                        this.tableConfig[a].optin = true;
                    } else if (this.tableConfig[a].value == 'secondAssistantName') {
                        console.log('手术助手2')
                        this.tableConfig[a].optin = true;
                    } else if (this.tableConfig[a].value == 'firstOperationNurseName') {
                        console.log('洗手护士1')
                        this.tableConfig[a].optin = true;
                    } else if (this.tableConfig[a].value == 'secondOperationNurseName') {
                        console.log('洗手护士2')
                        this.tableConfig[a].optin = true;
                    } else if (this.tableConfig[a].value == 'firstSupplyNurseName') {
                        console.log('主治医生')
                        this.tableConfig[a].optin = true;
                    } else if (this.tableConfig[a].value == 'secondSupplyNurseName') {
                        console.log('主治医生')
                        this.tableConfig[a].optin = true;
                    }

                }
            } else {
                for (var b = 0; b < this.tableConfig.length; b++) {
                    this.tableConfig[b].optin = false;
                }
            }

            console.log(this.handleItem)
            this.mask = true;
        },
        showShadow(cell) {
            console.log(cell)
            for (var a = 0; a < this.scheduleListRight.length; a++) {
                this.scheduleListRight[a].clickShadowData = false;
            }
            cell.clickShadowData = true;
        },
        test(event) {
            console.log(event.srcElement.value)
            this.dateValue = event.srcElement.value;
        },
        dateChange() {
            this.getList(this.dateValue)
        },
        chooseOne(item) {
            console.log(item)
            this.chooseOneType = item.type;
            console.log(this.chooseOneType);
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
                this.roomId[this.hasChooseIndex].docoptionsId = item.userId;
                this.hasChooseRoom.docoptionsId = item.userId;
                this.roomId[this.hasChooseIndex].docoptions = item.userName;
                this.hasChooseRoom.docoptions = item.userName;
                this.pushDataBody.anesthesiaDoctorName = item.userName;
                for (var a = 0; a < this.newUpdata.length; a++) {
                    this.newUpdata[a].anesthesiaDoctorName = item.userId;
                }
                for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
                    if ((this.scheduleListRight[aa].state == 0 || this.scheduleListRight[aa].state == 1) && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
                        this.scheduleListRight[aa].anesthesiaDoctorName = item.userName;
                    }
                }
            } else if (type == 'docmzkUsers') {
                if (this.roomId[this.hasChooseIndex].docmzkUsers == '') {
                    this.roomId[this.hasChooseIndex].docmzkUsersId = item.userId;
                    this.hasChooseRoom.docmzkUsersId = item.userId;
                    this.roomId[this.hasChooseIndex].docmzkUsers = item.userName;
                    this.hasChooseRoom.docmzkUsers = item.userName;
                    this.pushDataBody.firstAnesthesiaAssistantName = item.userName;
                    for (var b = 0; b < this.newUpdata.length; b++) {
                        this.newUpdata[b].firstAnesthesiaAssistantName = item.userId;
                    }
                    for (var bb = 0; bb < this.scheduleListRight.length; bb++) {
                        if ((this.scheduleListRight[bb].state == 0 || this.scheduleListRight[bb].state == 1) && this.scheduleListRight[bb].operatingRoomNo == this.hasChooseRoom.name) {
                            this.scheduleListRight[bb].firstAnesthesiaAssistantName = item.userName;
                        }
                    }
                } else {
                    this.roomId[this.hasChooseIndex].docmzkUsers2Id = item.userId;
                    this.hasChooseRoom.docmzkUsers2Id = item.userId;
                    this.roomId[this.hasChooseIndex].docmzkUsers2 = item.userName;
                    this.hasChooseRoom.docmzkUsers2 = item.userName;
                    this.pushDataBody.secondAnesthesiaAssistantName = item.userName;
                    for (var b = 0; b < this.newUpdata.length; b++) {
                        this.newUpdata[b].secondAnesthesiaAssistantName = item.userId;
                    }
                    for (var bb = 0; bb < this.scheduleListRight.length; bb++) {
                        if ((this.scheduleListRight[bb].state == 0 || this.scheduleListRight[bb].state == 1) && this.scheduleListRight[bb].operatingRoomNo == this.hasChooseRoom.name) {
                            this.scheduleListRight[bb].secondAnesthesiaAssistantName = item.userName;
                        }
                    }
                }
            } else if (type == 'assistant') {
                if (this.roomId[this.hasChooseIndex].assistant == '') {
                    this.roomId[this.hasChooseIndex].assistantId = item.userId;
                    this.hasChooseRoom.assistantId = item.userId;
                    this.roomId[this.hasChooseIndex].assistant = item.userName;
                    this.hasChooseRoom.assistant = item.userName;
                    this.pushDataBody.firstAssistantName = item.userName;
                    for (var c = 0; c < this.newUpdata.length; c++) {
                        this.newUpdata[c].firstAssistantName = item.userId;
                    }
                    for (var cc = 0; cc < this.scheduleListRight.length; cc++) {
                        if ((this.scheduleListRight[cc].state == 0 || this.scheduleListRight[cc].state == 1) && this.scheduleListRight[cc].operatingRoomNo == this.hasChooseRoom.name) {
                            this.scheduleListRight[cc].firstAssistantName = item.userName;
                        }
                    }
                } else {
                    this.roomId[this.hasChooseIndex].assistant2Id = item.userId;
                    this.hasChooseRoom.assistant2Id = item.userId;
                    this.roomId[this.hasChooseIndex].assistant2 = item.userName;
                    this.hasChooseRoom.assistant2 = item.userName;
                    this.pushDataBody.secondAssistantName = item.userName;
                    for (var c = 0; c < this.newUpdata.length; c++) {
                        this.newUpdata[c].secondAssistantName = item.userId;
                    }
                    for (var cc = 0; cc < this.scheduleListRight.length; cc++) {
                        if ((this.scheduleListRight[cc].state == 0 || this.scheduleListRight[cc].state == 1) && this.scheduleListRight[cc].operatingRoomNo == this.hasChooseRoom.name) {
                            this.scheduleListRight[cc].secondAssistantName = item.userName;
                        }
                    }
                }
            } else if (type == 'docwash') {
                if (this.roomId[this.hasChooseIndex].docwash == '') {
                    this.roomId[this.hasChooseIndex].docwashId = item.userId;
                    this.hasChooseRoom.docwashId = item.userId;
                    this.roomId[this.hasChooseIndex].docwash = item.userName;
                    this.hasChooseRoom.docwash = item.userName;
                    this.pushDataBody.firstOperationNurseName = item.userName;
                    for (var d = 0; d < this.newUpdata.length; d++) {
                        this.newUpdata[d].firstOperationNurseName = item.userId;
                    }
                    for (var dd = 0; dd < this.scheduleListRight.length; dd++) {
                        if ((this.scheduleListRight[dd].state == 0 || this.scheduleListRight[dd].state == 1) && this.scheduleListRight[dd].operatingRoomNo == this.hasChooseRoom.name) {
                            this.scheduleListRight[dd].firstOperationNurseName = item.userName;
                        }
                    }
                } else {
                    this.roomId[this.hasChooseIndex].docwash2Id = item.userId;
                    this.hasChooseRoom.docwash2Id = item.userId;
                    this.roomId[this.hasChooseIndex].docwash2 = item.userName;
                    this.hasChooseRoom.docwash2 = item.userName;
                    this.pushDataBody.secondOperationNurseName = item.userName;
                    for (var d = 0; d < this.newUpdata.length; d++) {
                        this.newUpdata[d].secondOperationNurseName = item.userId;
                    }
                    for (var dd = 0; dd < this.scheduleListRight.length; dd++) {
                        if ((this.scheduleListRight[dd].state == 0 || this.scheduleListRight[dd].state == 1) && this.scheduleListRight[dd].operatingRoomNo == this.hasChooseRoom.name) {
                            this.scheduleListRight[dd].secondOperationNurseName = item.userName;
                        }
                    }
                }

            } else if (type == 'doctour') {
                if (this.roomId[this.hasChooseIndex].doctour == '') {
                    this.roomId[this.hasChooseIndex].doctourId = item.userId;
                    this.hasChooseRoom.doctourId = item.userId;
                    this.roomId[this.hasChooseIndex].doctour = item.userName;
                    this.hasChooseRoom.doctour = item.userName;
                    this.pushDataBody.firstOperationNurseName = item.userName;
                    for (var e = 0; e < this.newUpdata.length; e++) {
                        this.newUpdata[e].firstSupplyNurseName = item.userId;
                    }
                    for (var ee = 0; ee < this.scheduleListRight.length; ee++) {
                        if ((this.scheduleListRight[ee].state == 0 || this.scheduleListRight[ee].state == 1) && this.scheduleListRight[ee].operatingRoomNo == this.hasChooseRoom.name) {
                            this.scheduleListRight[ee].firstSupplyNurseName = item.userName;
                        }
                    }
                } else {
                    this.roomId[this.hasChooseIndex].doctour2Id = item.userId;
                    this.hasChooseRoom.doctour2Id = item.userId;
                    this.roomId[this.hasChooseIndex].doctour2 = item.userName;
                    this.hasChooseRoom.doctour2 = item.userName;
                    this.pushDataBody.secondOperationNurseName = item.userName;
                    for (var e = 0; e < this.newUpdata.length; e++) {
                        this.newUpdata[e].secondSupplyNurseName = item.userId;
                    }
                    for (var ee = 0; ee < this.scheduleListRight.length; ee++) {
                        if ((this.scheduleListRight[ee].state == 0 || this.scheduleListRight[ee].state == 1) && this.scheduleListRight[ee].operatingRoomNo == this.hasChooseRoom.name) {
                            this.scheduleListRight[ee].secondSupplyNurseName = item.userName;
                        }
                    }
                }

            }
            console.log(this.hasChooseRoom)
            console.log(this.newUpdata)
        },
        getList(date) {
            this.newUpdata = [];
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
                    for (var j = 0; j < res.list.length; j++) {
                        if (res.list[j].state == 0 || res.list[j].state == 1) {
                            this.$set(res.list[j], 'clickShadowData', false)
                            this.scheduleList.push(res.list[j])
                        }
                    }
                    console.log(this.scheduleList.length)
                    this.listChooseBody[0].dataLength = this.scheduleList.length;
                    this.chooseData = '手术(' + this.scheduleList.length + ')';
                    for (var a = 0; a < res.list.length; a++) {
                        if (res.list[a].state == 2 || res.list[a].state == 3 || res.list[a].state == 4) {
                            this.$set(res.list[a], 'clickShadowData', false)
                            this.scheduleListRight.push(res.list[a])
                            this.scheduleListRight2.push(res.list[a])
                        }
                    }
                });
        },
        getSupplyNurseList() {
            this.getList(this.dateValue);
            this.api.selectUserListByType({ userType: '主麻医师' })
                .then(res => {
                    this.options = res;
                    console.log(this.options)
                })
            this.api.selectUserListByType({ userType: '副麻医师' })
                .then(res => {
                    this.MzkUsers = res;
                })
            this.api.selectUserListByType({ userType: '麻醉助手' })
                .then(res => {
                    this.assistant = res;
                })
            this.api.selectUserListByType({ userType: '洗手护士' })
                .then(res => {
                    this.wash = res;
                })
            this.api.selectUserListByType({ userType: '巡回护士' })
                .then(res => {
                    this.tour = res;
                })
        },
        resizeStart(e, index, col) {
            if (index == this.tableConfig.length - 1) {
                return;
            }
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
            console.log(index)
            console.log(this.$refs.normal.scrollLeft)
            this.showarrange = true;
            this.clickTop = event.y - 260;
            this.clickLeft = event.x + this.$refs.normal.scrollLeft;
            this.pushDataBody = item;
            this.spliceIndex = index;
        },
        pushData() {
            let roomNum = [];
            var dataR = false;
            var dataNum = 0;
            console.log(this.pushDataBody)
            console.log(this.hasChooseRoom)
            // 手术间赋值
            this.pushDataBody.operatingRoomNo = this.hasChooseRoom.name;
            // 主麻医生赋值
            this.pushDataBody.anesthesiaDoctorName = this.hasChooseRoom.docoptions;
            // 副麻医生1赋值
            this.pushDataBody.firstAnesthesiaAssistantName = this.hasChooseRoom.docmzkUsers;
            // 副麻医生2赋值
            this.pushDataBody.secondAnesthesiaAssistantName = this.hasChooseRoom.docmzkUsers2;
            // 麻醉助手1赋值
            this.pushDataBody.firstAssistantName = this.hasChooseRoom.assistant;
            // 麻醉助手2赋值
            this.pushDataBody.secondAssistantName = this.hasChooseRoom.assistant2;
            // 洗手护士1赋值
            this.pushDataBody.firstOperationNurseName = this.hasChooseRoom.docwash;
            // 洗手护士2赋值
            this.pushDataBody.secondOperationNurseName = this.hasChooseRoom.docwash2;
            // 巡回护士1赋值
            this.pushDataBody.firstOperationNurseName = this.hasChooseRoom.doctour;
            // 巡回护士2赋值
            this.pushDataBody.secondOperationNurseName = this.hasChooseRoom.doctour2;
            // 自动添加台次
            for (var a = 0; a < this.scheduleListRight.length; a++) {
                if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name) {
                    dataR = true;
                    roomNum.push(this.scheduleListRight[a].sequence)
                }
            }
            for (var b = 0; b < this.scheduleListRight2.length; b++) {
                if (this.scheduleListRight2[b].operatingRoomNo == this.hasChooseRoom.name) {
                    dataR = true;
                    this.MaxLeftNum = this.scheduleListRight2[b].sequence
                }
            }
            console.log(this.MaxLeftNum)
            this.MaxRightNum = Math.max.apply(Math, roomNum) + 1;
            if (dataR == true) {
                this.pushDataBody.sequence = Math.max.apply(Math, roomNum) + 1
            } else {
                this.pushDataBody.sequence = dataNum + 1
            }
            let subMitData = {
                // 手术间赋值
                operatingRoomNo: this.hasChooseRoom.name,
                // 主麻医生赋值
                anesthesiaDoctorName: this.hasChooseRoom.docoptionsId,
                // 副麻医生1赋值
                firstAnesthesiaAssistantName: this.hasChooseRoom.docmzkUsersId,
                // 副麻医生2赋值
                secondAnesthesiaAssistantName: this.hasChooseRoom.docmzkUsers2Id,
                // 麻醉助手1赋值
                firstAssistantName: this.hasChooseRoom.assistantId,
                // 麻醉助手2赋值
                secondAssistantName: this.hasChooseRoom.assistant2Id,
                // 洗手护士1赋值
                firstOperationNurseName: this.hasChooseRoom.docwashId,
                // 洗手护士2赋值
                secondOperationNurseName: this.hasChooseRoom.docwash2Id,
                // 巡回护士1赋值
                firstOperationNurseName: this.hasChooseRoom.doctourId,
                // 巡回护士2赋值
                secondOperationNurseName: this.hasChooseRoom.doctour2Id,
                // 手术台次
                sequence: this.pushDataBody.sequence,
                patientId: this.pushDataBody.patientId,
                scheduleId: this.pushDataBody.scheduleId,
                visitId: this.pushDataBody.visitId,
            }
            this.scheduleList.splice(this.spliceIndex, 1);
            this.scheduleListRight.push(this.pushDataBody)
            this.newUpdata.push(subMitData)
            console.log(this.newUpdata)
            this.chooseData = '手术(' + this.scheduleList.length + ')';
            this.listChooseBody[0].dataLength = this.scheduleList.length;
        },
        goBackFun(cell, index) {
            console.log(cell)
            for (var a = 0; a < this.newUpdata.length; a++) {
                if (cell.visitId == this.newUpdata[a].visitId && cell.patientId == this.newUpdata[a].patientId && cell.scheduleId == this.newUpdata[a].scheduleId) {
                    this.newUpdata.splice(a, 1);
                }
            }
            for (var b = index; b < this.scheduleListRight.length; b++) {
                if (cell.operatingRoomNo == this.scheduleListRight[b].operatingRoomNo && cell.sequence < this.scheduleListRight[b].sequence) {
                    this.scheduleListRight[b].sequence = this.scheduleListRight[b].sequence - 1;
                    console.log(this.scheduleListRight)
                }
            }
            for (var c = 0; c < this.newUpdata.length; c++) {
                if (cell.operatingRoomNo == this.newUpdata[c].operatingRoomNo && cell.sequence < this.newUpdata[c].sequence) {
                    this.newUpdata[c].sequence = this.newUpdata[c].sequence - 1;
                }
            }
            this.scheduleListRight.splice(index, 1);
            this.scheduleList.push(cell);
            this.chooseData = '手术(' + this.scheduleList.length + ')';
            this.listChooseBody[0].dataLength = this.scheduleList.length;
        },
        goTaoLeft(cell, index) {
            // console.log(cell.sequence)
            // console.log(this.newUpdata)
            // console.log(this.MaxLeftNum)
            if ((cell.sequence == this.MaxLeftNum + 1) || this.MaxLeftNum == '') {
                alert('已经是第一台手术了。')
            } else {
                for (var a = 0; a < this.newUpdata.length; a++) {
                    if (cell.visitId == this.newUpdata[a].visitId && cell.patientId == this.newUpdata[a].patientId && cell.scheduleId == this.newUpdata[a].scheduleId) {
                        this.newUpdata[a].sequence = this.newUpdata[a].sequence - 1;
                        this.newUpdata[a - 1].sequence = this.newUpdata[a - 1].sequence + 1;
                        this.newUpdata.sort(this.sortNumber);
                    }
                }
                for (var b = 0; b < this.scheduleListRight.length; b++) {
                    if (cell.visitId == this.scheduleListRight[b].visitId && cell.patientId == this.scheduleListRight[b].patientId && cell.scheduleId == this.scheduleListRight[b].scheduleId) {

                        for (var c = 0; c < this.scheduleListRight.length; c++) {
                            if (cell.operatingRoomNo == this.scheduleListRight[c].operatingRoomNo && cell.sequence == this.scheduleListRight[c].sequence + 1) {
                                // console.log(this.scheduleListRight[c])
                                this.scheduleListRight[b].sequence = this.scheduleListRight[b].sequence - 1;
                                this.scheduleListRight[c].sequence = this.scheduleListRight[c].sequence + 1;
                            }
                        }
                        this.scheduleListRight.sort(this.sortNumber);
                    }
                }

            }
        },

        sortNumber(a, b) {
            return a.sequence - b.sequence
        },
        goTaoRight(cell, index) {
            console.log(cell.sequence)
            console.log(this.pushDataBody)
            console.log("最后" + this.MaxRightNum)
            if (cell.sequence == this.MaxRightNum) {
                alert('已经是最后一台手术了。')
            } else {
                console.log(cell)
                console.log(this.newUpdata)
                for (var a = 0; a < this.newUpdata.length; a++) {
                    if (cell.visitId == this.newUpdata[a].visitId && cell.patientId == this.newUpdata[a].patientId && cell.scheduleId == this.newUpdata[a].scheduleId) {
                        for (var d = 0; d < this.newUpdata.length; d++) {
                            if (d == a + 1) {
                                this.newUpdata[a + 1].sequence = this.newUpdata[a + 1].sequence - 1;
                            }
                        }
                        this.newUpdata[a].sequence = this.newUpdata[a].sequence + 1;
                        this.newUpdata.sort(this.sortNumber);
                    }
                }
                for (var b = 0; b < this.scheduleListRight.length; b++) {
                    if (cell.visitId == this.scheduleListRight[b].visitId && cell.patientId == this.scheduleListRight[b].patientId && cell.scheduleId == this.scheduleListRight[b].scheduleId) {
                        for (var c = 0; c < this.scheduleListRight.length; c++) {
                            if (cell.operatingRoomNo == this.scheduleListRight[c].operatingRoomNo && cell.sequence == this.scheduleListRight[c].sequence - 1) {
                                this.scheduleListRight[b].sequence = this.scheduleListRight[b].sequence + 1;
                                this.scheduleListRight[c].sequence = this.scheduleListRight[c].sequence - 1;
                                // console.log(this.scheduleListRight[c])
                            }
                        }
                        this.scheduleListRight.sort(this.sortNumber);
                    }
                }

            }
        }
    },
    mounted() {
        this.getSupplyNurseList();
        this.area = window;
        let totalWidth = this.plusAll();
        this.$set(this.$data, 'totalWidth', totalWidth)
        this.hasChooseRoom = this.roomId[0];
        this.dateValue = new Date().Format("yyyy-MM-dd");
        this.getList(this.dateValue);
    },
    components: {
        Datepicker: Datepicker,
        "data-table": dataTable,
        "data-table-column": dataTableColumn
    }
}

</script>
<style scoped>
.dataOfButton {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px 10px 0px;
    position: fixed;
    top: 70px;
    width: 100%;
    z-index: 9999;
    background-color: #f5f5f5;
}

.dataOfDoc {
    padding-left: 5px;
    position: fixed;
    top: 114px;
    width: 100%;
    z-index: 9999;
    padding-bottom: 10px;
    background-color: #f5f5f5;
}

.dataOfDoc span {
    padding: 0 5px;
}

.flex {
    height: 25px;
    line-height: 25px;
    padding: 3px 0;
}

.flex:last-child {
    height: auto !important;
}

.flex textarea {
    resize: none;
    width: 340px;
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
    padding-top: 10px;
}

.label {
    width: 120px;
    text-align: right;
}

.cell {
    width: 60px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #B3B3B3;
}

.head .cell {
    border: 1px solid #666666;
}

.pushAuto {
    width: 100px;
    height: 25px;
    position: absolute;
    border: 1px solid #BABABA;
    box-shadow: 2px 2px 5px #888;
    background-color: #fff;
    z-index: 99;
    cursor: pointer;
    padding-left: 5px;
}

.pushAuto:hover {
    background-color: #EBEBEB;
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
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);
}

.infoModal {
    width: 550px;
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
    /* position: relative; */
}

.operationRoom {
    width: 60px;
    height: 115px;
    background-color: #fff;
    text-align: center;
    line-height: 113px;
    cursor: pointer;
    /* position: absolute; */
    /* left: 0; */
    /* top: 0; */
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
    padding: 0 24px 0 5px;
}

.boxshadow {
    box-shadow: 1px 1px 20px #AAA;
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
    font-family: microsoft YaHei;
}

.leftLost {
    width: 20px;
    height: 20px;
    background-color: #95DDB6;
    position: absolute;
    right: 0;
    top: 35px;
    z-index: 99;
    text-align: center;
    cursor: pointer;
    font-family: microsoft YaHei;
}

.rightAdd {
    width: 20px;
    height: 20px;
    background-color: #95DDB6;
    position: absolute;
    right: 0;
    top: 60px;
    z-index: 99;
    text-align: center;
    cursor: pointer;
    font-family: microsoft YaHei;
}
</style>
