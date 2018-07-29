<template>
  <div>
    <div class="window_load" style="height:200px;width: 400px;z-index:1;position:absolute;left:30%;top: 20%;">
      <div class="load_top">
        <div>修改密码</div>
        <div @click="closeChangePassWordView" class="top_active">X</div>
      </div>
      <div style="padding:10px 0 10px 10px;">
        <div>
          <span>旧密码: </span>
          <input type="password" v-model="oldPassword">
        </div>
        <div style="margin-top: 10px;">
          <span>新密码: </span>
          <input type="password" v-model="newPassword">
        </div>
        <div style="margin-top: 10px;">
          <span>确认密码:</span>
          <input type="password" v-model="qrPassword">
        </div>
        <div style="margin-top:30px;margin-right: 20px;text-align: right;">
          <button @click="saveChangePassWord">保存</button>
          <button @click="closeChangePassWordView">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      qrPassword: '',
    }
  },
  methods: {
    closeChangePassWordView() {
      this.$emit('closeChangePassWordView');
    },
    saveChangePassWord() {
      if (!this.oldPassword || !this.newPassword || !this.qrPassword) {
        alert("密码不能为空")
        return false
      }
      if (this.newPassword != this.qrPassword) {
        alert("确认密码不一样")
        return false
      }
      let parm = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        loginName: this.config.userId,
      }
      this.api.updateUserPassword(parm)
        .then(res => {
          if (res.success) {
            this.oldPassword = ''
            this.newPassword = ''
            this.qrPassword = ''
            alert("修改成功")
          } else {
            alert(res.msg)
          }
        })
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
