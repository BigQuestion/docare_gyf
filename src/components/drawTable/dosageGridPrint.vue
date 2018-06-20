<template>
  <div style="position: relative;margin:2px;">
    <svg :width="svgWidth" :height="svgHeight" id="dosageprint">
      <g v-for="item in lineArray">
        <line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
      </g>
      <g v-for="(item,index) in lineArray" v-if="index < rows">
        <line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:0.5px;"></line>
      </g>
    </svg>
    <!-- 显示出量的数据 -->
    <div style="csursor: pointer;position: absolute;font-size: 8pt;color: blue;" :style="{left: item.obj.toleft-5+'px',top:index*20+120+'px'}" v-for="(item,index) in outputList">
      <span style="padding: 0 2px 0 0px;" v-if="item.obj.DOSAGE">{{item.obj.DOSAGE}}</span>
    </div>
    <div v-if="item.obj.DURATIVE_INDICATOR=='0'" style="cursor: default;position: absolute;font-size: 8pt;color: blue;background-color: white;" :style="{top:item.top+'px',left:item.x1-1+'px',height:svgHeight/rows-3+'px',lineHeight:svgHeight/rows+'px'}" v-for="(item,index) in xArray">
      <span style="padding: 0 2px 0 0px;">{{item.obj.DOSAGE}}</span>
    </div>
    <div v-if="item.obj.DURATIVE_INDICATOR=='1'" style="position: absolute;font-size: 8pt;color: blue;background-color: white;" :style="{top:item.top+'px',left:item.x1+item.w/2-1+'px',height:svgHeight/rows-3+'px',lineHeight:svgHeight/rows+'px'}" v-for="(item,index) in xArray">
      <span style="padding: 0 2px 0 0px;">{{item.obj.DOSAGE}}</span>
    </div>
    <div style="position: absolute;z-index: 5;" :style="{top:item.y1-svgHeight/rows/8+'px',left:item.x1+'px',width:item.w+'px',height:svgHeight/rows/4+'px'}" v-for="item in xArray">
    </div>
    <div style="height: 100px;width: 140px; position: absolute;top: 0px;left: -140px;">
      <div v-for="item in dataArray" style="border-bottom: 1px solid #8391a2;font-size: 12px;padding-left: 5px;white-space:nowrap;word-break: keep-all;" :style="{height:svgHeight/rows-1+'px'}"><span v-if="item.ITEM_NAME"> {{item.ITEM_NAME}}({{item.DOSAGE_UNITS}})</span></div>
    </div>
    <div style="width: 25px; position: absolute;top: 0px;left: -165px;border-right: 1px solid #8391a2;border-bottom: 1px solid #8391a2;    display: flex;align-items: center;" :style="{height:forRows*(svgHeight/rows)-1+'px'}">
      输液
    </div>
    <div style="width: 165px; position: absolute;top: 0px;left: -165px;font-size: 12px;" :style="{height:outRows*(svgHeight/rows)-1+'px',top:forRows*(svgHeight/rows)+'px'}">
      <div v-for="(item,index) in outputList" style="border-bottom: 1px solid #8391a2;" :style="{height:svgHeight/rows-1+'px'}">
        <span v-if="item.obj.ITEM_NAME">{{item.obj.ITEM_NAME}}({{item.obj.DOSAGE_UNITS}})</span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
import Bus from '@/bus.js';
export default {
  name: 'dosage',
  data() {

    return {
      lineArray: [],
      svgWidth: 700,
      svgHeight: 180,
      columns: 50,
      rows: 9,
      dataArray: [],
      forRows: 6,
      tbMin: 5,
      outRows: 3,
      tipTop: 0,
      tipLeft: 0,
      tipView: false,
      dataObj: {},
      xArray: [],
      percentPageData: [],
      outputList: [], //出量数据
    }
  },
  methods: {
    getLineXy() {
      var array = [];
      for (var i = 0; i < 50; i++) {
        array.push({
          x: {
            x1: i * (this.svgWidth / this.columns),
            x2: i * (this.svgWidth / this.columns),
          },
          y: {
            y1: i * (this.svgHeight / this.rows),
            y2: i * (this.svgHeight / this.rows)
          }
        })
      }
      this.lineArray = array;
    },
    getData() {
      this.dataArray = [];
      for (var i = 0; i < this.forRows; i++) {
        this.dataArray.push(i)
      }
      if (this.page == false) {
        let params = {
          patientId: this.config.userInfo.patientId,
          operId: this.config.userInfo.operId,
          visitId: this.config.userInfo.visitId,
          itemClass: 3
        }

        this.api.selectMedAnesthesiaEventList(params)
          .then(res => {
            var list = res.list;
            this.getOutList()
            this.dataListOperFun(list)
          })
      }
    },
    //获取出量
    getOutList() {
      let params1 = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        itemClass: "D",
      }

      this.api.selectMedAnesthesiaEventList(params1)
        .then(res => {
          let list = res.list;
          this.outputList = res.list;
          let temparr = this.outputList
          let arr = []
          for (let i = 0; i < temparr.length; i++) {
            if (temparr[i].START_TIME) {
              if (new Date(temparr[i].START_TIME) <= new Date(this.config.maxTime) && new Date(temparr[i].START_TIME) >= new Date(this.config.initTime)) {
                let x = this.getMinuteDif(this.config.initTime, list[i].START_TIME);
                let x2 = x / this.tbMin * (this.svgWidth / this.columns)
                temparr[i].toleft = x2
                arr.push({ obj: temparr[i], y2: i * 20 + 120, x1: x2 })
              }
            }
          }

          for (var i = 0; i < 3; i++) {
            if (arr.length < 3) {
              arr.push({ obj: '' })
            }
            if (arr.length == 3) {
              break
            }
          }
          this.outputList = arr
        })
    },

    //计算时间差分钟
    getMinuteDif(startTime, endTime) {
      let sTime = new Date(startTime).getTime()
      let enTime = new Date(endTime).getTime()
      var min = '';
      min = (enTime - sTime) / 1000 / 60;
      return Math.round(min)

    },

    createLine(x1, x2, y1, y2, obj) {
      var svg = d3.select("#dosageprint");
      var _this = this;
      var gWidth = this.svgWidth / this.columns;
      obj.dataTime = _this.getTime();
      var t;
      obj.nowTime = '';
      var gWidth = this.svgWidth / this.columns;
      if (obj.DURATIVE_INDICATOR == 1 && (obj.ENDDATE == null || obj.ENDDATE == "")) {
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "dosagegridprint")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x1)
          .attr("x2", x1)
        svg.append("path")
          .attr('d', this.drawLineArrow(x1, y1, x2, y2))
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "dosagegridprint")

      }
      if (obj.DURATIVE_INDICATOR == 1 && obj.ENDDATE != null && obj.ENDDATE != "") {
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "dosagegridprint")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x1)
          .attr("x2", x1)
        svg.append("line")
          .attr("stroke", "blue")
          .attr("fill", "none")
          .attr("stroke-width", 1)
          .attr("class", "dosagegridprint")
          .attr("y1", y1)
          .attr("y2", y2)
          .attr("x1", x1)
          .attr("x2", x2)
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "dosagegridprint")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x2)
          .attr("x2", x2)

      }
    },

    drawLineArrow(x1, y1, x2, y2) {
      var path;
      var slopy, cosy, siny;
      var Par = 6.0;
      var x3, y3;
      slopy = Math.atan2((y1 - y2), (x1 - x2));
      cosy = Math.cos(slopy);
      siny = Math.sin(slopy);
      path = "M" + x1 + "," + y1 + " L" + x2 + "," + y2;
      x3 = (Number(x1) + Number(x2)) / 2;
      y3 = (Number(y1) + Number(y2)) / 2;
      path += " M" + x2 + "," + y2;
      path += " L" + (Math.round(x2) + Math.round(Par * cosy - (Par / 2.0 * siny))) + "," + (Math.round(y2) + Math.round(Par * siny +
        (Par / 2.0 * cosy)));
      path += " M" + (Math.round(x2) + Math.round(Par * cosy + Par / 2.0 * siny) + "," + (Math.round(y2) - Math.round(Par / 2.0 * cosy - Par * siny)));
      path += " L" + x2 + "," + y2;
      return path;
    },

    getTime() {
      return new Date().Format("yyyy-MM-dd hh:mm:ss")
    },
    showTipInfo(item, ev) {
      this.tipView = true;
      this.tipLeft = ev.offsetX;
      this.tipTop = item.y2 + 10;
      if (item.obj.ENDDATE == null || item.obj.ENDDATE == "") {
        item.obj.ENDDATE = (item.obj.MAX_TIME);
      }
      this.dataObj = item.obj;
    },
    hideTipInfo() {
      this.tipView = false;
      this.dataObj = '';
    },
    mouseMoveInfo(item, ev) {
      item.obj.nowTime = this.getTime();
      var gWidth = this.svgWidth / this.columns;
      this.$set(this.dataObj, "dataTime", this.getTime());
      //var ev = ev || event;
      var offX = ev.offsetX + item.x1; //横坐标值
      var m = Math.round(offX / gWidth * 5);
      var time = new Date(this.config.initTime);
      var time1 = time.getTime() + m * 60 * 1000;
      var time2 = new Date(time1).Format("yyyy-MM-dd hh:mm");
      item.obj.dataTime = time2;
      this.dataObj = item.obj;
    },
    //数据处理
    dataListOperFun(list) {
      var m = 0;
      this.xArray = [];
      this.dataArray = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].START_TIME) {
          if (i == this.forRows) {
            break;
          } else {
            let t1 = ''
            let t2 = ''
            //判断是否在当前时间内
            if (new Date(list[i].START_TIME) > new Date(this.config.maxTime)) {
              continue;
            }
            if (list[i].DURATIVE_INDICATOR == 0) {
              if (new Date(list[i].START_TIME) < new Date(this.config.initTime)) {
                continue;
              }
            }
            //如果是持续用药
            if (list[i].DURATIVE_INDICATOR == 1) {
              //判断是否有结束时间
              if (list[i].ENDDATE) {
                if (new Date(list[i].ENDDATE) < new Date(this.config.initTime)) {
                  continue;
                }
              } else {
                if (new Date(this.config.patientMaxTime) < new Date(this.config.initTime)) {
                  continue;
                }
              }
            }
            t1 = this.getMinuteDif(this.config.initTime, list[i].START_TIME);
            if (t1 < 0) {
              t1 = 0;
            }
            if (list[i].ENDDATE == null || list[i].ENDDATE == "") {
              if (new Date(this.config.patientMaxTime) > this.config.maxTime) {
                t2 = this.getMinuteDif(this.config.initTime, this.config.maxTime);
              } else {
                t2 = this.getMinuteDif(this.config.initTime, new Date(this.config.patientMaxTime));
              }
            } else {
              if (new Date(list[i].ENDDATE) > this.config.maxTime) {
                t2 = this.getMinuteDif(this.config.initTime, this.config.maxTime);
              } else if (this.config.initTime < new Date(list[i].ENDDATE) < this.config.maxTime) {
                t2 = this.getMinuteDif(this.config.initTime, new Date(list[i].ENDDATE));
              } else {
                list[i].DURATIVE_INDICATOR = 0;
                t2 = 0;
              }
            }
            let x1 = t1 / this.tbMin * (this.svgWidth / this.columns)
            let x2 = t2 / this.tbMin * (this.svgWidth / this.columns)
            let y1
            let y2
            let flag = true;
            let topi
            y1 = Math.round(this.svgHeight / this.rows / 2 * (m + 1) + this.svgHeight / this.rows * m / 2)
            y2 = y1
            //判断是否同一种药品
            if (this.dataArray.length > 0) {
              for (var j = 0; j < this.dataArray.length; j++) {
                if (list[i].ITEM_NAME == this.dataArray[j].ITEM_NAME && list[i].ITEM_CLASS == this.dataArray[j].ITEM_CLASS) {
                  y1 = Math.round(this.svgHeight / this.rows / 2 * (j + 1) + this.svgHeight / this.rows * j / 2)
                  y2 = y1
                  flag = false;
                  topi = j;
                  break;
                }
              }
            }
            list[i].vStartTime = '';
            if (list[i].DURATIVE_INDICATOR == 1 && x2 >= 0) {
              this.createLine(x1, x2, y1, y2, list[i]);
            }

            if (flag) {
              this.xArray.push({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                w: x2 - x1,
                obj: list[i],
                top: m * this.svgHeight / this.rows

              })
              this.dataArray.push(list[i]);
              m++;

            } else {
              this.xArray.push({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                w: x2 - x1,
                obj: list[i],
                top: topi * this.svgHeight / this.rows
              })
            }
          }
        }
      }
      console.log(this.dataArray)
      for (var k = 0; k < this.forRows - m; k++) {
        this.dataArray.push(m)
      }
    },
    //翻页
    pageTurnFun() {
      var svg = d3.selectAll(".dosagegridprint")
      svg.remove();

      if (this.config.pageOper == 0) {
        this.config.pageNum = 1;
        this.getData();
      }
      if (this.config.pageOper == -1) {
        this.getData();
        return
        let m = this.config.initTime.getTime();
        var list = [];
        list = this.percentPageData;
        for (var i = 0; i < list.length; i++) {
          if (this.config.pagePercentNum != 1 && list[i].MAX_TIME) {
            list[i].vStartTime = this.config.initTime.Format("yyyy-MM-dd hh:mm:ss");
          }
        }
        this.dataListOperFun(list);
      }
      if (this.config.pageOper == 1) {
        this.getData();
        return
        let arrList = this.dataArray;
        this.percentPageData = arrList;
        var arrayList = [];
        var list = this.dataArray;
        for (var i = 0; i < list.length; i++) {
          if (list[i].PATIENT_ID) {
            if (list[i].ENDDATE == null || list[i].ENDDATE == "") {

              if (new Date(this.config.patientMaxTime) > new Date(this.config.initTime)) {
                list[i].vStartTime = this.config.initTime.Format("yyyy-MM-dd hh:mm:ss");
                arrayList.push(list[i]);
              } else {}
            } else {
              if (new Date(list[i].ENDDATE) > new Date(this.config.initTime)) {
                list[i].vStartTime = this.config.initTime.Format("yyyy-MM-dd hh:mm:ss");
                arrayList.push(list[i]);
              } else {

              }
            }
          }
        }

        this.dataListOperFun(arrayList);

      }
    },
  },
  mounted() {
    this.getLineXy();
    this.getData();

    // window.eventHub.$on("test", this.pageTurnFun);
  },
  created() {
    Bus.$on('test', this.pageTurnFun)
  },
  beforeDestroy() {
    Bus.$off('test', this.pageTurnFun);
  },
  components: {

  },
  props: ['page'],
  computed: {

  }
}

</script>
<style scoped>


</style>
