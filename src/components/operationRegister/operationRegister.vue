<template>
    <div class="dictionaries">
        <div style="background-color: rgb(227, 239, 255);width: 80%;z-index: 11;cursor: auto;position: absolute;top: 5%;height: 90%;left: 10%;border:2px solid rgb(54,157,200);">
            <div class="load_top" style="height: 30px;background-color: rgb(54,157,200);line-height: 30px;">
                <div>术中登记</div>
                <div @click="aboutNone" class="top_active">X</div>
            </div>
            <div style="height: 40px;width: 100%;padding-left: 15px;">
                <span style="font-size: 20px;">麻醉事件</span>
            </div>
            <div style="height: 400px;display:flex;border-bottom:3px solid #7774da;">
                <div style="width:75%;">
                    <div style="overflow-y: auto;height: 300px;width: 100%;border:1px solid #222;background-color:#fff;">
                        <div style="display: flex;">
                            <div style="border:1px solid rgb(177,207,243);" :style="{width:cell.width+'px'}" v-for="cell in tbconfig">
                                {{cell.title}}
                            </div>
                        </div>
                        <div>
                            <div v-for="item in eventList" style="display:flex;" @click="clickItem(item)">
                                <div v-for="cl in tbconfig" v-if="item.ITEM_CLASS!='1'">

                                    <div style="height:25px;" v-if="cl.timeEdit">
                                        <input style="height:25px;" @change="getChangeValue(item)" type="datetime-local" :style="{width:(cl.width-2)+'px'}" v-model="item[cl.fieldObj]">
                                    </div>
                                    <div style="height:25px;" v-else-if="cl.isChixu">
                                        <select style="height:29px;width:42px;" v-model="item[cl.fieldObj]" v-on:change="getChangeValue(item)">
                                            <option v-bind:value="0">
                                                0
                                            </option>
                                            <option v-bind:value="1">
                                                1
                                            </option>
                                        </select>
                                    </div>
                                    <div v-else style="height:25px;">
                                        <input style="height:25px;" @change="getChangeValue(item)" type="text" :style="{width:(cl.width-2)+'px'}" v-model="item[cl.fieldObj]">
                                    </div>

                                </div>
                                <div v-for="cl in tbconfig" v-if="item.ITEM_CLASS=='1'">
                                    <div v-if="cl.timeEdit">
                                        <input @change="getChangeValue(item)" type="datetime-local" :style="{width:(cl.width-2)+'px'}" v-model="item[cl.fieldObj]">
                                    </div>
                                    <div v-else-if="cl.isChixu">
                                        <select disabled="true" v-model="item[cl.fieldObj]" v-on:change="getChangeValue(item)">
                                            <option v-bind:value="0">
                                                0
                                            </option>
                                            <option v-bind:value="1">
                                                1
                                            </option>
                                        </select>
                                    </div>
                                    <div v-else>
                                        <input readonly="readonly" type="text" :style="{width:(cl.width-2)+'px'}" v-model="item[cl.fieldObj]">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="height: 90px;padding-top: 15px;padding-left:15px;display:flex;justify-content: space-between;box-sizing:border-box;">
                        <div>
                            <button @click="saveTempletViewFun">保存模板</button>
                            <button @click="openTempLet">套用模板</button>
                            <span style="padding:20px;">类型筛选</span>
                            <select v-model="filterType" @change="selectTypeFun">
                                <option value="">
                                    全部
                                </option>
                                <option v-for="option in eventTypeList" v-bind:value="option.typeId">
                                    {{ option.typeName }}
                                </option>
                            </select>
                            <div style="color:#4448ff;padding-top:5px;font-sizie:18px;">要删除某时间点，必须要选中行。</div>
                        </div>
                        <div>
                            <button style="margin-right: 20px;width: 80px;" @click='saveBtn'>保存</button>
                            <button style="margin-right: 20px;width: 80px;" @click="deleteMedAnesthesiaEvent">删除</button>
                            <button style="margin-right: 20px;width: 80px;" @click="selectMedAnesthesiaEventList">取消</button>
                        </div>
                    </div>

                </div>
                <div style="width:25%;padding: 0px 5px;">
                    <div style="border:1px solid #3a3a3a;">
                        <div style="height: 180px;flex-wrap:wrap;display: flex;">
                            <button v-for="item in eventTypeList" style="width: 80px;height: 30px;line-height: 30px;text-align: center;margin-right:10px;" @click="medAnesthesiaEventOpenByItemClass(item)">
                                {{item.typeName}}
                            </button>
                        </div>
                        <div style="background-color:#fff;">
                            <div style="display: flex;margin-top: 5px;border:2px solid balck;width: 85%;" v-if="selectTypeTemp.typeId=='2' || selectTypeTemp.typeId=='C'">
                                <div style="width: 70%;border:1px solid black;">
                                    事件名称
                                </div>
                                <div style="width: 30%;border:1px solid black;">
                                    规格
                                </div>
                            </div>
                            <div v-else style="display: flex;margin-top: 5px;border:2px solid balck;width: 85%;">
                                <div style="width: 100%;border:1px solid black;">
                                    事件名称
                                </div>
                            </div>
                            <div style="height: 150px;overflow-y: auto;box-sizing:border-box;" v-if="selectTypeTemp.typeId=='2' || selectTypeTemp.typeId=='C'">
                                <div v-for="item in eventNameList" style="width: 90%;border-bottom: 1px solid black;display: flex" @dblclick="addEvent(item)">
                                    <div style="width: 70%;border:1px solid black;">
                                        {{item.itemName}}
                                    </div>
                                    <div style="width: 30%;border:1px solid black;">
                                        {{item.itemSpec}}
                                    </div>
                                </div>
                            </div>
                            <div v-else style="height: 150px;overflow-y: auto;box-sizing:border-box;">
                                <div v-for="item in eventNameList" style="width: 90%;border-bottom: 1px solid black;display: flex">
                                    <div style="width: 100%;border:1px solid black;" @dblclick="addEvent(item)">
                                        {{item.itemName}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="border: 1px solid #686869;width:100%;height:22px;box-sizing:border-box;">
                        <input style="width:100%;height:100%;border:0;display:block;line-height:20px;outline:none;" v-model="serchZm" placeholder="无字符过滤" @keyup="serchEvent">
                    </div>
                </div>
            </div>
            <div style="height: 40px;padding-left: 15px;">
                <span style="line-height: 40px;">体征数据</span>
            </div>
            <div style="height: 200px;overflow:auto;background-color:#fff;">
                <div style="display: flex;padding-left: 10px;">
                    <div>
                        <div style="width: 100px;">名称</div>
                        <div style="height: 22px;" v-for="item in itemNameList" @click="getDeleteItem(item)">{{item.itemName}}</div>
                    </div>
                    <div v-for="sItem in signdataList" @click="getSignClickData(sItem)">
                        <div style="width: 60px;">
                            {{sItem.time | discount}}
                        </div>
                        <div v-for="(secItem,index) in sItem.dataValue" style="height: 22px;">
                            <input :value="secItem" style="width: 60px;" @change="signChange($event,index,sItem)">
                        </div>
                    </div>

                </div>
            </div>
            <div v-if="signItemView">
                <select v-model="selected" v-on:change="getSeclectItem">
                    <option v-for="option in allSignItems" v-bind:value="option">
                        {{ option.itemName }}
                    </option>
                </select>
            </div>
            <div style="margin-top: 20px;padding-left:15px;">
                <button @click="saveSignChange" style="width: 80px;">保存</button>
                <button style="width: 80px;" @click="deleteMedPatientMonitorData">删除</button>
                <button style="width: 80px;" @click="insertView">插入数据</button>
                <button style="width: 80px;" @click="addSignItem">添加项目</button>
                <button style="width: 80px;" @click="deleteSignItem">删除项目</button>

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
                            <input type="text" v-model="spaceTime">
                            <span>秒</span>
                        </div>
                    </div>
                    <div style="display: flex;" v-for="item in itemNameList">
                        <div style="width: 100px;text-align: center;">{{item.itemName}}</div>
                        <div>
                            <input v-model="item.itemValue" type="" name="" @change="getaddItem(item)">
                            <span>{{item.itemUnit}}</span>
                        </div>
                    </div>
                    <div style="margin-top: 20px;">
                        <button @click="addItem" style="width: 80px;">确定</button>
                        <button @click="insertView" style="width: 80px;">取消</button>
                    </div>
                </div>
            </div>

            <!-- 保存模板输入内容 -->
            <div v-if="saveTempletView" style="width: 500px;min-height: 200px;background-color: white;z-index: 3;position: absolute;top: 20%;left: 20%;border:2px solid rgb(61,164,206);">
                <div style="height: 30px;background-color:rgb(47,150,196);color: white;padding-left: 15px;line-height: 30px;">
                    <span>保存模板</span>
                </div>
                <div style="padding: 15px;display: flex;">
                    <span>麻醉方法:&nbsp;</span>
                    <!-- <input type="" name="" style="width: 200px;"> -->
                    <inputDiv :conInfo="methodObj" methodName="medAnaesthesiaDictList" attrName="anaesthesiaName" toAttrName="anaesthesiaName"></inputDiv>
                </div>
                <div style="padding: 15px;">
                    <span>模板名称:</span>
                    <input v-model="templetName" style="width: 200px;">
                </div>
                <div style="padding-left: 15px;">
                    <input type="checkbox" name="" :checked="checkState">
                    <span>是否私有</span>
                    <button @click="saveTemplet">保存</button>
                    <button @click="cancleSaveTemp">取消</button>
                </div>
            </div>
            <!-- 显示事件模板 -->
            <div style="position: absolute;top: 10%;left: 7%;width: 100%;" v-if="tempLetView.view=='t'">
                <event-templet :tempView="tempLetView" :itemList="eventList"></event-templet>
            </div>
        </div>

    </div>
</template>
<script>
import eventTemplet from '@/components/eventTemplet/eventTemplet.vue';
import inputDiv from '@/components/patientOperationInfo/inputDiv.vue';

export default {
    data() {
        return {
            dataIn: this.parentToChild.dataInParent,
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
                width: 40
            },
            {
                title: "单位",
                fieldObj: "CONCENTRATION_UNIT",
                width: 60
            },
            {
                title: "速度",
                fieldObj: "PERFORM_SPEED",
                width: 50
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
                timeEdit: true,
                width: 180
            },
            {
                title: "",
                fieldObj: "DURATIVE_INDICATOR",
                width: 40,
                isChixu: true,
            },
            {
                title: "结束时间",
                fieldObj: "ENDDATE",
                timeEdit: true,
                width: 180
            }
            ],
            eventList: [],
            eventTempList: [],
            eventTypeList: [],
            eventNameList: [],
            newEvenNameList: [],
            selectedItem: "",
            selectTypeTemp: "",
            itemNameList: [],
            signdataList: [],
            changeEvent: [],
            getClickSignData: "",
            addItemList: [],
            insertStartTime: "",
            insertEndTime: "",
            addView: false,
            updateDataList: [],
            spaceTime: 300,
            updateEvent: "",
            deleteTzItem: "",
            allSignItems: [],
            selected: "",
            signItemView: false,
            serchZm: "",
            filterType: "全部",
            tempLetView: { view: 'f' },
            checkState: true,
            methodObj: {
                anaesthesiaName: ""
            },
            templetName: '',
            saveTempletView: false,

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
                    for (var i = 0; i < res.list.length; i++) {
                        if (res.list[i].START_TIME) {
                            res.list[i].START_TIME = this.changeDateFormat(res.list[i].START_TIME);
                        }

                        if (res.list[i].ENDDATE) {
                            res.list[i].ENDDATE = this.changeDateFormat(res.list[i].ENDDATE);
                        }
                    }
                    this.eventList = res.list;
                    this.eventTempList = res.list;
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
                    this.newEvenNameList = res.list;
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
                START_TIME: this.changeDateFormat(new Date().Format('yyyy-MM-dd hh:mm')),
                ENDDATE: "",
                ITEM_CLASS: item.itemClass,
                ITEM_SPEC: item.itemSpec,
                addFlag: true,
                DURATIVE_INDICATOR: 0,
            };
            this.eventList.push(obj);
        },
        //保存按钮
        saveBtn() {
            if (this.changeEvent.length > 0) {
                this.api.updateMedAnesthesiaEventBatch(this.changeEvent)
                    .then(res => {
                        this.selectMedAnesthesiaEventList();
                    })
            }


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
                        startTime: this.datetimeLocalToDate(list[i].START_TIME),
                        endDate: this.datetimeLocalToDate(list[i].ENDDATE),
                        eventNo: 0,
                        durativeIndicator: 0,
                    })
                    let par = {
                        patientId: list[i].PATIENT_ID,
                        visitId: list[i].VISIT_ID,
                        operId: list[i].OPER_ID,
                        itemClass: list[i].ITEM_CLASS,
                        itemName: list[i].ITEM_NAME,
                        itemSpec: list[i].ITEM_SPEC,
                        dosageUnits: list[i].DOSAGE_UNITS,
                        dosage: list[i].DOSAGE,
                        administrator: list[i].ADMINISTRATOR,
                        startTime: this.datetimeLocalToDate(list[i].START_TIME),
                        endDate: this.datetimeLocalToDate(list[i].ENDDATE),
                        eventNo: 0,
                        durativeIndicator: 0,
                    }
                    this.api.insertMedAnesthesiaEvent(par)
                        .then(res => {
                            this.selectMedAnesthesiaEventList();
                        })
                }
            }
        },

        getSignName() {
            let params = {
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId,
                eventNo: 0,
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
                eventNo: 0
            }
            this.api.getSignTimeData(params)
                .then(
                res => {
                    var sortArray = [];
                    for (var i = 0; i < res.length; i++) {
                        let item = res[i].dataValue;
                        item = eval('(' + item + ')');
                        //item = JSON.parse(item);
                        let xL = len - item.length
                        if (xL > 0) {
                            for (var j = 0; j < xL; j++) {
                                item.push('');
                            }
                        }
                        res[i].dataValue = item;
                    }
                    res.sort(function(a, b) {
                        return Date.parse(a.time) - Date.parse(b.time);//时间正序
                    });
                    for (var i = 0, l = res.length; i < l; i++) {
                        sortArray.push(res[i]);
                    }
                    this.signdataList = sortArray;
                })
        },
        //获取改变的值
        getChangeValue(item) {
            let params = {
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId,
                itemNo: item.ITEM_NO,
                eventNo: item.EVENT_NO,
                itemName: item.ITEM_NAME,
                administrator: item.ADMINISTRATOR,
                concentration: item.CONCENTRATION,
                concentrationUnit: item.CONCENTRATION_UNIT,
                performSpeed: item.PERFORM_SPEED,
                speedUnit: item.SPEED_UNIT,
                dosage: item.DOSAGE,
                dosageUnits: item.DOSAGE_UNITS,
                durativeIndicator: item.DURATIVE_INDICATOR,
                startTime: this.datetimeLocalToDate(item.START_TIME),
                endDate: this.datetimeLocalToDate(item.END_DATE),
            }
            this.changeEvent.push(params);
            this.updateEvent = params;
            // return false;
            // this.api.updateMedAnesthesiaEvent(params)
            // 	.then(res =>{
            // 		 this.selectMedAnesthesiaEventList();
            // 	})

        },
        //获取生命体征选中列
        getSignClickData(item) {
            this.getClickSignData = item;
        },
        //删除生命体征某个时间点
        deleteMedPatientMonitorData() {
            let params = {
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId,
                eventNo: 0,
                timePoint: this.stringToDate(this.getClickSignData.time),
            }

            this.api.deleteMedPatientMonitorData(params)
                .then(res => {
                    this.getSignName();
                })
        },
        insertView() {
            this.addView = !this.addView;
            var lastTime = this.signdataList[this.signdataList.length - 1].time;
            var myDate = new Date();
            var m1 = lastTime.split(" ");
            var m2 = myDate.toLocaleDateString() + " " + m1[1];
            var time = new Date(m2.replace("-", "/"));
            time.setMinutes(time.getMinutes() + 5, time.getSeconds(), 0);
            var time2 = new Date(m2.replace("-", "/"));
            time2.setMinutes(time2.getMinutes() + 10, time2.getSeconds(), 0);
            var nowTime = time.Format("yyyy-MM-dd hh:mm");
            var endTime = time2.Format("yyyy-MM-dd hh:mm");
            this.insertStartTime = this.changeDateFormat(nowTime);
            this.insertEndTime = this.changeDateFormat(endTime);
        },
        //获取插入体征的数据
        getaddItem(item) {
            if (this.insertStartTime && this.insertEndTime) {
                this.addItemList.push({
                    patientId: this.objectItem.patientId,
                    operId: this.objectItem.operId,
                    visitId: this.objectItem.visitId,
                    eventNo: 0,
                    itemName: item.itemCode,
                    itemValue: item.itemValue,
                    timePoint: this.datetimeLocalToDate(this.insertStartTime),
                    recordingDate: new Date(),
                    operator: 'mdsd'
                });
            }
            else {
                alert("输入时间");
            }

        },
        //点击确定插入体征数据
        addItem() {
            //计算开始时间与结束时间差值单位是毫秒
            var k = parseInt(this.datetimeLocalToDate(this.insertEndTime) - this.datetimeLocalToDate(this.insertStartTime));
            //单位是分钟
            var k1 = parseInt(k / 1000 / 60);
            //与定义时间间隔的倍数
            var k2 = parseInt(k1 / (parseInt(this.spaceTime / 60)));
            //四舍五入
            var k3 = parseInt(k2);
            //获取开始时间为js的date格式
            var time1 = this.datetimeLocalToDate(this.insertStartTime);
            //
            var m1 = this.addItemList.length;
            for (var i = 1; i <= k3; i++) {
                var time2 = new Date(time1.getTime() + parseInt(this.spaceTime / 60) * i * 1000 * 60);

                for (var j = 0; j < m1; j++) {
                    this.addItemList.push({
                        patientId: this.objectItem.patientId,
                        operId: this.objectItem.operId,
                        visitId: this.objectItem.visitId,
                        eventNo: 0,
                        itemName: this.addItemList[j].itemName,
                        itemValue: this.addItemList[j].itemValue,
                        timePoint: time2,
                        recordingDate: new Date(),
                        operator: 'mdsd'
                    });
                }

            }
            this.api.insertBatchMedPatientMonitorData(this.addItemList)
                .then(res => {
                    this.addItemList = [];
                    this.addView = !this.addView;
                    this.getSignName();
                })
        },

        //
        signChange(e, index, sItem) {
            this.updateDataList.push({
                itemName: this.itemNameList[index].itemCode,
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId,
                eventNo: 0,
                timePoint: new Date(sItem.time),
                itemValue: e.currentTarget.value,
                operator: "mdsd"

            });

        },
        //保存修改
        saveSignChange() {
            let params = this.updateDataList;
            this.api.updateMedPatientMonitorDatas(params)
                .then(res => {
                    this.getSignName();
                    this.updateDataList = [];
                })
        },

        //添加生命体征项目
        addSignItem() {

            let params = {}
            this.api.selectAllItems(params)
                .then(res => {
                    this.allSignItems = res.list;
                    this.signItemView = !this.signItemView;
                })
        },

        //删除体征项目
        deleteSignItem() {
            debugger
            let params = {
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId,
                eventNo: 0,
                itemName: this.deleteTzItem.itemCode
            }
            this.api.deleteMedPatientMonitorDataCode(params)
                .then(res => {
                    this.deleteTzItem = "";
                    this.getSignName();
                })
        },

        //获取选中删除的体征项目
        getDeleteItem(item) {
            this.deleteTzItem = item;
        },

        //得到添加生命体征项目
        getSeclectItem() {
            this.signItemView = !this.signItemView;
            if (this.selected.itemName) {
                this.itemNameList.push({
                    itemName: this.selected.itemName,
                    itemCode: this.selected.itemCode,
                });
                this.getSignTimeData(this.itemNameList.length);
                this.selected = [];
            }
        },
        test(item) {
            alert(item.DURATIVE_INDICATOR);
        },
        //搜索事件
        serchEvent() {
            var list = this.newEvenNameList;
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].nameJm && list[i].nameJm.indexOf(this.serchZm.toUpperCase()) >= 0) {
                    newList.push(list[i]);
                }
            }
            this.eventNameList = newList;

        },
        //筛选类型
        selectTypeFun() {
            if (this.filterType == "") {
                this.eventList = this.eventTempList;
            }

            if (this.filterType) {
                var list = this.eventTempList;
                var newList = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].ITEM_CLASS == this.filterType) {
                        newList.push(list[i]);
                    }
                }
                this.eventList = newList;
            }
        },
        //套用模板
        openTempLet() {
            this.tempLetView.view = 't';
        },
        //打开保存模板界面
        saveTempletViewFun() {
            this.saveTempletView = true;

        },
        //取消保存模板界面
        cancleSaveTemp() {
            this.saveTempletView = false;
            this.methodObj.anaesthesiaName = '';
            this.templetName = '';
            this.checkState = true;
        },
        //保存模板方法
        saveTemplet() {
            var list = this.eventTempList;
            var createBy = '公用';
            if (this.methodObj.anaesthesiaName == "") {
                alert("请选择方法名称");
                return
            }

            if (this.templetName == "") {
                alert("请输入模板名称");
                return
            }
            if (this.checkState) {
                createBy = this.config.userId;
            }
            let params = []
            for (var i = 0; i < list.length; i++) {
                var obj = {
                    itemNo: list[i].ITEM_NO,
                    createBy: createBy,
                    templetClass: 0,
                    templet: this.templetName,
                    anesthesiaMethod: this.methodObj.anaesthesiaName,
                    itemClass: list[i].ITEM_CLASS,
                    itemName: list[i].ITEM_NAME,
                    itemCode: list[i].ITEM_CODE,
                    itemSpec: list[i].ITEM_SPEC,
                    concentration: list[i].CONCENTRATION,
                    performSpeed: list[i].PERFORM_SPEED,
                    speedUnit: list[i].SPEED_UNIT,
                    dosage: list[i].DOSAGE,
                    dosageUnits: list[i].DOSAGE_UNITS,
                    administrator: list[i].ADMINISTRATOR,
                    durativeIndicator: list[i].DURATIVE_INDICATOR,
                };
                params.push(obj);

            }
            this.api.insertBtchMedAnesthesiaEventTemplet(params)
                .then(res => {
                    this.cancleSaveTemp();
                })
            debugger
        },
        aboutNone() {
            // console.log(this.dataIn)
            this.parentToChild.dataInParent = !this.dataIn;
            // console.log(this.parentToChild.dataInParent)
            this.dataIn = !this.dataIn;
            // console.log(this.dataIn)
        }


    },
    props: ['objectItem', 'parentToChild'],
    computed: {

    },
    components: {
        eventTemplet,
        inputDiv
    },
    mounted() {
        this.selectMedAnesthesiaEventList();
        this.allMedAnesthesiaEventType();
        this.getSignName();

    }
}

</script>
<style scoped>
button {
    width: 80px;
    height: 35px;
    ;
}
</style>
