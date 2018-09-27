<template>
  <div @click="cleanOutShow()" style="padding-top:145px;">
    <div class="dataOfButton">
      <span style="color:blue;">注：绿色的手术为正在进行中，红色的手术为未提交</span>
      <span style="font-weight: bold;">手术人员安排表</span>
      <button @click="submit">手术提交</button>
    </div>
    <div class="dataOfDoc">
      <span>手术间号：{{hasChooseRoom.name}}</span>
      <span>主麻医师：{{hasChooseRoom.docoptions}}</span>
      <span>副麻医师1：{{hasChooseRoom.docmzkUsers}}</span>
      <span>副麻医师2：{{hasChooseRoom.docmzkUsersTwo}}</span>
      <span>麻醉助手1：{{hasChooseRoom.assistant}}</span>
      <span>麻醉助手2：{{hasChooseRoom.assistantTwo}}</span>
      <span>洗手护士1：{{hasChooseRoom.docwash}}</span>
      <span>洗手护士2：{{hasChooseRoom.docwashTwo}}</span>
      <span>巡回护士1：{{hasChooseRoom.doctour}}</span>
      <span>巡回护士2：{{hasChooseRoom.doctourTwo}}</span>
    </div>
    <div class="tableOut">
      <div class="timechose" ref="timeChose">
        <div style="height:75px;padding-left: 5px;">
          <!-- <datepicker :value="dateValue" language="zh" @change="dateChange"></datepicker> -->
          <input type="date" name="" v-model="dateValue" @change="test($event)">
          <button @click="dateChange">查询</button>
        </div>
        <div class="itemChoose">
          {{chooseData}}
        </div>
        <div class="itemChooseContent" ref="normal">
          <div v-if="chooseOneType=='list'">
            <div class="flex head" :style="{width:totalWidth+'px'}">
              <div v-for="(item,index) in tableConfig" class="cell resizeAble" :style="{width:item.width+'px'}" style="text-align: center;position: relative;border: 1px solid #E6E6E6;display: inline-block;box-sizing: border-box;">
                <div style="width:100%;overflow-x: hidden;white-space: nowrap">{{item.text}}</div>
                <div class="resizeIcon" :style="{left:item.width-2}" @mousedown="resizeStart($event,index,item)"></div>
              </div>
            </div>
            <div @contextmenu.prevent="getTopLeft($event)" style="position:relative;">
              <div v-for="(item,index) in scheduleList" @contextmenu.prevent="listOfData(item)" :style="{width:totalWidth+'px'}" class="flex rows" @dblclick="arrange($event,item,index)" :class="{state2:item.state==2,state3:item.state==3,hoverClass:item.clickShadowData}">
                <div v-for="cell in tableConfig" class="cell" :style="{width:cell.width+'px'}" style="box-sizing: border-box; ">
                  {{item[cell.value]}}
                </div>
              </div>
              <div v-if="rightShowData" class="inseide" :style="{top:eventTop+'px',left:eventLeft+'px'}">
                <div class="insideHover" @click="maskFun()">手术通知单</div>
              </div>
              <!-- <div @click="pushData()" v-if="showarrange" class="pushAuto" :style="{top:clickTop+'px',left:clickLeft+'px'}">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                分配手术
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div> -->
            </div>
          </div>
          <div v-if="chooseOneType=='docoptions'" v-for="item in options" @click="joinData('docoptions',item)" class="docList rows">
            {{item.userName}}
          </div>
          <div v-if="chooseOneType=='firstdocmzkUsers'" v-for="item in MzkUsers" @click="joinData('firstdocmzkUsers',item)" class="docList rows">
            {{item.userName}}
          </div>
          <div v-if="chooseOneType=='seconddocmzkUsers'" v-for="item in MzkUsers" @click="joinData('seconddocmzkUsers',item)" class="docList rows">
            {{item.userName}}
          </div>
          <div v-if="chooseOneType=='firstassistant'" v-for="item in assistant" @click="joinData('firstassistant',item)" class="docList rows">
            {{item.userName}}
          </div>
          <div v-if="chooseOneType=='secondassistant'" v-for="item in assistant" @click="joinData('secondassistant',item)" class="docList rows">
            {{item.userName}}
          </div>
          <div v-if="chooseOneType=='firstdocwash'" v-for="item in wash" @click="joinData('firstdocwash',item)" class="docList rows">
            {{item.userName}}
          </div>
          <div v-if="chooseOneType=='seconddocwash'" v-for="item in wash" @click="joinData('seconddocwash',item)" class="docList rows">
            {{item.userName}}
          </div>
          <div v-if="chooseOneType=='firstdoctour'" v-for="item in tour" @click="joinData('firstdoctour',item)" class="docList rows">
            {{item.userName}}
          </div>
          <div v-if="chooseOneType=='seconddoctour'" v-for="item in tour" @click="joinData('seconddoctour',item)" class="docList rows">
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
        <div style="position:absolute;left:0;top:55px;z-index:999;" @contextmenu.prevent="cleanFun($event)">
          <div v-for="(item,index) in roomId" class="operationRoom" @click="chooseClassFun(item,index)" :class="{backgroundColor:item.chooseClass}">
            {{item.name}}
          </div>
          <div v-if="cleanData" @contextmenu.stop="noFun()" class="cleanBox" :style="{top:cleanTop+'px',left:cleanLeft+'px'}">
            <div class="cleanLast" @click="cleanFunOnList('all')">清空全部</div>
            <div class="cleanLast" @click="cleanFunOnList('anesthesiaDoctorName')">清空主麻医师</div>
            <div class="cleanLast" @click="cleanFunOnList('firstAnesthesiaAssistantName')">清空副麻医师1</div>
            <div class="cleanLast" @click="cleanFunOnList('secondAnesthesiaAssistantName')">清空副麻医师2</div>
            <div class="cleanLast" @click="cleanFunOnList('firstAssistantName')">清空副麻助手1</div>
            <div class="cleanLast" @click="cleanFunOnList('secondAssistantName')">清空副麻助手2</div>
            <div class="cleanLast" @click="cleanFunOnList('firstOperationNurseName')">清空洗手护士1</div>
            <div class="cleanLast" @click="cleanFunOnList('secondOperationNurseName')">清空洗手护士2</div>
            <div class="cleanLast" @click="cleanFunOnList('firstSupplyNurseName')">清空巡回护士1</div>
            <div class="cleanLast" @click="cleanFunOnList('secondSupplyNurseName')">清空巡回护士2</div>
            <!-- <div style="width:100%;height:100%;position:relative;" @mouseover="overShow()" @mouseout="outShow()"> -->
            <!-- 清空 -->
            <!-- <div v-if="showList" style="width:100%;height:auto;z-index:9999;">

                                                                                                                                                                                                                                                                                                                                                                                                                    </div> -->
            <!-- </div> -->
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
                    <span style="padding-right:10px;">{{cell.patientName}}</span>
                    <span style="font-weight:bold;color:red;">第{{cell.sequence}}台</span>
                  </div>
                  <div style="color:#222;padding:2px 0;">
                    <!-- <span style="padding-right:10px;">{{cell.patientName}}</span> -->
                    <span style="padding-right:10px;">{{cell.patientId}}</span>
                    <span style="padding-right:10px;">{{cell.patientSex}}</span>
                    <span>{{cell.patienAge}}岁</span>
                  </div>
                  <div :title="cell.operationSchName" style="color:#222;padding:2px 0;font-weight:bold;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                    {{cell.operationSchName}}
                  </div>
                  <div style="color:#222;padding:2px 0;width:100%;">
                    <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">{{cell.surgeonName}}</span>
                    <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">{{cell.anesthesiaDoctorName}}</span>
                    <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">{{cell.firstAnesthesiaAssistantName}}</span>
                  </div>
                  <div style="padding:2px 0;font-weight:bold;">
                    备注：
                    <span style="color:red;">{{cell.notesOnOperation}}</span>
                  </div>
                </div>
                <div v-else @click="showShadow(cell)" @dblclick="edit(cell)" style="border:2px solid #F5AF93;position:relative;" class="roomData" :class="{boxshadow:cell.clickShadowData}">
                  <div @click="goBackFun(cell,index)" class="goBack">X</div>
                  <div @click="goTaoLeft(cell,index)" class="leftLost" title="台次向前排列">←</div>
                  <div @click="goTaoRight(cell,index)" class="rightAdd" title="台次向后排列">→</div>
                  <div style="color:#5298EE;border-bottom:1px solid #E9E9ED;padding:2px 0;">
                    <span style="padding-right:10px;">{{cell.scheduledDateTime}}</span>
                    <span style="padding-right:10px;">{{cell.patientName}}</span>
                    <span style="font-weight:bold;color:red;">第{{cell.sequence}}台</span>
                  </div>
                  <div style="color:#222;padding:2px 0;">
                    <!-- <span style="padding-right:10px;">{{cell.patientName}}</span> -->
                    <span style="padding-right:10px;">{{cell.patientId}}</span>
                    <span style="padding-right:10px;">{{cell.patientSex}}</span>
                    <span>{{cell.patienAge}}岁</span>
                  </div>
                  <div :title="cell.operationSchName" style="color:#222;padding:2px 0;font-weight:bold;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                    {{cell.operationSchName}}
                  </div>
                  <div style="color:#222;padding:2px 0;width:100%;">
                    <span style="padding:0px 6px;border-radius:5px;border:1px dashed #222;margin-right:5px;">{{cell.surgeonName}}</span>
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
    <div class="mask pCenter" @click="CancelSchedul" v-if="maskOfSchedul">
      <div class="infoModal" style="width:440px;">
        <div class="modalHead">
          <span>手术通知单</span>
          <div @click="CancelSchedul" class="font_active">X</div>
        </div>
        <div class="modalBody" @click.stop="noFun()">
          <div class="newSchedulClass">
            <div class="newClassDiv">姓名</div>
            <div class="newClassDiv">{{handSchedulItem.patientName}}</div>
            <div class="newClassDiv">住院号</div>
            <div class="newClassDiv">{{handSchedulItem.inpNo}}</div>
          </div>
          <div class="newSchedulClass">
            <div class="newClassDiv">年龄</div>
            <div class="newClassDiv">{{handSchedulItem.patienAge}}</div>
            <div class="newClassDiv">性别</div>
            <div class="newClassDiv">{{handSchedulItem.patientSex}}</div>
          </div>
          <div class="newSchedulClass">
            <div class="newClassDiv">病区</div>
            <div class="newClassDiv">{{handSchedulItem.deptName}}</div>
          </div>
          <div class="newSchedulClass" style="height:60px;">
            <div class="newClassDiv">诊断</div>
            <div class="newClassDiv" style="width:313px;line-height:22px;">{{handSchedulItem.diagBeforeOperation}}</div>
          </div>
          <div class="newSchedulClass" style="height:42px;">
            <div class="newClassDiv">手术</div>
            <div class="newClassDiv" style="width:313px;line-height:22px;">{{handSchedulItem.operationSchName}}</div>
          </div>
          <div class="newSchedulClass" style="height:90px;">
            <div class="newClassDiv">实行手术医生</div>
            <div class="newClassDiv" style="width:313px;line-height:22px;">
              <div style="border-bottom:1px solid #B3B3B3">主刀医生:{{handSchedulItem.anesthesiaDoctorName}}</div>
              <div style="border-bottom:1px solid #B3B3B3">一助医生:{{handSchedulItem.firstAssistantName}}</div>
              <div style="border-bottom:1px solid #B3B3B3">二助医生:{{handSchedulItem.secondAssistantName}}</div>
              <div>三助医生:{{handSchedulItem.thirdAssistantName}}</div>
            </div>
          </div>
          <div class="newSchedulClass">
            <div class="newClassDiv">麻醉</div>
            <div class="newClassDiv" style="width:313px;">{{handSchedulItem.anesthesiaMethod}}</div>
          </div>
          <div class="newSchedulClass">
            <div class="newClassDiv">手术日期及时间</div>
            <div class="newClassDiv" style="width:313px;">{{dateValue}} {{handSchedulItem.scheduledDateTime}}</div>
          </div>
          <div class="newSchedulClass">
            <div class="newClassDiv">感染隔离</div>
            <div class="newClassDiv">{{handSchedulItem.isolationIndicator}}</div>
          </div>
          <div class="newSchedulClass">
            <div class="newClassDiv">检验数值</div>
            <div class="newClassDiv" style="width:313px;"></div>
          </div>
          <div class="newSchedulClass" style="height:60px;">
            <div class="newClassDiv">备注</div>
            <div class="newClassDiv" style="width:313px;line-height:22px;">{{handSchedulItem.notesOnOperation}}</div>
          </div>
          <div class="newSchedulClass" style="border-bottom:1px solid #B3B3B3;">
            <div class="newClassDiv">日期</div>
            <div class="newClassDiv">{{dateValue}}</div>
            <div class="newClassDiv">申请医生</div>
            <div class="newClassDiv">{{handSchedulItem.enteredBy}}</div>
          </div>
        </div>
        <div class="modalFoot">
          <!-- <button @click="modalSure"></button> -->
          <button @click="CancelSchedul">确定</button>
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
          <div v-for="(item,index) in infoMode" class="flex">
            <div class="label">{{item.text}}：</div>
            <textarea style="outline:none;" v-if="item.text == '备注'" readonly name="" id="" v-model="handleItem[item.value]"></textarea>
            <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&item.value == 'anesthesiaDoctorName'" style="width:134px;" v-model="handleItem[item.value]">
              <option value=""></option>
              <option v-for="all in options" v-bind:value="all.userName">{{all.userName}}</option>
            </select>
            <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&(item.value == 'firstAnesthesiaAssistantName'||item.value == 'secondAnesthesiaAssistantName')" style="width:134px;" v-model="handleItem[item.value]">
              <option value=""></option>
              <option v-for="all in MzkUsers" v-bind:value="all.userName">{{all.userName}}</option>
            </select>
            <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&(item.value == 'firstAssistantName'||item.value == 'secondAssistantName')" style="width:134px;" v-model="handleItem[item.value]">
              <option value=""></option>
              <option v-for="all in assistant" v-bind:value="all.userName">{{all.userName}}</option>
            </select>
            <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&(item.value == 'firstOperationNurseName'||item.value == 'secondOperationNurseName')" style="width:134px;" v-model="handleItem[item.value]">
              <option value=""></option>
              <option v-for="all in wash" v-bind:value="all.userName">{{all.userName}}</option>
            </select>
            <select @change="getNewPushData(item,index)" v-else-if="item.optin == true&&(item.value == 'firstSupplyNurseName'||item.value == 'secondSupplyNurseName')" style="width:134px;" v-model="handleItem[item.value]">
              <option value=""></option>
              <option v-for="all in tour" v-bind:value="all.userName">{{all.userName}}</option>
            </select>
            <input v-else style="width:130px;outline:none;" v-bind:readonly="readonlyData" type="" name="" v-model="handleItem[item.value]">
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
      readonlyData: false,
      handSchedulItem: {},
      handleItem: {},
      handleItemTow: {},
      eventLeft: '',
      eventTop: '',
      rightShowData: false,
      tableConfig: [{
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
        text: '手术医师',
        value: 'surgeonName',
        width: 100,
        optin: false,
      }, {
        text: '手术名称',
        value: 'operationSchName',
        width: 250,
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
        text: '床号',
        value: 'bedNo',
        width: 60,
        optin: false,
      }, {
        text: '诊断',
        value: 'diagBeforeOperation',
        width: 200,
        optin: false,
      }, {
        text: "手术审核时间",
        type: "inSelect",
        value: "reqDateTime",
        width: 120,
        optin: false,
      }, {
        text: '备注',
        value: 'notesOnOperation',
        width: 100,
        optin: false,
      }],
      infoMode: [{
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
          text: '手术医师',
          value: 'surgeonName',
          width: 100,
          optin: false,
        }, {
          text: '手术名称',
          value: 'operationSchName',
          width: 250,
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
          text: '床号',
          value: 'bedNo',
          width: 60,
          optin: false,
        }, {
          text: '诊断',
          value: 'diagBeforeOperation',
          width: 200,
          optin: false,
        }, {
          text: "手术审核时间",
          type: "inSelect",
          value: "reqDateTime",
          width: 120,
          optin: false,
        },
        {
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
        },
        {
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
        },{
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
          text: '备注',
          value: 'notesOnOperation',
          width: 100,
          optin: false,
        }
      ],
      getLength: '0',
      listChooseBody: [
        { data: '手术', dataLength: 0, type: 'list' },
        { data: '主麻医生', type: 'docoptions' },
        { data: '副麻医生1', type: 'firstdocmzkUsers' },
        { data: '副麻医生2', type: 'seconddocmzkUsers' },
        { data: '麻醉助手1', type: 'firstassistant' },
        { data: '麻醉助手2', type: 'secondassistant' },
        { data: '洗手护士1', type: 'firstdocwash' },
        { data: '洗手护士2', type: 'seconddocwash' },
        { data: '巡回护士1', type: 'firstdoctour' },
        { data: '巡回护士2', type: 'seconddoctour' },
      ],
      roomId: [{
        name: '',
        chooseClass: true,
        docoptions: '',
        docmzkUsers: '',
        docmzkUsersTwo: '',
        assistant: '',
        assistantTwo: '',
        docwash: '',
        docwashTwo: '',
        doctour: '',
        doctourTwo: '',
        docoptionsId: '',
        docmzkUsersId: '',
        docmzkUsersTwoId: '',
        assistantId: '',
        assistantTwoId: '',
        docwashId: '',
        docwashTwoId: '',
        doctourId: '',
        doctourTwoId: '',
        MaxLeftNum: '',
        MaxRightNum: 0,
      }],
      hasChooseRoom: {},
      hasChooseIndex: 0,
      chooseData: '手术(0)',
      chooseOneType: 'list',
      dateValue: '',
      scheduleList: [],
      scheduleListRight: [],
      scheduleListRight2: [],
      maskOfSchedul: false,
      mask: false,
      area: '',
      startX: '',
      handleCol: '',
      nextCol: '',
      minWidth: 20,
      maxWidth: '',
      totalWidth: 10,
      // showarrange: false,
      clickTop: '',
      clickLeft: '',
      pushDataBody: '',
      spliceIndex: '',
      cleanData: false,
      cleanTop: '',
      cleanLeft: '',
      showList: false,
      dataR: false,
      roomNum: [],
      roomNumNext: [],
      maxL: [],
      dataNum: 0,
      stateOfNum: false,
      onchangeData: {
        // anesthesiaDoctorName: '',
        // firstAnesthesiaAssistantName: '',
        // secondAnesthesiaAssistantName: '',
        // firstOperationNurseName: '',
        // secondOperationNurseName: '',
        // firstSupplyNurseName: '',
        // secondSupplyNurseName: '',
        // firstAssistantName: '',
        // secondAssistantName: '',
      }
    }
  },
  methods: {
    getRoomNo() {
      let params = {
        deptCode: this.config.wardCode,
        bedType: '0'
      }
      this.api.selectAllRoomNo(params).then(
        res => {
          for (var q = 0; q < res.length; q++) {
            if (q == 0) {
              this.roomId[0].name = res[0].roomNo;
            } else {
              this.roomId.push({
                name: res[q].roomNo,
                chooseClass: false,
                docoptions: '',
                docmzkUsers: '',
                docmzkUsersTwo: '',
                assistant: '',
                assistantTwo: '',
                docwash: '',
                docwashTwo: '',
                doctour: '',
                doctourTwo: '',
                docoptionsId: '',
                docmzkUsersId: '',
                docmzkUsersTwoId: '',
                assistantId: '',
                assistantTwoId: '',
                docwashId: '',
                docwashTwoId: '',
                doctourId: '',
                doctourTwoId: '',
                MaxLeftNum: '',
                MaxRightNum: 0,
              })
            }
          }
          this.hasChooseRoom = this.roomId[0];
          // console.log(this.roomId)
        }
      )
    },
    nameDataType(item) {
      // console.log(item)
    },
    submit() {
      let params = [];
      let dataInName;
      let commitData = [];
      // console.log(this.scheduleListRight)
      for (var i = 0; i < this.scheduleListRight.length; i++) {
        if (this.scheduleListRight[i].state == 1) {
          // console.log(this.scheduleListRight[i])
          commitData.push({
            patientId: this.scheduleListRight[i].patientId,
            visitId: this.scheduleListRight[i].visitId,
            scheduleId: this.scheduleListRight[i].scheduleId,
            sequence: this.scheduleListRight[i].sequence,
            operatingRoomNo: this.scheduleListRight[i].operatingRoomNo,
          })
        }
      }
      // console.log(commitData)
      // if (dataInName) {
      this.api.submitMedOperationScheduleList(commitData)
        .then(
          res => {
            dataInName = false;
            this.getList(this.dateValue)
            alert('提交成功!')
          })


      // } else {
      // alert('必要的选项不能为空！')
      // }

    },
    getNewPushData(item, index) {
      // console.log(item)
      // console.log(index)
      // console.log(this.handleItem[item.value])
      // console.log(this.tableConfig[index])
      if (this.tableConfig[index].value == 'anesthesiaDoctorName') {
        // console.log(this.options)
        for (var a = 0; a < this.options.length; a++) {
          if (this.options[a].userName == this.handleItem[item.value]) {
            this.onchangeData.anesthesiaDoctorName = this.options[a].userId;
          }
        }
      } else if (this.tableConfig[index].value == 'firstAnesthesiaAssistantName') {
        // console.log(this.MzkUsers)
        for (var a = 0; a < this.MzkUsers.length; a++) {
          if (this.MzkUsers[a].userName == this.handleItem[item.value]) {
            this.onchangeData.firstAnesthesiaAssistantName = this.MzkUsers[a].userId;
          }
        }
      } else if (this.tableConfig[index].value == 'secondAnesthesiaAssistantName') {
        // console.log(this.MzkUsers)
        for (var a = 0; a < this.MzkUsers.length; a++) {
          if (this.MzkUsers[a].userName == this.handleItem[item.value]) {
            this.onchangeData.secondAnesthesiaAssistantName = this.MzkUsers[a].userId;
          }
        }
      } else if (this.tableConfig[index].value == 'firstAssistantName') {
        // console.log(this.assistant)
        for (var a = 0; a < this.assistant.length; a++) {
          if (this.assistant[a].userName == this.handleItem[item.value]) {
            this.onchangeData.firstAssistantName = this.assistant[a].userId;
          }
        }
      } else if (this.tableConfig[index].value == 'secondAssistantName') {
        // console.log(this.assistant)
        for (var a = 0; a < this.assistant.length; a++) {
          if (this.assistant[a].userName == this.handleItem[item.value]) {
            this.onchangeData.secondAssistantName = this.assistant[a].userId;
          }
        }
      } else if (this.tableConfig[index].value == 'firstOperationNurseName') {
        // console.log(this.wash)
        for (var a = 0; a < this.wash.length; a++) {
          if (this.wash[a].userName == this.handleItem[item.value]) {
            this.onchangeData.firstOperationNurseName = this.wash[a].userId;
          }
        }
      } else if (this.tableConfig[index].value == 'secondOperationNurseName') {
        // console.log(this.wash)
        for (var a = 0; a < this.wash.length; a++) {
          if (this.wash[a].userName == this.handleItem[item.value]) {
            this.onchangeData.secondOperationNurseName = this.wash[a].userId;
          }
        }
      } else if (this.tableConfig[index].value == 'firstSupplyNurseName') {
        // console.log(this.tour)
        for (var a = 0; a < this.tour.length; a++) {
          if (this.tour[a].userName == this.handleItem[item.value]) {
            this.onchangeData.firstSupplyNurseName = this.tour[a].userId;
          }
        }
      } else if (this.tableConfig[index].value == 'secondSupplyNurseName') {
        // console.log(this.tour)
        for (var a = 0; a < this.tour.length; a++) {
          if (this.tour[a].userName == this.handleItem[item.value]) {
            this.onchangeData.secondSupplyNurseName = this.tour[a].userId;
          }
        }
      }
    },
    modalSure() {
      // console.log(this.handleItem)
      // console.log(this.onchangeData)
      let params = {
        anesthesiaDoctor: this.onchangeData.anesthesiaDoctorName,
        anesthesiaAssistant: this.onchangeData.firstAnesthesiaAssistantName,
        firstAssistant: this.onchangeData.firstAssistantName,
        firstOperationNurse: this.onchangeData.firstOperationNurseName,
        firstSupplyNurse: this.onchangeData.firstSupplyNurseName,
        secondAnesthesiaAssistant: this.onchangeData.secondAnesthesiaAssistantName,
        secondAssistant: this.onchangeData.secondAssistantName,
        secondOperationNurse: this.onchangeData.secondOperationNurseName,
        secondSupplyNurse: this.onchangeData.secondSupplyNurseName,
        patientId: this.handleItem.patientId,
        scheduleId: this.handleItem.scheduleId,
        visitId: this.handleItem.visitId,
        state: 1,
      }
      // console.log(params)
      this.api.editSchedule(params)
        .then(res => {
          // this.getList(this.dateValue)
        });
      this.mask = false;

    },
    CancelSchedul() {
      this.maskOfSchedul = false;
    },
    modalCancel() {
      // console.log(this.handleItemTow)
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
      // console.log(this.tableConfig)
      if (item.state == 0 || item.state == 1) {
        for (var a = 0; a < this.infoMode.length; a++) {
          if (this.infoMode[a].value == 'anesthesiaDoctorName') {
            // console.log('主治医生')
            this.infoMode[a].optin = true;
          } else if (this.infoMode[a].value == 'firstAnesthesiaAssistantName') {
            // console.log('副麻医生1')
            this.infoMode[a].optin = true;
          } else if (this.infoMode[a].value == 'secondAnesthesiaAssistantName') {
            // console.log('副麻医生2')
            this.infoMode[a].optin = true;
          } else if (this.infoMode[a].value == 'firstAssistantName') {
            // console.log('手术助手1')
            this.infoMode[a].optin = true;
          } else if (this.infoMode[a].value == 'secondAssistantName') {
            // console.log('手术助手2')
            this.infoMode[a].optin = true;
          } else if (this.infoMode[a].value == 'firstOperationNurseName') {
            // console.log('洗手护士1')
            this.infoMode[a].optin = true;
          } else if (this.infoMode[a].value == 'secondOperationNurseName') {
            // console.log('洗手护士2')
            this.infoMode[a].optin = true;
          } else if (this.infoMode[a].value == 'firstSupplyNurseName') {
            // console.log('主治医生')
            this.infoMode[a].optin = true;
          } else if (this.infoMode[a].value == 'secondSupplyNurseName') {
            // console.log('主治医生')
            this.infoMode[a].optin = true;
          }

        }
      } else {
        for (var b = 0; b < this.infoMode.length; b++) {
          this.infoMode[b].optin = false;
        }
      }

      // console.log(this.handleItem)
      this.mask = true;
      if (item.state == 1 || item.state == 0) {
        this.readonlyData = false;
      } else {
        this.readonlyData = true;
      }
    },
    showShadow(cell) {
      console.log(cell)
      // console.log(this.scheduleListRight)
      for (var a = 0; a < this.scheduleListRight.length; a++) {
        this.scheduleListRight[a].clickShadowData = false;
      }
      cell.clickShadowData = true;
    },
    test(event) {
      // console.log(event.srcElement.value)
      this.dateValue = event.srcElement.value;
    },
    dateChange() {
      this.getList(this.dateValue)

    },
    chooseOne(item) {
      // console.log(item)
      this.chooseOneType = item.type;
      // console.log(this.chooseOneType);
      if (item.dataLength !== undefined) {
        this.chooseData = item.data + '(' + item.dataLength + ')'
      } else {
        this.chooseData = item.data
      }
    },
    noFun() {

    },
    // 清除点击函数
    cleanFun(event) {
      // console.log(event)
      // 目前手动调整，如果顶部导航栏的高度有所修改，请修改这个值
      this.cleanTop = event.clientY - 186;
      this.cleanLeft = event.clientX - this.$refs.timeChose.offsetWidth;
      this.cleanData = true;
    },
    overShow() {
      this.showList = true;
    },
    outShow() {
      this.showList = false;
    },
    cleanOutShow() {
      this.cleanData = false;
      this.rightShowData = false;
      for (var a = 0; a < this.scheduleList.length; a++) {
        this.scheduleList[a].clickShadowData = false;
      }
    },
    cleanFunOnList(type) {
      let commitData = [];
      if (type == 'all') {
        // 将手术间的值变为空
        this.hasChooseRoom.assistant = '';
        this.hasChooseRoom.assistantId = '';
        this.hasChooseRoom.assistantTwo = '';
        this.hasChooseRoom.assistantTwoId = '';
        this.hasChooseRoom.docmzkUsers = '';
        this.hasChooseRoom.docmzkUsersId = '';
        this.hasChooseRoom.docmzkUsersTwo = '';
        this.hasChooseRoom.docmzkUsersTwoId = '';
        this.hasChooseRoom.docoptions = '';
        this.hasChooseRoom.docoptionsId = '';
        this.hasChooseRoom.doctour = '';
        this.hasChooseRoom.doctourId = '';
        this.hasChooseRoom.doctourTwo = '';
        this.hasChooseRoom.doctourTwoId = '';
        this.hasChooseRoom.docwash = '';
        this.hasChooseRoom.docwashId = '';
        this.hasChooseRoom.docwashTwo = '';
        this.hasChooseRoom.docwashTwoId = '';
        this.roomId[this.hasChooseIndex].assistant = '';
        this.roomId[this.hasChooseIndex].assistantId = '';
        this.roomId[this.hasChooseIndex].assistantTwo = '';
        this.roomId[this.hasChooseIndex].assistantTwoId = '';
        this.roomId[this.hasChooseIndex].docmzkUsers = '';
        this.roomId[this.hasChooseIndex].docmzkUsersId = '';
        this.roomId[this.hasChooseIndex].docmzkUsersTwo = '';
        this.roomId[this.hasChooseIndex].docmzkUsersTwoId = '';
        this.roomId[this.hasChooseIndex].docoptions = '';
        this.roomId[this.hasChooseIndex].docoptionsId = '';
        this.roomId[this.hasChooseIndex].doctour = '';
        this.roomId[this.hasChooseIndex].doctourId = '';
        this.roomId[this.hasChooseIndex].doctourTwo = '';
        this.roomId[this.hasChooseIndex].doctourTwoId = '';
        this.roomId[this.hasChooseIndex].docwash = '';
        this.roomId[this.hasChooseIndex].docwashId = '';
        this.roomId[this.hasChooseIndex].docwashTwo = '';
        this.roomId[this.hasChooseIndex].docwashTwoId = '';

        // 列表显示的值变为空
        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].anesthesiaDoctorName = '';
            this.scheduleListRight[aa].firstAnesthesiaAssistantName = '';
            this.scheduleListRight[aa].firstAssistantName = '';
            this.scheduleListRight[aa].firstOperationNurseName = '';
            this.scheduleListRight[aa].firstSupplyNurseName = '';
            this.scheduleListRight[aa].secondAnesthesiaAssistantName = '';
            this.scheduleListRight[aa].secondAssistantName = '';
            this.scheduleListRight[aa].secondOperationNurseName = '';
            this.scheduleListRight[aa].secondSupplyNurseName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              anesthesiaDoctor: this.scheduleListRight[i].anesthesiaDoctorName,
              anesthesiaAssistant: this.scheduleListRight[i].firstAnesthesiaAssistantName,
              firstAssistant: this.scheduleListRight[i].firstAssistantName,
              firstOperationNurse: this.scheduleListRight[i].firstOperationNurseName,
              firstSupplyNurse: this.scheduleListRight[i].firstSupplyNurseName,
              secondAnesthesiaAssistant: this.scheduleListRight[i].secondAnesthesiaAssistantName,
              secondAssistant: this.scheduleListRight[i].secondAssistantName,
              secondOperationNurse: this.scheduleListRight[i].secondOperationNurseName,
              secondSupplyNurse: this.scheduleListRight[i].secondSupplyNurseName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      } else if (type == 'anesthesiaDoctorName') {
        this.roomId[this.hasChooseIndex].docoptionsId = '';
        this.hasChooseRoom.docoptionsId = '';
        this.roomId[this.hasChooseIndex].docoptions = '';
        this.hasChooseRoom.docoptions = '';

        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].anesthesiaDoctorName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              anesthesiaDoctor: this.scheduleListRight[i].anesthesiaDoctorName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      } else if (type == 'firstAnesthesiaAssistantName') {
        this.roomId[this.hasChooseIndex].docmzkUsersId = '';
        this.hasChooseRoom.docmzkUsersId = '';
        this.roomId[this.hasChooseIndex].docmzkUsers = '';
        this.hasChooseRoom.docmzkUsers = '';

        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].firstAnesthesiaAssistantName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              anesthesiaAssistant: this.scheduleListRight[i].firstAnesthesiaAssistantName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      } else if (type == 'secondAnesthesiaAssistantName') {
        this.roomId[this.hasChooseIndex].docmzkUsersTwoId = '';
        this.hasChooseRoom.docmzkUsersTwoId = '';
        this.roomId[this.hasChooseIndex].docmzkUsersTwo = '';
        this.hasChooseRoom.docmzkUsersTwo = '';

        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].secondAnesthesiaAssistantName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              secondAnesthesiaAssistant: this.scheduleListRight[i].secondAnesthesiaAssistantName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }

      } else if (type == 'firstAssistantName') {
        this.roomId[this.hasChooseIndex].assistantId = '';
        this.hasChooseRoom.assistantId = '';
        this.roomId[this.hasChooseIndex].assistant = '';
        this.hasChooseRoom.assistant = '';

        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].firstAssistantName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              firstAssistant: this.scheduleListRight[i].firstAssistantName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      } else if (type == 'secondAssistantName') {
        this.roomId[this.hasChooseIndex].assistantTwoId = '';
        this.hasChooseRoom.assistantTwoId = '';
        this.roomId[this.hasChooseIndex].assistantTwo = '';
        this.hasChooseRoom.assistantTwo = '';
        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].secondAssistantName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              secondAssistant: this.scheduleListRight[i].secondAssistantName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      } else if (type == 'firstOperationNurseName') {
        this.roomId[this.hasChooseIndex].docwashId = '';
        this.hasChooseRoom.docwashId = '';
        this.roomId[this.hasChooseIndex].docwash = '';
        this.hasChooseRoom.docwash = '';

        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].firstOperationNurseName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              firstOperationNurse: this.scheduleListRight[i].firstOperationNurseName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      } else if (type == 'secondOperationNurseName') {
        this.roomId[this.hasChooseIndex].docwashTwoId = '';
        this.hasChooseRoom.docwashTwoId = '';
        this.roomId[this.hasChooseIndex].docwashTwo = '';
        this.hasChooseRoom.docwashTwo = '';

        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].secondOperationNurseName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              secondOperationNurse: this.scheduleListRight[i].secondOperationNurseName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      } else if (type == 'firstSupplyNurseName') {
        this.roomId[this.hasChooseIndex].doctourId = '';
        this.hasChooseRoom.doctourId = '';
        this.roomId[this.hasChooseIndex].doctour = '';
        this.hasChooseRoom.doctour = '';

        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].firstSupplyNurseName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              firstSupplyNurse: this.scheduleListRight[i].firstSupplyNurseName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      } else if (type == 'secondSupplyNurseName') {
        this.roomId[this.hasChooseIndex].doctourTwoId = '';
        this.hasChooseRoom.doctourTwoId = '';
        this.roomId[this.hasChooseIndex].doctour = '';
        this.hasChooseRoom.doctour = '';

        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].secondSupplyNurseName = '';
          }
        }
        for (var i = 0; i < this.scheduleListRight.length; i++) {
          if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
            commitData.push({
              secondSupplyNurse: this.scheduleListRight[i].secondSupplyNurseName,
              patientId: this.scheduleListRight[i].patientId,
              visitId: this.scheduleListRight[i].visitId,
              scheduleId: this.scheduleListRight[i].scheduleId,
              state: this.scheduleListRight[i].state,
            })
          }
        }
      }


      // console.log(commitData)
      this.api.updateBatchMedOperationSchedule(commitData)
        .then(res => {
          this.getList(this.dateValue)
        });
      this.cleanData = false;

    },
    chooseClassFun(item, index) {
      this.maxL = [];
      this.roomNum = [];
      this.stateOfNum = false;
      // console.log(item)
      for (var i = 0; i < this.roomId.length; i++) {
        this.$set(this.roomId[i], 'chooseClass', false)
      }
      item.chooseClass = true;
      this.hasChooseRoom = item;
      // console.log(this.hasChooseRoom)
      this.hasChooseIndex = index;
      // console.log(index)
      // this.sequenceFun();
      // console.log(this.roomNum)
      for (var a = 0; a < this.scheduleListRight.length; a++) {
        if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name) {
          this.roomNum.push(this.scheduleListRight[a].sequence);
        }
      }
      // debugger
      for (var d = 0; d < this.roomId.length; d++) {
        if (this.roomId[d].name == this.hasChooseRoom.name && this.roomNum != '') {
          this.roomId[d].MaxRightNum = Math.max.apply(Math, this.roomNum);
          this.hasChooseRoom.MaxRightNum = Math.max.apply(Math, this.roomNum);
        } else {
          this.roomId[d].MaxRightNum = 0;
        }
      }
      for (var b = 0; b < this.scheduleListRight.length; b++) {
        if (this.scheduleListRight[b].operatingRoomNo == this.hasChooseRoom.name && (this.scheduleListRight[b].state == 2 || this.scheduleListRight[b].state == 3 || this.scheduleListRight[b].state == 4)) {
          this.maxL.push(this.scheduleListRight[b].sequence);
        } else {

        }
      }
      // console.log(this.maxL)
      for (var c = 0; c < this.roomId.length; c++) {
        if (this.roomId[c].name == this.hasChooseRoom.name && this.maxL.length > 0) {
          this.roomId[c].MaxLeftNum = Math.max.apply(Math, this.maxL);
          this.hasChooseRoom.MaxLeftNum = Math.max.apply(Math, this.maxL);
        } else {
          // if (this.roomId[c].name == this.hasChooseRoom.name && this.maxL == []) {
          this.roomId[c].MaxLeftNum = 0;
          // this.hasChooseRoom.MaxLeftNum = 0;
          // }

        }
      }
      // console.log(this.roomId)
      // console.log(this.hasChooseRoom)
    },
    joinData(type, item) {
      // console.log(item)
      // console.log(this.pushDataBody)
      // console.log(this.roomId[this.hasChooseIndex])
      if (type == 'docoptions') {
        this.roomId[this.hasChooseIndex].docoptionsId = item.userId;
        this.hasChooseRoom.docoptionsId = item.userId;
        this.roomId[this.hasChooseIndex].docoptions = item.userName;
        this.hasChooseRoom.docoptions = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.anesthesiaDoctorName = item.userName;
        }
        for (var aa = 0; aa < this.scheduleListRight.length; aa++) {
          if (this.scheduleListRight[aa].state == 1 && this.scheduleListRight[aa].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[aa].anesthesiaDoctorName = item.userName;
            this.scheduleListRight[aa].anesthesiaDoctorNameId = item.userId;
          }
        }
      } else if (type == 'firstdocmzkUsers') {
        this.roomId[this.hasChooseIndex].docmzkUsersId = item.userId;
        this.hasChooseRoom.docmzkUsersId = item.userId;
        this.roomId[this.hasChooseIndex].docmzkUsers = item.userName;
        this.hasChooseRoom.docmzkUsers = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.firstAnesthesiaAssistantName = item.userName;
        }
        // for (var b = 0; b < this.newUpdata.length; b++) {
        //   if (this.newUpdata[b].operatingRoomNo == this.hasChooseRoom.name) {
        //     this.newUpdata[b].firstAnesthesiaAssistantName = item.userId;
        //   }
        // }
        for (var bb = 0; bb < this.scheduleListRight.length; bb++) {
          if (this.scheduleListRight[bb].state == 1 && this.scheduleListRight[bb].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[bb].firstAnesthesiaAssistantName = item.userName;
            this.scheduleListRight[bb].firstAnesthesiaAssistantNameId = item.userId;
          }
        }
      } else if (type == 'seconddocmzkUsers') {
        this.roomId[this.hasChooseIndex].docmzkUsersTwoId = item.userId;
        this.hasChooseRoom.docmzkUsersTwoId = item.userId;
        this.roomId[this.hasChooseIndex].docmzkUsersTwo = item.userName;
        this.hasChooseRoom.docmzkUsersTwo = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.secondAnesthesiaAssistantName = item.userName;
        }
        // for (var b = 0; b < this.newUpdata.length; b++) {
        //   if (this.newUpdata[b].operatingRoomNo == this.hasChooseRoom.name) {
        //     this.newUpdata[b].secondAnesthesiaAssistantName = item.userId;
        //   }
        // }
        for (var bb = 0; bb < this.scheduleListRight.length; bb++) {
          if (this.scheduleListRight[bb].state == 1 && this.scheduleListRight[bb].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[bb].secondAnesthesiaAssistantName = item.userName;
            this.scheduleListRight[bb].secondAnesthesiaAssistantNameId = item.userId;
          }
        }
      } else if (type == 'firstassistant') {
        this.roomId[this.hasChooseIndex].assistantId = item.userId;
        this.hasChooseRoom.assistantId = item.userId;
        this.roomId[this.hasChooseIndex].assistant = item.userName;
        this.hasChooseRoom.assistant = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.firstAssistantName = item.userName;
        }
        // for (var c = 0; c < this.newUpdata.length; c++) {
        //   if (this.newUpdata[c].operatingRoomNo == this.hasChooseRoom.name) {
        //     this.newUpdata[c].firstAssistantName = item.userId;
        //   }
        // }
        for (var cc = 0; cc < this.scheduleListRight.length; cc++) {
          if (this.scheduleListRight[cc].state == 1 && this.scheduleListRight[cc].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[cc].firstAssistantName = item.userName;
            this.scheduleListRight[cc].firstAssistantNameId = item.userId;
          }
        }
      } else if (type == 'secondassistant') {
        this.roomId[this.hasChooseIndex].assistantTwoId = item.userId;
        this.hasChooseRoom.assistantTwoId = item.userId;
        this.roomId[this.hasChooseIndex].assistantTwo = item.userName;
        this.hasChooseRoom.assistantTwo = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.secondAssistantName = item.userName;
        }
        // for (var c = 0; c < this.newUpdata.length; c++) {
        //   if (this.newUpdata[c].operatingRoomNo == this.hasChooseRoom.name) {
        //     this.newUpdata[c].secondAssistantName = item.userId;
        //   }
        // }
        for (var cc = 0; cc < this.scheduleListRight.length; cc++) {
          if (this.scheduleListRight[cc].state == 1 && this.scheduleListRight[cc].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[cc].secondAssistantName = item.userName;
            this.scheduleListRight[cc].secondAssistantNameId = item.userId;
          }
        }
      } else if (type == 'firstdocwash') {
        this.roomId[this.hasChooseIndex].docwashId = item.userId;
        this.hasChooseRoom.docwashId = item.userId;
        this.roomId[this.hasChooseIndex].docwash = item.userName;
        this.hasChooseRoom.docwash = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.firstOperationNurseName = item.userName;
        }
        // for (var d = 0; d < this.newUpdata.length; d++) {
        //   if (this.newUpdata[d].operatingRoomNo == this.hasChooseRoom.name) {
        //     this.newUpdata[d].firstOperationNurseName = item.userId;
        //   }
        // }
        for (var dd = 0; dd < this.scheduleListRight.length; dd++) {
          if (this.scheduleListRight[dd].state == 1 && this.scheduleListRight[dd].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[dd].firstOperationNurseName = item.userName;
            this.scheduleListRight[dd].firstOperationNurseNameId = item.userId;
          }
        }
      } else if (type == 'seconddocwash') {
        this.roomId[this.hasChooseIndex].docwashTwoId = item.userId;
        this.hasChooseRoom.docwashTwoId = item.userId;
        this.roomId[this.hasChooseIndex].docwashTwo = item.userName;
        this.hasChooseRoom.docwashTwo = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.secondOperationNurseName = item.userName;
        }
        // for (var d = 0; d < this.newUpdata.length; d++) {
        //   if (this.newUpdata[d].operatingRoomNo == this.hasChooseRoom.name) {
        //     this.newUpdata[d].secondOperationNurseName = item.userId;
        //   }
        // }
        for (var dd = 0; dd < this.scheduleListRight.length; dd++) {
          if (this.scheduleListRight[dd].state == 1 && this.scheduleListRight[dd].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[dd].secondOperationNurseName = item.userName;
            this.scheduleListRight[dd].secondOperationNurseNameId = item.userId;
          }
        }
      } else if (type == 'firstdoctour') {
        this.roomId[this.hasChooseIndex].doctourId = item.userId;
        this.hasChooseRoom.doctourId = item.userId;
        this.roomId[this.hasChooseIndex].doctour = item.userName;
        this.hasChooseRoom.doctour = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.firstSupplyNurseName = item.userName;
        }
        // for (var e = 0; e < this.newUpdata.length; e++) {
        //   if (this.newUpdata[e].operatingRoomNo == this.hasChooseRoom.name) {
        //     this.newUpdata[e].firstSupplyNurseName = item.userId;
        //   }
        // }
        for (var ee = 0; ee < this.scheduleListRight.length; ee++) {
          if (this.scheduleListRight[ee].state == 1 && this.scheduleListRight[ee].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[ee].firstSupplyNurseName = item.userName;
            this.scheduleListRight[ee].firstSupplyNurseNameId = item.userId;
          }
        }
      } else if (type == 'seconddoctour') {
        this.roomId[this.hasChooseIndex].doctourTwoId = item.userId;
        this.hasChooseRoom.doctourTwoId = item.userId;
        this.roomId[this.hasChooseIndex].doctourTwo = item.userName;
        this.hasChooseRoom.doctourTwo = item.userName;
        if (this.pushDataBody == '') {

        } else {
          this.pushDataBody.secondSupplyNurseName = item.userName;
        }
        // for (var e = 0; e < this.newUpdata.length; e++) {
        //   if (this.newUpdata[e].operatingRoomNo == this.hasChooseRoom.name) {
        //     this.newUpdata[e].secondSupplyNurseName = item.userId;
        //   }
        // }
        for (var ee = 0; ee < this.scheduleListRight.length; ee++) {
          if (this.scheduleListRight[ee].state == 1 && this.scheduleListRight[ee].operatingRoomNo == this.hasChooseRoom.name) {
            this.scheduleListRight[ee].secondSupplyNurseName = item.userName;
            this.scheduleListRight[ee].secondSupplyNurseNameId = item.userId;
          }
        }
      }

      let commitData = [];
      // console.log(this.scheduleListRight)
      //   console.log(this.newUpdata)
      for (var i = 0; i < this.scheduleListRight.length; i++) {
        if (this.scheduleListRight[i].state == 1 && this.scheduleListRight[i].operatingRoomNo == this.hasChooseRoom.name) {
          // console.log(this.scheduleListRight[i])
          commitData.push({
            anesthesiaDoctor: this.scheduleListRight[i].anesthesiaDoctorNameId,
            anesthesiaAssistant: this.scheduleListRight[i].firstAnesthesiaAssistantNameId,
            firstAssistant: this.scheduleListRight[i].firstAssistantNameId,
            firstOperationNurse: this.scheduleListRight[i].firstOperationNurseNameId,
            firstSupplyNurse: this.scheduleListRight[i].firstSupplyNurseNameId,
            secondAnesthesiaAssistant: this.scheduleListRight[i].secondAnesthesiaAssistantNameId,
            secondAssistant: this.scheduleListRight[i].secondAssistantNameId,
            secondOperationNurse: this.scheduleListRight[i].secondOperationNurseNameId,
            secondSupplyNurse: this.scheduleListRight[i].secondSupplyNurseNameId,
            patientId: this.scheduleListRight[i].patientId,
            visitId: this.scheduleListRight[i].visitId,
            scheduleId: this.scheduleListRight[i].scheduleId,
            state: this.scheduleListRight[i].state,
            sequence: this.scheduleListRight[i].sequence,
          })
        }
      }
      // console.log(commitData)
      this.api.updateBatchMedOperationSchedule(commitData)
        .then(res => {
          // this.getList(this.dateValue)
        });
      // console.log(this.hasChooseRoom)
      // console.log(this.pushDataBody)
    },
    getList(date) {
      this.scheduleList = [];
      this.scheduleListRight = [];
      this.roomNum = [];
      this.maxL = [];
      var changeData = date.replace(/-/g, '/')
      let params = {
        "dateTime": changeData, //"2014/07/08"查询日期
        // "page":1,   //第几页
        // "count":2   //每页显示条数
      }
      this.api.getScheduleList(params)
        .then(res => {
          // 0为未分配 1为已分配未提交
          for (var j = 0; j < res.list.length; j++) {
            if (res.list[j].state == 0) {
              this.$set(res.list[j], 'clickShadowData', false)
              this.scheduleList.push(res.list[j])
            }
          }
          // console.log(this.scheduleList.length)
          this.listChooseBody[0].dataLength = this.scheduleList.length;
          this.chooseData = '手术(' + this.scheduleList.length + ')';
          // console.log(res.list)
          for (var a = 0; a < res.list.length; a++) {
            if (res.list[a].state == 1 || res.list[a].state == 2 || res.list[a].state == 3 || res.list[a].state == 4) {
              this.$set(res.list[a], 'clickShadowData', false)
              this.scheduleListRight.push(res.list[a])
              this.scheduleListRight2.push(res.list[a])
            }
          }
          this.scheduleListRight.sort(this.sortNumber);
          // console.log(this.scheduleListRight)
          this.scheduleListRight2.sort(this.sortNumber);
          // this.sequenceFun();
          // debugger
          for (var a = 0; a < this.scheduleListRight.length; a++) {
            if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name) {
              this.roomNum.push(this.scheduleListRight[a].sequence)
            }
          }
          for (var d = 0; d < this.roomId.length; d++) {
            if (this.roomId[d].name == this.hasChooseRoom.name && this.roomNum != '') {
              this.roomId[d].MaxRightNum = Math.max.apply(Math, this.roomNum);
              this.hasChooseRoom.MaxRightNum = Math.max.apply(Math, this.roomNum);
            } else {
              this.roomId[d].MaxRightNum = 0;
            }
          }
          for (var b = 0; b < this.scheduleListRight.length; b++) {
            if (this.scheduleListRight[b].operatingRoomNo == this.hasChooseRoom.name && (this.scheduleListRight[b].state == 2 || this.scheduleListRight[b].state == 3 || this.scheduleListRight[b].state == 4)) {
              this.maxL.push(this.scheduleListRight[b].sequence);
            } else {

            }
          }
          for (var c = 0; c < this.roomId.length; c++) {
            if (this.roomId[c].name == this.hasChooseRoom.name && this.maxL != []) {
              this.roomId[c].MaxLeftNum = Math.max.apply(Math, this.maxL);
              this.hasChooseRoom.MaxLeftNum = Math.max.apply(Math, this.maxL);
            } else {
              if (this.roomId[c].name == this.hasChooseRoom.name && this.maxL == []) {
                this.roomId[c].MaxLeftNum = 0;
                this.hasChooseRoom.MaxLeftNum = 0;
              }

            }
          }
          // console.log(this.roomId)
          // console.log(this.hasChooseRoom)

        });
    },
    getSupplyNurseList() {
      this.getList(this.dateValue);
      let params = {
        userDept: this.config.wardCode
      }
      //获取麻醉医生 副麻医师 麻醉助手
      this.api.getMzkUsers(params)
        .then(res => {
          this.options = res.list;
          this.MzkUsers = res.list;
          this.assistant = res.list;
        })
      //获取洗手 巡回护士
      this.api.getSupplyNurseList(params)
        .then(res => {
          this.wash = res.list;
          this.tour = res.list;
        })
      // this.api.selectUserListByType({ userType: '主麻医师' })
      //   .then(res => {
      //     this.options = res;
      //     console.log(this.options)
      //   })
      // this.api.selectUserListByType({ userType: '副麻医师' })
      //   .then(res => {
      //     this.MzkUsers = res;
      //   })
      // this.api.selectUserListByType({ userType: '麻醉助手' })
      //   .then(res => {
      //     this.assistant = res;
      //   })
      // this.api.selectUserListByType({ userType: '洗手护士' })
      //   .then(res => {
      //     this.wash = res;
      //   })
      // this.api.selectUserListByType({ userType: '巡回护士' })
      //   .then(res => {
      //     this.tour = res;
      //   })
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
    // noneDulClick() {
    //     this.showarrange = false;
    // },
    getTopLeft(event) {
      console.log(event)
      this.eventLeft = event.clientX + 15;
      this.eventTop = event.clientY + 20;
      this.rightShowData = true;
    },
    listOfData(item) {
      for (var a = 0; a < this.scheduleList.length; a++) {
        this.scheduleList[a].clickShadowData = false;
      }
      item.clickShadowData = true;
      this.handSchedulItem = item;
      console.log(this.handSchedulItem)
    },
    maskFun() {
      this.maskOfSchedul = true;
    },
    arrange(event, item, index) {
      // console.log(event)
      // console.log(item)
      // console.log(index)
      // console.log(this.$refs.normal.scrollLeft)
      // this.showarrange = true;
      // this.clickTop = event.y - 260;
      // this.clickLeft = event.x + this.$refs.normal.scrollLeft;
      this.pushDataBody = item;
      // console.log(item)
      this.spliceIndex = index;
      this.pushData();
    },
    pushData() {
      // console.log(this.pushDataBody)
      // console.log(this.hasChooseRoom)
      this.roomNum = [];
      // 手术间赋值
      this.pushDataBody.operatingRoomNo = this.hasChooseRoom.name;
      // 主麻医生赋值
      this.pushDataBody.anesthesiaDoctorName = this.hasChooseRoom.docoptions;
      // 副麻医生1赋值
      this.pushDataBody.firstAnesthesiaAssistantName = this.hasChooseRoom.docmzkUsers;
      // 副麻医生2赋值
      this.pushDataBody.secondAnesthesiaAssistantName = this.hasChooseRoom.docmzkUsersTwo;
      // 麻醉助手1赋值
      this.pushDataBody.firstAssistantName = this.hasChooseRoom.assistant;
      // 麻醉助手2赋值
      this.pushDataBody.secondAssistantName = this.hasChooseRoom.assistantTwo;
      // 洗手护士1赋值
      this.pushDataBody.firstOperationNurseName = this.hasChooseRoom.docwash;
      // 洗手护士2赋值
      this.pushDataBody.secondOperationNurseName = this.hasChooseRoom.docwashTwo;
      // 巡回护士1赋值
      this.pushDataBody.firstSupplyNurseName = this.hasChooseRoom.doctour;
      // 巡回护士2赋值
      this.pushDataBody.secondSupplyNurseName = this.hasChooseRoom.doctourTwo;
      this.pushDataBody.state = 1;
      // for (var a = 0; a < this.scheduleListRight.length; a++) {
      //     if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name) {
      //         this.dataR = true;
      //         this.roomNum.push(this.scheduleListRight[a].sequence)
      //     }
      // }
      // debugger

      for (var a = 0; a < this.scheduleListRight.length; a++) {
        if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name && (this.scheduleListRight[a].state == 2 || this.scheduleListRight[a].state == 3 || this.scheduleListRight[a].state == 4)) {
          // this.dataR = true;
          this.stateOfNum = true;
          this.roomNumNext.push(this.scheduleListRight[a].sequence);
        }
      }
      for (var a = 0; a < this.scheduleListRight.length; a++) {
        if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name) {
          // this.dataR = true;
          this.stateOfNum = true;
          this.roomNum.push(this.scheduleListRight[a].sequence);
        }
      }
      for (var d = 0; d < this.roomId.length; d++) {
        if (this.roomId[d].name == this.hasChooseRoom.name && this.roomNumNext > 0) {
          this.stateOfNum = true;
          this.roomId[d].MaxLeftNum = Math.max.apply(Math, this.roomNumNext);
          this.hasChooseRoom.MaxLeftNum = Math.max.apply(Math, this.roomNumNext);
        } else {
          this.roomId[d].MaxRightNum = 0;
          this.roomId[d].MaxLeftNum = 0;
          if (this.roomId[d].name == this.hasChooseRoom.name && this.roomNumNext.length == 0) {
            this.stateOfNum == false;
            this.hasChooseRoom.MaxLeftNum = 0;
          }
        }
      }

      if (this.stateOfNum == false) {
        this.pushDataBody.sequence = this.dataNum + 1;
      } else {
        this.pushDataBody.sequence = Math.max.apply(Math, this.roomNum) + 1
      }
      // 自动添加台次
      // this.scheduleListRight2.push(this.pushDataBody)
      this.scheduleListRight.push(this.pushDataBody);
      // this.sequenceFun();

      let subMitData = {
        // 手术间赋值
        operatingRoomNo: this.hasChooseRoom.name,
        // 主麻医生赋值
        anesthesiaDoctor: this.hasChooseRoom.docoptionsId,
        // 副麻医生1赋值
        anesthesiaAssistant: this.hasChooseRoom.docmzkUsersId,
        // 副麻医生2赋值
        secondAnesthesiaAssistant: this.hasChooseRoom.docmzkUsersTwoId,
        // 麻醉助手1赋值
        firstAssistant: this.hasChooseRoom.assistantId,
        // 麻醉助手2赋值
        secondAssistant: this.hasChooseRoom.assistantTwoId,
        // 洗手护士1赋值
        firstOperationNurse: this.hasChooseRoom.docwashId,
        // 洗手护士2赋值
        secondOperationNurse: this.hasChooseRoom.docwashTwoId,
        // 巡回护士1赋值
        firstSupplyNurse: this.hasChooseRoom.doctourId,
        // 巡回护士2赋值
        secondSupplyNurse: this.hasChooseRoom.doctourTwoId,
        // 手术台次
        sequence: this.pushDataBody.sequence,
        patientId: this.pushDataBody.patientId,
        scheduleId: this.pushDataBody.scheduleId,
        visitId: this.pushDataBody.visitId,
        state: 1,
      }

      this.scheduleList.splice(this.spliceIndex, 1);
      this.api.editSchedule(subMitData)
        .then(res => {
          for (var a = 0; a < this.scheduleListRight.length; a++) {
            if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name) {
              // this.dataR = true;
              this.roomNum.push(this.scheduleListRight[a].sequence);
            }
          }
          for (var d = 0; d < this.roomId.length; d++) {
            if (this.roomId[d].name == this.hasChooseRoom.name && this.roomNum.length > 0) {
              this.roomId[d].MaxRightNum = Math.max.apply(Math, this.roomNum);
              this.hasChooseRoom.MaxRightNum = Math.max.apply(Math, this.roomNum);
            } else {
              this.roomId[d].MaxRightNum = 0;
              this.roomId[d].MaxLeftNum = 0;
              if (this.roomId[d].name == this.hasChooseRoom.name && this.roomNum.length == 0) {
                this.stateOfNum == false;
                this.hasChooseRoom.MaxRightNum = 0;
              }
            }
          }
          // this.getList(this.dateValue)
          // this.sequenceFun();
          // for (var c = 0; c < this.roomId.length; c++) {
          //     if (this.roomId[c].name == this.hasChooseRoom.name) {
          //         this.roomId[c].MaxLeftNum = this.roomId[c].MaxLeftNum + 1;
          //     }
          // }
        });

      this.chooseData = '手术(' + this.scheduleList.length + ')';
      this.listChooseBody[0].dataLength = this.scheduleList.length;
    },
    sequenceFun() {
      // console.log(this.pushDataBody)
      // debugger
      // console.log(this.scheduleListRight)
      // console.log(this.scheduleListRight.length)
      this.maxL = [];
      // for (var a = 0; a < this.scheduleListRight.length; a++) {
      //     if (this.scheduleListRight[a].operatingRoomNo == this.hasChooseRoom.name) {
      //         // this.dataR = true;
      //         this.stateOfNum == true
      //         this.roomNum.push(this.scheduleListRight[a].sequence)
      //     }
      // }
      // console.log(this.roomNum)
      // console.log('aaaaa')
      for (var b = 0; b < this.scheduleListRight.length; b++) {
        if (this.scheduleListRight[b].operatingRoomNo == this.hasChooseRoom.name && (this.scheduleListRight[b].state == 2 || this.scheduleListRight[b].state == 3 || this.scheduleListRight[b].state == 4)) {
          // this.dataR = true;
          this.stateOfNum == true
          this.maxL.push(this.scheduleListRight[b].sequence);
        } else {
          this.stateOfNum == false;

        }
      }
      for (var c = 0; c < this.roomId.length; c++) {
        if (this.roomId[c].name == this.hasChooseRoom.name && this.maxL != []) {
          this.roomId[c].MaxLeftNum = Math.max.apply(Math, this.maxL);
          this.hasChooseRoom.MaxLeftNum = Math.max.apply(Math, this.maxL);
        } else {
          this.roomId[c].MaxLeftNum = 0;
          this.hasChooseRoom.MaxLeftNum = 0;
        }
      }
    },
    goBackFun(cell, index) {
      // console.log(cell)
      this.roomNum = [];
      for (var b = index; b < this.scheduleListRight.length; b++) {
        if (cell.operatingRoomNo == this.scheduleListRight[b].operatingRoomNo && cell.sequence < this.scheduleListRight[b].sequence) {
          this.scheduleListRight[b].sequence = this.scheduleListRight[b].sequence - 1;
          // console.log(this.scheduleListRight)
        }
      }
      this.scheduleListRight.splice(index, 1);
      this.scheduleList.push(cell);
      let subMitData = {
        state: 0,
        sequence: cell.sequence,
        patientId: cell.patientId,
        scheduleId: cell.scheduleId,
        visitId: cell.visitId,
        operatingRoomNo: '',
      };
      this.api.editSchedule(subMitData)
        .then(res => {
          // this.getList(this.dateValue)
          for (var c = 0; c < this.roomId.length; c++) {
            if (this.roomId[c].name == this.hasChooseRoom.name) {
              for (var g = index; g < this.scheduleListRight.length; g++) {
                if (this.scheduleListRight[g].operatingRoomNo == this.roomId[c].name) {
                  this.roomId[c].MaxRightNum = this.roomId[c].MaxRightNum - 1;
                } else {
                  this.roomId[c].MaxRightNum = 0;
                }
              }

            }
          }
        });
      this.chooseData = '手术(' + this.scheduleList.length + ')';
      this.listChooseBody[0].dataLength = this.scheduleList.length;
    },
    goTaoLeft(cell, index) {
      // debugger
      let submit = [];
      var mNum = '';
      // var IfData = '';
      // console.log(this.roomId)
      // console.log(this.hasChooseRoom)

      for (var c = 0; c < this.roomId.length; c++) {
        if (this.roomId[c].name == this.hasChooseRoom.name) {
          mNum = this.hasChooseRoom.MaxLeftNum;
        }
      }
      // if (mNum >= 1) {
      //     IfData = false;
      // } else {
      //     IfData = true;
      // }

      if (cell.operatingRoomNo == this.hasChooseRoom.name) {
        if (cell.sequence == this.hasChooseRoom.MaxLeftNum + 1) {
          // console.log(this.hasChooseRoom.MaxLeftNum)
          alert('已经是第一台手术了。')
        } else {
          for (var b = 0; b < this.scheduleListRight.length; b++) {
            if (cell.visitId == this.scheduleListRight[b].visitId && cell.patientId == this.scheduleListRight[b].patientId && cell.scheduleId == this.scheduleListRight[b].scheduleId) {

              for (var c = 0; c < this.scheduleListRight.length; c++) {
                if (cell.operatingRoomNo == this.scheduleListRight[c].operatingRoomNo && cell.sequence == this.scheduleListRight[c].sequence + 1) {
                  this.scheduleListRight[b].sequence = this.scheduleListRight[b].sequence - 1;
                  this.scheduleListRight[c].sequence = this.scheduleListRight[c].sequence + 1;
                }
              }
              this.scheduleListRight.sort(this.sortNumber);
            }
          }
          // 
          for (var i = 0; i < this.scheduleListRight.length; i++) {
            if (this.scheduleListRight[i].operatingRoomNo == cell.operatingRoomNo && this.scheduleListRight[i].state == 1) {
              submit.push({
                visitId: this.scheduleListRight[i].visitId,
                sequence: this.scheduleListRight[i].sequence,
                scheduleId: this.scheduleListRight[i].scheduleId,
                patientId: this.scheduleListRight[i].patientId,
              })
            }

          }
          // console.log(submit)
          this.api.updateBatchMedOperationSchedule(submit)
        }


      } else {
        alert('请选择对应手术间！')
      }


    },
    sortNumber(a, b) {
      return a.sequence - b.sequence
    },
    goTaoRight(cell, index) {
      var mNum = '';
      var submit = [];
      // console.log(cell.sequence)
      // console.log(this.pushDataBody)
      // console.log("最后" + this.MaxRightNum)
      // debugger
      for (var c = 0; c < this.roomId.length; c++) {
        if (this.roomId[c].name == this.hasChooseRoom.name) {
          mNum = this.hasChooseRoom.MaxRightNum;
        }
      }

      // console.log(mNum)
      if (cell.operatingRoomNo == this.hasChooseRoom.name) {
        if (cell.sequence == mNum) {
          alert('已经是最后一台手术了。')
        } else {
          // console.log(cell)
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
          // 
          for (var i = 0; i < this.scheduleListRight.length; i++) {
            if (this.scheduleListRight[i].operatingRoomNo == cell.operatingRoomNo && this.scheduleListRight[i].state == 1) {
              submit.push({
                visitId: this.scheduleListRight[i].visitId,
                sequence: this.scheduleListRight[i].sequence,
                scheduleId: this.scheduleListRight[i].scheduleId,
                patientId: this.scheduleListRight[i].patientId,
              })
            }
          }
          this.api.updateBatchMedOperationSchedule(submit)
        }
      } else {
        alert('请选择对应手术间！')
      }
    }
  },
  mounted() {
    this.getRoomNo();
    this.getSupplyNurseList();
    this.area = window;
    let totalWidth = this.plusAll();
    this.$set(this.$data, 'totalWidth', totalWidth)
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

.newSchedulClass {
  border-top: 1px solid #B3B3B3;
  min-height: 28px;
  width: 100%;
  margin: 0 10px;
  display: flex;
}

.newClassDiv {
  width: 105px;
  border-right: 1px solid #B3B3B3;
  height: 100%;
  line-height: 28px;
  box-sizing: border-box;
  padding-left: 5px;
  font-size: 12px;
}

.newClassDiv:last-child {
  border-right: 0;
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

.rows:hover {
  background-color: #A3BDD9;
  cursor: pointer;
}

.cleanBox {
  width: 130px;
  height: auto;
  position: absolute;
  border: 1px solid #BABABA;
  box-shadow: 2px 2px 5px #888;
  background-color: #fff;
  z-index: 99;
  cursor: pointer;
  padding-left: 5px;
}


.cleanLast {
  padding-left: 5px;
  box-shadow: 2px 2px 5px #888;
  background-color: #fff;
}

.cleanLast:hover {
  background-color: #EBEBEB;
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
  height: 731px;
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
  font-size: 12px;
}

.itemChooseContent {
  width: 100%;
  height: 330px;
  background-color: #fff;
  overflow: auto;
}

.itemChooseBox {
  width: 100%;
  height: 299px;
  background-color: #597CA6;
}

.itemBox {
  height: 30px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #0D508B;
  color: #fff;
  line-height: 30px;
  padding-left: 5px;
  font-size: 12px;
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
  min-height: 113px;
  max-height: 165px;
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
  border: 2px solid #95DDB6;
  font-size: 12px;
  margin: 5px 10px;
  width: 250px;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 24px 0 5px;
  height: 99px;
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

.inseide {
  position: fixed;
  width: 140px;
  height: auto;
  top: 37px;
  left: 5px;
  background-color: #F5F7F9;
  border: 1px solid #77A3DC;
  /* box-sizing: border-box; */
  z-index: 9999;
}

.insideHover {
  width: 100%;
  height: 20px;
  color: #222;
  font-size: 12px;
  box-sizing: border-box;
  line-height: 20px;
  padding-left: 5px;
  cursor: pointer;
}

.insideHover:hover {
  background: url('../../assets/hoverBac.jpg');
}

.hoverClass {
  background-color: #A3BDD9;
}

</style>
