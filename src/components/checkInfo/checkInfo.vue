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
      <div style="height: calc(100% - 100px);width: 100%;display: flex;">
        <div style="width: 40%;height:100%;overflow-y: auto;background-color: white;">
          <div style="display: flex;margin-left: 10px;">
            <!-- <div style="width: 25%;border: 1px solid rgb(177, 207, 243);color: #4C79BB;" v-for="cell in contentConfig">{{cell.text}}</div> -->
            <div class="flex head" :style="{width:totalWidth+'px'}">
              <div v-for="(item,index) in contentConfig" class="cell resizeAble" :style="{width:item.width+'px'}" style="text-align: center;position: relative;border: 1px solid #E6E6E6;display: inline-block;box-sizing: border-box;">
                <div style="width:100%;overflow-x: hidden;white-space: nowrap">{{item.text}}</div>
                <div class="resizeIcon" :style="{left:item.width-2}" @mousedown="resizeStart($event,index,item)"></div>
              </div>
            </div>
            <!-- <div>
                <div v-for="(item,index) in scheduleList" :style="{width:totalWidth+'px'}" class="flex rows" :class="{state2:item.state==2,state3:item.state==3}">
                  <div v-for="cell in contentConfig" class="cell" :style="{width:cell.width+'px'}" style="box-sizing: border-box; ">
                    {{item[cell.value]}}
                  </div>
                </div>
              </div> -->
          </div>
          <div v-for="list in dataList" style="display: flex;margin-left: 10px;">
            <div v-for="cl in contentConfig" style="width: 160px;border:1px solid rgb(177,207,243);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
              <span v-if="[cl.value]=='resultsRptDateTime'">{{list[cl.value]|timeStampToDateStr}}</span>
              <span :title="list[cl.value]" v-else>{{list[cl.value]}}</span>
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
        text: "检验号",
        width: 80,
        value: "testNo"
      },
      {
        text: "检验名称",
        width: 80,
        value: "testCause"
      },
      {
        text: "检验类别",
        width: 80,
        value: "specimen"
      },
      {
        text: "检验日期",
        width: 80,
        value: "resultsRptDateTime"
      },
      ],
      totalWidth: '',
      startX: '',
      dataList: [],
      handleCol: '',
      nextCol: '',
      maxWidth: '',
      area: '',
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
          console.log(res)
          this.dataList = res;
        })
    },
    resizeStart(e, index, col) {
      if (index == this.contentConfig.length - 1) {
        return;
      }
      this.startX = e.clientX;
      //this.handleCol = col;
      this.handleCol = this.contentConfig[index - 1];
      this.nextCol = this.contentConfig[index + 1];
      this.maxWidth = this.handleCol.width + this.nextCol.width - 10;
      this.area.addEventListener('mousemove', this.resizeMove);
      this.area.addEventListener('mouseup', this.stopDrag);
    },
    resizeMove(e) {
      let dX = e.clientX - this.startX;
      if (this.maxWidth >= this.handleCol.width + dX && this.minWidth <= this.handleCol.width + dX) {
        this.startX = e.clientX;
        this.handleCol.width += dX;
        this.totalWidth += dX;
        //this.nextCol.width -= dX;
      }
    },
    stopDrag(e) {
      this.area.removeEventListener('mousemove', this.resizeMove);
      this.area.removeEventListener('mouseup', this.stopDrag);
    },
  },
  mounted() {
    // this.getData();
    this.area = window;
  },
  created() { },
  beforeDestroy() { },
  components: {},
  computed: {

  }
}

</script>
<style scoped>
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
</style>
