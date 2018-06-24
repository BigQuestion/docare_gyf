<template>
  <div>
    <div style="position:relative;" :style="{width:width+'px'}">
      <div style="z-index: 0;position: absolute;left:0px;top:0px;">
        <input type="date" class="timePicker" v-model="date" :style="{width:width+'px'}" style="border: none;" @focus="showDateTime" @change="hideDateTime">
      </div>
      <div style="position: absolute;left:0px;top:0px;z-index: 1;" v-if="dateTimeShow">
        <input type="text" v-model="dateTime" :style="{width:width-20+'px'}" style="border: none;" @focus="showDateTime">
      </div>
      <div style="position: absolute;right:0px;top:0px;z-index: 3;pointer-events:none;">
        △
      </div>
      <div style="position: absolute;left:0px;top:0px;z-index: 2;" v-if="timeShow">
        <input ref="timeClick" type="time" :style="{width:width-20+'px'}" style="border: none;text-align: center;" v-model="time" class="timePicker" @blur="hideDateTime">
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      myValue: '',
      dateTime: '00-00 00:00',
      time: '00:00',
      date: '2018-06-23',
      dateTimeShow: true,
      timeShow: false,
    }
  },
  methods: {
    showDateTime() {
      this.timeShow = true
      this.$nextTick(function() {
        this.$refs.timeClick.focus();
      })
    },
    hideDateTime() {
      this.timeShow = false
      let getDate = this.date
      let getTime = this.time
      let nowTime = new Date(getDate + " " + getTime)
      this.myValue = nowTime
      this.dateTime = nowTime.Format("MM-dd hh:mm")
      this.date = nowTime.Format("yyyy-MM-dd")
      this.time = nowTime.Format("hh:mm")
      console.log(this.myValue.Format('yyyy-MM-dd hh:mm'))
      // this.value = this.dateTime
      this.$emit("input", this.myValue)
      this.$emit("change")
    },
  },
  props: ['index', 'value', 'width'],
  mounted() {
    //判断是否传入有值
    if (this.value) {
      let nowDate = new Date(this.value)
      this.dateTime = nowDate.Format("MM-dd hh:mm")
      this.date = nowDate.Format("yyyy-MM-dd")
      this.time = nowDate.Format("hh:mm")
    } else {
      let nowDate = new Date()
      this.dateTime = nowDate.Format("MM-dd hh:mm")
      this.date = nowDate.Format("yyyy-MM-dd")
      this.time = nowDate.Format("hh:mm")
    }
  },
  created() {},
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
<style scoped>
.timePicker::-webkit-inner-spin-button {
  display: none;
}

.timePicker::-webkit-clear-button {
  display: none;
}

input {
  height: 20px;
}

</style>
