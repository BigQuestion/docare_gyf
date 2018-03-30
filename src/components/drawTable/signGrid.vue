<template>
  <div :style="{width:width+'px',height:height+'px'}" style="position: relative;margin:2px;">
    <div v-if="page==false" @mousemove="moveEvent($event)" @mouseout="outEvent()" :style="{width:width+'px',height:height+'px'}" style="position:relative;">
      <div v-for="item in dataBody" @mousemove.stop="moveEventInItem(item)" :style="{left:item.left+'px',bottom:item.bottom+'px'}" style="position:absolute;cursor:default;">{{item.leng}}</div>
    </div>
    <div v-else>
      <!-- 表单设计器显示元素 -->
    </div>
    <div v-if="tipView">
      <div style="position: absolute;background-color: #e0e052;font-size: 12px;z-index: 10;padding: 0 2px;" :style="{ top:tipTop+'px',left:tipLeft+'px'}">
        <div>
          {{nowTime}}
        </div>
        <div v-if="showDataMore">
          ================
        </div>
        <div v-if="showDataMore">
          名称：{{nameInItem}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lineArray: [],
      dataBody: [],
      dataOfBottom: [],
      tipTop: '',
      tipLeft: '',
      tipView: false,
      nowTime: '',
      nameInItem: '',
      showDataMore: false,
      dataOfXlength: '',
      anesStartTime: '',
      thedoubelData: '',
      // dataOfTop: 0,
      pageOn: '',
      maxTimeInPage: '',
      startTimeInPage: '',
    }
  },
  methods: {
    selectMedAnesthesiaEventList() {
      this.pageOn = this.config.pageOper;
      this.maxTimeInPage = this.config.maxTime.getTime()
      this.startTimeInPage = this.config.initTime.getTime()
      var bothTimeLeft = this.maxTimeInPage - this.startTimeInPage

      this.thedoubelData = '';
      let params = {
        patientId: this.dataOfPeo.patientId,
        operId: this.dataOfPeo.operId,
        visitId: this.dataOfPeo.visitId
      }
      this.api.selectMedAnesthesiaEventList(params)
        .then(
        res => {
          this.dataOfBottom = [];
          this.dataBody = [];
          this.config.OperatingData = res.list;

          for (var i = 0; i < res.list.length; i++) {
            var time = new Date(res.list[i].START_TIME).getTime();
            if (this.startTimeInPage <= time && time <= this.maxTimeInPage) {
              var time1 = time - this.startTimeInPage
              var leftPlace = ((time1 * 3) / 60 / 1000);
              this.dataOfBottom.push({
                leftData: leftPlace
              })

              this.dataBody.push({
                leng: i + 1,
                left: leftPlace,
                bottom: 0,
                name: res.list[i].ITEM_NAME,
                time: res.list[i].START_TIME,
              })
            }

          }
          var data = [];
          for (var a = 0; a < this.dataOfBottom.length; a++) {
            data.push(this.dataOfBottom[a].leftData);
          }
          var tmp = data.sort();
          var pei = 0;
          for (var k = 0; k < data.length; k++) {
            if (tmp[k] == tmp[k + 1]) {
              // console.log(tmp[k])
              for (var g = 0; g < this.dataBody.length; g++) {
                // console.log(this.dataBody)
                if (tmp[k] == this.dataBody[g].left) {
                  pei = pei + 1;
                  // console.log(this.dataBody[g])
                  this.dataBody[g].bottom = -15 + pei * 15;
                  // console.log(this.dataOfBottom[g].bottom)
                } else {
                  pei = 0;
                  // this.dataBody[g].bottom = 0;
                }
              }
            } else {
              pei = 0;
            }
          }

          this.lineArray = res.list;
        });
    },
    noFunction() {

    },
    moveEventInItem(item) {
      this.tipView = true;
      this.showDataMore = true;
      this.nameInItem = item.name;
      this.nowTime = item.time;
    },
    moveEvent(event) {
      // console.log(event.offsetX)
      this.tipTop = event.offsetY + 20;
      this.tipLeft = event.offsetX;
      this.tipView = true;
      this.showDataMore = false;
      var offX = event.offsetX / 3; //横坐标值
      var m = Math.round(offX);
      this.dataOfXlength = m;
      var time = new Date(this.config.userInfo.inDateTime);
      var time1 = time.getTime() + m * 60 * 1000;
      var time2 = new Date(time1).Format("yyyy-MM-dd hh:mm");
      this.nowTime = time2;
    },
    outEvent() {
      this.tipView = false;
    },

  },
  mounted() {
    if (this.page == false) {
      this.selectMedAnesthesiaEventList();
      window.eventHub.$on("test", this.selectMedAnesthesiaEventList);

    }

  },
  props: ['page', 'width', 'height', 'dataOfPeo'],
}

</script>
<style scoped>
.rightBox {
  position: absolute;
  width: 185px;
  height: 140px;
  overflow-y: auto;
  border: 1px solid #8EAACD;
  box-sizing: border-box;
  font-size: 14px;
  background-color: #fff;
}

.rightBox div {
  border-bottom: 1px solid #8EAACD;
  color: #222;
  cursor: pointer;
}

.rightBox div:hover {
  color: #fff;
  background-color: #8EAACD;
}

.rightBox div:last-child {
  border-bottom: 0;
}

.chooseTime {
  position: absolute;
  width: 400px;
  height: 220px;
  top: calc(50% - 110px);
  left: calc(50% - 200px);
  background: rgb(227, 239, 255);
  border: 2px solid rgb(22, 124, 172);
  cursor: auto;
}

.chooseBackWhite {
  background-color: #fff;
  border: 1px solid #A9A9A9;
}

.chooseClass {
  color: #B3C1D7;
  background-color: rgb(227, 239, 255);
  border: 1px solid #A9A9A9;
}
</style>
