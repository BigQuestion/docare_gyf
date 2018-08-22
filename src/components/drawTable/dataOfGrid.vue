<template>
  <div style="width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:wrap;">
    <div v-if="page == false" :title="item.titleWord" v-for="(item,index) in dataBody" style="width:auto;max-width:300px;min-width:220px;font-size:14px;padding:0 20px 2px 0;display:flex;cursor:default;">
      <span style="padding-right:0px;width:20px;display:block;">{{index+1}}.</span>
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
      this.maxTimeInPage = new Date(this.config.maxTime).getTime()
      this.startTimeInPage = new Date(this.config.initTime).getTime()
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
      }
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
      this.api.selectSignMedAnesthesiaEventList(params)
        .then(
        // display:flex;flex-direction:column;flex-wrap:wrap;
        res => {
          this.dataBody = [];
          for (var i = 0; i < res.list.length; i++) {
            var time = new Date(res.list[i].START_TIME).getTime();
            // console.log(time)
            if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
              this.$set(res.list[i], 'sort', time);
              this.dataBody.push(res.list[i]);
              if (res.list[i].DOSAGE !== null) {
                if (res.list[i].ENDDATE !== null) {
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
            }
          }
          if (this.config.userInfo.inDateTime) {
            var time1 = new Date(this.config.userInfo.inDateTime).getTime();
            if (this.startTimeInPage <= time1 && time1 <= this.maxTimeInPage) {
              var titleDataOne = ['入手术室', '================', '时间：' + this.config.userInfo.inDateTime];
              var titleOne = titleDataOne.join('\n');
              this.dataBody.push({
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
              this.dataBody.push({
                ITEM_NAME: '出手术室',
                START_TIME: this.config.userInfo.outDateTime,
                titleWord: titleTwo,
                sort: time2
              });
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
                for (var ti = 0; ti < 6; ti++) {
                  for (var t = 6; t < zze.list.length; t++) {
                    if (zze.list[ti].ITEM_NAME !== zze.list[t].ITEM_NAME && zze.list[ti].ITEM_CLASS !== zze.list[t].ITEM_CLASS) {
                      var timeMoreOne = new Date(zze.list[t].START_TIME).getTime();
                      if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                        var titleDataTwo = [zze.list[t].ITEM_NAME, '================', '时间：' + zze.list[t].START_TIME];
                        var titleTwo = titleDataTwo.join('\n');
                        this.dataBody.push({
                          ITEM_NAME: zze.list[t].ITEM_NAME,
                          START_TIME: zze.list[t].START_TIME,
                          titleWord: titleDataTwo,
                          sort: timeMoreOne
                        });
                      }
                    } else {

                    }

                  }
                  break;
                }

              } else { }
              // 麻醉用药
              let paramsTwo = {
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId,
                itemClass: "2C4",
              }
              this.api.selectMedAnesthesiaEventList(paramsTwo)
                .then(aff => {
                  console.log(aff.list)
                  for (var h = 0; h < aff.list.length; h++) {
                    if (aff.list[h].DURATIVE_INDICATOR == 0) {
                      var timeMoreOne = new Date(aff.list[h].START_TIME).getTime();
                      if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                        // var titleDataTwo = [aff.list[h].ITEM_NAME, '================', '开始时间：' + aff.list[h].START_TIME];
                        var titleDataTwo = [aff.list[h].ITEM_NAME, '================', '开始时间：' + aff.list[h].START_TIME, '途径：' + aff.list[h].ADMINISTRATOR, '量：' + aff.list[h].DOSAGE, '单位：' + aff.list[h].DOSAGE_UNITS];
                        var titleTwo = titleDataTwo.join('\n');
                        this.dataBody.push({
                          ADMINISTRATOR: aff.list[h].ADMINISTRATOR,
                          ITEM_NAME: aff.list[h].ITEM_NAME,
                          START_TIME: aff.list[h].START_TIME,
                          titleWord: titleTwo,
                          sort: timeMoreOne,
                          DOSAGE: aff.list[h].DOSAGE,
                          DOSAGE_UNITS: aff.list[h].DOSAGE_UNITS,
                        });
                      }
                    }
                  }
                  if (aff.list.length>8){
                    for (var d = 8; d < aff.list.length; d++) {
                      if (aff.list[d].DURATIVE_INDICATOR == 1) {
                        var timeMoreOne = new Date(aff.list[d].START_TIME).getTime();
                        if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                          // var titleDataTwo = [aff.list[d].ITEM_NAME, '================', '开始时间：' + aff.list[d].START_TIME];
                          var titleDataTwo = [aff.list[d].ITEM_NAME, '================', '开始时间：' + aff.list[d].START_TIME, '途径：' + aff.list[d].ADMINISTRATOR, '量：' + aff.list[d].DOSAGE, '单位：' + aff.list[d].DOSAGE_UNITS];
                          var titleTwo = titleDataTwo.join('\n');
                          this.dataBody.push({
                            ADMINISTRATOR: aff.list[d].ADMINISTRATOR,
                            ITEM_NAME: aff.list[d].ITEM_NAME,
                            START_TIME: aff.list[d].START_TIME,
                            titleWord: titleTwo,
                            sort: timeMoreOne,
                            DOSAGE: aff.list[d].DOSAGE,
                            DOSAGE_UNITS: aff.list[d].DOSAGE_UNITS,
                          });
                        }
                      }
                    }
                  }
                  this.dataBody.sort(this.sortFun)
                  // this.setTimeId = setTimeout(_ => this.selectMedAnesthesiaEventList(), this.config.timeSet)
                });
            });
        });
    },
    sortFun(a, b) {
      return a.sort - b.sort;
    },
  },
  props: ['dataOfPeo', 'page'],
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
