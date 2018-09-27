<template>
    <div style="height:100%;background-color:#f5f5f5;box-sizing:border-box;">
        <div class="flex w100 topal">
            <img style="width:auto;height:55px;" src="../../assets/logo.png">
            <div class="flex1 topButton" :class="{clickClass:clickDataOne}" @click="operationSchedulVue()">
                <span :class="{clickClass:clickDataOne}">1</span>手术排班</div>
            <div class="flex1 topButton" :class="{clickClass:clickDataTwo}" @click="applicationVue()">
                <span :class="{clickClass:clickDataTwo}">2</span>手术申请</div>
            <div class="flex1 topButton" :class="{clickClass:clickDataThree}" @click="revocationVue()">
                <span :class="{clickClass:clickDataThree}">3</span>手术撤销</div>
            <div class="flex1 topButton" :class="{clickClass:clickDataFour}" @click="noticeVue()">
                <span :class="{clickClass:clickDataFour}">4</span>手术安排表</div>
            <!-- <div class="flex1 topButton" @click="goScheduleReportView()">4.手术通知单</div> -->
            <div class="flex1 topButton" :class="{clickClass:clickDataFive}" @click="systemVue()">
                <span :class="{clickClass:clickDataFive}">5</span>系统配置</div>
            <div class="flex1 topButton" :class="{clickClass:clickDataSix}" @click="HISVue()">
                <span :class="{clickClass:clickDataSix}">6</span>HIS同步</div>
            <div class="flex1 topButton" @click="exit()">
                <span>7</span>返回列表</div>
        </div>
        <operationSchedul v-if="operationSchedul"></operationSchedul>
        <surgicalApplication v-if="surgicalApplication"></surgicalApplication>
        <surgicalRevocation v-if="surgicalRevocation"></surgicalRevocation>
        <surgicalNotice v-if="surgicalNotice"></surgicalNotice>
        <systemConfiguration v-if="systemConfiguration"></systemConfiguration>
        <HISsynchronization v-if="HISsynchronization"></HISsynchronization>
    </div>
</template>
<script>
import operationSchedul from '@/components/schedulComponents/operationSchedul.vue';//手术排班
import surgicalApplication from '@/components/schedulComponents/surgicalApplication.vue'//手术申请
import surgicalRevocation from '@/components/schedulComponents/surgicalRevocation.vue'//手术撤销
import surgicalNotice from '@/components/schedulComponents/surgicalNotice.vue'//手术安排表
import systemConfiguration from '@/components/schedulComponents/systemConfiguration.vue'//系统配置
import HISsynchronization from '@/components/schedulComponents/HISsynchronization.vue'//HIS同步
export default {
    name: 'login',
    data() {
        return {
            operationSchedul: true,
            surgicalApplication: false,
            surgicalRevocation: false,
            surgicalNotice: false,
            systemConfiguration: false,
            HISsynchronization: false,
            clickDataOne: true,
            clickDataTwo: false,
            clickDataThree: false,
            clickDataFour: false,
            clickDataFive: false,
            clickDataSix: false,
        }
    },
    methods: {
        // goScheduleReportView() {
        //     debugger
        //     this.$router.push({
        //         path: '/goScheduleReportView'
        //     })
        // },
        operationSchedulVue() {
            this.operationSchedul = true;
            this.surgicalApplication = false;
            this.surgicalRevocation = false;
            this.surgicalNotice = false;
            this.systemConfiguration = false;
            this.HISsynchronization = false;

            this.clickDataOne = true;
            this.clickDataTwo = false;
            this.clickDataThree = false;
            this.clickDataFour = false;
            this.clickDataFive = false;
            this.clickDataSix = false;
        },
        applicationVue() {
            this.operationSchedul = false;
            this.surgicalApplication = true;
            this.surgicalRevocation = false;
            this.surgicalNotice = false;
            this.systemConfiguration = false;
            this.HISsynchronization = false;

            this.clickDataOne = false;
            this.clickDataTwo = true;
            this.clickDataThree = false;
            this.clickDataFour = false;
            this.clickDataFive = false;
            this.clickDataSix = false;
        },
        revocationVue() {
            this.operationSchedul = false;
            this.surgicalApplication = false;
            this.surgicalRevocation = true;
            this.surgicalNotice = false;
            this.systemConfiguration = false;
            this.HISsynchronization = false;

            this.clickDataOne = false;
            this.clickDataTwo = false;
            this.clickDataThree = true;
            this.clickDataFour = false;
            this.clickDataFive = false;
            this.clickDataSix = false;
        },
        noticeVue() {
            this.operationSchedul = false;
            this.surgicalApplication = false;
            this.surgicalRevocation = false;
            this.surgicalNotice = true;
            this.systemConfiguration = false;
            this.HISsynchronization = false;

            this.clickDataOne = false;
            this.clickDataTwo = false;
            this.clickDataThree = false;
            this.clickDataFour = true;
            this.clickDataFive = false;
            this.clickDataSix = false;
        },
        systemVue() {
            this.operationSchedul = false;
            this.surgicalApplication = false;
            this.surgicalRevocation = false;
            this.surgicalNotice = false;
            this.systemConfiguration = true;
            this.HISsynchronization = false;

            this.clickDataOne = false;
            this.clickDataTwo = false;
            this.clickDataThree = false;
            this.clickDataFour = false;
            this.clickDataFive = true;
            this.clickDataSix = false;
        },
        HISVue() {
            this.operationSchedul = false;
            this.surgicalApplication = false;
            this.surgicalRevocation = false;
            this.surgicalNotice = false;
            this.systemConfiguration = false;
            this.HISsynchronization = true;

            this.clickDataOne = false;
            this.clickDataTwo = false;
            this.clickDataThree = false;
            this.clickDataFour = false;
            this.clickDataFive = false;
            this.clickDataSix = true;
        },
        exit() {
            if (confirm("是否要返回页面选择？")) {
                this.$router.push({
                    path: 'menu'
                })
            } else {

            }
        },
    },
    mounted() {

    },
    components: {
        operationSchedul: operationSchedul,
        surgicalApplication: surgicalApplication,
        surgicalRevocation: surgicalRevocation,
        surgicalNotice: surgicalNotice,
        systemConfiguration: systemConfiguration,
        HISsynchronization: HISsynchronization,

    }
}
</script>
<style scoped>
.topal {
    align-items: center;
    height: 70px;
    width: 100%;
    background: url('../../assets/scheduling.jpg') no-repeat;
    background-size: cover;
    /* margin: 5px; */
    position: fixed;
    top:0;
    z-index:9999;
}

.topButton {
    /* height: 100%; */
    cursor: pointer;
    text-align: center;
    line-height: 70px;
    color: #fff;
    font-size: 16px;
}

.topButton span {
    display: inline-block;
    border-radius: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid #C9E1FB;
    background-color: #476793;
    text-align: center;
    line-height: 40px;
    margin-right: 5px;
}

.clickClass {
    background: url('../../assets/buttonBack.jpg') no-repeat;
    background-size: cover;
}
</style>