<template>
    <div style="width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:wrap;">
        <div v-if="page == false" :title="item.titleWord" v-for="item in dataBody" style="width:auto;font-size:14px;padding:0 20px 2px 0;display:flex;cursor:default;">
            <span style="padding-right:5px;width:26px;display:block;">{{item.number}}</span>
            <span style="padding-right:5px;">{{item.ITEM_NAME}}</span>
            <span style="padding-right:">{{item.DOSAGE}}</span>
            <span>{{item.DOSAGE_UNITS}}</span>
        </div>
        <div v-else>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataBody: [],
            tipTop: '',
            tipLeft: '',
            tipView: false,
            title: '',
            // showDataMore:'',
        }
    },
    methods: {
        selectMedAnesthesiaEventList() {
            console.log(this.page)

            console.log(this.dataOfPeo)
            let params = {
                patientId: this.dataOfPeo.patientId,
                operId: this.dataOfPeo.operId,
                visitId: this.dataOfPeo.visitId
            }
            this.api.selectMedAnesthesiaEventList(params)
                .then(
                res => {
                    console.log(res.list)
                    for (var i = 0; i < res.list.length; i++) {
                        this.$set(res.list[i], 'number', i + 1);
                        if (res.list[i].ENDDATE !== null) {
                            if (res.list[i].DOSAGE !== null) {
                                var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '结束时间：' + res.list[i].ENDDATE, '量：' + res.list[i].DOSAGE, '单位：' + res.list[i].DOSAGE_UNITS];
                            } else {
                                var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME, '结束时间：' + res.list[i].ENDDATE];
                            }

                        } else {
                            var titleData = [res.list[i].ITEM_NAME, '================', '开始时间：' + res.list[i].START_TIME];
                        }


                        this.title = titleData.join('\n');
                        this.$set(res.list[i], 'titleWord', this.title);
                    }
                    this.dataBody = res.list;
                });


        },
    },
    props: ['dataOfPeo', 'page'],
    mounted() {
        if (this.page == false) {
            this.selectMedAnesthesiaEventList();
        }
    }
}
</script>
<style scoped>

</style>