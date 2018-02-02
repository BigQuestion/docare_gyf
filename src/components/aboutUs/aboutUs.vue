<template>
    <div v-if="noneData" class="dictionaries">
        <div class="window_load">
            <div class="load_top">
                <div>关于</div>
                <div @click="aboutNone" class="top_active">X</div>
            </div>
            <div class="nameInComplay">DoCare麻醉临床信息系统V5.0</div>
            <div class="nameInComplay">麦迪斯顿医疗科技 版权所有</div>
            <div class="copyRight">
                <img src="../../assets/logo2.png">
                <span>Copyright© 2000-2012 Medicalsystem.All Rights Reseved.</span>
            </div>
            <div style="text-align:right;padding-top:40px;padding-right:5%;box-sizing:border-box;">
                <button @click="aboutNone" style="width:130px;height:40px;line-height:40px;">确定</button>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            noneData: this.parentToChild.dataInParent,
        }
    },
    props: [
        'parentToChild'
    ],
    methods: {
        aboutNone() {
            // console.log(this.noneData)
            this.parentToChild.dataInParent = !this.noneData;
            // console.log(this.parentToChild.dataInParent)
            this.noneData = !this.noneData;
            // console.log(this.noneData)
        }
    }

}
</script>
<style scoped>
.window_load {
    position: absolute;
    z-index: 11;
    width: 790px;
    height: 440px;
    left: calc(50% - 395px);
    top: calc(50% - 220px);
}

.nameInComplay {
    font-size: 40px;
    color: #222;
    box-sizing: border-box;
    padding-left: 10%;
    margin-top: 4%;
}

.copyRight {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgb(9, 45, 76);
    font-size: 18px;
    box-sizing: border-box;
    padding-left: 10%;
    padding-bottom: 28px;
    margin-top: 4%;
    height: 90px;
    border-bottom: 2px solid rgb(175, 205, 242);
}

.copyRight img {
    height: 60px;
}

.copyRight span {
    padding-left: 5%;
}
</style>
