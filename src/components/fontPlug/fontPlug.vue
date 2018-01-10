<template>
    <div @click="atherPlacFuntion" class="imposi">
        <div @click.stop="noFunction" class="fontBox" :class="{animation:clickAtherPlace}">
            <div class="fontTop">
                <div>字体</div>
                <div @click="functionNone" class="font_active">X</div>
            </div>
            <div class="bottomFontChoose">
                <div class="chooseBox">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            clickAtherPlace: false,
            fontFamily: [
                { fontFamilyData: '宋体' },
                { fontFamilyData: '楷体' },
                { fontFamilyData: '微软雅黑' },
                { fontFamilyData: '微软雅黑' },
                { fontFamilyData: '微软雅黑' },
            ],
            fontWeight: [
                { fontWeightData: '正常' },
                { fontWeightData: '斜体' },
                { fontWeightData: '加粗' },
                { fontWeightData: '' },
                { fontWeightData: '微软雅黑' },
            ]
        }
    },
    methods: {
        atherPlacFuntion() {
            this.clickAtherPlace = !this.clickAtherPlace;
            setTimeout(() => {
                this.clickAtherPlace = !this.clickAtherPlace;
            }, 1000);
        },
        functionNone() {
            this.fatherToChild.noneData = !this.fatherToChild.noneData;
        },
        noFunction() {

        },
        ah() {
            alert('111')
        }
    },
    props: ['fatherToChild'],
}
</script>
<style scoped>
.imposi {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    width: 100%;
    min-width: 1024px;
    height: 100%;
    min-height: 768px;
}

.fontBox {
    position: absolute;
    z-index: 20;
    width: 40%;
    height: 60%;
    /* left: calc(50% - 20%); */
    /* margin-left: -20%; */
    /* top: 50%; */
    /* margin-top: -30%; */
    background: rgb(240, 240, 240);
    border: 1px solid rgb(24, 131, 215);
    cursor: auto;
    box-shadow: 1px 1px 20px #AAA;
}

.fontTop {
    width: 100%;
    height: 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
}

.font_active {
    width: 35px;
    height: 100%;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: rgb(153, 153, 153);
    font-family: microsoft YaHei;
}

.font_active:hover {
    animation: colorChange 0.5s infinite;
    animation-iteration-count: 1;
    color: #fff;
    background-color: rgb(232, 17, 35);
}

.font_active:active {
    background-color: rgb(241, 112, 112);
    color: #fff;
}

@keyframes colorChange {
    from {
        background-color: rgb(225, 225, 225);
    }
    to {
        background-color: rgb(232, 17, 35);
    }
}

.animation {
    animation: backShadow 0.2s linear;
    animation-iteration-count: 5;
}

@keyframes backShadow {
    25% {
        box-shadow: 1px 1px 20px #AAA;
        border: 1px solid #AAA;
    }
    50% {
        box-shadow: 1px 1px 10px #AAA;
        border: 1px solid rgb(24, 131, 215);
    }
    75% {
        box-shadow: 1px 1px 20px #AAA;
        border: 1px solid #AAA;
    }
    100% {
        box-shadow: 1px 1px 10px #AAA;
        border: 1px solid rgb(24, 131, 215);
    }
}

.bottomFontChoose {
    width: 100%;
    height: calc(100% - 30px);
    box-sizing: border-box;
    padding: 20px 15px 30px;
}

.chooseBox {
    width: 100%;
}
</style>
