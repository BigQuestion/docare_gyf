<template>
  <!-- <div style="position:absolute;z-index:12;cursor:not-allowed;width:100%;height:100%;"> -->
  <div style="cursor:auto;width: 1214px;min-height: 600px;background-color: rgb(228, 240, 255);z-index: 13;border:2px solid rgb(68,170,211);position: absolute;">
    <div class="load_top" style="height: 30px;padding: 0px 10px;background-color:rgb(68,170,211);color: white;">
      <div>模板管理</div>
      <div @click="closeWin" class="top_active">X</div>
    </div>
    <div style="height: 50px;padding-left: 20px;px;border:1px solid rgb(179,207,243);">
      <span style="font-size: 20px;line-height: 50px;">事件模板</span>
    </div>
    <div style="display: flex;height: 450px;background-color: white;">
      <div style="width: 25%;box-sizing:border-box;border:1px solid #97B1D1;">
        <div style="height: 24px;padding-left: 20px;background-color: rgb(228, 240, 255);">
          <span>模板名称</span>
          <button @click="saveTempletViewFun" style="height:22px;width: 60px;font-size:14px;line-height: 22px;">增加</button>
          <button @click="deleteTempMeth" style="height:22px;width: 60px;font-size:14px;line-height: 22px;">删除</button>
        </div>
        <div style="padding-left: 25px;overflow-y: auto;height: 420px;">
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
                      <div @dblclick="changeReadOnly(item,0)" @click="getSelectClass(item,index,0)" style="cursor:pointer;width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
                        {{item.anesthesiaMethod}}
                      </div>
                    </div>
                    <ul style="padding-left: 20px;">
                      <li v-if="item.tempView" v-for="(itemTemp,index1) in item.listTempName" @click="getPublicTempletDetail(itemTemp.templet,item.anesthesiaMethod,0)">
                        <div style="display: flex;align-items: center;">
                          <div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
                          <div @dblclick="changeReadOnly(itemTemp,1)" @click="getSelectClass(itemTemp,index,1)" style="cursor:pointer;width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
                            {{itemTemp.templet}}
                            <!-- <input v-bind:readonly="itemTemp.isReadOnly" v-model="itemTemp.templet" style="width: 98%;border:0;"> -->
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
                      <div @dblclick="changeReadOnly(item,2)" @click="getSelectClass(item,index,2)" style="cursor:pointer;width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
                        {{item.anesthesiaMethod}}
                      </div>
                    </div>
                    <ul style="padding-left: 20px;">
                      <li v-if="item.tempView" v-for="itemTemp in item.listTempName" @click="getPublicTempletDetail(itemTemp.templet,item.anesthesiaMethod,1)">
                        <div style="display: flex;align-items: center;">
                          <div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
                          <div @dblclick="changeReadOnly(itemTemp,3)" @click="getSelectClass(itemTemp,index,3)" style="cursor:pointer;width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
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
      <div @mousedown="downFun()" @mouseup="upFun()" style="width: 75%;overflow-y: auto;box-sizing:border-box;border:1px solid #97B1D1;" ref="eventContent">
        <div style="display: flex;margin-left: 10px;background-color:rgb(228, 240, 255);">
          <div :style="{width:cell.width+'px'}" v-for="cell in contentConfig" style="text-align: center;box-sizing:border-box;border:1px solid #97B1D1;">
            {{cell.title}}
          </div>
        </div>
        <div style="width: 100%;padding-bottom:20px;box-sizing:border-box;">
          <div v-for="(item,index) in tempDetailList" @click="clickItem(item,index)" @mouseleave="outFun(item)" style="display: flex;margin-left: 10px;" :class="{chooseItem:item.chooseItem}">
            <div v-for="cell in contentConfig" style="box-sizing:border-box;border:1px solid #97B1D1;">
              <select :class="{selectchooseItem:item.chooseItem}" v-if="cell.fieldObj=='itemClass'" v-model="item[cell.fieldObj]" :style="{width:cell.width-2+'px'}" style="border:0;display:inline-block;height:100%;width:100%;height:22px;">
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
              <input v-else style="height:20px;border:0;display:block;font-size:13px;text-align: center;" type="text" :style="{width:cell.width-2+'px'}" v-model="item[cell.fieldObj]">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="position: absolute;height: 50px;bottom: 0px;right: 20px;">
      <button @click="updateBatch">保存</button>
      <button @click="addItem">新增</button>
      <button @click="downMove(0)">下移</button>
      <button @click="downMove(1)">上移</button>
      <button @click="deleteTemp">删除</button>
      <button @click="cancal">取消</button>
    </div>
    <!-- 保存模板输入内容 -->
    <div v-if="saveTempletView" style="width: 500px;min-height: 200px;background-color: white;z-index: 3;position: absolute;top: 20%;left: 20%;border:2px solid rgb(61,164,206);">
      <div style="height: 30px;background-color:rgb(47,150,196);color: white;padding-left: 15px;line-height: 30px;">
        <span>保存模板</span>
      </div>
      <div style="padding: 15px;display: flex;">
        <span>麻醉方法:&nbsp;</span>
        <input v-model="methodName" style="width: 200px;">
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
    <!-- 修改模板或者麻醉方法名称 -->
    <div v-if="updateMethodView" style="width: 400px;min-height: 150px;background-color: white;z-index: 3;position: absolute;top: 20%;left: 20%;border:2px solid rgb(61,164,206);">
      <div style="height: 30px;background-color:rgb(47,150,196);color: white;padding-left: 15px;line-height: 30px;">
        <span>修改</span>
      </div>
      <div style="padding: 15px;display: flex;">
        <span>修改值:&nbsp;</span>
        <input v-model="updateStr" style="width: 250px;">
      </div>
      <div style="padding-left: 15px;">
        <button @click="saveUpdateTemplet">保存</button>
        <button @click="cancleUpdateView">取消</button>
      </div>
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
      tempDetailListTwo: [],
      eventTypeList: [], //所有事件类型
      roadList: [], //途径列表
      concentrationList: [], //用药浓度列表,
      speedUnitList: [], //速度单位列表
      dosageUnitsList: [], //用药单位列表
      selectItem: '', //选中模板事件对象
      selectMore: [], //款选模板事件对象
      selectTempName: '', //选中的模板
      selectMethodName: '', //选中的麻醉方法名称
      selectTypeItem: '', //选中的typeid
      createBy: '', //公有或者私有
      checkState: true,
      methodName: '',
      templetName: '',
      saveTempletView: false,
      morClick: false,
      updateMethodView: false, //修改模板名称或者麻醉方法名称
      updateStr: '', //修改模板名称或者方法
      dblClickItem: '',
      updateFlag: '',
      deleteFlag: '',
      getSelectItem: '',
    }

  },
  methods: {
    closeWin() {
      this.$emit('closeWin')
    },
    cancal() {
      this.$emit('closeWin')
      // this.selectItem = '';
      // console.log(this.databodyCopy)
      // for (var a = 0; a < this.databodyCopy.length; a++) {
      //   this.databodyCopy[a].chooseItem = false;
      // }
      // this.tempDetailList = this.databodyCopy

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
    //双击模板名称或者方法
    changeReadOnly(item, flag) {
      this.dblClickItem = item
      this.updateMethodView = true
      this.updateFlag = flag
    },
    cancleUpdateView() {
      this.updateMethodView = false
      this.updateFlag = ''
      this.dblClickItem = ''
      this.updateStr = ''
    },
    getSelectClass(item, index, flag) {
      this.deleteFlag = flag
      this.getSelectItem = item
      item.chooseItem = true;
      // this.$set(this.publicNameList, index, item);
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
              res.list.forEach(item => {
                item.isReadOnly = true
              })
              temp[i].listTempName = res.list;
              temp[i].tempView = true;
              temp[i].chooseItem = false;
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
      this.selectTemp = tempLetName
      this.selectMethodName = methodName
      this.selectTypeItem = typeItem;
      let params = {
        templet: tempLetName,
        anesthesiaMethod: methodName,
        createBy: ''
      }
      //typeItem---0表示公用，1表示私有
      if (typeItem == 0) {
        params.createBy = '公用'
        this.createBy = '公用'
      }
      if (typeItem == 1) {
        params.createBy = this.config.userId;
        this.createBy = this.config.userId
      }

      this.api.getTempletDetail(params)
        .then(res => {
          for (var a = 0; a < res.list.length; a++) {
            this.$set(res.list[a], 'chooseItem', false);
            res.list[a].orderBy = a + 1
          }
          this.tempDetailList = res.list;
          // this.databodyCopy = res.list;
        })
    },


    allMedAnesthesiaEventType() {
      let params = {}
      this.api.allMedAnesthesiaEventType(params)
        .then(
          res => {
            this.eventTypeList = res.list;
          });
    },


    updateBatch() {
      let insertArr = []
      let updateArr = []
      for (var i = 0; i < this.tempDetailList.length; i++) {
        if (this.tempDetailList[i].addFlag) {
          insertArr.push(this.tempDetailList[i])
        } else {
          updateArr.push(this.tempDetailList[i])
        }
      }
      this.api.updateBatch(updateArr)
        .then(res => {
          if (res.success)
            alert("保存成功")
          this.getPublicTempletDetail(this.selectTemp, this.selectMethodName, this.selectTypeItem)
        })
      if (insertArr.length > 0) {
        this.api.insertBtchMedAnesthesiaEventTemplet(insertArr)
          .then(res => {

          })
      }
    },
    // 鼠标点击判断是否持续
    downFun() {
      for (var i = 0; i < this.tempDetailList.length; i++) {
        this.tempDetailList[i].chooseItem = false;
      }
      this.morClick = true;
      // this.selectMore = [];
    },
    // 松开多选点击
    upFun() {
      this.morClick = false;
    },
    // 鼠标位移多个item判断是否多选
    outFun(item) {
      if (this.morClick && item.chooseItem == false) {
        this.selectItem = '';
        this.selectMore.push(item)
        item.chooseItem = true;
      }
    },
    //得到选中的并集麻醉事件记录
    clickItem(item, index) {
      for (var a = 0; a < this.tempDetailList.length; a++) {
        this.$set(this.tempDetailList[a], 'chooseItem', false);
      }
      item.index = index;
      item.chooseItem = true;
      this.selectMore = [];
      this.selectItem = item;
    },
    //新增模板事件
    addItem() {
      this.tempDetailList.push({
        itemClass: '',
        itemName: '',
        chooseItem: false,
        administrator: '',
        concentration: '',
        concentrationUnit: '',
        performSpeed: '',
        speedUnit: '',
        dosage: '',
        dosageUnits: '',
        addFlag: true,
        orderBy: this.tempDetailList.length + 1,
        templet: this.selectTemp,
        itemNo: new Date().getTime(),
        anesthesiaMethod: this.selectMethodName,
        createBy: this.createBy,
      })
      this.$nextTick(() => {
        var div = this.$refs.eventContent
        div.scrollTop = div.scrollHeight
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
            this.tempDetailList = this.swapArray(this.tempDetailList, this.selectItem.index, this.selectItem.index + 1, flag);
          } else {
            alert('已经处于置底，无法下移');
          }
        }
        if (flag == 1) {
          if (this.selectItem.index != 0) {
            this.tempDetailList = this.swapArray(this.tempDetailList, this.selectItem.index, this.selectItem.index - 1, flag);
          } else {
            alert('已经处于置顶，无法上移');
          }
        }

      }
    },

    swapArray(arr, index1, index2, flag) {
      console.log(arr[index1])
      //移动前
      if (flag == 0) {
        arr[index1].orderBy = arr[index1].orderBy + 1
      }
      if (flag == 1) {
        arr[index1].orderBy = arr[index1].orderBy - 1
      }
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      //移动后
      if (flag == 0) {
        arr[index1].orderBy = arr[index1].orderBy - 1
      }
      if (flag == 1) {
        arr[index1].orderBy = arr[index1].orderBy + 1
      }
      console.log(arr[index1])
      this.selectItem.index = index2
      return arr;
    },
    //删除
    deleteTemp() {
      let par = '';
      let parSd = [];
      console.log(this.selectItem)
      console.log(this.selectMore)
      if (this.selectItem == '' && this.selectMore.length > 0) {
        for (var a = 0; a < this.selectMore.length; a++) {
          if (this.selectMore[a].addFlag) {
            for (var b = 0; b < this.tempDetailList.length; b++) {
              if (this.selectMore[a] == this.tempDetailList[b]) {
                this.tempDetailList.splice(b, 1);
              }
            }
          } else {
            parSd.push(this.selectMore[a])
          }
        }
        if (parSd.length > 0) {
          this.api.deleteBatchTemplet(parSd)
            .then(res => {
              if (res.success) {
                alert("删除成功")
                this.getPublicTempletDetail(this.selectTemp, this.selectMethodName, this.selectTypeItem)
              }
            })
        }
      } else {
        if (this.selectItem.addFlag) {
          for (var b = 0; b < this.tempDetailList.length; b++) {
            if (this.selectItem == this.tempDetailList[b]) {
              this.tempDetailList.splice(b, 1);
            }
          }
        } else {
          par = this.selectItem;
          this.api.deleteMedAnesthesiaEventTemplet(par)
            .then(res => {
              if (res.success) {
                alert("删除成功")
                this.getPublicTempletDetail(this.selectTemp, this.selectMethodName, this.selectTypeItem)
              }
            })
        }
      }



    },
    //取消保存模板界面
    cancleSaveTemp() {
      this.saveTempletView = false;
      this.methodName = '';
      this.templetName = '';
      this.checkState = true;
    },
    //打开保存模板界面
    saveTempletViewFun() {
      this.saveTempletView = true;
    },
    //保存模板方法
    saveTemplet() {
      var createBy = '公用';
      if (this.methodName == "") {
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
      params.push({
        itemClass: '',
        itemName: '',
        administrator: '',
        concentration: '',
        concentrationUnit: '',
        performSpeed: '',
        speedUnit: '',
        dosage: '',
        dosageUnits: '',
        orderBy: 1,
        templet: this.templetName,
        itemNo: new Date().getTime(),
        anesthesiaMethod: this.methodName,
        createBy: createBy,
      });
      this.api.insertBtchMedAnesthesiaEventTemplet(params)
        .then(res => {
          if (res.success) {
            alert("保存成功")
            this.getMethodNames();
          } else {
            alert("保存失败")
          }
          this.cancleSaveTemp();
        })
    },
    //保存修改模板名称或者方法
    saveUpdateTemplet() {
      if (!this.updateStr) {
        alert("修改内容不能为空")
        return false
      }
      let par = {}
      console.log(this.dblClickItem)
      if (this.updateFlag == 0) {
        par = {
          createBy: '公用',
          updateMethod: this.updateStr,
          anesthesiaMethod: this.dblClickItem.anesthesiaMethod
        }
      }
      if (this.updateFlag == 1) {
        par = {
          createBy: '公用',
          updateTemplet: this.updateStr,
          templet: this.dblClickItem.templet
        }
      }
      if (this.updateFlag == 2) {
        par = {
          createBy: this.config.userId,
          updateMethod: this.updateStr,
          anesthesiaMethod: this.dblClickItem.anesthesiaMethod
        }
      }
      if (this.updateFlag == 3) {
        par = {
          createBy: this.config.userId,
          updateTemplet: this.updateStr,
          templet: this.dblClickItem.templet
        }
      }
      this.api.updateMethodTemp(par)
        .then(res => {
          if (res.success) {
            alert("修改成功")
            this.getMethodNames();
          } else {
            alert("修改失败")
          }
          this.cancleUpdateView();
        })
    },
    //删除模板或者方法
    deleteTempMeth() {
      let par = {}
      if (this.deleteFlag == 0) {
        par = {
          createBy: '公用',
          anesthesiaMethod: this.getSelectItem.anesthesiaMethod
        }
      }
      if (this.deleteFlag == 1) {
        par = {
          createBy: '公用',
          templet: this.getSelectItem.templet
        }
      }
      if (this.deleteFlag == 2) {
        par = {
          createBy: this.config.userId,
          anesthesiaMethod: this.getSelectItem.anesthesiaMethod
        }
      }
      if (this.deleteFlag == 3) {
        par = {
          createBy: this.config.userId,
          templet: this.getSelectItem.templet
        }
      }
      this.api.deleteTempMethod(par)
        .then(res => {
          if (res.success) {
            alert("删除成功")
            this.getMethodNames();
          } else {
            alert("删除失败")
          }
          this.getSelectItem = ''

        })
    },


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

.chooseItemDiv {
  background-color: #CCE8FF;
  /* border: 1px solid #A9A9A9; */
}

</style>
