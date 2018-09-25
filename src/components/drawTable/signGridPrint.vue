<template>
  <div :style="{width:width+'px',height:height+'px'}" style="position: relative;margin:2px;">
    <div v-if="page==false" @mousemove="moveEvent($event)" @mouseout="outEvent()" :style="{width:width+'px',height:height+'px'}" style="position:relative;">
      <div v-for="(item,index) in dataBody" @mousemove.stop="moveEventInItem(item)" :style="{left:item.left+'px',bottom:item.bottom+'px'}" style="position:absolute;cursor:default;font-famliy:microsoft yahei;">
        <span v-if="item.name=='麻醉开始'" style="font-size:21px;">×</span>
        <span style="font-size:21px;font-family:microsoft yahei;" v-else-if="item.name=='手术开始'">⊙</span>
        <span style="color:red;font-size:21px;font-family:microsoft yahei;" v-else-if="item.name=='麻醉结束'">×</span>
        <span style="color:red;" v-else-if="item.name=='手术结束'">ⓧ</span>
        <span style="color:magenta;" v-else-if="item.name=='控制呼吸'">
          <svg :width="14+'px'" :height="5+'px'">
            <path stroke="magenta" id="svg_1" d="m0.75,0.75c0,0 4.705594,4.705594 4.567194,4.567194c0.1384,0.1384 4.290395,-4.013595 4.151995,-4.428795c0.002306,0.274494 4.807215,5.084015 4.705594,4.705594" opacity="0.5" stroke-width="1.5" fill="#fff" />
          </svg>
        </span>
        <span style="color:magenta;" v-else-if="item.name=='辅助呼吸'">A</span>
        <span style="color:magenta;" v-else-if="item.name=='自主呼吸'">○</span>
        <span v-else>{{item.hasNum}}</span>
      </div>
    </div>
    <div v-else>
      <!-- 表单设计器显示元素 -->
    </div>
    <div v-if="tipView">
      <div style="position: absolute;background-color: #fff;border:1px solid #222;font-size: 12px;z-index: 10;padding: 0 2px;" :style="{ top:tipTop+'px',left:tipLeft+'px'}">
        <div>
          {{nowTime}}
        </div>
        <div v-if="showDataMore">
          ================
        </div>
        <div v-if="showDataMore">
          名称：{{nameInItem}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '@/bus.js';
export default {
  data() {
    return {
      dataBody: [],
      dataOfBottom: [],
      tipTop: '',
      tipLeft: '',
      tipView: false,
      nowTime: '',
      nameInItem: '',
      showDataMore: false,
      dataOfXlength: '',
      anesStartTime: '',
      thedoubelData: '',
      // dataOfTop: 0,
      pageOn: '',
      maxTimeInPage: '',
      startTimeInPage: '',
      setTimeId: '', //定时器执行
    }
  },
  methods: {
    sortFun(a, b) {
      return a.left - b.left;
    },

    // 获取数据
    selectMedAnesthesiaEventList() {
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
      this.dataOfBottom = [];
      this.dataBody = [];
      let dataBodyNew = [];
      var nber = 1;
      this.pageOn = this.config.pageOper;
      this.maxTimeInPage = new Date(this.config.maxTime).getTime()
      this.startTimeInPage = new Date(this.config.initTime).getTime()
      var bothTimeLeft = this.maxTimeInPage - this.startTimeInPage

      // console.log(this.config.maxTime)
      // console.log(this.config.userInfo.inDateTime)
      this.thedoubelData = '';
      // let params = {
      //   patientId: this.config.userInfo.patientId,
      //   operId: this.config.userInfo.operId,
      //   visitId: this.config.userInfo.visitId,
      // }

      // this.api.selectSignMedAnesthesiaEventList(params)
      //   .then(
      //   res => {
      //     console.log(res.list)
      //     this.config.OperatingData = res.list;
      //     for (var i = 0; i < res.list.length; i++) {
      //       var time = new Date(res.list[i].START_TIME).getTime();
      //       if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
      //         var time1 = time - this.startTimeInPage
      //         var leftPlace = ((time1 * 2.78) / 60 / 1000);
      //         this.dataOfBottom.push({
      //           leftData: leftPlace
      //         })
      //         dataBodyNew.push({
      //           left: leftPlace,
      //           bottom: 0,
      //           name: res.list[i].ITEM_NAME,
      //           time: res.list[i].START_TIME,
      //         })
      //       }
      //     }
      // 输液
      let paramsTwo = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        itemClass: "3B",
        eventNo:this.config.eventNo,
      }
      this.api.selectMedAnesthesiaEventList(paramsTwo)
        .then(zze => {
          if (zze.list.length > 6) {
            for (var ti = 0; ti < 6; ti++) {
              for (var t = 6; t < zze.list.length; t++) {
                if (zze.list[ti].ITEM_NAME == zze.list[t].ITEM_NAME && zze.list[ti].ITEM_CLASS == zze.list[t].ITEM_CLASS) {

                } else {
                  var timeMoreOne = new Date(zze.list[t].START_TIME).getTime();
                  if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                    var time8 = timeMoreOne - this.startTimeInPage
                    var leftPlace8 = ((time8 * 2.78) / 60 / 1000);
                    this.dataOfBottom.push({
                      leftData: leftPlace8
                    })
                    dataBodyNew.push({
                      left: leftPlace8,
                      bottom: 0,
                      name: zze.list[t].ITEM_NAME,
                      time: zze.list[t].START_TIME,
                    })
                  }
                }

              }
            }
          } else {

          }

          // 事件
          let paramsThree = {
            patientId: this.config.userInfo.patientId,
            operId: this.config.userInfo.operId,
            visitId: this.config.userInfo.visitId,
            itemClass: "sz",
            eventNo:this.config.eventNo,
          }
          this.api.selectMedAnesthesiaEventList(paramsThree)
            .then(aff => {
              for (var h = 0; h < aff.list.length; h++) {
                if (aff.list[h].ITEM_CLASS == 'Y') {

                } else {
                  var timeMoreTwo = new Date(aff.list[h].START_TIME).getTime();
                  if (this.startTimeInPage <= timeMoreTwo && timeMoreTwo <= this.maxTimeInPage) {
                    var time9 = timeMoreTwo - this.startTimeInPage
                    var leftPlace9 = ((time9 * 2.78) / 60 / 1000);
                    this.dataOfBottom.push({
                      leftData: leftPlace9
                    })
                    dataBodyNew.push({
                      left: leftPlace9,
                      bottom: 0,
                      name: aff.list[h].ITEM_NAME,
                      time: aff.list[h].START_TIME,
                    })
                  }
                }
              }

              if (this.config.userInfo.inDateTime) {
                var timeFive = new Date(this.config.userInfo.inDateTime).getTime();
                if (this.startTimeInPage <= timeFive && timeFive <= this.maxTimeInPage) {
                  var time6 = timeFive - this.startTimeInPage
                  var leftPlace5 = ((time6 * 2.78) / 60 / 1000);
                  this.dataOfBottom.push({
                    leftData: leftPlace5
                  })
                  dataBodyNew.push({
                    left: leftPlace5,
                    bottom: 0,
                    name: '入手术室',
                    time: this.config.userInfo.inDateTime,
                  })
                }
              }


              if (this.config.userInfo.outDateTime) {
                var timeSix = new Date(this.config.userInfo.outDateTime).getTime();
                if (this.startTimeInPage <= timeSix && timeSix <= this.maxTimeInPage) {
                  var time7 = timeSix - this.startTimeInPage
                  var leftPlace6 = ((time7 * 2.78) / 60 / 1000);
                  this.dataOfBottom.push({
                    leftData: leftPlace6
                  })
                  dataBodyNew.push({
                    left: leftPlace6,
                    bottom: 0,
                    name: '出手术室',
                    time: this.config.userInfo.outDateTime,
                  })
                }
              }
              dataBodyNew.sort(this.sortFun);
              for (var t = 0; t < dataBodyNew.length; t++) {
                this.$set(dataBodyNew[t], 'hasNum', t + 1);
              }
              // 特殊图标数据
              if (this.config.userInfo.startDateTime) {
                var timeOne = new Date(this.config.userInfo.startDateTime).getTime();
                if (this.startTimeInPage <= timeOne && timeOne <= this.maxTimeInPage) {
                  var time2 = timeOne - this.startTimeInPage
                  var leftPlace1 = ((time2 * 2.78) / 60 / 1000);
                  this.dataOfBottom.push({
                    leftData: leftPlace1
                  })
                  dataBodyNew.push({
                    left: leftPlace1,
                    bottom: 0,
                    name: '手术开始',
                    time: this.config.userInfo.startDateTime,
                  })
                }
              }
              if (this.config.userInfo.anesStartTime) {
                var timeTwo = new Date(this.config.userInfo.anesStartTime).getTime();
                if (this.startTimeInPage <= timeTwo && timeTwo <= this.maxTimeInPage) {
                  var time3 = timeTwo - this.startTimeInPage
                  var leftPlace2 = ((time3 * 2.78) / 60 / 1000);
                  this.dataOfBottom.push({
                    leftData: leftPlace2
                  })
                  dataBodyNew.push({
                    left: leftPlace2,
                    bottom: 0,
                    name: '麻醉开始',
                    time: this.config.userInfo.anesStartTime,
                  })
                }
              }
              if (this.config.userInfo.anesEndTime) {
                var timeThree = new Date(this.config.userInfo.anesEndTime).getTime();
                if (this.startTimeInPage <= timeThree && timeThree <= this.maxTimeInPage) {
                  var time4 = timeThree - this.startTimeInPage
                  var leftPlace3 = ((time4 * 2.78) / 60 / 1000);
                  this.dataOfBottom.push({
                    leftData: leftPlace3
                  })
                  dataBodyNew.push({
                    left: leftPlace3,
                    bottom: 0,
                    name: '麻醉结束',
                    time: this.config.userInfo.anesEndTime,
                  })
                }
              }
              if (this.config.userInfo.endDateTime) {
                var timeFour = new Date(this.config.userInfo.endDateTime).getTime();
                // console.log(timeFour)
                if (this.startTimeInPage <= timeFour && timeFour <= this.maxTimeInPage) {
                  var time5 = timeFour - this.startTimeInPage
                  // console.log(time5)
                  var leftPlace4 = ((time5 * 2.78) / 60 / 1000);
                  this.dataOfBottom.push({
                    leftData: leftPlace4
                  })
                  dataBodyNew.push({
                    left: leftPlace4,
                    bottom: 0,
                    name: '手术结束',
                    time: this.config.userInfo.endDateTime,
                  })
                }
              }
              // 全部呼吸
              let paramBr = {
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId,
                itemClass: 'Y',
                eventNo:this.config.eventNo,
              }
              this.api.selectMedAnesthesiaEventList(paramBr)
                .then(add => {
                  if (add.list.length > 0) {
                    for (var h = 0; h < add.list.length; h++) {
                      var timeBr = new Date(add.list[h].START_TIME).getTime();
                      if (this.startTimeInPage <= timeBr && timeBr <= this.maxTimeInPage) {
                        var timekz = timeBr - this.startTimeInPage
                        var leftPlaceBr = ((timekz * 2.78) / 60 / 1000);
                        this.dataOfBottom.push({
                          leftData: leftPlaceBr
                        })
                        dataBodyNew.push({
                          left: leftPlaceBr,
                          bottom: 0,
                          name: add.list[h].ITEM_NAME,
                          time: add.list[h].START_TIME,
                        })
                      }
                    }
                  }
                  // 筛选重复项，使其往上位移
                  dataBodyNew.sort(this.sortFun);
                  var pei = 0;
                  for (var k = 0; k < dataBodyNew.length; k++) {
                    if (dataBodyNew[k - 1]) {
                      if (dataBodyNew[k].left == dataBodyNew[k - 1].left || dataBodyNew[k].left < dataBodyNew[k - 1].left + 8) {
                        dataBodyNew[k].bottom = dataBodyNew[k - 1].bottom + 15;
                      } else {
                        dataBodyNew[k].bottom = 0;
                      }
                    } else {

                    }
                  }
                  // console.log(dataBodyNew)
                  this.dataBody = dataBodyNew;
                  // this.setTimeId = setTimeout(_ => this.selectMedAnesthesiaEventList(), this.config.timeSet)
                  // })

                })
            })
        });
      // });

    },
    noFunction() {

    },
    moveEventInItem(item) {
      this.tipView = true;
      this.showDataMore = true;
      this.nameInItem = item.name;
      this.nowTime = item.time;
    },
    moveEvent(event) {
      // console.log(event.offsetX)
      this.tipTop = event.offsetY + 20;
      this.tipLeft = event.offsetX;
      this.tipView = true;
      this.showDataMore = false;
      var offX = event.offsetX / 2.78; //横坐标值
      var m = Math.round(offX);
      this.dataOfXlength = m;
      var time = new Date(this.config.initTime);
      var time1 = time.getTime() + m * 60 * 1000;
      var time2 = new Date(time1).Format("yyyy-MM-dd hh:mm");
      this.nowTime = time2;
    },
    outEvent() {
      this.tipView = false;
    },
  },
  mounted() {
    if (this.setTimeId) {
      clearTimeout(this.setTimeId);
    }
    if (this.page == false) {
      this.selectMedAnesthesiaEventList();
      // window.eventHub.$on("test", this.selectMedAnesthesiaEventList);
    }
    // console.log(this.config.maxTime)


  },
  created() {
    // alert('112')
    // this.dataBody = [];
    Bus.$on('test', this.selectMedAnesthesiaEventList)
    Bus.$on('timeSetChange', this.selectMedAnesthesiaEventList)
  },
  beforeDestroy() {
    Bus.$off('test', this.selectMedAnesthesiaEventList);
    Bus.$off('timeSetChange', this.selectMedAnesthesiaEventList)
    clearTimeout(this.setTimeId);
  },
  props: ['page', 'width', 'height', 'dataOfPeo'],
}

</script>
<style scoped>
.rightBox {
  position: absolute;
  width: 185px;
  height: 140px;
  overflow-y: auto;
  border: 1px solid #8EAACD;
  box-sizing: border-box;
  font-size: 14px;
  background-color: #fff;
}

.rightBox div {
  border-bottom: 1px solid #8EAACD;
  color: #222;
  cursor: pointer;
}

.rightBox div:hover {
  color: #fff;
  background-color: #8EAACD;
}

.rightBox div:last-child {
  border-bottom: 0;
}

.chooseTime {
  position: absolute;
  width: 400px;
  height: 220px;
  top: calc(50% - 110px);
  left: calc(50% - 200px);
  background: rgb(227, 239, 255);
  border: 2px solid rgb(22, 124, 172);
  cursor: auto;
}

.chooseBackWhite {
  background-color: #fff;
  border: 1px solid #A9A9A9;
}

.chooseClass {
  color: #B3C1D7;
  background-color: rgb(227, 239, 255);
  border: 1px solid #A9A9A9;
}
</style>
