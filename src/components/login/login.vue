<template>
	<div>
		<div>
			
		</div>
		<div @click="login">login</div>
	</div>
</template>
<script>
export default {
name: 'login',
	data () {
  		return {
      		msg: '欢迎登陆！'
    	}
    },
    methods:{
    	login(){
    		debugger
    		this.$router.push({
                path: 'index'
            })
    	}
    },
    mounted(){
    	this.api.Regist()
    	.then(res=>{
    			debugger
    			console.log(res);
    		});
    }
}
</script>