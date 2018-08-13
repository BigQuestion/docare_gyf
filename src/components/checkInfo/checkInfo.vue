<template>
  <div class="dictionaries">
    <div class="window_load">
      <div class="load_top">
        <div>检验信息</div>
        <div @click="closeCheckInfo" class="top_active">X</div>
      </div>
      <div style="height:50px;padding-left: 20px;font-size: 18px;">
        <span>检验信息</span>
      </div>
      <div style="height: calc(100% - 100px);width: 100%;display: flex;">
        <div style="width: 40%;height:100%;background: red;"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {

    }
  },
  methods: {
    closeCheckInfo() {
      this.$emit('closeView');
    },
  },
  mounted() {},
  created() {},
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
