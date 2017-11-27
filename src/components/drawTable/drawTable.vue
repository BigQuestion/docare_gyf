<template>
	<div ref="area" style="position: relative;margin:10px;">
		<div style="width:500px;">
			<div v-for="item in rows" style="border-bottom: 1px solid #000;width:100%;box-sizing: border-box;height:10px;">
			</div>
		</div>
		<div style="position:absolute;top:0px;left:0px;height:500px;display: flex;">
			<div v-for="item in columns" style="border-right: 1px solid #000;height:100%;box-sizing: border-box;width:10px;">
			</div>
		</div>
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
		<div>
			
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
			rows: 50,
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
			const path = d3.line()
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
			this.line = path(this.data);
		},
	},
	mounted() {
		this.calculatePath();
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
