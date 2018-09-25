<template>
  <div style="display:flex;flex-direction:column;flex-wrap:wrap;-webkit-flex-wrap:wrap;" :style="{width:value.width+'px',height:value.height+'px'}">
    <div v-if="page == false" :title="item.titleWord" v-for="(item,index) in dataBody" style="width:auto;max-width:300px;min-width:220px;font-size:12px;padding:0 20px 2px 0;display:flex;cursor:default;">
      <span v-if="item.itemNom" style="padding-right:0px;width:20px;display:block;">{{item.itemNom}}.</span>
      <span v-if="item.ADDTIME" style="padding-right:5px;">{{item.ADDTIME}}</span>
      <span>{{item.ITEM_NAME}}</span>
      <span>{{item.DOSAGE}}</span>
      <span>{{item.DOSAGE_UNITS}}</span>
      <span v-if="item.ADMINISTRATOR">,{{item.ADMINISTRATOR}}</span>
    </div>
    <div v-else>
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
      dataBodySz: [],
      tipTop: '',
      tipLeft: '',
      tipView: false,
      title: '',
      // showDataMore:'',
      maxTimeInPage: '',
      startTimeInPage: '',
      setTimeId: '', //定时器执行
    }
  },
  methods: {
    selectMedAnesthesiaEventList() {
      let masterData = [];
      let masterDataSz = [];
      this.maxTimeInPage = new Date(this.config.maxTime).getTime()
      this.startTimeInPage = new Date(this.config.initTime).getTime()
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        itemClass: "yp",
      }
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
      this.api.selectMedAnesthesiaEventList(params)
        .then(
        res => {
          this.dataBody = [];
          this.dataBodySz = [];
          masterData.push({
            ITEM_NAME: "《术中用药》"
          })
          for (var i = 0; i < res.list.length; i++) {
            if (res.list[i].ITEM_CLASS == "C" || res.list[i].ITEM_CLASS == "2" || res.list[i].ITEM_CLASS == "3" || res.list[i].ITEM_CLASS == "B"|| res.list[i].ITEM_CLASS == "4") {

            } else {
              var time = new Date(res.list[i].START_TIME).getTime();
              if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
                this.$set(res.list[i], 'sort', time);
                if (res.list[i].START_TIME) {
                  var nameDate = res.list[i].START_TIME.split(" ");
                  var nextTime = nameDate[1].split(":");
                  console.log(nextTime)
                } else {
                  var nextTime = ['', ''];
                }

                if (res.list[i].DOSAGE !== null) {
                  if (res.list[i].DURATIVE_INDICATOR == 1) {
                    if (res.list[i].ADMINISTRATOR !== null) {
                      var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '结束时间：' + res.list[i].ENDDATE, '途径：' + res.list[i].ADMINISTRATOR, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                    } else {
                      var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '结束时间：' + res.list[i].ENDDATE, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                    }
                  } else {
                    if (res.list[i].ADMINISTRATOR !== null) {
                      var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '途径：' + res.list[i].ADMINISTRATOR, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                    } else {
                      var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                    }
                  }
                  this.title = titleData.join('\n');
                  this.$set(res.list[i], 'titleWord', this.title);
                } else {
                  var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME];
                  this.title = titleData.join('\n');
                  this.$set(res.list[i], 'titleWord', this.title);
                }
                masterData.push({
                  ADDTIME: nextTime[0] + ":" + nextTime[1],
                  ITEM_NAME: res.list[i].ITEM_NAME,
                  DOSAGE: res.list[i].DOSAGE,
                  DOSAGE_UNITS: res.list[i].DOSAGE_UNITS,
                  titleWord: res.list[i].titleWord,
                  ADMINISTRATOR: res.list[i].ADMINISTRATOR,
                  sort: time,
                });
              }
            }

          }
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
              console.log(zze.list)
              if (zze.list.length > 6) {
                // for (var ti = 0; ti < 6; ti++) {
                for (var t = 6; t < zze.list.length; t++) {
                  // if (zze.list[ti].ITEM_NAME !== zze.list[t].ITEM_NAME && zze.list[ti].ITEM_CLASS !== zze.list[t].ITEM_CLASS) {
                  if (zze.list[t].START_TIME) {
                    var nameDate1 = zze.list[t].START_TIME.split(" ");
                    var nextTime1 = nameDate1[1].split(":");
                  } else {
                    var nextTime1 = ['', ''];
                  }
                  var timeMoreOne = new Date(zze.list[t].START_TIME).getTime();
                  if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                    var titleDataTwo = [zze.list[t].ITEM_NAME, '================', '时间：' + zze.list[t].START_TIME];
                    var titleTwo = titleDataTwo.join('\n');
                    masterData.push({
                      ADDTIME: nextTime1[0] + ":" + nextTime1[1],
                      ITEM_NAME: zze.list[t].ITEM_NAME,
                      START_TIME: zze.list[t].START_TIME,
                      titleWord: titleDataTwo,
                      DOSAGE: zze.list[t].DOSAGE,
                      DOSAGE_UNITS: zze.list[t].DOSAGE_UNITS,
                      ADMINISTRATOR: zze.list[t].ADMINISTRATOR,
                      sort: timeMoreOne
                    });
                  }
                  // } else {

                  // }

                }
                // break;
                // }

              } else { }
              // 麻醉用药
              let paramsTwo = {
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId,
                itemClass: "2C4",
                eventNo:this.config.eventNo,
              }
              this.api.selectMedAnesthesiaEventList(paramsTwo)
                .then(aff => {
                  let pushCXData = [];
                  for (var h = 0; h < aff.list.length; h++) {
                    if (aff.list[h].DURATIVE_INDICATOR == 0) {
                      if (aff.list[h].START_TIME) {
                        var nameDate2 = aff.list[h].START_TIME.split(" ");
                        var nextTime2 = nameDate2[1].split(":");
                      } else {
                        var nextTime2 = ['', ''];
                      }

                      var timeMoreOne = new Date(aff.list[h].START_TIME).getTime();
                      if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                        // var titleDataTwo = [aff.list[h].ITEM_NAME, '================', '开始时间：' + aff.list[h].START_TIME];
                        var titleDataTwo = [aff.list[h].ITEM_NAME, '================', '开始时间：' + aff.list[h].START_TIME, '途径：' + aff.list[h].ADMINISTRATOR, '量：' + aff.list[h].DOSAGE, '单位：' + aff.list[h].DOSAGE_UNITS];
                        var titleTwo = titleDataTwo.join('\n');
                        masterData.push({
                          ADDTIME: nextTime2[0] + ":" + nextTime2[1],
                          ADMINISTRATOR: aff.list[h].ADMINISTRATOR,
                          ITEM_NAME: aff.list[h].ITEM_NAME,
                          START_TIME: aff.list[h].START_TIME,
                          titleWord: titleTwo,
                          sort: timeMoreOne,
                          DOSAGE: aff.list[h].DOSAGE,
                          DOSAGE_UNITS: aff.list[h].DOSAGE_UNITS,
                        });
                      }
                    } else if (aff.list[h].DURATIVE_INDICATOR == 1) {
                      var timeMoreNEXT = new Date(aff.list[h].START_TIME).getTime();
                      if (this.startTimeInPage <= timeMoreNEXT && timeMoreNEXT <= this.maxTimeInPage) {
                        pushCXData.push(aff.list[h])
                      }

                    }
                  }
                  if (pushCXData.length > 8) {
                    for (var d = 8; d < pushCXData.length; d++) {
                      // if (pushCXData[d].DURATIVE_INDICATOR == 1) {
                      if (pushCXData[d].START_TIME) {
                        var nameDate3 = pushCXData[d].START_TIME.split(" ");
                        var nextTime3 = nameDate3[1].split(":");
                      } else {
                        var nameDate3 = ['', ''];
                      }
                      if (pushCXData[d].ENDDATE) {
                        var nameDate4 = pushCXData[d].ENDDATE.split(" ");
                        var nextTime4 = nameDate4[1].split(":");
                      } else {
                        var nextTime4 = ['', ''];
                      }
                      var timeMoreOne = new Date(pushCXData[d].START_TIME).getTime();
                      if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                        // var titleDataTwo = [pushCXData[d].ITEM_NAME, '================', '开始时间：' + pushCXData[d].START_TIME];
                        var titleDataTwo = [pushCXData[d].ITEM_NAME, '================', '开始时间：' + pushCXData[d].START_TIME, '结束时间：' + pushCXData[d].ENDDATE, '途径：' + pushCXData[d].ADMINISTRATOR, '量：' + pushCXData[d].DOSAGE, '单位：' + pushCXData[d].DOSAGE_UNITS];
                        var titleTwo = titleDataTwo.join('\n');
                        if (nextTime4[0] == ''&&nextTime4[1] == '') {
                          masterData.push({
                            ADDTIME: nextTime3[0] + ":" + nextTime3[1] + '→',
                            ADMINISTRATOR: pushCXData[d].ADMINISTRATOR,
                            ITEM_NAME: pushCXData[d].ITEM_NAME,
                            START_TIME: pushCXData[d].START_TIME,
                            titleWord: titleTwo,
                            sort: timeMoreOne,
                            DOSAGE: pushCXData[d].DOSAGE,
                            DOSAGE_UNITS: pushCXData[d].DOSAGE_UNITS,
                          });
                        } else {
                          masterData.push({
                            ADDTIME: nextTime3[0] + ":" + nextTime3[1] + '→'+ nextTime4[0] + ":" + nextTime4[1],
                            ADMINISTRATOR: pushCXData[d].ADMINISTRATOR,
                            ITEM_NAME: pushCXData[d].ITEM_NAME,
                            START_TIME: pushCXData[d].START_TIME,
                            titleWord: titleTwo,
                            sort: timeMoreOne,
                            DOSAGE: pushCXData[d].DOSAGE,
                            DOSAGE_UNITS: pushCXData[d].DOSAGE_UNITS,
                          });
                        }


                      }
                      // }
                    }
                  }
                  masterData.sort(this.sortFun)
                  masterData.push({
                    ITEM_NAME: "《术中事件》"
                  })
                  if (this.config.userInfo.inDateTime) {
                    var time1 = new Date(this.config.userInfo.inDateTime).getTime();
                    if (this.startTimeInPage <= time1 && time1 <= this.maxTimeInPage) {
                      var titleDataOne = ['入手术室', '================', '时间：' + this.config.userInfo.inDateTime];
                      var titleOne = titleDataOne.join('\n');
                      masterDataSz.push({
                        ITEM_NAME: '入手术室',
                        START_TIME: this.config.userInfo.inDateTime,
                        titleWord: titleOne,
                        sort: time1
                      });
                    }
                  }
                  if (this.config.userInfo.outDateTime) {
                    var time2 = new Date(this.config.userInfo.outDateTime).getTime();
                    if (this.startTimeInPage <= time2 && time2 <= this.maxTimeInPage) {
                      var titleDataTwo = ['出手术室', '================', '时间：' + this.config.userInfo.outDateTime];
                      var titleTwo = titleDataTwo.join('\n');
                      masterDataSz.push({
                        itemNom: '',
                        ITEM_NAME: '出手术室',
                        START_TIME: this.config.userInfo.outDateTime,
                        titleWord: titleTwo,
                        sort: time2
                      });
                    }
                  }
                  let paramsSzAll = {
                    itemNom: '',
                    patientId: this.config.userInfo.patientId,
                    operId: this.config.userInfo.operId,
                    visitId: this.config.userInfo.visitId,
                    itemClass: "sz",
                    eventNo:this.config.eventNo,
                  }
                  this.api.selectMedAnesthesiaEventList(paramsSzAll)
                    .then(waa => {
                      for (var B = 0; B < waa.list.length; B++) {
                        if (waa.list[B].ITEM_CLASS == "Y") {

                        } else {
                          var timesz = new Date(waa.list[B].START_TIME).getTime();
                          if (this.startTimeInPage <= timesz && timesz <= this.maxTimeInPage) {
                            this.$set(waa.list[B], 'sort', timesz);
                            var titleDataOneSz = [waa.list[B].ITEM_NAME, '================', '时间：' + this.config.userInfo.inDateTime];
                            var titleTwoSz = titleDataOneSz.join('\n');
                            masterDataSz.push({
                              itemNom: '',
                              ITEM_NAME: waa.list[B].ITEM_NAME,
                              DOSAGE: waa.list[B].DOSAGE,
                              DOSAGE_UNITS: waa.list[B].DOSAGE_UNITS,
                              titleWord: titleTwoSz,
                              ADMINISTRATOR: waa.list[B].ADMINISTRATOR,
                              sort: timesz,
                            });
                          }
                        }
                      }
                      masterDataSz.sort(this.sortFun)
                      for (var s = 0; s < masterDataSz.length; s++) {
                        masterDataSz[s].itemNom = s + 1;
                        masterData.push(masterDataSz[s])
                      }
                      this.dataBody = masterData;
                    })
                  // this.setTimeId = setTimeout(_ => this.selectMedAnesthesiaEventList(), this.config.timeSet)
                });
            });
        });
    },
    sortFun(a, b) {
      return a.sort - b.sort;
    },
  },
  props: ['dataOfPeo', 'page', 'value'],
  mounted() {
    if (this.setTimeId) {
      clearTimeout(this.setTimeId);
    }
    if (this.page == false) {
      this.selectMedAnesthesiaEventList();
    }
  },
  created() {
    this.dataBody = [];
    Bus.$on('test', this.selectMedAnesthesiaEventList)
    Bus.$on('timeSetChange', this.selectMedAnesthesiaEventList)
  },
  beforeDestroy() {
    this.dataBody = [];
    Bus.$off('test', this.selectMedAnesthesiaEventList);
    Bus.$off('timeSetChange', this.selectMedAnesthesiaEventList)
    clearTimeout(this.setTimeId);
  },
}

</script>
<style scoped>

</style>
