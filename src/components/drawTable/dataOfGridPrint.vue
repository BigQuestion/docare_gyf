<template>
  <div style="width:100%;height:100%;display:flex;flex-direction:row;">
    <div v-if="page == false" v-for="(cell,index) in forALL">
      <div v-for="(item,index) in cell" style="width:auto;max-width:300px;min-width:220px;font-size:14px;padding:0 20px 2px 0;display:flex;cursor:default;">
        <span style="padding-right:5px;width:26px;display:block;">{{index+1}}</span>
        <span>{{item.ITEM_NAME}}</span>
        <span>{{item.DOSAGE}}</span>
        <span>{{item.DOSAGE_UNITS}}</span>
        <span v-if="item.ADMINISTRATOR">,{{item.ADMINISTRATOR}}</span>
      </div>
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
      // showDataMore:'',
      maxTimeInPage: '',
      startTimeInPage: '',
      lengthType: '',
      outBoxLength: '',
      forBoxBody: [],
      forALL: [],
    }
  },
  methods: {
    selectMedAnesthesiaEventList() {
      this.forBoxBody = [];
      this.forALL = [];
      var nber = 1;
      this.dataBody = [];
      this.maxTimeInPage = new Date(this.config.maxTime).getTime()
      this.startTimeInPage = new Date(this.config.initTime).getTime()
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
      }
      this.api.selectSignMedAnesthesiaEventList(params)
        .then(
        // display:flex;flex-direction:column;flex-wrap:wrap;
        res => {
          for (var i = 0; i < res.list.length; i++) {
            var time = new Date(res.list[i].START_TIME).getTime();
            if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
              this.$set(res.list[i], 'sort', time);
              this.dataBody.push(res.list[i]);
              this.$set(res.list[i], 'number', nber++);

            }
          }
          if (this.config.userInfo.inDateTime) {
            var time1 = new Date(this.config.userInfo.inDateTime).getTime();
            if (this.startTimeInPage <= time1 && time1 <= this.maxTimeInPage) {
              this.dataBody.push({
                ITEM_NAME: '入手术室',
                START_TIME: this.config.userInfo.inDateTime,
                sort: time1
              });
            }
          }
          if (this.config.userInfo.endDateTime) {
            var time2 = new Date(this.config.userInfo.endDateTime).getTime();
            if (this.startTimeInPage <= time1 && time1 <= this.maxTimeInPage) {
              this.dataBody.push({
                ITEM_NAME: '出手术室',
                START_TIME: this.config.userInfo.endDateTime,
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
                        this.dataBody.push({
                          ITEM_NAME: zze.list[t].ITEM_NAME,
                          START_TIME: zze.list[t].START_TIME,
                          sort: timeMoreOne
                        });
                      }
                    } else {

                    }

                  }
                  break;
                }
              } else {

              }
              // 麻醉用药
              let paramsTwo = {
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId,
                itemClass: "2C4",
              }
              this.api.selectMedAnesthesiaEventList(paramsTwo)
                .then(aff => {
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
                  if (aff.list.length > 8) {
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
                  this.addFun();
                });
            });

        });
    },
    sortFun(a, b) {
      return a.sort - b.sort;
    },
    addFun() {
      this.lengthType = this.dataBody.length;
      if (this.lengthType / 7 > 1) {
        this.outBoxLength = Math.round(this.lengthType / 7);
        for (var a = 0; a < this.outBoxLength; a++) {
          this.forALL.push([])
          if (a === 0) {
            this.forBoxBody = [];
            for (var j = 0; j < 7; j++) {
              this.forBoxBody.push({
                ADMINISTRATOR: this.dataBody[j].ADMINISTRATOR,
                BILL_ATTR: this.dataBody[j].BILL_ATTR,
                BILL_INDICATOR: this.dataBody[j].BILL_INDICATOR,
                CONCENTRATION: this.dataBody[j].CONCENTRATION,
                CONCENTRATION_UNIT: this.dataBody[j].CONCENTRATION_UNIT,
                DOSAGE: this.dataBody[j].DOSAGE,
                DOSAGE_UNITS: this.dataBody[j].DOSAGE_UNITS,
                DURATIVE_INDICATOR: this.dataBody[j].DURATIVE_INDICATOR,
                ENDDATE: this.dataBody[j].ENDDATE,
                EVENT_ATTR: this.dataBody[j].EVENT_ATTR,
                EVENT_NO: this.dataBody[j].EVENT_NO,
                ITEM_CLASS: this.dataBody[j].ITEM_CLASS,
                ITEM_CODE: this.dataBody[j].ITEM_CODE,
                ITEM_NAME: this.dataBody[j].ITEM_NAME,
                ITEM_NO: this.dataBody[j].ITEM_NO,
                ITEM_SPEC: this.dataBody[j].ITEM_SPEC,
                MAX_TIME: this.dataBody[j].MAX_TIME,
                METHOD: this.dataBody[j].METHOD,
                METHOD_PARENT_NO: this.dataBody[j].METHOD_PARENT_NO,
                OPER_ID: this.dataBody[j].OPER_ID,
                PARENT_ITEM_NO: this.dataBody[j].PARENT_ITEM_NO,
                PATIENT_ID: this.dataBody[j].PATIENT_ID,
                PERFORM_SPEED: this.dataBody[j].BILL_ATTR,
                SPEED_UNIT: this.dataBody[j].PERFORM_SPEED,
                START_TIME: this.dataBody[j].START_TIME,
                SUPPLIER_NAME: this.dataBody[j].SUPPLIER_NAME,
                TYPE_NAME: this.dataBody[j].TYPE_NAME,
                VISIT_ID: this.dataBody[j].VISIT_ID,
                number: this.dataBody[j].number,
                titleWord: this.dataBody[j].titleWord,
              })
            }
            this.forALL[a] = this.forBoxBody
          } else {
            this.forBoxBody = [];
            for (var j = (a + (7 * a)) - 1; j < (7 * a) + 7; j++) {
              if (j >= this.dataBody.length) {
                break
              } else {
                this.forBoxBody.push({
                  ADMINISTRATOR: this.dataBody[j].ADMINISTRATOR,
                  BILL_ATTR: this.dataBody[j].BILL_ATTR,
                  BILL_INDICATOR: this.dataBody[j].BILL_INDICATOR,
                  CONCENTRATION: this.dataBody[j].CONCENTRATION,
                  CONCENTRATION_UNIT: this.dataBody[j].CONCENTRATION_UNIT,
                  DOSAGE: this.dataBody[j].DOSAGE,
                  DOSAGE_UNITS: this.dataBody[j].DOSAGE_UNITS,
                  DURATIVE_INDICATOR: this.dataBody[j].DURATIVE_INDICATOR,
                  ENDDATE: this.dataBody[j].ENDDATE,
                  EVENT_ATTR: this.dataBody[j].EVENT_ATTR,
                  EVENT_NO: this.dataBody[j].EVENT_NO,
                  ITEM_CLASS: this.dataBody[j].ITEM_CLASS,
                  ITEM_CODE: this.dataBody[j].ITEM_CODE,
                  ITEM_NAME: this.dataBody[j].ITEM_NAME,
                  ITEM_NO: this.dataBody[j].ITEM_NO,
                  ITEM_SPEC: this.dataBody[j].ITEM_SPEC,
                  MAX_TIME: this.dataBody[j].MAX_TIME,
                  METHOD: this.dataBody[j].METHOD,
                  METHOD_PARENT_NO: this.dataBody[j].METHOD_PARENT_NO,
                  OPER_ID: this.dataBody[j].OPER_ID,
                  PARENT_ITEM_NO: this.dataBody[j].PARENT_ITEM_NO,
                  PATIENT_ID: this.dataBody[j].PATIENT_ID,
                  PERFORM_SPEED: this.dataBody[j].BILL_ATTR,
                  SPEED_UNIT: this.dataBody[j].PERFORM_SPEED,
                  START_TIME: this.dataBody[j].START_TIME,
                  SUPPLIER_NAME: this.dataBody[j].SUPPLIER_NAME,
                  TYPE_NAME: this.dataBody[j].TYPE_NAME,
                  VISIT_ID: this.dataBody[j].VISIT_ID,
                  number: this.dataBody[j].number,
                  titleWord: this.dataBody[j].titleWord,
                })
              }
            }
            this.forALL[a] = this.forBoxBody
          }
        }
      } else {
        this.outBoxLength = Math.ceil(this.lengthType / 7);
        for (var a = 0; a < this.outBoxLength; a++) {
          this.forALL.push([])
          this.forBoxBody = [];
          for (var j = 0; j < 7; j++) {
            if (j >= this.dataBody.length) {
              break
            } else {
              this.forBoxBody.push({
                ADMINISTRATOR: this.dataBody[j].ADMINISTRATOR,
                BILL_ATTR: this.dataBody[j].BILL_ATTR,
                BILL_INDICATOR: this.dataBody[j].BILL_INDICATOR,
                CONCENTRATION: this.dataBody[j].CONCENTRATION,
                CONCENTRATION_UNIT: this.dataBody[j].CONCENTRATION_UNIT,
                DOSAGE: this.dataBody[j].DOSAGE,
                DOSAGE_UNITS: this.dataBody[j].DOSAGE_UNITS,
                DURATIVE_INDICATOR: this.dataBody[j].DURATIVE_INDICATOR,
                ENDDATE: this.dataBody[j].ENDDATE,
                EVENT_ATTR: this.dataBody[j].EVENT_ATTR,
                EVENT_NO: this.dataBody[j].EVENT_NO,
                ITEM_CLASS: this.dataBody[j].ITEM_CLASS,
                ITEM_CODE: this.dataBody[j].ITEM_CODE,
                ITEM_NAME: this.dataBody[j].ITEM_NAME,
                ITEM_NO: this.dataBody[j].ITEM_NO,
                ITEM_SPEC: this.dataBody[j].ITEM_SPEC,
                MAX_TIME: this.dataBody[j].MAX_TIME,
                METHOD: this.dataBody[j].METHOD,
                METHOD_PARENT_NO: this.dataBody[j].METHOD_PARENT_NO,
                OPER_ID: this.dataBody[j].OPER_ID,
                PARENT_ITEM_NO: this.dataBody[j].PARENT_ITEM_NO,
                PATIENT_ID: this.dataBody[j].PATIENT_ID,
                PERFORM_SPEED: this.dataBody[j].BILL_ATTR,
                SPEED_UNIT: this.dataBody[j].PERFORM_SPEED,
                START_TIME: this.dataBody[j].START_TIME,
                SUPPLIER_NAME: this.dataBody[j].SUPPLIER_NAME,
                TYPE_NAME: this.dataBody[j].TYPE_NAME,
                VISIT_ID: this.dataBody[j].VISIT_ID,
                number: this.dataBody[j].number,
                titleWord: this.dataBody[j].titleWord,
              })
            }
          }
          this.forALL[a] = this.forBoxBody

        }
      }
    }
  },
  props: ['dataOfPeo', 'page'],
  mounted() {
    if (this.page == false) {
      this.selectMedAnesthesiaEventList();
      // window.eventHub.$on("test", this.selectMedAnesthesiaEventList);
    }

  },
  created() {
    this.dataBody = [];
    Bus.$on('test', this.selectMedAnesthesiaEventList)
  },
  beforeDestroy() {
    clearTimeout(this.setTimeId);
    this.dataBody = [];
    Bus.$off('test', this.selectMedAnesthesiaEventList);

  },
}

</script>
<style scoped>

</style>
