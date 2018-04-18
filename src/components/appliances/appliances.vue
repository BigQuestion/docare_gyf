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
          <tr v-for="(item,index) in rowsList" style="height: 25px;">
            <td v-for="(de,index2) in dataList">
              <!-- <input type="" name="" v-if="de.isClick">
              <div v-for="item1 in listTemp" v-else>
                <input v-if="item1.x==index2&&item1.y==index" type="text" v-model="item1.value" style="width: 100%;height: 25px;border:none;">
              </div> -->
              <input style="width: 100%;height: 25px;border:none;" :value="index+'-'+index2" @change="test($event)">
              <!-- <input style="width: 100%;height: 25px;border:none;" :value="testList[0][0]" @change="test($event)"> -->
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
      rows: 20,
      rowsList: [],
      listTemp: [{
          x: 0,
          y: 0,
          value: '卵园钳'
        },
        {
          x: 1,
          y: 0,
          value: 333
        },
        {
          x: 2,
          y: 0,
          value: 22
        },
        {
          x: 0,
          y: 1,
          value: '巾  钳'
        },
        {
          x: 0,
          y: 2,
          value: '持针钳'
        },
        {
          x: 8,
          y: 2,
          value: '持针钳'
        }
      ],
      dataList: [],
      testList: [
        ['', 2, 3],
        [2, 3, 4]
      ],
    }
  },
  props: ['object', 'isPage'],
  methods: {
    selectQiXieTitle() {
      let params = {}
      this.api.selectQiXieTitle(params)
        .then(res => {
          this.titileList = res;
          for (var i = 0; i < res.length; i++) {
            this.dataList.push({
              isClick: false
            })
          }
        })


    },
    dataInit() {
      for (var i = 0; i < this.rows; i++) {
        this.rowsList.push(i);
      }
      this.selectQiXieTitle();

    },
    test(ev) {
      console.log(ev.currentTarget._value)
      console.log(ev.currentTarget.value)
      ev.currentTarget.value = 123
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
