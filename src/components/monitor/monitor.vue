<template>
    <div class="dictionaries">
        <div class="window_load">
            <div class="load_top">
                <div>监护仪</div>
                <div @click="aboutNone" class="top_active">X</div>
            </div>

            <div style="display:flex;position:absolute;top:34px;left:4px;">
                <div class="titleBox" v-for="item in machineList" :style="{width:item.width+'px',textAlign:item.textalign}">{{item.text}}</div>
            </div>
            <div class="monitorBox">
                <div v-for="(list,index) in commonTypeList" style="display: flex;">
                    <div v-for="cl in machineList" :style="{width:cl.width+'px',textAlign:cl.textalign}" :class="{greenClass:list.isBeChoosed}" style="border:1px solid rgb(177,207,243);box-sizing:border-box;">
                        <div v-if="cl.type=='raido'">
                            <input type="checkbox" :checked="list.checkedData" @change="getSingleSelect(list,index)">
                        </div>
                        <div v-if="cl.type!=='raido'">{{list[cl.value]}}</div>
                    </div>
                </div>
            </div>
            <div style="display:flex;position:absolute;top:424px;left:4px;">
                <div class="titleBox" v-for="item in anesthesiaList" :style="{width:item.width+'px',textAlign:item.textalign}">{{item.text}}</div>
            </div>
            <div class="anesthesia">
                <div v-for="(list,index) in commonTypeListTwo" style="display: flex;">
                    <div v-for="cl in anesthesiaList" :class="{greenClass:list.isBeChoosed}" :style="{width:cl.width+'px',textAlign:cl.textalign}" style="border:1px solid rgb(177,207,243);box-sizing:border-box;">
                        <div v-if="cl.type=='raido'">
                            <input type="checkbox" :checked="list.checkedData" @change="getSingleSelectTwo(list,index)">
                        </div>
                        <div v-if="cl.type!=='raido'">{{list[cl.value]}}</div>
                    </div>
                </div>
            </div>
            <div class="bottomBox">
                <div class="inputBox">
                    <span>开始时间</span><input style="width:190px;" @blur="dataOfChange('1',$event)" :value="dataOfStart" type="datetime-local">
                    <span>默认记录间隔</span><input style="width:45px;" @blur="dataOfChange('2',$event)" :value="defaultRecvFrequency" type="text">
                    <span>实际记录间隔</span><input style="width:45px;" @blur="dataOfChange('3',$event)" :value="currentRecvFrequency" type="text">
                    <span>采集次数/秒</span><input style="width:45px;" @blur="dataOfChange('4',$event)" :value="currentRecvtimesUplimit" type="text">
                </div>
                <div class="sureBox">
                    <button v-if="data" @click="aboutNone">关闭</button>
                    <button @click="bindingFunction()">确定</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfoDataBody: this.config,
            data: this.dataOfNoneClick.noneData,
            machineList: [
                {
                    text: "监护仪",
                    value: "monitorLabel",
                    width: 171,
                    textalign: 'left',
                },
                {
                    text: "开始时间",
                    value: "datalogStartTime",
                    width: 170,
                    textalign: 'left',
                },
                {
                    text: "默认记录",
                    value: "defaultRecvFrequency",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "实际记录",
                    value: "currentRecvFrequency",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "采集次数/秒",
                    value: "currentRecvtimesUplimit",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "手术",
                    value: "six",
                    width: 80,
                    textalign: 'left',
                },
                {
                    text: "选择",
                    value: "seven",
                    type: "raido",
                    width: 50,
                    textalign: 'center',
                },

            ],
            commonTypeList: [],
            anesthesiaList: [
                {
                    text: "麻醉机",
                    value: "monitorLabel",
                    width: 171,
                    textalign: 'left',
                },
                {
                    text: "开始时间",
                    value: "datalogStartTime",
                    width: 170,
                    textalign: 'left',
                },
                {
                    text: "默认记录",
                    value: "defaultRecvFrequency",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "实际记录",
                    value: "currentRecvFrequency",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "采集次数/秒",
                    value: "currentRecvtimesUplimit",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "手术",
                    value: "six",
                    width: 80,
                    textalign: 'left',
                },
                {
                    text: "选择",
                    value: "seven",
                    type: "raido",
                    width: 50,
                    textalign: 'center',
                },
            ],
            commonTypeListTwo: [],
            binding: '',
            bindingTwo: '',
            dataOfStart: '',
            dataOfStartSql: '',
            defaultRecvFrequency: '',
            currentRecvFrequency: '',
            currentRecvtimesUplimit: '',
            clickMonitor: '',
            thisAdata: '',
            thisBdata: '',
            thisOnchange: '',
            cancelData: '',
            cancelDataTwo: '',
            bothClick1: false,
            bothClick2: false,
        }
    },
    props: [
        'parentToChild',
        'dataOfNoneClick'
    ],
    methods: {
        aboutNone() {
            this.parentToChild.noneData = !this.parentToChild.noneData;
        },
        // 监护仪数据
        firstmonitor() {
            let params = ''
            if (this.dataOfNoneClick.noneData == false) {
                params = {
                    itemType: 0,
                    wardCode: this.config.wardCode,
                    wardType: 0
                }
            } else {
                params = {
                    itemType: 0,
                    wardCode: this.config.wardCode,
                    wardType: 0
                }
            }

            this.api.selectMonitorList(params)
                .then(
                res => {
                    console.log(res.list)
                    this.commonTypeList = res.list
                    if (res.list.length <= 14) {
                        this.machineList[0].width = 191;
                    } else {
                        this.machineList[0].width = 171;
                    }
                    for (var a = 0; a < res.list.length; a++) {
                        if (this.commonTypeList[a].operId == this.userInfoDataBody.userInfo.operId && this.commonTypeList[a].visitId == this.userInfoDataBody.userInfo.visitId && this.commonTypeList[a].patientId == this.userInfoDataBody.userInfo.patientId) {

                            this.$set(this.commonTypeList[a], 'isBeChoosed', true)
                            this.$set(this.commonTypeList[a], 'checkedData', true)
                        } else {
                            this.$set(this.commonTypeList[a], 'isBeChoosed', false)
                            this.$set(this.commonTypeList[a], 'checkedData', false)
                        }
                    }
                    this.firstFun();
                }
                )
        },

        // 麻醉机数据
        dataInAnesthesia() {
            let params = ''
            if (this.dataOfNoneClick.noneData == false) {
                params = {
                    itemType: 1,
                    wardCode: this.config.wardCode,
                    wardType: 0
                }
            } else {
                params = {
                    itemType: 1,
                    wardCode: this.config.wardCode,
                    wardType: 0
                }
            }

            this.api.selectMonitorList(params)
                .then(
                res => {
                    console.log(res.list)
                    this.commonTypeListTwo = res.list
                    if (res.list.length <= 7) {
                        this.anesthesiaList[0].width = 191;
                    } else {
                        this.anesthesiaList[0].width = 171;
                    }
                    for (var a = 0; a < res.list.length; a++) {
                        if (this.commonTypeListTwo[a].operId == this.userInfoDataBody.userInfo.operId && this.commonTypeListTwo[a].visitId == this.userInfoDataBody.userInfo.visitId && this.commonTypeListTwo[a].patientId == this.userInfoDataBody.userInfo.patientId) {
                            this.$set(this.commonTypeListTwo[a], 'isBeChoosed', true)
                            this.$set(this.commonTypeListTwo[a], 'checkedData', true)
                        } else {
                            this.$set(this.commonTypeListTwo[a], 'isBeChoosed', false)
                            this.$set(this.commonTypeListTwo[a], 'checkedData', false)
                        }
                    }
                    this.secendFun();
                }
                )

        },
        dataOfChange(index, event) {
            this.thisOnchange = true;
            if (this.clickMonitor == true && this.thisAdata !== true) {
                if (index == '1') {
                    console.log(event.srcElement.value)
                    // a = event.srcElement.value.replace('T', ' ')
                    // console.log(this.commonTypeList[this.chooseIndex])
                    this.binding.datalogStartTime = event.srcElement.value.replace('T', ' ');
                } else if (index == '2') {
                    console.log(event.srcElement.value)
                    this.binding.defaultRecvFrequency = event.srcElement.value;
                    console.log(this.binding)
                } else if (index == '3') {
                    console.log(event.srcElement.value)
                    this.binding.currentRecvFrequency = event.srcElement.value;
                } else if (index == '4') {
                    console.log(event.srcElement.value)
                    this.binding.currentRecvtimesUplimit = event.srcElement.value;
                }
            } else if (this.clickMonitor == false && this.thisBdata !== true) {
                console.log(this.bindingTwo)
                if (index == '1') {
                    console.log(event.srcElement.value)
                    // a = event.srcElement.value.replace('T', ' ')
                    // console.log(this.commonTypeList[this.chooseIndex])
                    this.bindingTwo.datalogStartTime = event.srcElement.value.replace('T', ' ');
                } else if (index == '2') {
                    console.log(event.srcElement.value)
                    this.bindingTwo.defaultRecvFrequency = event.srcElement.value;
                    // this.commonTypeList[this.chooseIndex].datalogStartTime = a;
                } else if (index == '3') {
                    console.log(event.srcElement.value)
                    this.bindingTwo.currentRecvFrequency = event.srcElement.value;
                } else if (index == '4') {
                    console.log(event.srcElement.value)
                    this.bindingTwo.currentRecvtimesUplimit = event.srcElement.value;
                }
            } else if (this.clickMonitor == '' && this.thisAdata == true && this.thisBdata == true) {
                if (index == '1') {
                    console.log(event.srcElement.value)
                    // a = event.srcElement.value.replace('T', ' ')
                    // console.log(this.commonTypeList[this.chooseIndex])
                    this.binding.datalogStartTime = event.srcElement.value.replace('T', ' ');
                    this.bindingTwo.datalogStartTime = event.srcElement.value.replace('T', ' ');
                } else if (index == '2') {
                    console.log(event.srcElement.value)
                    this.binding.defaultRecvFrequency = event.srcElement.value;
                    this.bindingTwo.defaultRecvFrequency = event.srcElement.value;
                    // this.commonTypeList[this.chooseIndex].datalogStartTime = a;
                } else if (index == '3') {
                    console.log(event.srcElement.value)
                    this.bindin.currentRecvFrequency = event.srcElement.value;
                    this.bindingTwo.currentRecvFrequency = event.srcElement.value;
                } else if (index == '4') {
                    console.log(event.srcElement.value)
                    this.binding.currentRecvtimesUplimit = event.srcElement.value;
                    this.bindingTwo.currentRecvtimesUplimit = event.srcElement.value;
                }
            }
            // var a;

        },
        getSingleSelect(item, index) {
            this.clickMonitor = true;
            let inputData;
            console.log(item)
            console.log(index)
            this.chooseIndex = index;
            console.log(this.config.userInfo)
            var timeStart = new Date().Format('yyyy-MM-dd hh:mm');
            this.dataOfStartSql = timeStart;

            this.defaultRecvFrequency = item.defaultRecvFrequency;
            this.currentRecvFrequency = item.currentRecvFrequency;
            this.currentRecvtimesUplimit = item.currentRecvtimesUplimit;
            this.binding = {
                itemType: 0,
                wardCode: this.config.wardCode,
                wardType: 0,
                operId: this.config.userInfo.operId,
                patientId: this.config.userInfo.patientId,
                visitId: this.config.userInfo.visitId,
                currentRecvFrequency: item.currentRecvFrequency,
                currentRecvtimesUplimit: item.currentRecvtimesUplimit,
                datalogStartTime: this.dataOfStartSql,
                defaultRecvFrequency: item.defaultRecvFrequency,
                monitorLabel: item.monitorLabel,
            }
            console.log(this.binding)
            // console.log(this.commonTypeList)
            if (this.thisAdata == true) {
                // this.bothClick1 = true;
                for (var i = 0; i <= this.commonTypeList.length - 1; i++) {
                    if (index == i && this.commonTypeList[index].checkedData == true) {
                        this.$set(this.commonTypeList[index], 'checkedData', false)
                        this.cancelData = true;
                        // this.bothClick1 = !this.bothClick1;
                    } else if (index == i && this.commonTypeList[index].checkedData == false) {
                        if (this.commonTypeList[index].checkedData == false) {
                            this.$set(this.commonTypeList[index], 'checkedData', true)
                            this.cancelData = false;
                            // this.bothClick1 = false;
                        } else {

                        }
                    } else {
                        this.$set(this.commonTypeList[i], 'checkedData', false)
                    }

                }
                // console.log(this.bothClick1)

            } else {
                // this.bothClick1 = !this.bothClick1;
                // console.log(this.bothClick1)
                for (var i = 0; i <= this.commonTypeList.length - 1; i++) {
                    if (index == i) {
                        this.$set(this.commonTypeList[index], 'checkedData', true)
                        // item.checkedData = true;
                        // this.$set(this.commonTypeList,index,item)
                    } else if (index !== i) {
                        this.$set(this.commonTypeList[i], 'checkedData', false)

                    }
                }
                this.cancelData = false;

            }

            // for(){

            // }
        },
        getSingleSelectTwo(item, index) {
            this.clickMonitor = false;
            // console.log(item)
            // console.log(index)
            // console.log(this.commonTypeListTwo)
            var timeStart = new Date().Format('yyyy-MM-dd hh:mm');
            this.dataOfStartSql = timeStart;
            this.bindingTwo = {
                itemType: 1,
                wardCode: this.config.wardCode,
                wardType: 0,
                operId: this.config.userInfo.operId,
                patientId: this.config.userInfo.patientId,
                visitId: this.config.userInfo.visitId,
                currentRecvFrequency: item.currentRecvFrequency,
                currentRecvtimesUplimit: item.currentRecvtimesUplimit,
                datalogStartTime: this.dataOfStartSql,
                defaultRecvFrequency: item.defaultRecvFrequency,
                monitorLabel: item.monitorLabel,
            }
            // console.log(this.thisBdata)
            if (this.thisBdata == true) {
                for (var i = 0; i <= this.commonTypeListTwo.length - 1; i++) {
                    if (index == i && this.commonTypeListTwo[index].checkedData == true) {
                        this.$set(this.commonTypeListTwo[index], 'checkedData', false)
                        this.cancelDataTwo = true;
                        // this.bothClick2 = !this.bothClick2;
                    } else if (index == i && this.commonTypeListTwo[index].checkedData == false) {
                        if (this.commonTypeListTwo[index].checkedData == false) {
                            this.$set(this.commonTypeListTwo[index], 'checkedData', true)
                            this.cancelDataTwo = false;
                            // this.bothClick2 = false;
                        } else {

                        }
                    } else {
                        this.$set(this.commonTypeListTwo[i], 'checkedData', false)
                    }

                }
                // console.log(this.bothClick2)

            } else {
                // this.bothClick2 = !this.bothClick2;
                // console.log(this.bothClick2)
                for (var i = 0; i <= this.commonTypeListTwo.length - 1; i++) {
                    if (index == i) {
                        // console.log(this.commonTypeListTwo[index])
                        this.$set(this.commonTypeListTwo[index], 'checkedData', true)
                        // item.checkedData = true;
                        // this.$set(this.commonTypeListTwo,index,item)
                    } else if (index !== i) {
                        this.$set(this.commonTypeListTwo[i], 'checkedData', false)
                    }

                }
                this.cancelDataTwo = false;
            }

        },
        bindingFunction() {
            console.log(this.thisOnchange)
            console.log(this.binding)
            console.log(this.bindingTwo)
            console.log(this.clickMonitor)
            // 监护仪
            // && this.bothClick1 == true & this.bothClick2 == false
            if (this.binding !== '' && this.clickMonitor == true && this.cancelData == false) {
                alert('1')
                this.api.bindPatientMonitor(this.binding).then(
                    res => {
                        console.log(res.success)
                        if (res.success == true) {
                            this.firstmonitor();
                            // this.parentToChild.noneData = !this.parentToChild.noneData;
                            console.log(this.cancelData)
                        }
                    }
                )
            } else
                // 麻醉机
                // && this.bothClick2 == true && this.bothClick1 == false
                if (this.bindingTwo !== '' && this.clickMonitor == false && this.cancelDataTwo == false) {
                    alert('2')
                    this.api.bindPatientMonitor(this.bindingTwo).then(
                        res => {
                            console.log(res.success)
                            if (res.success == true) {
                                this.dataInAnesthesia();
                                // this.parentToChild.noneData = !this.parentToChild.noneData;
                            }
                        }
                    )
                } else
                    // && this.bothClick1 == true && this.bothClick2 == false
                    if (this.binding !== '' && this.clickMonitor == true && this.cancelData == true) {
                        alert('3')
                        let cancelQues = {
                            monitorLabel: this.binding.monitorLabel,
                        }
                        this.api.cancleBindPatientMonitor(cancelQues)
                            .then(
                            res => {
                                console.log(res.success)
                                if (res.success == true) {
                                    this.firstmonitor();
                                    this.cancelData = '';
                                }
                            }
                            )
                    } else
                        // && this.bothClick2 == true && this.bothClick1 == false
                        if (this.bindingTwo !== '' && this.clickMonitor == false && this.cancelDataTwo == true) {
                            alert('4')
                            let cancelQuesT = {
                                monitorLabel: this.bindingTwo.monitorLabel,
                            }
                            this.api.cancleBindPatientMonitor(cancelQuesT)
                                .then(
                                res => {
                                    console.log(res.success)
                                    if (res.success == true) {
                                        this.dataInAnesthesia();
                                        this.cancelDataTwo = '';
                                    }
                                }
                                )
                        } else
                            if (this.thisAdata == true && this.thisBdata == true && this.clickMonitor == '') {
                                alert('5')
                                this.api.bindPatientMonitor(this.binding).then(
                                    res => {
                                        if (res.success == true) {
                                            this.firstmonitor();
                                        }
                                    }
                                )
                                this.api.bindPatientMonitor(this.bindingTwo).then(
                                    res => {
                                        if (res.success == true) {
                                            this.dataInAnesthesia();
                                        }
                                    }
                                )
                                // && this.bothClick1 == true && this.bothClick2 == true
                            } else if (this.binding !== '' && this.bindingTwo !== '' && this.cancelData == false) {
                                alert('6')
                                this.api.bindPatientMonitor(this.binding).then(
                                    res => {
                                        if (res.success == true) {
                                            this.firstmonitor();
                                        }
                                    }
                                )
                                this.api.bindPatientMonitor(this.bindingTwo).then(
                                    res => {
                                        if (res.success == true) {
                                            this.dataInAnesthesia();
                                        }
                                    }
                                )
                            }
                            // && this.bothClick1 == false && this.bothClick2 == false
                            else if (this.binding !== '' && this.bindingTwo !== '' && this.cancelData == true) {
                                alert('7')
                                let cancelQuesB1 = {
                                    monitorLabel: this.binding.monitorLabel,
                                }
                                let cancelQuesB2 = {
                                    monitorLabel: this.bindingTwo.monitorLabel,
                                }
                                this.api.cancleBindPatientMonitor(cancelQuesB1)
                                    .then(
                                    res => {
                                        console.log(res.success)
                                        if (res.success == true) {
                                            this.firstmonitor();
                                            this.cancelDataTwo = '';
                                        }
                                    }
                                    )
                                this.api.cancleBindPatientMonitor(cancelQuesB2)
                                    .then(
                                    res => {
                                        console.log(res.success)
                                        if (res.success == true) {
                                            this.dataInAnesthesia();
                                            this.cancelDataTwo = '';
                                        }
                                    }
                                    )
                            }
            //  else {
            //         console.log(this.thisAdata)
            //         console.log(this.thisBdata)
            //         if (this.thisAdata == true || this.thisBdata == true) {
            //             if (this.thisOnchange == true) {
            //                 if (this.thisAdata == true) {
            //                     alert('1')
            //                     // 修改接口
            //                 } else if (this.thisBdata == true) {
            //                     alert('2')
            //                     // 修改接口
            //                 }
            //             } else {
            //                 alert('该系列采集程序已启动。')
            //             }

            //         } else {
            //             alert('启动采集程序需要勾选列表中的采集器。')
            //         }

            //     }

        },
        firstFun() {
            for (var a = 0; a < this.commonTypeList.length; a++) {
                if (this.commonTypeList[a].operId == this.userInfoDataBody.userInfo.operId && this.commonTypeList[a].visitId == this.userInfoDataBody.userInfo.visitId && this.commonTypeList[a].patientId == this.userInfoDataBody.userInfo.patientId) {
                    this.thisAdata = true;
                    this.defaultRecvFrequency = this.commonTypeList[a].defaultRecvFrequency;
                    this.currentRecvFrequency = this.commonTypeList[a].currentRecvFrequency
                    this.currentRecvtimesUplimit = this.commonTypeList[a].currentRecvtimesUplimit
                    this.binding = {
                        itemType: 0,
                        wardCode: this.config.wardCode,
                        wardType: 0,
                        operId: this.config.userInfo.operId,
                        patientId: this.config.userInfo.patientId,
                        visitId: this.config.userInfo.visitId,
                        datalogStartTime: this.dataOfStartSql,
                        currentRecvFrequency: this.commonTypeList[a].currentRecvFrequency,
                        currentRecvtimesUplimit: this.commonTypeList[a].currentRecvtimesUplimit,
                        defaultRecvFrequency: this.commonTypeList[a].defaultRecvFrequency,
                        monitorLabel: this.commonTypeList[a].monitorLabel,
                    }
                } else {

                }
            }
        },
        secendFun() {
            console.log(this.commonTypeListTwo)
            for (var j = 0; j < this.commonTypeListTwo.length; j++) {
                if (this.commonTypeListTwo[j].operId == this.userInfoDataBody.userInfo.operId && this.commonTypeListTwo[j].visitId == this.userInfoDataBody.userInfo.visitId && this.commonTypeListTwo[j].patientId == this.userInfoDataBody.userInfo.patientId) {
                    this.thisBdata = true;
                    this.defaultRecvFrequency = this.commonTypeListTwo[j].defaultRecvFrequency;
                    this.currentRecvFrequency = this.commonTypeListTwo[j].currentRecvFrequency
                    this.currentRecvtimesUplimit = this.commonTypeListTwo[j].currentRecvtimesUplimit
                    this.bindingTwo = {
                        itemType: 1,
                        wardCode: this.config.wardCode,
                        wardType: 0,
                        operId: this.config.userInfo.operId,
                        patientId: this.config.userInfo.patientId,
                        visitId: this.config.userInfo.visitId,
                        datalogStartTime: this.dataOfStartSql,
                        currentRecvFrequency: this.commonTypeListTwo[j].currentRecvFrequency,
                        currentRecvtimesUplimit: this.commonTypeListTwo[j].currentRecvtimesUplimit,
                        defaultRecvFrequency: this.commonTypeListTwo[j].defaultRecvFrequency,
                        monitorLabel: this.commonTypeListTwo[j].monitorLabel,
                    }
                } else {

                }
            }
        }
    },
    mounted() {
        this.dataInAnesthesia();
        this.firstmonitor();
        // console.log(this.dataOfNoneClick)
        this.dataOfStart = this.changeDateFormat(new Date().Format('yyyy-MM-dd hh:mm'));
        this.dataOfStartSql = new Date().Format('yyyy-MM-dd hh:mm');
        console.log(this.binding)
        console.log(this.bindingTwo)

    },
}
</script>
<style scoped>
.greenClass {
    background-color: #008000;
}

.window_load {
    width: 800px;
    height: 780px;
    left: calc(50% - 400px);
    top: calc(50% - 390px);
}

.monitorBox {
    width: calc(100% - 4px);
    height: 380px;
    border: 2px solid #191A1C;
    box-sizing: border-box;
    margin: 2px;
    overflow-y: auto;
    padding-top: 30px;
    background-color: #fff;
}

.titleBox {
    border: 1px solid #ddd;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 5px;
    background-color: #fff;
}

.titleBox:last-child {
    padding-right: 5px;
}

.anesthesia {
    width: calc(100% - 4px);
    height: 220px;
    border: 2px solid #191A1C;
    box-sizing: border-box;
    margin: 10px 2px 2px;
    padding-top: 30px;
    overflow-y: auto;
    background-color: #fff;
}

.bottomBox {
    padding-top: 20px;
    width: 100%;
    height: 110px;
}

.inputBox {
    display: flex;
}

.inputBox span {
    padding-left: 15px;
}

.inputBox input {
    height: 20px;
}

.sureBox {
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: row-reverse;
}

.sureBox button {
    width: 110px;
    height: 30px;
    margin-right: 30px;
}
</style>
