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
				<label><input type="checkbox" @change="getSingleSelect(item,index)" v-model="isSelected[index]" v-bind:value="item.ItemValue" />{{item.ItemName}}</label>
			</div>
			<div v-else>
				<label><input type="checkbox" @change="getMultSelectValue" v-model="multSelctValue" v-bind:value="item.ItemValue" />{{item.ItemName}}</label>
			</div>
		</div>
		<div v-else style="display: flex;">
			<div v-for="item in boxValue.listData" style="margin:0px 2px;">
				<label><input type="checkbox" disabled="disabled" v-on:value="item.ItemValue" />{{item.ItemName}}</label>
			</div>
		</div>

	</div>
</template>
<script> 
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
			}
			else {

			}
		},

		getItemValue() {
			let params = [];
			params.push({
				"patientId": this.config.userInfo.patientId,
				"visitId": this.config.userInfo.visitId,
				"operId": this.config.userInfo.operId,
				"tableName": this.boxValue.SourceTableName,
				"coluName": this.boxValue.SourceFieldName,
			})

			this.api.getFormSqlResult(params)
				.then(res => {
					this.resultValue = res[this.boxValue.SourceFieldName];
					if (this.boxValue.MultiSelectMode == 'false') {
						for (var i = 0; i < this.boxValue.listData.length; i++) {
							if (this.boxValue.listData[i].ItemValue == res[this.boxValue.SourceFieldName]) {
								this.isSelected.push(true);
							}
							else {
								this.isSelected.push(false);
							}
						}
					}
					else {
						if (res[this.boxValue.SourceFieldName] != 'null' && res[this.boxValue.SourceFieldName] != ""
							&& res[this.boxValue.SourceFieldName] != null) {
							this.multSelctValue = res[this.boxValue.SourceFieldName].split(',');
						}

					}
				})

		},
		//单选的时候
		getSingleSelect(item, index) {
			console.log(this.isSelected)
			console.log(item)
			console.log(this.defaultSelectValue)
			console.log(this.boxValue)
			for (var i = 0; i < this.isSelected.length; i++) {
				if (i == index) {
					if (this.isSelected[i]) {
						this.defaultSelectValue = item.ItemValue;
					}
					else {
						this.defaultSelectValue = '';
					}
				}
				else {
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
	}
}
</script>
<style type="text/css" scoped>

</style>