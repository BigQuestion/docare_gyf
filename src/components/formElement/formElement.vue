<template>
	<div>
		<div v-if="value.type=='text'">
            {{value.value}}
		</div>
        <div v-if="value.type=='input'" v-model="value.text">
            <input :style="{width:value.width+'px'}" type="" name="" >
        </div>
        <div v-if="value.type=='radio'" v-model="value.text">
            <input type="radio" name="" >
        </div>
        <div v-if="value.type=='checkbox'" v-model="value.text">
            <input type="checkbox" name="" >
        </div>
        <div v-if="value.type=='line'">
            <div style="margin-top:1px;height:1px;background: #000;":style="{width:value.width+'px'}"></div>
        </div>
        <div v-if="value.type=='verticalLine'">
            <div style="margin-left:1px;width:1px;background: #000;":style="{height:value.height+'px'}"></div>
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
    props:['value'],// 设置value为props属性-必须
    computed:{
        
    },
    mounted(){
    }
}
</script>
<style type="text/css" scoped>

</style>