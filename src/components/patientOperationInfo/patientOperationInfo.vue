<template>
	<div style="background-color: white;width: 60%;z-index: 2;position: absolute;top: 10%;height: 80%;left:20%;">
		<div style="height: 30px;background-color: rgb(54,157,200);line-height: 30px;">
			<span style="color: white;font-size: 18px;">手术信息</span>
		</div>
		
		<div style="width: 100%;padding: 20px;">
			<div style="flex-wrap:wrap;display: flex;">
				<div v-for="cl in contentConfig" style="display: flex;margin:10px 0px;">
					<div style="width: 80px;text-align: center;"><span>{{cl.infoName}}</span></div>
					<div style="margin-right: 15px;" v-if="cl.isReadOnly">
						<input :style="{width:cl.width+'px'}" readonly="cl.isReadOnly" v-model="info[cl.fieldName]">
					</div>
					<div style="margin-right: 15px;" v-if="!cl.isReadOnly">
						<div style="margin-right: 15px;" v-if="cl.dateTime" >
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
						<!-- <input  type="" name="" v-model="info.FIRST_ASSISTANT_NAME"> -->
						<inputDiv :conInfo="info" methodName="getSupplyNurseList" attrName="FIRST_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
					</div>
					<div style="margin-right: 15px;">
						<!-- <input v-model="info.SECOND_ASSISTANT_NAME"> -->
						<inputDiv :conInfo="info" methodName="getSupplyNurseList" attrName="SECOND_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
					</div>
					<div style="margin-right: 15px;">
						<!-- <input v-model="info.THIRD_ASSISTANT_NAME"> -->
						<inputDiv :conInfo="info" methodName="getSupplyNurseList" attrName="THIRD_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
					</div>
					<div style="margin-right: 15px;">
						<!-- <input v-model="info.FOURTH_ASSISTANT_NAME"> -->
						<inputDiv :conInfo="info" methodName="getSupplyNurseList" attrName="FOURTH_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
					</div>
				</div>
				<div style="display: flex;margin:10px 0px;">
					<div style="width: 80px;text-align: center;">
						<span>麻醉医师</span>
					</div>
					<div style="margin-right: 15px;">
						<!-- <input v-model="info.ANESTHESIA_DOCTOR_NAME"  @dblclick="test"> -->
						<inputDiv :conInfo="info" methodName="getMzkUsers" attrName="ANESTHESIA_DOCTOR_NAME" toAttrName="userName"></inputDiv>
					</div>
					<div style="margin-right: 15px;">
						<!-- <input v-model="info.SECOND_ASSISTANT_NAME"> -->
						<inputDiv :conInfo="info" methodName="getMzkUsers" attrName="SECOND_ASSISTANT_NAME" toAttrName="userName"></inputDiv>
					</div>
					<div style="margin-right: 15px;">
						<!-- <input v-model="info.THIRD_ANESTHESIA_DOCTOR_NAME"> -->
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
		</div>
		 
	 
	</div>
</template>
<script>
	import inputDiv from '@/components/patientOperationInfo/inputDiv.vue';
	export default{
		data () {
  		return {
  			contentConfig:[{
	  				infoName:"病人ID",
	  				fieldName:"PATIENT_ID",
	  				isReadOnly:true,
  				},
  				{
	  				infoName:"姓名",
	  				fieldName:"NAME",
	  				isReadOnly:true,
  				},
  				{
	  				infoName:"性别",
	  				fieldName:"SEX",
	  				isReadOnly:true,
  				},
  				{
	  				infoName:"出生日期",
	  				fieldName:"BIRTH_DATE",
	  				dateTime:true,
  				},
  				{
	  				infoName:"所在科室",
	  				fieldName:"DEPT_NAME",
	  				width:300,
  				},
  				{
	  				infoName:"床号",
	  				fieldName:"BED_NO",
	  				isReadOnly:true,
	  				width:50,
  				},
  				{
	  				infoName:"血型",
	  				fieldName:"",
	  				width:100,
  				},
  				{
	  				infoName:"主要诊断",
	  				fieldName:"DIAG_BEFORE_OPERATION",
	  				width:800,
  				},
  				{
	  				infoName:"手术名称",
	  				fieldName:"OPERATION_NAME",
	  				width:800,
  				},
  				{
	  				infoName:"病情",
	  				fieldName:"PATIENT_CONDITION",
	  				width:800,
  				},
  				{
	  				infoName:"手术时间",
	  				fieldName:"SCHEDULED_DATE_TIME",
	  				width:180,
  				},
  				{
	  				infoName:"手术间",
	  				fieldName:"OPERATING_ROOM_NO",
	  				width:60,
	  				readonly:true,
  				},
  				{
	  				infoName:"台次",
	  				fieldName:"SEQUENCE",
	  				width:60,
	  				readonly:true,
  				},
  				{
	  				infoName:"隔离",
	  				fieldName:"ISOLATION_INDICATOR",
	  				width:60,
	  				readonly:true,
  				},
  				{
	  				infoName:"等级",
	  				fieldName:"OPERATION_SCALE",
	  				width:60,
	  				readonly:true,
  				},
  				{
	  				infoName:"麻醉方法",
	  				fieldName:"ANESTHESIA_METHOD",
	  				width:200,
	  				readonly:true,
  				},
  				{
	  				infoName:"切口等级",
	  				fieldName:"QIEKOU_CLASS",
	  				width:100,
	  				readonly:true,
  				},
  				{
	  				infoName:"切口个数",
	  				fieldName:"QIEKOU_NUMBER",
	  				width:100,
  				},
  				{
	  				infoName:"急诊折期",
	  				fieldName:"EMERGENCY_INDICATOR",
	  				width:100,
	  				readonly:true,
  				},
  				{
	  				infoName:"手术医师",
	  				fieldName:"SURGEON_NAME",
	  				width:100,
	  				readonly:true,
  				},
  			],
    	}
    },
    methods:{
        test(){
        	this.$refs.inputDiv.showView();
        },
    },
    
    computed:{
        
    },
    components: {
        inputDiv
    },
    props: ['info'],
    mounted(){
    },
	}
</script>
<style scoped></style>