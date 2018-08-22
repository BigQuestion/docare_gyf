<template>
  <div>
    <div class="window_load" style="height:400px;width: 600px;z-index:1;position:absolute;left:30%;top: 20%;">
      <div class="load_top">
        <div>体征显示</div>
        <div @click="closePatSetting" class="top_active">X</div>
      </div>
      <div style="padding: 10px;overflow-y: auto;height: 250px;background-color: white;">
        <div style="display: flex;">
          <div style="border:1px solid rgb(177,207,243);background-color:#fff;box-sizing:border-box;" :style="{minWidth:cell.width+'px'}" v-for="cell in tbconfig">
            {{cell.title}}
          </div>
        </div>
        <div v-for="item in itemNameList" style="display:flex;">
          <div v-for="cell in tbconfig" :style="{minWidth:cell.width+'px'}" style="border:1px solid rgb(177,207,243);background-color:#fff;box-sizing:border-box;">
            <select v-if="cell.fieldObj=='isShow'" :style="{minWidth:cell.width+'px'}" v-model="item[cell.fieldObj]">
              <option style="background-color: white;" v-bind:value="0">
                显示
              </option>
              <option style="background-color: white;" v-bind:value="1">
                不显示
              </option>
            </select>
            <span v-else>{{item[cell.fieldObj]}}</span>
          </div>
        </div>
      </div>
      <div style="margin-top:50px;margin-right: 20px;text-align: right;">
        <button @click="commitSave">保存</button>
        <button @click="commitCancle">取消</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      itemNameList: [],
      patSetting: [],
      tbconfig: [{
          title: "曲线名称",
          fieldObj: "itemName",
          width: 200
        },
        {
          title: "是否显示",
          fieldObj: "isShow",
          width: 80
        }
      ],
    }
  },
  methods: {
    closePatSetting() {
      this.$emit('closePatSetting');
    },
    getSignName() {
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0,
      }
      this.api.getSignName(params)
        .then(
          res => {
            for (var i = 0; i < res.length; i++) {
              res[i].isShow = 0;
            }
            //定义一个排序方法
            let compare = function(prop) {
              return function(obj1, obj2) {
                let val1 = obj1[prop]
                let val2 = obj2[prop]
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                  val1 = Number(val1);
                  val2 = Number(val2);
                }
                if (val1 < val2) {
                  return -1;
                } else if (val1 > val2) {
                  return 1;
                } else {
                  return 0;
                }
              }
            }
            this.api.getMedPatSetting({
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId
              })
              .then(rest => {
                let list = []
                if (rest.length > 0) {

                  for (var i = 0; i < rest.length; i++) {
                    list.push(rest[i].itemCode)
                  }
                  for (var k = 0; k < res.length; k++) {
                    if (list.indexOf(res[k].itemCode) >= 0) {
                      res[k].isShow = 1
                    }
                  }
                }

                //根据itemcode排序
                this.itemNameList = res.sort(compare("itemCode"));
                console.log(this.itemNameList)
              })
            //根据itemcode排序
            // this.itemNameList = res.sort(compare("itemCode"));

          })
    },
    commitSave() {
      console.log(this.itemNameList)
      let params = []
      let depar = []
      this.itemNameList.forEach(item => {
        if (item.isShow == 1) {

          params.push({
            patientId: this.config.userInfo.patientId,
            operId: this.config.userInfo.operId,
            visitId: this.config.userInfo.visitId,
            itemCode: item.itemCode

          })
        } else {
          depar.push({
            patientId: this.config.userInfo.patientId,
            operId: this.config.userInfo.operId,
            visitId: this.config.userInfo.visitId,
            itemCode: item.itemCode

          })
        }
      })

      if (params.length > 0) {
        this.api.setPatMonitor(params)
          .then(res => {

          })
      }
      if (depar.length > 0) {
        this.api.deletePatMonitor(depar)
          .then(res => {

          })
      }
      alert("保存成功")
    },
    commitCancle() {
      this.getSignName()
    },
  },
  mounted() {
    this.getSignName()
  },
  created() {},
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
