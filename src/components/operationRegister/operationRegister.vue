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
                    <div>
                        <div v-for="item in eventList" style="display:flex;" @click="clickItem(item)">
                            <div v-for="cl in tbconfig" v-if="item.ITEM_CLASS!='1'">
                                <input @change="" type="text" :style="{width:cl.width+'px'}" v-model="item[cl.fieldObj]">
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
                    <div v-for="item in itemNameList">{{item}}</div>
                </div>
                <div v-for="sItem in signdataList">
                    <div style="width: 60px;">
                        {{sItem.time | discount}}
                    </div>
                    <div v-for="secItem in sItem.dataValue">
                        <input type="" name="" :value="secItem" style="width: 60px;">
                    </div>
                </div>
                <div v-for="sItem in signdataList">
                    <div style="width: 60px;">
                        {{sItem.time | discount}}
                    </div>
                    <div v-for="secItem in itemNameList">
                        <input type="text" style="width: 60px;">
                    </div>
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
                    width: 150
                },
                {
                    title: "结束时间",
                    fieldObj: "ENDDATE",
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
                    }
                    this.api.insertMedAnesthesiaEvent(par)
                        .then(res => {
                            this.selectMedAnesthesiaEventList();
                        })
                }
            }
            console.log(addParams)
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
                        this.itemNameList = res;
                        this.getSignTimeData(res.length);
                    })
        },

        getSignTimeData(len) {
            let params = {
                patientId: this.objectItem.patientId,
                operId: this.objectItem.operId,
                visitId: this.objectItem.visitId
            }

            this.api.getSignTimeData(params)
                .then(
                    res => {
                        for (var i = 0; i < res.length; i++) {
                            let item = res[i].dataValue;
                            item = JSON.parse(item);
                            console.log(item);
                            let xL = len - item.length;
                            if (xL > 0) {
                                for (var j = 0; j < xL; j++) {
                                    item.push('');
                                }
                            }
                            res[i].dataValue = item;
                        }
                        this.signdataList = res;
                    })
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
