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
        <div class="topList" v-for="cell in contentConfig">{{cell.text}}</div>
      </div>
      <div style="width: 100%;height:90%;margin-top:5px;overflow-y: auto;">
        <div v-for="list in commonTypeList" style="display: flex;">
          <div v-for="cl in contentConfig" style="width: 25%;border:1px solid rgb(177,207,243);">
            <div style="height:100%;width:100%;" v-if="cl.status=='inable'">
              <input v-if="list.writeAble" type="text" v-model="list[cl.value]" @blur="inputBlur(list)" @keyup="chan(list)" style="display:block;width:100%;border:0;height:100%;outline:none;">
              <input v-if="!list.writeAble" type="text" v-model="list[cl.value]" @click="valueWriteAble(list)" style="display:block;width:100%;border:0;height:100%;outline:none;">
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
      <button style="width: 100px;height: 30px;" :disabled="isDelete" @click="deleteMedAnaesthesiaDict">删除</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comTypeList: [],
      obj: "",
      isAdd: false,
      isSave: true,
      isCancle: true,
      isDelete: true,
      writeAble: false,
      contentConfig: [{
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
      changeData: [],
      oldName: '',
      newName: '',
    }
  },
  // props: [
  //     'methodChildData'
  // ],
  methods: {
    chan(list) {
      this.isSave = false;
      this.isCancle = false;
      console.log(list)
      this.newName = list.anaesthesiaName;
    },
    inputBlur(list) {
      console.log('失去焦点')
      console.log(list.writeAble + 'write');
      console.log(list)
      list.writeAble = false;
      if (list.arrayStats == 0) {

      } else {
        this.changeData.push({
          anaesthesiaCode: list.anaesthesiaCode,
          anaesthesiaName: this.oldName,
          anaesthesiaNowName: this.newName,
          anaesthesiaShorten: list.anaesthesiaShorten,
          anaesthesiaType: list.anaesthesiaType,
          inputCode: list.inputCode,
          needAnesDoctor: list.needAnesDoctor,
          serialNo: list.serialNo,
          writeAble: list.writeAble,
        })
        console.log(this.changeData)
      }
    },
    valueWriteAble(list) {
      this.oldName = list.anaesthesiaName;
      this.obj = list;
      this.isSave = true;
      this.isDelete = false;
      list.writeAble = true;
      console.log(list.writeAble + 'write');
    },
    getTypeDetail() {
      this.isAdd = false;
      let params = {}
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
      this.commonTypeList.push({
        arrayStats: 0, //0为新增
        serialNo: this.commonTypeList.length + 1,
        anaesthesiaCode: "",
        anaesthesiaName: "",
        inputCode: "",
        anaesthesiaType: "",
      });
      this.isAdd = true;
      this.isCancle = false;
      console.log(this.commonTypeList);
      console.log(this.isSave)
    },

    cancleEdit() {
      this.changeData = [];
      this.getTypeDetail(this.commonTypeList);
      this.isCancle = true;
      this.isAdd = false;
      this.isSave = true;
      this.isDelete = true;
    },
    saveValue() {
      var li = this.commonTypeList;
      var k = li.length - 1;
      let params = {};
      console.log(li[k])
      if (li[k].arrayStats == 0) {
        console.log('这是新增操作')
        params = {
          serialNo: li[k].serialNo,
          anaesthesiaCode: li[k].anaesthesiaCode,
          anaesthesiaName: li[k].anaesthesiaName,
          inputCode: li[k].inputCode,
          anaesthesiaType: li[k].anaesthesiaType,
        };
        console.log(params)
        this.api.insertMedAnaesthesiaDict(params)
          .then(
            res => {
              this.getTypeDetail(this.commonTypeList);
            });
      } else {
        console.log('这是修改操作')
        console.log(this.changeData)
        this.api.updateMedAnaesthesiaDict(this.changeData)
          .then(
            res => {
              this.changeData = [];
              this.getTypeDetail(this.commonTypeList);
            });
      }
      this.isCancle = true;
      this.isAdd = false;
      this.isSave = true;
      this.isDelete = true;
    },
    deleteMedAnaesthesiaDict() {
      console.log(this.oldName);
      let params = {
        anaesthesiaName: this.oldName,
      }
      this.api.deleteMedAnaesthesiaDict(params)
        .then(
          res => {
            this.changeData = [];
            this.getTypeDetail(this.commonTypeList);
          });
      this.isDelete = true;
    },

  },
  mounted() {
    this.getTypeDetail();
    console.log('111')
  }
}

</script>
<style scoped>
.topList {
  width: 25%;
  border: 1px solid rgb(177, 207, 243);
  color: #4C79BB;
  background: url('../../assets/contentTitleBack.jpg')no-repeat;
  background-size: cover;
  /* box-sizing: border-box; */
  padding-left: 5px;
}

</style>
