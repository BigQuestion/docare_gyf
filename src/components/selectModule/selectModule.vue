<template>
  <div>
    <div style="position: relative;">
      <div>
        <input @dblclick="show" v-model="value" style="height:20px;border:0;display:block;font-size:12px;width: 100%;" type="" name="">
      </div>
      <div style="position: absolute;width: 100%;top: 20px;height: 50px;overflow: auto;border:1px solid;z-index: 20;background-color:white;" @blur="hide" v-if="showDataList" v-for="item in dataList">
        {{item}}
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      dataList: [1, 2, 1],
      showDataList: false,
    }
  },
  methods: {
    hide() {
      this.showDataList = false;
    },
    show() {
      this.showDataList = true;
    },
  },
  props: ['object', 'value'],
  mounted() {},
  created() {
    document.addEventListener('click', (e) => {
      let el = this.$el
      if (!el.contains(e.target)) {
        this.hide();
      }
    })
  },
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
