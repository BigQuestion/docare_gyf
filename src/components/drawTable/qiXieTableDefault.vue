<template>
  <div style="width:100%;height:100%;position:fixed;top:0;;left:0;cursor:not-allowed;" @click="atherPlacFuntion">
    <div class="fontBox" @click.stop="noFunction" :class="{animation:clickAtherPlace}">
      <div class="fontTop">
        <span>默认表格数据编辑</span>
        <div @click="closeWin" class="font_active">X</div>
      </div>
      <div style="width: 100%;height: 350px;overflow: auto;border-bottom: 1px solid;margin-top:10px;">
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
      <div style="text-align: right;padding: 20px 10px 0 0;">
        <button @click="submitSave">确定</button>
      </div>
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
      clickAtherPlace: false,
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
      var newLength = this.rows+1;
      // newLength++ 
      this.rows = newLength;
      console.log(this.rows)
      // console.log(this.rows)
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
    },
    atherPlacFuntion() {
      this.clickAtherPlace = !this.clickAtherPlace;
      setTimeout(() => {
        this.clickAtherPlace = !this.clickAtherPlace;
      }, 1000);
    },
    noFunction() {

    },
  },
  mounted() {
    this.selectQiXieTitle()
  },
  created() { },
  beforeDestroy() { },
  components: {},
  computed: {

  }
}

</script>
<style scope>
.fontBox {
  position: absolute;
  background: rgb(240, 240, 240);
  border: 1px solid rgb(24, 131, 215);
  cursor: auto;
  -webkit-box-shadow: 1px 1px 20px #AAA;
  box-shadow: 1px 1px 20px #AAA;
  height: 450px;
  width: 700px;
  top: calc(50% - 225px);
  left: calc(50% - 350px);
  z-index: 999;
}

.fontTop {
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

.animation {
  animation: backShadow 0.2s linear;
  animation-iteration-count: 5;
}

@keyframes backShadow {
  25% {
    box-shadow: 1px 1px 20px #AAA;
    border: 1px solid #AAA;
  }
  50% {
    box-shadow: 1px 1px 10px #AAA;
    border: 1px solid rgb(24, 131, 215);
  }
  75% {
    box-shadow: 1px 1px 20px #AAA;
    border: 1px solid #AAA;
  }
  100% {
    box-shadow: 1px 1px 10px #AAA;
    border: 1px solid rgb(24, 131, 215);
  }
}
</style>
