<template>
    <div class="back">
        <img style="width:200px;margin:10px;" src="../../assets/logo.png" alt="">
        <h1 class="title">DoCare麻醉临床信息系统V5.0</h1>
        <div class="buttonBox">
            <div class="surround">
                <div @click="goUrl('/scheduleList')" class="systemButton" style="left:0;top:0;">
                    <span>排班系统</span>
                </div>
                <div @click="goUrl('/operationMaster')" class="systemButton" style="left:180px;bottom:0;">
                    <span>麻醉手术系统</span>
                </div>
                <div @click="goUrl('/statistics')" class="systemButton" style="left:360px;top:0;">
                    <span >工作量统计</span>
                </div>
                <div @click="goUrl('/statistics')" class="systemButton" style="left:540px;bottom:0;">
                    <span>用户管理</span>
                </div>
                <div @click="goUrl('/formDesigner')" class="systemButton" style="left:720px;top:0;">
                    <span>表单设计器</span>
                </div>
                <div @click="goUrl('/drawTable')" class="systemButton" style="left:900px;bottom:0;">
                    <span>表格组件</span>
                </div>
            </div>

        </div>
        <div class="copyRight">版权信息</div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {

        }
    },
    methods: {
        goUrl(url) {
            this.$router.push(
                {
                    path: url
                })
        },
    },
    mounted() {

    },
    components: {
    }
}
</script>
<style scoped>
.back {
    min-width: 1366px;
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../assets/loginBack.jpg') no-repeat;
    background-size: cover;
    background-position: center;
}

.title {
    color: white;
    position: absolute;
    display: block;
    width: 100%;
    text-align: center;
    top: calc(50% - 160px);
}

.buttonBox {
    position: absolute;
    /* background-color: lightblue; */
    width: 100%;
    height: 200px;
    top: calc(50% - 80px);
    left: 0;
}

.surround{
    width: 1050px;
    height: 100%;
    margin: 0 auto;
    position: relative;
}

.systemButton {
    position: absolute;
    color: #fff;
    height: 100px;
    padding: 0 10px;
    border: 1px solid rgba(142, 193, 238, 0.5);
    box-sizing: border-box;
    width: 150px;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
    text-align: center;
    background-color: rgba(142, 193, 238, 0.5);
    box-shadow: 1px 2px 10px rgba(142, 193, 238, 0.5);
}

.systemButton:hover {
    color: #fff;
    /* background-color: #00242D; */
}

.copyRight{
    color: #fff;
    font-size: 12px;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0;
    padding-bottom: 5px;
}
</style>