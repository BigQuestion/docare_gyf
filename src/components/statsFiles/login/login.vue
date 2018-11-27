<template>
  <div :style="note" style="background-color: rgb(0,0,0);position: relative;">
    <div class="loginBox">
        <div style="height:calc(100% - 100px);">
            <div style="color:#545557;font-size:26px;text-align:center;height:80px;line-height:80px;">DoCare 围术期管理决策平台</div>
        </div>
        <div style="background-color:#e0e0e0;height:100px;width:100%;padding-top:25px;box-sizing:border-box;">
            <button>登陆</button>
        </div>
      <!-- <div style="height:250px;display:flex;justify-content: space-between;box-sizing:border-box;padding-top:20px;">
        <div style="width:60%;">
          <h2 style="color:white;">DoCare麻醉临床信息系统V5.0</h2>
          <div style="margin-top:20px;height:24px;">
            <span style="display:inline-block;width:65px;height:100%;color:#fff;">用户名：</span>
            <input type="" name="" style="width: 180px;height:22px;box-sizing:border-box;"  >
          </div>
          <div style="margin-top:5px;height:24px;">
            <span style="display:inline-block;width:65px;height:100%;color:#fff;">密 码：</span>
            <input  type="password" name="" style="width: 180px;height:22px;box-sizing:border-box;" >
          </div>
          <div style="padding-right:50px;box-sizing:border-box;display:flex;flex-direction:row-reverse;margin-top:20px;height:30px;">
            <button style="width:100px;height:30px;" class="btn">取消</button>
            <button style="width:100px;height:30px;margin-right:5px;" class="btn" >登录</button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      msg: '欢迎登陆！',
      loginName: '',
      loginPwd: '',
      note: {
        backgroundImage: "url(" + require("../../../assets/tj/tLogin.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        height: "100%",
        backgroundPosition: "center",
      },
    }
  },
  methods: {

  },

  mounted() {

  },
  components: {

  },
}

</script>
<style type="text/css" scoped>
button{
    margin: auto;
    display: block;
    height:50px;
    width:350px;
}

.loginBox {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 440px;
  margin-left: -250px;
  margin-top: -220px;
  background-color: #fff;
}

.timePicker::-webkit-inner-spin-button {
  display: none;
}

</style>
