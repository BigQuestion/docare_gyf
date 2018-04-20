<template>
  <div style="height: 450px;width: 700px;box-shadow: #e8e8ea 0px 0px 5px;position: absolute;top: 20%;left: 25%;background-color: rgb(251,251,251);padding: 5px;">
    <div style="height: 25px;width: 100%;text-align: center;position: relative;">
      <div>
        编辑列
      </div>
      <div style="position: absolute;right:20px;top:0px;color:white;background-color: rgb(60,163,203);width: 23px;
    height: 23px;line-height: 23px;text-align: center;cursor: pointer;" @click="closeTitleWin">
        X
      </div>
    </div>
    <div class="flex" style="background-color: white;font-size: 10.5pt;">
      <div style="width: 150px;height: 350px;overflow: auto;border:1px solid;">
        <ul>
          <li v-for="item in titileList" :class="{active:item.isActive}" @click="activeFun(item)">
            <div style="min-height: 20px;">{{item.columnTitleName}}</div>
          </li>
        </ul>
      </div>
      <div style="padding: 10px;">
        <table style="border-collapse:collapse;table-layout: fixed;width: 550px;" border="1" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <div style="width: 50%">
                栏目名称
              </div>
            </td>
            <td>
              <div style="width: 50%">
                <input style="width: 100%;border:none;" type="text" v-model="chooseItem.columnTitleName" @change="changeFun">
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="width: 50%">
                WIDTH
              </div>
            </td>
            <td>
              <div style="width: 50%">
                <input style="width: 100%;border:none;" type="text" v-model="chooseItem.columnWidth" @change="changeFun">
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="padding: 10px;">
      <button @click="addTitle">添加</button>
      <button>删除</button>
      <button @click="submitFun">确定</button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      titileList: [],
      chooseItem: {},
      changeDataList: [],
    }
  },
  methods: {
    closeTitleWin() {
      this.$emit('closeTitleView');
    },
    getTitleList() {
      let params = {}
      this.api.selectQiXieTitle(params)
        .then(res => {
          res.forEach(item => {
            item.isActive = false;
            item.oldName = item.columnTitleName;
          })
          this.titileList = res;
          if (JSON.stringify(this.chooseItem) == "{}") {
            this.titileList[0].isActive = true;
            this.chooseItem = this.titileList[0];
          }
        })
    },
    activeFun(data) {
      this.titileList.forEach(item => {
        item.isActive = false;
      })
      this.chooseItem = data;
      data.isActive = !data.isActive;
    },
    //添加
    addTitle() {
      this.titileList.push({
        columnTitleName: "列1",
        columnWidth: 60,
        oldName: "列1",
        addFlag: true,
        orderNo: this.titileList.length + 1
      })
    },
    changeFun() {
      if (this.changeDataList.length == 0) {
        this.changeDataList.push(this.chooseItem);
      } else {
        let count = 0;
        this.changeDataList.forEach(item => {
          if (item.columnId == this.chooseItem.columnId) {
            item.columnTitleName = this.chooseItem.columnTitleName;
            item.columnWidth = this.chooseItem.columnWidth;
          } else {
            count++;
          }
        })
        if (this.changeDataList.length == count) {
          this.changeDataList.push(this.chooseItem);
        }
      }
    },
    //提交
    submitFun() {
      console.log(this.changeDataList)
    }
  },
  mounted() {
    this.getTitleList();
  },
  created() {},
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
<style type="text/css" scoped>
ul li.active {
  background-color: blue;
  color: white;
}

</style>
