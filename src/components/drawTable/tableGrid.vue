<template>
  <div style="position: relative;margin:2px;">
    <!-- <div style="height: 2px;width: 700px;background-color: red;margin-bottom: 20px;"></div> -->
    <div v-if="!page">
      <div style="max-height: 20px;">
        <div v-for="(item,index) in xTimeArray" v-if="index%3==0" style="width: 30px;margin-left: -9pt;font-size: 12px;display: inline-block;" :title="item">{{item}}</div>
        <div v-else style="width: 12px;display: inline-block;"></div>
      </div>
      <div>
        <div v-for="(item,index) in dataArray" v-if="index < rows-1" :style="{top:svgHeight/rows*index+20+'px',height:svgHeight/rows+'px'}" style="height: 14px;line-height: 14px;width: 160px;border-bottom: 1px solid #8391a2;  font-size: 12px;position: absolute;left: -165px;padding-left: 5px;"> {{item.ITEM_NAME}}
        </div>
      </div>
      <div id="tableGrid" style="position: relative;">
        <!-- <svg :width="svgWidth" :height="svgHeight" id="tableSvg">
        </svg> -->
        <svg :width="svgWidth" :height="svgHeight" id="tableSvg">
          <g v-for="item in lineArray">
            <line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
          </g>
          <g v-for="(item,index) in lineArray" v-if="index < rows">
            <line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:0.5px;"></line>
          </g>
        </svg>
        <div v-if="tipView">
          <div style="position: absolute;background-color: #e0e052;font-size: 12px;z-index: 15" :style="{ top:tipTop+'px',left:tipLeft+'px'}">
            <div>
              {{lineObj.ITEM_NAME}}({{lineObj.DOSAGE_UNITS}})
            </div>
            <div>
              =========
            </div>
            <div>
              开始时间：{{lineObj.START_TIME}}
            </div>
            <div>
              结束时间：{{lineObj.ENDDATE}}
            </div>
            <div>
              流速：{{lineObj.PERFORM_SPEED}}
            </div>
            <div>
              总量：{{lineObj.DOSAGE}}
            </div>
            <div>
              鼠标当前时间：{{lineObj.nowTime}}
            </div>
          </div>
        </div>
        <!-- <div style="position: absolute;top: 0px; left: 100px;background-color: white;">
          <div style="height: 8px;">
            <span style="font-size:10px;-webkit-transform:scale(0.8);display: inline-block;">
            ivg
          </span>
          </div>
          <div style="height: 8px;">
            <span style="font-size:10px;-webkit-transform:scale(0.8);display: inline-block;">
            ivg
          </span>
          </div>
        </div> -->
        <div style="position: absolute;z-index: 5;" :style="{top:item.y1-svgHeight/rows/8+'px',left:item.x1+'px',width:item.w+'px',height:svgHeight/rows/4+'px'}" @mouseenter="showTipInfo(item,$event)" @mouseleave="hideTipInfo()" v-for="item in xArray" @mousemove.stop="mouseMoveInfo(item,$event)">
        </div>
      </div>
    </div>
    <div v-else>
      <div style="max-height: 20px;">
        <div v-for="(item,index) in xTimeArray" v-if="index%3==0" style="width: 28px;margin-left: -10px;font-size: 12px;display: inline-block;">{{item}}</div>
        <div v-else style="width: 12px;display: inline-block;"></div>
      </div>
      <div>
        <div v-for="(item,index) in dataArray" :style="{top:svgHeight/rows*index+20+'px'}" style="height: 14px;line-height: 12px;width: 165px;border-bottom: 1px solid #8391a2;  font-size: 12px;position: absolute;left: -165px;">
        </div>
      </div>
      <div id="tableGrid" style="position: relative;">
        <svg :width="svgWidth" :height="svgHeight" id="tableSvg">
          <g v-for="item in lineArray">
            <line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
          </g>
          <g v-for="item in lineArray">
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
      percentPageData: [],
      timeRequestSec: 10000, //多久请求一次
      setIntervalId: '', //定时器返回的一个ID

    }
  },
  methods: {
    getLineXy() {
      var array = [];
      for (var i = 0; i < this.columns; i++) {
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
    init() {
      var w = this.svgWidth,
        h = this.svgHeight,
        p = this.svgPadding, //内边距  
        x = d3.scaleLinear().domain([0, 1]).range([0, w - p]), //(2) 定义x和y比例尺  
        y = d3.scaleLinear().domain([0, 1]).range([0, h - p]);
      this.wd = w;
      this.ht = h;

      //(3) 绘制SVG  
      var svg = d3.select("#tableSvg")
      //(4) 给SVG添加分组，并设置样式类，样式见<style>标签中的设置  
      // console.log(x(0.51))
      var grid = svg.selectAll(".grid")
        .data(x.ticks(this.columns))
        .enter()
        .append("g")
        .attr("class", "grid");
      //(5) 添加线条，设置起始坐标(x1,y1)和结束坐标(x2,y2)的值即可  
      //竖线  
      grid.append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", 0)
        .attr("y2", h - p);

      //横线  
      grid.data(y.ticks(this.rows))
        .append("line")
        .attr("y1", y)
        .attr("y2", y)
        .attr("x1", 0)
        .attr("x2", w - p);

      const line = d3.line()
        .x(
          (d) => {
            return d.x
          }
        )
        .y(
          (d) => {
            return d.y
          }
        );
    },
    //对时间进行计算操作
    timeControl(startTime) {

      var m = this.tbMin; //加几分钟
      var timeDate = new Date(startTime);
      var toMin = timeDate.getTime() + 1000 * 60 * m;
      var timeArray = [];
      for (var i = 0; i <= this.columns; i++) {
        // if (i == 0) {

        // }
        timeArray.push(new Date(timeDate.getTime() + 1000 * 60 * m * i).Format("hh:mm"));
      }
      this.config.initTime = new Date(timeDate.getTime());
      this.config.maxTime = new Date(timeDate.getTime() + 1000 * 60 * m * this.columns);
      this.xTimeArray = timeArray;
    },
    //时间初始化显示
    xTimeInit() {
      if (this.config.userInfo.inDateTime && this.config.userInfo.inDateTime != "" && this.config.userInfo.inDateTime != null &&
        !this.page) {
        this.timeControl(this.config.userInfo.inDateTime);
      } else {
        this.timeControl(new Date().Format("yyyy-MM-dd") + " 08:00");
      }
      this.getLineXy();
      if (this.page == false) {
        this.selectMedAnesthesiaEventList();
      }

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
      // var m = 0; // this.dataArray = []; // this.xArray = [];

      this.api.selectMedAnesthesiaEventList(params)
        .then(res => {
          var list = res.list;
          this.dataOperChange(list);

          return false;
          for (var i = 0; i < list.length; i++) {

            if (list[i].START_TIME) {
              if (i == this.rows)
                break;
              else {
                //开始时间间隔
                let sMin = ''
                //结束时间间隔
                let eMin = ''
                sMin = this.getMinuteDif(this.config.userInfo.inDateTime, list[i].START_TIME);
                if (list[i].ENDDATE == null || list[i].ENDDATE == "") {

                  if (new Date(list[i].MAX_TIME) > this.maxTime) {
                    eMin = this.getMinuteDif(this.config.userInfo.inDateTime, this.maxTime);
                  } else {
                    eMin = this.getMinuteDif(this.config.userInfo.inDateTime, list[i].MAX_TIME);
                  }

                } else {
                  eMin = this.getMinuteDif(this.config.userInfo.inDateTime, list[i].ENDDATE);
                }
                let x1 = Math.round(sMin / lMin * (w / this.columns))
                let x2 = Math.round(eMin / lMin * (w / this.columns))
                let y1 = Math.round(h / this.rows / 2 * (m + 1) + h / this.rows * m / 2)
                let y2 = Math.round(h / this.rows / 2 * (m + 1) + h / this.rows * m / 2)
                if (list[i].DURATIVE_INDICATOR == 1) {
                  this.xArray.push({
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    w: x2 - x1,
                    obj: list[i]
                  })
                  this.dataArray.push(list[i]);
                  // this.$set(this.dataArray, i, list[i]);
                  this.createLine(x1, x2, y1, y2, list[i]);
                  m++;
                }
              }
            }
          }
          for (var k = 0; k < this.rows - m; k++) {
            this.dataArray.push(m)
          }

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
      var svg = d3.select("#tableSvg");
      var _this = this;
      var t;
      obj.nowTime = '';
      var gWidth = this.svgWidth / this.columns;
      if (obj.DURATIVE_INDICATOR == 1 && (obj.ENDDATE == null || obj.ENDDATE == "")) {
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "test")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x1)
          .attr("x2", x1)
        svg.append("path")
          .attr('d', this.drawLineArrow(x1, y1, x2, y2))
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "test")
        // .on("mouseenter", function() { // //clearTimeout(t) // _this.tipView = true; // _this.tipLeft = x1; // _this.tipTop = y2 + 10; // _this.lineObj = obj; // }) // .on("mouseleave", function() { // //t = setTimeout(function (){ // _this.tipView = false; // //}, 1000); // }) // .on("mousemove", function(ev) { // //_this.lineObj.nowTime = new Date(); // _this.$set(_this.lineObj, "nowTime", _this.getTime()); // var ev = ev || event; // var offX = ev.offsetX; //横坐标值 // var m = Math.round(offX / gWidth * 5); // var time = new Date(_this.config.userInfo.inDateTime); // var time1 = time.getTime() + m * 60 * 1000; // var time2 = new Date(time1).Format("yyyy-MM-dd hh:mm"); // obj.nowTime = time2; // _this.lineObj = obj; // })

      }
      if (obj.DURATIVE_INDICATOR == 1 && obj.ENDDATE != null && obj.ENDDATE != "") {
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "test")
          .attr("y1", y1 - 4)
          .attr("y2", y2 + 4)
          .attr("x1", x1)
          .attr("x2", x1)
        svg.append("line")
          .attr("stroke", "blue")
          .attr("fill", "none")
          .attr("stroke-width", 1)
          .attr("class", "test")
          .attr("y1", y1)
          .attr("y2", y2)
          .attr("x1", x1)
          .attr("x2", x2)
        // .on("mouseenter", function() {

        //   _this.tipView = true;
        //   _this.tipLeft = x1;
        //   _this.tipTop = y2 + 10;
        //   _this.lineObj = obj;

        // })
        // .on("mouseleave", function() {
        //   _this.tipView = false;
        // })
        // .on("mousemove", function(ev) {
        //   //_this.lineObj.nowTime = new Date();
        //   _this.$set(_this.lineObj, "nowTime", _this.getTime());
        //   var ev = ev || event;
        //   var offX = ev.offsetX; //横坐标值
        //   var m = Math.round(offX / gWidth * 5);
        //   var time = new Date(_this.config.userInfo.inDateTime);
        //   var time1 = time.getTime() + m * 60 * 1000;
        //   var time2 = new Date(time1).Format("yyyy-MM-dd hh:mm");
        //   obj.nowTime = time2;
        //   _this.lineObj = obj;
        //   console.log(_this.lineObj)
        // })
        svg.append("line")
          .attr('stroke-width', 1)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("class", "test")
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
    showTipInfo(item, ev) {
      this.tipView = true;
      this.tipLeft = ev.offsetX;
      this.tipTop = item.y2 + 10;
      if (item.obj.ENDDATE == null || item.obj.ENDDATE == "") {
        item.obj.ENDDATE = (item.obj.MAX_TIME);
      }
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
      var time = this.config.initTime;
      var time1 = time.getTime() + m * 60 * 1000;
      var time2 = new Date(time1).Format("yyyy-MM-dd hh:mm");
      item.obj.nowTime = time2;
      this.lineObj = item.obj;
    },

    //翻页
    pageChange() {
      var svg = d3.selectAll(".test")
      svg.remove();
      if (this.config.pageOper == 0) {
        this.config.pageNum = 1;
        this.timeControl(this.config.userInfo.inDateTime);
        this.selectMedAnesthesiaEventList();
      }
      if (this.config.pageOper == -1) {
        this.timeControl(this.config.initTime)
        let m = this.config.initTime.getTime() - 250 * 60 * 1000;
        this.timeControl(new Date(m));
        var list = [];
        list = this.percentPageData;

        for (var i = 0; i < list.length; i++) {
          if (this.config.pagePercentNum != 1 && list[i].MAX_TIME) {
            list[i].vStartTime = new Date(m).Format("yyyy-MM-dd hh:mm:ss");
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
          if (list[i].MAX_TIME) {
            if (list[i].ENDDATE == null || list[i].ENDDATE == "") {

              if (new Date(list[i].MAX_TIME) > this.config.maxTime) {
                list[i].vStartTime = this.config.maxTime.Format("yyyy-MM-dd hh:mm:ss");
                arrayList.push(list[i]);
              } else {}
            } else {
              if (new Date(list[i].ENDDATE) > this.config.maxTime) {
                list[i].vStartTime = this.config.maxTime.Format("yyyy-MM-dd hh:mm:ss");
                arrayList.push(list[i]);
              } else {

              }
            }
          }
        }
        this.timeControl(this.config.maxTime)
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
            if (this.config.pagePercentNum == 1) {
              sMin = this.getMinuteDif(this.config.initTime, list[i].START_TIME);
            } else {
              sMin = this.getMinuteDif(this.config.initTime, list[i].vStartTime);
            }
            //如果病人这个用药没有结束时间那么默认使用过程中最大的时间
            if (list[i].ENDDATE == null || list[i].ENDDATE == "") {

              // if (new Date(list[i].MAX_TIME) > this.maxTime) {
              //   if (this.config.pageOper == 0) {
              //     eMin = this.getMinuteDif(this.initTime, this.maxTime);
              //   }
              //   if (this.config.pageOper == -1) {
              //     eMin = this.getMinuteDif(new Date(this.initTime.getTime() - 250 * 60 * 1000), this.maxTime);
              //   }
              //   if (this.config.pageOper == 1) {
              //     eMin = this.getMinuteDif(this.initTime, this.maxTime);
              //   }
              // } else {
              //   eMin = this.getMinuteDif(this.config.userInfo.inDateTime, list[i].MAX_TIME);
              // }
              if (new Date(list[i].MAX_TIME) > this.config.maxTime) {
                eMin = this.getMinuteDif(this.config.initTime, this.config.maxTime);
              } else {
                eMin = this.getMinuteDif(this.config.initTime, new Date(list[i].MAX_TIME));
              }


            } else {

              if (new Date(list[i].ENDDATE) > this.config.maxTime) {
                eMin = this.getMinuteDif(this.config.initTime, this.config.maxTime);
              } else {
                eMin = this.getMinuteDif(this.config.initTime, new Date(list[i].ENDDATE));
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

    },
    //定时请求数据
    timeRequest() {
      this.setIntervalId = setInterval(() => {
        if (this.page == false) {
          var svg = d3.selectAll(".test")
          svg.remove();
          this.selectMedAnesthesiaEventList();
        }
      }, this.timeRequestSec)
    },


  },
  mounted() {
    this.area = this.$refs.area;
    this.xTimeInit();

  },
  created() {
    Bus.$on('test', this.pageChange)
    // this.timeRequest()

  },
  beforeDestroy() {
    Bus.$off('test', this.pageChange);
    clearInterval(this.setIntervalId)

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
