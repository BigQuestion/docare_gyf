<template>
	<div>
		<div v-if="value.type=='text'" :style="{width:value.width+'px'}"  style="min-width: 20px;min-height: 20px;">
            {{value.value}}
		</div>
        <div v-if="value.type=='title'" :style="{width:value.width+'px'}"  style="min-width: 20px;min-height: 20px;">
            {{value.value}}
        </div>
        <div v-if="value.type=='input'" >
            <input :style="{width:value.width+'px',border:value.borderStyle}" v-model="value.value" style="min-width: 20px;min-height: 20px;"  >
        </div>
        <div v-if="value.type=='radio'" >
            <input type="radio" name="" v-model="value.text">
        </div>
        <div v-if="value.type=='checkbox'" >
            <input type="checkbox" name="" v-model="value.text">
        </div>
        <div v-if="value.type=='line'">
            <div style="margin-top:1px;height:1px;background: #000;":style="{width:value.width+'px'}"></div>
        </div>
        <div v-if="value.type=='verticalLine'">
            <div style="margin-left:1px;width:1px;background: #000;":style="{height:value.height+'px'}"></div>
        </div>
        <div v-if="value.type=='textarea'" >
            <textarea :style="{height:value.height+'px',width:value.width+'px'}" v-model="value.text"></textarea>
        </div>
        <div v-if="value.type=='autoInput'" >
            <textarea :style="{height:value.height+'px',width:value.width+'px'}" v-model="value.text"></textarea>
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