<template>
	<div style="position: relative;margin:2px;"> 
		<svg width="700" height="160">
			<g v-for="item in lineArray">
				<line :x1="item.x.x1" :x2="item.x.x1" y1="0" y2="160" style="stroke:blue;stroke-width:0.5px;"></line>
			</g>
			<g v-for="item in lineArray">
				<line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:blue;stroke-width:0.5px;"></line>
			</g>
		</svg>
	</div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
export default {
	data() {
		return { 
			lineArray:[],
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
			 console.log(array)
			 this.lineArray = array;
		}
	},
	mounted() {  
		this.getLineXy()
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