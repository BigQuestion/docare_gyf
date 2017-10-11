<template>
	<div>
		<div class="flex" >
            <div class="leftButtons" >
                <div v-for="btn in btns" class="btn" draggable="true" @dragstart="drag($event,btn)">
                    {{btn.text}}
                </div>
            </div>
            <div>
                <div class="designArea" ref="area" @dragover.prevent @drop="drop" @click="clearClick($event)" @mousedown="areaMouseDown($event)">
                    <div class="item"  style="position:absolute;min-height: 3px;min-width:3px;" :class="{choosed:item.chosen}" v-for="item in formItems" :style="{left:item.x+'px',top:item.y+'px'}" @click.stop="itemChoose($event,item);" @mousedown.stop="itemMouseDown">
                        <form-element :value="item"></form-element>
                    </div>
                    <!-- <div class="item"  style="position:absolute;min-height: 3px;min-width:3px;" :class="{choosed:item.chosen}" draggable="true" v-for="item in formItems" :style="{left:item.x+'px',top:item.y+'px'}" @dragstart.stop="itemDrag($event,item)" @click.stop="itemChoose($event,item);" @mousedown.stop="itemMouseDown">
                        <form-element :value="item"></form-element>
                    </div> -->
                    <div class="mask">
                        <div v-if="chooseRect.endX" style="background:rgba(0,0,0,0.3);position:absolute;" :style="{left:chooseRect.startX+'px',top:chooseRect.startY+'px',width:(chooseRect.endX-chooseRect.startX)+'px',
                        height:(chooseRect.endY-chooseRect.startY)+'px'}"></div>
                    </div>
                </div>
            </div>
            <div class="editBox">
                <div>
                    数据编辑区域
                </div>
                <div v-if="chooseItems[0]&&chooseItems[0].value">
                    <input type="" name="" v-model="chooseItems[0].value">
                </div>
                <div v-if="chooseItems[0]&&chooseItems[0].width">
                    <input type="" name="" v-model="chooseItems[0].width">
                </div>
                <div v-if="chooseItems[0]&&chooseItems[0].height">
                    <input type="" name="" v-model="chooseItems[0].height">
                </div>
            </div>
		</div>
	</div>
</template>
<script>
import formElement from '@/components/formElement/formElement.vue';
export default {
    name: 'login',
	data () {
  		return {
            formItems:[],
            btns:[{
                text:'文本',
                type:'text',
                value:'输入文字'
            },{
                text:'输入',
                type:'input'
            },{
                text:'单选',
                type:'radio'
            },{
                text:'多选',
                type:'checkbox'
            },{
                text:'横线',
                type:'line',
                width:'100'
            },{
                text:'竖线',
                type:'verticalLine',
                height:'100'
            }],
            handleItem:{},
            offsetX:'',
            offsetY:'',
            chooseItems:[],
            chooseRect:{},
            area:'',
            chooseMode:false,
            domItems:[],
    	}
    },
    methods:{
        itemMouseDown(e){
            // this.area.addEventListener('mousemove',itemMove);
            // this.area.addEventListener('mouseup',itemStop);
        },
        keyD(e){
            if(e.key=='Shift'){
                this.chooseMode = true;
            }
            console.log(e);
        },
        keyU(e){
            if(e.key=='Shift'){
                this.chooseMode = false;
            }
            console.log(e);
        },
        areaMouseMove(e){
            console.log('move');
            this.$set(this.$data.chooseRect,'endX',e.clientX-200);
            this.$set(this.$data.chooseRect,'endY',e.clientY);
        },
        areaMouseUp(e){
            this.area.removeEventListener('mousemove',this.areaMouseMove);
            this.chooseRect = {};
        },
        areaMouseDown(e){
            this.area = this.$refs.area;
            this.area.addEventListener('mousemove',this.areaMouseMove);
            this.area.addEventListener('mouseup',this.areaMouseUp);

            this.chooseRect.startX = e.clientX-200;
            this.chooseRect.startY = e.clientY;
        },
        clearClick(e){
            console.log('click');
            this.chooseItems = [];
            for (var i = this.formItems.length - 1; i >= 0; i--) {
                this.formItems[i].chosen = false;
            }
            e.preventDefault();
        },
        itemChoose(e,item){
            if(this.chooseMode){
                this.chooseItems.push(item);
                debugger
                this.domItems.push(e.currentTarget)
                item.chosen = true;
                e.preventDefault();
            }else{
                if(this.chooseItems[0]){
                    this.chooseItems[0].chosen = false;
                }
                this.chooseItems = [item];
                this.domItems = [e.currentTarget];
                item.chosen = true;
            }
        },
        itemDrag(e,item){
            this.handleItem = item;
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
        },
        itemDragEnd(e,item){
            // debugger
            // item.x = e.offsetX;
            // item.y = e.offsetY;
            // e.preventDefault();
        },
        drag(e,btn){
            // debugger
            let obj = JSON.stringify(btn);
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            e.dataTransfer.setData('data',obj);
        },
        drop: function(e) {
            if(this.handleItem.type){
                this.handleItem.x = e.clientX-200-this.offsetX;
                this.handleItem.y = e.clientY-this.offsetY;
                this.handleItem = {};
            }else{
                let data = JSON.parse(e.dataTransfer.getData('data'));
                data.x = e.clientX-200-this.offsetX;
                data.y = e.clientY-this.offsetY;
                this.formItems.push(data);
                this.handleItem = {};
            }
        }
    },
    components:{
        formElement
    },
    mounted(){
        
    },
    created(){
        let component = this;
        document.onkeydown = function(e){
            component.keyD(e);
        }
        document.onkeyup = function(e){
            component.keyU(e);
        }
    }
}
</script>
<style type="text/css" scoped>
.mask{
    position: absolute;
    height:100%;
    width: 100%;
    background: rgba(0,0,0,0);
    pointer-events: none;
}
.item.choosed{
    border:1px dashed #000;
}
.item:hover{
    background: #E6E6E6;
    cursor:pointer;
}
.leftButtons{
    width:200px;
}
.btn{
    background: #00FFFF;
    margin-top: 10px;
    width:50px;
    text-align: center;
}
.designArea{
    position: relative;
    background: #CCCCCC;
    height:600px;
    width:600px;
}
</style>