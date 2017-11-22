<template>
    <div>
        <div>
            <textarea  v-model="sql"></textarea>
        </div>
        <div>
            <button @click="doSql">查询</button>
        </div>
        <div>
            <!-- <textarea v-model="result"></textarea> -->
            <div style="display: flex">
                <div v-for="(value,key) in obj" class="item">
                    {{key}}
                </div>
            </div>
            <div v-for="item in result" style="display: flex">
                <div v-for="(value,key) in item" class="item">
                    {{value}}
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
            sql:'select * from med_anesthesia_comm_dict t where rownum<10',
            //sql:'select NAME from med_pat_master_index where  patient_id=\'10966589\';',
            result:'',
            obj:{},
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
                        this.result = res;
                        this.obj = res[0];
                    }
                )
        }
    },
    mounted(){
        
    },
    components: {
    }
}
</script>
<style scoped>
.flex1{
    flex:1;
}
.item{
    border:1px solid #CCCCCC;
    width:120px;
}
</style>