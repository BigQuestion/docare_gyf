<template>
	<div style="height:100%;">
		<div class="head"></div>
        <div class="down">
            <div class="left">
                
            </div>
            <div class="content">
                
            </div>
        </div>
	</div>
</template>
<script>
export default {
	data () {
  		return {
    	}
    },
    methods:{
        
    },
    mounted(){

    },
    components: {
        
    }
}
</script>
<style scoped>
.head{
    height:120px;
    width:100%;
    background: #CCCCCC;
}
.down{
    width:100%;
    height:calc(100% - 120px);
    background: #B3B3B3;
    display: flex;
}
.left{
    width:100px;
    height:100%;
    background: #808080;
}
.content{
    width:calc(100% - 100px);
    height:100%;
    background: #666666;
}
</style>