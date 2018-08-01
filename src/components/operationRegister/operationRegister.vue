<template>
  <div class="dictionaries">
    <div style="background-color: rgb(227, 239, 255);width: 1214px;z-index: 11;cursor: auto;position: absolute;top: calc(50% - 305px);height: 610px;left: calc(50% - 607px);border:2px solid rgb(54,157,200);z-index: 1;">
      <div class="load_top" style="height: 30px;background-color: rgb(54,157,200);line-height: 30px;">
        <div>术中登记</div>
        <div @click="aboutNone" class="top_active">X</div>
      </div>
      <div style="height: 20px;width: calc(100% - 15px);padding-left: 15px;">
        <span style="font-size: 14px;">麻醉事件</span>
      </div>
      <div style="height: 349px;display:flex;border-bottom:3px solid #7774da;">
        <div style="width:80%;">
          <div style="display: flex;">
            <div style="border:1px solid rgb(177,207,243);background-color:#fff;box-sizing:border-box;font-size:12px;" :style="{minWidth:cell.width+'px'}" v-for="cell in tbconfig">
              {{cell.title}}
            </div>
          </div>
          <div style="width: 100%;border:1px solid #222;overflow-y: auto;height:270px;box-sizing: border-box;background-color:white;" ref="eventContent">
            <div style="min-height: 280px;">
              <div v-for="item in eventList" style="display:flex;" :class="{chooseItem:item.thooseItem}" @keydown.ctrl="pushArray()" @keyup="onlyOne()" @click="clickItem(item)">
                <!-- 判断是否为事件 -->
                <div v-for="cl in tbconfig" v-if="item.ITEM_CLASS!='1'">
                  <div style="height:20px;" v-if="cl.timeEdit">
                    <!-- <input style="height:20px;border:0;display:block;font-size:12px;" @change="getChangeValue(item)" type="datetime-local" :style="{width:(cl.width-2)+'px'}" v-model="item[cl.fieldObj]"> -->
                    <dateTime :class="{selectchooseItem:item.thooseItem}" @change="getChangeValue(item)" style="border:0;display:block;font-size:12px;" :width="cl.width-2" v-model="item[cl.fieldObj]"></dateTime>
                  </div>
                  <div v-else-if="cl.isChixu" class="hideselect">
                    <select :class="{selectchooseItem:item.thooseItem}" style="height:22px;width:65px;display:block;font-size:12px;" v-model="item[cl.fieldObj]" :style="{width:(cl.width)+'px'}" v-on:change="getChangeValue(item)">
                      <option style="background-color: white;" v-bind:value="0">
                        不持续
                      </option>
                      <option style="background-color: white;" v-bind:value="1">
                        持续
                      </option>
                    </select>
                  </div>
                  <div class="hideselect" v-else style="border:1px solid #a9a9a9;box-sizing:border-box;height:100%;" :style="{width:(cl.width)+'px'}">
                    <select :class="{selectchooseItem:item.thooseItem}" v-if="cl.fieldObj == 'ADMINISTRATOR'" v-model="item[cl.fieldObj]" style="border:0;display:inline-block;height:100%;width:100%;height:22px;" @change="getChangeValue(item)">
                      <option style="background-color: white;" v-for="(item,index) in roadList" :value="item.itemName">{{ item.itemName }}</option>
                    </select>
                    <select :class="{selectchooseItem:item.thooseItem}" v-else-if="cl.fieldObj == 'CONCENTRATION_UNIT'" v-model="item[cl.fieldObj]" style="border:0;display:inline-block;height:100%;width:100%;height:22px;" @change="getChangeValue(item)">
                      <option style="background-color: white;" v-for="(item,index) in concentrationList" :value="item.itemName">{{ item.itemName }}</option>
                    </select>
                    <select :class="{selectchooseItem:item.thooseItem}" v-else-if="cl.fieldObj == 'SPEED_UNIT'" v-model="item[cl.fieldObj]" style="border:0;display:inline-block;height:100%;width:100%;height:22px;" @change="getChangeValue(item)">
                      <option style="background-color: white;" v-for="(item,index) in speedUnitList" :value="item.itemName">{{ item.itemName }}</option>
                    </select>
                    <select :class="{selectchooseItem:item.thooseItem}" v-else-if="cl.fieldObj == 'DOSAGE_UNITS'" v-model="item[cl.fieldObj]" style="border:0;display:inline-block;height:100%;width:100%;height:22px;" @change="getChangeValue(item)">
                      <option style="background-color: white;" v-for="(item,index) in dosageUnitsList" :value="item.itemName">{{ item.itemName }}</option>
                    </select>
                    <input v-else style="height:20px;border:0;display:block;font-size:12px;" @change="getChangeValue(item)" type="text" :style="{width:(cl.width-2)+'px'}" v-model="item[cl.fieldObj]">
                  </div>
                </div>
                <!-- 判断是否为事件 -->
                <div v-for="cl in tbconfig" v-if="item.ITEM_CLASS=='1'" class="hideselect">
                  <div v-if="cl.timeEdit">
                    <!-- <input @change="getChangeValue(item)" style="height:20px;border:0;display:block;font-size:12px;" type="datetime-local" :style="{width:(cl.width-2)+'px'}" v-model="item[cl.fieldObj]"> -->
                    <dateTime :class="{selectchooseItem:item.thooseItem}" @change="getChangeValue(item)" style="border:0;display:block;font-size:12px;" :width="cl.width-2" v-model="item[cl.fieldObj]"></dateTime>
                  </div>
                  <div v-else-if="cl.isChixu">
                    <select style="height:22px;width:65px;border:0;display:block;font-size:12px;" disabled="true" v-model="item[cl.fieldObj]" v-on:change="getChangeValue(item)" :style="{width:(cl.width)+'px'}">
                      <option style="background-color: white;" v-bind:value="0">
                        不持续
                      </option>
                      <option style="background-color: white;" v-bind:value="1">
                        持续
                      </option>
                    </select>
                  </div>
                  <div v-else style="border:1px solid #a9a9a9;">
                    <input style="height:20px;border:0;display:block;font-size:12px;" type="text" @change="getChangeValue(item)" :style="{width:(cl.width-2)+'px'}" v-model="item[cl.fieldObj]">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 60px;padding-top: 10px;padding-left:15px;display:flex;justify-content: space-between;box-sizing:border-box;">
            <div style="font-size:12px;">
              <button style="width: 70px;font-size:12px;height:25px;" @click="saveTempletViewFun">保存模板</button>
              <button style="width: 70px;font-size:12px;height:25px;" @click="openTempLet">套用模板</button>
              <span style="padding:20px;">类型筛选</span>
              <select v-model="filterType" @change="selectTypeFun" style="width: 50px;">
                <option value="">
                  全部
                </option>
                <option v-for="option in eventTypeList" v-bind:value="option.typeId">
                  {{ option.typeName }}
                </option>
              </select>
              <div style="color:#4448ff;padding-top:5px;font-sizie:18px;">要删除某时间点，必须要选中行。</div>
            </div>
            <div>
              <button style="margin-right: 20px;width: 70px;font-size:12px;height:25px;" @click='saveBtn'>保存</button>
              <button style="margin-right: 20px;width: 70px;font-size:12px;height:25px;" @click="deleteMedAnesthesiaEvent">删除</button>
              <button style="margin-right: 20px;width: 70px;font-size:12px;height:25px;" @click="selectMedAnesthesiaEventList">取消</button>
            </div>
          </div>
        </div>
        <div style="padding: 0px 5px;">
          <div>
            <div style="height: 120px;flex-wrap:wrap;display: flex;overflow:auto;">
              <button v-for="item in eventTypeList" style="width: 60px;font-size:12px;height:25px;line-height: 25px;text-align: center;margin:5px 5px 0 5px;display:block;" @click="medAnesthesiaEventOpenByItemClass(item)">
                {{item.typeName}}
              </button>
            </div>
            <div style="background-color:#fff;font-size:12px;">
              <div style="display: flex;width:100%;" :class="{width1:widthChange}" v-if="selectTypeTemp.typeId=='2' || selectTypeTemp.typeId=='C'">
                <div style="width: 170px;border:1px solid black;">
                  事件名称
                </div>
                <div style="width: calc(100% - 170px);border:1px solid black;">
                  规格
                </div>
              </div>
              <div v-else style="display: flex;width:100%;" :class="{width1:widthChange}">
                <div style="width: 100%;border:1px solid black;">
                  事件名称
                </div>
              </div>
              <div style="height: 140px;overflow-y: auto;box-sizing:border-box;" v-if="selectTypeTemp.typeId=='2' || selectTypeTemp.typeId=='C'">
                <div v-for="item in eventNameList" style="width: 100%;display: flex" @dblclick="addEvent(item)">
                  <div style="width: 170px;border:1px solid black;">
                    {{item.itemName}}
                  </div>
                  <div style="width: calc(100% - 170px);border:1px solid black;">
                    {{item.itemSpec}}
                  </div>
                </div>
              </div>
              <div v-else style="height: 140px;overflow-y: auto;box-sizing:border-box;">
                <div v-for="item in eventNameList" style="width: 100%;display: flex">
                  <div style="width: 100%;border:1px solid black;" @dblclick="addEvent(item)">
                    {{item.itemName}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="border: 1px solid #686869;width:100%;height:22px;box-sizing:border-box;">
            <input style="width:100%;height:100%;border:0;display:block;line-height:20px;outline:none;" v-model="serchZm" placeholder="无字符过滤" @keyup="serchEvent">
          </div>
        </div>
      </div>
      <div style="height: 25px;padding-left: 15px;">
        <span style="line-height: 25px;font-size:14px;">体征数据</span>
      </div>
      <div style="height: 145px;background-color:#fff;font-size:12px;position: relative;width: 1214px;" ref="signContent">
        <!-- 名称 -->
        <div style="position: absolute;top: 0;left:10px;width: 100px;">
          <div style="width: 100px;height: 18px;font-weight: 600">名称</div>
        </div>
        <!-- 上部时间栏目 -->
        <div ref="timeScroll" style="width: calc(100% - 110px);position: absolute;top:0;left: 100px;overflow:hidden;">
          <div class="flex" :style="{width: signdataList.length*60+'px'}">
            <div v-for="sItem in signdataList" @click="getSignClickData(sItem)">
              <div style="width: 60px;height: 18px;border:1px solid #C1C1C1;box-sizing:border-box;" :class="{chooseClass:sItem.thoose}" :title="sItem.time">
                {{sItem.time | discount}}
              </div>
            </div>
          </div>
        </div>
        <!-- 左侧名称栏目 -->
        <div ref="headTitleScroll" style="position: absolute;top: 18px;left: 10px;;width: 100px;overflow: hidden;" :style="{height:(signdataList.length*60>1114?117:127)+'px'}">
          <div :style="{height:itemNameList.length*22+'px'}">
            <div style="height: 22px;width: 100px;font-weight: 600" v-for="item in itemNameList" @click="getDeleteItem(item)">{{item.itemName}}</div>
          </div>
        </div>
        <!-- 数据内容栏目 -->
        <div ref="dataScroll" style="position: absolute;top: 18px;left: 100px;width: calc(100% - 100px);height: 127px;overflow: auto">
          <div class="flex">
            <div v-for="sItem in signdataList" @click="getSignClickData(sItem)" :class="{blueChooseClass:sItem.thoose}">
              <div v-for="(secItem,index) in sItem.dataValue" style="height: 22px;border:1px solid #c1c1c1;width:60px;box-sizing:border-box;">
                <input :value="secItem" style="width: 100%;background-color:rgba(0,0,0,0);display:block;height:100%;border:0;" @change="signChange($event,index,sItem)">
              </div>
            </div>
          </div>
        </div>
        <!--  <div style="display: flex;padding-left: 10px;">
                            <div>
                              <div style="width: 100px;">名称</div>
                              <div style="height: 22px;width: 100px;" v-for="item in itemNameList" @click="getDeleteItem(item)">{{item.itemName}}</div>
                            </div>
                            <div class="flex">
                              <div v-for="sItem in signdataList" @click="getSignClickData(sItem)">
                                <div style="width: 60px;" :title="sItem.time">
                                  {{sItem.time | discount}}
                                </div>
                                <div v-for="(secItem,index) in sItem.dataValue" style="height: 22px;">
                                  <input :value="secItem" style="width: 60px;" @change="signChange($event,index,sItem)">
                                </div>
                              </div>
                            </div>
                          </div> -->
        <!-- <div class="flex">
                                  <div v-for="(title,index) in titleArr">
                                    <div v-if="index==0" style="width: 100px;">{{title}}</div>
                                    <div v-else style="width: 60px;" :title="title">{{title | discount}}</div>
                                  </div>
                                </div>
                                <div class="flex" style="overflow-y:hidden;overflow-x: auto;">
                                  <div>
                                    <div style="height: 22px;width: 100px;" v-for="name in itemNameList">{{name.itemName}}</div>
                                  </div>
                                  <div>
                                    <div v-for="item in dataArr" class="flex">
                                      <div v-for="data in item">
                                        <input :value="data" style="width: 60px;" @change="signChange($event,index,data)">
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                  </div>
                                </div> -->
      </div>
      <div v-if="signItemView" id="codeSelect" ref="codeSelect" style="position: absolute;bottom:35px;left: 150px;">
        <!-- <select v-model="selected" v-on:change="getSeclectItem">
                          <option v-for="option in allSignItems" v-bind:value="option">
                            {{ option.itemName }}
                          </option>
                        </select> -->
        <div>
          <input ref="inSelect" v-model="serchZmItem" @keyup="serchJmItem">
        </div>
        <div style="padding-left: 5px;z-index: 3;background-color: white;height: 200px;overflow-y: auto;">
          <div class="listIngt" @click="getSeclectItem(option)" v-for="option in showItemList">{{option.itemName}}</div>
        </div>
      </div>
      <div style="margin-top: 5px;padding-left:15px;">
        <button @click="saveSignChange" style="width: 60px;height:25px;font-size:12px;">保存</button>
        <button style="width: 60px;height:25px;font-size:12px;" @click="deleteMedPatientMonitorData">删除</button>
        <button style="width: 60px;height:25px;font-size:12px;" @click="insertView">插入数据</button>
        <button style="width: 60px;height:25px;font-size:12px;" @click="addSignItem">添加项目</button>
        <button style="width: 60px;height:25px;font-size:12px;" @click="deleteSignItem">删除项目</button>
      </div>
      <!-- 插入数据位置 -->
      <div v-if="addView" @click="atherPlacFuntion" style="width:100%;height:100%;position:fixed;z-index:14;top:0;left:0;">
        <div class="addData" @click.stop="noFunction" :class="{animation:clickAtherPlace}">
          <div class="load_top">
            <div style="line-height: 30px;font-size: 18px;color:white;">插入体征数据</div>
            <div @click="insertView" class="top_active">X</div>
          </div>
          <div style="padding: 15px;display:flex;flex-wrap:wrap;height:230px;">
            <div style="display: flex;height:21px;">
              <div style="width: 80px;">开始时间</div>
              <input type="datetime-local" v-model="insertStartTime">
            </div>
            <div style="display:flex;height:21px;">
              <div style="width: 80px;padding-left:69px;">结束时间</div>
              <input type="datetime-local" v-model="insertEndTime">
            </div>
            <div style="display: flex;height:21px;">
              <div style="width: 80px;">时间间隔</div>
              <input type="text" v-model="spaceTime">
              <div style="width:70px;padding-left:5px;">秒</div>
            </div>
            <div style="display: flex;height:21px;" v-for="item in itemNameList">
              <div style="width: 80px;">{{item.itemName}}</div>
              <input v-model="item.itemValue" type="" name="" @change="getaddItem(item)">
              <div style="width:70px;padding-left:5px;">{{item.itemUnit}}</div>
            </div>
          </div>
          <div style="text-align:right;padding-right:15px;">
            <button @click="addItem" style="width: 80px;">确定</button>
            <button @click="insertView" style="width: 80px;">取消</button>
          </div>
        </div>
      </div>
      <!-- 保存模板输入内容 -->
      <div v-if="saveTempletView" style="width: 500px;min-height: 200px;background-color: white;z-index: 3;position: absolute;top: 20%;left: 20%;border:2px solid rgb(61,164,206);">
        <div style="height: 30px;background-color:rgb(47,150,196);color: white;padding-left: 15px;line-height: 30px;">
          <span>保存模板</span>
        </div>
        <div style="padding: 15px;display: flex;">
          <span>麻醉方法:&nbsp;</span>
          <!-- <input type="" name="" style="width: 200px;"> -->
          <inputDiv :conInfo="methodObj" methodName="medAnaesthesiaDictList" attrName="anaesthesiaName" toAttrName="anaesthesiaName"></inputDiv>
        </div>
        <div style="padding: 15px;">
          <span>模板名称:</span>
          <input v-model="templetName" style="width: 200px;">
        </div>
        <div style="padding-left: 15px;">
          <input type="checkbox" name="" v-model="checkState" v-bind:value="checkState">
          <span>是否私有</span>
          <button @click="saveTemplet">保存</button>
          <button @click="cancleSaveTemp">取消</button>
        </div>
      </div>
      <!-- 显示事件模板 -->
      <div style="position: absolute;top: 10%;left: 7%;width: 100%;" v-if="tempLetView.view=='t'">
        <event-templet :tempView="tempLetView" :itemList="eventList"></event-templet>
      </div>
    </div>
  </div>
</template>
<script>
import eventTemplet from '@/components/eventTemplet/eventTemplet.vue';
import inputDiv from '@/components/patientOperationInfo/inputDiv.vue';
import selectModule from '@/components/selectModule/selectModule.vue';
import dateTime from '@/components/plugins/dateTime.vue';
export default {
  data() {
    return {
      dataIn: this.parentToChild.dataInParent,
      keyDown: false,
      tbconfig: [{
        title: "",
        fieldObj: "",
        width: 10
      },
      {
        title: "类型",
        fieldObj: "TYPE_NAME",
        width: 45
      },
      {
        title: "事件名称",
        fieldObj: "ITEM_NAME",
        width: 260
      },
      {
        title: "途径",
        fieldObj: "ADMINISTRATOR",
        width: 60
      },
      {
        title: "浓度",
        fieldObj: "CONCENTRATION",
        width: 45
      },
      {
        title: "单位",
        fieldObj: "CONCENTRATION_UNIT",
        width: 45
      },
      {
        title: "速度",
        fieldObj: "PERFORM_SPEED",
        width: 45
      },
      {
        title: "单位",
        fieldObj: "SPEED_UNIT",
        width: 45
      },
      {
        title: "剂量",
        fieldObj: "DOSAGE",
        width: 45
      },
      {
        title: "单位",
        fieldObj: "DOSAGE_UNITS",
        width: 45
      },
      {
        title: "发生时间",
        fieldObj: "START_TIME",
        timeEdit: true,
        width: 100
      },
      {
        title: "是否持续",
        fieldObj: "DURATIVE_INDICATOR", //1持续 0不持续
        width: 75,
        isChixu: true,
      },
      {
        title: "结束时间",
        fieldObj: "ENDDATE",
        timeEdit: true,
        width: 100
      }
      ],
      eventList: [],
      eventTempList: [],
      eventTypeList: [],
      eventNameList: [],
      newEvenNameList: [],
      selectedItem: [],
      selectTypeTemp: "",
      itemNameList: [],
      signdataList: [],
      changeEvent: [],
      getClickSignData: "",
      addItemList: [],
      insertStartTime: "",
      insertEndTime: "",
      addView: false,
      updateDataList: [],
      spaceTime: 300,
      updateEvent: "",
      deleteTzItem: "",
      allSignItems: [],
      selected: "",
      signItemView: false,
      serchZm: "",
      filterType: "全部",
      tempLetView: { view: 'f' },
      checkState: true,
      methodObj: {
        anaesthesiaName: ""
      },
      templetName: '',
      saveTempletView: false,
      widthChange: false,
      clickAtherPlace: false,
      titleArr: ["名称"],
      dataArr: [],
      roadList: [], //途径列表
      concentrationList: [], //用药浓度列表,
      speedUnitList: [], //速度单位列表
      dosageUnitsList: [], //用药单位列表
      serchZmItem: '',
      showItemList: [],

    }
  },
  methods: {
    noFunction() {

    },
    selectMedAnesthesiaEventList() {
      let params = {
        patientId: this.objectItem.patientId,
        operId: this.objectItem.operId,
        visitId: this.objectItem.visitId
      }
      this.api.selectMedAnesthesiaEventList(params)
        .then(
        res => {
          for (var a = 0; a < res.list.length; a++) {
            this.$set(res.list[a], 'thooseItem', false);
          }
          this.eventList = res.list;
          this.eventTempList = res.list;
          this.selectedItem = [];
        });
    },
    allMedAnesthesiaEventType() {
      let params = {}
      this.api.allMedAnesthesiaEventType(params)
        .then(
        res => {
          this.eventTypeList = res.list;
        });
    },
    //根据类别获取麻醉事件定义
    medAnesthesiaEventOpenByItemClass(item) {
      this.selectTypeTemp = item;
      let params = {
        itemClass: item.typeId
      }
      this.api.medAnesthesiaEventOpenByItemClass(params)
        .then(res => {
          this.eventNameList = res.list;
          if (this.eventNameList.length >= 6) {
            this.widthChange = false;
          } else {
            this.widthChange = true;
          }
          this.newEvenNameList = res.list;
        });
    },
    // 多选
    pushArray() {
      this.keyDown = true;
      console.log(this.keyDown)
    },
    // 恢复单选
    onlyOne() {
      this.keyDown = false;
      console.log(this.keyDown)
    },
    //得到选中的并集麻醉事件记录
    clickItem(item) {
      if (this.keyDown == true) {
        item.thooseItem = true;
        this.selectedItem.push(item);
      } else {
        for (var a = 0; a < this.eventList.length; a++) {
          this.$set(this.eventList[a], 'thooseItem', false);
        }
        item.thooseItem = true;
        this.selectedItem[0] = item;
      }
    },
    //删除病人麻醉事件记录
    deleteMedAnesthesiaEvent() {
      console.log(this.selectedItem)
      if (this.selectedItem.length > 1) {
        var addData = [];
        for (var a = 0; a < this.selectedItem.length; a++) {
          addData.push({
            patientId: this.selectedItem[a].PATIENT_ID,
            visitId: this.selectedItem[a].VISIT_ID,
            operId: this.selectedItem[a].OPER_ID,
            itemNo: this.selectedItem[a].ITEM_NO,
            eventNo: this.selectedItem[a].EVENT_NO
          })
        }
        this.api.deleteBatchMedAnesthesiaEvent(addData)
          .then(
          res => {
            if (res.success) {
              alert("删除成功")
            } else {
              alert("删除失败")
            }
            this.selectMedAnesthesiaEventList();
          })
      } else {
        let params = {
          patientId: this.selectedItem[0].PATIENT_ID,
          visitId: this.selectedItem[0].VISIT_ID,
          operId: this.selectedItem[0].OPER_ID,
          itemNo: this.selectedItem[0].ITEM_NO,
          eventNo: this.selectedItem[0].EVENT_NO
        }
        this.api.deleteMedAnesthesiaEvent(params)
          .then(
          res => {
            if (res.success) {
              alert("删除成功")
            } else {
              alert("删除失败")
            }
            this.selectMedAnesthesiaEventList();
          })
      }

    },
    //双击添加麻醉事件记录
    addEvent(item) {
      var obj = {
        TYPE_NAME: item.typeName,
        PATIENT_ID: this.objectItem.patientId,
        VISIT_ID: this.objectItem.visitId,
        OPER_ID: this.objectItem.operId,
        ITEM_NAME: item.itemName,
        ADMINISTRATOR: item.administrator,
        CONCENTRATION: item.concentration,
        CONCENTRATION_UNIT: item.concentrationUnit,
        PERFORM_SPEED: item.performSpeed,
        SPEED_UNIT: item.speedUnit,
        DOSAGE: item.dosage,
        DOSAGE_UNITS: item.dosageUnits,
        START_TIME: item.startTime,
        ENDDATE: "",
        EVENT_ATTR: item.eventAttr,
        ITEM_CLASS: item.itemClass,
        ITEM_SPEC: item.itemSpec,
        addFlag: true,
        DURATIVE_INDICATOR: 0,
      };
      this.eventList.push(obj);
      this.$nextTick(() => {
        var div = this.$refs.eventContent
        div.scrollTop = div.scrollHeight
      })

    },
    //保存按钮
    saveBtn() {
      if (this.changeEvent.length > 0) {
        let arrs = []
        for (var i = 0; i < this.changeEvent.length; i++) {
          if (this.changeEvent[i].addFlag) {

          } else {
            arrs.push(this.changeEvent[i])
          }
        }
        if (arrs.length > 0) {
          this.api.updateMedAnesthesiaEventBatch(arrs)
            .then(res => {
              this.selectMedAnesthesiaEventList();
              this.changeEvent = [];
              if (res.success) {
                alert("保存成功")
              } else {
                alert("保存失败")
              }

            })
        }

      }
      var list = this.eventList;

      let addParams = [];
      let updateParams = [];
      var arry1 = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].addFlag) {
          let par = {
            patientId: list[i].PATIENT_ID,
            visitId: list[i].VISIT_ID,
            operId: list[i].OPER_ID,
            itemClass: list[i].ITEM_CLASS,
            itemName: list[i].ITEM_NAME,
            itemSpec: list[i].ITEM_SPEC,
            dosageUnits: list[i].DOSAGE_UNITS,
            dosage: list[i].DOSAGE,
            administrator: list[i].ADMINISTRATOR,
            startTime: list[i].START_TIME,
            endDate: list[i].ENDDATE,
            eventNo: 0,
            durativeIndicator: list[i].DURATIVE_INDICATOR,
            concentration: list[i].CONCENTRATION,
            concentrationUnit: list[i].CONCENTRATION_UNIT,
            performSpeed: list[i].PERFORM_SPEED,
            speedUnit: list[i].SPEED_UNIT,
            eventAttr: list[i].EVENT_ATTR

          }
          arry1.push(par)
          // this.api.insertMedAnesthesiaEvent(par)
          //   .then(res => {
          //     this.selectMedAnesthesiaEventList();
          //   })
        }
      }
      if (arry1.length > 0) {
        this.api.insertMedAnesthesiaEventBatch(arry1)
          .then(res => {
            if (res.success) {
              alert("保存成功")
            } else {
              alert("保存失败")
            }
            this.selectMedAnesthesiaEventList();
          })
      }
    },
    getSignName() {
      let params = {
        patientId: this.objectItem.patientId,
        operId: this.objectItem.operId,
        visitId: this.objectItem.visitId,
        eventNo: 0,
      }
      this.api.getSignName(params)
        .then(
        res => {
          if (res.length < 1) {
            this.itemNameList = []
            this.itemNameList.push({
              itemName: "心率",
              itemCode: 40,
            }, {
                itemName: "PULSE",
                itemCode: 44,
              }, {
                itemName: "无创收缩压",
                itemCode: 89,
              }, {
                itemName: "无创舒张压",
                itemCode: 90,
              }, {
                itemName: "呼吸",
                itemCode: 92,
              }, {
                itemName: "SP02",
                itemCode: 188,
              });
            this.getSignTimeData(this.itemNameList.length);
          } else {
            for (var i = 0; i < res.length; i++) {
              res[i].itemValue = "";
            }
            //定义一个排序方法
            let compare = function(prop) {
              return function(obj1, obj2) {
                let val1 = obj1[prop]
                let val2 = obj2[prop]
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                  val1 = Number(val1);
                  val2 = Number(val2);
                }
                if (val1 < val2) {
                  return -1;
                } else if (val1 > val2) {
                  return 1;
                } else {
                  return 0;
                }
              }
            }
            //根据itemcode排序
            this.itemNameList = res.sort(compare("itemCode"));
            this.getSignTimeData(res.length);
          }

        })
    },
    getSignTimeData(len) {
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0
      }
      this.api.getNewTimeData(params)
        .then(res => {
          if (res.length < 1) {
            this.signdataList = [];
            return false
          }
          for (var t = 0; t < res.length; t++) {
            this.$set(res[t], 'thoose', false)
          }
          //对时间进行排序
          res.sort(function(a, b) {
            return Date.parse(a.time) - Date.parse(b.time); //时间正序
          });
          let testArr = []
          res.forEach(itemAll => {
            this.titleArr.push(itemAll.time)
            let arr = []
            this.itemNameList.forEach(item => {
              let num = 0
              itemAll.dataValue.forEach(li => {
                if (item.itemCode == li.ITEM_NAME) {
                  arr.push(li.ITEM_VALUE);
                  num++
                }
              })
              if (num == 0) {
                arr.push('')
              }
            })

            itemAll.dataValue = arr
            testArr.push(arr)
          })

          let a1 = []
          for (var i = 0; i < len; i++) {
            let a2 = []
            testArr.forEach(item => {
              a2.push(item[i])
            })
            a1.push(a2)
          }
          this.dataArr = a1;
          this.signdataList = res;


        })
      return false
      this.api.getSignTimeData(params)
        .then(
        res => {
          var sortArray = [];
          if (res.length < 1)
            return false;
          for (var i = 0; i < res.length; i++) {
            let item = res[i].dataValue;
            item = eval('(' + item + ')');
            //item = JSON.parse(item);
            let xL = len - item.length
            if (xL > 0) {
              for (var j = 0; j < xL; j++) {
                item.push('');
              }
            }
            this.signdataList = sortArray;
          }
        })
    },
    //获取改变的值
    getChangeValue(item) {
      let params = {}
      if (item.addFlag) {
        params = {
          patientId: this.objectItem.patientId,
          operId: this.objectItem.operId,
          visitId: this.objectItem.visitId,
          itemNo: item.ITEM_NO,
          eventNo: item.EVENT_NO,
          itemName: item.ITEM_NAME,
          administrator: item.ADMINISTRATOR,
          concentration: item.CONCENTRATION,
          concentrationUnit: item.CONCENTRATION_UNIT,
          performSpeed: item.PERFORM_SPEED,
          speedUnit: item.SPEED_UNIT,
          dosage: item.DOSAGE,
          dosageUnits: item.DOSAGE_UNITS,
          durativeIndicator: item.DURATIVE_INDICATOR,
          startTime: new Date(item.START_TIME),
          endDate: item.ENDDATE ? new Date(item.ENDDATE) : '',
          addFlag: item.addFlag
        }
      } else {
        params = {
          patientId: this.objectItem.patientId,
          operId: this.objectItem.operId,
          visitId: this.objectItem.visitId,
          itemNo: item.ITEM_NO,
          eventNo: item.EVENT_NO,
          itemName: item.ITEM_NAME,
          administrator: item.ADMINISTRATOR,
          concentration: item.CONCENTRATION,
          concentrationUnit: item.CONCENTRATION_UNIT,
          performSpeed: item.PERFORM_SPEED,
          speedUnit: item.SPEED_UNIT,
          dosage: item.DOSAGE,
          dosageUnits: item.DOSAGE_UNITS,
          durativeIndicator: item.DURATIVE_INDICATOR,
          startTime: new Date(item.START_TIME),
          endDate: item.ENDDATE ? new Date(item.ENDDATE) : '',
        }
      }

      this.changeEvent.push(params);
      this.updateEvent = params;
    },
    //获取生命体征选中列
    getSignClickData(item) {
      this.getClickSignData = item;
      for (var a = 0; a < this.signdataList.length; a++) {
        this.signdataList[a].thoose = false;
      }
      item.thoose = true;

    },
    //删除生命体征某个时间点
    deleteMedPatientMonitorData() {
      if (this.getClickSignData == '') {
        alert("请选择删除的时间点数据")
        return false;
      }
      let params = {
        patientId: this.objectItem.patientId,
        operId: this.objectItem.operId,
        visitId: this.objectItem.visitId,
        eventNo: 0,
        timePoint: this.stringToDate(this.getClickSignData.time),
      }
      this.api.deleteMedPatientMonitorData(params)
        .then(res => {
          if (res.success)
            this.getClickSignData = "";
          this.getSignName();
          alert("删除成功")
        })
    },
    insertView() {
      this.addView = !this.addView;
      if (this.signdataList.length > 0) {
        var lastTime = this.signdataList[this.signdataList.length - 1].time;
        var myDate = new Date();
        var m1 = lastTime.split(" ");
        var m2 = myDate.toLocaleDateString() + " " + m1[1];
        var time = new Date(m2.replace("-", "/"));
        time.setMinutes(time.getMinutes() + 5, time.getSeconds(), 0);
        var time2 = new Date(m2.replace("-", "/"));
        time2.setMinutes(time2.getMinutes() + 10, time2.getSeconds(), 0);
        var nowTime = time.Format("yyyy-MM-dd hh:mm");
        var endTime = time2.Format("yyyy-MM-dd hh:mm");
        this.insertStartTime = this.changeDateFormat(nowTime);
        this.insertEndTime = this.changeDateFormat(endTime);
      } else {
        this.insertStartTime = this.changeDateFormat(new Date().Format("yyyy-MM-dd hh:mm"));
        let endTimeMinute = new Date().getTime() + 5 * 60 * 1000;
        this.insertEndTime = this.changeDateFormat(new Date(endTimeMinute).Format("yyyy-MM-dd hh:mm"));
      }

    },
    //获取插入体征的数据
    getaddItem(item) {
      return
      if (this.insertStartTime && this.insertEndTime) {
        this.addItemList.push({
          patientId: this.objectItem.patientId,
          operId: this.objectItem.operId,
          visitId: this.objectItem.visitId,
          eventNo: 0,
          itemName: item.itemCode,
          itemValue: item.itemValue,
          timePoint: this.datetimeLocalToDate(this.insertStartTime),
          recordingDate: new Date(),
          operator: this.config.userId,
        });
      } else {
        alert("输入时间");
      }
    },
    //点击确定插入体征数据
    addItem() {
      this.itemNameList.forEach(item => {
        if (item.itemValue) {
          this.addItemList.push({
            patientId: this.config.userInfo.patientId,
            operId: this.config.userInfo.operId,
            visitId: this.config.userInfo.visitId,
            eventNo: 0,
            itemName: item.itemCode,
            itemValue: item.itemValue,
            timePoint: this.datetimeLocalToDate(this.insertStartTime),
            recordingDate: new Date(),
            operator: this.config.userId,
          })
        }
      })
      //计算开始时间与结束时间差值单位是毫秒
      var k = parseInt(this.datetimeLocalToDate(this.insertEndTime) - this.datetimeLocalToDate(this.insertStartTime));
      //单位是分钟
      var k1 = parseInt(k / 1000 / 60);
      //与定义时间间隔的倍数
      var k2 = parseInt(k1 / (parseInt(this.spaceTime / 60)));
      //四舍五入
      var k3 = parseInt(k2);
      //获取开始时间为js的date格式
      var time1 = this.datetimeLocalToDate(this.insertStartTime);
      //
      var m1 = this.addItemList.length;
      if (k3 > 0) {
        for (var i = 1; i <= k3; i++) {
          var time2 = new Date(time1.getTime() + parseInt(this.spaceTime / 60) * i * 1000 * 60);
          for (var j = 0; j < m1; j++) {
            this.addItemList.push({
              patientId: this.objectItem.patientId,
              operId: this.objectItem.operId,
              visitId: this.objectItem.visitId,
              eventNo: 0,
              itemName: this.addItemList[j].itemName,
              itemValue: this.addItemList[j].itemValue,
              timePoint: time2,
              recordingDate: new Date(),
              operator: this.config.userId,
            });
          }
        }
      }

      this.api.insertBatchMedPatientMonitorData(this.addItemList)
        .then(res => {
          this.addItemList = [];
          this.addView = !this.addView;
          this.getSignName();
        })
    },
    //
    signChange(e, index, sItem) {
      sItem.dataValue[index] = e.currentTarget.value
      this.updateDataList.push({
        itemName: this.itemNameList[index].itemCode,
        patientId: this.objectItem.patientId,
        operId: this.objectItem.operId,
        visitId: this.objectItem.visitId,
        eventNo: 0,
        timePoint: new Date(sItem.time),
        itemValue: e.currentTarget.value,
        operator: this.config.userId
      });
    },
    //保存修改
    saveSignChange() {
      let params = this.updateDataList;
      this.api.updateMedPatientMonitorDatas(params)
        .then(res => {
          this.getSignName();
          this.updateDataList = [];
        })
    },
    //添加生命体征项目
    addSignItem() {
      this.serchZmItem = ''
      if (this.allSignItems.length == 0) {
        let params = {}
        this.api.selectAllItems(params)
          .then(res => {
            this.allSignItems = res.list;
            this.showItemList = res.list;
            this.signItemView = !this.signItemView;
          })
      } else {
        this.signItemView = !this.signItemView;

      }

    },
    //删除体征项目
    deleteSignItem() {
      if (this.deleteTzItem == '') {
        alert("选择删除项目")
        return false;
      }
      if (this.deleteTzItem.itemCode == 40 || this.deleteTzItem.itemCode == 44 || this.deleteTzItem.itemCode == 92 || this.deleteTzItem.itemCode == 188 ||
        this.deleteTzItem.itemCode == 89 || this.deleteTzItem.itemCode == 90) {
        alert("此项目不能删除")
        return false;
      }
      let params = {
        patientId: this.objectItem.patientId,
        operId: this.objectItem.operId,
        visitId: this.objectItem.visitId,
        eventNo: 0,
        itemName: this.deleteTzItem.itemCode
      }
      this.api.deleteMedPatientMonitorDataCode(params)
        .then(res => {
          this.deleteTzItem = "";
          this.getSignName();
        })
    },
    //获取选中删除的体征项目
    getDeleteItem(item) {
      this.deleteTzItem = item;
    },
    //得到添加生命体征项目
    getSeclectItem(item) {
      this.signItemView = !this.signItemView;
      if (item.itemName) {
        this.itemNameList.push({
          itemName: item.itemName,
          itemCode: item.itemCode,
        });
        // this.$nextTick(() => {
        //   var div = this.refs.signContent;
        //   div.scrollTop = div.scrollHeight
        // })
        this.getSignTimeData(this.itemNameList.length);
        this.selected = [];

      }


    },

    //搜索事件
    serchEvent() {
      var list = this.newEvenNameList;
      var newList = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].nameJm && list[i].nameJm.indexOf(this.serchZm.toUpperCase()) >= 0) {
          newList.push(list[i]);
        }
      }
      this.eventNameList = newList;
    },
    //筛选类型
    selectTypeFun() {
      if (this.filterType == "") {
        this.eventList = this.eventTempList;
      }
      if (this.filterType) {
        var list = this.eventTempList;
        var newList = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].ITEM_CLASS == this.filterType) {
            newList.push(list[i]);
          }
        }
        this.eventList = newList;
      }
    },
    //套用模板
    openTempLet() {
      this.tempLetView.view = 't';
    },
    //打开保存模板界面
    saveTempletViewFun() {
      this.saveTempletView = true;
    },
    //取消保存模板界面
    cancleSaveTemp() {
      this.saveTempletView = false;
      this.methodObj.anaesthesiaName = '';
      this.templetName = '';
      this.checkState = true;
    },
    //保存模板方法
    saveTemplet() {
      var list = this.eventTempList;
      var createBy = '公用';
      if (this.methodObj.anaesthesiaName == "") {
        alert("请选择方法名称");
        return
      }
      if (this.templetName == "") {
        alert("请输入模板名称");
        return
      }
      if (this.checkState) {
        createBy = this.config.userId;
      }
      let params = []
      for (var i = 0; i < list.length; i++) {
        var obj = {
          itemNo: list[i].ITEM_NO,
          createBy: createBy,
          templetClass: 0,
          templet: this.templetName,
          anesthesiaMethod: this.methodObj.anaesthesiaName,
          itemClass: list[i].ITEM_CLASS,
          itemName: list[i].ITEM_NAME,
          itemCode: list[i].ITEM_CODE,
          itemSpec: list[i].ITEM_SPEC,
          concentration: list[i].CONCENTRATION,
          performSpeed: list[i].PERFORM_SPEED,
          speedUnit: list[i].SPEED_UNIT,
          dosage: list[i].DOSAGE,
          dosageUnits: list[i].DOSAGE_UNITS,
          administrator: list[i].ADMINISTRATOR,
          durativeIndicator: list[i].DURATIVE_INDICATOR,
        };
        params.push(obj);
      }
      this.api.insertBtchMedAnesthesiaEventTemplet(params)
        .then(res => {
          if (res.success) {
            alert("保存成功")
          } else {
            alert("保存失败")
          }
          this.cancleSaveTemp();
        })
    },
    //关闭
    aboutNone() {
      this.parentToChild.dataInParent = !this.dataIn;
      this.dataIn = !this.dataIn;
      //触发单子的重新显示
      this.$emit('refreshTime')
    },
    atherPlacFuntion() {
      this.clickAtherPlace = !this.clickAtherPlace;
      setTimeout(() => {
        this.clickAtherPlace = !this.clickAtherPlace;
      }, 1000);
    },
    //获取途径列表
    getRoadList() {
      this.api.getMedAnesthesiaCommDictByItemClass({
        itemClass: '用药途径'
      })
        .then(
        res => {
          this.roadList = res.list;
        });
      this.api.getMedAnesthesiaCommDictByItemClass({
        itemClass: '用药浓度单位'
      })
        .then(
        rest => {
          this.concentrationList = rest.list
        });
      this.api.getMedAnesthesiaCommDictByItemClass({
        itemClass: '用药速度单位'
      })
        .then(
        rs => {
          this.speedUnitList = rs.list
        });
      this.api.getMedAnesthesiaCommDictByItemClass({
        itemClass: '用药单位'
      })
        .then(
        rt => {
          this.dosageUnitsList = rt.list
        });
    },
    serchJmItem() {
      var list = this.allSignItems;
      var m = this.serchZmItem.toUpperCase();
      var newList = [];
      if (m) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].pyjm && list[i].pyjm.indexOf(m) >= 0) {
            newList.push(list[i]);
          }

        }
        this.showItemList = newList;
      } else {
        this.showItemList = list;
      }


    },
  },
  props: ['objectItem', 'parentToChild'],
  computed: {},
  components: {
    eventTemplet,
    inputDiv,
    selectModule,
    dateTime
  },
  mounted() {
    this.selectMedAnesthesiaEventList();
    this.allMedAnesthesiaEventType();
    this.getSignName();
    this.getRoadList();
    //滚动条监听
    let timeScroll = this.$refs.timeScroll;
    let headTitleScroll = this.$refs.headTitleScroll;
    let dataScroll = this.$refs.dataScroll;
    dataScroll.onscroll = () => {
      timeScroll.scrollLeft = dataScroll.scrollLeft
      headTitleScroll.scrollTop = dataScroll.scrollTop

    }

    document.addEventListener('click', (e) => {
      if (this.$refs.codeSelect && !this.$refs.codeSelect.contains(e.target)) {
        this.signItemView = false
        this.serchZmItem = ''
        this.showItemList = this.allSignItems

      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', (e) => { })
  },
}

</script>
<style scoped>
button {
  width: 80px;
  height: 35px;
}

.width1 {
  width: 100% !important;
}

.addData {
  width: 700px;
  min-height: 340px;
  background-color: white;
  z-index: 3;
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 350px);
  border: 2px solid rgb(61, 164, 206);
  box-shadow: 1px 1px 20px #AAA;
  background-color: #E3EFFF;
}

.animation {
  animation: backShadow 0.2s linear;
  animation-iteration-count: 5;
}

@keyframes backShadow {
  25% {
    box-shadow: 1px 1px 20px #AAA;
    border: 2px solid #AAA;
  }
  50% {
    box-shadow: 1px 1px 10px #AAA;
    border: 2px solid rgb(61, 164, 206);
  }
  75% {
    box-shadow: 1px 1px 20px #AAA;
    border: 2px solid #AAA;
  }
  100% {
    box-shadow: 1px 1px 10px #AAA;
    border: 2px solid rgb(61, 164, 206);
  }
}

.chooseItem {}

.chooseItem div,
.chooseItem input {
  background-color: #CCE8FF;
  /* border: 1px solid #A9A9A9; */
}

.selectchooseItem {
  background-color: #CCE8FF;
  /* border: 1px solid #A9A9A9; */
}

.hideselect select {
  /*清除select的边框样式*/
  /*border: none;*/
  /*清除select聚焦时候的边框颜色*/
  /*outline: none;*/
  /*隐藏select的下拉图标*/
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #E3E3E3;
}

::-webkit-scrollbar-thumb {
  background: #C1C1C1;
  border-radius: 2px;
}

.chooseClass {
  background: #C1C1C1;
}

.blueChooseClass {
  background: rgb(50, 153, 255);
}

.listIngt {
  background-color: #fff;
  cursor: pointer;
}

.listIngt:hover {
  background-color: #1E90FF;
  color: #fff;
}
</style>
