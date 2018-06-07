<template>
  <div style="position: relative;margin:2px;">
    <!-- <div style="height: 2px;width: 700px;background-color: red;margin-bottom: 20px;"></div> -->
    <div v-if="!page">
      <div style="max-height: 20px;">
        <div v-for="(item,index) in xTimeArray" v-if="index%3==0" style="width: 30px;margin-left: -9pt;font-size: 12px;display: inline-block;" :title="item">{{item}}</div>
        <div v-else style="width: 12px;display: inline-block;"></div>
      </div>
      <div>
        <div v-for="(item,index) in dataArray" v-if="index < rows-1" :style="{top:svgHeight/rows*index+20+'px',height:svgHeight/rows+'px'}" style="height: 14px;line-height: 14px;width: 160px;border-bottom: 1px solid #8391a2;  font-size: 12px;position: absolute;left: -165px;padding-left: 5px;white-space:nowrap;word-break: keep-all;">
          <span v-if="item.ITEM_NAME"> {{item.ITEM_NAME}}({{item.DOSAGE_UNITS}})</span>
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
        <div @mouseenter="showTipInfo(item,$event)" @mouseleave="hideTipInfo()" v-if="item.obj.DURATIVE_INDICATOR=='0'" style="cursor: default;position: absolute;font-size: 8pt;color: blue;" :style="{top:index*15+'px',left:item.x1-1+'px',height:svgHeight/rows-3+'px',lineHeight:svgHeight/rows+'px'}" v-for="(item,index) in xArray">
          <span style="padding: 0 2px 0 0px;">{{item.obj.DOSAGE}}</span>
        </div>
        <div v-if="item.obj.DURATIVE_INDICATOR=='1'" style="position: absolute;font-size: 8pt;color: blue;background-color: white;" :style="{top:index*15+'px',left:item.x1+item.w/2-1+'px',height:svgHeight/rows-3+'px',lineHeight:svgHeight/rows+'px'}" v-for="(item,index) in xArray">
          <span style="padding: 0 2px 0 0px;">{{item.obj.DOSAGE}}</span>
        </div>
        <div v-if="tipView">
          <div style="position: absolute;max-width:300px;min-width:220px;width:auto;background-color: white;border: 0.5px solid;padding: 3px;font-size: 12px;z-index: 15" :style="{ top:tipTop+'px',left:tipLeft+'px'}">
            <div>
              {{lineObj.ITEM_NAME}}({{lineObj.DOSAGE_UNITS}})
            </div>
            <div>
              =========
            </div>
            <div>
              开始时间：{{lineObj.START_TIME}}
            </div>
            <div v-if="lineObj.DURATIVE_INDICATOR=='1'">
              结束时间：{{lineObj.ENDDATE}}
            </div>
            <div v-if="lineObj.DURATIVE_INDICATOR=='1'">
              流速：{{lineObj.PERFORM_SPEED}}
            </div>
            <div>
              总量：{{lineObj.DOSAGE}}
            </div>
            <div v-if="lineObj.DURATIVE_INDICATOR=='1'">
              鼠标当前时间：{{lineObj.nowTime}}
            </div>
          </div>
        </div>
        <div v-if="item.obj.DURATIVE_INDICATOR=='1'" style="position: absolute;z-index: 5;" :style="{top:item.y1-svgHeight/rows/8+'px',left:item.x1+'px',width:item.w+'px',height:svgHeight/rows/4+'px'}" @mouseenter="showTipInfo(item,$event)" @mouseleave="hideTipInfo()" v-for="item in xArray" @mousemove.stop="mouseMoveInfo(item,$event)">
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
      setTimeId: '', //定时器返回的一个ID

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
      var svg = d3.selectAll(".test")
      svg.remove();
      var m = this.tbMin; //加几分钟
      var timeDate = new Date(startTime);
      var toMin = timeDate.getTime() + 1000 * 60 * m;
      var timeArray = [];
      let startMinTime = this.config.startMinTime
      let defaultTime = new Date().Format("yyyy-MM-dd") + " 08:00"
      if (this.config.pageOper == 0 && startMinTime) {
        for (var i = 0; i <= this.columns; i++) {

          timeArray.push(new Date(new Date(startMinTime).getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      } else if (!startMinTime && this.config.pageOper == 0) {
        for (var i = 0; i <= this.columns; i++) {
          timeArray.push(new Date(new Date(defaultTime).getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      } else {
        for (var i = 0; i <= this.columns; i++) {

          timeArray.push(new Date(this.config.initTime.getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      }

      // this.config.initTime = new Date(timeDate.getTime());
      // this.config.maxTime = new Date(timeDate.getTime() + 1000 * 60 * m * this.columns);
      this.xTimeArray = timeArray;
      this.$nextTick(function() {
        this.getLineXy();
        if (this.page == false) {
          this.selectMedAnesthesiaEventList();
        }
      })

    },
    timeControlNoTime(startTime) {
      var svg = d3.selectAll(".test")
      svg.remove();
      var m = this.tbMin; //加几分钟
      var timeDate = new Date(startTime);
      var toMin = timeDate.getTime() + 1000 * 60 * m;
      var timeArray = [];
      let startMinTime = this.config.startMinTime
      let defaultTime = new Date().Format("yyyy-MM-dd") + " 08:00"
      if (this.config.pageOper == 0 && startMinTime) {
        for (var i = 0; i <= this.columns; i++) {

          timeArray.push(new Date(new Date(startMinTime).getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      } else if (!startMinTime && this.config.pageOper == 0) {
        for (var i = 0; i <= this.columns; i++) {
          timeArray.push(new Date(new Date(defaultTime).getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      } else {
        for (var i = 0; i <= this.columns; i++) {

          timeArray.push(new Date(this.config.initTime.getTime() + 1000 * 60 * m * i).Format("hh:mm"));
        }
      }

      // this.config.initTime = new Date(timeDate.getTime());
      // this.config.maxTime = new Date(timeDate.getTime() + 1000 * 60 * m * this.columns);
      this.xTimeArray = timeArray;
      this.$nextTick(function() {
        this.getLineXy();
        if (this.page == false) {
          this.selectMedAnesthesiaEventListNoTime();
        }
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
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
      }

      this.api.getBeginTime(params)
        .then(rest => {
          if (rest.TIME) {
            //如果存在病人的入手术时间
            if (this.config.userInfo.inDateTime) {
              if (new Date(rest.TIME) > this.config.userInfo.inDateTime) {
                this.config.startMinTime = this.config.userInfo.inDateTime
              } else {
                this.config.startMinTime = rest.TIME
              }
            } else {
              this.config.startMinTime = rest.TIME
            }
          } else {
            if (this.config.userInfo.inDateTime) {
              this.config.startMinTime = this.config.userInfo.inDateTime
            } else {
              this.config.startMinTime = new Date().Format("yyyy-MM-dd") + " 08:00";
            }
          }
          if (!this.page) {
            this.timeControl(this.config.startMinTime);
          } else {
            this.timeControl(new Date().Format("yyyy-MM-dd") + " 08:00");
          }
          // this.getLineXy();
          // if (this.page == false) {
          //   this.selectMedAnesthesiaEventList();
          // }
        })


      // this.api.getBeginTime(params)
      // .then(res => {
      //   // return
      //   if (res.TIME) {
      //     //如果入手术室时间存在
      //     if (this.config.userInfo.inDateTime &&
      //       !this.page) {
      //       let time = this.config.userInfo.inDateTime
      //       if (new Date(time) > new Date(res.TIME)) {
      //         // this.config.startMinTime 
      //         this.timeControl(res.TIME);
      //       } else {
      //         this.timeControl(this.config.userInfo.inDateTime);
      //       }
      //     } else {
      //       this.timeControl(res.TIME);
      //     }
      //   } else {
      //     this.timeControl(new Date().Format("yyyy-MM-dd") + " 08:00");
      //   }
      //   this.getLineXy();
      //   if (this.page == false) {
      //     this.selectMedAnesthesiaEventList();
      //   }
      // }) if (this.config.userInfo.inDateTime && this.config.userInfo.inDateTime != "" && this.config.userInfo.inDateTime != null &&
      //   !this.page) {
      //   this.timeControl(this.config.userInfo.inDateTime);
      // } else {
      //   this.timeControl(new Date().Format("yyyy-MM-dd") + " 08:00");
      // }
      // this.getLineXy();
      // if (this.page == false) {
      //   this.selectMedAnesthesiaEventList();
      // }

    },
    //加载病人麻醉事件里面麻醉用药数据
    selectMedAnesthesiaEventList() {
      //this.timeControl(this.maxTime);
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
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
          this.setTimeId = setTimeout(_ => this.selectMedAnesthesiaEventList(), this.config.timeSet)
          return false;
        });
    },
    //不加定时器的方法
    selectMedAnesthesiaEventListNoTime() {
      //this.timeControl(this.maxTime);
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
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
        if (x2 - x1 > 0) {
          svg.append("path")
            .attr('d', this.drawLineArrow(x1, y1, x2, y2))
            .attr('stroke-width', 1)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("class", "test")
        }


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
      this.tipLeft = ev.offsetX + item.x1;
      this.tipTop = item.y2 + 10;
      if (item.obj.ENDDATE == null || item.obj.ENDDATE == "") {
        item.obj.ENDDATE = this.config.patientMaxTime;
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
      this.tipLeft = ev.offsetX + item.x1;
      this.lineObj = item.obj;
    },

    //翻页
    pageChange() {
      var svg = d3.selectAll(".test")
      svg.remove();
      this.xArray = [];
      if (this.config.pageOper == 0) {
        this.config.pageNum = 1;
        this.xTimeInit();
        // this.timeControl(this.config.userInfo.inDateTime);
        // this.selectMedAnesthesiaEventList();
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
        // this.dataOperChange(list);


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
        this.timeControl(this.config.maxTime)
        // this.dataOperChange(arrayList);
      }
    },
    //处理数据进行划线
    dataOperChange(list) {
      var svg = d3.selectAll(".test")
      svg.remove();
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
            // if (list[i].vStartTime) {
            //   sMin = this.getMinuteDif(this.config.initTime, list[i].vStartTime);
            // } else {
            //   sMin = this.getMinuteDif(this.config.initTime, list[i].START_TIME);
            // }

            //如果病人这个用药没有结束时间那么默认使用过程中最大的时间
            if (list[i].ENDDATE == null || list[i].ENDDATE == "") {

              // if (new Date(list[i].MAX_TIME) > this.maxTime) {   if
              // (this.config.pageOper == 0) {     eMin =
              // this.getMinuteDif(this.initTime, this.maxTime);   }   if
              // (this.config.pageOper == -1) {     eMin =
              // this.getMinuteDif(new Date(this.initTime.getTime() - 250 * 60
              // * 1000), this.maxTime);   }   if (this.config.pageOper == 1)
              // {     eMin = this.getMinuteDif(this.initTime, this.maxTime);
              // } } else {   eMin =
              // this.getMinuteDif(this.config.userInfo.inDateTime,
              // list[i].MAX_TIME); }
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
            let y1 = Math.round(h / this.rows / 2 * (m + 1) + h / this.rows * m / 2)
            let y2 = Math.round(h / this.rows / 2 * (m + 1) + h / this.rows * m / 2)
            // if (list[i].DURATIVE_INDICATOR == 1 && x2 >= 0) {
            //   list[i].vStartTime = '';
            //   this.createLine(x1, x2, y1, y2, list[i]);
            //   this.xArray.push({
            //     x1: x1,
            //     y1: y1,
            //     x2: x2,
            //     y2: y2,
            //     w: x2 - x1,
            //     obj: list[i]
            //   })
            //   // this.$set(this.dataArray, i, list[i]);
            //   this.dataArray.push(list[i]);
            //   m++;
            // }

            list[i].vStartTime = '';
            if (list[i].DURATIVE_INDICATOR == 1 && x2 >= 0) {
              this.createLine(x1, x2, y1, y2, list[i]);
            }
            this.xArray.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
              w: x2 - x1,
              obj: list[i]
            })
            this.dataArray.push(list[i]);
            m++;
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
    if (this.setTimeId) {
      clearTimeout(this.setTimeId);
    }
    this.xTimeInit();

  },
  created() {
    Bus.$on('test', this.pageChange);
    Bus.$on('timeSetChange', this.timeControlNoTime)

  },
  beforeDestroy() {
    Bus.$off('test', this.pageChange);
    Bus.$off('timeSetChange', this.timeControlNoTime)
    clearTimeout(this.setTimeId);

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
