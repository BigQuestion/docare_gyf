<template>
    <div>
        <textarea v-on:blur="myMethod()" @dblclick="showView" :style="{height:conInfo.height+'px',width:conInfo.width+'px',color:conInfo.ForeColor,fontSize:conInfo.fontSize+'pt'}" style="resize:none;" v-model="conInfo.value"></textarea>
        <div v-if="nameView" style="position: absolute;top: 0px;height: 300px;overflow: auto;border:1px solid;z-index: 20;background-color:white;" :style="{width:conInfo.width+'px'}">
            <div>
                <input ref="inSelect" v-model="serchZm" @keyup="serchJm" :style="{width:conInfo.width+'px'}">
            </div>
            <div class="listIngt" @click="getSelected(item)" v-for="item in medAnaesthesiaDictList" :style="{width:conInfo.width+'px'}">
                <div v-if="conInfo.dictShowFiled!=''&&conInfo.dictShowFiled!=null">
                    {{item.DICTSHOWFILED}}
                </div>
                <div v-else>{{item.DICTFILED}}</div>
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
            serchZm: '',
        }
    },
    methods: {
        myMethod() {
            this.$emit('toparentevent', this.conInfo);
        },
        showView() {
            this.nameView = true;
            let params = {
                tableName: this.conInfo.dictTableName,
                dictSelect: this.conInfo.dictSelect,
                coluName: this.conInfo.dictField,
                dictShowFiled: this.conInfo.dictShowFiled, //字典显示字段名称
            }
            this.api.getColumContext(params)
                .then(res => {
                    this.medAnaesthesiaDictList = res;
                })
            this.api.allColumContext(params)
                .then(res => {
                    this.allList = res;
                    this.$refs.inSelect.focus()
                })
        },
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
        getSelected(item) {
             console.log(this.conInfo)
            if (this.conInfo.dictShowFiled != '' && this.conInfo.dictShowFiled != null) {
                if (this.conInfo.MultiSelectMode == 'true') {
                    if (this.conInfo.value == null || this.conInfo.value == '') {
                        this.conInfo.value = item.DICTSHOWFILED;
                        //实际要修改表的值
                        this.$set(this.conInfo, 'modifyFiledValue', item.DICTFIELD);
                        // this.conInfo.modifyFiledValue = item.DICTFILED;
                    } else {
                        this.conInfo.value = this.conInfo.value + "," + item.DICTSHOWFILED;
                        // this.conInfo.modifyFiledValue = this.conInfo.value + "," + item.DICTFILED;
                        this.$set(this.conInfo, 'modifyFiledValue', this.conInfo.value + "," + item.DICTFIELD);
                    }
                } else {
                    this.conInfo.value = item.DICTSHOWFILED;
                    this.$set(this.conInfo, 'modifyFiledValue', item.DICTFIELD);
                }
            } else {
                if (this.conInfo.MultiSelectMode == 'true') {
                    if (this.conInfo.value == null || this.conInfo.value == '') {
                        this.conInfo.value = item.DICTFIELD;
                        this.$set(this.conInfo, 'modifyFiledValue', item.DICTFIELD);
                    } else {
                        this.conInfo.value = this.conInfo.value + "," + item.DICTFIELD;
                        this.$set(this.conInfo, 'modifyFiledValue', this.conInfo.value + "," + item.DICTFIELD);
                    }
                } else {
                    this.conInfo.value = item.DICTFIELD;
                    this.$set(this.conInfo, 'modifyFiledValue', item.DICTFIELD);
                }
            }
            this.$emit('toparentevent', this.conInfo);
            this.nameView = !this.nameView;
        },
    },
    created() {
        // 点击其他不在的区域触发事件
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) {
                this.nameView = false;
                this.serchZm = '';
            }
        })
    },
    props: ['conInfo'],

}
</script>
<style scoped>

</style>