<template>
  <div style="position: relative;margin:2px;" @contextmenu="showMenu">
    <div>
      <svg :width="svgWidth" :height="svgHeight" id="operGrid" ref="area">
        <g v-for="item in lineArray">
          <line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
        </g>
        <g v-for="item in lineArray">
          <line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:0.5px;"></line>
        </g>
        <!--  <g v-for="(item,index) in data">
          <circle :cx="item.x" :cy="item.y" r="3.5" fill="green" @mousedown.stop="itemMouseDown($event,item,index)"></circle>
        </g>
        <g>
          <path :d="pathData" stroke-width="1" fill="none" stroke="blue" ></path>
        </g> -->
        <g v-for="(item,index1) in dataPathArray" style="z-index: 22">
          <path :d="item.path" stroke-width="1" fill="none" stroke="blue"></path>
          <circle v-for="(cir,index2) in item.circleData" v-if="item.flag==0" :cx="cir.x" :cy="cir.y" r="3.5" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)"></circle>
          <circle v-for="(cir,index2) in item.circleData" :cx="cir.x" :cy="cir.y" r="2" fill="red" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" v-if="item.flag==1" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)"></circle>
          <!-- <polygon points="1,4 8,4 4,10" style="fill:lime;"></polygon>
 -->
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
      <div style="position: absolute;bottom: 0px;left: -30px;text-align: right;font-size: 12px;">
        <div v-for="item in yValueArray" style="height: 22px;">
          {{item}}
        </div>
      </div>
      <div style="position: absolute;bottom: 0px;right: -30px;text-align: left;font-size: 12px;">
        <div v-for="item in yValueArray" style="height: 22px;">
          {{item}}
        </div>
      </div>
    </div>
    <div v-if="showStyleView" style="background-color: #e6e6e6;position: absolute;top: 30%;" :style="{ top:rightViewY+'px',left:rightViewX+'px'}">
      <div style="padding: 10px;">
        个性化体征显示
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
export default {
  name: 'dosage',
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
    }

  },
  methods: {
    showMenu: function(parameter) {
      parameter.preventDefault()
      this.rightViewX = parameter.offsetX;
      this.rightViewY = parameter.offsetY;
      //this.showStyleView = true;

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

      // var isdown = false;
      // var svg = d3.select("#operGrid")
      // svg.append("path")
      //   .attr("d", dataone(this.data))
      //   .attr('stroke-width', 1)
      //   .attr("fill", "none")
      //   .attr("stroke", "blue")

      // var g = svg.selectAll('circle')
      // .data(this.data)
      // .enter()
      // .append('g')
      // .append('circle')
      // //.attr('class', 'linecircle')
      // .attr('cx', dataone.x())
      // .attr('cy', dataone.y())
      // .attr('r', 3)
      // .attr('fill','green')
      // // .on('mouseover', function() {
      // //   d3.select(this).transition().duration(500).attr('r', 5);
      // // })
      // // .on('mouseout', function() {
      // //   d3.select(this).transition().duration(500).attr('r', 3);
      // // }) 
      // .on('mousedown',function(data,ev){
      //  var ev = ev || event;
      //  isdown = true;
      //  console.log(data)
      //  console.log(ev)
      // })
      // .on('mousemove',function(data){

      //  if(isdown){
      //    svg.selectAll("circle").remove()
      //    var p = d3.select("#operGrid")
      //    .select("path").remove()

      //     _this.data = [{ "x": 14, "y": 400 },
      //    { "x": 28, "y": 410 },
      //    { "x": 42, "y": 40 },
      //    { "x": 56, "y": 5 },
      //    ]
      //    _this.calculatePath(); 
      //  }


      // })
      // .on('mouseup',function(ev){
      //  isdown = false;
      //  var ev = ev || event;
      //  console.log(ev)
      // })
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

      //console.log(arr1[this.clickIndex])
      //this.$set(this.pathArray,1,arr1)
      // this.dataPathArray[this.pathIndex].circleData
      // var p = d3.select("#operGrid")
      //   .select("path").remove()
      this.calculatePath();
    },
    areaMouseUp(e) {
      console.log(this.clickItem)

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
      console.log(this.updateDataArray)
      let params = this.updateDataArray;
      this.api.updateMedPatientMonitorDatas(params)
        .then(res => {
          this.updateDataArray = [];
        })

    },

    getSignName() {
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
              let item = res[i].dataValue;
              item = eval('(' + item + ')');
              //item = JSON.parse(item);
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
                let min = this.getMinuteDif(this.config.userInfo.inDateTime, newArray[i][j].time);
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
    }
  },
  mounted() {
    this.getLineXy();
    this.getSignName();
    this.getYDataArray();
    this.area = this.$refs.area;
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
