<template>
    <div class="dictionaries">
        <div class="window_load">
            <div class="load_top">
                <div>医嘱信息</div>
                <div @click="closeCheckInfo" class="top_active">X</div>
            </div>
            <div style="display:flex;align-items: center;height:50px;padding-left: 20px;font-size: 18px;line-height: 50px;">
                <span>医嘱信息</span>
                <div class="inputClass">
                    <input type="radio" id="all" @click="searchPatientList" v-model="timeStatus" value="">
                    <label for="all" style="margin-right:5px;">全部</label>
                    <input type="radio" id="temporary" @click="searchPatientList" value="1" v-model="timeStatus">
                    <label for="temporary" style="margin-right:5px;">临时</label>
                    <input type="radio" id="LongTerm" @click="searchPatientList" value="2" v-model="timeStatus">
                    <label for="LongTerm">长期</label>
                </div>
                <div class="inputClass" style="margin-left:30px;">
                    <input type="radio" id="all" @click="searchPatientList" v-model="operStatus" value="">
                    <label for="all" style="margin-right:5px;">全部</label>
                    <input type="radio" id="new" @click="searchPatientList" value="3" v-model="operStatus">
                    <label for="new" style="margin-right:5px;">新开</label>
                    <input type="radio" id="two" @click="searchPatientList" value="4" v-model="operStatus">
                    <label for="two" style="margin-right:5px;">校对</label>
                    <input type="radio" id="executed" @click="searchPatientList" value="5" v-model="operStatus">
                    <label for="executed" style="margin-right:5px;">已执行</label>
                    <input type="radio" id="stoped" @click="searchPatientList" value="6" v-model="operStatus">
                    <label for="stoped">已停止</label>
                </div>
            </div>
            <div style="height: calc(100% - 80px);width: 100%;display: flex;">
                <div style="width: 100%;height:100%;overflow: auto;background-color: white;">
                    <div style="width:1500px;min-height:505px;">
                        <!-- 测试用，div拖拽拉伸 -->
                        <div style="display: flex;" @mouseup="upFun()">
                            <div v-for="item in contentConfig" style="display: flex;position:relative;" :style="{width:item.width+'px'}">
                                <div :style="{width:item.width+'px'}" class="leftTitle" style="background-color:rgb(219,235,253)">{{item.text}}</div>
                                <div class="resizeIcon" @mousedown="changeWidth($event,index)" @mousemove="moveFun($event,item)" @mouseout="outFun()"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display:flex;" class="hover" :class="{hoverClick:item.clickClass}" v-for="item in dataList" @click="getDetail(item)">
                                <div v-for="cell in contentConfig" :style="{width:cell.width+'px'}" class="leftTitle">{{item[cell.value]}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            contentConfig: [{
                text: "",
                width: 10,
                value: "num"
            }, {
                text: "长期/零时",
                width: 90,
                value: "testNo"
            },
            {
                text: "开始时间",
                width: 90,
                value: "testCause"
            },
            {
                text: "结束时间",
                width: 70,
                value: "specimen"
            },
            {
                text: "医嘱内容",
                width: 300,
                value: "resultsRptDateTime"
            },
            {
                text: "计量",
                width: 91,
                value: "resultsRptDateTime"
            },
            {
                text: "计量单位",
                width: 91,
                value: "resultsRptDateTime"
            },
            {
                text: "途径",
                width: 91,
                value: "resultsRptDateTime"
            },
            {
                text: "频率",
                width: 91,
                value: "resultsRptDateTime"
            },
            {
                text: "执行时间",
                width: 91,
                value: "resultsRptDateTime"
            }, {
                text: "结束时间",
                width: 91,
                value: "resultsRptDateTime"
            },],
            dataList: [],
            timeStatus:'',
            operStatus: '',
            changeWidthData: '',
            beganLeft: '',
            lastMoveLeft: '',
            clickKeep: false,
        }
    },
    methods: {
        closeCheckInfo() {
            this.$emit('closeView');
        },
        getData() {
            let parm = {
                patientId: this.config.userInfo.patientId,
                visitId: this.config.userInfo.visitId
            }
            this.api.getMedLabTestMasterList(parm)
                .then(res => {
                    for (var a = 0; a < res.length; a++) {
                        this.$set(res[a], 'clickClass', false)
                        this.$set(res[a], 'resultsRptDateTime', new Date(res[a].resultsRptDateTime).Format('yyyy-MM-dd'))
                    }
                    this.dataList = res;
                })
        },
        searchPatientList() {
            // 待接口完善后编写数据筛选功能
        },
        changeWidth(event,index) {
            this.clickKeep = true;
            this.beganLeft = event.clientX;
            // this.leftDiv = this.contentConfig[index - 1];
            // this.rightDiv = this.contentConfig[index + 1];
            // console.log(event)
        },
        moveFun(event, item) {
            if (this.clickKeep == true) {
                this.lastMoveLeft = event.clientX;
                item.width = item.width + (this.lastMoveLeft - this.beganLeft);
                // this.rightDiv.width = this.rightDiv.width - (this.lastMoveLeft - this.beganLeft);
                // this.leftDiv.width = this.leftDiv.width - (this.lastMoveLeft - this.beganLeft);
            }
        },
        upFun() {
            this.clickKeep = false;
        },
        outFun() {
            this.clickKeep = false;
        }

    },
    mounted() {
        this.getData();
    },
    created() { },
    beforeDestroy() { },
    components: {},
    computed: {

    }
}

</script>
<style scoped>
.window_load {
    width: 1100px;
    height: 600px;
    top: calc(50% - 300px);
    left: calc(50% - 513px);
}

.inputClass {
    line-height: 30px;
    display: flex;
    align-items: center;
    margin-left: 150px;
    font-size: 16px;
    background-color: #fff;
    height: 30px;
    border: 1px solid rgb(191, 192, 218);
    padding: 0 10px;
}

.flex {
    height: 25px;
    line-height: 25px;
    padding: 3px 0;
}

.cell {
    width: 60px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #B3B3B3;
}

.head .cell {
    border: 1px solid #666666;
}

.resizeAble {
    /* resize: horizontal; */
    overflow: auto;
    font-weight: 200;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #39578A;
    color: #fff;
}

.resizeIcon {
    position: absolute;
    top: 0px;
    height: 100%;
    width: 5px;
    background: rgba(0, 0, 0, 0);
    z-index: 2;
}

.resizeIcon:hover {
    cursor: w-resize;
}

.leftTitle {
    border: 1px solid rgb(193, 211, 243);
    padding-left: 5px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
}

.autoLine {
    height: calc(100% - 2px);
    width: 5px;
    border: 1px solid rgb(193, 211, 243);
    background-color: rgb(118, 163, 219);
}

.hoverClick {
    background-color: rgb(48, 106, 197);
    color: #ffffff;
    cursor: pointer;
}

.hover:hover {
    background-color: rgb(48, 106, 197);
    color: #ffffff;
    cursor: pointer;
}

</style>
