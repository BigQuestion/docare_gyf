<template>
	<div style="position: relative;margin:2px;">
		<div id="tableGrid"></div>
		<div style="position:absolute;top:0px;left:0px;">
			<svg :width="wd" :height="ht">
				<g style="">
					<path style="stroke:blue;" :d="line" />
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
				{ "x": 90, "y": 25 },
				{ "x": 30, "y": 25 },
				{ "x": 60, "y": 25 },
			],
			line: '',
			rows: 25,
			columns: 50,
			handleItem:{},
			wd:0,
			ht:0,
		}
	},
	methods: {
		 
		init(){
		// (1) 生成一个10元素的数组
		var w = 720,  
		    h= 110,  
		    p= 10,//内边距  
		    x= d3.scaleLinear().domain([0, 1]).range([p, w - p]), //(2) 定义x和y比例尺  
		    y= d3.scaleLinear().domain([0, 1]).range([h - p, p]);
		this.wd = w;
		this.ht = h;
		   
		//(3) 绘制SVG  
		var svg = d3.select("#tableGrid").append("svg")  
		   .attr("width", w)  
		   .attr("height", h);

		 //    let scale = d3.scaleLinear()  //x轴尺度
   //           .domain([0, w])
   //           .range([p, w - p]);

			// var xAxis = d3.axisBottom()
			//     .scale(scale);
   //         svg.append("g")            // 移动x轴的位置，保证从原点开始
   //           .attr("class", "x-axis")
   //           .attr("transform","translate(0 0)")
   //           .call(xAxis)
             //.selectAll("line")
             //.attr("transform", "rotate(90)")
             //.selectAll("text")
             //.attr("transform", "rotate(90,20 2)")





		//(4) 给SVG添加分组，并设置样式类，样式见<style>标签中的设置  
		console.log(x(0.51))
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
		   .attr("y2", h - p);  
		   
		//横线  
		grid.data(y.ticks(5))
			.append("line")  
		   .attr("y1", y)  
		   .attr("y2", y)  
		   .attr("x1", p)  
		   .attr("x2", w - p);
		    const line = d3.line() 
           .x(
				(d) => {
					return d.x
				}
			)
			.y(
				(d) => {
					return d.y
				}
			);
        
         this.line = line(this.data);



		  
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