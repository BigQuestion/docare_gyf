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
                <div v-for="list in commonTypeList" style="display: flex;">
                    <div v-for="cl in machineList" :style="{width:cl.width+'px',textAlign:cl.textalign}" style="border:1px solid rgb(177,207,243);box-sizing:border-box;">
                        <div v-if="cl.type=='raido'">
                            <input type="radio">
                        </div>
                        <div v-if="cl.type!=='raido'">{{list[cl.value]}}</div>
                    </div>
                </div>
            </div>
            <div style="display:flex;position:absolute;top:424px;left:4px;">
                <div class="titleBox" v-for="item in anesthesiaList" :style="{width:item.width+'px',textAlign:item.textalign}">{{item.text}}</div>
            </div>
            <div class="anesthesia">
                <div v-for="list in commonTypeListTwo" style="display: flex;">
                    <div v-for="cl in anesthesiaList" :style="{width:cl.width+'px',textAlign:cl.textalign}" style="border:1px solid rgb(177,207,243);box-sizing:border-box;">
                        <div v-if="cl.type=='raido'">
                            <input type="radio">
                        </div>
                        <div v-if="cl.type!=='raido'">{{list[cl.value]}}</div>
                    </div>
                </div>
            </div>
            <div class="bottomBox">
                <div>
                    <span>开始时间</span><input type="datetime-local">
                    <span>默认记录间隔</span><input type="text">
                    <span>实际记录间隔</span><input type="text">
                    <span>采集次数/秒</span><input type="text">
                </div>
                <div>
                    <button>确定</button>
                    <button @click="aboutNone">关闭</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            machineList: [
                {
                    text: "监护仪",
                    value: "one",
                    width: 191,
                    textalign: 'left',
                },
                {
                    text: "开始时间",
                    value: "two",
                    width: 150,
                    textalign: 'left',
                },
                {
                    text: "默认记录",
                    value: "three",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "实际记录",
                    value: "four",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "采集次数/秒",
                    value: "five",
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
                    value: "one",
                    width: 191,
                    textalign: 'left',
                },
                {
                    text: "开始时间",
                    value: "two",
                    width: 150,
                    textalign: 'left',
                },
                {
                    text: "默认记录",
                    value: "three",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "实际记录",
                    value: "four",
                    width: 100,
                    textalign: 'left',
                },
                {
                    text: "采集次数/秒",
                    value: "five",
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
        }
    },
    props: [
        'parentToChild'
    ],
    methods: {
        aboutNone() {
            this.parentToChild.noneData = !this.parentToChild.noneData;
        },
        // 监护仪数据
        dataInMonitorBox() {
            let iLength = 20;
            for (var i = 0; i <= iLength; i++) {
                this.commonTypeList.push({
                    one: '01号监护仪',
                    two: '2014/3/28 9:19',
                    three: '300',
                    four: '300',
                    five: '0',
                    six: '03',
                    seven: '0',
                })
            }
            if (iLength <= 14) {
                this.machineList[0].width = 211;
            } else {
                this.machineList[0].width = 191;
            }
        },
        // 麻醉机数据
        dataInAnesthesia() {
            let iLength = 4;
            for (var i = 0; i <= iLength; i++) {
                this.commonTypeListTwo.push({
                    one: '01号监护仪',
                    two: '2014/3/28 9:19',
                    three: '300',
                    four: '300',
                    five: '0',
                    six: '03',
                    seven: '0',
                })
            }
            if (iLength <= 7) {
                this.anesthesiaList[0].width = 211;
            } else {
                this.anesthesiaList[0].width = 191;
            }
        }
    },
    mounted() {
        this.dataInMonitorBox();
        this.dataInAnesthesia();
    },
}
</script>
<style scoped>
.window_load {
    width: 800px;
    height: 800px;
    left: calc(50% - 400px);
    top: calc(50% - 400px);
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
    height: 130px;
    background-color: lightblue;
}
</style>
