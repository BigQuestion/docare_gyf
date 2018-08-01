<template>
  <div class="dictionaries">
    <div class="window_load">
      <div class="load_top">
        <div>监护仪</div>
        <div @click="aboutNone" class="top_active">X</div>
      </div>
      <div style="display:flex;position:absolute;top:34px;left:4px;">
        <div class="titleBox" v-for="item in machineList" :style="{width:item.width+'px',textAlign:item.textalign}">{{item.text}}</div>
      </div>
      <div class="monitorBox">
        <div v-for="(list,index) in commonTypeList" class="HoverClass" style="display: flex;">
          <div v-for="cl in machineList" :style="{width:cl.width+'px',textAlign:cl.textalign}" :class="{greenClass:list.isBeChoosed}" style="font-size:12px;border:1px solid rgb(177,207,243);box-sizing:border-box;">
            <div v-if="cl.type=='raido'">
              <input type="checkbox" :checked="list.checkedData" @change="getSingleSelect(list,index)">
            </div>
            <div v-if="cl.type!=='raido'">{{list[cl.value]}}</div>
          </div>
        </div>
      </div>
      <div style="display:flex;position:absolute;top:364px;left:4px;">
        <div class="titleBox" v-for="item in anesthesiaList" :style="{width:item.width+'px',textAlign:item.textalign}">{{item.text}}</div>
      </div>
      <div class="anesthesia">
        <div v-for="(list,index) in commonTypeListTwo" class="HoverClass" style="display: flex;">
          <div v-for="cl in anesthesiaList" :class="{greenClass:list.isBeChoosed}" :style="{width:cl.width+'px',textAlign:cl.textalign}" style="font-size:12px;border:1px solid rgb(177,207,243);box-sizing:border-box;">
            <div v-if="cl.type=='raido'">
              <input type="checkbox" :checked="list.checkedData" @change="getSingleSelectTwo(list,index)">
            </div>
            <div v-if="cl.type!=='raido'">{{list[cl.value]}}</div>
          </div>
        </div>
      </div>
      <div class="bottomBox">
        <div class="inputBox">
          <span>开始时间</span>
          <input style="width:190px;" @blur="dataOfChange('1',$event)" :value="dataOfStart" type="datetime-local">
          <span>默认记录间隔</span>
          <input style="width:45px;" @blur="dataOfChange('2',$event)" :value="defaultRecvFrequency" type="text">
          <span>实际记录间隔</span>
          <input style="width:45px;" @blur="dataOfChange('3',$event)" :value="currentRecvFrequency" type="text">
          <span>采集次数/秒</span>
          <input style="width:45px;" @blur="dataOfChange('4',$event)" :value="currentRecvtimesUplimit" type="text">
        </div>
        <div class="sureBox">
          <button v-if="data" @click="aboutNone">关闭</button>
          <button @click="bindingFunction()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfoDataBody: this.config,
      data: this.dataOfNoneClick.noneData,
      machineList: [{
          text: "监护仪",
          value: "monitorLabel",
          width: 171,
          textalign: 'left',
        },
        {
          text: "开始时间",
          value: "datalogStartTime",
          width: 170,
          textalign: 'left',
        },
        {
          text: "默认记录",
          value: "defaultRecvFrequency",
          width: 100,
          textalign: 'left',
        },
        {
          text: "实际记录",
          value: "currentRecvFrequency",
          width: 100,
          textalign: 'left',
        },
        {
          text: "采集次数/秒",
          value: "currentRecvtimesUplimit",
          width: 100,
          textalign: 'left',
        },
        {
          text: "手术",
          value: "six",
          width: 80,
          textalign: 'left',
        },
        {
          text: "选择",
          value: "seven",
          type: "raido",
          width: 50,
          textalign: 'center',
        },

      ],
      commonTypeList: [],
      anesthesiaList: [{
          text: "麻醉机",
          value: "monitorLabel",
          width: 171,
          textalign: 'left',
        },
        {
          text: "开始时间",
          value: "datalogStartTime",
          width: 170,
          textalign: 'left',
        },
        {
          text: "默认记录",
          value: "defaultRecvFrequency",
          width: 100,
          textalign: 'left',
        },
        {
          text: "实际记录",
          value: "currentRecvFrequency",
          width: 100,
          textalign: 'left',
        },
        {
          text: "采集次数/秒",
          value: "currentRecvtimesUplimit",
          width: 100,
          textalign: 'left',
        },
        {
          text: "手术",
          value: "six",
          width: 80,
          textalign: 'left',
        },
        {
          text: "选择",
          value: "seven",
          type: "raido",
          width: 50,
          textalign: 'center',
        },
      ],
      commonTypeListTwo: [],
      binding: '',
      bindingTwo: '',
      dataOfStart: '',
      dataOfStartSql: '',
      defaultRecvFrequency: '300',
      currentRecvFrequency: '300',
      currentRecvtimesUplimit: '0',
      clickMonitor: '',
      thisAdata: '',
      thisBdata: '',
      hasDataFirst: false,
      hasDataSecend: '',
      thisNowId: '',
      thisNowIdTwo: '',
      thisOnchange: '',
      cancelData: '',
      cancelDataTwo: '',
      bothClick1: '',
      bothClick2: '',
      changeFirstData: '',
      changeSecendData: '',
      firstTimeChangeData: '',
      secendTimeChangeData: '',
    }
  },
  props: [
    'parentToChild',
    'dataOfNoneClick'
  ],
  methods: {
    aboutNone() {
      this.parentToChild.noneData = !this.parentToChild.noneData;
    },
    // 监护仪数据
    firstmonitor() {
      let params = ''
      if (this.dataOfNoneClick.noneData == false) {
        params = {
          itemType: 0,
          wardCode: this.config.wardCode,
          wardType: 0
        }
      } else {
        params = {
          itemType: 0,
          wardCode: this.config.wardCode,
          wardType: 0
        }
      }
      this.api.selectMonitorList(params)
        .then(
          res => {
            // console.log(res.list)
            this.commonTypeList = res.list
            if (res.list.length <= 16) {
              this.machineList[0].width = 191;
            } else {
              this.machineList[0].width = 175;
            }
            for (var a = 0; a < res.list.length; a++) {
              if (this.commonTypeList[a].operId == this.userInfoDataBody.userInfo.operId && this.commonTypeList[a].visitId == this.userInfoDataBody.userInfo.visitId && this.commonTypeList[a].patientId == this.userInfoDataBody.userInfo.patientId) {
                this.$set(this.commonTypeList[a], 'isBeChoosed', true)
                this.$set(this.commonTypeList[a], 'checkedData', true)
              } else {
                this.$set(this.commonTypeList[a], 'isBeChoosed', false)
                this.$set(this.commonTypeList[a], 'checkedData', false)
              }
            }
            this.firstFun();
          }
        )
    },

    // 麻醉机数据
    dataInAnesthesia() {
      let params = ''
      if (this.dataOfNoneClick.noneData == false) {
        params = {
          itemType: 1,
          wardCode: this.config.wardCode,
          wardType: 0
        }
      } else {
        params = {
          itemType: 1,
          wardCode: this.config.wardCode,
          wardType: 0
        }
      }

      this.api.selectMonitorList(params)
        .then(
          res => {
            // console.log(res.list)
            this.commonTypeListTwo = res.list
            if (res.list.length <= 8) {
              this.anesthesiaList[0].width = 191;
            } else {
              this.anesthesiaList[0].width = 175;
            }
            for (var a = 0; a < res.list.length; a++) {
              if (this.commonTypeListTwo[a].operId == this.userInfoDataBody.userInfo.operId && this.commonTypeListTwo[a].visitId == this.userInfoDataBody.userInfo.visitId && this.commonTypeListTwo[a].patientId == this.userInfoDataBody.userInfo.patientId) {
                this.$set(this.commonTypeListTwo[a], 'isBeChoosed', true)
                this.$set(this.commonTypeListTwo[a], 'checkedData', true)
              } else {
                this.$set(this.commonTypeListTwo[a], 'isBeChoosed', false)
                this.$set(this.commonTypeListTwo[a], 'checkedData', false)
              }
            }
            this.secendFun();
          }
        )

    },
    dataOfChange(index, event) {
      // alert(this.thisAdata)
      // alert(this.bothClick2)
      this.changeFirstData = false;
      this.changeSecendData = false;
      this.thisOnchange = true;
      if ((this.thisAdata == true && this.thisBdata == false) || (this.firstTimeChangeData == true && this.secendTimeChangeData == false)) {
        this.changeFirstData = true;
        // alert('11')
        if (index == '1') {
          // console.log(event.srcElement.value)
          this.binding.datalogStartTime = event.srcElement.value.replace('T', ' ');
        } else if (index == '2') {
          // console.log(event.srcElement.value)
          this.binding.defaultRecvFrequency = event.srcElement.value;
          // console.log(this.binding)
        } else if (index == '3') {
          // console.log(event.srcElement.value)
          this.binding.currentRecvFrequency = event.srcElement.value;
        } else if (index == '4') {
          // console.log(event.srcElement.value)
          this.binding.currentRecvtimesUplimit = event.srcElement.value;
        }
      } else if ((this.thisBdata == true && this.thisAdata == false) || (this.secendTimeChangeData == true && this.firstTimeChangeData == false)) {
        this.changeSecendData = true;
        // alert('12')
        // console.log(this.bindingTwo)
        if (index == '1') {
          // console.log(event.srcElement.value)
          this.bindingTwo.datalogStartTime = event.srcElement.value.replace('T', ' ');
        } else if (index == '2') {
          // console.log(event.srcElement.value)
          this.bindingTwo.defaultRecvFrequency = event.srcElement.value;
          // alert('22')
          // console.log(this.bindingTwo)
        } else if (index == '3') {
          // console.log(event.srcElement.value)
          this.bindingTwo.currentRecvFrequency = event.srcElement.value;
        } else if (index == '4') {
          // console.log(event.srcElement.value)
          this.bindingTwo.currentRecvtimesUplimit = event.srcElement.value;
        }
      } else if (this.thisAdata == true && this.thisBdata == true) {
        this.changeFirstData = true;
        this.changeSecendData = true;
        alert('13')
        if (index == '1') {
          // console.log(event.srcElement.value)
          this.binding.datalogStartTime = event.srcElement.value.replace('T', ' ');
          this.bindingTwo.datalogStartTime = event.srcElement.value.replace('T', ' ');
        } else if (index == '2') {
          // console.log(event.srcElement.value)
          this.binding.defaultRecvFrequency = event.srcElement.value;
          this.bindingTwo.defaultRecvFrequency = event.srcElement.value;
        } else if (index == '3') {
          // console.log(event.srcElement.value)
          this.bindin.currentRecvFrequency = event.srcElement.value;
          this.bindingTwo.currentRecvFrequency = event.srcElement.value;
        } else if (index == '4') {
          // console.log(event.srcElement.value)
          this.binding.currentRecvtimesUplimit = event.srcElement.value;
          this.bindingTwo.currentRecvtimesUplimit = event.srcElement.value;
        }
      }

    },
    getSingleSelect(item, index) {
      this.hasDataFirst = false;
      this.clickMonitor = true;
      this.firstTimeChangeData = false;
      let inputData;
      // console.log(item)
      // console.log(index)
      this.chooseIndex = index;
      // console.log(this.config.userInfo)
      var timeStart = new Date().Format('yyyy-MM-dd hh:mm');
      this.dataOfStartSql = timeStart;

      this.defaultRecvFrequency = item.defaultRecvFrequency;
      this.currentRecvFrequency = item.currentRecvFrequency;
      this.currentRecvtimesUplimit = item.currentRecvtimesUplimit;
      this.binding = {
        bedNo: this.config.userInfo.operatingRoomNo,
        itemType: 0,
        wardCode: this.config.wardCode,
        wardType: 0,
        operId: this.config.userInfo.operId,
        patientId: this.config.userInfo.patientId,
        visitId: this.config.userInfo.visitId,
        currentRecvFrequency: item.currentRecvFrequency,
        currentRecvtimesUplimit: item.currentRecvtimesUplimit,
        datalogStartTime: this.dataOfStartSql,
        defaultRecvFrequency: item.defaultRecvFrequency,
        monitorLabel: item.monitorLabel,
      }
      // console.log(this.thisAdata)
      if (this.thisAdata == true) {
        for (var i = 0; i <= this.commonTypeList.length - 1; i++) {
          if (index == i && this.commonTypeList[index].checkedData == true) {
            this.$set(this.commonTypeList[index], 'checkedData', false)
            this.cancelData = true;
          } else if (index == i && this.commonTypeList[index].checkedData == false) {
            if (this.commonTypeList[index].checkedData == false) {
              this.$set(this.commonTypeList[index], 'checkedData', true)
              this.cancelData = false;
            } else {

            }
          } else {
            this.$set(this.commonTypeList[i], 'checkedData', false)
          }

        }

      } else {
        this.firstTimeChangeData = true;
        for (var i = 0; i < this.commonTypeList.length; i++) {
          if (index == i && this.commonTypeList[i].operId !== null && this.commonTypeList[i].visitId !== null && this.commonTypeList[i].patientId !== null) {
            this.hasDataFirst = true;
            this.thisNowId = this.commonTypeList[i].patientId;
          }
          if (index == i && this.commonTypeList[index].checkedData == false) {
            this.$set(this.commonTypeList[index], 'checkedData', true)
          } else if (index == i && this.commonTypeList[index].checkedData == true) {
            this.$set(this.commonTypeList[i], 'checkedData', false)
          } else {
            this.$set(this.commonTypeList[i], 'checkedData', false)
          }
        }
        this.cancelData = false;

      }
      this.forFunction('1', index);
    },
    getSingleSelectTwo(item, index) {
      this.clickMonitor = false;
      this.hasDataSecend = false;
      this.secendTimeChangeData = false;
      // console.log(item)
      // console.log(index)
      // console.log(this.commonTypeListTwo)
      var timeStart = new Date().Format('yyyy-MM-dd hh:mm');
      this.dataOfStartSql = timeStart;
      this.bindingTwo = {
        bedNo: this.config.userInfo.operatingRoomNo,
        itemType: 1,
        wardCode: this.config.wardCode,
        wardType: 0,
        operId: this.config.userInfo.operId,
        patientId: this.config.userInfo.patientId,
        visitId: this.config.userInfo.visitId,
        currentRecvFrequency: item.currentRecvFrequency,
        currentRecvtimesUplimit: item.currentRecvtimesUplimit,
        datalogStartTime: this.dataOfStartSql,
        defaultRecvFrequency: item.defaultRecvFrequency,
        monitorLabel: item.monitorLabel,
      }
      // console.log(this.thisBdata)
      if (this.thisBdata == true) {
        for (var i = 0; i <= this.commonTypeListTwo.length - 1; i++) {
          if (index == i && this.commonTypeListTwo[index].checkedData == true) {
            this.$set(this.commonTypeListTwo[index], 'checkedData', false)
            this.cancelDataTwo = true;
          } else if (index == i && this.commonTypeListTwo[index].checkedData == false) {
            if (this.commonTypeListTwo[index].checkedData == false) {
              this.$set(this.commonTypeListTwo[index], 'checkedData', true)
              this.cancelDataTwo = false;

            } else {

            }
          } else {
            this.$set(this.commonTypeListTwo[i], 'checkedData', false)
          }

        }

      } else {
        this.secendTimeChangeData = true;
        for (var i = 0; i <= this.commonTypeListTwo.length - 1; i++) {
          if (index == i && this.commonTypeListTwo[i].operId !== null && this.commonTypeListTwo[i].visitId !== null && this.commonTypeListTwo[i].patientId !== null) {
            this.hasDataSecend = true;
            this.thisNowIdTwo = this.commonTypeListTwo[i].patientId;
          }
          if (index == i && this.commonTypeListTwo[index].checkedData == false) {
            this.$set(this.commonTypeListTwo[index], 'checkedData', true)
          } else if (index == i && this.commonTypeListTwo[index].checkedData == true) {
            this.$set(this.commonTypeListTwo[i], 'checkedData', false)
          }

        }
        this.cancelDataTwo = false;
      }
      this.forFunction('2', index);
    },
    forFunction(click, index) {
      // alert(click)
      if (click == '1') {
        for (var i = 0; i < this.commonTypeList.length; i++) {
          if (index == i && this.commonTypeList[index].checkedData == true) {
            // alert('绑定')
            this.bothClick1 = true;

          } else if (index == i && this.commonTypeList[index].checkedData == false) {
            // alert('取消')
            this.bothClick1 = false;
          }
        }
      } else if (click == '2') {
        for (var j = 0; j < this.commonTypeListTwo.length; j++) {
          if (index == j && this.commonTypeListTwo[j].checkedData == true) {
            // alert('绑定')
            this.bothClick2 = true;
            // alert(this.commonTypeListTwo[j].checkedData)
          } else if (index == j && this.commonTypeListTwo[j].checkedData == false) {
            // alert('取消')
            this.bothClick2 = false;
          }
        }
      }



    },
    bindingFunction() {
      let nameMonitorOne;
      let nameMonitorTwo;
      if (this.binding.monitorLabel) {
        let afg = {
          monitorLabel: this.binding.monitorLabel
        }
        this.api.selectMonitor(afg)
          .then(kkk => {
            nameMonitorOne = kkk.driverProg;
          })
      }
      if (this.bindingTwo.monitorLabel) {
        let afgT = {
          monitorLabel: this.bindingTwo.monitorLabel
        }
        this.api.selectMonitor(afgT)
          .then(kkk => {
            nameMonitorTwo = kkk.driverProg;
          })
      }
      // 监护仪
      if (this.binding !== '' && this.cancelData == false && this.bothClick1 == true && this.bothClick2 == false) {
        // alert('1')
        // console.log(this.hasDataFirst)
        if (this.hasDataFirst) {
          if (confirm("你选择的监护仪正在被" + this.thisNowId + "使用，是否强制启用此监护仪？")) {
            this.api.bindPatientMonitor(this.binding).then(
              res => {
                // console.log(res.success)
                if (res.success == true) {
                  this.firstmonitor();
                  this.thisOnchange = false;
                  this.bothClick1 = false;
                  window.ipc.send('runexe', nameMonitorOne);
                }
              }
            )
          } else {

          }
        } else {
          this.api.bindPatientMonitor(this.binding).then(
            res => {
              // console.log(res.success)
              if (res.success == true) {
                this.firstmonitor();
                this.thisOnchange = false;
                this.bothClick1 = false;
                window.ipc.send('runexe', nameMonitorOne);
              }
            }
          )
        }

      } else
        // 麻醉机
        if (this.bindingTwo !== '' && this.cancelDataTwo == false && this.bothClick2 == true && this.bothClick1 == false) {
          // alert('2')
          if (this.hasDataSecend) {
            if (confirm("你选择的麻醉机正在被" + this.thisNowIdTwo + "使用，是否强制启用此监护仪？")) {
              this.api.bindPatientMonitor(this.bindingTwo).then(
                res => {
                  // console.log(res.success)
                  if (res.success == true) {
                    this.dataInAnesthesia();
                    this.thisOnchange = false;
                    this.bothClick2 = false;
                    window.ipc.send('runmzexe', nameMonitorTwo);
                  }
                }
              )
            } else {

            }
          } else {
            this.api.bindPatientMonitor(this.bindingTwo).then(
              res => {
                // console.log(res.success)
                if (res.success == true) {
                  this.dataInAnesthesia();
                  this.thisOnchange = false;
                  this.bothClick2 = false;
                  window.ipc.send('runmzexe', nameMonitorTwo);
                }
              }
            )
          }

        } else
      if (this.binding !== '' && this.cancelData == true && this.cancelDataTwo == '' && this.bothClick1 == false && this.thisAdata == true) {
        // alert('3')
        let cancelQues = {
          monitorLabel: this.binding.monitorLabel,
        }
        this.api.cancleBindPatientMonitor(cancelQues)
          .then(
            res => {
              // console.log(res.success)
              if (res.success == true) {
                this.firstmonitor();
                this.cancelData = '';
                this.thisOnchange = false;
                window.ipc.send('runexe', nameMonitorOne);
              }
            }
          )
      } else
      if (this.bindingTwo !== '' && this.cancelDataTwo == true && this.cancelData == '' && this.bothClick2 == false && this.thisBdata == true) {
        // alert('4')
        let cancelQuesT = {
          monitorLabel: this.bindingTwo.monitorLabel,
        }
        this.api.cancleBindPatientMonitor(cancelQuesT)
          .then(
            res => {
              // console.log(res.success)
              if (res.success == true) {
                this.dataInAnesthesia();
                this.cancelDataTwo = '';
                this.thisOnchange = false;
                window.ipc.send('runmzexe', nameMonitorTwo);
              }
            }
          )
      } else
      if (this.thisAdata == true && this.thisBdata == true && this.thisOnchange == true) {
        // alert('5')
        this.api.bindPatientMonitor(this.binding).then(
          res => {
            if (res.success == true) {
              this.firstmonitor();
              this.api.bindPatientMonitor(this.bindingTwo).then(
                res => {
                  if (res.success == true) {
                    this.dataInAnesthesia();
                    window.ipc.send('runmzexe', nameMonitorTwo);
                    this.thisOnchange = false;
                  }
                }
              )
            }
          }
        )

      } else if (this.binding !== '' && this.bindingTwo !== '' && this.cancelData == false && this.bothClick1 == true && this.bothClick2 == true) {
        // alert('6')
        if (this.hasDataFirst && this.hasDataSecend) {
          if (confirm("你选择的监护仪正在被" + this.thisNowId + "使用，是否强制启用此监护仪？")) {
            this.api.bindPatientMonitor(this.binding).then(
              res => {
                // console.log(res.success)
                if (res.success == true) {
                  this.firstmonitor();
                  this.thisOnchange = false;
                  window.ipc.send('runexe', nameMonitorOne);
                }
              }
            )
          } else {

          }
          if (confirm("你选择的麻醉机正在被" + this.thisNowIdTwo + "使用，是否强制启用此监护仪？")) {
            this.api.bindPatientMonitor(this.bindingTwo).then(
              res => {
                // console.log(res.success)
                if (res.success == true) {
                  this.dataInAnesthesia();
                  this.thisOnchange = false;
                  window.ipc.send('runmzexe', nameMonitorTwo);
                }
              }
            )
          } else {

          }
        } else {
          this.api.bindPatientMonitor(this.binding).then(
            res => {
              if (res.success == true) {
                this.firstmonitor();
                this.thisOnchange = false;
                this.api.bindPatientMonitor(this.bindingTwo).then(
                  res => {
                    if (res.success == true) {
                      this.dataInAnesthesia();
                      this.thisOnchange = false;
                      window.ipc.send('runmzexe', nameMonitorTwo);
                    }
                  }
                )
              }
            }
          )

        }

      } else if (this.binding !== '' && this.bindingTwo !== '' && this.cancelData == true && this.cancelDataTwo == true && this.bothClick1 == false && this.bothClick2 == false && this.thisAdata == true && this.thisBdata == true) {
        // alert('7')
        let cancelQuesB1 = {
          monitorLabel: this.binding.monitorLabel,
        }
        let cancelQuesB2 = {
          monitorLabel: this.bindingTwo.monitorLabel,
        }
        this.api.cancleBindPatientMonitor(cancelQuesB1)
          .then(
            res => {
              // console.log(res.success)
              if (res.success == true) {
                this.firstmonitor();
                this.cancelDataTwo = '';
                this.thisOnchange = false;
                this.api.cancleBindPatientMonitor(cancelQuesB2)
                  .then(
                    res => {
                      // console.log(res.success)
                      if (res.success == true) {
                        this.dataInAnesthesia();
                        this.cancelDataTwo = '';
                        this.thisOnchange = false;
                        window.ipc.send('runmzexe', nameMonitorTwo);
                      }
                    }
                  )
              }
            }
          )

      } else if (this.changeFirstData == true && this.changeSecendData == false) {
        // alert('8')
        this.api.bindPatientMonitor(this.binding).then(
          res => {
            if (res.success == true) {
              this.firstmonitor();
              this.thisOnchange = false;
              window.ipc.send('runexe', nameMonitorOne);
            }
          }
        )
      } else if (this.changeFirstData == false && this.changeSecendData == true) {
        // alert('9')
        this.api.bindPatientMonitor(this.bindingTwo).then(
          res => {
            if (res.success == true) {
              this.dataInAnesthesia();
              this.thisOnchange = false;
              window.ipc.send('runmzexe', nameMonitorTwo);
            }
          }
        )
      } else if (this.binding == '' && this.bindingTwo == '') {
        alert('若想启动采集程序，请绑定仪器。')
      } else {
        window.ipc.send('runexe', nameMonitorOne);
        window.ipc.send('runmzexe', nameMonitorTwo);
      }
      // else if (this.thisOnchange == true && this.bothClick1 == '' && this.bothClick2 == '') {

      //         console.log(this.thisAdata)
      //         console.log(this.thisBdata)
      //         if (this.thisAdata == true || this.thisBdata == true) {
      //             if (this.thisOnchange == true) {
      //                 if (this.thisAdata == true) {
      // alert('1')
      //                     // 修改接口
      //                 } else if (this.thisBdata == true) {
      //                     alert('2')
      //                     // 修改接口
      //                 }
      //             } else {
      //                 alert('该系列采集程序已启动。')
      //             }

      //         } else {
      //             alert('启动采集程序需要勾选列表中的采集器。')
      //         }

      // }

    },
    firstFun() {
      this.thisAdata = false;
      for (var a = 0; a < this.commonTypeList.length; a++) {
        if (this.commonTypeList[a].operId !== null && this.commonTypeList[a].visitId !== null && this.commonTypeList[a].patientId !== null) {
          if (this.commonTypeList[a].operId == this.userInfoDataBody.userInfo.operId && this.commonTypeList[a].visitId == this.userInfoDataBody.userInfo.visitId && this.commonTypeList[a].patientId == this.userInfoDataBody.userInfo.patientId) {
            this.thisAdata = true;
            this.defaultRecvFrequency = this.commonTypeList[a].defaultRecvFrequency;
            this.currentRecvFrequency = this.commonTypeList[a].currentRecvFrequency
            this.currentRecvtimesUplimit = this.commonTypeList[a].currentRecvtimesUplimit
            this.binding = {
              bedNo: this.config.userInfo.operatingRoomNo,
              itemType: 0,
              wardCode: this.config.wardCode,
              wardType: 0,
              operId: this.config.userInfo.operId,
              patientId: this.config.userInfo.patientId,
              visitId: this.config.userInfo.visitId,
              datalogStartTime: this.dataOfStartSql,
              currentRecvFrequency: this.commonTypeList[a].currentRecvFrequency,
              currentRecvtimesUplimit: this.commonTypeList[a].currentRecvtimesUplimit,
              defaultRecvFrequency: this.commonTypeList[a].defaultRecvFrequency,
              monitorLabel: this.commonTypeList[a].monitorLabel,
            }
          } else {

          }
        }

      }
    },
    secendFun() {
      this.thisBdata = false;
      // console.log(this.commonTypeListTwo)
      for (var j = 0; j < this.commonTypeListTwo.length; j++) {
        if (this.commonTypeListTwo[j].operId !== null && this.commonTypeListTwo[j].visitId !== null && this.commonTypeListTwo[j].patientId !== null) {
          if (this.commonTypeListTwo[j].operId == this.userInfoDataBody.userInfo.operId && this.commonTypeListTwo[j].visitId == this.userInfoDataBody.userInfo.visitId && this.commonTypeListTwo[j].patientId == this.userInfoDataBody.userInfo.patientId) {
            this.thisBdata = true;
            this.defaultRecvFrequency = this.commonTypeListTwo[j].defaultRecvFrequency;
            this.currentRecvFrequency = this.commonTypeListTwo[j].currentRecvFrequency
            this.currentRecvtimesUplimit = this.commonTypeListTwo[j].currentRecvtimesUplimit
            this.bindingTwo = {
              bedNo: this.config.userInfo.operatingRoomNo,
              itemType: 1,
              wardCode: this.config.wardCode,
              wardType: 0,
              operId: this.config.userInfo.operId,
              patientId: this.config.userInfo.patientId,
              visitId: this.config.userInfo.visitId,
              datalogStartTime: this.dataOfStartSql,
              currentRecvFrequency: this.commonTypeListTwo[j].currentRecvFrequency,
              currentRecvtimesUplimit: this.commonTypeListTwo[j].currentRecvtimesUplimit,
              defaultRecvFrequency: this.commonTypeListTwo[j].defaultRecvFrequency,
              monitorLabel: this.commonTypeListTwo[j].monitorLabel,
            }
          } else {

          }
        }
      }
    }
  },
  mounted() {
    this.dataInAnesthesia();
    this.firstmonitor();
    // console.log(this.dataOfNoneClick)
    this.dataOfStart = this.changeDateFormat(new Date().Format('yyyy-MM-dd hh:mm'));
    this.dataOfStartSql = new Date().Format('yyyy-MM-dd hh:mm');
    // console.log(this.binding)
    // console.log(this.bindingTwo)

  },
}

</script>
<style scoped>
.greenClass {
  background-color: #008000;
}

.window_load {
  width: 800px;
  height: 600px;
  left: calc(50% - 400px);
  top: calc(50% - 300px);
}

.monitorBox {
  width: calc(100% - 4px);
  height: 320px;
  border: 2px solid #191A1C;
  box-sizing: border-box;
  margin: 2px;
  overflow-y: auto;
  padding-top: 24px;
  background-color: #fff;
}

.titleBox {
  border: 1px solid #ddd;
  height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  padding-left: 5px;
  background-color: #fff;
  font-size: 12px;
}

.titleBox:last-child {
  padding-right: 5px;
}

.anesthesia {
  width: calc(100% - 4px);
  height: 145px;
  border: 2px solid #191A1C;
  box-sizing: border-box;
  margin: 10px 2px 2px;
  padding-top: 24px;
  overflow-y: auto;
  background-color: #fff;
}

.HoverClass:hover {
  background-color: rgba(177, 207, 243, 0.7)
}

.bottomBox {
  padding-top: 10px;
  width: 100%;
  height: 80px;
}

.inputBox {
  display: flex;
  font-size: 12px;
}

.inputBox span {
  padding-left: 15px;
  line-height: 24px;
}

.inputBox input {
  height: 20px;
  font-size: 12px;
}

.sureBox {
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: row-reverse;
}

.sureBox button {
  width: 100px;
  height: 24px;
  margin-right: 15px;
  font-size: 12px;
}

</style>
