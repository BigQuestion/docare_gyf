<template>
  <div style="position: absolute;height: 150px;overflow-y: auto;background-color: white;z-index: 20;" :style="{width:width+'px'}">
    <div>
      <div>
        <input v-model="serchZm" @keyup="serchFun" style="width: 80px;">
      </div>
      <div class="listIngt" v-for="item in dataPartsList" @click="getSelected(item)">{{item.USER_NAME}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      serchZm: '',
      dataPartsList: [],
      dataAllList: [],
    }
  },
  methods: {
    getUsers() {
      let param = {}
      this.api.getAllUsers(param)
        .then(res => {
          this.dataPartsList = res;
          this.dataAllList = res;
        })
    },
    serchFun() {
      var list = this.dataAllList;
      var m = this.serchZm.toUpperCase();
      var newList = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].INPUT_CODE && list[i].INPUT_CODE.indexOf(m) >= 0) {
          newList.push(list[i]);
        }

      }
      this.dataPartsList = newList;
    },
    getSelected(item) {

      if (this.methodName == 'anesthesiaDoctor') {
        this.$set(this.dataInfo, 'anesthesiaDoctor', item.USER_NAME);
        this.$set(this.dataInfo, 'anesthesiaDoctorId', item.USER_ID);
        this.$emit('closeanesthesiaDoctor')
      }
      if (this.methodName == 'secondAnesthesiaDoctor') {
        this.$set(this.dataInfo, 'secondAnesthesiaDoctor', item.USER_NAME);
        this.$set(this.dataInfo, 'secondAnesthesiaDoctorId', item.USER_ID);
        this.$emit('closesecondAnesthesiaDoctor')
      }

      if (this.methodName == 'anesthesiaAssistant') {
        this.$set(this.dataInfo, 'anesthesiaAssistant', item.USER_NAME);
        this.$set(this.dataInfo, 'anesthesiaAssistantId', item.USER_ID);
        this.$emit('closeanesthesiaAssistant')
      }
      if (this.methodName == 'secondAnesthesiaAssistant') {
        this.$set(this.dataInfo, 'secondAnesthesiaAssistant', item.USER_NAME);
        this.$set(this.dataInfo, 'secondAnesthesiaAssistantId', item.USER_ID);
        this.$emit('closesecondAnesthesiaAssistant')
      }
      if (this.methodName == 'surgeon') {
        this.$set(this.dataInfo, 'surgeon', item.USER_NAME);
        this.$set(this.dataInfo, 'surgeonId', item.USER_ID);
        this.$emit('closesurgeon')
      }
      if (this.methodName == 'firstAssistant') {
        this.$set(this.dataInfo, 'firstAssistant', item.USER_NAME);
        this.$set(this.dataInfo, 'firstAssistantId', item.USER_ID);
        this.$emit('closefirstAssistant')
      }
      if (this.methodName == 'secondAssistant') {
        this.$set(this.dataInfo, 'secondAssistant', item.USER_NAME);
        this.$set(this.dataInfo, 'secondAssistantId', item.USER_ID);
        this.$emit('closesecondAssistant')
      }
      if (this.methodName == 'thirdAssistant') {
        this.$set(this.dataInfo, 'thirdAssistant', item.USER_NAME);
        this.$set(this.dataInfo, 'thirdAssistantId', item.USER_ID);
        this.$emit('closethirdAssistant')
      }
      if (this.methodName == 'fourthAssistant') {
        this.$set(this.dataInfo, 'fourthAssistant', item.USER_NAME);
        this.$set(this.dataInfo, 'fourthAssistantId', item.USER_ID);
        this.$emit('closefourthAssistant')
      }
      if (this.methodName == 'firstOperationNurse') {
        this.$set(this.dataInfo, 'firstOperationNurse', item.USER_NAME);
        this.$set(this.dataInfo, 'firstOperationNurseId', item.USER_ID);
        this.$emit('closefirstOperationNurse')
      }
      if (this.methodName == 'secondOperationNurse') {
        this.$set(this.dataInfo, 'secondOperationNurse', item.USER_NAME);
        this.$set(this.dataInfo, 'secondOperationNurseId', item.USER_ID);
        this.$emit('closesecondOperationNurse')
      }
      if (this.methodName == 'firstSupplyNurse') {
        this.$set(this.dataInfo, 'firstSupplyNurse', item.USER_NAME);
        this.$set(this.dataInfo, 'firstSupplyNurseId', item.USER_ID);
        this.$emit('closefirstSupplyNurse')
      }
      if (this.methodName == 'secondSupplyNurse') {
        this.$set(this.dataInfo, 'secondSupplyNurse', item.USER_NAME);
        this.$set(this.dataInfo, 'secondSupplyNurseId', item.USER_ID);
        this.$emit('closesecondSupplyNurse')
      }
      if (this.methodName == 'thirdSupplyNurse') {
        this.$set(this.dataInfo, 'thirdSupplyNurse', item.USER_NAME);
        this.$set(this.dataInfo, 'thirdSupplyNurseId', item.USER_ID);
        this.$emit('closethirdSupplyNurse')
      }
    },
  },
  props: ['width', 'methodName', 'dataInfo'],
  mounted() {
    this.getUsers();
  },
  created() {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        if (this.methodName == 'anesthesiaDoctor') {
          this.$emit('closeanesthesiaDoctor')
        }
        if (this.methodName == 'secondAnesthesiaDoctor') {
          this.$emit('closesecondAnesthesiaDoctor')
        }
        if (this.methodName == 'anesthesiaAssistant') {
          this.$emit('closeanesthesiaAssistant')
        }
        if (this.methodName == 'secondAnesthesiaAssistant') {
          this.$emit('closesecondAnesthesiaAssistant')
        }
        if (this.methodName == 'surgeon') {
          this.$emit('closesurgeon')
        }
        if (this.methodName == 'firstAssistant') {
          this.$emit('closefirstAssistant')
        }
        if (this.methodName == 'secondAssistant') {
          this.$emit('closesecondAssistant')
        }
        if (this.methodName == 'thirdAssistant') {
          this.$emit('closethirdAssistant')
        }
        if (this.methodName == 'fourthAssistant') {
          this.$emit('closefourthAssistant')
        }
        if (this.methodName == 'firstOperationNurse') {
          this.$emit('closefirstOperationNurse')
        }
        if (this.methodName == 'secondOperationNurse') {
          this.$emit('closesecondOperationNurse')
        }
        if (this.methodName == 'firstSupplyNurse') {
          this.$emit('closefirstSupplyNurse')
        }
        if (this.methodName == 'secondSupplyNurse') {
          this.$emit('closesecondSupplyNurse')
        }
        if (this.methodName == 'thirdSupplyNurse') {
          this.$emit('closethirdSupplyNurse')
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
