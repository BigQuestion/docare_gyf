<template>
	<div>
		<div class="flex">
            <div class="leftButtons" >
                <div v-for="btn in btns" class="btn" draggable="true" @dragstart="drag($event,btn)">
                    {{btn.text}}
                </div>
            </div>
            <div>
                <div class="designArea" @dragover.prevent @drop="drop" @click="clearClick()">
                    <div class="item"  style="position:absolute;" :class="{choosed:(item==chooseItem)}" draggable="true" v-for="item in formItems" :style="{left:item.x+'px',top:item.y+'px'}" @dragstart="itemDrag($event,item)" @click.stop="itemChoose($event,item);">
                        <div>{{item.text}}</div>
                    </div>
                </div>
            </div>
            
            <div class="editBox">
                <div>
                    数据编辑区域
                </div>
                <div v-if="chooseItem.text">
                    <input type="" name="" v-model="chooseItem.text">
                </div>
            </div>
		</div>
	</div>
</template>
<script>

export default {
    name: 'login',
	data () {
  		return {
            formItems:[],
            btns:[{
                text:'文本',
                type:'text'
            },{
                text:'输入',
                type:'input'
            },{
                text:'单选',
                type:'radio'
            },],
            handleItem:{},
            offsetX:'',
            offsetY:'',
            chooseItem:{},
    	}
    },
    methods:{
        clearClick(){
            debugger
            this.chooseItem = {};
        },
        itemChoose(e,item){
            debugger
            this.chooseItem = item;
            e.preventDefault();
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
            e.dataTransfer.setData('data',obj);
        },
        drop: function(e) {
            debugger
            if(this.handleItem.type){
                this.handleItem.x = e.clientX-200-this.offsetX;
                this.handleItem.y = e.clientY-this.offsetY;
                this.handleItem = {};
            }else{
                let data = JSON.parse(e.dataTransfer.getData('data'));
                data.x = e.clientX-200;
                data.y = e.clientY;
                this.formItems.push(data);
                this.handleItem = {};
            }
        }
    },
    mounted(){
        
    }
}
</script>
<style type="text/css" scoped>
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
    height:200px;
    width:200px;
}
</style>