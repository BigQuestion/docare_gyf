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
          <h2 style="color:#fff;">DoCare麻醉临床信息系统V5.0</h2>
          <div style="margin-top:20px;height:24px;">
            <span style="display:inline-block;width:65px;height:100%;color:#fff;">用户名：</span>
            <input type="" name="" style="width: 180px;height:22px;box-sizing:border-box;" v-model="loginName" @keyup.enter='nextInput' ref="inputEml">
          </div>
          <div style="margin-top:5px;height:24px;">
            <span style="display:inline-block;width:65px;height:100%;color:#fff;">密 码：</span>
            <input @keyup.enter='login' type="password" name="" style="width: 180px;height:22px;box-sizing:border-box;" ref="inputNext" v-model="loginPwd">
          </div>
          <div style="padding-right:50px;box-sizing:border-box;display:flex;flex-direction:row-reverse;margin-top:20px;height:30px;">
            <button style="width:100px;height:30px;" class="btn">取消</button>
            <button style="width:100px;height:30px;margin-right:5px;" class="btn" @click="login">登录</button>
            <!-- <button @click="runexe()">click</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dateTime from '@/components/plugins/dateTime.vue';

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
      arr: [],
      focusStatus: true,
      timeTest: '',
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
    // 获取用户信息列表
    getList() {
      this.api.medUsersList()
        .then(res => {
          for (var a = 0; a < res.list.length; a++) {
            if (this.loginName == res.list[a].loginName) {
              this.config.loginName = res.list[a].userName;
            }
          }
          this.$router.push({
            path: 'menu'
          })
        })
    },
    getValue(obj) {
      this.$set(this.arr, obj.index, obj.value)
    },
    getValue2(value) {},
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
      this.config.userId = ""
      let params = {
        loginName: this.loginName,
        loginPwd: this.loginPwd
      }

      this.api.login(params)
        .then(res => {
          if (res.success) {
            this.config.userId = this.loginName
            this.config.loginName = res.obj.userName
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
    },
    nextInput() {
      this.$refs.inputNext.focus();
    }

  },

  mounted() {
    this.$refs.inputEml.focus();
    this.w = 100;
    if (window.fs) {
      window.fs.readFile('./resources/app/room.json', 'utf8', (err, data) => {
        if (data) {
          this.config.roomId = JSON.parse(data).roomId
        }
      });
    }
  },
  components: {
    dateTime
  },
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
  background-color: #fff;
  width: 650px;
  height: 340px;
  margin-left: -325px;
  margin-top: -170px;
  /* border: 1px solid #999; */
}

.timePicker::-webkit-inner-spin-button {
  display: none;
}

</style>
