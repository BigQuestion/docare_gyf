<template>
    <div style="overflow-x: auto;" id="demo" :style="{width:tableConfig.width+'px'}">
        <button @click="loadData">加载数据</button>
        <div style="width:800px;">
            <div>
                <div style="box-sizing: border-box;background: #4C4C4C;text-align: center;position: relative;border: 1px solid #E6E6E6;display: inline-block;" v-for="(col,index) in tableConfig.cols" :style="{width:col.width+'px'}">
                    <div style="width:100%;overflow-x: hidden;white-space: nowrap">{{col.fieldText}}</div>
                    <div class="resizeIcon" :style="{left:col.width-2}" @mousedown="resizeStart($event,index,col)"></div>
                </div>
            </div>
            <div v-for="item in data">
                <div style="background: #B3B3B3;box-sizing: border-box;text-align: center;position: relative;border: 1px solid #E6E6E6;display: inline-block;" v-for="(col,index) in tableConfig.cols" :style="{width:col.width+'px'}">
                    <div v-if="col.type==='input'" style="width:100%;overflow-x: hidden;white-space: nowrap">{{item[col.fieldText]}}</div>
                    <div v-if="col.type==='text'" style="width:100%;overflow-x: hidden;white-space: nowrap">{{item[col.fieldText]}}</div>
                    <select-do v-if="col.type==='select'" :loadFun="col.loadListFun" :node="item" :fieldName="col.fieldText"></select-do>
                    <div class="resizeIcon" :style="{left:col.width-2}" ></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import selectDo from '@/components/scheduleList/selectDo.vue'
export default {
    name: 'wdTable',
    data() {
        return {
            area: '',
            startX: '',
            handleCol: '',
            nextCol: '',
            minWidth: 20,
            maxWidth: '',
            tableConfig:{},
            data:[{
                type:"input",
                name:"测试1"
            },{
                type:"text",
                name:"测试2"
            }],
        }
    },
    methods: {
        loadData(){
            //this.tableConfig.dataLoaded();
            this.tableConfig = {
                cols:[
                {
                    type:"input",
                    fieldText:"name",
                    width:100
                },
                {
                    type:"text",
                    fieldText:"name",
                    width:100
                },
                {
                    type:"text",
                    fieldText:"name",
                    width:100
                },]
            }
        },
        resizeStart(e, index, col) {
            if (index == this.tableConfig.cols.length - 1) {
                return;
            }
            console.log('start');
            this.startX = e.clientX;
            this.handleCol = col;
            this.nextCol = this.tableConfig.cols[index + 1];
            this.maxWidth = this.handleCol.width + this.nextCol.width - 10;
            this.area.addEventListener('mousemove', this.resizeMove);
            this.area.addEventListener('mouseup', this.stopDrag);
        },
        resizeMove(e) {
            let dX = e.clientX - this.startX;
            if (this.maxWidth >= this.handleCol.width + dX && this.minWidth <= this.handleCol.width + dX) {
                this.startX = e.clientX;
                this.handleCol.width += dX;
                this.nextCol.width -= dX;
            }
        },
        stopDrag(e) {
            console.log(e.type, 'end');
            this.area.removeEventListener('mousemove', this.resizeMove);
            this.area.removeEventListener('mouseup', this.stopDrag);
        },
        init(data){
            this.tableConfig = data;
        },
        setList(data){
            debugger
            this.data = data;
        }
    },

    mounted() {
        this.area = window;
    },
    components: {
        selectDo
    },
}
</script>
<style type="text/css" scoped>
.resizeIcon {
    position: absolute;
    top: 0px;
    height: 100%;
    width: 5px;
    background:rgba(0,0,0,0);
    z-index: 2;
}

.resizeIcon:hover {
    cursor: w-resize;
}
</style>