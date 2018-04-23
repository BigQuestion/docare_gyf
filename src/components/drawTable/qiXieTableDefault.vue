<template>
  <div style="height: 450px;width: 700px;box-shadow: #e8e8ea 0px 0px 5px;position: absolute;top: 20%;left: 25%;background-color: rgb(251,251,251);padding: 5px;z-index: 999;">
    <div style="height: 25px;width: 100%;text-align: center;position: relative;">
      <div>
        默认表格数据编辑
      </div>
      <div style="position: absolute;right:20px;top:0px;color:white;background-color: rgb(60,163,203);width: 23px;
    height: 23px;line-height: 23px;text-align: center;cursor: pointer;" @click="closeWin">
        X
      </div>
    </div>
    <div style="width: 100%;height: 350px;overflow: auto;border-bottom: 1px solid;">
      <table style="border-collapse:collapse;table-layout: fixed;" border="1" cellspacing="0" cellpadding="0">
        <thead>
          <th v-for="item in titileList">
            <div style="white-space:nowrap;font-weight: normal;overflow:hidden;font-size: 10.5pt;font-family: SimSun;height: 20px;width: 80px;line-height: 20px;">
              {{item.columnTitleName}}
            </div>
          </th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in rows">
            <td v-for="(de,index2) in titileList">
              <input v-if="testList.length" style="width: 100%;height: 20px;border:none;" :value="testList[index][index2]" @change="getChangeList($event,index,index2)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="height: 50px;text-align: right;padding: 20px;">
      <button @click="submitSave">确定</button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      titileList: [],
      defaultArry: [],
      testList: [],
      updateDataList: [], //修改数据
      insertDataList: [], //插入数据
      rows: 30,
    }
  },
  methods: {
    selectQiXieTitle() {
      let params = {}
      this.api.selectQiXieTitle(params)
        .then(res => {
          this.titileList = res;
        })

      let arr = {}
      this.api.selectAllListMedQiXieDefaultCulumn(arr)
        .then(rest => {
          this.defaultArry = rest;
          this.dataChange(rest);
        })
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
              yPosition: y,
              xPosition: x,
              positionValue: ev.currentTarget.value
            })
          }
        } else {
          this.insertDataList.push({
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
              yPosition: y,
              xPosition: x,
              positionValue: ev.currentTarget.value
            })
          }
        } else {
          this.updateDataList.push({
            yPosition: y,
            xPosition: x,
            positionValue: ev.currentTarget.value
          })
        }
      }

    },
    submitSave() {
      if (this.updateDataList.length > 0) {
        let updateparams = this.updateDataList
        this.api.updateBatchMedQiXieDefaultCulumn(updateparams)
          .then(res => {
            this.updateDataList = [];
          })
      }
      if (this.insertDataList.length > 0) {
        let insertparams = this.insertDataList
        this.api.insertBatchMedQiXieDefaultCulumn(insertparams)
          .then(res => {
            this.insertDataList = [];
          })
      }
    },
    closeWin() {
      this.$emit('closeView');
    }
  },
  mounted() {
    this.selectQiXieTitle()
  },
  created() {},
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
<style scope>
.cont {
  height: 450px;
  width: 700px;
  box-shadow: #e8e8ea 0px 0px 5px;
  position: absolute;
  top: 20%;
  left: 25%;
  background-color: rgb(251, 251, 251);
  padding: 5px;
}

</style>
