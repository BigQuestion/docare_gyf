<template>
  <div style="margin: 10px 30px;width: 1300px;padding-top:100px;">
    <div>
      <span>同步开始日期:</span>
      <input type="date" v-model="startTimeValue">
    </div>
    <div style="margin-top: 15px;">
      <span>同步结束日期:</span>
      <input type="date" v-model="endTimeValue">
    </div>
    <div style="margin-top: 10px;">
      <button @click="synchroSchedule">同步预约</button>
      <button @click="synchroUserAndDept">同步其他</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startTimeValue: '',
      endTimeValue: '',
    }
  },
  methods: {
    synchroSchedule() {
      let params = {
        startDate: this.startTimeValue,
        endDate: this.endTimeValue
      }
      this.api.synchroSchedule(params)
        .then(res => {
          alert("同步完成");
        })

    },
    synchroUserAndDept() {
      let params = {

      }
      this.api.synchroUserAndDept(params)
        .then(res => {
          alert("同步完成");
        })
    },
  },
  mounted() {
    this.startTimeValue = new Date().Format("yyyy-MM-dd");
  }
}

</script>
<style scoped>


</style>
