<template>
	<div>
		<div>
			
		</div>
        用户：<input type="" name="" v-model="loginName">
        密码：<input type="" name="" v-model="loginPwd">
        <button @click="login">login</button>
        <div class="flex" style="height:40px;" ref="row" >
            <div ref="block" id="block">1</div>
            <div class="line" @mousedown="drag" @mouseup="drop" @mouseout="drop"></div>
            <div style="width:100px;background: #FF6666">2</div>
        </div>
	</div>
</template>
<script>

let target;

export default {
name: 'login',
	data () {
  		return {
      		msg: '欢迎登陆！',
            loginName:'',
            loginPwd:'',
            draging:false,
            w:100,
    	}
    },
    methods:{
    	login(){
            let params = {
                loginName:this.loginName,
                loginPwd:this.loginPwd
            }
    		// debugger
    		// this.$router.push({
      //           path: 'index'
      //       })
    	},
        move(e){
            if(this.draging){
                this.$refs.block.style.width = e.x+'px';
                console.log(e.x,e.y);
            }
        },
        drag(event){
            console.log('开始拖动');
            this.draging = true;
            target = this.$refs.row;
            // debugger
            // target = document.getElementById('block')
            target.addEventListener('mousemove',moveFun);
            // target.addEventListener('mousemup',function(e){
            //     console.log(e.x);
            //     target.removeEventListener('mousemove',function(e){
            //         console.log(e.x);
            //     })
            // });
            // target.addEventListener('mousemout',function(e){
            //     console.log(e.x);
            // });
            // dom = event.currentTarget;

        },
        drop(event){
            console.log('结束拖动');

            // event.preventDefault();
            // this.draging = false;
          // event.target.appendChild(dom);
        },
    },
    mounted(){
        this.w = 100;
    	// this.api.Regist()
    	// .then(res=>{
    	// 		debugger
    	// 		console.log(res);
    	// 	});
    }
}
</script>
<style type="text/css" scoped>
    .line{
        width:1px;
        height:100%;
        background: #000000;
        
    }
    .line:hover{
        cursor:w-resize;
    }
</style>