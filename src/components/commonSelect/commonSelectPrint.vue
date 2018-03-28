<template>
  <div style="position: relative;">
    <div v-if="infoData.bottomLineMode&&infoData.lineTypeMode=='solid'" :style="{width:conInfo.width+'px',color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,border:'0',borderBottom:'1pt solid'+conInfo.lineColor}">
      {{infoData[attrName]}}
    </div>
    <div v-else-if="infoData.bottomLineMode&&infoData.lineTypeMode=='dashed'" :style="{width:conInfo.width+'px',color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,border:'0',borderBottom:'1pt dashed'+conInfo.lineColor}">
      {{infoData[attrName]}}
    </div>
    <div v-else :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity}">
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
      if (this.conInfo.strFormatMode == 'true' && this.infoData.value) {
        var time = new Date(this.conInfo.value);
        var y = time.getFullYear();
        if (y < 10) {
          y = '0' + y;
        }
        var m = time.getMonth() + 1;
        if (m < 10) {
          m = '0' + m;
        }
        var d = time.getDate();
        if (d < 10) {
          d = '0' + d;
        }
        return y + '-' + m + '-' + d;
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
