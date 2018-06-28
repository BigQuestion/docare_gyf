<template>
  <div style="position: relative;font-size: 10.5pt;font-family: SimSun;">
    <div v-if="infoData.bottomLineMode&&infoData.lineTypeMode=='solid'&&infoData.strFormatMode==''" :style="{width:conInfo.width+'px',color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,border:'0',borderBottom:'1pt solid'+conInfo.lineColor}" style="min-width: 20px;min-height: 20px;">
      {{infoData[attrName]}}
    </div>
    <div v-else-if="infoData.bottomLineMode&&infoData.lineTypeMode=='dashed'&&infoData.strFormatMode==''" :style="{width:conInfo.width+'px',color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,border:'0',borderBottom:'1pt dashed'+conInfo.lineColor}" style="min-width: 20px;min-height: 20px;">
      {{infoData[attrName]}}
    </div>
    <!-- <input v-model="strToDate"   :readonly="true"> -->
    <div v-else-if="infoData.strFormatMode == 'yyyy-MM-dd'||infoData.strFormatMode == 'hh:mm'||infoData.strFormatMode == 'yyyy-MM-dd hh:mm'" :style="{width:conInfo.width+'px',border:conInfo.borderStyle,cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt'}"  style="min-width: 20px;min-height: 20px;">{{strToDate}}</div>
    <div v-else :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity}" style="min-width: 20px;min-height: 20px;">
      {{infoData[attrName]}}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameView: false,
      medAnaesthesiaDictList: [],
      allList: [],
      serchZm: '',
      updateData: [],
      infoData: this.conInfo,
      changeTimes: 0,
      focusState: false,
    }
  },
  methods: {

  },
  directives: {
    focus: {
      update: function(el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  computed: {
    strToDate() {
      if (this.infoData.value && this.infoData.strFormatMode == 'yyyy-MM-dd' || this.infoData.strFormatMode == 'hh:mm' || this.infoData.strFormatMode == 'yyyy-MM-dd hh:mm') {
        var time = new Date(this.conInfo.value).Format(this.conInfo.strFormatMode);
        return time;
      }
    }
  },
  props: ['conInfo', 'attrName', 'data'],
  mounted() {

  },
  created() {
    // 点击其他不在的区域触发事件
    document.addEventListener('click', (e) => {
      //console.log(this.$el.contains(e.target));
      if (!this.$el.contains(e.target)) {
        this.nameView = false;
        this.serchZm = '';
      }
    })
  },
  watch: {
    "infoData.value": function() {
      this.changeTimes = this.changeTimes + 1;
      if (this.changeTimes > 1) {
        this.$emit('toparentevent', this.conInfo);
      }
    }
  }
}

</script>
<style scoped>
.listIngt {
  background-color: #fff;
  cursor: pointer;
}

.listIngt:hover {
  background-color: #1E90FF;
  color: #fff;
}

.borderBottom {
  border: 0;
  border-bottom: 1px solid #222;
  color: red !important;
}
</style>
