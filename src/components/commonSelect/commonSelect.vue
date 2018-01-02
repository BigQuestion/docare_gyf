<template>
    <div style="position: relative;">
        <div v-if="conInfo.dictTableName">
            <div v-if="conInfo.isEditMode=='false'&&conInfo.readOnlyMode=='false'" @dblclick="showView" :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,}" style="display:inline-block;border:1px solid #A9A9A9;min-height:19px;font-size:13.3333px;font-family:Arial;">{{infoData[attrName]}}</div>
            <!-- <input @dblclick="showView" v-model="infoData[attrName]" :style="{width:conInfo.width+'px'}" > -->
            <input v-if="conInfo.isEditMode=='true'&&conInfo.readOnlyMode=='false'" v-model="infoData[attrName]" :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,}">
            <input v-if="conInfo.readOnlyMode=='true'" v-model="infoData[attrName]" :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,}" :readonly="true">
            <div v-if="nameView" style="position: absolute;top: 0px;height: 300px;overflow: auto;border:1px solid;z-index: 1;background-color:white;" :style="{width:conInfo.width+'px',}">
                <div>
                    <input v-model="serchZm" @keyup="serchJm">
                </div>
                <div @click="getSelected(item)" v-for="item in medAnaesthesiaDictList" style="background-color: white;" :style="{width:conInfo.width+'px'}">
                    {{item.SPENAME}}
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="conInfo.strFormat">
                <input :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,}" v-model="strToDate" style="min-width: 20px;min-height: 20px;" :readonly="conInfo.isEditMode">
            </div>

            <div v-else>
                <input :style="{width:conInfo.width+'px',border:conInfo.borderStyle,color:conInfo.ForeColor,}" v-model="infoData.value" style="min-width: 20px;min-height: 20px;" :readonly="conInfo.isEditMode">
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            nameView: false,
            medAnaesthesiaDictList: [],
            allList: [],
            serchZm: '',
            updateData: [],
            infoData: this.conInfo,
            changeTimes: 0,

        }
    },
    methods: {
        showView() {
            console.log(this.conInfo)
            this.nameView = true;
            let params = {
                tableName: this.conInfo.dictTableName,
                dictSelect: this.conInfo.dictSelect,
                coluName: this.conInfo.dictField
            }
            this.api.getColumContext(params)
                .then(res => {
                    this.medAnaesthesiaDictList = res;
                })

            this.api.allColumContext(params)
                .then(res => {
                    this.allList = res;
                })

        },
        getSelected(item) {
            if (this.infoData.MultiSelect) {
                if (this.conInfo.value == null) {
                    this.conInfo.value = item.SPENAME;
                }
                else {
                    this.conInfo.value = this.conInfo.value + "," + item.SPENAME;
                }
            }
            else {
                this.conInfo.value = item.SPENAME;
            }

            this.nameView = !this.nameView;
        },
        //失去焦点的时候消失
        disShowView() {
            this.nameView = false;
        },
        //对于输入拼音简码进行筛选
        serchJm() {
            var list = this.allList;
            var m = this.serchZm.toUpperCase();
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].PYJM && list[i].PYJM.indexOf(m) >= 0) {
                    newList.push(list[i]);
                }

            }
            this.medAnaesthesiaDictList = newList;
        },

    },
    computed: {
        strToDate() {
            if (this.conInfo.strFormat && this.conInfo.value) {
                var time = new Date(this.conInfo.value);
                var y = time.getFullYear();
                if (y < 10) {
                    y = '0' + y;
                }
                var m = time.getMonth() + 1;
                if (m < 10) {
                    m = '0' + m;
                }
                var d = time.getDate();
                if (d < 10) {
                    d = '0' + d;
                }
                return y + '-' + m + '-' + d;
            }
        }
    },
    props: ['conInfo', 'attrName', 'data'],
    mounted() {
        console.log(this.conInfo)
    },
    created() {
        // 点击其他不在的区域触发事件
        document.addEventListener('click', (e) => {
            //console.log(this.$el.contains(e.target));
            if (!this.$el.contains(e.target)) {
                this.nameView = false;
                this.serchZm = '';
            }
        })
    },
    watch: {
        "infoData.value": function() {
            this.changeTimes = this.changeTimes + 1;
            if (this.changeTimes > 1) {
                this.$emit('toparentevent', this.conInfo.value);
            }
        }
    }
}
</script>
<style scoped>

</style>