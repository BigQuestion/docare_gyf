<template>
  <div>
    <div v-if="printView" style="border:1px solid;overflow-y: auto" :style="{width:object.width+'px',height:object.height+'px'}">
      <div v-if="!page">
        <table style="border-collapse:collapse;width: 100%;" border="1" cellspacing="0" cellpadding="0">
          <thead>
            <th v-for="item in titileList" style="white-space:nowrap;font-weight: normal;overflow:hidden;font-size: 10.5pt;font-family: SimSun;height: 35px;" :style="{width:item.columnWidth+'px'}">{{item.columnTitleName}}</th>
          </thead>
          <tbody v-if="!printView">
            <tr v-for="(item,index) in rows" style="height: 15pt;">
              <td v-for="(de,index2) in titileList">
                <div style="    font-family:  Arial;">{{testList[index][index2].positionValue}}</div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(item,index) in rows">
              <td v-for="(de,index2) in titileList">
                <input v-if="testList.length" style="width: 100%;height: 20px;border:none;" :value="testList[index][index2].positionValue" @change="getChangeList($event,index,index2)">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else style="border:1px solid;overflow-y: auto;height: auto;" :style="{width:object.width+'px'}">
      <div v-if="!page">
        <table style="border-collapse:collapse;width: 100%;" border="1" cellspacing="0" cellpadding="0">
          <thead>
            <th v-for="item in titileList" style="white-space:nowrap;font-weight: normal;overflow:hidden;font-size: 10.5pt;font-family: SimSun;height: 35px;" :style="{width:item.columnWidth+'px'}">{{item.columnTitleName}}</th>
          </thead>
          <tbody v-if="!printView">
            <tr v-for="(item,index) in rows" style="height: 15pt;">
              <td v-for="(de,index2) in titileList">
                <div style="font-family:  Arial;" v-if="testList[index][index2]!=''">{{testList[index][index2].positionValue}}</div>
                <div v-else style=" font-family:  Arial;">/</div>
              </td>
            </tr>
          </tbody>
          <!--  <tbody v-else>
                <tr v-for="(item,index) in rows">
                  <td v-for="(de,index2) in titileList">
                    <input v-if="testList.length" style="width: 100%;height: 20px;border:none;" :value="testList[index][index2].positionValue" @change="getChangeList($event,index,index2)">
                  </td>
                </tr>
              </tbody> -->
        </table>
      </div>
    </div>
    <div v-if="saveTempView" style="position:fixed;top: 40%;left: 40%;border:1px solid rgb(47, 150, 196);width: 350px;height: 120px;background-color: white;">
      <div style="height: 30px;background-color: rgb(47, 150, 196);color: white;padding: 0px 10px;line-height: 30px;">保存模板</div>
      <div style="padding: 10px 20px;">
        应用模板名称：
        <input type="" name="" v-model="templateName">
      </div>
      <div style="position: absolute;bottom: 10px;left: 20px">
        <button @click="saveTempalteFun">确定</button>
        <button @click="openSaveView">取消</button>
      </div>
    </div>
    <div v-if="applyTemplateView" class="mask">
      <div class="infoModal">
        <div class="modalHead">
          <span>应用模板</span>
          <div @click="openTempView" class="font_active">X</div>
        </div>
        <div style="height: calc(100% - 90px);overflow: auto;border: 1px solid #191A1C;box-sizing: border-box;margin: 5px;padding:3px;">
          <ul>
            <li v-for="item in tempNameList" @click="chooseTemp(item)">
              <div style="min-height: 20px;">
                {{item.templateName}}
              </div>
            </li>
          </ul>
        </div>
        <div style="height: 50px;width: 100%;vertical-align: center;text-align:right;box-sizing:border-box;padding-right:5px;">
          <button @click="applyTemplate" style="margin-top: 15px;margin-left: 15px;">套用</button>
          <button @click="openTempView">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Bus from '@/bus.js';
export default {
  data() {
    return {
      titileList: [],
      rows: 30,
      rowsList: [],
      dataList: [],
      testList: [],
      updateDataList: [], //修改数据
      insertDataList: [], //插入数据
      isNullArry: [], //病人是否存在数据
      defaultArry: [], //表格默认数组
      dataAllList: [],
      maxY: 0, //Y坐标最大值
      printView: true,
      saveTempView: false,
      templateName: '',
      applyTemplateView: false,
      tempNameList: [],
      chooseItem: {},

    }
  },
  props: ['object', 'page'],
  methods: {
    selectQiXieTitle() {
      let params = {}
      this.api.selectQiXieTitle(params)
        .then(res => {
          this.titileList = res;
        })

      let params1 = {
        patientId: this.config.userInfo.patientId,
        visitId: this.config.userInfo.visitId,
        operId: this.config.userInfo.operId
      }

      //查询病人
      this.api.getPatientQiXieList(params1)
        .then(rest => {
          this.isNullArry = rest;
          if (rest.length > 0) {
            this.dataChange(rest);
          } else {
            this.selectAllListMedQiXieDefaultCulumn();
          }

        })

    },
    dataInit() {
      this.selectQiXieTitle();

    },
    dataChange(list1) {
      this.dataAllList = list1;
      this.findMax(0);
      if (this.maxY + 1 >= this.rows) {
        this.rows = this.maxY + 2;
      }
      let tArray = new Array(); //先声明一维
      for (var k = 0; k < this.rows; k++) { //一维长度为i,i为变量，可以根据实际情况改变

        tArray[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；

        for (var j = 0; j < 10; j++) { //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；

          tArray[k][j] = ""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
        }
      }
      list1.forEach(item => {
        tArray[item.yPosition][item.xPosition] = item
      })

      this.testList = tArray;

    },


    getChangeList(ev, y, x) {
      //判断是否有值
      //如果当前修改的位置之前不存在就放入到新增集合里面
      if (y + 1 == this.rows) {
        this.rows = this.rows + 1
      }
      if (typeof (this.testList[y][x].positionValue) == "undefined") {
        this.dataAllList.push({
          patientId: this.config.userInfo.patientId,
          visitId: this.config.userInfo.visitId,
          operId: this.config.userInfo.operId,
          yPosition: y,
          xPosition: x,
          positionValue: ev.currentTarget.value,
          addFlag: true,
        })
      } else {
        this.dataAllList.forEach(item => {
          if (item.yPosition == y && item.xPosition == x)
            item.positionValue = ev.currentTarget.value
        })
      }
      this.dataChange(this.dataAllList);
      if (typeof (this.testList[y][x].positionValue) == "undefined" || this.testList[y][x].addFlag) {

        if (this.insertDataList.length > 0) {
          //判断这条数据是否存在在集合里面
          let count = 0;
          for (var i = 0; i < this.insertDataList.length; i++) {
            if (this.insertDataList[i].yPosition === y && this.insertDataList[i].xPosition === x) {
              this.insertDataList[i].positionValue = ev.currentTarget.value
            } else {
              count++;
            }
          }
          if (count == this.insertDataList.length) {
            this.insertDataList.push({
              patientId: this.config.userInfo.patientId,
              visitId: this.config.userInfo.visitId,
              operId: this.config.userInfo.operId,
              yPosition: y,
              xPosition: x,
              positionValue: ev.currentTarget.value
            })
          }
        } else {
          this.insertDataList.push({
            patientId: this.config.userInfo.patientId,
            visitId: this.config.userInfo.visitId,
            operId: this.config.userInfo.operId,
            yPosition: y,
            xPosition: x,
            positionValue: ev.currentTarget.value
          })
        }
      } else {

        if (this.updateDataList.length > 0) {
          //判断这条数据是否存在在集合里面
          let count = 0;
          for (var i = 0; i < this.updateDataList.length; i++) {
            if (this.updateDataList[i].yPosition === y && this.updateDataList[i].xPosition === x) {
              this.updateDataList[i].positionValue = ev.currentTarget.value
            } else {
              count++;
            }
          }
          if (count == this.updateDataList.length) {
            this.updateDataList.push({
              patientId: this.config.userInfo.patientId,
              visitId: this.config.userInfo.visitId,
              operId: this.config.userInfo.operId,
              yPosition: y,
              xPosition: x,
              positionValue: ev.currentTarget.value
            })
          }
        } else {
          this.updateDataList.push({
            patientId: this.config.userInfo.patientId,
            visitId: this.config.userInfo.visitId,
            operId: this.config.userInfo.operId,
            yPosition: y,
            xPosition: x,
            positionValue: ev.currentTarget.value
          })
        }
      }

    },
    //提交之前进行验证
    submitSave() {
      if (this.isNullArry.length == 0) {
        let list = this.defaultArry;
        list.forEach(item => {
          item.patientId = this.config.userInfo.patientId;
          item.visitId = this.config.userInfo.visitId;
          item.operId = this.config.userInfo.operId;

        })
        this.api.insertBatchMedQiXieQingDian(list)
          .then(rest => {
            this.submitSaveFun();
          })
      } else {
        this.submitSaveFun();
      }
    },
    //获取默认表格内容
    selectAllListMedQiXieDefaultCulumn() {
      let arr = {}
      this.api.selectAllListMedQiXieDefaultCulumn(arr)
        .then(rest => {
          this.defaultArry = rest;
          this.dataChange(rest)
        })
    },
    //执行提交保存方法
    submitSaveFun() {
      let updateArr = []
      let deleteArr = []
      this.updateDataList.forEach(item => {
        if (item.addFlag && item.positionValue != '') {
          this.insertDataList.push(item)
        } else if (!item.addFlag && item.positionValue == '') {
          deleteArr.push(item)
        } else if (!item.addFlag && item.positionValue != '') {
          updateArr.push(item)
        } else {

        }
      })
      if (deleteArr.length > 0) {
        let deleteparams = deleteArr
        this.api.deleteBatchMedQiXieQingDian(deleteparams)
          .then(res => {

          })
      }
      if (updateArr.length > 0) {
        let updateparams = updateArr
        this.api.updateBatchMedQiXieQingDian(updateparams)
          .then(res => {
            this.updateDataList = [];
          })
      }
      if (this.insertDataList.length > 0) {
        let insertparams = this.insertDataList
        this.api.insertBatchMedQiXieQingDian(insertparams)
          .then(res => {
            this.insertDataList = [];
          })
      }

    },
    //查找y坐标最大值
    findMax(i) {
      if (i == this.dataAllList.length) {
        return this.maxY
      }
      if (this.maxY < this.dataAllList[i].yPosition) {
        this.maxY = this.dataAllList[i].yPosition
      }
      this.findMax(i + 1)
    },
    printFun() {
      this.printView = false;
    },
    noprintFun() {
      this.printView = true;
    },
    openSaveView() {
      this.saveTempView = !this.saveTempView;
    },
    saveTempalteFun() {
      if (this.templateName == '') {
        alert("输入模板名称")
        return false;
      }
      let arr = []
      let reg = /^[0-9]*$/;
      for (var i = 0; i < this.testList.length; i++) {
        for (var j = 0; j < this.testList[i].length; j++) {
          if (this.testList[i][j] && !reg.test(this.testList[i][j].positionValue)) {
            arr.push({
              positionValue: this.testList[i][j].positionValue,
              userId: this.config.userId,
              xPosition: this.testList[i][j].xPosition,
              yPosition: this.testList[i][j].yPosition,
              templateName: this.templateName
            })
          }
        }
      }
      let param = arr
      this.api.insertBatchMedQiXieTemplate(param)
        .then(res => {
          this.saveTempView = false;
        })
      console.log(arr)
    },
    openTempView() {
      this.applyTemplateView = !this.applyTemplateView;
      this.chooseItem = {};
      if (this.tempNameList.length > 0) {
        return false;
      }
      let param = {
        userId: this.config.userId
      }
      this.api.selectAllMedQiXieTemplate(param)
        .then(res => {
          this.tempNameList = res;
        })
    },
    applyTemplate() {
      if (JSON.stringify(this.chooseItem) == "{}") {
        alert("选择模板")
        return false;
      }
      let param = {
        userId: this.config.userId,
        templateName: this.chooseItem.templateName
      }
      this.api.selectUserTemlate(param)
        .then(res => {
          let arr = res
          arr.forEach(item => {
            item.patientId = this.config.userInfo.patientId;
            item.visitId = this.config.userInfo.visitId;
            item.operId = this.config.userInfo.operId
          })
          let deleteParam = {
            patientId: this.config.userInfo.patientId,
            visitId: this.config.userInfo.visitId,
            operId: this.config.userInfo.operId
          }
          this.api.deletePatientData(deleteParam)
            .then(result => {
              this.api.insertBatchMedQiXieQingDian(arr)
                .then(su => {
                  this.openTempView();
                  this.chooseItem = {};
                  this.tempNameList = [];
                  this.dataInit();
                })
            })
        })
    },
    chooseTemp(item) {
      this.chooseItem = item;
    }

  },
  mounted() {
    this.dataInit();
  },
  created() {
    Bus.$on('saveFun', this.submitSave)
    Bus.$on('print', this.printFun)
    Bus.$on('noprint', this.noprintFun)
    Bus.$on('saveTemp', this.openSaveView)
    Bus.$on('openApplyTemp', this.openTempView)
  },
  beforeDestroy() {
    Bus.$off('saveFun', this.submitSave);
    Bus.$off('print', this.printFun);
    Bus.$off('noprint', this.noprintFun)
    Bus.$off('saveTemp', this.openSaveView)
    Bus.$off('openApplyTemp', this.openTempView)
  },
  components: {},
  computed: {

  },
}

</script>
<style type="text/css" scoped>
ul li.active {
  background-color: blue;
  color: white;
}

.mask {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  /* background: rgba(0, 0, 0, 0.1); */
  cursor: not-allowed;
}

.infoModal {
  width: 300px;
  height: 400px;
  background: #fff;
  background: rgb(240, 240, 240);
  border: 1px solid rgb(24, 131, 215);
  cursor: auto;
  box-shadow: 1px 1px 20px #AAA;
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 150px);
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
</style>
