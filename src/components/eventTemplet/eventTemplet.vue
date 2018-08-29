<template>
  <!-- <div style="position:absolute;z-index:12;cursor:not-allowed;width:100%;height:100%;"> -->
  <div style="cursor:auto;width:100%;min-height: 600px;background-color: rgb(228, 240, 255);z-index: 13;border:2px solid rgb(68,170,211);position: absolute;">
    <div class="load_top" style="height: 30px;padding: 0px 10px;background-color:rgb(68,170,211);color: white;">
      <div>套用模板</div>
      <div @click="closeWin" class="top_active">X</div>
    </div>
    <div style="height: 50px;padding-left: 20px;px;border:1px solid rgb(179,207,243);">
      <span style="font-size: 20px;line-height: 50px;">事件模板</span>
    </div>
    <div style="display: flex;height: 450px;background-color: white;">
      <div style="width: 25%;overflow-y: auto;box-sizing:border-box;border:1px solid #97B1D1;">
        <div style="height: 20px;padding-left: 20px;background-color: rgb(228, 240, 255);">
          <span>模板名称</span>
        </div>
        <div style="padding-left: 25px;">
          <div>
            <span>麻醉事件模板</span>
          </div>
          <ul style="padding-left: 15px;">
            <li>
              <ul>
                <div>
                  公用
                </div>
                <ul style="padding-left: 10px;">
                  <li v-for="(item,index) in publicNameList">
                    <div style="display: flex;align-items: center;">
                      <div @click="getPublicTempletNames(item,index)" style="background-color: grey;color: white;cursor:pointer;height: 12px;line-height: 12px;width: 12px;text-align: center;">
                        +
                      </div>
                      <div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
                      <div style="width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
                        {{item.anesthesiaMethod}}
                      </div>
                    </div>
                    <ul style="padding-left: 20px;">
                      <li v-if="item.tempView" v-for="itemTemp in item.listTempName" @click="getPublicTempletDetail(itemTemp.templet,item.anesthesiaMethod,0)">
                        <div style="display: flex;align-items: center;">
                          <div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
                          <div style="cursor:pointer;width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
                            {{itemTemp.templet}}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </ul>
            </li>
            <li>
              <ul>
                <div>私有</div>
                <ul style="padding-left: 10px;">
                  <li v-for="(item,index) in privateNameList">
                    <div style="display: flex;align-items: center;">
                      <div @click="getPrivateTempletNames(item,index)" style="background-color: grey;color: white;cursor:pointer;height: 12px;line-height: 12px;width: 12px;text-align: center;">
                        +
                      </div>
                      <div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
                      <div style="width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
                        {{item.anesthesiaMethod}}
                      </div>
                    </div>
                    <ul style="padding-left: 20px;">
                      <li v-if="item.tempView" v-for="itemTemp in item.listTempName" @click="getPublicTempletDetail(itemTemp.templet,item.anesthesiaMethod,1)">
                        <div style="display: flex;align-items: center;">
                          <div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
                          <div style="cursor:pointer;width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
                            {{itemTemp.templet}}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div style="width: 75%;overflow-y: auto;box-sizing:border-box;border:1px solid #97B1D1;">
        <div style="display: flex;margin-left: 10px;background-color:rgb(228, 240, 255);">
          <div :style="{width:cell.width+'px'}" v-for="cell in contentConfig" style="box-sizing:border-box;border:1px solid #97B1D1;">
            {{cell.title}}
          </div>
        </div>
        <div>
          <div v-for="item in tempDetailList" style="display: flex;margin-left: 10px;">
            <div v-for="cell in contentConfig" :style="{width:cell.width+'px'}" style="box-sizing:border-box;border:1px solid #97B1D1;">
              {{item[cell.fieldObj]}}
            </div>
          </div>
        </div>
      </div> -->
      <div style="width: 75%;overflow-y: auto;box-sizing:border-box;border:1px solid #97B1D1;">
        <div style="display: flex;margin-left: 10px;background-color:rgb(228, 240, 255);">
          <div :style="{width:cell.width+'px'}" v-for="cell in contentConfig" style="text-align: center;box-sizing:border-box;border:1px solid #97B1D1;">
            {{cell.title}}
          </div>
        </div>
        <div style="width: 100%;">
          <div v-for="(item,index) in tempDetailList" @click="clickItem(item,index)" style="display: flex;margin-left: 10px;" :class="{chooseItem:item.chooseItem}">
            <div v-for="cell in contentConfig" style="box-sizing:border-box;border:1px solid #97B1D1;">
              <select :class="{selectchooseItem:item.chooseItem}" v-if="cell.fieldObj=='itemClass'" @change="changeItem(item)" v-model="item[cell.fieldObj]" :style="{width:cell.width-2+'px'}" style="border:0;display:inline-block;height:100%;width:100%;height:22px;">
                <option v-for="option in eventTypeList" v-bind:value="option.typeId">
                  {{ option.typeName }}
                </option>
              </select>
              <select :class="{selectchooseItem:item.chooseItem}" :style="{width:cell.width-2+'px'}" v-else-if="cell.fieldObj == 'administrator'" v-model="item[cell.fieldObj]" style="border:0;display:inline-block;height:100%;width:100%;height:22px;">
                <option value=""></option>
                <option :style="{width:cell.width-2+'px'}" style="background-color: white;" v-for="(item,index) in roadList" :value="item.itemName">{{ item.itemName }}</option>
              </select>
              <select :class="{selectchooseItem:item.chooseItem}" :style="{width:cell.width-2+'px'}" v-else-if="cell.fieldObj == 'concentrationUnit'" v-model="item[cell.fieldObj]" style="border:0;display:inline-block;height:100%;width:100%;height:22px;">
                <option value=""></option>
                <option style="background-color: white;" v-for="(item,index) in concentrationList" :value="item.itemName">{{ item.itemName }}</option>
              </select>
              <select :class="{selectchooseItem:item.chooseItem}" :style="{width:cell.width-2+'px'}" v-else-if="cell.fieldObj == 'speedUnit'" v-model="item[cell.fieldObj]" style="border:0;display:inline-block;height:100%;width:100%;height:22px;">
                <option value=""></option>
                <option style="background-color: white;" v-for="(item,index) in speedUnitList" :value="item.itemName">{{ item.itemName }}</option>
              </select>
              <select :class="{selectchooseItem:item.chooseItem}" :style="{width:cell.width-2+'px'}" v-else-if="cell.fieldObj == 'dosageUnits'" v-model="item[cell.fieldObj]" style="border:0;display:inline-block;height:100%;width:100%;height:22px;">
                <option value=""></option>
                <option style="background-color: white;" v-for="(item,index) in dosageUnitsList" :value="item.itemName">{{ item.itemName }}</option>
              </select>
              <!--  <div v-else-if="cell.fieldObj=='itemNo'">
                <input readonly="readonly" style="height:20px;border:0;display:block;font-size:13px;text-align: center;" type="text" :style="{width:(cell.width-2)+'px'}" v-model="item[cell.fieldObj]">
              </div> -->
              <input v-else @change="changeItem(item)" style="height:20px;border:0;display:block;font-size:13px;text-align: center;" type="text" :style="{width:cell.width-2+'px'}" v-model="item[cell.fieldObj]">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="position: absolute;height: 50px;bottom: 0px;padding-left: 20px;">
      <input type="checkbox" name="" :checked="state" @click="getSelectState">
      <span>不套用剂量</span>
      <button @click="closeWin">取消</button>
      <button @click="selectTemplet">套用模板</button>
      <!-- <button @click="deleteTemplet">删除模板</button> -->
      <button @click="updateBatch">保存</button>
      <button @click="addItem">新增</button>
      <button @click="downMove(0)">下移</button>
      <button @click="downMove(1)">上移</button>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      contentConfig: [
        // {
        //     title: '序号',
        //     fieldObj: 'itemNo',
        //     width: '40'
        //   },
        {
          title: '类型',
          fieldObj: 'itemClass',
          width: '60'
        },
        {
          title: '事件名称',
          fieldObj: 'itemName',
          width: '350'
        },
        {
          title: '途径',
          fieldObj: 'administrator',
          width: '90'
        },
        {
          title: '浓度',
          fieldObj: 'concentration',
          width: '50'
        },
        {
          title: '单位',
          fieldObj: 'concentrationUnit',
          width: '60'
        },
        {
          title: '速度',
          fieldObj: 'performSpeed',
          width: '45'
        },
        {
          title: '单位',
          fieldObj: 'speedUnit',
          width: '90'
        },
        {
          title: '剂量',
          fieldObj: 'dosage',
          width: '50'
        },
        {
          title: '单位',
          fieldObj: 'dosageUnits',
          width: '80'
        }
      ],
      publicNameList: [],
      privateNameList: [],
      publicTempNameList: [],
      privateTempNameList: [],
      tempDetailList: [],
      state: false,
      eventTypeList: [], //所有事件类型
      roadList: [], //途径列表
      concentrationList: [], //用药浓度列表,
      speedUnitList: [], //速度单位列表
      dosageUnitsList: [], //用药单位列表
      selectItem: '', //选中对象

    }

  },
  methods: {
    closeWin() {
      this.tempView.view = 'f';
    },
    //获取所有模板的麻醉方法 
    getMethodNames() {
      let params = {
        createBy: '公用'
      }
      this.api.getMethodNames(params)
        .then(res => {
          this.publicNameList = res.list;
          this.getAllPublicTempName(res.list);
        })


      let params1 = {
        createBy: this.config.userId
      }
      this.api.getMethodNames(params1)
        .then(res => {
          this.privateNameList = res.list;
          this.getAllPrivateTempName(res.list)
        })
    },
    //获取模板名称
    getPublicTempletNames(item, index) {
      item.tempView = !item.tempView;
      this.$set(this.publicNameList, index, item);
    },
    //获取模板名称
    getPrivateTempletNames(item, index) {
      item.tempView = !item.tempView;
      this.$set(this.privateNameList, index, item);
    },
    //获取公用模板名称
    getAllPublicTempName(listItem) {
      var temp = listItem
      if (listItem.length > 0) {
        for (let i = 0; i < listItem.length; i++) {
          let params = {
            anesthesiaMethod: listItem[i].anesthesiaMethod,
            createBy: '公用'
          }
          this.api.getTempletNames(params)
            .then(res => {
              temp[i].listTempName = res.list;
              temp[i].tempView = true;
              this.$set(this.publicNameList, i, temp[i]);
            })
        }
      }
    },
    //获取私有的模板名称
    getAllPrivateTempName(listItem) {
      var temp = listItem
      if (listItem.length > 0) {
        for (let i = 0; i < listItem.length; i++) {
          let params = {
            anesthesiaMethod: listItem[i].anesthesiaMethod,
            createBy: this.config.userId
          }
          this.api.getTempletNames(params)
            .then(res => {
              temp[i].listTempName = res.list;
              temp[i].tempView = true;
              this.$set(this.privateNameList, i, temp[i]);
            })
        }
      }
    },

    //获取模板的详细内容
    getPublicTempletDetail(tempLetName, methodName, typeItem) {
      let params = {
        templet: tempLetName,
        anesthesiaMethod: methodName,
        createBy: ''
      }
      //typeItem---0表示公用，1表示私有
      if (typeItem == 0) {
        params.createBy = '公用'
      }
      if (typeItem == 1) {
        params.createBy = this.config.userId;
      }
      this.api.getTempletDetail(params)
        .then(res => {
          for (var a = 0; a < res.list.length; a++) {
            this.$set(res.list[a], 'chooseItem', false);
          }
          this.tempDetailList = res.list;
        })
    },
    //套用模板
    selectTemplet() {
      var list = this.tempDetailList;
      if (this.state) {
        for (var i = 0; i < list.length; i++) {
          var obj = {
            TYPE_NAME: list[i].itemTypeName,
            PATIENT_ID: this.config.userInfo.patientId,
            VISIT_ID: this.config.userInfo.visitId,
            OPER_ID: this.config.userInfo.operId,
            ITEM_NAME: list[i].itemName,
            ADMINISTRATOR: list[i].administrator,
            CONCENTRATION: list[i].concentration,
            CONCENTRATION_UNIT: list[i].concentrationUnit,
            PERFORM_SPEED: list[i].performSpeed,
            SPEED_UNIT: list[i].speedUnit,
            DOSAGE: "",
            DOSAGE_UNITS: list[i].dosageUnits,
            START_TIME: "",
            ENDDATE: "",
            ITEM_CLASS: list[i].itemClass,
            ITEM_SPEC: list[i].itemSpec,
            addFlag: true,
            DURATIVE_INDICATOR: 0,
          };
          this.itemList.push(obj);
          this.tempView.view = 'f';
        }
      } else {
        for (var i = 0; i < list.length; i++) {
          var obj = {
            TYPE_NAME: list[i].itemTypeName,
            PATIENT_ID: this.config.userInfo.patientId,
            VISIT_ID: this.config.userInfo.visitId,
            OPER_ID: this.config.userInfo.operId,
            ITEM_NAME: list[i].itemName,
            ADMINISTRATOR: list[i].administrator,
            CONCENTRATION: list[i].concentration,
            CONCENTRATION_UNIT: list[i].concentrationUnit,
            PERFORM_SPEED: list[i].performSpeed,
            SPEED_UNIT: list[i].speedUnit,
            DOSAGE: list[i].dosage,
            DOSAGE_UNITS: list[i].dosageUnits,
            START_TIME: "",
            ENDDATE: "",
            ITEM_CLASS: list[i].itemClass,
            ITEM_SPEC: list[i].itemSpec,
            addFlag: true,
            DURATIVE_INDICATOR: 0,
          };
          this.itemList.push(obj);
          this.tempView.view = 'f';
        }
      }

    },

    //是否套用剂量
    getSelectState() {
      this.state = !this.state;
    },

    allMedAnesthesiaEventType() {
      let params = {}
      this.api.allMedAnesthesiaEventType(params)
        .then(
          res => {
            this.eventTypeList = res.list;
          });
    },

    changeItem(item) {

    },

    updateBatch() {
      this.api.updateBatch(this.tempDetailList)
        .then(res => {
          if (res.success)
            alert("保存成功")
        })
    },

    //得到选中的并集麻醉事件记录
    clickItem(item, index) {
      for (var a = 0; a < this.tempDetailList.length; a++) {
        this.$set(this.tempDetailList[a], 'chooseItem', false);
      }
      item.index = index;
      item.chooseItem = true;
      this.selectItem = item;
    },
    //新增模板事件
    addItem() {
      this.tempDetailList.push({
        itemClass: '',
        itemName: '',
        administrator: '',
        concentration: '',
        concentrationUnit: '',
        performSpeed: '',
        speedUnit: '',
        dosage: '',
        dosageUnits: '',
        addFlag: true,
      })
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
    //向下移动
    downMove(flag) {
      if (this.selectItem) {
        if (flag == 0) {
          if (this.selectItem.index + 1 != this.tempDetailList.length) {
            this.tempDetailList = this.swapArray(this.tempDetailList, this.selectItem.index, this.selectItem.index + 1);
          } else {
            alert('已经处于置底，无法下移');
          }
        }
        if (flag == 1) {
          if (this.selectItem.index != 0) {
            this.tempDetailList = this.swapArray(this.tempDetailList, this.selectItem.index, this.selectItem.index - 1);
          } else {
            alert('已经处于置顶，无法上移');
          }
        }

      }
    },

    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      this.selectItem.index = index2
      return arr;
    }


  },
  computed: {

  },
  props: ['tempView', 'itemList'],
  mounted() {
    this.getMethodNames();
    this.allMedAnesthesiaEventType();
    this.getRoadList();

  }
}

</script>
<style scoped>
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

</style>
