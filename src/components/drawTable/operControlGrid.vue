<template>
  <div style="position: relative;margin:2px;" @contextmenu="showMenu">
    <div>
      <svg :width="svgWidth" :height="svgHeight" id="opercontrolgridprint" ref="area">
        <g v-for="item in lineArray">
          <line :x1="item.x.x1" :x2="item.x.x1" y1="0" :y2="svgHeight" style="stroke:#8391a2;stroke-width:0.5px;"></line>
        </g>
        <g v-for="(item,index) in lineArray" v-if="index < rows">
          <line x1="0" x2="700" :y1="item.y.y1" :y2="item.y.y1" style="stroke:#8391a2;stroke-width:0.5px;"></line>
        </g>
        <g v-for="(item,index1) in dataPathArray" style="z-index: 22">
          <!-- <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
                                              <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '89'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
                                                <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
                                                <ellipse stroke="#000" ry="3pt" rx="3pt" id="svg_8" cy="0" cx="0" stroke-width="0.8" fill="none" />
                                              </g> -->
          <!-- 中心静脉压 CODE:71 △ -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '71'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="SpringGreen" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '71'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path stroke="SpringGreen" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/>
          </g>
          <!-- 无创收缩压 CODE:89 ∨ -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '89'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '89'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path d="m-3.3,2.532892c0,0 3.2484,-5.53107 3.1606,-5.53107c-0.078586,-0.117878 3.24841,5.53107 3.2484,5.53106" transform="rotate(-180)" fill-opacity="null" stroke-opacity="null" stroke="blue"  stroke-width="1.5" fill="none"/>
          </g>
          <!-- 无创舒张压 CODE:90 ∧ -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '90'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '90'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path d="m-3.3,2.532892c0,0 3.2484,-5.53107 3.1606,-5.53107c-0.078586,-0.117878 3.24841,5.53107 3.2484,5.53106" fill-opacity="null" stroke-opacity="null" stroke="blue"  stroke-width="1.5" fill="none"/>
          </g>
          <!-- 呼吸 CODE:92 ○ -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '92'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="magenta" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '92'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <ellipse stroke="magenta" ry="3pt" rx="3pt" id="svg_8" cy="0" cx="0" stroke-width="0.8" fill="none" />
          </g>
          <!-- 体温 CODE:100 X -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '100'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="red" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '100'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <text stroke="red" transform="matrix(0.44269931316375727,0,0,0.44269931316375727,164.78615606576204,120.13502615876496) " xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_34" y="-260.674143" x="-380.226641" fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="#000000">X</text>
          </g>
          <!-- 肝温 CODE:104 X -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '104'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="rgb(128,128,255)" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '104'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <text stroke="rgb(128,128,255)" transform="matrix(0.44269931316375727,0,0,0.44269931316375727,164.78615606576204,120.13502615876496) " xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_34" y="-260.674143" x="-380.226641" fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="#000000">X</text>
          </g>
          <!-- 鼻咽温 CODE:105 X -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '105'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="rgb(255,128,128)" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '105'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <text stroke="rgb(255,128,128)" transform="matrix(0.44269931316375727,0,0,0.44269931316375727,164.78615606576204,120.13502615876496) " xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_34" y="-260.674143" x="-380.226641" fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="#000000">X</text>
          </g>
          <!-- ETCO2 CODE:112 △ -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '112'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '112'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path stroke="blue" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/>
          </g>
          <!-- Sp02 CODE:188 ● -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '188'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '188'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <circle class="opercontrol" r="3" fill="blue"></circle>
          </g>
          <!-- f CODE:202 △ 暂无此代码颜色-->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '202'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '202'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/>
          </g>
          <!-- Ppeak CODE:208 △ 暂无此代码颜色-->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '208'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '208'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/>
          </g>
          <!-- Pplat CODE:209 △ 暂无此代码颜色-->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '209'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '209'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/>
          </g>
          <!-- Pmean CODE:210 △ 暂无此代码颜色-->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '210'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '210'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/>
          </g>
          <!-- TVE CODE:212 △ 暂无此代码颜色-->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '212'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="blue" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '212'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/>
          </g>
          <!-- 心率 CODE:40 ● -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '40'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="SeaGreen" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '40'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <circle class="opercontrol" r="3" fill="SeaGreen"></circle>
          </g>
          <!-- PILSE CODE:44 ● -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '44'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="DarkGreen" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '44'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <circle class="opercontrol" r="3" fill="DarkGreen"></circle>
          </g>
          <!-- 动脉收缩压 CODE:65 ∨ -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '65'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="red" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '65'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path d="m-3.3,2.532892c0,0 3.2484,-5.53107 3.1606,-5.53107c-0.078586,-0.117878 3.24841,5.53107 3.2484,5.53106" transform="rotate(-180)" fill-opacity="null" stroke-opacity="null" stroke="red"  stroke-width="1.5" fill="none"/>
          </g>
          <!-- 动脉舒张压 CODE:66 ∧ -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '66'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="red" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '66'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path d="m-3.3,2.532892c0,0 3.2484,-5.53107 3.1606,-5.53107c-0.078586,-0.117878 3.24841,5.53107 3.2484,5.53106" fill-opacity="null" stroke-opacity="null" stroke="red"  stroke-width="1.5" fill="none"/>
          </g>
          <!-- 动脉平均压 CODE:67 △ -->
          <line v-for="(cir,index2) in item.circleData" v-if="index2<item.circleData.length-1&&cir.x<700&&item.circleData[index2+1].x<700&&item.circleData[index2+1].x-cir.x<20&&cir.itemData.itemCode == '66'" :x1="cir.x" :x2="item.circleData[index2+1].x" :y1="cir.y" :y2="item.circleData[index2+1].y" stroke="red" stroke-width="1.5"></line>
          <g v-for="(cir,index2) in item.circleData" v-if="cir.itemData.itemCode == '66'" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <ellipse ry="8pt" rx="8pt" id="svg_8" cy="0" cx="0" stroke-width="0.1" fill="rgba(0,0,0,0)" />
            <path stroke="red" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/>
          </g>
          <g v-for="(cir,index2) in item.circleData" v-if="item.flag==1" :transform="'translate('+cir.x+','+cir.y+')'" fill="green" @mousedown.stop="itemMouseDown($event,cir,index1,index2)" @mouseenter="showData(cir,$event)" @mouseleave="showData(cir,$event)">
            <!-- <circle class="opercontrol" r="8pt" fill="rgba(0,0,0,0)"></circle> -->
            <!-- ○ -->
            <!-- <ellipse stroke="#000" ry="3pt" rx="3pt" id="svg_8" cy="0" cx="0" stroke-width="0.8" fill="none" /> -->
            <!-- ● -->
            <!-- <circle class="opercontrol" r="3" fill="green"></circle> -->
            <!-- ∧ -->
            <!-- <path d="m-3.3,2.532892c0,0 3.2484,-5.53107 3.1606,-5.53107c-0.078586,-0.117878 3.24841,5.53107 3.2484,5.53106" fill-opacity="null" stroke-opacity="null" stroke="#000"  stroke-width="1.5" fill="none"/> -->
            <!-- ∨ -->
            <!-- <path d="m-3.3,2.532892c0,0 3.2484,-5.53107 3.1606,-5.53107c-0.078586,-0.117878 3.24841,5.53107 3.2484,5.53106" transform="rotate(-180)" fill-opacity="null" stroke-opacity="null" stroke="#000"  stroke-width="1.5" fill="none"/> -->
            <!-- △ -->
            <!-- <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="none"/> -->
            <!-- ▽ -->
            <!-- <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" transform="rotate(-180)" fill-opacity="null" stroke-opacity="null" fill="none"/> -->
            <!-- ▲ -->
            <!-- <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" fill-opacity="null" stroke-opacity="null" fill="#000"/> -->
            <!-- ▼ -->
            <!-- <path stroke="#000" d="m-3.3,2.49836l3.256205,-5.698359l3.256205,5.698359l-6.512411,0z" transform="rotate(-180)" fill-opacity="null" stroke-opacity="null" fill="#000"/> -->
            <!-- X -->
            <!-- <text stroke="null" transform="matrix(0.44269931316375727,0,0,0.44269931316375727,164.78615606576204,120.13502615876496) " xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_34" y="-260.674143" x="-380.226641" fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="#000000">X</text> -->
          </g>
        </g>
      </svg>
      <div style="position: absolute;top: 10px;">
        100
      </div>
      <div v-if="tipView">
        <div style="position: absolute;width:auto;background-color: white;border: 0.5px solid;padding: 3px;font-size: 12px;z-index: 10;" :style="{ top:tipTop+'px',left:tipLeft+'px'}">
          <div>
            {{mouseItem.itemData.itemName}}
          </div>
          <div>
            ================
          </div>
          <div>
            时间：{{mouseItem.time}}
          </div>
          <div>
            值：{{mouseItem.value}}
          </div>
        </div>
      </div>
      <div style="position: absolute;bottom: 0px;left: -25px;text-align: right;font-size: 12px;">
        <div v-for="item in yValueArray" style="height: 22px;">
          {{item}}
        </div>
      </div>
    </div>
    <div v-if="showStyleView" style="background-color: #e6e6e6;position: absolute;top: 30%;" :style="{ top:rightViewY+'px',left:rightViewX+'px'}">
      <div style="padding: 10px;" @click="tipShowPersonStyle">
        个性化体征显示
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import * as d3 from 'd3';
import Bus from '@/bus.js';
export default {
  name: 'opercontrolgridprint',
  data() {
    return {
      showStyleView: false,
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
      clickItem: '',
      clickIndex: '',
      pathIndex: '',
      pathData: '',
      pathArray: [],
      dataPathArray: [],
      signdataList: [],
      tipTop: 0,
      tipLeft: 0,
      tipView: false,
      mouseItem: '',
      updateDataArray: [],
      yValueArray: [],
      rightViewX: '',
      rightViewY: '',
      signNameLisg: [],
      setTimeId: '', //定时器执行
    }

  },
  methods: {
    showMenu: function(parameter) {
      // parameter.preventDefault()
      // this.rightViewX = parameter.offsetX;
      // this.rightViewY = parameter.offsetY;
      // this.showStyleView = true;

    },
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

    },
    calculatePath() {
      this.dataPathArray = [];
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
      for (var i = 0; i < this.pathArray.length; i++) {
        this.dataPathArray.push({
          path: dataone(this.pathArray[i]),
          circleData: this.pathArray[i]
        })
      }
    },
    itemMouseDown(e, currentItem, index1, index2) {
      this.area.addEventListener('mousemove', this.areaMouseMove);
      this.area.addEventListener('mouseup', this.areaMouseUp);
      this.clickItem = currentItem;
      this.clickIndex = index2;
      this.pathIndex = index1;

    },
    areaMouseMove(e) {
      this.clickItem.y = e.offsetY;
      var arr1 = this.pathArray[this.pathIndex];
      var arr2 = arr1[this.clickIndex];
      arr1[this.clickIndex] = this.clickItem;
      if (this.svgHeight - 0.5 <= this.clickItem.y) {
        this.clickItem.value = 0
      } else {
        this.clickItem.value = Math.round((this.svgHeight - e.offsetY) / (this.svgHeight / this.rows) * 10)
      }
      this.calculatePath();
    },
    areaMouseUp(e) {
      this.area.removeEventListener('mousemove', this.areaMouseMove);
      this.area.removeEventListener('mouseup', this.areaMouseUp);
      let moveValue
      if (this.svgHeight - 0.5 <= this.clickItem.y) {
        moveValue = 0;
      } else {
        moveValue = Math.round((this.svgHeight - this.clickItem.y) / (this.svgHeight / this.rows) * 10);
      }

      this.updateDataArray.push({
        itemName: this.clickItem.itemData.itemCode,
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0,
        timePoint: new Date(this.clickItem.time),
        itemValue: moveValue,
        operator: "mdsd"
      })
      let params = this.updateDataArray;
      this.api.updateMedPatientMonitorDatas(params)
        .then(res => {
          this.updateDataArray = [];
        })

    },
    //获取病人生命体征项目
    getSignName() {
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0,
      }

      this.api.getSignName(params)
        .then(
        res => {
          for (var i = 0; i < res.length; i++) {
            res[i].itemValue = "";
          }
          //定义一个排序方法
          let compare = function(prop) {
            return function(obj1, obj2) {
              let val1 = obj1[prop]
              let val2 = obj2[prop]
              if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
              }
              if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }
            }
          }
          //根据itemcode排序
          // this.signNameLisg = res.sort(compare("itemCode"));
          this.signNameLisg = res;
          this.getSignTimeData(res.length, res);
          this.setTimeId = setTimeout(_ => this.getSignName(), this.config.timeSet)
        })
    },
    getSignNameNoTime() {
      if (this.setTimeId) {
        clearTimeout(this.setTimeId)
      }
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0,
      }

      this.api.getSignName(params)
        .then(
        res => {
          for (var i = 0; i < res.length; i++) {
            res[i].itemValue = "";
          }
          //定义一个排序方法
          let compare = function(prop) {
            return function(obj1, obj2) {
              let val1 = obj1[prop]
              let val2 = obj2[prop]
              if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
              }
              if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }
            }
          }
          //根据itemcode排序
          // this.signNameLisg = res.sort(compare("itemCode"));
          this.signNameLisg = res;
          this.getSignTimeData(res.length, res);
        })
    },
    getSignTimeData(len, list) {
      debugger
      let params = {
        patientId: this.config.userInfo.patientId,
        operId: this.config.userInfo.operId,
        visitId: this.config.userInfo.visitId,
        eventNo: 0
      }
      this.api.getSignTimeData(params)
        .then(
        res => {
          if (res.length < 1) {
            return false
          }
          var sortArray = [];
          for (var i = 0; i < res.length; i++) {
            var item = res[i].dataValue;
            item = eval('(' + item + ')');
            let xL = len - item.length

            if (xL > 0) {
              for (var j = 0; j < xL; j++) {
                item.push('');
              }
            }
            res[i].dataValue = item;
          }
          res.sort(function(a, b) {
            return Date.parse(a.time) - Date.parse(b.time); //时间正序
          });
          for (var i = 0, l = res.length; i < l; i++) {
            sortArray.push(res[i]);
          }
          this.signdataList = sortArray;
          var newArray = [];
          for (var i = 0; i < len; i++) {
            var arr1 = [];
            for (var j = 0; j < sortArray.length; j++) {
              if (sortArray[j].dataValue[i]) {
                arr1.push({
                  value: sortArray[j].dataValue[i],
                  time: sortArray[j].time,
                  itemData: list[i]

                })
              } else {
                arr1.push({
                  value: "",
                  time: sortArray[j].time,
                  itemData: list[i]

                })
              }

            }
            newArray.push(arr1)
          }
          for (var i = 0; i < newArray.length; i++) {
            for (var j = 0; j < newArray[i].length; j++) {
              let min = '';
              if (new Date(newArray[i][j].time) > this.config.maxTime) {
                min = this.getMinuteDif(this.config.initTime, this.config.maxTime) + 1;
              } else {
                min = this.getMinuteDif(this.config.initTime, newArray[i][j].time);
              }
              let x = Math.round(min / this.tbMin * (this.svgWidth / this.columns))
              let y = this.svgHeight - Math.round(newArray[i][j].value / 10 * (this.svgHeight / this.rows))
              newArray[i][j].x = x;
              newArray[i][j].y = y;
            }
          }
          this.pathArray = newArray;
          this.calculatePath();
        })
    },

    //计算时间差分钟
    getMinuteDif(startTime, endTime) {
      let sTime = new Date(startTime).getTime()
      let enTime = new Date(endTime).getTime()
      var min = '';
      min = (enTime - sTime) / 1000 / 60;
      return Math.round(min)
    },

    showData(item, ev) {
      this.mouseItem = item;
      this.tipLeft = ev.offsetX;
      this.tipTop = item.y + 20;
      this.tipView = !this.tipView;
    },

    getYDataArray() {
      var arry = [0];
      for (var i = 0; i < 11; i++) {
        arry.push(i * 20 + 20)
      }
      this.yValueArray = arry.reverse();
    },
    pageTurnFun() {
      if (this.config.pageOper == 0) {
        this.config.pageNum = 1;
      }
      var list = this.signNameLisg;
      let arryList = this.signdataList;
      let sortArray = [];
      for (var i = 0; i < arryList.length; i++) {
        if (new Date(arryList[i].time) > this.config.initTime) {
          sortArray.push(arryList[i])
        }
      }
      if (sortArray.length < 1) {
        this.pathArray = [];
        this.calculatePath();
        return
      }

      this.dataOperFun(sortArray);


    },

    //数据处理
    dataOperFun(sortArray) {
      var list = this.signNameLisg;
      var newArray = [];
      for (var i = 0; i < 8; i++) {
        var arr1 = [];
        for (var j = 0; j < sortArray.length; j++) {
          if (sortArray[j].dataValue[i]) {
            arr1.push({
              value: sortArray[j].dataValue[i],
              time: sortArray[j].time,
              itemData: list[i]

            })
          } else {
            arr1.push({
              value: "",
              time: sortArray[j].time,
              itemData: list[i]

            })
          }

        }
        newArray.push(arr1)
      }
      for (var i = 0; i < newArray.length; i++) {
        for (var j = 0; j < newArray[i].length; j++) {
          let min = '';
          if (new Date(newArray[i][j].time) > this.config.maxTime) {
            min = this.getMinuteDif(this.config.initTime, this.config.maxTime) + 1;
          } else {
            min = this.getMinuteDif(this.config.initTime, newArray[i][j].time);
          }
          let x = Math.round(min / this.tbMin * (this.svgWidth / this.columns))
          let y = this.svgHeight - Math.round(newArray[i][j].value / 10 * (this.svgHeight / this.rows))
          newArray[i][j].x = x;
          newArray[i][j].y = y;
        }
      }
      this.pathArray = newArray;
      this.calculatePath();
    },
    //显示个性化体征
    tipShowPersonStyle() {
      this.showStyleView = false;
      Bus.$emit('showPersonStyle', 1);
    },
    //初始化执行函数
    initFun() {
      this.getLineXy();
      if (this.page == false) {
        this.getSignName();
      }

      this.getYDataArray();
    },
    initFunNoTime() {
      this.getLineXy();
      if (this.page == false) {
        this.getSignNameNoTime();
      }

      this.getYDataArray();
    },
    runTimeFun() {
      this.initFun()

    }
  },
  mounted() {
    if (this.setTimeId) {
      clearTimeout(this.setTimeId);
    }
    this.initFun();
    this.area = this.$refs.area;
  },
  created() {
    Bus.$on('test', this.pageTurnFun)
    Bus.$on('timeSetChange', this.initFunNoTime)
  },
  beforeDestroy() {
    Bus.$off('test', this.pageTurnFun);
    Bus.$off('timeSetChange', this.initFunNoTime)
    clearTimeout(this.setTimeId);
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
