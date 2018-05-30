<template>
  <div style="width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:wrap;">
    <div v-if="page == false" :title="item.titleWord" v-for="item in dataBody" style="width:auto;max-width:300px;min-width:220px;font-size:14px;padding:0 20px 2px 0;display:flex;cursor:default;">
      <span style="padding-right:5px;width:26px;display:block;">{{item.number}}</span>
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
      var nber = 1;
      this.dataBody = [];
      this.maxTimeInPage = this.config.maxTime.getTime()
      this.startTimeInPage = this.config.initTime.getTime()
      let params = {
        patientId: this.dataOfPeo.patientId,
        operId: this.dataOfPeo.operId,
        visitId: this.dataOfPeo.visitId
      }
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
      this.api.selectMedAnesthesiaEventList(params)
        .then(
          // display:flex;flex-direction:column;flex-wrap:wrap;
          res => {
            for (var i = 0; i < res.list.length; i++) {
              var time = new Date(res.list[i].START_TIME).getTime();
              if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
                this.dataBody.push(res.list[i]);
                this.$set(res.list[i], 'number', nber++);
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

            this.setTimeId = setTimeout(_ => this.selectMedAnesthesiaEventList(), this.config.timeSet)
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
    Bus.$on('test', this.selectMedAnesthesiaEventList)
  },
  beforeDestroy() {
    clearTimeout(this.setTimeId);
    Bus.$off('test', this.selectMedAnesthesiaEventList);

  },
}

</script>
<style scoped>


</style>
