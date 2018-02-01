<template>
	<div style="position: relative;margin:2px;"> 
		<svg :width="svgWidth" :height="svgHeight" id="dosage">
			<g v-for="item in lineArray">
				<line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
			</g>
			<g v-for="item in lineArray">
				<line  x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:0.5px;"></line>
			</g>
		</svg>
		<div style="height: 100px;width: 140px; position: absolute;top: 0px;left: -140px;">
			<div v-for="item in dataArray" style="border-bottom: 1px solid #8391a2;height: 19px;font-size: 12px;">{{item.ITEM_NAME}}</div>
		</div>
		<div style="height: 119px;width: 25px; position: absolute;top: 0px;left: -165px;border-right: 1px solid #8391a2;border-bottom: 1px solid #8391a2;    display: flex;align-items: center;">
			输液
		</div>
		<div style="height: 60px;width: 165px; position: absolute;top: 0px;left: -165px;top:120px">
			<div v-for="item in 3" v-if="item!=3" style="border-bottom: 1px solid #8391a2;height: 19px;">{{item}}</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
export default {
	data() {
		name:'dosage'
		return { 
			lineArray:[],
			svgWidth:700,
			svgHeight:180,
			columns:50,
			rows:10,
			dataArray:[],
			forRows:6,
		}
	},
	methods: { 
		getLineXy(){
			var width = 700,
			 column = 50,
			 height = 100,
			 row = 5;
			 var array = [];
			 for (var i = 0; i < 50; i++) {
			 	array.push({
			 		x:{
			 			x1:i*(width/column),
			 			x2:i*(width/column)
			 		},
			 		y:{
			 			y1:i*(height/row),
			 			y2:i*(height/row)
			 		}
			 	})
			 }
			 this.lineArray = array;
		},
		getData(){
			for (var i = 0; i < this.forRows; i++) {
				this.dataArray.push(i)
			}
			let params = {
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId,
                itemClass:3
            }

            this.api.selectMedAnesthesiaEventList(params)
                .then(res => {
                	var list = res.list;
                	for (var i = 0; i < list.length; i++) {
                		this.$set(this.dataArray,i,list[i]);
                		this.createLine(50,200,9+i*20,9+i*20);
                	}
                })
		},

		//计算时间差分钟
        getMinuteDif(startTime,endTime){
        	let sTime = new Date(startTime).getTime()
        	let enTime = new Date(endTime).getTime()
        	var min = '';
        	min = (enTime - sTime)/1000/60; 
        	return Math.round(min) 

        },

        createLine(x1,x2,y1,y2){
        	var svg = d3.select("#dosage");
        	svg.append("line")
        	   .attr("stroke","blue")
       		   .attr("fill","none")
       		   .attr("stroke-width",1)
       		   .attr("y1",y1)
			   .attr("y2", y2)
			   .attr("x1", x1)
			   .attr("x2", x2)
        }
	},
	mounted() {  
		this.getLineXy();
		this.getData();
	},
	components: {

	},
	props:['page'],
	computed: {

	}
}

</script>
<style scoped> 

</style>