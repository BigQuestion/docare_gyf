<template>
	<div>
		<div v-if="value.type=='text'" :style="{width:value.width+'px'}"  style="min-width: 20px;min-height: 20px;">
            {{value.value}}
		</div>
        <div v-if="value.type=='title'" :style="{width:value.width+'px'}"  style="min-width: 20px;min-height: 20px;">
            {{value.value}}
        </div>
        <div v-if="value.type=='input'" >
            <common-select v-if="!isPage.isPage" :conInfo="value" attrName="value" :data="updateData" v-on:toparentevent="getChlidValue"></common-select>
            <input v-else type="text" :style="{width:value.width+'px'}" readonly="true">
            <!-- <div v-if="value.dictTableName">
            </div> -->
            <!-- <div v-else>
                <input :style="{width:value.width+'px',border:value.borderStyle,color:value.ForeColor,}" v-model="value.value" style="min-width: 20px;min-height: 20px;">
            </div> -->
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
        <div v-if="value.type=='formDiv'" >
            <div style="width: 800px;height: 300px;border:1px solid red;z-index: 5;"></div>
        </div>
        
        <div v-if="value.type=='checkBoxAll'" >
            <div style="min-width: 100px;height: 40px;border:1px solid;z-index: 5;">
                <input type="checkbox" name="" v-for="item in list">
            </div>
        </div>
	</div>
</template>
<script>
import commonSelect from '@/components/commonSelect/commonSelect.vue';
export default {
	data () {
  		return {
            updateData:[],
            list:[1,2,3]
    	}
    },
    methods:{
        getChlidValue(data){
           this.$emit('toTopEvent',data);
        },
    },
    props:['value','isPage'],// 设置value为props属性-必须
    computed:{
        
    },
    components: {
        commonSelect
    },
    mounted(){  
        console.log(this.isPage.isPage)
    }
}
</script>
<style type="text/css" scoped>

</style>