<template>
	<div style="width:85%;min-height: 700px;background-color: rgb(228, 240, 255);z-index: 3;border:2px solid rgb(68,170,211);position: relative;">
		<div style="height: 30px;padding: 0px 10px;background-color:rgb(68,170,211);color: white;">
			<span>套用模板</span>
		</div>
		<div style="height: 50px;padding-left: 20px;px;border:1px solid rgb(179,207,243);">
			<span style="font-size: 20px;line-height: 50px;">事件模板</span>
		</div>
		<div style="display: flex;height: 500px;background-color: white;">
			<div style="width: 25%;overflow-y: auto;">
				<div style="height: 20px;padding-left: 20px;background-color: rgb(228, 240, 255);">
					<span>模板名称</span>
				</div>
				<div style="padding-left: 25px;">
					<div>
						<span>麻醉事件模板</span>
					</div>
					<ul style="padding-left: 15px;">
						<li>
							<ul>
								<div>
									公用
								</div>
								<ul  style="padding-left: 10px;">
									<li v-for="(item,index) in publicNameList">
										<div style="display: flex;align-items: center;">
											<div @click="getPublicTempletNames(item,index)" style="background-color: grey;color: white;cursor:pointer;height: 12px;line-height: 12px;width: 12px;text-align: center;">
												+
											</div>
											<div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
											<div style="width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
												{{item.anesthesiaMethod}}
											</div>
										</div>
										<ul style="padding-left: 20px;">
											<li v-if="item.tempView" v-for="itemTemp in item.listTempName" @click="getPublicTempletDetail(itemTemp.templet,item.anesthesiaMethod,0)">
											<div style="display: flex;align-items: center;">
												<div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
												<div style="cursor:pointer;width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
													{{itemTemp.templet}}
												</div>
											</div>
											</li>
										</ul>
									</li>
								</ul>
							</ul>
						</li>
						<li>
							<ul>
								<div>私有</div>
								<ul style="padding-left: 10px;">
									<li v-for="(item,index) in privateNameList">
										<div style="display: flex;align-items: center;">
											<div @click="getPrivateTempletNames(item,index)" style="background-color: grey;color: white;cursor:pointer;height: 12px;line-height: 12px;width: 12px;text-align: center;">
														+
											</div>
											<div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
											<div style="width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
												{{item.anesthesiaMethod}}
											</div>
										</div>
										<ul style="padding-left: 20px;">
											<li v-if="item.tempView" v-for="itemTemp in item.listTempName" @click="getPublicTempletDetail(itemTemp.templet,item.anesthesiaMethod,1)">
												<div style="display: flex;align-items: center;">
													<div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
													<div style="cursor:pointer;width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
														{{itemTemp.templet}}
													</div>
												</div>
											</li>
										</ul>
									</li>
								</ul>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div style="width: 75%;overflow-y: auto;">
				<div style="display: flex;margin-left: 10px;">
                    <div :style="{width:cell.width+'px'}" v-for="cell in contentConfig">
                    	{{cell.title}}
                    </div>
                </div>
                <div>
                	<div v-for="item in tempDetailList" style="display: flex;margin-left: 10px;">
                		<div v-for="cell in contentConfig" :style="{width:cell.width+'px'}">
                			{{item[cell.fieldObj]}} 
                		</div>
                	</div>
                </div>
			</div>
		</div>
		<div style="position: absolute;height: 50px;bottom: 0px;padding-left: 20px;">
			<input type="checkbox" name="" :checked="state" @click="getSelectState">
			<span>不套用剂量</span>
			<button @click="closeWin">取消</button>
			<button @click="selectTemplet">套用模板</button>
			<button @click="deleteTemplet">删除模板</button>
		</div>
	</div>
</template>
<script>
	export default{
		data () {
  		return {
  			contentConfig:[
  			{
  				title:'序号',
  				fieldObj:'itemNo',
  				width:'60'
  			},
  			{
  				title:'类型',
  				fieldObj:'itemTypeName',
  				width:'60'
  			},
  			{
  				title:'事件名称',
  				fieldObj:'itemName',
  				width:'200'
  			},
  			{
  				title:'途径',
  				fieldObj:'administrator',
  				width:'90'
  			},
  			{
  				title:'浓度',
  				fieldObj:'concentration',
  				width:'90'
  			},
  			{
  				title:'单位',
  				fieldObj:'concentrationUnit',
  				width:'90'
  			},
  			{
  				title:'速度',
  				fieldObj:'performSpeed',
  				width:'90'
  			},
  			{
  				title:'单位',
  				fieldObj:'speedUnit',
  				width:'90'
  			},
  			{
  				title:'剂量',
  				fieldObj:'dosage',
  				width:'90'
  			},
  			{
  				title:'单位',
  				fieldObj:'dosageUnits',
  				width:'90'
  			}],
  			publicNameList:[],
    		privateNameList:[],
    		publicTempNameList:[],
    		privateTempNameList:[],
    		tempDetailList:[],
    		state:false,

    	}
    	
    },
    methods:{
    	closeWin(){
    		 this.tempView.view = 'f';
    	},
    	//获取所有模板的麻醉方法 
    	getMethodNames(){
         	let params={
         		createBy:'公用'
         	}
         	this.api.getMethodNames(params)
	     		.then(res=>{
        				this.publicNameList = res.list;
        				this.getAllPublicTempName(res.list);
        				})
	     		

	     	let params1={
         		createBy:this.config.userId
         	}
         	this.api.getMethodNames(params1)
	     		.then(res=>{
        				this.privateNameList = res.list;
        				this.getAllPrivateTempName(res.list)
        		})
         },
         //获取模板名称
         getPublicTempletNames(item,index){
         	item.tempView = !item.tempView;
         	this.$set(this.publicNameList,index,item);
         },
         //获取模板名称
         getPrivateTempletNames(item,index){
         	item.tempView = !item.tempView;
         	this.$set(this.privateNameList,index,item);
         },
         //获取公用模板名称
         getAllPublicTempName(listItem){
         	var temp = listItem
         	if(listItem.length>0)
         	{
				for (let i = 0; i < listItem.length; i++) {
					let params={
		         		anesthesiaMethod:listItem[i].anesthesiaMethod,
		         		createBy:'公用'
		         	}
		         	this.api.getTempletNames(params)
		         		.then(res=>{
	        				temp[i].listTempName = res.list;
	        				temp[i].tempView = true;
	        				this.$set(this.publicNameList,i,temp[i]);
	        				})
				}
			}
         },
         //获取私有的模板名称
         getAllPrivateTempName(listItem){
         	var temp = listItem
         	if(listItem.length>0)
         	{
				for (let i = 0; i < listItem.length; i++) {
					let params={
		         		anesthesiaMethod:listItem[i].anesthesiaMethod,
		         		createBy:this.config.userId
		         	}
		         	this.api.getTempletNames(params)
		         		.then(res=>{
	        				temp[i].listTempName = res.list;
	        				temp[i].tempView = true;
	        				this.$set(this.privateNameList,i,temp[i]);
	        				})
				}
			}
         },

         //获取模板的详细内容
         getPublicTempletDetail(tempLetName,methodName,typeItem){
         	let params = {
         		templet:tempLetName,
         		anesthesiaMethod:methodName,
         		createBy:''
         		}
         	//typeItem---0表示公用，1表示私有
         	if(typeItem==0){
         		params.createBy = '公用'
         	}
         	if(typeItem==1){
         		params.createBy = this.config.userId;
         	}
         	this.api.getTempletDetail(params)
         		.then(res=>{
         				this.tempDetailList = res.list;
    				})
         },
         //套用模板
         selectTemplet(){
         	var list = this.tempDetailList;
         	if(this.state){
         		for (var i = 0; i < list.length; i++) {
         		var obj = {
                TYPE_NAME: list[i].itemTypeName,
                PATIENT_ID: 10966589,
                VISIT_ID: 1,
                OPER_ID: 1,
                ITEM_NAME: list[i].itemName,
                ADMINISTRATOR: list[i].administrator,
                CONCENTRATION: list[i].concentration,
                CONCENTRATION_UNIT: list[i].concentrationUnit,
                PERFORM_SPEED: list[i].performSpeed,
                SPEED_UNIT: list[i].speedUnit,
                DOSAGE: "",
                DOSAGE_UNITS: list[i].dosageUnits,
                START_TIME: this.changeDateFormat(new Date().Format('yyyy-MM-dd hh:mm')),
                ENDDATE: "",
                ITEM_CLASS: list[i].itemClass,
                ITEM_SPEC: list[i].itemSpec,
                addFlag: true,
                DURATIVE_INDICATOR:0,
	            };
	            this.itemList.push(obj);
	    		this.tempView.view = 'f';
	         	}
         	}
         	else
         	{
         		for (var i = 0; i < list.length; i++) {
	         		var obj = {
	                TYPE_NAME: list[i].itemTypeName,
	                PATIENT_ID: 10966589,
	                VISIT_ID: 1,
	                OPER_ID: 1,
	                ITEM_NAME: list[i].itemName,
	                ADMINISTRATOR: list[i].administrator,
	                CONCENTRATION: list[i].concentration,
	                CONCENTRATION_UNIT: list[i].concentrationUnit,
	                PERFORM_SPEED: list[i].performSpeed,
	                SPEED_UNIT: list[i].speedUnit,
	                DOSAGE: list[i].dosage,
	                DOSAGE_UNITS: list[i].dosageUnits,
	                START_TIME: this.changeDateFormat(new Date().Format('yyyy-MM-dd hh:mm')),
	                ENDDATE: "",
	                ITEM_CLASS: list[i].itemClass,
	                ITEM_SPEC: list[i].itemSpec,
	                addFlag: true,
	                DURATIVE_INDICATOR:0,
	            };
	            this.itemList.push(obj);
    		      this.tempView.view = 'f';
	         	}
         	}
         	
         },

         //是否套用剂量
         getSelectState(){
         	this.state = !this.state;
         }


    },
    computed:{
         
    },
    props:['tempView','itemList'],
    mounted(){
    	this.getMethodNames();
    	 
    }
	}
</script>
<style scoped></style>