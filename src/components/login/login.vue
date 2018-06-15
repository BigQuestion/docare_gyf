<template>
  <div :style="note" style="background-color: rgb(0,0,0);position: relative;">
    <div class="loginBox">
      <div style="display:flex;flex-direction:row-reverse;height:75px;box-sizing:border-box;padding:10px 20px 0 0;">
        <img style="width:auto;height:100%;" src="../../assets/logo.png">
      </div>
      <div style="height:250px;display:flex;justify-content: space-between;box-sizing:border-box;padding-top:20px;">
        <div style="width:40%;box-sizing:border-box;padding-left:20px;">
          <img style="width:225px;height:auto;" src="../../assets/doc.png">
        </div>
        <div style="width:60%;">
          <h2 style="color:white;">DoCare麻醉临床信息系统V5.0</h2>
          <div style="margin-top:20px;height:24px;">
            <span style="display:inline-block;width:65px;height:100%;color:#fff;">用户名：</span>
            <input type="" name="" style="width: 180px;height:22px;box-sizing:border-box;" v-model="loginName">
          </div>
          <div style="margin-top:5px;height:24px;">
            <span style="display:inline-block;width:65px;height:100%;color:#fff;">密 码：</span>
            <input @keyup.enter='login' type="password" name="" style="width: 180px;height:22px;box-sizing:border-box;" v-model="loginPwd">
          </div>
          <div style="padding-right:50px;box-sizing:border-box;display:flex;flex-direction:row-reverse;margin-top:20px;height:30px;">
            <button style="width:100px;height:30px;" class="btn">取消</button>
            <button style="width:100px;height:30px;margin-right:5px;" class="btn" @click="login">登录</button>
            <!-- <button @click="runexe()">click</button> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
                                            Docare登录
                                        </div>
                                        <div>
                                            用户：<input type="" name="" v-model="loginName">
                                        </div>
                                        <div>
                                            密码：<input type="" name="" v-model="loginPwd">
                                        </div>
                                        <div>
                                            <button @click="login">login</button>
                                        </div> -->
    <!-- <div class="flex" style="height:40px;" ref="row" >
                                            <div ref="block" id="block" style="width:100px;">1</div>
                                            <div class="line" @mousedown="dragstart"></div>
                                            <div style="width:100px;background: #FF6666">2</div>
                                        </div>
                                        <div>
                                            <textarea  v-model="sql"></textarea>
                                        </div>
                                        <div>
                                            <button @click="doSql">查询</button>
                                        </div>
                                        <div>
                                            <textarea v-model="result"></textarea>
                                        </div> -->
  </div>
</template>
<script>
let target;
let block;

function moveFun(e) {
  console.log(e.x);
  block.style.width = e.x + 'px';
}
export default {
  name: 'login',
  data() {
    return {
      msg: '欢迎登陆！',
      loginName: '',
      loginPwd: '',
      draging: false,
      target: '',
      sql: 'select * from med_anesthesia_comm_dict t where rownum<10',
      result: '暂无结果',
      note: {
        backgroundImage: "url(" + require("../../assets/loginBack.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        height: "100%",
        backgroundPosition: "center",
      },
    }
  },
  methods: {
    doSql() {
      let params = {
        sql: this.sql
      }
      this.api.doSql(params).then(
        res => {
          console.log(res);
        }
      )
    },
    moveFun(e) {
      console.log(e.x);
    },
    login() {
      let params = {
        loginName: this.loginName,
        loginPwd: this.loginPwd
      }

      this.api.login(params)
        .then(res => {
          if (res.success) {
            this.$router.push({
              path: 'menu'
            })
          } else {
            alert(res.msg)
          }
        })

    },
    move(e) {
      this.$refs.block.style.width = e.x + 'px';
      console.log(e.x, e.y);
    },
    dragstart(event) {
      target = this.$refs.row;
      block = this.$refs.block;
      // debugger
      // target = document.getElementById('block')
      target.addEventListener('mousemove', moveFun);
      // target.addEventListener('mousemup',function(e){
      //     debugger
      //     console.log('stop');
      //     target.removeEventListener('mousemove',this.move)
      // });
      console.log('开始监听');
      // 
      document.addEventListener('mouseup', function(e) {
        console.log('stop');
        target.removeEventListener('mousemove', moveFun)
      });

    },
    drop(event) {
      console.log('结束拖动');
      // event.preventDefault();
      // this.draging = false;
      // event.target.appendChild(dom);
    },
    runexe() {
      window.ipc.send('runexe')

    }
  },
  mounted() {
    this.w = 100;
    // this.api.Regist()
    // .then(res=>{
    //      debugger
    //      console.log(res);
    //  });
  }
}

</script>
<style type="text/css" scoped>
.line {
  width: 1px;
  height: 100%;
  background: #000000;
}

.line:hover {
  cursor: w-resize;
}

.loginBox {
  position: absolute;
  left: 50%;
  top: 50%;
  background: url('../../assets/loginBoxBack.jpg')no-repeat;
  background-size: cover;
  width: 650px;
  height: 340px;
  margin-left: -325px;
  margin-top: -170px;
}

</style>
