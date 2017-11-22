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
								<ul v-if="publicNameView" style="padding-left: 10px;">
									<li v-for="item in publicNameList">
									<div style="display: flex;align-items: center;">
										<div @click="getPublicTempletNames(item)" style="background-color: grey;color: white;height: 12px;line-height: 12px;width: 12px;text-align: center;">
											+
										</div>
										<div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
										<div style="width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
											{{item.anesthesiaMethod}}
										</div>
									</div>
									<ul v-if="publicTempNameView" style="padding-left: 10px;">
										<li v-for="item in publicTempNameList">
										<div style="display: flex;align-items: center;">
											<div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
											<div style="width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
												{{item.templet}}
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
								<ul v-if="publicNameView" style="padding-left: 10px;">
									<li v-for="item in privateNameList">
									<div style="display: flex;align-items: center;">
										<div @click="getTempletNames" style="background-color: grey;color: white;height: 12px;line-height: 12px;width: 12px;text-align: center;">
											+
										</div>
										<div style="height: 12px;line-height: 12px;width: 12px;text-align: center;">...</div>
										<div style="width: 100%;border-left:1px solid rgb(228, 240, 255);border-bottom:1px solid rgb(228, 240, 255)">
											{{item.anesthesiaMethod}}
										</div>
									</div>
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
			</div>
		</div>
		<div style="position: absolute;height: 50px;bottom: 0px;">
			<button>取消</button>
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
  				fieldObj:'itemClassName',
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
    		publicNameView:false,
    		privateNameView:false,
    		privateTempNameView:false,
    		publicTempNameView:false,
    	}
    	
    },
    methods:{
    	//获取所有模板的麻醉方法
    	getMethodNames(){
         	let params={
         		createBy:'公用'
         	}
         	this.api.getMethodNames(params)
	     		.then(res=>{
        				this.publicNameList = res.list;
        				if(res.list.length>0){
        					this.publicNameView = true;
        				}
        				})
	     	let params1={
         		createBy:'MDSD'
         	}
         	this.api.getMethodNames(params1)
	     		.then(res=>{
        				this.privateNameList = res.list;
        				if(res.list.length>0){
        					this.privateNameView = true;
        				}
        				})
         },
         //获取模板名称
         getPublicTempletNames(item){
         	let params={
         		anesthesiaMethod:item.anesthesiaMethod,
         		createBy:'公用'
         	}
         	this.api.getTempletNames(params)
         		.then(res=>{
        				 this.publicTempNameList = res.list;
        				if(res.list.length>0){
        					this.publicTempNameView = true;
        				}
        				})
         },
    },
    computed:{
         
    },
    props:[],
    mounted(){
    	this.getMethodNames();
    }
	}
</script>
<style scoped></style>