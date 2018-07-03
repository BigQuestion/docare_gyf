<template>
  <div style="position: relative;">
    <div v-if="conInfo.dictTableName">
      <div v-if="conInfo.isEditMode=='false'&&conInfo.readOnlyMode=='false'" @dblclick="showView" :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt'}" style="display:inline-block;border:1px solid #A9A9A9;min-height:19px;font-size:13.3333px;font-family:Arial;">{{infoData[attrName]}}</div>
      <input @change="busToTop" v-if="conInfo.isEditMode=='true'&&conInfo.readOnlyMode=='false'" @dblclick="showView" v-focus="focusState" @blur="focusState =  false,disapear(infoData[attrName])" v-model="infoData[attrName]" :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt'}">
      <input v-if="conInfo.readOnlyMode=='true'" v-model="infoData[attrName]" :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt'}" :readonly="true">
      <div v-if="nameView" style="position: absolute;top: 0px;height: 300px;overflow: auto;border:1px solid;z-index: 20;background-color:white;" :style="{width:conInfo.width+'px'}">
        <div>
          <input v-model="serchZm" @keyup="serchJm">
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
        <input :style="{width:conInfo.width+'px',border:conInfo.borderStyle,cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt',color:conInfo.ForeColor,}" v-model="strToDate" style="min-width: 20px;min-height: 20px;" :readonly="true">
      </div>
      <div v-else>
        <input :style="{width:conInfo.width+'px',border:conInfo.borderStyle,cursor:conInfo.cursorMode,opacity:conInfo.opacity,fontSize:conInfo.fontSize+'pt',color:conInfo.ForeColor,}" v-model="infoData.value" style="min-width: 20px;min-height: 20px;" :readonly="true">
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
      this.nameView = true;
      let params = {
        tableName: this.conInfo.dictTableName,
        dictSelect: this.conInfo.dictSelect,
        coluName: this.conInfo.dictField,
        dictShowFiled: this.conInfo.dictShowFiled, //字典显示字段名称
      }
      this.api.getColumContext(params)
        .then(res => {
          this.medAnaesthesiaDictList = res;
        })
      this.api.allColumContext(params)
        .then(res => {
          this.allList = res;
        })

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

    busToTop() {
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
  // watch: {
  //   "conInfo.value": function() {
  //     this.changeTimes = this.changeTimes + 1;
  //     if (this.changeTimes > 1) {
  //       debugger
  //       // this.$emit('toparentevent', this.conInfo);
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

</style>
