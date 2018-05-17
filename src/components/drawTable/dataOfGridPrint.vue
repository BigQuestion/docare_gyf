<template>
    <div style="width:100%;height:100%;display:flex;flex-direction:row;">
        <div v-if="page == false" v-for="(cell,index) in forALL">
            <div :title="item.titleWord" v-for="item in cell" style="width:auto;max-width:300px;min-width:220px;font-size:14px;padding:0 20px 2px 0;display:flex;cursor:default;">
                <span style="padding-right:5px;width:26px;display:block;">{{item.number}}</span>
                <span style="padding-right:5px;">{{item.ITEM_NAME}}</span>
                <span style="padding-right:">{{item.DOSAGE}}</span>
                <span>{{item.DOSAGE_UNITS}}</span>
            </div>
        </div>

        <div v-else>
        </div>
    </div>
    </div>
</template>
<script>
import Bus from '@/bus.js';
export default {

    data() {
        return {
            dataBody: [],
            tipTop: '',
            tipLeft: '',
            tipView: false,
            title: '',
            // showDataMore:'',
            maxTimeInPage: '',
            startTimeInPage: '',
            lengthType: '',
            outBoxLength: '',
            forBoxBody: [],
            forALL: [],
        }
    },
    methods: {
        selectMedAnesthesiaEventList() {
            this.forBoxBody = [],
                this.forALL = [], console.log('fff')

            var nber = 1;
            this.dataBody = [];
            this.maxTimeInPage = this.config.maxTime.getTime()
            this.startTimeInPage = this.config.initTime.getTime()
            let params = {
                patientId: this.dataOfPeo.patientId,
                operId: this.dataOfPeo.operId,
                visitId: this.dataOfPeo.visitId
            }
            this.api.selectMedAnesthesiaEventList(params)
                .then(
                // display:flex;flex-direction:column;flex-wrap:wrap;
                res => {
                    console.log(res)
                    for (var i = 0; i < res.list.length; i++) {
                        var time = new Date(res.list[i].START_TIME).getTime();
                        if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
                            this.dataBody.push(res.list[i]);
                            this.$set(res.list[i], 'number', nber++);
                            if (res.list[i].DOSAGE !== null) {
                                if (res.list[i].ENDDATE !== null) {
                                    if (res.list[i].ADMINISTRATOR !== null) {
                                        var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '结束时间：' + res.list[i].ENDDATE, '途径：' + res.list[i].ADMINISTRATOR, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                                    } else {
                                        var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '结束时间：' + res.list[i].ENDDATE, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                                    }
                                } else {
                                    if (res.list[i].ADMINISTRATOR !== null) {
                                        var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '途径：' + res.list[i].ADMINISTRATOR, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                                    } else {
                                        var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                                    }
                                }
                                this.title = titleData.join('\n');
                                this.$set(res.list[i], 'titleWord', this.title);
                            } else {
                                var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME];
                                this.title = titleData.join('\n');
                                this.$set(res.list[i], 'titleWord', this.title);
                            }
                        }
                    }
                    this.addFun();
                });
        },
        addFun() {
            this.lengthType = this.dataBody.length;
            console.log(this.lengthType / 7)

            if (this.lengthType / 7 > 1) {
                console.log(this.lengthType)
                this.outBoxLength = Math.round(this.lengthType / 7);
                console.log(this.outBoxLength)
                for (var a = 0; a < this.outBoxLength; a++) {
                    this.forALL.push([])
                    if (a === 0) {
                        this.forBoxBody = [];
                        for (var j = 0; j < 7; j++) {
                            this.forBoxBody.push({
                                ADMINISTRATOR: this.dataBody[j].ADMINISTRATOR,
                                BILL_ATTR: this.dataBody[j].BILL_ATTR,
                                BILL_INDICATOR: this.dataBody[j].BILL_INDICATOR,
                                CONCENTRATION: this.dataBody[j].CONCENTRATION,
                                CONCENTRATION_UNIT: this.dataBody[j].CONCENTRATION_UNIT,
                                DOSAGE: this.dataBody[j].DOSAGE,
                                DOSAGE_UNITS: this.dataBody[j].DOSAGE_UNITS,
                                DURATIVE_INDICATOR: this.dataBody[j].DURATIVE_INDICATOR,
                                ENDDATE: this.dataBody[j].ENDDATE,
                                EVENT_ATTR: this.dataBody[j].EVENT_ATTR,
                                EVENT_NO: this.dataBody[j].EVENT_NO,
                                ITEM_CLASS: this.dataBody[j].ITEM_CLASS,
                                ITEM_CODE: this.dataBody[j].ITEM_CODE,
                                ITEM_NAME: this.dataBody[j].ITEM_NAME,
                                ITEM_NO: this.dataBody[j].ITEM_NO,
                                ITEM_SPEC: this.dataBody[j].ITEM_SPEC,
                                MAX_TIME: this.dataBody[j].MAX_TIME,
                                METHOD: this.dataBody[j].METHOD,
                                METHOD_PARENT_NO: this.dataBody[j].METHOD_PARENT_NO,
                                OPER_ID: this.dataBody[j].OPER_ID,
                                PARENT_ITEM_NO: this.dataBody[j].PARENT_ITEM_NO,
                                PATIENT_ID: this.dataBody[j].PATIENT_ID,
                                PERFORM_SPEED: this.dataBody[j].BILL_ATTR,
                                SPEED_UNIT: this.dataBody[j].PERFORM_SPEED,
                                START_TIME: this.dataBody[j].START_TIME,
                                SUPPLIER_NAME: this.dataBody[j].SUPPLIER_NAME,
                                TYPE_NAME: this.dataBody[j].TYPE_NAME,
                                VISIT_ID: this.dataBody[j].VISIT_ID,
                                number: this.dataBody[j].number,
                                titleWord: this.dataBody[j].titleWord,
                            })
                        }
                        this.forALL[a] = this.forBoxBody
                    } else {
                        this.forBoxBody = [];
                        for (var j = (a + (7 * a)) - 1; j < (7 * a) + 7; j++) {
                            if (j >= this.dataBody.length) {
                                break
                            } else {
                                this.forBoxBody.push({
                                    ADMINISTRATOR: this.dataBody[j].ADMINISTRATOR,
                                    BILL_ATTR: this.dataBody[j].BILL_ATTR,
                                    BILL_INDICATOR: this.dataBody[j].BILL_INDICATOR,
                                    CONCENTRATION: this.dataBody[j].CONCENTRATION,
                                    CONCENTRATION_UNIT: this.dataBody[j].CONCENTRATION_UNIT,
                                    DOSAGE: this.dataBody[j].DOSAGE,
                                    DOSAGE_UNITS: this.dataBody[j].DOSAGE_UNITS,
                                    DURATIVE_INDICATOR: this.dataBody[j].DURATIVE_INDICATOR,
                                    ENDDATE: this.dataBody[j].ENDDATE,
                                    EVENT_ATTR: this.dataBody[j].EVENT_ATTR,
                                    EVENT_NO: this.dataBody[j].EVENT_NO,
                                    ITEM_CLASS: this.dataBody[j].ITEM_CLASS,
                                    ITEM_CODE: this.dataBody[j].ITEM_CODE,
                                    ITEM_NAME: this.dataBody[j].ITEM_NAME,
                                    ITEM_NO: this.dataBody[j].ITEM_NO,
                                    ITEM_SPEC: this.dataBody[j].ITEM_SPEC,
                                    MAX_TIME: this.dataBody[j].MAX_TIME,
                                    METHOD: this.dataBody[j].METHOD,
                                    METHOD_PARENT_NO: this.dataBody[j].METHOD_PARENT_NO,
                                    OPER_ID: this.dataBody[j].OPER_ID,
                                    PARENT_ITEM_NO: this.dataBody[j].PARENT_ITEM_NO,
                                    PATIENT_ID: this.dataBody[j].PATIENT_ID,
                                    PERFORM_SPEED: this.dataBody[j].BILL_ATTR,
                                    SPEED_UNIT: this.dataBody[j].PERFORM_SPEED,
                                    START_TIME: this.dataBody[j].START_TIME,
                                    SUPPLIER_NAME: this.dataBody[j].SUPPLIER_NAME,
                                    TYPE_NAME: this.dataBody[j].TYPE_NAME,
                                    VISIT_ID: this.dataBody[j].VISIT_ID,
                                    number: this.dataBody[j].number,
                                    titleWord: this.dataBody[j].titleWord,
                                })
                            }
                        }
                        this.forALL[a] = this.forBoxBody
                    }
                }
            } else {
                this.outBoxLength = Math.round(this.lengthType % 7);
                console.log(this.outBoxLength)
                for (var a = 0; a < this.outBoxLength; a++) {
                    this.forALL.push([])
                        this.forBoxBody = [];
                        for (var j = 0; j < 7; j++) {
                            if (j >= this.dataBody.length) {
                                break
                            } else {
                                this.forBoxBody.push({
                                    ADMINISTRATOR: this.dataBody[j].ADMINISTRATOR,
                                    BILL_ATTR: this.dataBody[j].BILL_ATTR,
                                    BILL_INDICATOR: this.dataBody[j].BILL_INDICATOR,
                                    CONCENTRATION: this.dataBody[j].CONCENTRATION,
                                    CONCENTRATION_UNIT: this.dataBody[j].CONCENTRATION_UNIT,
                                    DOSAGE: this.dataBody[j].DOSAGE,
                                    DOSAGE_UNITS: this.dataBody[j].DOSAGE_UNITS,
                                    DURATIVE_INDICATOR: this.dataBody[j].DURATIVE_INDICATOR,
                                    ENDDATE: this.dataBody[j].ENDDATE,
                                    EVENT_ATTR: this.dataBody[j].EVENT_ATTR,
                                    EVENT_NO: this.dataBody[j].EVENT_NO,
                                    ITEM_CLASS: this.dataBody[j].ITEM_CLASS,
                                    ITEM_CODE: this.dataBody[j].ITEM_CODE,
                                    ITEM_NAME: this.dataBody[j].ITEM_NAME,
                                    ITEM_NO: this.dataBody[j].ITEM_NO,
                                    ITEM_SPEC: this.dataBody[j].ITEM_SPEC,
                                    MAX_TIME: this.dataBody[j].MAX_TIME,
                                    METHOD: this.dataBody[j].METHOD,
                                    METHOD_PARENT_NO: this.dataBody[j].METHOD_PARENT_NO,
                                    OPER_ID: this.dataBody[j].OPER_ID,
                                    PARENT_ITEM_NO: this.dataBody[j].PARENT_ITEM_NO,
                                    PATIENT_ID: this.dataBody[j].PATIENT_ID,
                                    PERFORM_SPEED: this.dataBody[j].BILL_ATTR,
                                    SPEED_UNIT: this.dataBody[j].PERFORM_SPEED,
                                    START_TIME: this.dataBody[j].START_TIME,
                                    SUPPLIER_NAME: this.dataBody[j].SUPPLIER_NAME,
                                    TYPE_NAME: this.dataBody[j].TYPE_NAME,
                                    VISIT_ID: this.dataBody[j].VISIT_ID,
                                    number: this.dataBody[j].number,
                                    titleWord: this.dataBody[j].titleWord,
                                })
                            }
                        }
                        this.forALL[a] = this.forBoxBody

                }
                console.log(this.forALL)
            }
            // console.log(this.forALL)
        }
    },
    props: ['dataOfPeo', 'page'],
    mounted() {
        if (this.page == false) {
            this.selectMedAnesthesiaEventList();
            // window.eventHub.$on("test", this.selectMedAnesthesiaEventList);
        }

    },
    created() {
        Bus.$on('test', this.selectMedAnesthesiaEventList)
    },
    beforeDestroy() {
        Bus.$off('test', this.selectMedAnesthesiaEventList);
    },
}

</script>
<style scoped>

</style>
