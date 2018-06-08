<template>
  <div @blur="hiden">
    <div @click="loadList">testSelect</div>
    <div v-if="showState" v-for="item in list" @click="clickItem(item)">{{item[initData.fieldName]}}</div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      initData: {},
      list: [],
      showState: false
    }
  },
  methods: {
    init(obj) {
      this.initData = obj
      this.initData.loadedFun = obj.loadedFun
    },
    loadList() {
      this.initData.loadedFun();
    },
    setDataList(list) {
      this.list = list
    },
    clickItem(item) {
      this.initData.chooseAction(item);
      this.hiden();
    },
    show() {
      this.showState = true;
    },
    hiden() {
      this.showState = false;
    }
  },
  props: [],
  mounted() {

  },
  created() {
    document.addEventListener('click', (e) => {
      let el = this.$el
      if (!el.contains(e.target)) {
        this.hiden();
      }
    })
  },
  beforeDestroy() {

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
