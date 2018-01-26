<template>
    <div style="height: calc(100% - 30px);background-color: #F0F0F0;">
        <div style="height:50px;width:100%;background-color:rgb(85,126,180);">
            <div style="height:20px;width:100%;"></div>
            <div class="outBox">
                <div @click="save" title="保存" class="buttonOfTop">
                    <img src="../../assets/save.png" alt="">
                </div>
                <div @click="leftMove(dataIncurrentIten)" title="左移" class="buttonOfTop">
                    <img src="../../assets/leftMove.png" alt="">
                </div>
                <div @click="rightMove(dataIncurrentIten)" title="右移" class="buttonOfTop">
                    <img src="../../assets/rightMove.png" alt="">
                </div>
                <div @click="topMove(dataIncurrentIten)" title="上移" class="buttonOfTop">
                    <img src="../../assets/topMove.png" alt="">
                </div>
                <div @click="bottomMove(dataIncurrentIten)" title="下移" class="buttonOfTop">
                    <img src="../../assets/bottomMove.png" alt="">
                </div>
                <div v-if="dataInCanDelete" @click="deleteFun(deleteDataDom)" title="删除" class="buttonOfTop">
                    <img src="../../assets/canDelete.png" alt="">
                </div>
                <div v-else title="删除" class="buttonOfTop">
                    <img src="../../assets/cantDelete.png" alt="">
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="leftButtons">
                <div v-for="btn in btns" class="btn" draggable="true" @dragstart="drag($event,btn)">
                   <img src="../../assets/gear.png" alt="">
                   <span>{{btn.text}}</span>
                </div>
            </div>
            <div class="autoBox">
                <div class="designArea" ref="area" @dragover.prevent @drop="drop" @mousedown="areaMouseDown($event)">
                    <div @keyup="show(index,$event)" class="item" style="position:absolute;min-height: 19px;min-width:10px;" :class="{choosed:item.chosen}" v-for="(item,index) in formItems" :style="{left:item.x+'px',top:item.y+'px'}" @click.stop="" @mousedown.stop="itemMouseDown($event,item,index)" tabindex="0">
                        <form-element :value="item" :isPage="dataInfo"></form-element>
                    </div>
                    <div class="mask">
                        <div v-if="drawing" style="background:rgba(0,0,0,0.3);position:absolute;" :style="{left:chooseRect.startX+'px',top:chooseRect.startY+'px',width:(chooseRect.endX-chooseRect.startX)+'px',height:(chooseRect.endY-chooseRect.startY)+'px'}"></div>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row-reverse;padding-top:10px;">
                    <button @click="save">保存</button>
                </div>
            </div>
            <div class="editBox">
                <div class="antherEdiBox">
                    <div style="box-sizing:border-box;padding-left:5px;">
                        属性
                    </div>
                    <div v-if="chooseItems[0]" class="ediclass">
                        <div class="ediChild">
                            TEXT：
                        </div>
                        <input type="" name="" v-model="chooseItems[0].value">
                    </div>
                    <div v-if="chooseItems[0]" class="ediclass">
                        <div class="ediChild">
                            宽度：
                        </div>
                        <input type="" name="" v-model="chooseItems[0].width">
                    </div>
                    <div v-if="chooseItems[0]" class="ediclass">
                        <div class="ediChild">
                            高度：
                        </div>
                        <input type="" name="" v-model="chooseItems[0].height">
                    </div>
                    <div v-if="chooseItems[0]" class="ediclass">
                        <div class="ediChild">
                            BorderStyle:
                        </div>
                        <input type="" name="" v-model="chooseItems[0].borderStyle">
                    </div>
                    <div v-if="chooseItems[0]" class="ediclass">
                        <div class="ediChild">
                            Opacity：
                        </div>
                        <input type="" name="" v-model="chooseItems[0].opacity">
                    </div>

                    <!-- <div v-if="chooseItems[0]" class="ediclass">
                                                                    <div class="ediChild">
                                                                        TopMost：
                                                                    </div>
                                                                    <select style="min-width:160px;" name="" id="" v-on:change="selectData(chooseItems[0].topMost,'isData',chooseItems[0].topMostMode)" v-model="chooseItems[0].topMostMode">
                                                                        <option v-for="btn in chooseItems[0].topMost" :value="btn.isData">{{btn.isData}}</option>
                                                                    </select>
                                                                </div> -->
                    <!-- <div v-if="chooseItems[0]" class="ediclass">
                                                                                    <div class="ediChild">
                                                                                        Font:
                                                                                    </div>
                                                                                    <input type="text">
                                                                                    <button @click="fontDataChange" style="width:20px;border-radius:0;display:inline-block;">...</button>
                                                                                </div> -->
                    <div v-if="chooseItems[0]" class="ediclass">
                        <!-- isReadOnly:<input type="" name="" v-model="chooseItems[0].isReadOnly"> -->
                        <div class="ediChild">
                            Cursor:
                        </div>
                        <select style="min-width:173px;" name="" id="" v-on:change="selectData(chooseItems[0].cursor,'isData',chooseItems[0].cursorMode)" v-model="chooseItems[0].cursorMode">
                            <option v-for="btn in chooseItems[0].cursor" :value="btn.isData">{{btn.isData}}</option>
                        </select>
                    </div>
                    <div v-if="chooseItems[0]&&chooseItems[0].type=='input'">
                        <div v-if="chooseItems[0]" class="ediclass">
                            <!-- 字体颜色:<input type="" name="" v-model="chooseItems[0].ForeColor"> -->
                            <div class="ediChild">
                                字体颜色:
                            </div>
                            <colorPicker v-model="chooseItems[0].ForeColor"></colorPicker>{{chooseItems[0].ForeColor}}
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <!-- isReadOnly:<input type="" name="" v-model="chooseItems[0].isReadOnly"> -->
                            <div class="ediChild">
                                isReadOnly:
                            </div>
                            <select style="min-width:173px;" name="" id="" v-on:change="selectData(chooseItems[0].isReadOnly,'isData',chooseItems[0].readOnlyMode)" v-model="chooseItems[0].readOnlyMode">
                                <option v-for="btn in chooseItems[0].isReadOnly" :value="btn.isData">{{btn.isData}}</option>
                            </select>
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <!-- 是否可编辑:<input type="" name="" v-model="chooseItems[0].isEdit"> -->
                            <div class="ediChild">
                                是否可编辑:
                            </div>
                            <select style="min-width:173px;" name="" id="" v-on:change="selectData(chooseItems[0].isEdit,'isData',chooseItems[0].isEditMode)" v-model="chooseItems[0].isEditMode">
                                <option v-for="btn in chooseItems[0].isEdit" :value="btn.isData">{{btn.isData}}</option>
                            </select>
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <!-- MultiSelect:<input type="" name="" v-model="chooseItems[0].MultiSelect"> -->
                            <div class="ediChild">
                                MultiSelect:
                            </div>
                            <select style="min-width:173px;" name="" id="" v-on:change="selectData(chooseItems[0].MultiSelect,'isData',chooseItems[0].MultiSelectMode)" v-model="chooseItems[0].MultiSelectMode">
                                <option v-for="btn in chooseItems[0].MultiSelect" :value="btn.isData">{{btn.isData}}</option>
                            </select>
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <!-- 是否可编辑:<input type="" name="" v-model="chooseItems[0].isEdit"> -->
                            <div class="ediChild">
                                是否可为空:
                            </div>
                            <select style="min-width:173px;" name="" id="" v-on:change="selectData(chooseItems[0].nullString,'isData',chooseItems[0].nullStringMode)" v-model="chooseItems[0].nullStringMode">
                                <option v-for="btn in chooseItems[0].nullString" :value="btn.isData">{{btn.isData}}</option>
                            </select>
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <div class="ediChild">
                                数据源表名称：
                            </div>
                            <input type="" name="" v-model="chooseItems[0].tableName">
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <div class="ediChild">
                                字段名称：
                            </div>
                            <input type="" name="" v-model="chooseItems[0].fieldName">
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <div class="ediChild">
                                字典表名称：
                            </div>
                            <input type="" name="" v-model="chooseItems[0].dictTableName">
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <div class="ediChild">
                                字典录入筛选条件：
                            </div>
                            <input type="" name="" v-model="chooseItems[0].dictSelect">
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <div class="ediChild">
                                字典显示字段名称：
                            </div>
                            <input type="" name="" v-model="chooseItems[0].dictShowFiled">
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <div class="ediChild">
                                字典字段名称：
                            </div>
                            <input type="" name="" v-model="chooseItems[0].dictField">
                        </div>
                        <div v-if="chooseItems[0]" class="ediclass">
                            <!-- 格式化字符串:<input type="" name="" v-model="chooseItems[0].strFormat"> -->

                            <div class="ediChild">
                                格式化字符串:
                            </div>
                            <select style="min-width:173px;" name="" id="" v-on:change="selectData(chooseItems[0].strFormat,'isData',chooseItems[0].strFormatMode)" v-model="chooseItems[0].strFormatMode">
                                <option v-for="btn in chooseItems[0].strFormat" :value="btn.isData">{{btn.isData}}</option>
                            </select>
                        </div>
                    </div>

                    <div v-if="chooseItems[0]&&chooseItems[0].type=='checkBoxAll' ">
                        <div class="ediclass">
                            <div class="ediChild">
                                SourceFieldName:
                            </div>
                            <input v-model="chooseItems[0].SourceFieldName">
                        </div>
                        <div class="ediclass">
                            <div class="ediChild">
                                SourceTableName:
                            </div>
                            <input v-model="chooseItems[0].SourceTableName">
                        </div>
                        <div class="ediclass">
                            <div class="ediChild">
                                DefaultItems：
                            </div>
                            <input onpaste="return false" ondragenter="return false" onkeypress="javascript:return false" v-model="chooseItems[0].defaultItems" v-on:input="changeDefaultValue" @dblclick="addDefaultItem">
                        </div>
                        <div class="ediclass">
                            <div class="ediChild">
                                MultiSelect:
                            </div>
                            <select style="min-width:173px;" name="" id="" v-on:change="selectData(chooseItems[0].MultiSelect,'isData',chooseItems[0].MultiSelectMode)" v-model="chooseItems[0].MultiSelectMode">
                                <option v-for="btn in chooseItems[0].MultiSelect" :value="btn.isData">{{btn.isData}}</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div style="width:100%;height:100px;background-color:rgb(85,126,180);">

        </div>
        <fontPlug :fatherToChild="fontNoneData" v-if="fontNoneData.noneData"></fontPlug>
        <div v-if="defaultItemView" @click="atherPlacFuntion" class="imposi">
            <div class="fontBox" @click.stop="noFunction" :class="{animation:clickAtherPlace}">
                <div class="fontTop">
                    <span>集合编辑器</span>
                    <div @click="functionNone" class="font_active">X</div>
                </div>
                <div style="display: flex;margin-top: 40px;">
                    <div style="margin-right: 30px;margin-left: 10px;">
                        <div style="height: 150px;width: 200px;background:white;">
                            <div class="itemChooseInClick" v-for="(item,index) in chooseItemsTemp.listData" @click="getClickItem(item,index)">
                                {{item.ItemName}}({{item.ItemValue}})
                            </div>
                        </div>
                        <div style="width: 200px;">
                            <button @click="addDefaultItemCon">增加</button>
                            <button @click="deleteItem">移除</button>
                        </div>
                        <div style="width: 200px;">
                            <button @click="addDefaultItemCon">确定</button>
                            <button @click="cancleAddDefaultItem">取消</button>
                        </div>
                    </div>
                    <div style="width: 250px;background:white;">
                        <div v-if="selectItemCon">
                            <div>
                                ItemName:<input v-model="selectItemCon.ItemName" style="width: 100px;" @change="setChangeItem">
                            </div>
                            <div>
                                ItemValue:<input v-model="selectItemCon.ItemValue" style="width: 100px;" @change="setChangeItem">
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import formElement from '@/components/formElement/formElement.vue';
import colorPicker from '@/components/colorPicker/colorPicker.vue';
import fontPlug from '@/components/fontPlug/fontPlug.vue';
export default {
    name: 'login',
    data() {
        return {
            formItems: [],
            btns: [{
                text: '自动获取',
                type: 'autoInput',
                value: '输入文字',
                selectKeyfield: 'id',
                ForeColor: '#000',
            },
            {
                text: '文本控件',
                type: 'title',
                value: '输入文字',
                width: '80',
                ForeColor: '#000',
                height: '',
            }, {
                text: '文本',
                type: 'text',
                value: '输入文字',
                width: '80',
                height: '',
                fieldName: '',
                tableName: '',
                ForeColor: '#0000FF',
                borderStyle: '1px solid #222',
            }, {
                text: '输入框',
                type: 'input',
                width: '80',
                fieldName: '',
                tableName: '',
                dictTableName: '',
                dictSelect: '',
                dictShowFiled: '',
                dictField: '',
                borderStyle: '1px solid #222',
                value: '',
                ForeColor: '#0000FF',
                opacity: 1,
                MultiSelect: [{ isData: 'true' }, { isData: 'false' }],//真为多选，假为单选
                MultiSelectMode: 'false',//真为多选，假为单选
                isReadOnly: [{ isData: 'true' }, { isData: 'false' }],
                readOnlyMode: 'false',
                isEdit: [{ isData: 'true' }, { isData: 'false' }],
                isEditMode: 'true',
                strFormat: [{ isData: 'true' }, { isData: 'false' }],//格式化字符串
                strFormatMode: 'false',//格式化字符串
                nullString: [{ isData: 'true' }, { isData: 'false' }],//真可以为空，假不能为空
                topMostMode: 'false',
                topMost: [{ isData: 'true' }, { isData: 'false' }],
                nullStringMode: 'true',
                cursor: [
                    { isData: 'auto' },
                    { isData: 'ibeam' },
                    { isData: 'pointer' },
                    { isData: 'wait' },
                    { isData: 'not-allowed' },
                    { isData: 'text' },
                ],
                cursorMode: 'auto',

            }, {
                text: '单选',
                type: 'radio'
            }, {
                text: '多选',
                type: 'checkbox'
            }, {
                text: '横线',
                type: 'line',
                width: '100',
                ForeColor: '#0000FF',
            }, {
                text: '竖线',
                type: 'verticalLine',
                height: '100',
            }, {
                text: "文本区",
                type: "textarea",
                height: "100",
                width: "300",
                ForeColor: '#0000FF',
            }, {
                text: "表格组件",
                type: "formDiv",
            }, {
                text: "自定义控件",
                type: "checkBoxAll",
                defaultItems: "集合",
                SourceFieldName: "",
                SourceTableName: "",
                listData: [],
                MultiSelect: [{ isData: 'true' }, { isData: 'false' }],
                MultiSelectMode: 'false',

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
            fontNoneData: { noneData: false },
            defaultItemView: false,
            selectItemCon: '',
            chooseItemsTemp: '',
            clickAtherPlace: false,
            dataIncurrentIten: '',
            dataInCanDelete: false,
            deleteDataDom: '',
        }
    },
    methods: {
        selectData(obj, paramName, value) {
            // obj[paramName] = isData;
            console.log(obj)//数组名字
            console.log(paramName)//参数名字
            console.log(value)//参数值

        },
        itemClick() {

        },
        itemMouseDown(e, currentItem, index) {
            this.dragX = e.clientX;
            this.dragY = e.clientY;
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            this.$set(this.$data, 'startX', e.clientX);
            this.$set(this.$data, 'startY', e.clientY);
            this.currentItem = currentItem;
            this.area.addEventListener('mousemove', this.areaMouseMove);
            this.area.addEventListener('mouseup', this.areaMouseUp);
            console.log(e)
            console.log(currentItem)
            this.dataIncurrentIten = currentItem;
            this.deleteDataDom = index;
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
            this.dataInCanDelete = false;
            console.log('dian了其他地方')
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
            if (this.drawStartX == e.clientX && this.drawStartY == e.clientY) {
                this.clearClick(e);
            }
            for (var i = 0; i < this.formItems.length; i++) {
                if ((this.formItems[i].x > this.chooseRect.startX) && (this.formItems[i].x < this.chooseRect.endX)
                    && (this.formItems[i].y > this.chooseRect.startY) && (this.formItems[i].y < this.chooseRect.endY)) {
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
            this.dataInCanDelete = true;
            console.log('dian')
            console.log(e)
            console.log(item)
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
        save() {
            if (this.dataInfo) {
                let params = {
                    formContent: JSON.stringify(this.formItems),
                    formName: this.dataInfo.formName,
                    id: this.dataInfo.id
                }
                this.api.updateMedFormContent(params)
                    .then(
                    res => {
                        this.selectMedFormTemp();
                    });
            }
            else {

            }

        },
        selectMedFormTemp() {
            if (this.dataInfo) {
                let params = {
                    formName: this.dataInfo.formName,
                    id: this.dataInfo.id
                }
                this.api.selectMedFormTemp(params)
                    .then(
                    res => {
                        if (res.formContent == "null" || res.formContent == null) {
                            this.formItems = [];
                        }
                        else {
                            this.formItems = JSON.parse(res.formContent);
                        }

                    });
            }
        },
        show(index, ev) {
            if (ev.keyCode == 46) {
                this.formItems.splice(index, 1);
            }
        },
        // 顶部按钮删除
        deleteFun(indata) {
            this.formItems.splice(indata, 1);
            this.dataInCanDelete = false;
        },

        fontDataChange() {
            this.fontNoneData.noneData = !this.fontNoneData.noneData;
        },
        changeDefaultValue() {
            this.chooseItems[0].defaultItems = "集合";
        },
        //显示集合里面配置项
        addDefaultItem() {
            this.chooseItemsTemp = this.chooseItems[0];
            this.defaultItemView = true;
        },
        cancleAddDefaultItem() {
            this.defaultItemView = false;
        },
        functionNone() {
            this.defaultItemView = false;
        },
        atherPlacFuntion() {
            this.clickAtherPlace = !this.clickAtherPlace;
            setTimeout(() => {
                this.clickAtherPlace = !this.clickAtherPlace;
            }, 1000);
        },
        noFunction() {

        },
        //增加集合里面配置内容
        addDefaultItemCon() {
            debugger
            this.chooseItemsTemp.listData.push({ "ItemName": "", "ItemValue": "", "addFlag": true });
            this.selectItemCon = { "ItemName": "", "ItemValue": "", "addFlag": true };
            this.selectItemCon.indexFlag = this.chooseItemsTemp.listData.length - 1;

        },
        //获取当前选中配置项内容
        getClickItem(item, index) {
            debugger
            this.selectItemCon = item;
            this.selectItemCon.indexFlag = index;
        },
        //改变值
        setChangeItem() {
            // debugger
            if (this.selectItemCon.addFlag) {
                this.$set(this.chooseItemsTemp.listData, this.selectItemCon.indexFlag, this.selectItemCon);
            }
            // this.$set(this.chooseItems[0].listData,this.selectItemCon.indexFlag,this.selectItemCon);
        },
        //移除defaultItem
        deleteItem() {
            this.chooseItemsTemp.listData.splice(this.selectItemCon.indexFlag, 1);
            this.dataInCanDelete = false;
        },
        // 左位移
        leftMove(dataIn) {
            console.log(dataIn)
            if (dataIn == '') {

            } else {
                this.$set(dataIn, 'x', dataIn.x - 1);
            }
        },
        // 右位移
        rightMove(dataIn) {
            console.log(dataIn)
            if (dataIn == '') {

            } else {
                this.$set(dataIn, 'x', dataIn.x + 1);
            }
        },
        // 上位移
        topMove(dataIn) {
            console.log(dataIn)
            if (dataIn == '') {

            } else {
                this.$set(dataIn, 'y', dataIn.y + 1);
            }
        },
        // 右位移
        bottomMove(dataIn) {
            console.log(dataIn)
            if (dataIn == '') {

            } else {
                this.$set(dataIn, 'y', dataIn.y + 1);
            }
        },
    },
    components: {
        formElement,
        colorPicker,
        fontPlug
    },
    mounted() {
        this.area = this.$refs.area;
        this.selectMedFormTemp();
    },
    props: ['dataInfo'],
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
.flex {
    padding-top: 5px;
    justify-content: space-between;
}

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
    width: 180px;
    min-width: 150px;
    background-color: #fff;
    margin: 0 10px 10px;
    border: 1px solid #8F9399;
}

.btn {
    margin-top: 5px;
    /*width: 50px;*/
    /* text-align: center; */
    background-color: #fff;
    color: #222;
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
}

.btn:hover {
    background: #778899;
    color: #fff;
}

.btn img{
    width: 15px;
}

.btn span{
    padding-left: 5px;
}

.autoBox {
    width: auto;
    height: auto;
    box-sizing: border-box;
    border: 1px solid #8F9399;
    margin: 0 10px 10px;
    padding: 5px;
    background-color: #fff;
    overflow: auto;
}

.designArea {
    position: relative;
    /* background: #CCCCCC;*/
    height: 600px;
    width: 900px;
    border: 1px solid;
}

.editBox {
    width: 360px;
    background-color: #fff;
    margin: 0 10px 10px;
    padding: 5px 10px 10px;
    border: 1px solid #8F9399;
    transform: rotateY(180deg);
    resize: horizontal;
    overflow: auto;
}

.antherEdiBox {
    transform: rotateY(180deg);
    width: 100%;
    /* min-width: 360px; */
    height: 100%;
    /* padding: 5px 10px 10px; */
    box-sizing: border-box;
    overflow: auto;
}

.ediclass {
    display: flex;
    /* padding: 3px 0; */
    border-right: 1px solid #b4cee7;
    border-left: 1px solid #b4cee7;
    border-top: 1px solid #b4cee7;
    align-items: center;
    min-width: 340px;
}

.ediclass:last-child {
    border-bottom: 1px solid #b4cee7;
}

.ediChild {
    min-width: 150px;
    display: inline-block;
    padding-left: 5px;
}

.imposi {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    width: 100%;
    min-width: 1024px;
    height: 100%;
    min-height: 768px;
}

.fontBox {
    position: absolute;
    z-index: 20;
    /* left: calc(50% - 20%); */
    /* margin-left: -20%; */
    /* top: 50%; */
    /* margin-top: -30%; */
    background: rgb(240, 240, 240);
    border: 1px solid rgb(24, 131, 215);
    cursor: auto;
    box-shadow: 1px 1px 20px #AAA;
    width: 500px;
    min-height: 300px;
    top: 200px;
    left: calc(50% - 250px);
}

.fontTop {
    width: 100%;
    height: 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
}

.font_active {
    width: 35px;
    height: 100%;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: rgb(153, 153, 153);
    font-family: microsoft YaHei;
}

.font_active:hover {
    animation: colorChange 0.5s infinite;
    animation-iteration-count: 1;
    color: #fff;
    background-color: rgb(232, 17, 35);
}

.font_active:active {
    background-color: rgb(241, 112, 112);
    color: #fff;
}

@keyframes colorChange {
    from {
        background-color: rgb(225, 225, 225);
    }
    to {
        background-color: rgb(232, 17, 35);
    }
}

.animation {
    animation: backShadow 0.2s linear;
    animation-iteration-count: 5;
}

@keyframes backShadow {
    25% {
        box-shadow: 1px 1px 20px #AAA;
        border: 1px solid #AAA;
    }
    50% {
        box-shadow: 1px 1px 10px #AAA;
        border: 1px solid rgb(24, 131, 215);
    }
    75% {
        box-shadow: 1px 1px 20px #AAA;
        border: 1px solid #AAA;
    }
    100% {
        box-shadow: 1px 1px 10px #AAA;
        border: 1px solid rgb(24, 131, 215);
    }
}

.itemChooseInClick {
    box-sizing: border-box;
    padding-left: 5px;
    display: flex;
    width: 100%;
    cursor: pointer;
}

.itemChooseInClick:hover {
    background-color: #0078D7;
    color: #fff;
}











/* 顶部功能按钮样式 */

.buttonOfTop {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(000, 000, 000, 0);
    box-sizing: border-box;
}

.buttonOfTop:hover {
    animation: borderAndBack 0.2s linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

@keyframes borderAndBack {
    from {
        border: 0px;
        opacity: 0;
    }
    to {
        opacity: 1;
        border: 1px solid #C89F3A;
        background: linear-gradient(#FCF7E3, #F6E9A6, #F3DA55, #E3C760);
    }
}

.outBox {
    width: 500px;
    height: 30px;
    border-radius: 5px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    background: url('../../assets/bopbar.jpg')no-repeat;
    background-size: cover;
}

.buttonOfTop img {
    width: 20px;
    height: 20px;
    display: block;
    margin: 3px auto 0;
    position: relative;
}
</style>
