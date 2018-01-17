<template>
    <div>
    	<div @click="loadFun(node,fieldName)">{{node[fieldName]}}</div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {

        }
    },
    methods: {
        init(){
            console.log(this.loadFun);
            console.log(this.node[this.fieldName]);
        },
    },
    mounted() {
        this.init();
        console.log();
    },
    components: {
        
    },
    computed: {

    },
    props:['loadFun','node','fieldName']
}

</script>
<style scoped>


</style>
