<template>
  <div style="border:1px solid;overflow-y: auto" :style="{width:object.width+'px',height:object.height+'px'}">
    <!-- <div v-for="item in titileList" style="display: inline-block;border-right: 1px solid;height: 30px;text-align: center;white-space:nowrap;overflow:hidden;border-bottom: 1px solid;line-height: 30px;" :style="{width:item.columnWidth+'px'}">
      {{item.columnTitleName}}
    </div> -->
    <div>
      <table style="border-collapse:collapse;width: 100%;" border="1" cellspacing="0" cellpadding="0">
        <thead>
          <th v-for="item in titileList" style="white-space:nowrap;font-weight: normal;overflow:hidden;font-size: 10.5pt;font-family: SimSun;height: 35px;" :style="{width:item.columnWidth+'px'}">{{item.columnTitleName}}</th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in rows" style="height: 25px;">
            <td v-for="(de,index2) in titileList">
              <!-- <input type="" name="" v-if="de.isClick">
              <div v-for="item1 in listTemp" v-else>
                <input v-if="item1.x==index2&&item1.y==index" type="text" v-model="item1.value" style="width: 100%;height: 25px;border:none;">
              </div> -->
              <!-- <input style="width: 100%;height: 25px;border:none;" :value="index+'-'+index2" @change="test($event)"> -->
              <input v-if="testList.length" style="width: 100%;height: 25px;border:none;" :value="testList[index][index2]">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      titileList: [],
      rows: 40,
      rowsList: [],
      listTemp: [],
      dataList: [],
      testList: [],
    }
  },
  props: ['object', 'isPage'],
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

      this.api.getPatientQiXieList(params1)
        .then(rest => {
          this.listTemp = rest;
          debugger
          this.dataChange(rest);
        })




    },
    dataInit() {
      this.selectQiXieTitle();
      // this.dataChange();

    },
    dataChange(list1) {
      var tArray = new Array(); //先声明一维
      for (var k = 0; k < this.rows; k++) { //一维长度为i,i为变量，可以根据实际情况改变

        tArray[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；

        for (var j = 0; j < 10; j++) { //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；

          tArray[k][j] = ""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
        }
      }
      // var list1 = this.listTemp;
      list1.forEach(item => {
        tArray[item.yPosition][item.xPosition] = item.positionValue
      })

      this.testList = tArray;
    },


    test(ev) {
      console.log(ev.currentTarget._value)
      console.log(ev.currentTarget.value)
      ev.currentTarget.value = 123
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
    }

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
