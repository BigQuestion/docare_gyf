<template>
    <div>
        <textarea v-on:blur="myMethod()" :style="{height:conInfo.height+'px',width:conInfo.width+'px',color:conInfo.ForeColor,fontSize:conInfo.fontSize+'pt'}" style="resize:none;" v-model="conInfo.value"></textarea>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        myMethod(){
            this.$emit('toparentevent', this.conInfo);
        }
    },
    props: ['conInfo'],

}
</script>
<style scoped>

</style>