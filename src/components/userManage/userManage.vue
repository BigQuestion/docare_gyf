<template>
	<div>
        <div>
            <button @click="refresh()">刷新</button>
        </div>
        <div>
            <div v-for="item in userList" class="flex">
                <div>
                    {{item.userName}}
                </div>
                <div>
                    {{item.loginName}}
                </div>
                <div>
                    <input type="" name="" v-model="item.loginPwd">
                </div>
                <div>
                    <button>修改</button>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
name: 'login',
	data () {
  		return {
      		msg: 'userManage',
            userList:[],
    	}
    },
    methods:{
    	refresh(){
            this.api.getUserList()
                .then(
                res=>{
                this.userList = res;
                console.log(res);
            });
        }
    },
    mounted(){
    	this.refresh();
    }
}
</script>