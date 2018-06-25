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
    <div v-for="item in eventTypeList">
      <p v-if="item == 71" style="color:Crimson">△中心静脉压</p>
      <p v-else-if="item == 89" style="color:Blue">∨无创收缩压</p>
      <p v-else-if="item == 90" style="color:Blue">∧无创舒张压</p>
      <p v-else-if="item == 92" style="color:Magenta">○呼吸</p>
      <p v-else-if="item == 100" style="color:Red">X体温</p>
      <p v-else-if="item == 104" style="color:#8080FF">X肛温</p>
      <p v-else-if="item == 105" style="color:#FF8080">X鼻咽温</p>
      <!-- <p v-else-if="item == 112" style="color:Blue">△ETCO2</p> -->
      <!-- <p v-else-if="item == 188">●SpO2</p> -->
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
    </div>
  </div>
</template>
<script>
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
          this.eventTypeList = res;
        });
    }
  },
  props: ['page'],
  mounted() {
    if (this.page == false) {
      this.getList();
    }
  },

}

</script>
<style scoped>


</style>
