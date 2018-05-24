<template>
    <div style="margin: 10px 30px;width: 1300px;">
        <div>
            <input type="date" v-model="dateTimeValue">
            <button>查询</button>
            <button>同步其他</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dateTimeValue: '',
        }
    },
    methods:{

    },
    mounted() {
        this.dateTimeValue = new Date().Format("yyyy-MM-dd");
    }
}
</script>
<style scoped>

</style>
