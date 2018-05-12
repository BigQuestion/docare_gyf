<template>
  <div style="position: absolute;height: 150px;overflow-y: auto;background-color: white;z-index: 20;" :style="{width:width+'px'}">
    <div v-if="methodName=='diagBeforeOperation'">
      <div>
        <input v-model="serchZm" @keyup="serchJm">
      </div>
      <div class="listIngt" v-for="item in dataPartsList" @click="getSelected(item)">{{item.DIAGNOSIS_NAME}}</div>
    </div>
    <div v-if="methodName=='anesthesiaMethod'">
      <div>
        <input v-model="serchZm" @keyup="serchJm">
      </div>
      <div class="listIngt" v-for="item in dataPartsList" @click="getSelected(item)">{{item.anaesthesiaName}}</div>
    </div>
    <div v-if="methodName=='operationName'">
      <div>
        <input v-model="serchZm" @keyup="serchJm">
      </div>
      <div class="listIngt" v-for="item in dataPartsList" @click="getSelected(item)">{{item.OPERATION_NAME}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      dataPartsList: [],
      dataAllList: [],
      serchZm: '',
    }
  },
  methods: {
    getMethod() {
      if (this.methodName == 'diagBeforeOperation') {
        let param = {}
        this.api.getPartsDialog(param)
          .then(res => {
            this.dataPartsList = res;
          })
        this.api.getAllDialog(param)
          .then(res => {
            this.dataAllList = res;
          })

      }
      if (this.methodName == 'anesthesiaMethod') {
        let param = {}
        this.api.selectAllMedAnaesthesiaDict(param)
          .then(res => {
            this.dataPartsList = res.list;
            this.dataAllList = res.list;
          })
      }
      if (this.methodName == 'operationName') {
        let param = {}
        this.api.getPartsOperationNames(param)
          .then(res => {
            this.dataPartsList = res;
          })
        this.api.getAllOperationNames(param)
          .then(res => {
            this.dataAllList = res;
          })

      }
    },
    getSelected(item) {
      // this.dataInfo.diagBeforeOperation = item.DIAGNOSIS_NAME;


      if (this.methodName == 'diagBeforeOperation') {
        this.$set(this.dataInfo, 'diagBeforeOperation', item.DIAGNOSIS_NAME);
        this.$emit('closeDiagView')
      }
      if (this.methodName == 'anesthesiaMethod') {
        this.$set(this.dataInfo, 'anesthesiaMethod', item.anaesthesiaName);
        this.$emit('closeMethodView')
      }
      if (this.methodName == 'operationName') {
        this.$set(this.dataInfo, 'operationName', item.OPERATION_NAME);
        this.$emit('closeOperationNameView')
      }
    },
    serchJm() {
      let list = []
      if (this.methodName == 'diagBeforeOperation') {
        list = this.dataAllList;
        var m = this.serchZm.toUpperCase();
        var newList = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].INPUT_CODE && list[i].INPUT_CODE.indexOf(m) >= 0) {
            newList.push(list[i]);
          }

        }
      }
      if (this.methodName == 'anesthesiaMethod') {
        list = this.dataAllList;
        var m = this.serchZm.toUpperCase();
        var newList = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].inputCode && list[i].inputCode.indexOf(m) >= 0) {
            newList.push(list[i]);
          }

        }
      }

      if (this.methodName == 'operationName') {
        list = this.dataAllList;
        var m = this.serchZm.toUpperCase();
        var newList = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].INPUT_CODE && list[i].INPUT_CODE.indexOf(m) >= 0) {
            newList.push(list[i]);
          }

        }
      }

      this.dataPartsList = newList;
    }
  },
  props: ['width', 'methodName', 'dataInfo'],
  mounted() {
    this.getMethod();
  },
  created() {
    document.addEventListener('click', (e) => {
      //console.log(this.$el.contains(e.target));
      if (!this.$el.contains(e.target)) {
        if (this.methodName == 'diagBeforeOperation') {
          this.$emit('closeDiagView')
        }
        if (this.methodName == 'anesthesiaMethod') {
          this.$emit('closeMethodView')
        }

        if (this.methodName == 'operationName') {
          this.$emit('closeOperationNameView')
        }

        this.serchZm = '';
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', (e) => {

    })
  },
  components: {},
  computed: {

  }
}

</script>
<style scoped>
.listIngt {
  background-color: #fff;
  cursor: pointer;
}

.listIngt:hover {
  background-color: #1E90FF;
  color: #fff;
}

</style>
