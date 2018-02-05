<template>
	<div style="position: relative;margin:2px;">
		<svg :width="svgWidth" :height="svgHeight" id="operGrid">
			<g v-for="item in lineArray">
				<line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
			</g>
			<g v-for="item in lineArray">
				<line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:0.5px;"></line>
			</g>
		</svg>

	</div>
</template>
<script type="text/javascript">
	import * as d3 from 'd3';
	export default {
		name: 'dosage',
		data() {

			return {
				lineArray: [],
				svgWidth: 700,
				svgHeight: 420,
				columns: 50,
				rows: 30,
				dataArray: [],
				forRows: 6,
				tbMin: 5,
				outRows: 3,
				tipTop: 0,
				tipLeft: 0,
				tipView: false,
				dataObj: {},
				data: [
				{ "x": 14, "y": 400 },
				{ "x": 28, "y": 410 },
				{ "x": 42, "y": 40 },
				{ "x": 56, "y": 5 },
				{ "x": 70, "y": 50 },
				{ "x": 84, "y": 35 },
				{ "x": 98, "y": 10 }
				],
			}
		},
		methods: {
			getLineXy() {
				var array = [];
				for (var i = 0; i < 50; i++) {
					array.push({
						x: {
							x1: i * (this.svgWidth / this.columns),
							x2: i * (this.svgWidth / this.columns),
						},
						y: {
							y1: i * (this.svgHeight / this.rows),
							y2: i * (this.svgHeight / this.rows)
						}
					})
				}
				this.lineArray = array;
				this.calculatePath();
			},
			calculatePath() {
				var _this = this;
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
				//this.line = dataone(this.data);
				var isdown = false;
				var svg = d3.select("#operGrid")
				svg.append("path")
				.attr("d",dataone(this.data))
				.attr('stroke-width', 1)
				.attr("fill", "none")
				.attr("stroke", "blue")

				var g = svg.selectAll('circle')
				.data(this.data)
				.enter()
				.append('g')
				.append('circle')
				//.attr('class', 'linecircle')
				.attr('cx', dataone.x())
				.attr('cy', dataone.y())
				.attr('r', 3)
				.attr('fill','green')
				// .on('mouseover', function() {
				// 	d3.select(this).transition().duration(500).attr('r', 5);
				// })
				// .on('mouseout', function() {
				// 	d3.select(this).transition().duration(500).attr('r', 3);
				// }) 
				.on('mousedown',function(data,ev){
					var ev = ev || event;
					isdown = true;
					console.log(data)
					console.log(ev)
				})
				.on('mousemove',function(data){

					if(isdown){
						// svg.selectAll("circle").remove()
						// var p = d3.select("#operGrid")
						// .select("path").remove()
						 
						//  _this.data = [{ "x": 14, "y": 400 },
						// { "x": 28, "y": 410 },
						// { "x": 42, "y": 40 },
						// { "x": 56, "y": 5 },
						// ]
						// _this.calculatePath(); 
					}

					
				})
				.on('mouseup',function(ev){
					isdown = false;
					var ev = ev || event;
					console.log(ev)
				})
			},
		},
		mounted() {
			this.getLineXy(); 
		},
		components: {

		},
		props: ['page'],
		computed: {

		}
	}

</script>
<style scoped>


</style>
