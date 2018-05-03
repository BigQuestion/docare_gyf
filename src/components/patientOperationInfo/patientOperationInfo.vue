<template>
  <div class="dictionaries">
    <div class="window_load">
      <div class="load_top">
        <div>手术信息</div>
        <div @click="aboutNone" class="top_active">X</div>
      </div>
      <div class="designArea">
        <div v-if="item.type == 'div'&&(item.width/2) <= 450" class="item" style="position:absolute;min-height: 3px;min-width:3px;" :class="{choosed:item.chosen}" v-for="item in formItems" :style="{left:('450' - (item.width/2))+'px'}">
          <form-element ref="formElement" :value="item" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="config.userInfo"></form-element>
        </div>
        <div v-if="item.type == 'div'&&(item.width/2) >= 451" class="item" style="position:absolute;min-height: 3px;min-width:3px;left:0;" :class="{choosed:item.chosen}" v-for="item in formItems">
          <form-element ref="formElement" :value="item" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="config.userInfo"></form-element>
        </div>
        <div v-if="item.type !== 'div'" class="item" style="position:absolute;min-height: 3px;min-width:3px;" :class="{choosed:item.chosen}" v-for="item in formItems" :style="{left:item.x+'px',top:item.y+'px'}">
          <form-element ref="formElement" :value="item" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="config.userInfo"></form-element>
        </div>
      </div>
      <div>
        <button @click="saveFunction">保存</button>
        <button @click="turnSetting">配置</button>
      </div>
      <!-- <div style="width: 100%;padding: 20px;">
				<div style="flex-wrap:wrap;display: flex;">
					<div v-for="cl in contentConfig" style="display: flex;margin:10px 0px;">
						<div style="width: 80px;text-align: center;">
							<span>{{cl.infoName}}</span>
						</div>
						<div style="margin-right: 15px;" v-if="cl.isReadOnly">
							<input :style="{width:cl.width+'px'}" readonly="cl.isReadOnly" v-model="info[cl.fieldName]">
						</div>
						<div style="margin-right: 15px;" v-if="!cl.isReadOnly">
							<div style="margin-right: 15px;" v-if="cl.dateTime">
								<input v-model="info[cl.fieldName]" type="date" :style="{width:cl.width+'px'}">
							</div>
							<div v-else>
								<input v-model="info[cl.fieldName]" :style="{width:cl.width+'px'}">
							</div>
						</div>
					</div>
					<div style="display: flex;margin:10px 0px;">
						<div style="width: 80px;text-align: center;">
							<span>手术助手</span>
						</div>
						<div style="margin-right: 15px;">
							<inputDiv :conInfo="info" methodName="medAnaesthesiaDictList" attrName="FIRST_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
						</div>
						<div style="margin-right: 15px;">
							<inputDiv :conInfo="info" methodName="getSupplyNurseList" attrName="SECOND_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
						</div>
						<div style="margin-right: 15px;">
							<inputDiv :conInfo="info" methodName="getSupplyNurseList" attrName="THIRD_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
						</div>
						<div style="margin-right: 15px;">
							<inputDiv :conInfo="info" methodName="getSupplyNurseList" attrName="FOURTH_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
						</div>
					</div>
					<div style="display: flex;margin:10px 0px;">
						<div style="width: 80px;text-align: center;">
							<span>麻醉医师</span>
						</div>
						<div style="margin-right: 15px;">
							<inputDiv :conInfo="info" methodName="getMzkUsers" attrName="ANESTHESIA_DOCTOR_NAME" toAttrName="userName"></inputDiv>
						</div>
						<div style="margin-right: 15px;">
							<inputDiv :conInfo="info" methodName="getMzkUsers" attrName="SECOND_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
						</div>
						<div style="margin-right: 15px;">
							<inputDiv :conInfo="info" methodName="getMzkUsers" attrName="THIRD_ANESTHESIA_DOCTOR_NAME" toAttrName="userName"></inputDiv>
						</div>
					</div>
					<div style="display: flex;margin:10px 0px;">
						<div style="width: 80px;text-align: center;">
							<span>麻醉助手</span>
						</div>
						<div style="margin-right: 15px;">
							<input v-model="info.ANESTHESIA_ASSISTANT_NAME">
						</div>
						<div style="margin-right: 15px;">
							<input v-model="info.SE_ANESTHESIA_ASSISTANT_NAME">
						</div>
					</div>
					<div style="display: flex;margin:10px 0px;">
						<div style="width: 80px;text-align: center;">
							<span>洗手护士</span>
						</div>
						<div style="margin-right: 15px;">
							<input v-model="info.FIRST_OPERATION_NURSE_NAME">
						</div>
						<div style="margin-right: 15px;">
							<input v-model="info.SECOND_OPERATION_NURSE_NAME">
						</div>
					</div>
					<div style="display: flex;margin:10px 0px;">
						<div style="width: 80px;text-align: center;">
							<span>巡回护士</span>
						</div>
						<div style="margin-right: 15px;">
							<input v-model="info.FIRST_SUPPLY_NURSE_NAME">
						</div>
						<div style="margin-right: 15px;">
							<input v-model="info.SECOND_SUPPLY_NURSE_NAME">
						</div>
					</div>

				</div>
			</div> -->
    </div>
  </div>
</template>
<script>
import inputDiv from '@/components/patientOperationInfo/inputDiv.vue';
import formElement from '@/components/formElement/formElement.vue';
export default {
  data() {
    return {
      dataIn: this.parentToChild.dataInParent,
      atherInput: false,
      updateFormsData: [],
      contentConfig: [{
          infoName: "病人ID",
          fieldName: "PATIENT_ID",
          isReadOnly: true,
        },
        {
          infoName: "姓名",
          fieldName: "NAME",
          isReadOnly: true,
        },
        {
          infoName: "性别",
          fieldName: "SEX",
          isReadOnly: true,
        },
        {
          infoName: "出生日期",
          fieldName: "BIRTH_DATE",
          dateTime: true,
        },
        {
          infoName: "所在科室",
          fieldName: "DEPT_NAME",
          width: 300,
        },
        {
          infoName: "床号",
          fieldName: "BED_NO",
          isReadOnly: true,
          width: 50,
        },
        {
          infoName: "血型",
          fieldName: "",
          width: 100,
        },
        {
          infoName: "主要诊断",
          fieldName: "DIAG_BEFORE_OPERATION",
          width: 800,
        },
        {
          infoName: "手术名称",
          fieldName: "OPERATION_NAME",
          width: 800,
        },
        {
          infoName: "病情",
          fieldName: "PATIENT_CONDITION",
          width: 800,
        },
        {
          infoName: "手术时间",
          fieldName: "SCHEDULED_DATE_TIME",
          width: 180,
        },
        {
          infoName: "手术间",
          fieldName: "OPERATING_ROOM_NO",
          width: 60,
          readonly: true,
        },
        {
          infoName: "台次",
          fieldName: "SEQUENCE",
          width: 60,
          readonly: true,
        },
        {
          infoName: "隔离",
          fieldName: "ISOLATION_INDICATOR",
          width: 60,
          readonly: true,
        },
        {
          infoName: "等级",
          fieldName: "OPERATION_SCALE",
          width: 60,
          readonly: true,
        },
        {
          infoName: "麻醉方法",
          fieldName: "ANESTHESIA_METHOD",
          width: 200,
          readonly: true,
        },
        {
          infoName: "切口等级",
          fieldName: "QIEKOU_CLASS",
          width: 100,
          readonly: true,
        },
        {
          infoName: "切口个数",
          fieldName: "QIEKOU_NUMBER",
          width: 100,
        },
        {
          infoName: "急诊折期",
          fieldName: "EMERGENCY_INDICATOR",
          width: 100,
          readonly: true,
        },
        {
          infoName: "手术医师",
          fieldName: "SURGEON_NAME",
          width: 100,
          readonly: true,
        },
      ],
      formItems: [],
      medItem: {},
    }
  },
  methods: {
    test() {
      this.$refs.inputDiv.showView();
    },
    //保存修改数据
    updateMasterInfo() {
      let params = {}

    },
    aboutNone() {
      // console.log(this.dataIn)
      this.parentToChild.dataInParent = !this.dataIn;
      // console.log(this.parentToChild.dataInParent)
      this.dataIn = !this.dataIn;
      // console.log(this.dataIn)
    },
    selectTemp() {
      let arry = []
      let params = {
        formName: '手术信息',
        id: 1
      }
      this.api.selectMedFormTemp(params)
        .then(
          res => {
            this.medItem = res;
            if (res.formContent == "null" || res.formContent == null) {
              return;
            }

            this.formItems = JSON.parse(res.formContent);
            var list = this.formItems;
            for (var i = 0; i < list.length; i++) {
              if (list[i].fieldName) {
                arry.push({
                  "patientId": this.config.userInfo.patientId,
                  "visitId": this.config.userInfo.visitId,
                  "operId": this.config.userInfo.operId,
                  "tableName": list[i].tableName,
                  "coluName": list[i].fieldName,
                })
              }

              this.formItems = JSON.parse(res.formContent);
              var list = this.formItems;
              for (var i = 0; i < list.length; i++) {
                if (list[i].fieldName) {
                  arry.push({
                    "patientId": this.config.userInfo.patientId,
                    "visitId": this.config.userInfo.visitId,
                    "operId": this.config.userInfo.operId,
                    "tableName": list[i].tableName,
                    "coluName": list[i].fieldName,
                    "dictShowFiled": list[i].dictShowFiled, //字典显示字段名称
                    "dictTableName": list[i].dictTableName, //字典表名称
                    "dictField": list[i].dictField, //字典字段名称
                    "dictSelect": list[i].dictSelect,
                  })
                }
              }
              this.api.getFormSqlResult(arry)
                .then(
                  result => {
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].fieldName) {
                        let obj = this.formItems[i];
                        if (list[i].dictShowFiled == 'USER_IDA') {
                          obj.value = result[list[i].dictShowFiled];
                        } else {
                          obj.value = result[list[i].fieldName];
                        }
                        this.$set(this.formItems, i, obj);
                      }
                    }
                  });
            }
          });
    },
    //获取单子修改的数据
    getValue(dataValue) {
      var modifyValue = '';
      if (dataValue.dictShowFiled != '' && dataValue.dictShowFiled != null) {
        modifyValue = dataValue.modifyFiledValue
      } else {
        modifyValue = dataValue.value;
      }
      var tempData = this.updateFormsData;
      if (tempData.length > 0) {
        var count = 0;
        for (var i = 0; i < this.updateFormsData.length; i++) {
          //如果之前传入有相同的表名与字段名则更新值
          if (this.updateFormsData[i].tableName === dataValue.tableName && this.updateFormsData[i].coluName === dataValue.fieldName) {
            this.updateFormsData[i].updateStr = modifyValue;
          } else {
            count++;
          }
        }
        if (count == this.updateFormsData.length) {
          this.updateFormsData.push({
            "tableName": dataValue.tableName,
            "coluName": dataValue.fieldName,
            "updateStr": modifyValue,
            "patientId": this.config.userInfo.patientId,
            "visitId": this.config.userInfo.visitId,
            "operId": this.config.userInfo.operId,
          });
        }
      } else {
        this.updateFormsData.push({
          "tableName": dataValue.tableName,
          "coluName": dataValue.fieldName,
          "updateStr": modifyValue,
          "patientId": this.config.userInfo.patientId,
          "visitId": this.config.userInfo.visitId,
          "operId": this.config.userInfo.operId,
        });
      }
    },
    saveFunction() {
      this.$emit('submitSave', this.updateFormsData);
      this.updateFormsData = []
    },
    turnSetting() {

      this.$emit('turnToSetting', this.medItem);
    }
  },

  computed: {

  },
  components: {
    inputDiv,
    formElement
  },
  props: ['info', 'parentToChild'],
  mounted() {
    this.selectTemp()
  },
}

</script>
<style scoped>
.designArea {
  position: relative;
  height: 680px;
  width: 100%;
  background: white;
  /*border: 1px solid black;*/
  overflow: auto;
  box-sizing: border-box;
}

</style>
