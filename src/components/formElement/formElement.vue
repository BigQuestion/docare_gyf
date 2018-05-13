<template>
  <div>
    <div v-if="value.type=='text'" :style="{width:value.width+'px',height:value.height+'px',fontSize:value.fontSize+'pt'}" style="min-width: 20px;min-height: 20px;">
      {{value.value}}
    </div>
    <div v-if="value.type=='title'" :style="{width:value.width+'px',height:value.height+'px',fontSize:value.fontSize+'pt'}" style="min-width: 20px;min-height: 20px;">
      {{value.value}}
    </div>
    <div v-if="value.type=='input'">
      <common-select v-if="!isPage.isPage" :conInfo="value" attrName="value" :data="updateData" v-on:toparentevent="getChlidValue">
      </common-select>
      <input v-else type="text" :style="{width:value.width+'px'}" readonly="true">
      <!-- <div v-if="value.dictTableName">
                </div> -->
      <!-- <div v-else>
                    <input :style="{width:value.width+'px',border:value.borderStyle,color:value.ForeColor,}" v-model="value.value" style="min-width: 20px;min-height: 20px;">
                </div> -->
    </div>
    <div v-if="value.type=='radio'">
      <input type="radio" name="" v-model="value.text">
    </div>
    <div v-if="value.type=='checkbox'">
      <input type="checkbox" name="" v-model="value.text">
    </div>
    <div v-if="value.type=='line'">
      <div style="margin-top:1px;height:1px;background: #000;" :style="{width:value.width+'px'}"></div>
    </div>
    <div v-if="value.type=='verticalLine'">
      <div style="margin-left:1px;width:1px;background: #000;" :style="{height:value.height+'px'}"></div>
    </div>
    <div v-if="value.type=='textarea'">
      <textarea :style="{height:value.height+'px',width:value.width+'px'}" v-model="value.text"></textarea>
    </div>
    <div v-if="value.type=='autoInput'">
      <textarea :style="{height:value.height+'px',width:value.width+'px'}" v-model="value.text"></textarea>
    </div>
    <div v-if="value.type=='formDiv'">
      <tableGrid :page="isPage.isPage"></tableGrid>
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
      <dosageGrid :page="isPage.isPage"></dosageGrid>
    </div>
    <div v-if="value.type=='operControlGrid'">
      <operControlGrid :page="isPage.isPage"></operControlGrid>
    </div>
    <div v-if="value.type=='signGrid'" style="background-color:red;" :style="{width:value.width+'px',height:value.height+'px'}">
      <signGrid :page="isPage.isPage" :width="value.width" :height="value.height" :dataOfPeo="objectItem"></signGrid>
    </div>
    <div v-if="value.type=='dataOfGrid'" style="background-color:lightBlue;" :style="{width:value.width+'px',height:value.height+'px'}">
      <dataOfGrid :page="isPage.isPage" :width="value.width" :height="value.height" :dataOfPeo="objectItem"></dataOfGrid>
    </div>
    <div v-if="value.type=='div'">
      <div style="box-sizing:border-box;" :style="{width:value.width+'px',height:value.height+'px',border:value.borderStyle}"></div>
    </div>
    <div v-if="value.type=='qixieList'">
      <appliances :page="isPage.isPage" :object="value"></appliances>
    </div>
  </div>
</template>
<script>
import commonSelect from '@/components/commonSelect/commonSelect.vue';
import commonSelectPrint from '@/components/commonSelect/commonSelectPrint.vue';
import checkBox from '@/components/checkBox/checkBox.vue';
import tableGrid from '@/components/drawTable/tableGrid.vue';
import dosageGrid from '@/components/drawTable/dosageGrid.vue';
import operControlGrid from '@/components/drawTable/operControlGrid.vue';
import signGrid from '@/components/drawTable/signGrid.vue';
import dataOfGrid from '@/components/drawTable/dataOfGrid.vue';
import appliances from '@/components/appliances/appliances.vue';
import Bus from '@/bus.js';
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
  props: ['value', 'isPage', 'objectItem', 'isPrint'], // 设置value为props属性-必须
  computed: {},
  components: {
    commonSelect,
    commonSelectPrint,
    checkBox,
    tableGrid,
    dosageGrid,
    operControlGrid,
    signGrid,
    dataOfGrid,
    appliances,
  },
  mounted() {
    // console.log(this.objectItem)
  },
}

</script>
<style type="text/css" scoped>


</style>
