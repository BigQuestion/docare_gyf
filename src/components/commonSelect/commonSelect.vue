<template>
  <div style="position: relative;">
    <div v-if="conInfo.dictTableName">
      <div v-if="conInfo.isEditMode=='false'&&conInfo.readOnlyMode=='false'" @dblclick="showView" :style="{width:conInfo.width+'px',cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt'}" style="display:inline-block;border:none;border-bottom: 1px dashed #000;min-height:19px;font-size:13.3333px;font-family:Arial;">{{infoData[attrName]}}</div>
      <input @change="busToTop" v-if="conInfo.isEditMode=='true'&&conInfo.readOnlyMode=='false'" @dblclick="showView" v-focus="focusState" @blur="focusState =  false,disapear(infoData[attrName])" v-model="infoData[attrName]" :style="{width:conInfo.width+'px',color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt',textAlign:conInfo.TextAlignMode,}" style="border:none;border-bottom: 1px dashed #000;">
      <input v-else-if="conInfo.readOnlyMode=='true'" v-model="infoData[attrName]" :style="{width:conInfo.width+'px',color:conInfo.ForeColor,textAlign:conInfo.TextAlignMode,cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt'}" :readonly="true" style="border:none;border-bottom: 1px dashed #000;">
      <div v-if="nameView" style="position: absolute;top: 0px;height: 300px;overflow: auto;border:1px solid;z-index: 20;background-color:white;" :style="{width:conInfo.width+'px'}">
        <div>
          <input id="inSelect" ref="inSelect" v-model="serchZm" @keyup="serchJm" :style="{width:conInfo.width+'px'}">
        </div>
        <div class="listIngt" @click="getSelected(item)" v-for="item in medAnaesthesiaDictList" :style="{width:conInfo.width+'px'}">
          <div v-if="conInfo.dictShowFiled!=''&&conInfo.dictShowFiled!=null">
            {{item.DICTSHOWFILED}}
          </div>
          <div v-else>{{item.DICTFILED}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="infoData.strFormatMode == 'yyyy-MM-dd'||infoData.strFormatMode == 'hh:mm'||infoData.strFormatMode == 'yyyy-MM-dd hh:mm'">
        <input :style="{width:conInfo.width+'px',cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt',color:conInfo.ForeColor,textAlign:conInfo.TextAlignMode,}" v-model="strToDate" style="min-width: 20px;min-height: 20px;border:none;border-bottom: 1px dashed #000;" :readonly="true">
      </div>
      <div v-else>
        <input v-if="conInfo.isEditMode=='false'&&conInfo.readOnlyMode=='false'" :style="{width:conInfo.width+'px',cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt',color:conInfo.ForeColor,textAlign:conInfo.TextAlignMode,}" v-model="infoData.value" style="min-width: 20px;min-height: 20px;border:none;border-bottom: 1px dashed #000;" :readonly="true">
        <input v-else :style="{width:conInfo.width+'px',cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt',color:conInfo.ForeColor,textAlign:conInfo.TextAlignMode,}" @change="busToTop" v-model="infoData.value" style="min-width: 20px;min-height: 20px;border:none;border-bottom: 1px dashed #000;">
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
      // infoData: this.conInfo,
      changeTimes: 0,
      focusState: false,

    }
  },
  methods: {
    showView() {
      // this.$refs.inSelect.focus()

      this.nameView = true;

      let params = {
        tableName: this.conInfo.dictTableName,
        dictSelect: this.conInfo.dictSelect,
        coluName: this.conInfo.dictField,
        dictShowFiled: this.conInfo.dictShowFiled, //字典显示字段名称
      }
      this.api.getColumContext(params)
        .then(res => {
          document.getElementById("inSelect").focus()
          this.medAnaesthesiaDictList = res;
          // this.allList = res;
        })
      if (this.conInfo.dictTableName == "MED_DIAGNOSIS_DICT") {
        this.allList = this.config.allDiagnosis
      } else if (this.conInfo.dictTableName == "MED_OPERATION_DICT") {
        this.allList = this.config.allOperList
      } else {
        this.api.allColumContext(params)
          .then(res => {
            this.allList = res;
          })
      }

    },
    getSelected(item) {
      if (this.conInfo.dictShowFiled != '' && this.conInfo.dictShowFiled != null) {
        if (this.infoData.MultiSelectMode == 'true') {
          if (this.conInfo.value == null || this.conInfo.value == '') {
            this.conInfo.value = item.DICTSHOWFILED;
            //实际要修改表的值
            this.$set(this.conInfo, 'modifyFiledValue', item.DICTFIELD);
            // this.conInfo.modifyFiledValue = item.DICTFILED;
          } else {
            this.conInfo.value = this.conInfo.value + "," + item.DICTSHOWFILED;
            // this.conInfo.modifyFiledValue = this.conInfo.value + "," + item.DICTFILED;
            this.$set(this.conInfo, 'modifyFiledValue', this.conInfo.value + "," + item.DICTFIELD);
          }
        } else {
          this.conInfo.value = item.DICTSHOWFILED;
          this.$set(this.conInfo, 'modifyFiledValue', item.DICTFIELD);
        }
      } else {
        if (this.infoData.MultiSelectMode == 'true') {
          if (this.conInfo.value == null || this.conInfo.value == '') {
            this.conInfo.value = item.DICTFIELD;
            this.$set(this.conInfo, 'modifyFiledValue', item.DICTFIELD);
          } else {
            this.conInfo.value = this.conInfo.value + "," + item.DICTFIELD;
            this.$set(this.conInfo, 'modifyFiledValue', this.conInfo.value + "," + item.DICTFIELD);
          }
        } else {
          this.conInfo.value = item.DICTFIELD;
          this.$set(this.conInfo, 'modifyFiledValue', item.DICTFIELD);
        }
      }
      this.$emit('toparentevent', this.conInfo);
      this.nameView = !this.nameView;
    },
    disapear(dataInput) {
      if (this.conInfo.nullStringMode == 'false') {
        if (dataInput == '') {
          this.focusState = true;
        } else {

        }
      } else {

      }
    },
    //失去焦点的时候消失
    disShowView() {
      this.nameView = false;
    },
    //对于输入拼音简码进行筛选
    serchJm() {
      var list = this.allList;
      var m = this.serchZm.toUpperCase();
      var newList = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].PYJM && list[i].PYJM.indexOf(m) >= 0) {
          newList.push(list[i]);
        }

      }
      this.medAnaesthesiaDictList = newList;
    },
    //数据返回上级
    busToTop() {
      if (this.conInfo.value) {
        this.$set(this.conInfo, 'modifyFiledValue', this.conInfo.value);
      } else {
        this.$set(this.conInfo, 'modifyFiledValue', "");
      }
      // this.$set(this.conInfo, 'modifyFiledValue', this.conInfo.value);
      this.$emit('toparentevent', this.conInfo);
    },

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
      if (this.infoData.value) {
        var time = new Date(this.conInfo.value).Format(this.conInfo.strFormatMode);
        return time;
      }
    }

  },
  props: ['conInfo', 'attrName', 'data', 'infoData'],
  mounted() {
    this.conInfo.modifyFiledValue = '';
    // console.log(this.conInfo.value)
    if (!this.conInfo.value) {
      this.conInfo.value = this.conInfo.defaultValue
    }
  },
  created() {
    // 点击其他不在的区域触发事件
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.nameView = false;
        this.serchZm = '';
      }
    })
  },
  watch: {
    "conInfo.value": function() {
      if (!this.conInfo.value) {
        this.conInfo.value = this.conInfo.defaultValue
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

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #E3E3E3;
}

::-webkit-scrollbar-thumb {
  background: #C1C1C1;
  border-radius: 2px;
}

</style>
