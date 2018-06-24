<template>
  <div>
    <div style="position:relative;height:21px;border:1px solid #222;" :style="{width:width+'px'}">
      <div style="z-index: 0;position: absolute;left:0px;top:1px;">
        <input type="date" class="timePicker" v-model="date" :style="{width:width+'px'}" style="border: none;display:block;" @focus="showDateTime" @change="hideDateTime">
      </div>
      <div style="position: absolute;left:0px;top:1px;z-index: 1;" v-if="dateTimeShow">
        <input type="text" v-model="dateTime" :style="{width:width-20+'px'}" style="border: none;display:block;" @focus="showDateTime">
      </div>
      <div style="position: absolute;right:0px;top:1px;z-index: 3;pointer-events:none;height:100%;">
        <svg data-v-fc154ec6="" viewBox="0 0 1024 1024" width="19" height="20">
          <polygon data-v-fc154ec6="" points="220,220 560,770 840,220" style="fill: #b3c1d7;"></polygon>
        </svg>
      </div>
      <div style="position: absolute;left:0px;top:1px;z-index: 2;" v-if="timeShow">
        <input ref="timeClick" type="time" :style="{width:width-20+'px'}" style="border: none;text-align: center;display:block;" v-model="time" class="timePicker" @blur="hideDateTime">
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      myValue: '',
      dateTime: '',
      time: '',
      date: '',
      dateTimeShow: true,
      timeShow: false,
      tempValue: '', //存放传入进来的值
      state: 0, //0代表传入值为'' 1代表传入的值不为空
    }
  },
  watch: {
    value(val, oldVal) {
      //普通的watch监听
      // let nowDate = new Date(val)
      // this.dateTime = nowDate.Format("MM-dd hh:mm")
      // this.date = nowDate.Format("yyyy-MM-dd")
      // this.time = nowDate.Format("hh:mm")
      this.setInitValue(val)
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
      this.myValue = new Date(this.date + " " + this.time)
      let nowTime = this.myValue
      this.dateTime = this.myValue.Format("MM-dd hh:mm")
      this.date = this.myValue.Format("yyyy-MM-dd")
      this.time = this.myValue.Format("hh:mm")
      this.$emit("input", this.myValue)
      if (this.value) {
        if (new Date(this.value).getTime() != nowTime.getTime()) {
          this.$emit("change")
        }
      } else {
        this.$emit("change")
      }

    },
    setInitValue(value) {
      if (value) {
        var nowDate = new Date(value)
        this.myValue = value;
        this.dateTime = nowDate.Format("MM-dd hh:mm")
        this.date = nowDate.Format("yyyy-MM-dd")
        this.time = nowDate.Format("hh:mm")
        this.state = 1
      } else {
        this.dateTime = ''
        this.date = new Date().Format("yyyy-MM-dd")
        this.time = new Date().Format("hh:mm")
        this.state = 0
      }
    },
  },
  props: ['value', 'width'],
  mounted() {
    //判断是否传入有值
    this.setInitValue(this.value)
  },
  created() {

  },
  beforeDestroy() {},
  components: {},
  computed: {}
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

input::-webkit-calendar-picker-indicator {
  color: rgba(0, 0, 0, 0);
}

input::-webkit-calendar-picker-indicator:hover {
  background: rgba(0, 0, 0, 0);
}

</style>
