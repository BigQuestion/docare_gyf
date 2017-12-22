<template>
    <div style="height:65%;background:white;">
        <div style="height: 100%;margin:10px;">
            <!-- 显示类别 -->
            <!-- <div style="box-sizing:border-box;height: 100%;width: 30%;overflow-x: auto;padding-top:5px;border-right: 2px solid rgb(177,207,243);">
                                <ul v-for="item in eventChildData">
                                    <li style="cursor:pointer;" @click="getTypeDetail(item)">
                                        <div style="margin-left: 20px;">{{item.typeName}}</div>
                                    </li>
                                </ul>
                            </div> -->
            <!-- 显示详细内容 -->
            <div style="display: flex;width:100%;padding-right:20px;box-sizing:border-box;">
                <div style="width: 25%;border:1px solid rgb(177,207,243);" v-for="cell in contentConfig">{{cell.text}}</div>
            </div>
            <div style="width: 100%;height:90%;margin-top:5px;overflow-y: auto;">
                <div v-for="list in commonTypeList" style="display: flex;">
                    <div v-for="cl in contentConfig" style="width: 25%;border:1px solid rgb(177,207,243);">
                        <div style="height:100%;width:100%;" v-if="cl.status=='inable'">
                            <input v-if="writeAble" type="text" v-model="list[cl.value]" @blur="inputBlur(list)" @change="change" style="display:block;width:100%;border:0;height:100%;outline:none;">
                            <input v-if="!writeAble" type="text" v-model="list[cl.value]" @click="valueWriteAble(list)" style="display:block;width:100%;border:0;height:100%;outline:none;">
                        </div>
                        <div style="width:100%;" v-if="cl.status!='inable'">
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
            obj:"",
            isAdd: false,
            isSave: true,
            isCancle: true,
            isDelete: true,
            writeAble: false,
            contentConfig: [
                {
                    text: "序号",
                    value: "serialNo"

                },
                {
                    text: "编码",
                    value: "anaesthesiaCode",
                    status: "inable"
                },
                {
                    text: "名称",
                    value: "anaesthesiaName",
                    status: "inable"
                },
                {
                    text: "输入码",
                    value: "inputCode",
                    status: "inable"
                },
                {
                    text: "分类",
                    value: "anaesthesiaType",
                    status: "inable"
                },
            ],
            commonTypeList: [],
        }
    },
    // props: [
    //     'methodChildData'
    // ],
    methods: {
        inputBlur(list) {
            console.log('1')
            console.log(list)
            this.writeAble = false;
        },
        valueWriteAble(list) {
            console.log('2')
            this.writeAble = true;
        },
        getTypeDetail() {
            //     this.tempTypeItem = item;
            //     this.isAdd = false;
            let params = {
            }
            this.api.selectAllMedAnaesthesiaDict(params)
                .then(
                res => {
                    var m = res.list.length;
                    //             console.log(res.list)
                    //             // for (var i = 0; i < m; i++) {
                    //             // res.list[i].newItemName = res.list[i].itemName;
                    //             // res.list[i].newItemCode = res.list[i].itemCode;
                    //             // }
                    this.commonTypeList = res.list;
                });
        },
        addMedAnesthesiaInputDict() {
            // console.log(this.tempTypeItem)
            this.commonTypeList.push({
                serialNo: this.commonTypeList.length + 1,
                anaesthesiaCode: "",
                anaesthesiaName: "",
                inputCode: "",
                anaesthesiaType: "",
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
            console.log(li[k])
            params = {
                serialNo: li[k].serialNo,
                anaesthesiaCode: li[k].anaesthesiaCode,
                anaesthesiaName: li[k].anaesthesiaName,
                inputCode: li[k].inputCode,
                anaesthesiaType: li[k].anaesthesiaType,
            };
            this.api.insertMedAnaesthesiaDict(params)
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
            // }
            // if (params.length > 0) {

            // }
            this.isCancle = true;
            this.isAdd = false;
            this.isSave = true;
        },
        deleteByMedAnesthesiaInputDict() {
            console.log(this.obj.anaesthesiaName);
            let params = {
                anaesthesiaName: this.obj.anaesthesiaName,
            }
            this.api.deleteByMedAnesthesiaInputDict(params)
                .then(
                res => {
                    this.getTypeDetail(this.tempTypeItem);
                });
        },
        // getItem(item) {
        //     console.log('进来了')
        //     this.obj = item;
        //     this.isDelete = false;
        // },

    },
    mounted() {
        this.getTypeDetail();
        console.log('111')
    }
}
</script>
<style scoped>

</style>
