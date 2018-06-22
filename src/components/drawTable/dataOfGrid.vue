<template>
  <div style="width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:wrap;">
    <div v-if="page == false" :title="item.titleWord" v-for="(item,index) in dataBody" style="width:auto;max-width:300px;min-width:220px;font-size:14px;padding:0 20px 2px 0;display:flex;cursor:default;">
      <span style="padding-right:5px;width:26px;display:block;">{{index+1}}</span>
      <span style="padding-right:5px;">{{item.ITEM_NAME}}</span>
      <span style="padding-right:">{{item.DOSAGE}}</span>
      <span>{{item.DOSAGE_UNITS}}</span>
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
      this.dataBody = [];
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
          var time1 = new Date(this.config.userInfo.inDateTime).getTime();
          if (this.startTimeInPage <= time1 && time1 <= this.maxTimeInPage) {
            var titleDataOne = ['入手术室', '================', '开始时间：' + this.config.userInfo.inDateTime];
            var titleOne = titleDataOne.join('\n');
            this.dataBody.push({
              ITEM_NAME: '入手术室',
              START_TIME: this.config.userInfo.inDateTime,
              titleWord: titleOne,
              sort: time1
            });
          }
          var time2 = new Date(this.config.userInfo.endDateTime).getTime();
          if (this.startTimeInPage <= time1 && time1 <= this.maxTimeInPage) {
            var titleDataTwo = ['出手术室', '================', '开始时间：' + this.config.userInfo.endDateTime];
            var titleTwo = titleDataTwo.join('\n');
            this.dataBody.push({
              ITEM_NAME: '出手术室',
              START_TIME: this.config.userInfo.inDateTime,
              titleWord: titleTwo,
              sort: time2
            });
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
                    var titleDataTwo = ['出手术室', '================', '开始时间：' + zze.list[t].START_TIME];
                    var titleTwo = titleDataTwo.join('\n');
                    this.dataBody.push({
                      ITEM_NAME: '出手术室',
                      START_TIME: zze.list[t].START_TIME,
                      titleWord: titleDataTwo,
                      sort: timeMoreOne
                    });
                  }
                }
              } else {

              }
              // 麻醉用药
              let paramsTwo = {
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId,
                itemClass: "2C",
              }
              this.api.selectMedAnesthesiaEventList(paramsTwo)
                .then(aff => {
                  if (aff.list.length > 10) {
                    for (var h = 11; h < aff.list.length; h++) {
                      var timeMoreOne = new Date(aff.list[h].START_TIME).getTime();
                      if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                        // var titleDataTwo = [aff.list[h].ITEM_NAME, '================', '开始时间：' + aff.list[h].START_TIME];
                        var titleDataTwo = [aff.list[i].ITEM_NAME, '================', '开始时间：' + aff.list[i].START_TIME, '途径：' + aff.list[i].ADMINISTRATOR, '量：' + aff.list[i].DOSAGE, '单位：' + aff.list[i].DOSAGE_UNITS];
                        var titleTwo = titleDataTwo.join('\n');
                        this.dataBody.push({
                          ITEM_NAME: aff.list[h].ITEM_NAME,
                          START_TIME: aff.list[h].START_TIME,
                          titleWord: titleTwo,
                          sort: timeMoreOne,
                          DOSAGE: aff.list[h].DOSAGE,
                          DOSAGE_UNITS: aff.list[h].DOSAGE_UNITS,
                        });
                      }
                    }
                  } else {

                  }
                  this.dataBody.sort(this.sortFun)
                  this.setTimeId = setTimeout(_ => this.selectMedAnesthesiaEventList(), this.config.timeSet)
                });
            });

        });
    },
    sortFun(a, b) {
      return a.sort - b.sort;
    },
    closing() {
      this.dataBody = [];
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
          var time1 = new Date(this.config.userInfo.inDateTime).getTime();
          if (this.startTimeInPage <= time1 && time1 <= this.maxTimeInPage) {
            var titleDataOne = ['入手术室', '================', '开始时间：' + this.config.userInfo.inDateTime];
            var titleOne = titleDataOne.join('\n');
            this.dataBody.push({
              ITEM_NAME: '入手术室',
              START_TIME: this.config.userInfo.inDateTime,
              titleWord: titleOne,
              sort: time1
            });
          }
          var time2 = new Date(this.config.userInfo.endDateTime).getTime();
          if (this.startTimeInPage <= time1 && time1 <= this.maxTimeInPage) {
            var titleDataTwo = ['出手术室', '================', '开始时间：' + this.config.userInfo.endDateTime];
            var titleTwo = titleDataTwo.join('\n');
            this.dataBody.push({
              ITEM_NAME: '出手术室',
              START_TIME: this.config.userInfo.inDateTime,
              titleWord: titleTwo,
              sort: time2
            });
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
                    var titleDataTwo = ['出手术室', '================', '开始时间：' + zze.list[t].START_TIME];
                    var titleTwo = titleDataTwo.join('\n');
                    this.dataBody.push({
                      ITEM_NAME: '出手术室',
                      START_TIME: zze.list[t].START_TIME,
                      titleWord: titleDataTwo,
                      sort: timeMoreOne
                    });
                  }
                }
              } else {

              }
              // 麻醉用药
              let paramsTwo = {
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId,
                itemClass: "2C",
              }
              this.api.selectMedAnesthesiaEventList(paramsTwo)
                .then(aff => {
                  if (aff.list.length > 10) {
                    for (var h = 11; h < aff.list.length; h++) {
                      var timeMoreOne = new Date(aff.list[h].START_TIME).getTime();
                      if (this.startTimeInPage <= timeMoreOne && timeMoreOne <= this.maxTimeInPage) {
                        // var titleDataTwo = [aff.list[h].ITEM_NAME, '================', '开始时间：' + aff.list[h].START_TIME];
                        var titleDataTwo = [aff.list[i].ITEM_NAME, '================', '开始时间：' + aff.list[i].START_TIME, '途径：' + aff.list[i].ADMINISTRATOR, '量：' + aff.list[i].DOSAGE, '单位：' + aff.list[i].DOSAGE_UNITS];
                        var titleTwo = titleDataTwo.join('\n');
                        this.dataBody.push({
                          ITEM_NAME: aff.list[h].ITEM_NAME,
                          START_TIME: aff.list[h].START_TIME,
                          titleWord: titleTwo,
                          sort: timeMoreOne,
                          DOSAGE: aff.list[h].DOSAGE,
                          DOSAGE_UNITS: aff.list[h].DOSAGE_UNITS,
                        });
                      }
                    }
                  } else {

                  }
                  this.dataBody.sort(this.sortFun)
                });
            });
        });
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
    // Bus.$on('test', this.closing)
    Bus.$on('timeSetChange', this.closing)
    this.dataBody = [];
  },
  beforeDestroy() {
    clearTimeout(this.setTimeId);
    // Bus.$on('timeSetChange', this.closing)
    Bus.$off('test', this.closing);
    this.dataBody = [];
  },
}

</script>
<style scoped>

</style>
