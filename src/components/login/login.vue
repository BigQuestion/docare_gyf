<template>
	<div>
		<div>
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
        </div>
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
function moveFun(e){
    console.log(e.x);
    block.style.width = e.x+'px';
}
export default {
    name: 'login',
	data () {
  		return {
      		msg: '欢迎登陆！',
            loginName:'',
            loginPwd:'',
            draging:false,
            target:'',
            sql:'select * from med_anesthesia_comm_dict t where rownum<10',
            result:'暂无结果'
    	}
    },
    methods:{
        doSql(){
            let params = {
                sql:this.sql
            }
            this.api.doSql(params).then(
                    res=>{
                        console.log(res);
                    }
                )
        },
        moveFun(e){
            console.log(e.x);
        },
    	login(){
            let params = {
                loginName:this.loginName,
                loginPwd:this.loginPwd
            }
            debugger
    		this.$router.push({
                path: 'menu'
            })
    	},
        move(e){
            this.$refs.block.style.width = e.x+'px';
            console.log(e.x,e.y);
        },
        dragstart(event){
            target = this.$refs.row;
            block = this.$refs.block;
            // debugger
            // target = document.getElementById('block')
            target.addEventListener('mousemove',moveFun);
            // target.addEventListener('mousemup',function(e){
            //     debugger
            //     console.log('stop');
            //     target.removeEventListener('mousemove',this.move)
            // });
            console.log('开始监听');
            // 
            document.addEventListener('mouseup',function(e){
                console.log('stop');
                target.removeEventListener('mousemove',moveFun)
            });

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