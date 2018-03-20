<template>
    <div class="dictionaries">
        <div class="window_load">
            <div class="load_top">
                <div>取消手术</div>
                <div @click="aboutNone" class="top_active">X</div>
            </div>
            <div style="padding:10px 0;">
                请输入取消手术的原因:
            </div>
            <textarea style="width:460px;height:85px;box-sizing:border-box;resize:none;" @blur="getValue($event)"></textarea>
            <div style="display:flex;flex-direction:row-reverse;padding-top:10px;">
                <button @click="aboutNone" style="width:100px;height:33px;margin-right:8px;">取消</button>
                <button @click="sure" style="width:100px;height:33px;margin-right:8px;">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cancleReason: '',
        }
    },
    props: ['dataInParent'],
    methods: {
        aboutNone() {
            this.dataInParent.dataInParent = false;
        },
        getValue(event) {
            console.log(event.srcElement.value)
            this.cancleReason = event.srcElement.value;
        },
        sure() {
            if (this.cancleReason == '') {
                alert("取消手术需要您输入原因。")
            } else {
                console.log(this.config)
                var obj = this.config;
                let dataType = {
                    cancleReason: this.cancleReason,
                    operId: obj.userInfo.operId,
                    patientId: obj.userInfo.patientId,
                    visitId: obj.userInfo.visitId,
                    enterUserId: obj.userId,
                }
                console.log(dataType)

                this.api.cancleOperationMaster(dataType)
                    .then(
                    res => {
                        console.log(res.success)
                        if (res.success == true) {
                            alert(res.msg)
                            location.reload()
                        }

                    }
                    )
            }

        }
    }
}
</script>
<style scoped>
.window_load {
    width: 460px;
    height: 220px;
    left: calc(50% - 230px);
    top: calc(50% - 110px);
}
</style>
