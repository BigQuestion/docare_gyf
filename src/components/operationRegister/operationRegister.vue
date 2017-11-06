<template>
	
	<div style="background-color: white;width: 80%;z-index: 2;position: absolute;top: 5%;height: 90%;left: 10%;"> 
		<div style="height: 30px;background-color: rgb(54,157,200);line-height: 30px;">
			<span style="color: white;font-size: 18px;">术中登记</span>
		</div>
		<div style="height: 40px;width: 100%;padding-left: 15px;">
			<span style="font-size: 20px;">麻醉事件</span>
		</div>
		<div style="height: 400px;display:flex;border:2px solid black;">
			<div style="width:75%;">
				<div style="overflow-y: auto;height: 300px;width: 100%;">
					<div style="display: flex;">
	                    <div style="border:1px solid rgb(177,207,243);" :style="{width:cell.width+'px'}" v-for="cell in tbconfig">
	                    	{{cell.title}}
	                    </div>
	                </div>
	                <div >
	                	<div v-for="item in eventList" style="display:flex;" @click="clickItem(item)">
							<div v-for="cl in tbconfig" v-if="item.ITEM_CLASS!='1'">
		                       <input @change="getChangeValue(item)"  type="text" :style="{width:cl.width+'px'}" v-model="item[cl.fieldObj]">
		                    </div>
		                    <div v-for="cl in tbconfig" v-if="item.ITEM_CLASS=='1'">
		                    	<input readonly="readonly" type="text" :style="{width:cl.width+'px'}" v-model="item[cl.fieldObj]">
		                    </div>
						</div>
	                </div>
				</div>
                <div style="height: 90px;text-align: right;padding-top: 15px;">
                    <button style="margin-right: 20px;width: 80px;" @click='saveBtn'>保存</button>
                    <button style="margin-right: 20px;width: 80px;" @click="deleteMedAnesthesiaEvent">删除</button>
                    <button style="margin-right: 20px;width: 80px;" @click="selectMedAnesthesiaEventList">取消</button>
                </div>
            </div>
            <div style="width:25%;padding: 0px 5px;">
                <div style="height: 180px;flex-wrap:wrap;display: flex;">
                    <div v-for="item in eventTypeList" style="width: 80px;height: 30px;line-height: 30px;border:1px solid blue;text-align: center;" @click="medAnesthesiaEventOpenByItemClass(item)">
                        {{item.typeName}}
                    </div>
                </div>
                <div style="display: flex;margin-top: 5px;border:2px solid balck;width: 90%;" v-if="selectTypeTemp.typeId=='2' || selectTypeTemp.typeId=='C'">
                    <div style="width: 70%;border:1px solid black;">
                        事件名称
                    </div>
                    <div style="width: 30%;border:1px solid black;">
                        规格
                    </div>
                </div>
                <div v-else style="display: flex;margin-top: 5px;border:2px solid balck;width: 90%;">
                    <div style="width: 100%;border:1px solid black;">
                        事件名称
                    </div>
                </div>
                <div style="height: 150px;overflow-y: auto;" v-if="selectTypeTemp.typeId=='2' || selectTypeTemp.typeId=='C'">
                    <div v-for="item in eventNameList" style="width: 90%;border-bottom: 1px solid black;display: flex" @dblclick="addEvent(item)">
                        <div style="width: 70%;border:1px solid black;">
                            {{item.itemName}}
                        </div>
                        <div style="width: 30%;border:1px solid black;">
                            {{item.itemSpec}}
                        </div>
                    </div>
                </div>
                <div v-else style="height: 150px;overflow-y: auto;">
                    <div v-for="item in eventNameList" style="width: 90%;border-bottom: 1px solid black;display: flex">
                        <div style="width: 100%;border:1px solid black;" @dblclick="addEvent(item)">
                            {{item.itemName}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div style="height: 40px;padding-left: 15px;">
			<span style="line-height: 40px;">体征数据</span>
		</div>
		<div style="height: 200px;overflow:auto;">
			<div style="display: flex;padding-left: 10px;">
				<div>
					<div style="width: 100px;">名称</div>
					<div v-for="item in itemNameList">{{item.itemName}}</div>
				</div>
				<div v-for="sItem in signdataList" @click="getSignClickData(sItem)">
					 <div style="width: 60px;">
					 	{{sItem.time | discount}}
					 </div>
					 <div v-for="(secItem,index) in sItem.dataValue">
						<input :value="secItem"  style="width: 60px;" @change="signChange($event,index,sItem)">
					</div>
				</div>
			</div>
		</div>
		<div>
			<button @click="saveSignChange" style="width: 80px;">保存</button>
			<button style="width: 80px;" @click="deleteMedPatientMonitorData">删除</button>
			<button style="width: 80px;" @click="insertView">插入数据</button>
			<button style="width: 80px;" @click="addSignItem">添加项目</button>

		</div>
		<!-- 插入数据位置 -->
		<div v-if="addView" style="width: 700px;min-height: 400px;background-color: white;z-index: 3;position: absolute;top: 20%;left: 30%;border:2px solid rgb(61,164,206);">
			<div style="height: 40px;background-color: rgb(61,164,206);">
				<span style="line-height: 40px;font-size: 20px;color:white;">插入体征数据</span>
			</div>
			<div style="padding: 15px;">
				<div style="display: flex;">
					<div style="width: 100px;text-align: center;">开始时间</div>
					<div>
						<input type="datetime-local" v-model="insertStartTime">
					</div>
					<div style="width: 100px;text-align: center;">结束时间</div>
					<div>
						<input type="datetime-local" v-model="insertEndTime">
					</div>
				</div>
				<div style="display: flex;">
					<div style="width: 100px;text-align: center;">时间间隔</div>
					<div>
						<input type="text" v-model="spaceTime"> <span>秒</span>
					</div>
				</div>
				<div style="display: flex;" v-for="item in itemNameList">
					<div style="width: 100px;text-align: center;">{{item.itemName}}</div>
					<div>
						<input v-model="item.itemValue" type="" name="" @change="getaddItem(item)"> <span>{{item.itemUnit}}</span>
					</div>
				</div>
				<div style="margin-top: 20px;">
					<button @click="addItem" style="width: 80px;">确定</button>
					<button @click="insertView" style="width: 80px;">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            tbconfig: [{
                    title: "",
                    fieldObj: "",
                    width: 10
                },
                {
                    title: "类型",
                    fieldObj: "TYPE_NAME",
                    width: 80
                },
                {
                    title: "事件名称",
                    fieldObj: "ITEM_NAME",
                    width: 180
                },
                {
                    title: "途径",
                    fieldObj: "ADMINISTRATOR",
                    width: 80
                },
                {
                    title: "浓度",
                    fieldObj: "CONCENTRATION",
                    width: 60
                },
                {
                    title: "单位",
                    fieldObj: "CONCENTRATION_UNIT",
                    width: 60
                },
                {
                    title: "速度",
                    fieldObj: "PERFORM_SPEED",
                    width: 60
                },
                {
                    title: "单位",
                    fieldObj: "SPEED_UNIT",
                    width: 60
                },
                {
                    title: "剂量",
                    fieldObj: "DOSAGE",
                    width: 60
                },
                {
                    title: "单位",
                    fieldObj: "DOSAGE_UNITS",
                    width: 60
                },
                {
                    title: "发生时间",
                    fieldObj: "START_TIME",
                    timeEdit:true,
                    width: 150
                },
                {
                    title: "结束时间",
                    fieldObj: "ENDDATE",
                    timeEdit:true,
                    width: 150
                }
            ],
            eventList: [],
            eventTypeList: [],
            eventNameList: [],
            selectedItem: "",
            selectTypeTemp: "",
            itemNameList: [],
            signdataList: [],
            changeEvent:[],
            getClickSignData:"",
            addItemList:[],
            insertStartTime:"",
            insertEndTime:"",
            addView:false,
            updateDataList:[],
            spaceTime:300,

        }
    },
    methods: {
        selectMedAnesthesiaEventList() {
            let params = {
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId
            }
            this.api.selectMedAnesthesiaEventList(params)
                .then(
                    res => {
                        this.eventList = res.list;
                    });
        },
        allMedAnesthesiaEventType() {
            let params = {

            }
            this.api.allMedAnesthesiaEventType(params)
                .then(
                    res => {
                        this.eventTypeList = res.list;
                    });
        },
        //根据类别获取麻醉事件定义
        medAnesthesiaEventOpenByItemClass(item) {
            this.selectTypeTemp = item;
            let params = {
                itemClass: item.typeId
            }
            this.api.medAnesthesiaEventOpenByItemClass(params)
                .then(
                    res => {
                        this.eventNameList = res.list;
                    });
        },

        //得到选中的并集麻醉事件记录
        clickItem(item) {
            this.selectedItem = item;
        },

        //删除病人麻醉事件记录
        deleteMedAnesthesiaEvent() {
            let params = {
                patientId: this.selectedItem.PATIENT_ID,
                visitId: this.selectedItem.VISIT_ID,
                operId: this.selectedItem.OPER_ID,
                itemNo: this.selectedItem.ITEM_NO,
                eventNo: this.selectedItem.EVENT_NO

            }

            this.api.deleteMedAnesthesiaEvent(params)
                .then(
                    res => {
                        this.selectMedAnesthesiaEventList();
                    })
        },

        //双击添加麻醉事件记录
        addEvent(item) {
            var obj = {
                TYPE_NAME: item.typeName,
                PATIENT_ID: this.objectItem.patientId,
                VISIT_ID: this.objectItem.visitId,
                OPER_ID: this.objectItem.operId,
                ITEM_NAME: item.itemName,
                ADMINISTRATOR: item.administrator,
                CONCENTRATION: item.concentration,
                CONCENTRATION_UNIT: item.concentrationUnit,
                PERFORM_SPEED: item.performSpeed,
                SPEED_UNIT: item.speedUnit,
                DOSAGE: item.dosage,
                DOSAGE_UNITS: item.dosageUnits,
                START_TIME: "",
                ENDDATE: "",
                ITEM_CLASS: item.itemClass,
                ITEM_SPEC: item.itemSpec,
                addFlag: true
            };
            this.eventList.push(obj);
        },
        //保存按钮
        saveBtn() {
            var list = this.eventList;
            let addParams = [];
            let updateParams = [];
            var arry1 = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].addFlag) {
                    addParams.push({
                        patientId: list[i].PATIENT_ID,
                        visitId: list[i].VISIT_ID,
                        operId: list[i].OPER_ID,
                        itemClass: list[i].ITEM_CLASS,
                        itemName: list[i].ITEM_NAME,
                        itemSpec: list[i].ITEM_SPEC,
                        dosageUnits: list[i].DOSAGE_UNITS,
                        dosage: list[i].DOSAGE,
                        administrator: list[i].ADMINISTRATOR,
                        startTime: list[i].START_TIME,
                        endDate: list[i].ENDDATE,
                        eventNo: 0,
        			})
        			let par = {
        				patientId:list[i].PATIENT_ID,
        				visitId:list[i].VISIT_ID,
        				operId:list[i].OPER_ID,
        				itemClass:list[i].ITEM_CLASS,
        				itemName:list[i].ITEM_NAME,
        				itemSpec:list[i].ITEM_SPEC,
        				dosageUnits:list[i].DOSAGE_UNITS,
        				dosage:list[i].DOSAGE,
        				administrator:list[i].ADMINISTRATOR,
        				startTime:list[i].START_TIME,
        				endDate:list[i].ENDDATE,
        				eventNo:0,
        			}
        			this.api.insertMedAnesthesiaEvent(par)
        				.then(res=>{
	        				 this.selectMedAnesthesiaEventList();
	        				})
        		}
        	}
        },

        getSignName() {
            let params = {
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId
            }

            this.api.getSignName(params)
                .then(
                    res => {
                        for (var i = 0; i < res.length; i++) {
                        	res[i].itemValue = "";
                        }
                        this.itemNameList = res;
                        this.getSignTimeData(res.length);
                    })
        },

        getSignTimeData(len) {
            let params = {
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId,
                eventNo:0
            }
            this.api.getSignTimeData(params)
                .then(
                    res => {
                    	var sortArray = [];
                        for (var i = 0; i < res.length; i++) {
                            let item = res[i].dataValue;
                            item = eval('('+item+')');
                            //item = JSON.parse(item);
                            let xL = len - item.length
                            if (xL > 0) {
                                for (var j = 0; j < xL; j++) {
                                    item.push('');
                                }
                            }
                            res[i].dataValue = item;
                        }
                        res.sort(function(a,b){
						    return Date.parse(a.time) - Date.parse(b.time);//时间正序
						});
						for(var i =0,l=res.length;i<l;i++){
							sortArray.push(res[i]);
						}
                        this.signdataList = sortArray;
                    })
        },
        //获取改变的值
        getChangeValue(item){
        	let params = {
        		patientId:this.objectItem.patientId,
        		operId:this.objectItem.operId,
        		visitId:this.objectItem.visitId,
        		itemNo:item.ITEM_NO,
        		eventNo:item.EVENT_NO,
        		itemName:item.ITEM_NAME,
        		administrator:item.ADMINISTRATOR,
        		concentration:item.CONCENTRATION,
        		concentrationUnit:item.CONCENTRATION_UNIT,
        		performSpeed:item.PERFORM_SPEED,
        		speedUnit:item.SPEED_UNIT,
        		dosage:item.DOSAGE,
        		dosageUnits:item.DOSAGE_UNITS,
        		startTime:this.stringToDate(item.START_TIME),
        		endDate:this.stringToDate(item.END_DATE),
        	}
        	this.changeEvent.push(params);
        	this.api.updateMedAnesthesiaEvent(params)
        		.then(res =>{
        			 this.selectMedAnesthesiaEventList();
        		})

        },
        //获取生命体征选中列
        getSignClickData(item){
        	this.getClickSignData = item;
        },
        //删除生命体征某个时间点
        deleteMedPatientMonitorData(){
        	let params = {
        		patientId:this.objectItem.patientId,
        		operId:this.objectItem.operId,
        		visitId:this.objectItem.visitId,
        		eventNo:0,
        		timePoint:this.stringToDate(this.getClickSignData.time),
        	}

        	this.api.deleteMedPatientMonitorData(params)
        		.then(res =>{
        			 this.getSignName();
        		})
        },
        insertView(){
        	this.addView = !this.addView;
        	var lastTime = this.signdataList[this.signdataList.length-1].time;
        	var myDate = new Date();
        	var m1 = lastTime.split(" ");
        	var m2 = myDate.toLocaleDateString()+" "+m1[1];
        	var time = new Date(m2.replace("-","/"));
           	time.setMinutes(time.getMinutes() + 5, time.getSeconds(), 0);
        	var time2 = new Date(m2.replace("-","/"));
        	time2.setMinutes(time2.getMinutes() + 10, time2.getSeconds(), 0);
        	var nowTime = time.Format("yyyy-MM-dd hh:mm");
        	var endTime = time2.Format("yyyy-MM-dd hh:mm");
        	this.insertStartTime = this.changeDateFormat(nowTime);
        	this.insertEndTime = this.changeDateFormat(endTime);
        },
        //获取插入体征的数据
        getaddItem(item){
        	if(this.insertStartTime&&this.insertEndTime){
        		this.addItemList.push({
	        		patientId:this.objectItem.patientId,
	        		operId:this.objectItem.operId,
	        		visitId:this.objectItem.visitId,
	        		eventNo:0,
	        		itemName:item.itemCode,
	        		itemValue:item.itemValue,
	        		timePoint:this.datetimeLocalToDate(this.insertStartTime),
	        		recordingDate:new Date(),
	        		operator:'mdsd'
        		});
        	}
        	else
        	{
        		alert("输入时间");
        	}
        	
        },
        //点击确定插入体征数据
        addItem(){
        	debugger
        		//计算开始时间与结束时间差值单位是毫秒
        		var k =parseInt(this.datetimeLocalToDate(this.insertEndTime)-this.datetimeLocalToDate(this.insertStartTime));
        		//单位是分钟
        		var k1 = parseInt(k/1000/60);
        		//与定义时间间隔的倍数
        		var k2 = parseInt(k1/(parseInt(this.spaceTime/60)));
        		//四舍五入
        		var k3 = parseInt(k2);
        		//获取开始时间为js的date格式
        		var time1 = this.datetimeLocalToDate(this.insertStartTime);
        		//
        		var m1 = this.addItemList.length;
        		for (var i = 1; i <= k3; i++) {
        			var time2 = new Date(time1.getTime() + parseInt(this.spaceTime/60) * i*1000*60);
        			console.log(time2);
        				for (var j = 0; j < m1; j++) {
        					this.addItemList.push({
				        		patientId:this.objectItem.patientId,
				        		operId:this.objectItem.operId,
				        		visitId:this.objectItem.visitId,
				        		eventNo:0,
				        		itemName:this.addItemList[j].itemName,
				        		itemValue:this.addItemList[j].itemValue,
				        		timePoint:time2,
				        		recordingDate:new Date(),
				        		operator:'mdsd'
			        		});
        				}
        			
        		}
        	this.api.insertBatchMedPatientMonitorData(this.addItemList)
        		.then(res =>{
        			 this.addItemList = [];
        			 this.addView = !this.addView;
        			 this.getSignName();
        		})
        },

        //
        signChange(e,index,sItem){
        	this.updateDataList.push({
        		itemName:this.itemNameList[index].itemCode,
        		patientId:this.objectItem.patientId,
        		operId:this.objectItem.operId,
        		visitId:this.objectItem.visitId,
        		eventNo:0,
        		timePoint:new Date(sItem.time),
        		itemValue:e.currentTarget.value,
        		operator:"mdsd"

        	});
        	
        },
        //保存修改
        saveSignChange(){
        	let params = this.updateDataList;
        	this.api.updateMedPatientMonitorDatas(params)
        		.then(res =>{
        			 this.getSignName();
        			 this.updateDataList = [];
        		})
        },

        //添加生命体征项目
        addSignItem(){
        	// this.itemNameList.push({
        	// 	itemName:"数据"
        	// });
        	// this.getSignTimeData(this.itemNameList.length);
        },


    },
    props: ['objectItem'],
    computed: {

    },
    mounted() {
        this.selectMedAnesthesiaEventList();
        this.allMedAnesthesiaEventType();
        this.getSignName();

    }
}

</script>
<style scoped>


</style>
