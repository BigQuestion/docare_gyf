<template>
  <div>
    <!-- <p style="color:SeaGreen">●心率</p>
                                              <p style="color:DarkGreen">●PULSE</p>
                                              <p style="color:red">∨收缩压</p>
                                              <p style="color:red">∧舒张压</p>
                                              <p style="color:pink">○自主呼吸</p>
                                              <p style="color:SpringGreen">△中心静脉压</p>
                                              <p style="color:DarkGreen">X麻醉开始</p>
                                              <p style="color:DarkGreen">⊙手术开始</p>
                                              <p style="color:red">X手术结束</p>
                                              <p style="color:red">ⓧ麻醉结束</p> -->
    <div v-for="item in eventTypeList" :style="{fontSize:object.fontSize*0.75+'pt'}">
      <p v-if="item == 71" style="color:Crimson">△中心静脉压</p>
      <p v-else-if="item == 89" style="color:Blue">∨无创收缩压</p>
      <p v-else-if="item == 90" style="color:Blue">∧无创舒张压</p>
      <p v-else-if="item == 92" style="color:Magenta">○呼吸</p>
      <p v-else-if="item == 100" style="color:Red">X体温</p>
      <p v-else-if="item == 104" style="color:#8080FF">X肛温</p>
      <p v-else-if="item == 105" style="color:#FF8080">X鼻咽温</p>
      <!-- <p v-else-if="item == 112" style="color:Blue">△ETCO2</p> -->
      <!-- <p v-else-if="item == 188" style="color:Blue">●SpO2</p> -->
      <!-- <p v-else-if="item == 202">△f</p> -->
      <p v-else-if="item == 208">△Ppeak</p>
      <p v-else-if="item == 209">△Pplat</p>
      <p v-else-if="item == 210">△Pmean</p>
      <!-- <p v-else-if="item == 212">△TVE</p> -->
      <p v-else-if="item == 40" style="color:SeaGreen">●心率</p>
      <p v-else-if="item == 44" style="color:DarkGreen">●PULSE</p>
      <p v-else-if="item == 65" style="color:Red">∨动脉收缩压</p>
      <p v-else-if="item == 66" style="color:Red">∧动脉舒张压</p>
      <p v-else-if="item == 67" style="color:Red">△动脉平均压</p>
      <p v-else-if="item == '麻醉开始'" style="color:#222;">
        <span style="font-size:18px;">×</span>麻醉开始</p>
      <p v-else-if="item == '手术开始'" style="color:#222">⊙手术开始</p>
      <p v-else-if="item == '手术结束'" style="color:red">
        <span style="font-size:14px;">ⓧ</span>手术结束</p>
      <p v-else-if="item == '麻醉结束'" style="color:red;">
        <span style="font-size:18px;">×</span>麻醉结束</p>
      <p v-else-if="item == 'kzhx'" style="display:flex;align-items:center;color:magenta;">
        <svg :width="14+'px'" :height="5+'px'">
          <path stroke="magenta" id="svg_1" d="m0.75,0.75c0,0 4.705594,4.705594 4.567194,4.567194c0.1384,0.1384 4.290395,-4.013595 4.151995,-4.428795c0.002306,0.274494 4.807215,5.084015 4.705594,4.705594" opacity="0.5" stroke-width="1.5" fill="#fff" />
        </svg>
        控制呼吸
      </p>
      <p v-else-if="item == 'fzhx'" style="display:flex;align-items:center;color:magenta;">A辅助呼吸</p>
      <p v-else-if="item == 'zzhx'" style="display:flex;align-items:center;color:magenta;">○自主呼吸</p>
    </div>
  </div>
  </div>
</template>
<script>
import Bus from '@/bus.js';
export default {
  data() {
    return {
      eventTypeList: []
    }
  },
  methods: {
    getList() {
      this.api.getPatientAllCode({
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0,
      }).then(
        res => {
          if (res.length > 0) {
            this.eventTypeList = res;
          } else {
            this.eventTypeList = []
          }
          this.api.getMedPatSetting({
              patientId: this.config.userInfo.patientId,
              operId: this.config.userInfo.operId,
              visitId: this.config.userInfo.visitId
            })
            .then(rest => {
              let list = []
              if (rest.length > 0) {
                for (var i = 0; i < rest.length; i++) {
                  list.push(rest[i].itemCode)
                }
                if (this.eventTypeList.length > 0) {
                  for (var k = 0; k < this.eventTypeList.length; k++) {
                    if (list.indexOf(this.eventTypeList[k]) >= 0) {
                      this.eventTypeList.splice(k, 1)
                    }
                  }
                }
              }

            })
          this.pushFun();
        });

    },
    pushFun() {
      // 手术开始
      if (this.config.userInfo.startDateTime) {
        this.eventTypeList.push('手术开始')
      }
      // 麻醉开始
      if (this.config.userInfo.anesStartTime) {
        this.eventTypeList.push('麻醉开始')
      }
      // 麻醉结束
      if (this.config.userInfo.anesEndTime) {
        this.eventTypeList.push('麻醉结束')
      }
      // 手术结束
      if (this.config.userInfo.endDateTime) {
        this.eventTypeList.push('手术结束')
      }
      // 全部呼吸
      let paramBr = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        itemClass: 'Y'
      }
      this.api.selectMedAnesthesiaEventList(paramBr)
        .then(add => {
          console.log(add.list)
          if (add.list.length > 0) {
            for (var m = 0; m < add.list.length; m++) {
              this.eventTypeList.push(add.list[m].ITEM_CODE)
            }
            this.eventTypeList.sort(this.sortFun);
            for (var k = 0; k < this.eventTypeList.length; k++) {
              if (this.eventTypeList[k - 1]) {
                if (this.eventTypeList[k] == this.eventTypeList[k - 1]) {
                  this.eventTypeList.splice(k, 1);
                } else {

                }
              } else {

              }
            }
          }
        })
    }
  },
  props: ['page', 'object'],
  mounted() {
    if (this.page == false) {
      this.getList();
    }
  },
  created() {
    Bus.$on('timeSetChange', this.getList)
  },
  beforeDestroy() {
    Bus.$off('timeSetChange', this.getList)
  },

}

</script>
<style scoped>


</style>
