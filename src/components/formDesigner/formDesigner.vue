<template>
    <div>
        <div class="flex">
            <div class="leftButtons">
                <div v-for="btn in btns" class="btn" draggable="true" @dragstart="drag($event,btn)">
                    {{btn.text}}
                </div>
            </div>
            <div>
                <div class="designArea" ref="area" @dragover.prevent @drop="drop" @mousedown="areaMouseDown($event)"  >
                    <div  @keyup="show(index,$event)" class="item" style="position:absolute;min-height: 3px;min-width:10px;" :class="{choosed:item.chosen}" v-for="(item,index) in formItems" :style="{left:item.x+'px',top:item.y+'px'}" @click.stop="" @mousedown.stop="itemMouseDown($event,item)" tabindex = "0" >
                        <form-element :value="item"></form-element>
                    </div>
                    <div class="mask">
                        <div v-if="drawing" style="background:rgba(0,0,0,0.3);position:absolute;" :style="{left:chooseRect.startX+'px',top:chooseRect.startY+'px',width:(chooseRect.endX-chooseRect.startX)+'px',
                        height:(chooseRect.endY-chooseRect.startY)+'px'}"></div>
                    </div>
                </div>
                <div>
                    <button @click="save">保存</button>
                </div>
            </div>
            <div class="editBox">
                <div>
                    属性
                </div>
                <div v-if="chooseItems[0]" style="display: flex;">
                    <div style="min-width: 100px;">
                        TEXT：
                    </div>
                    <div>
                        <input type="" name="" v-model="chooseItems[0].value">
                    </div>
                </div>
                <div v-if="chooseItems[0]">
                    宽度：<input type="" name="" v-model="chooseItems[0].width">
                </div>
                <div v-if="chooseItems[0]">
                    高度：<input type="" name="" v-model="chooseItems[0].height">
                </div>
                <div v-if="chooseItems[0]">
                    MultiSelect:<input type="" name="" v-model="chooseItems[0].MultiSelect">
                </div>
                <div v-if="chooseItems[0]">
                    字段名称：<input type="" name="" v-model="chooseItems[0].fieldName">
                </div>
                <div v-if="chooseItems[0]">
                    数据源表名称：<input type="" name="" v-model="chooseItems[0].tableName">
                </div>
                <div v-if="chooseItems[0]">
                    字典表名称：<input type="" name="" v-model="chooseItems[0].dictTableName">
                </div>
                <div v-if="chooseItems[0]">
                    字典录入筛选条件：<input type="" name="" v-model="chooseItems[0].dictSelect">
                </div>
                <div v-if="chooseItems[0]">
                    字典显示字段名称：<input type="" name="" v-model="chooseItems[0].dictShowFiled">
                </div>
                <div v-if="chooseItems[0]">
                    字典字段名称：<input type="" name="" v-model="chooseItems[0].dictField">
                </div>
                <div v-if="chooseItems[0]">
                    BorderStyle:<input type="" name="" v-model="chooseItems[0].borderStyle">
                </div>
                <div v-if="chooseItems[0]">
                    是否可编辑:<input type="" name="" v-model="chooseItems[0].isEdit">
                </div>
                <div v-if="chooseItems[0]">
                    字体颜色:<input type="" name="" v-model="chooseItems[0].ForeColor">
                </div>
                <div v-if="chooseItems[0]">
                    isReadOnly:<input type="" name="" v-model="chooseItems[0].isReadOnly">
                </div>
                <div v-if="chooseItems[0]">
                    格式化字符串:<input type="" name="" v-model="chooseItems[0].strFormat">
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import formElement from '@/components/formElement/formElement.vue';
export default {
    name: 'login',
    data() {
        return {
            formItems: [],
            btns: [{
                text: '自动获取',
                type: 'autoInput',
                value: '输入文字',
                selectKeyfield:'id',
            },
            {
                text: '文本控件',
                type: 'title',
                value: '输入文字',
                width:'80',
            },{
                text: '文本',
                type: 'text',
                value: '输入文字',
                width:'80',
                fieldName:'',
                tableName:'',
            }, {
                text: '输入框',
                type: 'input',
                width:'80',
                fieldName:'',
                tableName:'',
                dictTableName:'',
                dictSelect:'',
                dictShowFiled:'',
                dictField:'',
                borderStyle:'',
                value:'',
                isEdit:true,
                ForeColor:'blue',
                MultiSelect:false,//真为多选，假为单选
                isReadOnly:true,
                strFormat:true,//格式化字符串
                
            }, {
                text: '单选',
                type: 'radio'
            }, {
                text: '多选',
                type: 'checkbox'
            }, {
                text: '横线',
                type: 'line',
                width: '100'
            }, {
                text: '竖线',
                type: 'verticalLine',
                height: '100'
            },{
                text:"文本区",
                type:"textarea",
                height:"100",
                width:"300"
            }],
            handleItem: {},
            offsetX: '',
            offsetY: '',
            chooseItems: [],
            chooseRect: {},
            area: '',
            chooseMode: false,
            domItems: [],
            currentItem: {},
            startX: '',
            startY: '',
            dragX: '',
            dragY: '',
            drawing: false,
        }
    },
    methods: {
        itemClick() {

        },
        itemMouseDown(e, currentItem) {
            this.dragX = e.clientX;
            this.dragY = e.clientY;
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            this.$set(this.$data, 'startX', e.clientX);
            this.$set(this.$data, 'startY', e.clientY);
            this.currentItem = currentItem;
            this.area.addEventListener('mousemove', this.areaMouseMove);
            this.area.addEventListener('mouseup', this.areaMouseUp);
        },
        keyD(e) {
            if (e.key == 'Shift') {
                this.chooseMode = true;
            }
        },
        keyU(e) {
            if (e.key == 'Shift') {
                this.chooseMode = false;
            }
        },
        areaMouseMove(e) {
            let dX = e.clientX - this.startX;
            let dY = e.clientY - this.startY;

            for (var i = 0; i < this.chooseItems.length; i++) {
                this.chooseItems[i].x = this.chooseItems[i].x + dX;
                this.chooseItems[i].y = this.chooseItems[i].y + dY;
            }
            this.$set(this.$data, 'startX', e.clientX);
            this.$set(this.$data, 'startY', e.clientY);
        },
        areaMouseUp(e) {
            if (this.dragX == e.clientX && this.dragY == e.clientY) {
                //console.log('click');
                this.itemChoose(e, this.currentItem)
            }
            this.area.removeEventListener('mousemove', this.areaMouseMove);
            this.area.removeEventListener('mouseup', this.areaMouseUp);
            // let dX = e.clientX-this.startX;
            // let dY = e.clientY-this.startY;
            // let chooseItems = this.chooseItems;
            // for (var i = 0; i < chooseItems.length; i++) {
            //     chooseItems[i].x += dX;
            //     chooseItems[i].y += dY;
            // }
            //console.log(JSON.stringify(this.chooseItems));
            this.currentItem = {};

        },
        areaMouseDown(e) {
            this.chooseItems = [];
            this.drawing = true;
            this.drawStartX = e.clientX;
            this.drawStartY = e.clientY;
            this.area.addEventListener('mousemove', this.drawMove);
            this.area.addEventListener('mouseup', this.drawEnd);
            // this.chooseRect.startX = e.clientX-200;
            // this.chooseRect.startY = e.clientY;

            this.$set(this.$data.chooseRect, 'startX', e.clientX - 200);
            this.$set(this.$data.chooseRect, 'startY', e.clientY);
        },
        drawMove(e) {
            this.$set(this.$data.chooseRect, 'endX', e.clientX - 200);
            this.$set(this.$data.chooseRect, 'endY', e.clientY);
            // this.chooseRect.endX = e.clientX-200;
            // this.chooseRect.endY = e.clientY;
        },
        drawEnd(e) {
            if(this.drawStartX == e.clientX&&this.drawStartY == e.clientY){
                this.clearClick(e);
            }
            for (var i = 0; i < this.formItems.length; i++) {
                if ((this.formItems[i].x > this.chooseRect.startX) && (this.formItems[i].x < this.chooseRect.endX)
                    &&(this.formItems[i].y > this.chooseRect.startY) && (this.formItems[i].y < this.chooseRect.endY)) {
                    this.chooseItems.push(this.formItems[i]);
                    //console.log(this.formItems[i].chosen);
                    this.formItems[i].chosen = true;
                }
            }
            this.chooseRect = {};
            this.drawing = false;
            this.area.removeEventListener('mousemove', this.drawStart);
            this.area.removeEventListener('mouseup', this.drawEnd);
            //console.log(this.chooseRect);

        },
        clearClick(e) {
            // console.log('click');
            this.chooseItems = [];
            for (var i = this.formItems.length - 1; i >= 0; i--) {
                //debugger
                this.formItems[i].chosen = false;
            }
            e.preventDefault();
        },
        itemChoose(e, item) {
            if (this.chooseMode) {
                this.chooseItems.push(item);
                //console.log('长度:' + this.chooseItems.length);
                // debugger
                // this.domItems.push(e.currentTarget)
                item.chosen = true;
                e.preventDefault();
            } else {
                if (this.chooseItems[0]) {
                    //debugger
                    this.chooseItems[0].chosen = false;
                }
                this.chooseItems = [item];
                // this.domItems = [e.currentTarget];
                item.chosen = true;
            }
        },
        drag(e, btn) {
            // debugger
            let obj = JSON.stringify(btn);
            e.dataTransfer.setData('data', obj);
        },
        drop: function(e) {
            if (this.handleItem.type) {
                this.handleItem.x = e.clientX - 200 - this.offsetX;
                this.handleItem.y = e.clientY - this.offsetY;
                this.handleItem = {};
            } else {
                let data = JSON.parse(e.dataTransfer.getData('data'));
                data.x = e.clientX - 200 - this.offsetX;
                data.y = e.clientY - this.offsetY;
                this.formItems.push(data);
                this.handleItem = {};
            }
        },
        save(){
            let params = {
                 formContent:JSON.stringify(this.formItems),
                 formName:"麻醉记录单",
                 id:2
            }
            this.api.updateMedFormContent(params)
             .then(
                res=>{
                     
                }); 
        },
        selectMedFormTemp(){
            let params = {
                 formName:"麻醉记录单",
                 id:2
            }
            this.api.selectMedFormTemp(params)
             .then(
                res=>{
                    this.formItems= JSON.parse(res.formContent);
                });
        },

         show(index,ev){
             if(ev.keyCode==46){
              this.formItems.splice(index,1);
            }
        }

    },
    components: {
        formElement
    },
    mounted() {
        this.area = this.$refs.area;
        this.selectMedFormTemp();
        
    },  
    created() {
        let component = this;
        document.onkeydown = function(e) {
            component.keyD(e);
        }
        document.onkeyup = function(e) {
            component.keyU(e);
        }
    }
}

</script>
<style type="text/css" scoped>
.mask {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    pointer-events: none;
}

.item.choosed {
    border: 1px dashed #000;
}

.item:hover {
    background: #E6E6E6;
    cursor: pointer;
}

.leftButtons {
    width: 200px;
}

.btn {
    background: #00FFFF;
    margin-top: 10px;
    /*width: 50px;*/
    text-align: center;
}

.designArea {
    position: relative;
   /* background: #CCCCCC;*/
    height: 600px;
    width: 900px;
}

</style>
