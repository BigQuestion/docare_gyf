<template>
  <div class="dictionaries">
    <div class="window_load">
      <div class="load_top">
        <div>检验结果</div>
        <div @click="closeCheckInfoShow" class="top_active">X</div>
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
    closeCheckInfoShow() {
      this.$emit('closeView');
    },
  },
  mounted() {

  },
  created() { },
  beforeDestroy() {

  },
  components: {

  },
  computed: {

  }
}

</script>
