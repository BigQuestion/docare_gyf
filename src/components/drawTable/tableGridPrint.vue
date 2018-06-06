<template>
  <div style="position: relative;margin:2px;">
    <!-- <div style="height: 2px;width: 700px;background-color: red;margin-bottom: 20px;"></div> -->
    <div v-if="!page">
      <div style="max-height: 15pt;padding: 1.5pt 0pt;" ref="timelist">
        <div v-for="(item,index) in xTimeArray" v-if="index%3==0" style="width: 20pt;margin-left: -7pt;font-size: 9pt;display: inline-block;" :title="item">{{item}}</div>
        <div v-else style="width: 9pt;display: inline-block;"></div>
      </div>
      <div>
        <div v-for="(item,index) in dataArray" v-if="index < rows-1" :style="{top:svgHeight/rows*index+20+'px',height:svgHeight/rows+'px'}" style="height: 10pt;line-height: 14*0.75pt;width: 165px;border-bottom: 1px solid #8391a2;  font-size: 9pt;position: absolute;left: -165px;white-space:nowrap;word-break: keep-all;"> {{item.ITEM_NAME}}
        </div>
      </div>
      <div id="tableGrid" style="position: relative;">
        <svg :width="svgWidth" :height="svgHeight" id="tableSvgPrint">
          <g v-for="item in lineArray">
            <line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
          </g>
          <g v-for="(item,index) in lineArray" v-if="index < rows">
            <line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:0.5px;"></line>
          </g>
        </svg>
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
      rows: 10,
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
    //对时间进行计算操作
    timeControl(startTime) {
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
      var w = this.svgWidth,
        lMin = this.tbMin,
        h = this.svgHeight;
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        itemClass: 2
      }
      for (var i = 0; i < this.rows; i++) {
        this.dataArray.push(i);
      }
      if (this.page) {
        return;
      }
      var m = 0;
      this.dataArray = [];
      this.api.selectMedAnesthesiaEventList(params)
        .then(res => {
          var list = res.list;
          this.dataOperChange(list);
          return false;
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
      var svg = d3.select("#tableSvgPrint");
      var _this = this;
      var t;
      obj.nowTime = '';
      var gWidth = this.svgWidth / this.columns;
      if (obj.DURATIVE_INDICATOR == 1 && (obj.ENDDATE == null || obj.ENDDATE == "")) {
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "testprint")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x1)
          .attr("x2", x1)
        svg.append("path")
          .attr('d', this.drawLineArrow(x1, y1, x2, y2))
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "testprint")
        // .on("mouseenter", function() { // //clearTimeout(t) // _this.tipView = true; // _this.tipLeft = x1; // _this.tipTop = y2 + 10; // _this.lineObj = obj; // }) // .on("mouseleave", function() { // //t = setTimeout(function (){ // _this.tipView = false; // //}, 1000); // }) // .on("mousemove", function(ev) { // //_this.lineObj.nowTime = new Date(); // _this.$set(_this.lineObj, "nowTime", _this.getTime()); // var ev = ev || event; // var offX = ev.offsetX; //横坐标值 // var m = Math.round(offX / gWidth * 5); // var time = new Date(_this.config.userInfo.inDateTime); // var time1 = time.getTime() + m * 60 * 1000; // var time2 = new Date(time1).Format("yyyy-MM-dd hh:mm"); // obj.nowTime = time2; // _this.lineObj = obj; // })

      }
      if (obj.DURATIVE_INDICATOR == 1 && obj.ENDDATE != null && obj.ENDDATE != "") {
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "testprint")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x1)
          .attr("x2", x1)
        svg.append("line")
          .attr("stroke", "blue")
          .attr("fill", "none")
          .attr("stroke-width", 1)
          .attr("class", "testprint")
          .attr("y1", y1)
          .attr("y2", y2)
          .attr("x1", x1)
          .attr("x2", x2)
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
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
      var svg = d3.selectAll(".testprint")
      svg.remove();
      this.xTimeArray = [];

      if (this.config.pageOper == 0) {
        this.config.pageNum = 1;
        this.timeControl(this.config.userInfo.inDateTime);
        this.selectMedAnesthesiaEventList();
      }
      if (this.config.pageOper == -1) {
        this.timeControl(this.config.initTime)
        let m = this.config.initTime.getTime() - 250 * 60 * 1000;
        // this.timeControl(new Date(m));
        var list = [];
        list = this.percentPageData;

        for (var i = 0; i < list.length; i++) {
          if (this.config.pagePercentNum != 1 && list[i].PATIENT_ID) {
            list[i].vStartTime = this.config.initTime.Format("yyyy-MM-dd hh:mm:ss");
          }
        }
        this.dataOperChange(list);
      }
      if (this.config.pageOper == 1) {
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
        this.timeControl(this.config.initTime)
        this.dataOperChange(arrayList);
      }
    },
    //处理数据进行划线
    dataOperChange(list) {
      var w = this.svgWidth,
        lMin = this.tbMin,
        h = this.svgHeight,
        m = 0;
      this.xArray = [];
      this.dataArray = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].START_TIME) {
          if (i == this.rows)
            break;
          else {

            //开始时间间隔
            let sMin = ''
            //结束时间间隔
            let eMin = ''
            if (new Date(list[i].START_TIME) > new Date(this.config.maxTime)) {
              break;
            }
            if (this.config.pagePercentNum == 1) {
              sMin = this.getMinuteDif(this.config.initTime, list[i].START_TIME);
            } else {
              sMin = this.getMinuteDif(this.config.initTime, list[i].vStartTime);
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
                list[i].DURATIVE_INDICATOR = 0;
                eMin = 0;
              }
            }
            let x1 = Math.round(sMin / lMin * (w / this.columns))
            let x2 = Math.round(eMin / lMin * (w / this.columns))
            let y1 = Math.round(h / this.rows / 2 * (m + 1) + h / this.rows * m / 2)
            let y2 = Math.round(h / this.rows / 2 * (m + 1) + h / this.rows * m / 2)
            if (list[i].DURATIVE_INDICATOR == 1) {
              list[i].vStartTime = '';
              this.createLine(x1, x2, y1, y2, list[i]);
              this.xArray.push({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                w: x2 - x1,
                obj: list[i]
              })

              // this.$set(this.dataArray, i, list[i]);
              this.dataArray.push(list[i]);
              m++;
            }
          }
        }
      }
      for (var k = 0; k < this.rows - m; k++) {
        this.dataArray.push(m)
      }

    }

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
    // Bus.$on('print', this.xTimeInit)
  },
  beforeDestroy() {
    Bus.$off('test', this.pageChange);
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
