<template>
	<div style="position: relative;margin:2px;">
		<!-- <div style="height: 2px;width: 700px;background-color: red;margin-bottom: 20px;"></div> -->
		<div>
			<div style="">
				<div v-for="(item,index) in xTimeArray" v-if="index%3==0" style="width: 28px;margin-left: -10px;font-size: 12px;display: inline-block;">{{item}}</div>
				<div v-else style="width: 12px;display: inline-block;"></div>
			</div>
			
			<div id="tableGrid"></div>
		</div>
		<!-- <div>
			<div v-for="(intem,index) in rows" :style="{top:20*index+'px'}" style="height: 2px;width: 80px;background-color: red;position: absolute;top:40px;left: -80px;"></div>
		</div> -->
	</div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
export default {
	data() {
		return {
			data: [
				// { "x": 10, "y": 25 },
				// { "x": 50, "y": 25 },
				// { "x": 90, "y": 25 },
			],
			line: '',
			rows: 5,
			columns: 50,
			handleItem:{},
			wd:0,
			ht:0,
			xTimeArray:[],
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
			//对时间进行计算操作
		timeControl(startTime){
				var m = 5;//加几分钟
				var timeDate = new Date(startTime);
				var toMin = timeDate.getTime()+1000 * 60 * m;
				var timeArray = [];
				for (var i = 0; i < this.columns; i++) {
					timeArray.push(new Date(timeDate.getTime()+1000 * 60 *  m * i).Format("hh:mm"))
				}
				this.xTimeArray = timeArray;
			},
			//时间初始化显示
		xTimeInit(){
				if(this.config.userInfo.inDateTime&&this.config.userInfo.inDateTime!=""&&this.config.userInfo.inDateTime!=null){
					this.timeControl(this.config.userInfo.inDateTime);
				}
				else
				{
					this.timeControl(new Date().Format("yyyy-MM-dd")+" 08:00");
				}
				this.init();
				this.selectMedAnesthesiaEventList();
				
			},
		selectMedAnesthesiaEventList() {
            let params = {
                patientId: this.config.userInfo.patientId,
                operId: this.config.userInfo.operId,
                visitId: this.config.userInfo.visitId,
                itemClass:2
            }
            
            this.api.selectMedAnesthesiaEventList(params)
                .then(
                res => {
                     var list = res.list;
                     for (var i = 0; i < list.length; i++) {
                     	if(list[i].START_TIME){
                     		if(i==5)
                     			break;
                     		console.log(this.getMinuteDif(this.config.userInfo.inDateTime,list[i].START_TIME))
                     		//开始时间间隔
                     		var s = this.getMinuteDif(this.config.userInfo.inDateTime,list[i].START_TIME)
                     		 	this.createPath(Math.round(s/5*10),100,10+i*20,10+i*20);
                     		}
                     		}
					
                     }); 
        },
        //计算时间差分钟
        getMinuteDif(startTime,endTime){
        	console.log(startTime,endTime)
        	let sTime = new Date(startTime).getTime()
        	let enTime = new Date(endTime).getTime()

        	var min = '';
        	min = (enTime - sTime)/1000/60;
        	return Math.round(min) 

        },
         createPath(x1,x2,y1,y2){ 
           		var svg = d3.select("svg");
           		svg.append("line")
           			.attr("stroke","blue")
           			.attr("stroke-width",1)
           			.attr("y1",y1)  
				   .attr("y2", y2)  
				   .attr("x1", x1)  
				   .attr("x2", x2);
           	}
	},
	mounted() { 
		this.area = this.$refs.area;

		this.xTimeInit();

	},
	components: {

	},
	props:[''],
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