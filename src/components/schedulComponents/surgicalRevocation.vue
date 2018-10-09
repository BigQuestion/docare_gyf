<template>
    <div style="width:100%;height:100%;padding-top:80px;box-sizing:border-box;">
        <div style="padding-bottom:10px;">
            手术日期：<input type="date" v-model="dateTimeValue" @change="getTime($event)">
            <button @click="getView(dateTimeValue)">查询</button>
            <button style="width:120px;margin-left:15px;" @click="goBack()">撤销已选手术</button>
            <button style="width:80px;margin-left:15px;" @click="all()">{{buttonWord}}</button>
        </div>
        <div style="overflow:auto;width:100%;height:calc(100% - 40px);box-sizing:border-box;margin:auto;border:1px solid #000;">
            <div class="" style="display:flex;width:1850px;box-sizing:border-box;">
                <div v-for="(item,index) in infoMode" class="titleBox" :style="{width:item.width+'px'}">
                    <div style="width:100%;overflow-x: hidden;white-space: nowrap">{{item.text}}</div>
                </div>
            </div>
            <div style="width:1850px;">
                <div v-for="(item,index) in scheduleList" style="display:flex;" class="hoverClass">
                    <div v-for="cell in infoMode" class="titleBox" :style="{width:cell.width+'px'}" style="box-sizing: border-box;">
                        <span v-if="cell.value == 'index'">{{index+1}}</span>
                        <span v-else-if="cell.value == 'checkbox'">
                            <input type="checkbox" :checked="item.checkData"  @change="getListForCancel(item)">
                        </span>
                        <span v-else>{{item[cell.value]}}</span>
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
            dateTimeValue: '',
            buttonWord: '全部',
            infoMode: [{
                text: '序号',
                value: 'index',
                width: 40,
            },
            {
                text: '勾选',
                value: 'checkbox',
                width: 40,
            }, {
                text: '申请时间',
                value: 'scheduledDateTime',
                width: 100,
                optin: false,
            }, {
                text: '科室名称',
                value: 'deptName',
                width: 60,
                optin: false,
            }, {
                text: '手术医师',
                value: 'surgeonName',
                width: 60,
                optin: false,
            }, {
                text: '手术名称',
                value: 'operationSchName',
                width: 200,
                optin: false,
            }, {
                text: '台次',
                value: 'sequence',
                width: 60,
                optin: false,
            }, {
                text: '病人姓名',
                value: 'patientName',
                width: 60,
                optin: false,
            }, {
                text: '年龄',
                value: 'patienAge',
                width: 60,
            }, {
                text: '性别',
                value: 'patientSex',
                width: 60,
                optin: false,
            }, {
                text: '床号',
                value: 'bedNo',
                width: 60,
                optin: false,
            }, {
                text: '诊断',
                value: 'diagBeforeOperation',
                width: 200,
                optin: false,
            }, {
                text: "手术审核时间",
                type: "inSelect",
                value: "reqDateTime",
                width: 120,
                optin: false,
            }, {
                text: '主麻医师',
                value: 'anesthesiaDoctorName',
                width: 70,
                optin: false,
            }, {
                text: '副麻医师1',
                value: 'firstAnesthesiaAssistantName',
                width: 70,
                optin: false,
            }, {
                text: '副麻医师2',
                value: 'secondAnesthesiaAssistantName',
                width: 70,
                optin: false,
            },
            {
                text: '手术助手1',
                value: 'firstAssistantName',
                width: 70,
                optin: false,
            }, {
                text: '手术助手2',
                value: 'secondAssistantName',
                width: 70,
                optin: false,
            }, {
                text: '洗手护士1',
                value: 'firstOperationNurseName',
                width: 70,
                optin: false,
            }, {
                text: '洗手护士2',
                value: 'secondOperationNurseName',
                width: 70,
                optin: false,
            }, {
                text: '巡回护士1',
                value: 'firstSupplyNurseName',
                width: 70,
                optin: false,
            }, {
                text: '巡回护士2',
                value: 'secondSupplyNurseName',
                width: 70,
                optin: false,
            }, {
                text: '备注',
                value: 'notesOnOperation',
                width: 200,
                optin: false,
            }
            ],
            scheduleList: [],
            cancelData: [],
        }
    },
    methods: {
        getTime(event) {
            // console.log(event.srcElement.value)
            this.dateTimeValue = event.srcElement.value;
        },
        getView(date) {
            this.scheduleList = [];
            var changeData = date.replace(/-/g, '/')
            let params = {
                "dateTime": changeData, //"2014/07/08"查询日期
            }
            this.api.getScheduleList(params)
                .then(res => {
                    for (var a = 0; a < res.list.length; a++) {
                        if (res.list[a].state == 2) {
                            this.$set(res.list[a], 'clickShadowData', false)
                            this.$set(res.list[a], 'checkData', false)
                            this.scheduleList.push(res.list[a]);
                        }
                    }
                })
        },
        getListForCancel(item) {
            item.clickShadowData = !item.clickShadowData;
            item.checkData = !item.checkData;
            this.buttonWord = '取消';
            if (item.clickShadowData == true) {
                this.cancelData.push(item);
            } else {
                for (var h = 0; h < this.cancelData.length; h++) {
                    if (this.cancelData[h].patientId == item.patientId && this.cancelData[h].visitId == item.visitId && this.cancelData[h].scheduleId == item.scheduleId) {
                        this.cancelData.splice(h, 1);
                    } else {

                    }
                }
            }

        },
        goBack() {
            let parm = [];
            if (this.cancelData.length == 0) {
                alert('您未选择需要撤销的手术。')
            } else {
                for (var c = 0; c < this.cancelData.length; c++) {
                    parm.push({
                        patientId: this.cancelData[c].patientId,
                        visitId: this.cancelData[c].visitId,
                        scheduleId: this.cancelData[c].scheduleId,
                    })
                }
                this.api.cancleSubmit(parm)
                    .then(cal => {
                        if (cal.success) {
                            alert(cal.msg)
                            this.getView(this.dateTimeValue);
                        } else {
                            alert(cal.msg)
                        }
                    })
            }

        },
        all() {
            if (this.buttonWord == '全部') {
                for (var i = 0; i < this.scheduleList.length; i++) {
                    this.cancelData.push(this.scheduleList[i]);
                    this.scheduleList[i].checkData = true;
                }
                this.buttonWord = '取消';
            } else if (this.buttonWord == '取消') {
                for (var a = 0; a < this.scheduleList.length; a++) {
                    this.scheduleList[a].checkData = false;
                }
                this.cancelData = [];
                this.buttonWord = '全部';
            }
        }

    },

}
</script>

<style scoped>
.titleBox {
    text-align: center;
    border-right: 1px solid #808080;
    border-top: 1px solid #808080;
    border-bottom: 1px solid #808080;
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    /* background-color: #fff; */
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.titleBox:first-child {
    border-left: 1px solid #808080;
}

.flex {
    height: 25px;
    line-height: 25px;
    padding: 3px 0;
}

.flex:last-child {
    height: auto !important;
}

.flex textarea {
    resize: none;
    width: 340px;
    height: 40px;
}

.resizeAble {
    /* resize: horizontal; */
    overflow: auto;
    font-weight: 200;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #fff;
    color: #222;
}

.hoverClass:hover {
    background-color: #A3BDD9 !important;
}
</style>
