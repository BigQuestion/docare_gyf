<template>
  <div class="dictionaries">
    <div class="window_load">
      <div class="load_top">
        <div>检验信息</div>
        <div @click="closeCheckInfo" class="top_active">X</div>
      </div>
      <div style="height:50px;padding-left: 20px;font-size: 18px;line-height: 50px;">
        <span>检验信息</span>
      </div>
      <div style="height: calc(100% - 80px);width: 100%;display: flex;">
        <div style="width: 59%;height:100%;overflow-y: auto;background-color: white;">
          <div style="min-height:530px;">
            <div style="display: flex;">
              <div v-for="item in contentConfig" :style="{width:item.width+'px'}" class="leftTitle" style="background-color:rgb(219,235,253)">{{item.text}}</div>
            </div>
            <div>
              <div style="display:flex;" class="hover" :class="{hoverClick:item.clickClass}" v-for="item in dataList" @click="getDetail(item)">
                <div v-for="cell in contentConfig" :style="{width:cell.width+'px'}" class="leftTitle">{{item[cell.value]}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="autoLine"></div>
        <div style="width: calc(41% - 5px);;height:100%;overflow-y: auto;background-color: white;">
          <div style="display: flex;">
            <div v-for="item in contentConfigDetails" :style="{width:item.width+'px'}" class="leftTitle" style="background-color:rgb(219,235,253)">{{item.text}}</div>
          </div>
          <div>
            <div style="display:flex;" class="hover" @click="changeColor(item)" :class="{hoverClick:item.clickClass}" v-for="item in detailsList">
              <div v-for="cell in contentConfigDetails" :style="{width:cell.width+'px'}" class="leftTitle">{{item[cell.value]}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      contentConfig: [{
        text: "",
        width: 10,
        value: "num"
      }, {
        text: "检验号",
        width: 90,
        value: "testNo"
      },
      {
        text: "检验名称",
        width: 405,
        value: "testCause"
      },
      {
        text: "检验类别",
        width: 70,
        value: "specimen"
      },
      {
        text: "检验日期",
        width: 80,
        value: "resultsRptDateTime"
      },
      ],
      contentConfigDetails: [{
        text: "",
        width: 10,
        value: "num"
      }, {
        text: "项目名称",
        width: 220,
        value: "reportItemName"
      },
      {
        text: "测试结果",
        width: 80,
        value: "result"
      },
      {
        text: "单位",
        width: 70,
        value: "units"
      },
      {
        text: "参考值",
        width: 70,
        value: "referenceResult"
      },
      ],
      dataList: [],
      detailsList: [],
    }
  },
  methods: {
    closeCheckInfo() {
      this.$emit('closeView');
    },
    getData() {
      let parm = {
        patientId: this.config.userInfo.patientId,
        visitId: this.config.userInfo.visitId
      }
      this.api.getMedLabTestMasterList(parm)
        .then(res => {
          for (var a = 0; a < res.length; a++) {
            this.$set(res[a], 'clickClass', false)
            this.$set(res[a], 'resultsRptDateTime', new Date(res[a].resultsRptDateTime).Format('yyyy-MM-dd'))
          }
          this.dataList = res;
        })
    },
    getDetail(item) {
      for (var a = 0; a < this.dataList.length; a++) {
        this.dataList[a].clickClass = false;
      }
      item.clickClass = true;
      let parm = {
        testNo: item.testNo,
      }
      this.api.getLabReultList(parm)
        .then(res => {
          for (var a = 0; a < res.length; a++) {
            this.$set(res[a], 'clickClass', false)
          }
          this.detailsList = res;
        })
    },
    changeColor(item) {
      for (var a = 0; a < this.detailsList.length; a++) {
        this.detailsList[a].clickClass = false;
      }
      item.clickClass = true;
    }
  },
  mounted() {
    this.getData();
  },
  created() { },
  beforeDestroy() { },
  components: {},
  computed: {

  }
}

</script>
<style scoped>
.window_load {
  width: 1200px;
  height: 600px;
  top: calc(50% - 300px);
  left: calc(50% - 570px);
}

.flex {
  height: 25px;
  line-height: 25px;
  padding: 3px 0;
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

.resizeAble {
  /* resize: horizontal; */
  overflow: auto;
  font-weight: 200;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #39578A;
  color: #fff;
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

.leftTitle {
  border: 1px solid rgb(193, 211, 243);
  padding-left: 5px;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}

.autoLine {
  height: calc(100% - 2px);
  width: 5px;
  border: 1px solid rgb(193, 211, 243);
  background-color: rgb(118, 163, 219);
}

.hoverClick {
  background-color: rgb(48, 106, 197);
  color: #ffffff;
  cursor: pointer;
}

.hover:hover {
  background-color: rgb(48, 106, 197);
  color: #ffffff;
  cursor: pointer;
}
</style>
