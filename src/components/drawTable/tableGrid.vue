<template>
	<div style="position: relative;margin:2px;">
		<div id="tableGrid"></div>
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
		 
		init(){
		// (1) 生成一个10元素的数组
		var w = 720,  
		    h= 100,  
		    p= 20,//内边距  
		    x= d3.scaleLinear().domain([0, 1]).range([p, w - p]), //(2) 定义x和y比例尺  
		    y= d3.scaleLinear().domain([0, 1]).range([h - p, p]);  
		   
		//(3) 绘制SVG  
		var svg = d3.select("#tableGrid").append("svg")  
		   .attr("width", w)  
		   .attr("height", h);

		    let scale = d3.scaleLinear()  //x轴尺度
             .domain([0, w])
             .range([p, w - p]);
 
           // let xAxis = d3.svg.axis()  //创建x轴
           //   .scale(scale)          //设置x轴尺度  
           //   .orient("bottom");   //设置x轴位置

			var xAxis = d3.axisBottom()
			    .scale(scale);  
           svg.append("g")            // 移动x轴的位置，保证从原点开始
             .attr("class", "x-axis")
             .attr("transform","translate(0 0)")
             .call(xAxis)
             //.selectAll("line")
             //.attr("transform", "rotate(90)")
             //.selectAll("text")
             //.attr("transform", "rotate(90,20 2)")
		//(4) 给SVG添加分组，并设置样式类，样式见<style>标签中的设置  
		var grid = svg.selectAll(".grid")  
		   .data(x.ticks(40))  
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
		grid.data(x.ticks(5))
			.append("line")  
		   .attr("y1", y)  
		   .attr("y2", y)  
		   .attr("x1", p)  
		   .attr("x2", w - p + 1);



		  
	}
	},
	mounted() { 
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