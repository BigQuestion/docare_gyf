<template>
  <div style="width:100%;height:100%;position:fixed;top:0;;left:0;cursor:not-allowed;" @click="atherPlacFuntion">
    <div class="fontBox" @click.stop="noFunction" :class="{animation:clickAtherPlace}" :style="{top:top+'px',left:left+'px'}">
      <div class="fontTop">
        <span>编辑列</span>
        <div @click="closeTitleWin" class="font_active">X</div>
      </div>
      <div class="flex" style="background-color: white;font-size: 10.5pt;">
        <div style="width: 150px;height: 350px;overflow: auto;border:1px solid;">
          <ul>
            <li v-for="item in titileList" :class="{active:item.isActive}" @click="activeFun(item)">
              <div style="min-height: 20px;">{{item.columnTitleName}}</div>
            </li>
          </ul>
        </div>
        <div style="padding: 10px;" v-if="chooseItem">
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
                  <input style="width: 100%;border:none;" type="number" v-model="chooseItem.columnWidth" @change="changeFun">
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div style="padding: 10px;">
        <button @click="addTitle">添加</button>
        <button @click="removeItem">删除</button>
        <button @click="submitFun">确定</button>
      </div>
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
      deleteDataList: [],
      startX: 0,
      startY: 0,
      offsetLeft: 0,
      offsetTop: 0,
      left: 500,
      top: 200,
      isDown: false,
      clickAtherPlace: false,
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
          if (res.length > 0) {
            res.forEach(item => {
              item.isActive = false;
              item.isChange = false;
            })
            this.titileList = res;
            if (JSON.stringify(this.chooseItem) == "{}") {
              this.titileList[0].isActive = true;
              this.chooseItem = this.titileList[0];
            }
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
        orderNo: this.titileList.length + 1,
        isChange: false,
      })
      this.titileList.forEach(item => {
        item.isActive = false;
      })
      this.titileList[this.titileList.length - 1].isActive = true;
      this.chooseItem = this.titileList[this.titileList.length - 1];
    },
    changeFun() {
      this.chooseItem.isChange = true;
      if (this.changeDataList.length == 0) {
        this.changeDataList.push(this.chooseItem);
      } else {
        let count = 0;
        this.changeDataList.forEach(item => {
          if (item.orderNo == this.chooseItem.orderNo) {
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
      let insertArr = []
      let count = 0
      let changeArr = []
      this.titileList.forEach(item => {
        if (item.addFlag) {
          insertArr.push(item)
        }
        if (item.isChange && item.columnId) {
          changeArr.push(item)
        }
      })
      if (insertArr.length > 0) {
        this.api.insertMedQiXieTitleColumnBatch(insertArr)
          .then(res => {
            count++
          })
      }

      if (changeArr.length > 0) {
        let params = changeArr
        this.api.updateMedQiXieTitleColumnBatch(params)
          .then(res => {
            count++
          })
      }
      if (this.deleteDataList.length > 0) {
        let param = this.deleteDataList
        this.api.deleteMedQiXieTitleColumnBatch(param)
          .then(res => {
            this.deleteDataList = [];
            count++
          })
      }
      if (count > 0) {
        this.getTitleList();
      }
    },
    //鼠标按下事件
    clickMouseDown(ev) {
      let downX = ev.clientX
      let downY = ev.clientY
      this.startX = downX
      this.startY = downY
      this.isDown = true
    },
    divMouseMove(ev) {
      if (this.isDown) {
        this.left = ev.clientX - this.startX
        this.top = ev.clientY - this.startY
      }

    },
    mouseStop() {
      this.isDown = false;
    },
    atherPlacFuntion() {
      this.clickAtherPlace = !this.clickAtherPlace;
      setTimeout(() => {
        this.clickAtherPlace = !this.clickAtherPlace;
      }, 1000);
    },
    noFunction() {

    },
    //移除
    removeItem() {
      if (this.chooseItem) {
        for (var i = 0; i < this.titileList.length; i++) {
          if (this.titileList[i].orderNo == this.chooseItem.orderNo) {

            if (this.titileList[i].columnId) {
              //真正的删除数据是在原来的数据上面进行提交
              this.deleteDataList.push(this.titileList[i])
            }
            this.titileList.splice(i, 1)
          }
        }
      }
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

.fontBox {
  position: absolute;
  background: rgb(240, 240, 240);
  border: 1px solid rgb(24, 131, 215);
  cursor: auto;
  -webkit-box-shadow: 1px 1px 20px #AAA;
  box-shadow: 1px 1px 20px #AAA;
  height: 450px;
  width: 700px;
  top: calc(50% - 225px);
  left: calc(50% - 350px);
  z-index: 999;
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

</style>
