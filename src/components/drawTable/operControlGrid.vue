<template>
  <div style="position: relative;margin:2px;" @contextmenu="showMenu">
    <div>
      <svg :width="svgWidth" :height="svgHeight" id="opercontrolgridprint" ref="area">
        <g v-for="item in lineArray">
          <line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
        </g>
        <g v-for="(item,index) in lineArray" v-if="index < rows">
          <line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:0.5px;"></line>
        </g>
        <!--  <g v-for="(item,index) in data">
          <circle :cx="item.x" :cy="item.y" r="3.5" fill="green" @mousedown.stop="itemMouseDown($event,item,index)"></circle>
        </g>
        <g>
          <path :d="pathData" stroke-width="1" fill="none" stroke="blue" ></path>
        </g> -->
        <g v-for="(item,index1) in dataPathArray" style="z-index: 22">
          <!-- <path :d="item.path" stroke-width="1" fill="none" stroke="blue"></path>-->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <!-- <circle class="opercontrol" v-for="(cir,index2) in item.circleData" v-if="item.flag==0" :cx="cir.x" :cy="cir.y" r="3.5" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)"></circle> -->
          <g v-for="(cir,index2) in item.circleData" v-if="item.flag==0" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <line stroke="blue" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="5" x2="5" y1="-2.5" x1="-3" stroke-width="1.5" fill="none" />
            <line stroke="blue" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="5" x2="-3" y1="-2.5" x1="5" stroke-width="1.5" fill="none" />
            <!-- <circle class="opercontrol" r="3" fill="blue"></circle> -->
          </g>
          <circle class="opercontrol" v-for="(cir,index2) in item.circleData" :cx="cir.x" :cy="cir.y" r="2" fill="red" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" v-if="item.flag==1" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)"></circle>
        </g>
      </svg>
      <div v-if="tipView">
        <div style="position: absolute;background-color: #e0e052;font-size: 12px;z-index: 10;padding: 0 2px;" :style="{ top:tipTop+'px',left:tipLeft+'px'}">
          <div>
            {{mouseItem.itemData.itemName}}
          </div>
          <div>
            ================
          </div>
          <div>
            时间：{{mouseItem.time}}
          </div>
          <div>
            值：{{mouseItem.value}}
          </div>
        </div>
      </div>
      <div style="position: absolute;bottom: 0px;left: -25px;text-align: right;font-size: 12px;">
        <div v-for="item in yValueArray" style="height: 22px;">
          {{item}}
        </div>
      </div>
      <div style="position: absolute;bottom: 0px;right: -25px;text-align: left;font-size: 12px;">
        <div v-for="item in yValueArray" style="height: 22px;">
          {{item}}
        </div>
      </div>
    </div>
    <div v-if="showStyleView" style="background-color: #e6e6e6;position: absolute;top: 30%;" :style="{ top:rightViewY+'px',left:rightViewX+'px'}">
      <div style="padding: 10px;" @click="tipShowPersonStyle">
        个性化体征显示
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
import Bus from '@/bus.js';
export default {
  name: 'opercontrolgridprint',
  data() {
    return {
      showStyleView: false,
      lineArray: [],
      svgWidth: 700,
      svgHeight: 420,
      columns: 50,
      rows: 30,
      dataArray: [],
      forRows: 6,
      tbMin: 5,
      outRows: 3,
      tipTop: 0,
      tipLeft: 0,
      tipView: false,
      dataObj: {},
      clickItem: '',
      clickIndex: '',
      pathIndex: '',
      pathData: '',
      pathArray: [],
      dataPathArray: [],
      signdataList: [],
      tipTop: 0,
      tipLeft: 0,
      tipView: false,
      mouseItem: '',
      updateDataArray: [],
      yValueArray: [],
      rightViewX: '',
      rightViewY: '',
      signNameLisg: [],
      setTimeId: '', //定时器执行
    }

  },
  methods: {
    showMenu: function(parameter) {
      // parameter.preventDefault()
      // this.rightViewX = parameter.offsetX;
      // this.rightViewY = parameter.offsetY;
      // this.showStyleView = true;

    },
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
    calculatePath() {
      this.dataPathArray = [];
      //构造器会将数据集中的每一个数据传入访问器函数，并使用其返回值作为 x坐标或y坐标：
      const dataone = d3.line()
        .x(
          (data) => {
            return data.x
          }
        )
        .y(
          (data) => {
            return data.y
          }
        );
      for (var i = 0; i < this.pathArray.length; i++) {
        if (i % 2 == 0)
          this.dataPathArray.push({
            path: dataone(this.pathArray[i]),
            circleData: this.pathArray[i],
            flag: 0
          })
        else
          this.dataPathArray.push({
            path: dataone(this.pathArray[i]),
            circleData: this.pathArray[i],
            flag: 1
          })


      }
    },
    itemMouseDown(e, currentItem, index1, index2) {
      this.area.addEventListener('mousemove', this.areaMouseMove);
      this.area.addEventListener('mouseup', this.areaMouseUp);
      this.clickItem = currentItem;
      this.clickIndex = index2;
      this.pathIndex = index1;

    },
    areaMouseMove(e) {
      this.clickItem.y = e.offsetY;
      var arr1 = this.pathArray[this.pathIndex];
      var arr2 = arr1[this.clickIndex];
      arr1[this.clickIndex] = this.clickItem;
      if (this.svgHeight - 0.5 <= this.clickItem.y) {
        this.clickItem.value = 0
      } else {
        this.clickItem.value = Math.round((this.svgHeight - e.offsetY) / (this.svgHeight / this.rows) * 10)
      }
      this.calculatePath();
    },
    areaMouseUp(e) {
      this.area.removeEventListener('mousemove', this.areaMouseMove);
      this.area.removeEventListener('mouseup', this.areaMouseUp);
      let moveValue
      if (this.svgHeight - 0.5 <= this.clickItem.y) {
        moveValue = 0;
      } else {
        moveValue = Math.round((this.svgHeight - this.clickItem.y) / (this.svgHeight / this.rows) * 10);
      }

      this.updateDataArray.push({
        itemName: this.clickItem.itemData.itemCode,
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0,
        timePoint: new Date(this.clickItem.time),
        itemValue: moveValue,
        operator: "mdsd"
      })

      let params = this.updateDataArray;
      this.api.updateMedPatientMonitorDatas(params)
        .then(res => {
          this.updateDataArray = [];
        })

    },
    //获取病人生命体征项目
    getSignName() {
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0,
      }

      this.api.getSignName(params)
        .then(
          res => {
            for (var i = 0; i < res.length; i++) {
              res[i].itemValue = "";
            }
            this.getSignTimeData(res.length, res);
            this.signNameLisg = res;
            this.setTimeId = setTimeout(_ => this.getSignName(), this.config.timeSet)
          })
    },

    getSignTimeData(len, list) {
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0
      }
      this.api.getSignTimeData(params)
        .then(
          res => {
            var sortArray = [];
            for (var i = 0; i < res.length; i++) {
              var item = res[i].dataValue;
              item = eval('(' + item + ')');
              let xL = len - item.length

              if (xL > 0) {
                for (var j = 0; j < xL; j++) {
                  item.push('');
                }
              }
              res[i].dataValue = item;
            }
            res.sort(function(a, b) {
              return Date.parse(a.time) - Date.parse(b.time); //时间正序
            });
            for (var i = 0, l = res.length; i < l; i++) {
              sortArray.push(res[i]);
            }
            this.signdataList = sortArray;
            var newArray = [];
            for (var i = 0; i < len; i++) {
              var arr1 = [];
              for (var j = 0; j < sortArray.length; j++) {
                if (sortArray[j].dataValue[i]) {
                  arr1.push({
                    value: sortArray[j].dataValue[i],
                    time: sortArray[j].time,
                    itemData: list[i]

                  })
                } else {
                  arr1.push({
                    value: "",
                    time: sortArray[j].time,
                    itemData: list[i]

                  })
                }

              }
              newArray.push(arr1)


            }
            for (var i = 0; i < newArray.length; i++) {
              for (var j = 0; j < newArray[i].length; j++) {
                let min = '';
                if (new Date(newArray[i][j].time) > this.config.maxTime) {
                  min = this.getMinuteDif(this.config.initTime, this.config.maxTime) + 1;
                } else {
                  min = this.getMinuteDif(this.config.initTime, newArray[i][j].time);
                }
                let x = Math.round(min / this.tbMin * (this.svgWidth / this.columns))
                let y = this.svgHeight - Math.round(newArray[i][j].value / 10 * (this.svgHeight / this.rows))
                newArray[i][j].x = x;
                newArray[i][j].y = y;
              }
            }



            this.pathArray = newArray;
            this.calculatePath();
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

    showData(item, ev) {
      this.mouseItem = item;
      this.tipLeft = ev.offsetX;
      this.tipTop = item.y + 20;
      this.tipView = !this.tipView;
    },

    getYDataArray() {
      var arry = [0];
      for (var i = 0; i < 11; i++) {
        arry.push(i * 20 + 20)
      }
      this.yValueArray = arry.reverse();
    },
    pageTurnFun() {
      if (this.config.pageOper == 0) {
        this.config.pageNum = 1;
      }
      var list = this.signNameLisg;
      let arryList = this.signdataList;
      let sortArray = [];
      for (var i = 0; i < arryList.length; i++) {
        if (new Date(arryList[i].time) > this.config.initTime) {
          sortArray.push(arryList[i])
        }

      }
      if (sortArray.length < 1) {
        this.pathArray = [];
        this.calculatePath();
        return
      }

      this.dataOperFun(sortArray);


    },

    //数据处理
    dataOperFun(sortArray) {
      var list = this.signNameLisg;
      var newArray = [];
      for (var i = 0; i < 8; i++) {
        var arr1 = [];
        for (var j = 0; j < sortArray.length; j++) {
          if (sortArray[j].dataValue[i]) {
            arr1.push({
              value: sortArray[j].dataValue[i],
              time: sortArray[j].time,
              itemData: list[i]

            })
          } else {
            arr1.push({
              value: "",
              time: sortArray[j].time,
              itemData: list[i]

            })
          }

        }
        newArray.push(arr1)
      }
      for (var i = 0; i < newArray.length; i++) {
        for (var j = 0; j < newArray[i].length; j++) {
          let min = '';
          if (new Date(newArray[i][j].time) > this.config.maxTime) {
            min = this.getMinuteDif(this.config.initTime, this.config.maxTime) + 1;
          } else {
            min = this.getMinuteDif(this.config.initTime, newArray[i][j].time);
          }
          let x = Math.round(min / this.tbMin * (this.svgWidth / this.columns))
          let y = this.svgHeight - Math.round(newArray[i][j].value / 10 * (this.svgHeight / this.rows))
          newArray[i][j].x = x;
          newArray[i][j].y = y;
        }
      }
      this.pathArray = newArray;
      this.calculatePath();
    },
    //显示个性化体征
    tipShowPersonStyle() {
      this.showStyleView = false;
      Bus.$emit('showPersonStyle', 1);
    },
    //初始化执行函数
    initFun() {
      this.getLineXy();
      if (this.page == false) {
        this.getSignName();
      }

      this.getYDataArray();
    },
    runTimeFun() {
      this.initFun()

    }
  },
  mounted() {
    if (this.setTimeId) {
      clearTimeout(this.setTimeId);
    }
    this.initFun()
    this.area = this.$refs.area;
  },
  created() {
    Bus.$on('test', this.pageTurnFun)
  },
  beforeDestroy() {
    Bus.$off('test', this.pageTurnFun);
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


</style>
