<template>
	<div style="position: relative;margin:2px;">
		<!-- <div style="height: 2px;width: 700px;background-color: red;margin-bottom: 20px;"></div> -->
		<div style="">
			<div v-for="(item,index) in columns" v-if="index%3==0" style="width: 28px;margin-left: -10px;font-size: 12px;display: inline-block;">16:00</div>
			<div v-else style="width: 12px;display: inline-block;"></div>
		</div>
		
		<div id="tableGrid"></div>
		 
	</div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
export default {
	data() {
		return {
			data: [
				{ "x": 10, "y": 25 },
				{ "x": 50, "y": 25 },
				{ "x": 90, "y": 25 },
			],
			line: '',
			rows: 5,
			columns: 50,
			handleItem:{},
			wd:0,
			ht:0,
		}
	},
	methods: {
		 
		init(){
		var w = 720,  
		    h= 120,  
		    p= 20,//内边距  
		    x= d3.scaleLinear().domain([0, 1]).range([0, w - p]), //(2) 定义x和y比例尺  
		    y= d3.scaleLinear().domain([0, 1]).range([0, h-p]);
		this.wd = w;
		this.ht = h;
		   
		//(3) 绘制SVG  
		var svg = d3.select("#tableGrid").append("svg")  
		   .attr("width", w)  
		   .attr("height", h);
		//(4) 给SVG添加分组，并设置样式类，样式见<style>标签中的设置  
		console.log(x(0.51))
		var grid = svg.selectAll(".grid")  
		   .data(x.ticks(this.columns))  
		   .enter()
		   .append("g")  
		   .attr("class", "grid");  
		//(5) 添加线条，设置起始坐标(x1,y1)和结束坐标(x2,y2)的值即可  
		//竖线  
		grid.append("line")  
		   .attr("x1", x)  
		   .attr("x2", x)  
		   .attr("y1", 0)  
		   .attr("y2", h - p);

		//横线  
		grid.data(y.ticks(this.rows))
		   .append("line")  
		   .attr("y1", y)  
		   .attr("y2", y)  
		   .attr("x1", 0)  
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
        
        svg.append("path")
		  .attr('stroke-width', 1)
		  .attr("fill","none")
		  .attr("stroke","red")
		  .attr('d', line(this.data))

		  svg.append("div")
		  	.attr("width",20)
		},
		test(){
			var width = 800,height = 500;
				//简体中文本地化
				var zh = d3.formatLocale({
				    decimal: ".",
				    thousands: ",",
				    grouping: [3],
				    currency: ["¥", ""],
				    dateTime: "%a %b %e %X %Y",
				    date: "%Y/%-m/%-d",
				    time: "%H:%M:%S",
				    periods: ["上午", "下午"],
				    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
				    shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
				    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				    shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
				});

				//时间比例尺
				var timeScale = d3.scaleTime()
				    .domain([new Date(2015, 0, 1), new Date(2016, 1, 1)])
				    .range([0, width-40]); 
			    //时间轴
				var axis = d3.axisTop()
				.scale(timeScale)
				.tickFormat(zh.timeFormat("%Y年%b"))//指定为本地格式化函数
				 

				//添加时间轴    
				var svg = d3.select("#tableGrid").append("svg")
				    .attr("width", width+200)
				    .attr("height", height)
				  	.append("g")
				    .attr("class", "axis")
				    .attr("transform", "translate(" + 20 + "," + height/2 + ")")
				    .call(axis);



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