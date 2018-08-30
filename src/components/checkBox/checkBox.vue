<template>
  <div>
    <div v-if="!isEdit" style="display: flex;">
      <div v-if="boxValue.MultiSelectMode=='false'" v-for="(item,index) in boxValue.listData" style="margin:0px 2px;">
        <!-- <div v-if="item.ItemValue==resultValue">
            <label><input type="checkbox" @change="test" v-model="content.state" v-bind:value="item.ItemValue"/>{{item.ItemName}}</label>
          </div>
          <div v-else>
            <label><input type="checkbox"   v-bind:value="item.ItemValue"/>{{item.ItemName}}</label>
          </div> -->
        <label>
          <input v-if="isSelected[index]" type="checkbox" @change="getSingleSelect(item,index)" checked v-model="isSelected[index]" v-bind:value="item.ItemValue" />
          <input v-if="!isSelected[index]" type="checkbox" @change="getSingleSelect(item,index)" v-model="isSelected[index]" v-bind:value="item.ItemValue" /> <span :style="{fontSize:boxValue.fontSize+'pt'}">{{item.ItemName}}</span>
        </label>
      </div>
      <div v-else>
        <div>
        </div>
        <label>
          <input type="checkbox" @change="getMultSelectValue" checked v-model="multSelctValue" v-bind:value="item.ItemValue" />{{item.ItemName}}
        </label>
      </div>
    </div>
    <div v-else style="display: flex;">
      <div v-for="item in boxValue.listData" style="margin:0px 2px;">
        <label>
          <input type="checkbox" disabled="disabled" v-on:value="item.ItemValue" /><span :style="{fontSize:boxValue.fontSize+'pt'}">{{item.ItemName}}</span></label>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '@/bus.js';
export default {
  data() {
    return {
      resultValue: '',
      isSelected: [],
      defaultSelectValue: '',
      multSelctValue: [],
    }
  },
  methods: {
    //判断是单选还是多选
    isMultiSelect() {

      if (this.boxValue.MultiSelectMode == 'false') {
        this.getItemValue();
      } else {

      }
    },

    getItemValue() {
      let params = [];
      this.isSelected = []
      params.push({
        "patientId": this.config.userInfo.patientId,
        "visitId": this.config.userInfo.visitId,
        "operId": this.config.userInfo.operId,
        "tableName": this.boxValue.SourceTableName,
        "coluName": this.boxValue.SourceFieldName,
      })

      this.api.getFormSqlResult(params)
        .then(res => {
          let field = this.boxValue.SourceTableName + this.boxValue.SourceFieldName
          this.resultValue = res[field];
          if (this.boxValue.MultiSelectMode == 'false') {
            for (var i = 0; i < this.boxValue.listData.length; i++) {
              if (res[field] == "") {
                if (this.boxValue.listData[i].ItemValue == this.boxValue.defaultValue && this.boxValue.defaultValue) {
                  this.isSelected.push(true);
                } else {
                  this.isSelected.push(false);
                }
              } else {
                if (this.boxValue.listData[i].ItemValue == res[field]) {
                  this.isSelected.push(true);
                } else {
                  this.isSelected.push(false);
                }
              }

            }
          } else {
            if (res[field] != 'null' && res[field] != "" &&
              res[field] != null) {
              this.multSelctValue = res[field].split(',');
            }

          }
        })

    },
    //单选的时候
    getSingleSelect(item, index) {
      for (var i = 0; i < this.isSelected.length; i++) {
        if (i == index) {
          if (this.isSelected[i]) {
            this.defaultSelectValue = item.ItemValue;
          } else {
            this.defaultSelectValue = '';
          }
        } else {
          this.$set(this.isSelected, i, false);
        }
      }
      this.$emit('toparentevent', {
        "tableName": this.boxValue.SourceTableName,
        "fieldName": this.boxValue.SourceFieldName,
        "value": this.defaultSelectValue,
      });
    },
    //获取复选值
    getMultSelectValue() {
      this.$emit('toparentevent', {
        "tableName": this.boxValue.SourceTableName,
        "fieldName": this.boxValue.SourceFieldName,
        "value": this.multSelctValue.toString(),
      });
    },
  },
  props: ['boxValue', 'isEdit'],
  computed: {

  },
  components: {

  },
  mounted() {

    this.getItemValue();
  },
  created() {
    Bus.$on('timeSetChange', this.getItemValue)

  },
  beforeDestroy() {
    Bus.$off('timeSetChange', this.getItemValue)

  },
}

</script>
<style type="text/css" scoped>


</style>
