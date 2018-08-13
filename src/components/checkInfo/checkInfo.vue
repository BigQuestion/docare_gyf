<template>
  <div class="dictionaries">
    <div class="window_load">
      <div class="load_top">
        <div>检验信息</div>
        <div @click="closeCheckInfo" class="top_active">X</div>
      </div>
      <div style="height:50px;padding-left: 20px;font-size: 18px;line-height: 50px;">
        <span>检验信息</span>
      </div>
      <div style="height: calc(100% - 100px);width: 100%;display: flex;">
        <div style="width: 40%;height:100%;overflow-y: auto;background-color: white;">
          <div style="display: flex;margin-left: 10px;">
            <div style="width: 25%;border: 1px solid rgb(177, 207, 243);color: #4C79BB;" v-for="cell in contentConfig">{{cell.text}}</div>
          </div>
          <div v-for="list in dataList" style="display: flex;margin-left: 10px;">
            <div v-for="cl in contentConfig" style="width: 160px;border:1px solid rgb(177,207,243);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
              <span v-if="[cl.value]=='resultsRptDateTime'">{{list[cl.value]|timeStampToDateStr}}</span>
              <span :title="list[cl.value]" v-else>{{list[cl.value]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      contentConfig: [{
          text: "检验号",
          value: "testNo"
        },
        {
          text: "检验名称",
          value: "testCause"
        },
        {
          text: "检验类别",
          value: "specimen"
        },
        {
          text: "检验日期",
          value: "resultsRptDateTime"
        },
      ],
      dataList: [],
    }
  },
  methods: {
    closeCheckInfo() {
      this.$emit('closeView');
    },
    getData() {
      let parm = {
        patientId: this.config.userInfo.patientId,
        visitId: this.config.userInfo.visitId
      }
      this.api.getMedLabTestMasterList(parm)
        .then(res => {
          this.dataList = res;
        })
    },
  },
  mounted() {
    this.getData();
  },
  created() {},
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
