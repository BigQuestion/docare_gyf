<template>
  <div style="border:1px solid;overflow-y: auto" :style="{width:object.width+'px',height:object.height+'px'}">
    <div v-if="!page">
      <table style="border-collapse:collapse;width: 100%;" border="1" cellspacing="0" cellpadding="0">
        <thead>
          <th v-for="item in titileList" style="white-space:nowrap;font-weight: normal;overflow:hidden;font-size: 10.5pt;font-family: SimSun;height: 35px;" :style="{width:item.columnWidth+'px'}">{{item.columnTitleName}}</th>
        </thead>
        <tbody v-if="config.isPrintedView">
          <tr v-for="(item,index) in rows">
            <td v-for="(de,index2) in titileList">
              <div>{{testList[index][index2]}}</div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(item,index) in rows">
            <td v-for="(de,index2) in titileList">
              <input v-if="testList.length" style="width: 100%;height: 20px;border:none;" :value="testList[index][index2]" @change="getChangeList($event,index,index2)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button v-if="!page" @click="submitSave">保存</button>
  </div>
</template>
<script type="text/javascript">
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
    }
  },
  props: ['object', 'page'],
  methods: {
    selectQiXieTitle() {
      let params = {}
      this.api.selectQiXieTitle(params)
        .then(res => {
          this.titileList = res;
          // console.log(this.titileList)
        })

      let params1 = {
        patientId: this.config.userInfo.patientId,
        visitId: this.config.userInfo.visitId,
        operId: this.config.userInfo.operId
      }

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
      let tArray = new Array(); //先声明一维
      for (var k = 0; k < this.rows; k++) { //一维长度为i,i为变量，可以根据实际情况改变

        tArray[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；

        for (var j = 0; j < 10; j++) { //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；

          tArray[k][j] = ""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
        }
      }
      list1.forEach(item => {
        tArray[item.yPosition][item.xPosition] = item.positionValue
      })

      this.testList = tArray;
    },


    getChangeList(ev, y, x) {
      // console.log(ev.currentTarget._value)
      // console.log(ev.currentTarget.value)
      //判断是否有值
      //如果当前修改的位置之前不存在就放入到新增集合里面
      if (this.testList[y][x] === '') {

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
    arrTest(arr) {
      var newarry = [];
      arr.forEach(item => {
        if (newarry[item.x]) {
          // if (newarry[item.x][item.y]) {
          newarry[item.x][item.y] = item.value
          // }
        } else {
          newarry[item.x] = new Array()
          newarry[item.x][item.y] = item.value
        }
      })

      return newarry
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
      if (this.updateDataList.length > 0) {
        let updateparams = this.updateDataList
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

  },
  mounted() {
    this.dataInit();
  },
  created() {},
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
