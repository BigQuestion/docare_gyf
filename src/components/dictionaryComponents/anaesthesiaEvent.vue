<template>
    <div style="height:65%;">
        <div style="display: flex;height: 100%;background:white;margin:10px;">
            <!-- 显示类别 -->
            <div style="box-sizing:border-box;height: 100%;width: 30%;overflow-x: auto;padding-top:5px;border-right: 2px solid rgb(177,207,243);">
                <ul v-for="item in eventChildData">
                    <li style="cursor:pointer;" @click="getTypeDetail(item)">
                        <div style="margin-left: 20px;">{{item.typeName}}</div>
                    </li>
                </ul>
            </div>
            <!-- 显示详细内容 -->

            <div style="width: 70%;height:100%;margin-top:5px;overflow-y: auto;">
                <div style="display: flex;margin-left: 10px;width:3000px;">
                    <div style="width: 160px;border:1px solid rgb(177,207,243);" v-for="cell in contentConfig">{{cell.text}}</div>
                </div>
                <div v-for="list in commonTypeList" style="display: flex;margin-left: 10px;" @click="getItem(list)">
                    <div v-for="cl in contentConfig" style="width: 160px;border:1px solid rgb(177,207,243);">
                        <div style="height:100%;width:160px;" v-if="cl.status=='inable'">
                            <input v-if="list.writeAble" type="text" v-model="list[cl.value]" @blur="inputBlur(list)" @change="change" style="display:block;width:100%;border:0;height:100%;outline:none;">
                            <input v-if="!list.writeAble" type="text" v-model="list[cl.value]" @click="valueWriteAble(list)" style="display:block;width:100%;border:0;height:100%;outline:none;">
                        </div>
                        <div style="width:160px;" v-if="cl.status!='inable'">
                            {{list[cl.value]}}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div style="text-align: right;margin-right: 30px;">
            <button style="width: 100px;height: 30px;" @click="addMedAnesthesiaInputDict" :disabled="isAdd">新增</button>
            <button style="width: 100px;height: 30px;" :disabled="isSave" @click="saveValue">保存</button>
            <button style="width: 100px;height: 30px;" @click="cancleEdit" :disabled="isCancle">取消</button>
            <button style="width: 100px;height: 30px;" :disabled="isDelete" @click="deleteByMedAnesthesiaInputDict">删除</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            comTypeList: [],
            tempTypeItem: "",
            isAdd: true,
            obj: "",
            isSave: true,
            isCancle: true,
            isDelete: true,
            contentConfig: [
                {
                    text: "序号",
                    value: "itemNo"

                },
                {
                    text: "事件分类",
                    value: "itemClass"
                },
                {
                    text: "事件名称",
                    value: "itemName",
                    status: "inable"
                },
                {
                    text: "药品规格",
                    value: "itemSpec",
                    status: "inable"
                },
                {
                    text: "收费分类",
                    value: "relBill",
                    status: "inable"
                },
                {
                    text: "剂量",
                    value: "dosage",
                    status: "inable"
                },
                {
                    text: "单位",
                    value: "dosageUnits",
                    status: "inable"
                },
                {
                    text: "浓度",
                    value: "concentration",
                    status: "inable"
                },
                {
                    text: "单位",
                    value: "concentrationUnit",
                    status: "inable"
                },
                {
                    text: "用药速度",
                    value: "performSpeed",
                    status: "inable"
                },
                {
                    text: "流速单位",
                    value: "speedUnit",
                    status: "inable"
                },
                {
                    text: "途径",
                    value: "administrator",
                    status: "inable"
                },
                {
                    text: "持续",
                    value: "durativeIndicator",
                    status: "inable"
                },
            ],
            commonTypeList: [],
        }
    },
    props: [
        'eventChildData'
    ],
    methods: {
        inputBlur(list) {
            console.log('失去焦点')
            console.log(list)
            list.writeAble = false;
        },
        valueWriteAble(list) {
            console.log('点击')
            console.log(list)
            this.obj = list;
            list.writeAble = true;
        },
        getTypeDetail(item) {
            this.tempTypeItem = item;
            this.isAdd = false;
            let params = {
                itemClass: item.typeId
            }
            this.api.medAnesthesiaEventOpenByItemClass(params)
                .then(
                res => {
                    // var m = res.list.length;
                    console.log(res.list)
                    // for (var i = 0; i < m; i++) {
                    // res.list[i].newItemName = res.list[i].itemName;
                    // res.list[i].newItemCode = res.list[i].itemCode;
                    // }
                    this.commonTypeList = res.list;
                });
        },
        addMedAnesthesiaInputDict() {
            console.log(this.tempTypeItem)
            this.commonTypeList.push({
                itemNo: this.commonTypeList.length + 1,
                itemClass: this.tempTypeItem.typeId,
                itemName: '',
                itemSpec: "",
                itemSpec: "",
                relBill: "",
                dosage: "",
                dosageUnits: "",
                concentration: "",
                concentrationUnit: ""
            });
            this.isAdd = this.isCancle;
            this.isCancle = !this.isAdd;
            console.log(this.commonTypeList);
            console.log(this.isSave)
        },
        cancleEdit() {
            this.getTypeDetail(this.tempTypeItem);
            this.isCancle = this.isAdd;
            this.isAdd = !this.isCancle;
            this.isSave = true;
        },
        change() {
            this.isSave = false;

            console.log(this.isSave)
        },
        saveValue() {
            var li = this.commonTypeList;
            var k = li.length - 1;
            let params = {};
            console.log(li)
            params = {
                itemNo: li[k].itemNo,
                itemClass: li[k].itemClass,
                itemName: li[k].itemName,
                itemSpec: li[k].itemSpec,
                relBill: li[k].relBill,
                dosage: li[k].dosage,
                dosageUnits: li[k].dosageUnits,
                concentration: li[k].concentration,
                concentrationUnit: li[k].concentrationUnit,
            };
            console.log(params)
            this.api.insertMedAnesthesiaEventOpen(params)
                .then(
                res => {
                    this.getTypeDetail(this.tempTypeItem);

                });
            // for (var i = 0; i < k; i++) {
            // if ((li[i].newItemName != li[i].itemName || li[i].newItemCode != li[i].itemCode) && li[i].itemName != "") {
            // params.push({
            //     itemClass: li[i].itemClass,
            //     oldItemName: li[i].itemName,
            //     itemName: li[i].newItemName,
            //     itemCode: li[i].newItemCode,
            // });
            // }
            // if (li[i].itemName == "" && li[i].itemCode == "") {
            //     let params1 = {
            //         itemClass: li[i].itemClass,
            //         oldItemName: li[i].itemName,
            //         itemName: li[i].newItemName,
            //         itemCode: li[i].newItemCode,
            //         serialNo: this.commonTypeList.length - 1
            //     }
            //     this.api.insertMedAnesthesiaInputDict(params1)
            //         .then(
            //         res => {
            //             this.getTypeDetail(this.tempTypeItem);
            //         });
            // }
            // debugger
            // if (params.length > 0) {

            // }
            // }


            this.isCancle = true;
            this.isAdd = false;
            this.isSave = true;
        },
        deleteByMedAnesthesiaInputDict() {

            console.log(this.obj.itemNo);
            let params = {
                itemNo: this.obj.itemNo,
                itemClass: this.obj.itemClass,
            }
            this.api.deleteByMedAnesthesiaInputDict(params)
                .then(
                res => {
                    this.getTypeDetail(this.tempTypeItem);
                });
        },
        getItem(item) {
            this.obj = item;
            this.isDelete = false;
        },
    }
}
</script>
<style scoped>

</style>
