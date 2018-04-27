<template>
  <div>
    <div v-if="value.type=='text'" :style="{width:value.width*0.75+'pt',height:value.height*0.75+'pt'}" style="min-width: 20px;min-height: 20px;">
      {{value.value}}
    </div>
    <div v-if="value.type=='title'" :style="{width:value.width*0.75+'pt',height:value.height*0.75+'pt'}" style="min-width: 20px;min-height: 20px;">
      {{value.value}}
    </div>
    <div v-if="value.type=='input'">
      <common-select-print v-if="!isPage.isPage" :conInfo="value" attrName="value"></common-select-print>
    </div>
    <div v-if="value.type=='radio'">
      <input type="radio" name="" v-model="value.text">
    </div>
    <div v-if="value.type=='checkbox'">
      <input type="checkbox" name="" v-model="value.text">
    </div>
    <div v-if="value.type=='line'">
      <div style="margin-top:1px;height:1px;background: #000;" :style="{width:value.width*0.75+'pt'}"></div>
    </div>
    <div v-if="value.type=='verticalLine'">
      <div style="margin-left:1px;width:1px;background: #000;" :style="{height:value.height*0.75+'pt'}"></div>
    </div>
    <div v-if="value.type=='textarea'">
      <textarea :style="{height:value.height*0.75+'pt',width:value.width*0.75+'pt'}" v-model="value.text"></textarea>
    </div>
    <div v-if="value.type=='autoInput'">
      <textarea :style="{height:value.height*0.75+'pt',width:value.width*0.75+'pt'}" v-model="value.text"></textarea>
    </div>
    <div v-if="value.type=='formDiv'">
      <tableGridPrint :page="isPage.isPage"></tableGridPrint>
    </div>
    <div v-if="value.type=='checkBoxAll'">
      <div v-if="isPage.isPage">
        <div style="min-width: 100px;height: 40px;z-index: 5;display: flex;border:1px dashed;">
          <check-box :boxValue="value" :isEdit="isPage.isPage" v-on:toparentevent="getChlidValue"></check-box>
        </div>
      </div>
      <div v-else>
        <div style="min-width: 100px;height: 40px;z-index: 5;display: flex;">
          <check-box :boxValue="value" :isEdit="isPage.isPage" v-on:toparentevent="getChlidValue"></check-box>
        </div>
      </div>
    </div>
    <div v-if="value.type=='formInGrid'">
      <dosageGridPrint :page="isPage.isPage"></dosageGridPrint>
    </div>
    <div v-if="value.type=='operControlGrid'">
      <operControlGridPrint :page="isPage.isPage"></operControlGridPrint>
    </div>
    <div v-if="value.type=='signGridPrint'">
      <signGridPrint :page="isPage.isPage" :width="value.width" :height="value.height" :dataOfPeo="objectItem"></signGridPrint>
    </div>
    <div v-if="value.type=='dataOfGrid'">
      <dataOfGridPrint :page="isPage.isPage" :width="value.width" :height="value.height" :dataOfPeo="objectItem"></dataOfGridPrint>
    </div>
    <div v-if="value.type=='div'">
      <div style="box-sizing:border-box;" :style="{width:value.width*0.75+'pt',height:value.height*0.75+'pt',border:value.borderStyle}"></div>
    </div>
  </div>
</template>
<script>
import commonSelect from '@/components/commonSelect/commonSelect.vue';
import commonSelectPrint from '@/components/commonSelect/commonSelectPrint.vue';
import checkBox from '@/components/checkBox/checkBox.vue';
import tableGridPrint from '@/components/drawTable/tableGridPrint.vue';
import dosageGridPrint from '@/components/drawTable/dosageGridPrint.vue';
import operControlGridPrint from '@/components/drawTable/operControlGridPrint.vue';
import signGridPrint from '@/components/drawTable/signGridPrint.vue';
import dataOfGridPrint from '@/components/drawTable/dataOfGridPrint.vue';
export default {
  data() {
    return {
      updateData: [],
    }
  },
  methods: {
    //传入值到上级
    getChlidValue(data) {
      this.$emit('toTopEvent', data);
    },
  },
  props: ['value', 'isPage', 'isPrint', 'objectItem'], // 设置value为props属性-必须
  computed: {},
  components: {
    commonSelect,
    commonSelectPrint,
    checkBox,
    tableGridPrint,
    dosageGridPrint,
    operControlGridPrint,
    signGridPrint,
    dataOfGridPrint
  },
  mounted() {

  }
}

</script>
<style type="text/css" scoped>

</style>
