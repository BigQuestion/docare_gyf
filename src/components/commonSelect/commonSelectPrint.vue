<template>
  <div style="position: relative;font-family: SimSun;font-weight:bold;">
    <div v-if="conInfo.bottomLineMode&&conInfo.lineTypeMode=='solid'&&conInfo.strFormatMode==''" :style="{width:conInfo.width+'px',color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,border:'0',textAlign:conInfo.TextAlignMode,}" style="min-width: 20px;min-height: 20px;position:relative;">
      <span>{{conInfo[attrName]}}</span>
      <div style="position:absolute;bottom:-22px;">
        <svg height="20" :style="{width:conInfo.width+'px'}">
          <g fill="none" stroke="black" stroke-width="1">
            <path stroke-dasharray="5,5" d="M0 0 l900 0" />
          </g>
        </svg>
      </div>
    </div>
    <div v-else-if="conInfo.bottomLineMode&&conInfo.lineTypeMode=='dashed'&&conInfo.strFormatMode==''" :style="{width:conInfo.width+'px',cursor:conInfo.cursorMode,opacity:conInfo.opacity,textAlign:conInfo.TextAlignMode,fontSize:conInfo.fontSize+'pt'}" style="min-width: 20px;min-height: 20px;position:relative;">
      {{conInfo[attrName]}}
      <div style="position:absolute;bottom:-22px;">
        <svg height="20" :style="{width:conInfo.width+'px'}">
          <g fill="none" stroke="black" stroke-width="1">
            <path stroke-dasharray="5,5" d="M0 0 l900 0" />
          </g>
        </svg>
      </div>
    </div>
    <!-- <input v-model="strToDate"   :readonly="true"> -->
    <div v-else-if="conInfo.strFormatMode == 'yyyy-MM-dd'||conInfo.strFormatMode == 'hh:mm'||conInfo.strFormatMode == 'yyyy-MM-dd hh:mm'" :style="{width:conInfo.width+'px',cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt',textAlign:conInfo.TextAlignMode}" style="min-width: 20px;min-height: 20px;position:relative;">
      <span>{{strToDate}}</span>
      <div style="position:absolute;bottom:-22px;">
        <svg height="20" :style="{width:conInfo.width+'px'}">
          <g fill="none" stroke="black" stroke-width="1">
            <path stroke-dasharray="5,5" d="M0 0 l900 0" />
          </g>
        </svg>
      </div>
    </div>
    <div v-else :style="{width:conInfo.width+'px',cursor:conInfo.cursorMode,opacity:conInfo.opacity,textAlign:conInfo.TextAlignMode,fontSize:conInfo.fontSize}" style="min-width: 20px;min-height: 20px;">
      <span>{{conInfo[attrName]}}</span>
      <div style="position:absolute;bottom:-22px;">
        <svg height="30" :style="{width:conInfo.width+'px'}">
          <g fill="none" stroke="black" stroke-width="1">
            <path stroke-dasharray="5,5" d="M0 0 l900 0" />
          </g>
        </svg>
      </div>
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
      if (this.conInfo.value && this.conInfo.strFormatMode ==
        'yyyy-MM-dd' || this.conInfo.strFormatMode == 'hh:mm' || this.conInfo.strFormatMode == 'yyyy-MM-dd hh:mm') {
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
  // watch: {
  //   "conInfo.value": function() {
  //     if (!this.conInfo.value) {
  //       this.conInfo.value = this.conInfo.defaultValue
  //     }
  //   }
  // }

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
