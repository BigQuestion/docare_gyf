<template>
  <div style="position: relative;margin:2px;">
    <!-- <div style="height: 2px;width: 700px;background-color: red;margin-bottom: 20px;"></div> -->
    <div v-if="!page">
      <div style="max-height: 20px;" ref="timelist">
        <div v-for="(item,index) in xTimeArray" v-if="index%6==0" style="width: 30px;margin-left: -8px;font-size: 12px;display: inline-block;">{{item}}</div>
        <div v-else style="width: 12px;display: inline-block;"></div>
      </div>
      <div>
        <div v-for="(item,index) in dataArray" v-if="index < rows-1" :style="{top:svgHeight/rows*index+20+'px',height:svgHeight/rows+'px',lineHeight:svgHeight/rows+'px',}" style="width: 160px;border-bottom: 1px solid #8391a2;  font-size: 14px;position: absolute;left: -165px;padding-left: 5px;white-space:nowrap;word-break: keep-all;">
          <span v-if="item.ITEM_NAME"> {{item.ITEM_NAME}}({{item.DOSAGE_UNITS}})</span>
        </div>
        <div v-for="(item,index2) in dataArray" v-if="index2==rows-1" :style="{top:svgHeight/rows*index2+20+'px',height:svgHeight/rows+'px',lineHeight:svgHeight/rows+'px',}" style="width: 160px; font-size: 14px;position: absolute;left: -165px;padding-left: 5px;white-space:nowrap;word-break: keep-all;">
          <span v-if="item.ITEM_NAME"> {{item.ITEM_NAME}}({{item.DOSAGE_UNITS}})</span>
        </div>
      </div>
      <div id="tableGrid" style="position: relative;">
        <svg :width="svgWidth" :height="svgHeight" id="tableSvgPrint">
          <g v-for="(item,index2) in lineArray">
            <line v-if="index2%6==0" :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:rgba(0,0,0,0.6);stroke-width:2px;"></line>
            <line v-else :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:1px;"></line>
          </g>
          <g v-for="(item,index) in lineArray" v-if="index < rows">
            <line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:1px;"></line>
          </g>
        </svg>
        <div v-if="item.obj.DURATIVE_INDICATOR=='0'||!item.obj.DURATIVE_INDICATOR" style="csursor: pointer;position: absolute;font-size: 8pt;color: blue;" :style="{top:item.top+'px',left:item.x1-1+'px',height:svgHeight/rows-3+'px',lineHeight:svgHeight/rows+'px'}" v-for="(item,index) in xArray">
          <span v-if="item.obj.ITEM_NAME=='七氟烷'" style="padding: 0 2px 0 0px;">{{item.obj.CONCENTRATION}}{{item.obj.CONCENTRATION_UNIT}}</span>
          <span v-else style="padding: 0 2px 0 0px;">{{item.obj.DOSAGE}}</span>
        </div>
        <div v-if="item.obj.DURATIVE_INDICATOR=='1'" style="position: absolute;font-size: 8pt;color: blue;background-color: white;" :style="{top:item.top+2+'px',left:item.x1+item.w/2-10+'px',height:svgHeight/rows-3+'px',lineHeight:svgHeight/rows+'px'}" v-for="(item,index) in xArray">
          <span v-if="item.obj.ITEM_NAME=='七氟烷'" style="padding: 0 2px 0 0px;display: block;width: 16px;text-align: center;">{{item.obj.CONCENTRATION}}{{item.obj.CONCENTRATION_UNIT}}</span>
          <span v-else style="padding: 0 2px 0 0px;">{{item.obj.DOSAGE}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
import Bus from '@/bus.js';
export default {
  data() {
    return {
      data: [],
      line: '',
      rows: 8,
      columns: 50,
      handleItem: {},
      wd: 0,
      ht: 0,
      xTimeArray: [],
      svgWidth: 700,
      svgHeight: 150,
      svgPadding: 0,
      //每个格子代表时间(分钟)
      tbMin: 5,
      dataArray: [],
      //数据提示窗口宽度
      tipWidth: 200,
      tipHeight: 150,
      tipTop: 0,
      tipLeft: 0,
      tipView: false,
      lineObj: {},
      xArray: [],
      lineArray: [],
      svgObj: '',

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
      this.svgObj = d3.select("#tableSvgPrint")
    },
    //对时间进行计算操作
    timeControl(startTime) {

      var svg = d3.selectAll(".testprint")
      svg.remove();
      var m = this.tbMin; //加几分钟
      var timeDate = new Date(startTime);
      var toMin = timeDate.getTime() + 1000 * 60 * m;
      var timeArray = [];
      let startMinTime = this.config.startMinTime
      let defaultTime = new Date().Format("yyyy-MM-dd") + " 08:00"
      let pageOper = this.config.pageOper

      if (pageOper == 0 && startMinTime) {
        for (var i = 0; i <= this.columns; i++) {

          timeArray.push(new Date(new Date(this.config.initTime).getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      } else if (!startMinTime && pageOper == 0) {
        for (var i = 0; i <= this.columns; i++) {
          timeArray.push(new Date(new Date(defaultTime).getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      } else {
        for (var i = 0; i <= this.columns; i++) {

          timeArray.push(new Date(this.config.initTime.getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      }
      this.xTimeArray = timeArray;
      this.getLineXy();
      if (this.page == false) {
        this.selectMedAnesthesiaEventList();
      }

      return
      var m = this.tbMin; //加几分钟
      var timeDate = new Date(startTime);
      var toMin = timeDate.getTime() + 1000 * 60 * m;
      var timeArray = [];
      // for (var i = 0; i < this.columns; i++) {
      //   timeArray.push(new Date(timeDate.getTime() + 1000 * 60 * m * i).Format("hh:mm"))
      // }
      for (var i = 0; i <= this.columns; i++) {

        timeArray.push(new Date(this.config.initTime.getTime() + 1000 * 60 * m * i).Format("hh:mm"));
      }
      this.xTimeArray = timeArray;
      this.$nextTick(function() {
        this.xTimeArray = timeArray; // => '更新完成'
      })
    },
    //时间初始化显示
    xTimeInit() {
      if (!this.page) {
        this.timeControl(this.config.startMinTime);
      } else {
        this.timeControl(new Date().Format("yyyy-MM-dd") + " 08:00");
      }
      return
      if (this.config.userInfo.inDateTime && this.config.userInfo.inDateTime != "" && this.config.userInfo.inDateTime != null &&
        !this.page) {
        this.timeControl(this.config.userInfo.inDateTime);
      } else {
        this.timeControl(new Date().Format("yyyy-MM-dd") + " 08:00");
      }
      var svg = d3.selectAll(".testprint")
      // svg.remove();
      this.getLineXy();
      this.selectMedAnesthesiaEventList();


    },
    //加载病人麻醉事件里面麻醉用药数据
    selectMedAnesthesiaEventList() {
      //this.timeControl(this.maxTime);
      this.dataArray = []
      this.xArray = []
      var w = this.svgWidth,
        lMin = this.tbMin,
        h = this.svgHeight;
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        itemClass: '2C4'
      }
      for (var i = 0; i < this.rows; i++) {
        this.dataArray.push(i);
      }
      if (this.page) {
        return;
      }
      this.api.selectMedAnesthesiaEventList(params)
        .then(res => {
          var list = res.list;
          this.dataOperChange(list);
        });
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
      var _this = this;
      obj.nowTime = '';
      if (obj.DURATIVE_INDICATOR == 1 && (obj.ENDDATE == null || obj.ENDDATE == "")) {
        this.svgObj.append("line")
          .attr('stroke-width', 1)
          .attr("stroke", "blue")
          .attr("class", "testprint")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x1)
          .attr("x2", x1)
        this.svgObj.append("path")
          .attr('d', this.drawLineArrow(x1, y1, x2, y2))
          .attr('stroke-width', 1)
          .attr("stroke", "blue")
          .attr("class", "testprint")
      }
      if (obj.DURATIVE_INDICATOR == 1 && obj.ENDDATE != null && obj.ENDDATE != "") {
        this.svgObj.append("line")
          .attr('stroke-width', 1)
          .attr("stroke", "blue")
          .attr("class", "testprint")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x1)
          .attr("x2", x1)
        this.svgObj.append("line")
          .attr("stroke", "blue")
          .attr("stroke-width", 1)
          .attr("class", "testprint")
          .attr("y1", y1)
          .attr("y2", y2)
          .attr("x1", x1)
          .attr("x2", x2)
        this.svgObj.append("line")
          .attr('stroke-width', 1)
          .attr("stroke", "blue")
          .attr("class", "testprint")
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

      path += " L" + (Math.round(x2) + Math.round(Par * cosy - (Par / 2.0 * siny))) + "," + (Math.round(y2) + Math.round(Par * siny + (Par / 2.0 * cosy)));

      path += " M" + (Math.round(x2) + Math.round(Par * cosy + Par / 2.0 * siny) + "," + (Math.round(y2) - Math.round(Par / 2.0 * cosy - Par * siny)));
      path += " L" + x2 + "," + y2;

      return path;
    },
    getTime() {
      return new Date().Format("yyyy-MM-dd hh:mm:ss")
    },
    showTipInfo(item) {
      this.tipView = true;
      this.tipLeft = item.x1;
      this.tipTop = item.y2 + 10;
      this.lineObj = item.obj;
    },
    hideTipInfo() {
      this.tipView = false;
      this.lineObj = '';
    },
    mouseMoveInfo(item, ev) {
      item.obj.nowTime = this.getTime();
      var gWidth = this.svgWidth / this.columns;
      this.$set(this.lineObj, "nowTime", this.getTime());
      //var ev = ev || event;
      var offX = ev.offsetX + item.x1; //横坐标值
      var m = Math.round(offX / gWidth * 5);
      var time = new Date(this.config.userInfo.inDateTime);
      var time1 = time.getTime() + m * 60 * 1000;
      var time2 = new Date(time1).Format("yyyy-MM-dd hh:mm");
      item.obj.nowTime = time2;
      this.lineObj = item.obj;
    },
    //翻页
    pageChange() {
      // var svg = d3.selectAll(".testprint")
      // svg.remove();
      // this.xTimeArray = [];
      // this.$nextTick(function() {
      if (this.config.pageOper == 0) {
        this.config.pageNum = 1;
        this.xTimeInit();
      }
      if (this.config.pageOper == -1) {
        this.timeControl(this.config.initTime)
        return
        let m = this.config.initTime.getTime() - 250 * 60 * 1000;
        // this.timeControl(new Date(m));
        var list = [];
        list = this.percentPageData;

        for (var i = 0; i < list.length; i++) {
          if (this.config.pagePercentNum != 1 && list[i].PATIENT_ID) {
            list[i].vStartTime = this.config.initTime.Format("yyyy-MM-dd hh:mm:ss");
          }
        }
      }
      if (this.config.pageOper == 1) {
        this.timeControl(this.config.maxTime)
        return
        let arrList = this.dataArray;
        this.percentPageData = arrList;
        var arrayList = [];
        var list = this.dataArray;
        for (var i = 0; i < list.length; i++) {
          if (list[i].PATIENT_ID) {
            if (list[i].ENDDATE == null || list[i].ENDDATE == "") {

              if (new Date(this.config.patientMaxTime) > new Date(this.config.initTime)) {
                list[i].vStartTime = new Date(this.config.initTime).Format("yyyy-MM-dd hh:mm:ss");
                arrayList.push(list[i]);
              } else {}
            } else {
              if (new Date(list[i].ENDDATE) > new Date(this.config.initTime)) {
                list[i].vStartTime = new Date(this.config.initTime).Format("yyyy-MM-dd hh:mm:ss");
                arrayList.push(list[i]);
              } else {

              }
            }
          }
        }
        this.timeControl(this.config.maxTime)
      }
      // })
    },
    //处理数据进行划线
    dataOperChange(list) {
      var svg = d3.selectAll(".testprint")
      svg.remove();
      this.xArray = [];
      this.dataArray = [];
      let dataArr = []
      var w = this.svgWidth,
        lMin = this.tbMin,
        h = this.svgHeight,
        m = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].START_TIME) {
          if (i == -1)
            break;
          else {
            //开始时间间隔
            let sMin = ''
            //结束时间间隔
            let eMin = ''
            let maxPatTime = this.config.patientMaxTime
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
            sMin = this.getMinuteDif(this.config.initTime, list[i].START_TIME);
            if (sMin < 0) {
              sMin = 0;
            }

            //如果病人这个用药没有结束时间那么默认使用过程中最大的时间
            if (list[i].ENDDATE == null || list[i].ENDDATE == "") {
              if (new Date(this.config.patientMaxTime) > this.config.maxTime) {
                eMin = this.getMinuteDif(this.config.initTime, this.config.maxTime);
              } else {
                eMin = this.getMinuteDif(this.config.initTime, new Date(this.config.patientMaxTime));
              }
            } else {

              if (new Date(list[i].ENDDATE) >= this.config.maxTime) {
                eMin = this.getMinuteDif(this.config.initTime, this.config.maxTime);
              } else if (this.config.initTime < new Date(list[i].ENDDATE) < this.config.maxTime) {
                eMin = this.getMinuteDif(this.config.initTime, new Date(list[i].ENDDATE));
              } else {
                // list[i].DURATIVE_INDICATOR = 0;
                eMin = 0;
              }
            }
            let x1 = Math.round(sMin / lMin * (w / this.columns))
            let x2 = Math.round(eMin / lMin * (w / this.columns))
            let y1
            let y2
            let flag = true;
            let topi
            y1 = Math.round(h / this.rows / 2 * (m + 1) + h / this.rows * m / 2)
            y2 = Math.round(h / this.rows / 2 * (m + 1) + h / this.rows * m / 2)
            //判断是否同一种药品
            if (this.dataArray.length > 0) {
              for (var j = 0; j < this.dataArray.length; j++) {
                if (list[i].ITEM_NAME == this.dataArray[j].ITEM_NAME && list[i].ITEM_CLASS == this.dataArray[j].ITEM_CLASS) {
                  y1 = Math.round(h / this.rows / 2 * (j + 1) + h / this.rows * j / 2)
                  y2 = Math.round(h / this.rows / 2 * (j + 1) + h / this.rows * j / 2)
                  flag = false;
                  topi = j;
                  break;
                }
              }
            }

            list[i].vStartTime = '';
            if (list[i].DURATIVE_INDICATOR == 1 && x2 >= 0 && m < this.rows) {
              this.createLine(x1, x2, y1, y2, list[i]);
            }


            if (flag) {
              if (m < this.rows) {
                this.xArray.push({
                  x1: x1,
                  y1: y1,
                  x2: x2,
                  y2: y2,
                  w: x2 - x1,
                  obj: list[i],
                  top: m * (this.svgHeight / this.rows)

                })
                this.dataArray.push(list[i]);
                m++;
              }

            } else {
              this.xArray.push({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                w: x2 - x1,
                obj: list[i],
                top: topi * (this.svgHeight / this.rows)
              })

            }

          }
        }
      }
      for (var k = 0; k < this.rows - m; k++) {
        this.dataArray.push(m)
      }
    },

  },
  mounted() {
    this.area = this.$refs.area;
    this.xTimeInit();
  },
  beforecreate() {
    // Bus.$on('print', this.xTimeInit)
  },
  created() {
    Bus.$on('test', this.pageChange)
    Bus.$on('timeSetChange', this.xTimeInit)
  },
  beforeDestroy() {
    Bus.$off('test', this.pageChange);
    Bus.$off('timeSetChange', this.xTimeInit)
    // Bus.$off('print', this.xTimeInit);
  },
  components: {

  },
  props: ['page'],
  computed: {

  }
}

</script>
<style scoped>
svg {
  /*margin: 25px;*/
}

path {
  fill: none;
  stroke: red;
  stroke-width: 1px;
}

</style>
