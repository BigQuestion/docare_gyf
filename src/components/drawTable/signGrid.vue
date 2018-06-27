<template>
  <div :style="{width:width+'px',height:height+'px'}" style="position: relative;margin:2px;">
    <div v-if="page==false" @mousemove="moveEvent($event)" @mouseout="outEvent()" :style="{width:width+'px',height:height+'px'}" style="position:relative;">
      <div v-for="(item,index) in dataBody" @mousemove.stop="moveEventInItem(item)" :style="{left:item.left+'px',bottom:item.bottom+'px'}" style="position:absolute;cursor:default;font-famliy:microsoft yahei;">
        <span v-if="item.name=='麻醉开始'">X</span>
        <span style="font-size:21px;" v-else-if="item.name=='手术开始'">⊙</span>
        <span style="color:red;" v-else-if="item.name=='麻醉结束'">X</span>
        <span style="color:red;" v-else-if="item.name=='手术结束'">ⓧ</span>
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
      lineArray: [],
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
    topTimeFun() {
      if (this.config.userInfo.startDateTime) {
        var timeOne = new Date(this.config.userInfo.startDateTime).getTime();
        if (this.startTimeInPage <= timeOne && timeOne <= this.maxTimeInPage) {
          var time2 = timeOne - this.startTimeInPage
          var leftPlace1 = ((time2 * 2.78) / 60 / 1000);
          this.dataOfBottom.push({
            leftData: leftPlace1
          })
          this.dataBody.push({
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
          this.dataBody.push({
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
          this.dataBody.push({
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
          this.dataBody.push({
            left: leftPlace4,
            bottom: 0,
            name: '手术结束',
            time: this.config.userInfo.endDateTime,
          })
        }
      }
    },
    selectMedAnesthesiaEventList() {
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
      var nber = 1;
      this.pageOn = this.config.pageOper;
      this.maxTimeInPage = new Date(this.config.maxTime).getTime()
      this.startTimeInPage = new Date(this.config.initTime).getTime()
      var bothTimeLeft = this.maxTimeInPage - this.startTimeInPage

      // console.log(this.config.maxTime)
      // console.log(this.config.userInfo.inDateTime)
      this.thedoubelData = '';
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
      }

      this.api.selectSignMedAnesthesiaEventList(params)
        .then(
          res => {
            this.dataOfBottom = [];
            this.dataBody = [];
            this.config.OperatingData = res.list;

            for (var i = 0; i < res.list.length; i++) {
              var time = new Date(res.list[i].START_TIME).getTime();
              if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
                var time1 = time - this.startTimeInPage
                var leftPlace = ((time1 * 2.78) / 60 / 1000);
                this.dataOfBottom.push({
                  leftData: leftPlace
                })
                this.dataBody.push({
                  left: leftPlace,
                  bottom: 0,
                  name: res.list[i].ITEM_NAME,
                  time: res.list[i].START_TIME,
                })
              }
            }
            // 输液
            let paramsTwo = {
              patientId: this.config.userInfo.patientId,
              operId: this.config.userInfo.operId,
              visitId: this.config.userInfo.visitId,
              itemClass: "3B",
            }
            this.api.selectMedAnesthesiaEventList(paramsTwo)
              .then(zze => {
                if (zze.list.length > 6) {
                  for (var t = 7; t < zze.list.length; t++) {
                    var timeMoreOne = new Date(zze.list[t].START_TIME).getTime();
                    if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                      var time8 = timeMoreOne - this.startTimeInPage
                      var leftPlace8 = ((time8 * 2.78) / 60 / 1000);
                      this.dataOfBottom.push({
                        leftData: leftPlace8
                      })
                      this.dataBody.push({
                        left: leftPlace8,
                        bottom: 0,
                        name: zze.list[t].ITEM_NAME,
                        time: zze.list[t].START_TIME,
                      })
                    }
                  }
                } else {

                }

                // 麻醉用药
                let paramsThree = {
                  patientId: this.config.userInfo.patientId,
                  operId: this.config.userInfo.operId,
                  visitId: this.config.userInfo.visitId,
                  itemClass: "2C",
                }
                this.api.selectMedAnesthesiaEventList(paramsThree)
                  .then(aff => {
                    if (aff.list.length > 10) {
                      for (var h = 11; h < aff.list.length; h++) {
                        var timeMoreTwo = new Date(aff.list[h].START_TIME).getTime();
                        if (this.startTimeInPage <= timeMoreTwo && timeMoreTwo <= this.maxTimeInPage) {
                          var time9 = timeMoreTwo - this.startTimeInPage
                          var leftPlace9 = ((time9 * 2.78) / 60 / 1000);
                          this.dataOfBottom.push({
                            leftData: leftPlace9
                          })
                          this.dataBody.push({
                            left: leftPlace9,
                            bottom: 0,
                            name: aff.list[h].ITEM_NAME,
                            time: aff.list[h].START_TIME,
                          })
                        }
                      }
                    } else {

                    }
                    if (this.config.userInfo.inDateTime) {
                      var timeFive = new Date(this.config.userInfo.inDateTime).getTime();
                      if (this.startTimeInPage <= timeFive && timeFive <= this.maxTimeInPage) {
                        var time6 = timeFive - this.startTimeInPage
                        var leftPlace5 = ((time6 * 2.78) / 60 / 1000);
                        this.dataOfBottom.push({
                          leftData: leftPlace5
                        })
                        this.dataBody.push({
                          left: leftPlace5,
                          bottom: 0,
                          name: '入手术室',
                          time: this.config.userInfo.inDateTime,
                        })
                      }
                    }
                    if (this.config.userInfo.endDateTime) {
                      var timeSix = new Date(this.config.userInfo.endDateTime).getTime();
                      if (this.startTimeInPage <= timeSix && timeSix <= this.maxTimeInPage) {
                        var time7 = timeSix - this.startTimeInPage
                        var leftPlace6 = ((time7 * 2.78) / 60 / 1000);
                        this.dataOfBottom.push({
                          leftData: leftPlace6
                        })
                        this.dataBody.push({
                          left: leftPlace6,
                          bottom: 0,
                          name: '出手术室',
                          time: this.config.userInfo.endDateTime,
                        })
                      }
                    }
                    this.dataBody.sort(this.sortFun);
                    for (var t = 0; t < this.dataBody.length; t++) {
                      this.$set(this.dataBody[t], 'hasNum', t + 1);
                    }
                    this.topTimeFun();
                    this.dataBody.sort(this.sortFun);
                    var pei = 0;
                    // console.log(this.dataBody)
                    for (var k = 0; k < this.dataBody.length; k++) {
                      if (this.dataBody[k - 1]) {
                        if (this.dataBody[k].left == this.dataBody[k - 1].left) {
                          this.dataBody[k].bottom = this.dataBody[k - 1].bottom + 15;
                        } else {
                          this.dataBody[k].bottom = 0;
                        }
                      } else {

                      }
                    }
                    // console.log(this.dataBody)
                    this.lineArray = res.list;
                    // this.setTimeId = setTimeout(_ => this.selectMedAnesthesiaEventList(), this.config.timeSet)
                  })
              })

          });

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
    closing() {
      var nber = 1;
      this.pageOn = this.config.pageOper;
      this.maxTimeInPage = new Date(this.config.maxTime).getTime()
      this.startTimeInPage = new Date(this.config.initTime).getTime()
      var bothTimeLeft = this.maxTimeInPage - this.startTimeInPage

      this.thedoubelData = '';
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
      }
      this.api.selectSignMedAnesthesiaEventList(params)
        .then(
          res => {
            this.dataOfBottom = [];
            this.dataBody = [];
            this.config.OperatingData = res.list;

            for (var i = 0; i < res.list.length; i++) {
              var time = new Date(res.list[i].START_TIME).getTime();
              if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
                var time1 = time - this.startTimeInPage
                var leftPlace = ((time1 * 2.78) / 60 / 1000);
                this.dataOfBottom.push({
                  leftData: leftPlace
                })
                this.dataBody.push({
                  left: leftPlace,
                  bottom: 0,
                  name: res.list[i].ITEM_NAME,
                  time: res.list[i].START_TIME,
                })
              }
            }
            // 麻醉用药
            let paramsTwo = {
              patientId: this.config.userInfo.patientId,
              operId: this.config.userInfo.operId,
              visitId: this.config.userInfo.visitId,
              itemClass: "3B",
            }
            this.api.selectMedAnesthesiaEventList(paramsTwo)
              .then(zze => {
                // var list = zze.list;
                // console.log(zze.list)
                if (zze.list.length > 6) {
                  for (var t = 7; t < zze.list.length; t++) {
                    var timeMoreOne = new Date(zze.list[t].START_TIME).getTime();
                    if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                      var time8 = timeMoreOne - this.startTimeInPage
                      var leftPlace8 = ((time8 * 2.78) / 60 / 1000);
                      this.dataOfBottom.push({
                        leftData: leftPlace8
                      })
                      this.dataBody.push({
                        left: leftPlace8,
                        bottom: 0,
                        name: res.list[t].ITEM_NAME,
                        time: res.list[t].START_TIME,
                      })
                    }
                  }
                } else {

                }
                // 麻醉用药
                let paramsThree = {
                  patientId: this.config.userInfo.patientId,
                  operId: this.config.userInfo.operId,
                  visitId: this.config.userInfo.visitId,
                  itemClass: "2C",
                }
                this.api.selectMedAnesthesiaEventList(paramsThree)
                  .then(aff => {
                    // var list = aff.list;
                    // console.log(aff.list)
                    if (aff.list.length > 10) {
                      for (var h = 11; h < aff.list.length; h++) {
                        var timeMoreTwo = new Date(aff.list[h].START_TIME).getTime();
                        if (this.startTimeInPage <= timeMoreTwo && timeMoreTwo <= this.maxTimeInPage) {
                          var time9 = timeMoreTwo - this.startTimeInPage
                          var leftPlace9 = ((time9 * 2.78) / 60 / 1000);
                          this.dataOfBottom.push({
                            leftData: leftPlace9
                          })
                          this.dataBody.push({
                            left: leftPlace9,
                            bottom: 0,
                            name: aff.list[h].ITEM_NAME,
                            time: aff.list[h].START_TIME,
                          })
                        }
                      }
                    } else {

                    }
                    if (this.config.userInfo.inDateTime) {
                      var timeFive = new Date(this.config.userInfo.inDateTime).getTime();
                      if (this.startTimeInPage <= timeFive && timeFive <= this.maxTimeInPage) {
                        var time6 = timeFive - this.startTimeInPage
                        var leftPlace5 = ((time6 * 2.78) / 60 / 1000);
                        this.dataOfBottom.push({
                          leftData: leftPlace5
                        })
                        this.dataBody.push({
                          left: leftPlace5,
                          bottom: 0,
                          name: '入手术室',
                          time: this.config.userInfo.inDateTime,
                        })
                      }
                    }
                    if (this.config.userInfo.endDateTime) {
                      var timeSix = new Date(this.config.userInfo.endDateTime).getTime();
                      if (this.startTimeInPage <= timeSix && timeSix <= this.maxTimeInPage) {
                        var time7 = timeSix - this.startTimeInPage
                        var leftPlace6 = ((time7 * 2.78) / 60 / 1000);
                        this.dataOfBottom.push({
                          leftData: leftPlace6
                        })
                        this.dataBody.push({
                          left: leftPlace6,
                          bottom: 0,
                          name: '出手术室',
                          time: this.config.userInfo.endDateTime,
                        })
                      }
                    }
                    this.dataBody.sort(this.sortFun);
                    for (var t = 0; t < this.dataBody.length; t++) {
                      this.$set(this.dataBody[t], 'hasNum', t + 1);
                    }
                    this.topTimeFun();
                    this.dataBody.sort(this.sortFun);
                    var pei = 0;
                    // console.log(this.dataBody)
                    for (var k = 0; k < this.dataBody.length; k++) {
                      if (this.dataBody[k - 1]) {
                        if (this.dataBody[k].left == this.dataBody[k - 1].left) {
                          this.dataBody[k].bottom = this.dataBody[k - 1].bottom + 15;
                        } else {
                          this.dataBody[k].bottom = 0;
                        }
                      } else {

                      }
                    }
                    this.lineArray = res.list;
                  })

              })

          });

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
    Bus.$on('timeSetChange', this.closing)
  },
  beforeDestroy() {
    Bus.$off('test', this.selectMedAnesthesiaEventList);
    Bus.$off('timeSetChange', this.closing)
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
