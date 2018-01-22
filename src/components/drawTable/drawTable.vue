<template>
	<div ref="area" style="position: relative;margin:10px;">
		<!-- <div style="width:500px;">
			<div v-for="item in rows" style="border-bottom: 1px solid #000;width:100%;box-sizing: border-box;height:20px;">
			</div>
		</div>
		<div style="position:absolute;top:0px;left:0px;height:500px;display: flex;">
			<div v-for="item in columns" style="border-right: 1px solid #000;height:100%;box-sizing: border-box;width:10px;">
			</div>
		</div> -->
		<div id="tableGrid"></div>
		<div style="position:absolute;top:0px;left:0px;">
			<svg width="500" height="500">
				<g style="">
					<path style="stroke:blue;" :d="line" /> 
				</g>
			</svg>
		</div>
		<div style="position:absolute;" v-for="(item,index) in data" :style="{left:item.x+'px',top:item.y+'px'}" @mousedown.stop="itemMouseDown($event,item,index)" @mouseover.stop="itemMouseOver($event,item)">
			<svg style="margin-left:-3px;margin-top:-3px;">
				<g style="">
					<line x1="0" y1="0" x2="6.7" y2="6.7" style="stroke:red;" />
					<line x1="6.7" y1="0" x2="0" y2="6.7" style="stroke:red;" />
				</g>
			</svg>
		</div>
	</div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
export default {
	data() {
		return {
			data: [
				{ "x": 20, "y": 20 },
				{ "x": 40, "y": 10 },
				{ "x": 60, "y": 40 },
				{ "x": 80, "y": 5 },
				{ "x": 100, "y": 50 },
				{ "x": 120, "y": 35 },
				{ "x": 140, "y": 10 }
			],
			line: '',
			rows: 25,
			columns: 50,
			handleItem:{},
		}
	},
	methods: {
		itemMouseDown(e, currentItem,index){
			console.log(index);
			this.handleIndex = index;
			this.handleItem = currentItem;
            this.dragX = e.clientX;
            this.dragY = e.clientY;

            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            this.area.addEventListener('mousemove', this.areaMouseMove);
            this.area.addEventListener('mouseup', this.areaMouseUp);

		},
		areaMouseMove(e){
			// console.log(e.offsetY);
			
			let y = e.clientY-this.offsetY;
			this.handleItem.y = e.clientY;
			this.data[this.handleIndex].y = y;
			this.calculatePath();
		},
		areaMouseUp(e){
			console.log('up');
            this.area.removeEventListener('mousemove', this.areaMouseMove);
            this.area.removeEventListener('mouseup', this.areaMouseUp);

		},
		itemMouseOver(){

		},
		calculatePath() {
			//构造器会将数据集中的每一个数据传入访问器函数，并使用其返回值作为 x坐标或y坐标：
			const dataone = d3.line()
				.x(
					(data) => {
						return data.x
					}
				)
				.y(
					(data) => {
						return data.y
					}
				);
			this.line = dataone(this.data);
			
		},
		init(){
		// (1) 生成一个10元素的数组
		var w = 800,  
		    h= 150,  
		    p= 0,//内边距  
		    x= d3.scaleLinear().domain([0, 1]).range([p, w - p]), //(2) 定义x和y比例尺  
		    y= d3.scaleLinear().domain([0, 1]).range([h - p, p]);  
		   
		//(3) 绘制SVG  
		var svg = d3.select("#tableGrid").append("svg")  
		   .attr("width", w)  
		   .attr("height", h);  
		   
		//(4) 给SVG添加分组，并设置样式类，样式见<style>标签中的设置  
		var grid = svg.selectAll(".grid")  
		   .data(x.ticks(50))  
		 .enter().append("g")  
		   .attr("class", "grid");  
		//(5) 添加线条，设置起始坐标(x1,y1)和结束坐标(x2,y2)的值即可  
		//竖线  
		grid.append("line")  
		   .attr("x1", x)  
		   .attr("x2", x)  
		   .attr("y1", p)  
		   .attr("y2", h - p - 1);  
		   
		//横线  
		grid.data(x.ticks(10))
			.append("line")  
		   .attr("y1", y)  
		   .attr("y2", y)  
		   .attr("x1", p)  
		   .attr("x2", w - p + 1);
	}
	},
	mounted() {
		this.calculatePath();
		this.init();
		this.area = this.$refs.area;
	},
	components: {

	},
	computed: {

	}
}

</script>
<style scoped>
svg {
	/*margin: 25px;*/
}

path {
	fill: none;
	stroke: red;
	stroke-width: 1px;
}

</style>
