<template>
  <div style="position:fixed;z-index:999;cursor:not-allowed;left:0;top:0;width:100%;height:100%;">
    <div style="height: 400px;width: 650px;position: absolute;left:calc(50% - 325px);top:calc(50% - 200px);border: 2px solid #8DB8F0;background: rgb(227, 239, 255);cursor:auto;">
      <div class="load_top">
        <div>急诊登记</div>
        <div @click="closeJzView" class="top_active">X</div>
      </div>
      <div style="padding: 10px;">
        <div class="flex">
          <div style="width: 70px;">患者ID</div>
          <div>
            <input v-model="jzInfo.patientId" @keyup.enter='getJzPatient' name="" style="width: 100px;">
          </div>
          <div style="width: 60px;margin-left: 15px;">住院号</div>
          <div>
            <input v-model="jzInfo.inpNo" @keyup.enter='getJzPatient' style="width: 100px;">
          </div>
          <div style="width: 40px;margin-left: 15px;">姓名</div>
          <div>
            <input v-model="jzInfo.name" style="width: 100px;" readonly="readonly">
          </div>
          <div style="width: 40px;margin-left: 15px;">性别</div>
          <div>
            <input v-model="jzInfo.sex" style="width: 60px;" readonly="readonly">
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">出生日期</div>
          <div>
            <input v-model="jzInfo.dateBirth" style="width: 120px;" readonly="readonly">
          </div>
          <div style="width: 40px;margin-left: 40px;">床号</div>
          <div>
            <input v-model="jzInfo.bedNo" style="width: 60px;" readonly="readonly">
          </div>
          <div style="width: 80px;margin-left: 30px;">所在科室</div>
          <div>
            <input v-model="jzInfo.depeName" style="width: 180px;" readonly="readonly">
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">主要诊断</div>
          <div style="position: relative;">
            <input v-model="jzInfo.diagBeforeOperation" style="width: 555px;" @dblclick="openSelectView">
            <jzSelect v-on:closeDiagView="openSelectView" methodName="diagBeforeOperation" :dataInfo="jzInfo" width="555" v-if="diagView"></jzSelect>
          </div>
        </div>
        <!-- <div class="flex" style="margin-top: 5px;">
                  <div style="width: 70px;">病情</div>
                  <div>
                    <input type="" name="" style="width: 555px;">
                  </div>
                </div> -->
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">手术时间</div>
          <div>
            <!-- <dateTime width="170" v-model="operMasterTime" @change="changeStatus('5','inDateTime',$event)"></dateTime> -->
            <input type="datetime-local" v-model="operMasterTime" class="timePicker" name="" style="width: 170px;">
          </div>
          <div style="width: 40px;margin-left: 20px;">台次</div>
          <div>
            <select style="width: 60px;" v-model="sequence">
              <option v-for="(item,index) in 10" :value="index+1">{{ index+1}}</option>
            </select>
          </div>
          <div style="width: 70px;margin-left: 30px;">
            <span style="color: red">*</span>手术间</div>
          <div>
            <select style="width: 60px;" v-model="roomMasterNo">
              <option v-for="(item,index) in roomList" :value="item.roomNo">{{ item.roomNo}}</option>
            </select>
            <span>(双击选择)</span>
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <!-- <div style="width: 70px;">隔离</div>
              <div>
                <input type="" name="" style="width: 80px;">
              </div>
              <div style="width: 40px;margin-left: 70px;">等级</div>
              <div>
                <input type="" name="" style="width: 80px;">
              </div> -->
          <div style="width: 70px;">麻醉方法</div>
          <div>
            <input v-model="jzInfo.anesthesiaMethod" style="width: 555px;" @dblclick="openMethodView">
            <jzSelect v-on:closeMethodView="openMethodView" methodName="anesthesiaMethod" :dataInfo="jzInfo" width="555" v-if="methodView"></jzSelect>
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">麻醉医生</div>
          <div>
            <input v-model="jzInfo.anesthesiaDoctor" style="width: 80px;" @dblclick="anesthesiaDoctorOpenView" readonly="readonly">
            <userSelect v-if="anesthesiaDoctorView" methodName="anesthesiaDoctor" :deptCode="deptCode" userJob="医生" :dataInfo="jzInfo" v-on:closeanesthesiaDoctor="anesthesiaDoctorOpenView" width="120"></userSelect>
          </div>
          <div style="margin-left: 15px;">
            <input v-model="jzInfo.secondAnesthesiaDoctor" style="width: 80px;" @dblclick="secondAnesthesiaDoctorOpenView" readonly="readonly">
            <userSelect v-if="secondAnesthesiaDoctorView" methodName="secondAnesthesiaDoctor" :deptCode="deptCode" userJob="医生" :dataInfo="jzInfo" v-on:closesecondAnesthesiaDoctor="secondAnesthesiaDoctorOpenView" width="120"></userSelect>
          </div>
          <div style="width: 70px;margin-left: 60px;">麻醉助手</div>
          <div style="margin-left: 15px;position: relative;">
            <input v-model="jzInfo.anesthesiaAssistant" style="width: 80px;" @dblclick="anesthesiaAssistantOpenView" readonly="readonly">
            <userSelect v-if="anesthesiaAssistantView" methodName="anesthesiaAssistant" :deptCode="deptCode" userJob="医生" :dataInfo="jzInfo" v-on:closeanesthesiaAssistant="anesthesiaAssistantOpenView" width="120"></userSelect>
            <!-- <testSelect style="position: absolute;top: 0px;" ref="test" width="120"></testSelect> -->
          </div>
          <div style="margin-left: 15px;">
            <input v-model="jzInfo.secondAnesthesiaAssistant" style="width: 80px;" @dblclick="secondAnesthesiaAssistantOpenView" readonly="readonly">
            <userSelect v-if="secondAnesthesiaAssistantView" methodName="secondAnesthesiaAssistant" :dataInfo="jzInfo" v-on:closesecondAnesthesiaAssistant="secondAnesthesiaAssistantOpenView" width="120"></userSelect>
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">切口等级</div>
          <div>
            <input v-model="jzInfo.qiekouClass" style="width: 80px;">
          </div>
          <div style="width: 70px;margin-left: 30px;">切口个数</div>
          <div style="margin-left: 10px;">
            <input v-model="jzInfo.qiekouNumber" style="width: 80px;">
          </div>
          <div style="width: 70px;margin-left: 30px;">急诊择期</div>
          <div style="margin-left: 10px;">
            <!-- <input v-model="jzInfo.emergencyIndicator" style="width: 80px;"> -->
            <select v-model="emergencyIndicator" style="width: 80px;">
              <option :value="1">急诊</option>
              <option :value="0">择期</option>
            </select>
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">手术医师</div>
          <div>
            <input v-model="jzInfo.surgeon" style="width: 80px;" @dblclick="surgeonOpenView" readonly="readonly">
            <userSelect v-if="surgeonView" methodName="surgeon" userJob="医生" :dataInfo="jzInfo" v-on:closesurgeon="surgeonOpenView" width="120"></userSelect>
          </div>
          <div style="width: 70px;margin-left: 30px;">手术助手</div>
          <div style="margin-left: 10px;">
            <input v-model="jzInfo.firstAssistant" style="width: 80px;" @dblclick="firstAssistantOpenView" readonly="readonly">
            <userSelect v-if="firstAssistantView" methodName="firstAssistant" userJob="医生" :dataInfo="jzInfo" v-on:closefirstAssistant="firstAssistantOpenView" width="120"></userSelect>
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">洗手护士</div>
          <div>
            <input v-model="jzInfo.firstOperationNurse" style="width: 80px;" @dblclick="firstOperationNurseOpenView" readonly="readonly">
            <userSelect v-if="firstOperationNurseView" methodName="firstOperationNurse" :deptCode="deptCode" userJob="护士" :dataInfo="jzInfo" v-on:closefirstOperationNurse="firstOperationNurseOpenView" width="120"></userSelect>
          </div>
          <div style="margin-left: 10px;">
            <input v-model="jzInfo.secondOperationNurse" style="width: 80px;" @dblclick="secondOperationNurseOpenView" readonly="readonly">
            <userSelect v-if="secondOperationNurseView" methodName="secondOperationNurse" :deptCode="deptCode" userJob="护士" :dataInfo="jzInfo" v-on:closesecondOperationNurse="secondOperationNurseOpenView" width="120"></userSelect>
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">巡回护士</div>
          <div>
            <input v-model="jzInfo.firstSupplyNurse" style="width: 80px;" @dblclick="firstSupplyNurseOpenView" readonly="readonly">
            <userSelect v-if="firstSupplyNurseView" methodName="firstSupplyNurse" :deptCode="deptCode" userJob="护士" :dataInfo="jzInfo" v-on:closefirstSupplyNurse="firstSupplyNurseOpenView" width="120"></userSelect>
          </div>
          <div style="margin-left: 10px;">
            <input v-model="jzInfo.secondSupplyNurse" style="width: 80px;" @dblclick="secondSupplyNurseOpenView" readonly="readonly">
            <userSelect v-if="secondSupplyNurseView" methodName="secondSupplyNurse" :deptCode="deptCode" userJob="护士" :dataInfo="jzInfo" v-on:closesecondSupplyNurse="secondSupplyNurseOpenView" width="120"></userSelect>
          </div>
          <div style="margin-left: 10px;">
            <input v-model="jzInfo.thirdSupplyNurse" style="width: 80px;" @dblclick="thirdSupplyNurseOpenView" readonly="readonly">
            <userSelect v-if="thirdSupplyNurseView" methodName="thirdSupplyNurse" :deptCode="deptCode" userJob="护士" :dataInfo="jzInfo" v-on:closethirdSupplyNurse="thirdSupplyNurseOpenView" width="120"></userSelect>
          </div>
        </div>
        <div class="flex" style="margin-top: 5px;">
          <div style="width: 70px;">手术名称</div>
          <div>
            <input v-model="jzInfo.operationName" style="width: 555px;" @dblclick="openOperationNameView">
            <jzSelect v-on:closeOperationNameView="openOperationNameView" methodName="operationName" :dataInfo="jzInfo" width="555" v-if="operationNameView"></jzSelect>
          </div>
        </div>
      </div>
      <div style="position: absolute;bottom: 10px;right: 20px;width: 100%;text-align: right;">
        <button @click="submitJzInfo">保存</button>
        <button @click="closeJzView">取消</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import jzSelect from '@/components/jzRegisterContent/jzSelect.vue';
import userSelect from '@/components/jzRegisterContent/userSelect.vue';
import testSelect from '@/components/jzRegisterContent/testSelect.vue';
import dateTime from '@/components/plugins/dateTime.vue';
export default {
  data() {
    return {
      jzInfo: {}, //急诊病人对象
      inpNo: '',
      sequence: '',
      roomList: [], //手术间李彪
      roomMasterNo: '', //手术间号
      diagView: false,
      methodView: false,
      operationNameView: false,
      anesthesiaDoctorView: false,
      secondAnesthesiaDoctorView: false,
      anesthesiaAssistantView: false,
      secondAnesthesiaAssistantView: false,
      surgeonView: false,
      firstAssistantView: false,
      secondAssistantView: false,
      thirdAssistantView: false,
      fourthAssistantView: false,
      firstOperationNurseView: false,
      secondOperationNurseView: false,
      firstSupplyNurseView: false,
      secondSupplyNurseView: false,
      thirdSupplyNurseView: false,
      operMasterTime: '', //手术时间
      anesthesiaMethod: '', //麻醉方法
      emergencyIndicator: 1,
      deptCode: '', //科室代码
    }
  },
  methods: {
    //获取急诊病人
    getJzPatient() {
      let params = {
        inpNo: this.jzInfo.inpNo,
        patientId: this.jzInfo.patientId
      }
      this.api.getJzHisPatInfo(params)
        .then(res => {
          if (!res.patientId) {
            alert("病人不存在")
            return false;
          }
          this.jzInfo = res;
        })

    },
    changeSequence() {

    },
    //获取所有手术间
    getAllRoomNo() {
      let params = {
        deptCode: this.config.wardCode,
        bedType: '0'
      }
      this.api.selectAllRoomNo(params)
        .then(res => {
          this.roomList = res;
        })
    },
    closeJzView() {
      this.$emit('closeJzViewChild');
    },
    openSelectView() {
      this.diagView = !this.diagView;
    },
    openMethodView() {
      this.methodView = !this.methodView;
    },
    openOperationNameView() {
      this.operationNameView = !this.operationNameView;
    },
    anesthesiaDoctorOpenView() {
      this.anesthesiaDoctorView = !this.anesthesiaDoctorView;
    },
    secondAnesthesiaDoctorOpenView() {
      this.secondAnesthesiaDoctorView = !this.secondAnesthesiaDoctorView;
    },
    anesthesiaAssistantOpenView() {
      this.anesthesiaAssistantView = !this.anesthesiaAssistantView;
    },
    secondAnesthesiaAssistantOpenView() {
      this.secondAnesthesiaAssistantView = !this.secondAnesthesiaAssistantView;
    },
    surgeonOpenView() {
      this.surgeonView = !this.surgeonView;
    },
    firstAssistantOpenView() {
      this.firstAssistantView = !this.firstAssistantView;
    },
    secondAssistantOpenView() {
      this.secondAssistantView = !this.secondAssistantView;
    },
    thirdAssistantOpenView() {
      this.thirdAssistantView = !this.thirdAssistantView;
    },
    fourthAssistantOpenView() {
      this.fourthAssistantView = !this.fourthAssistantView;
    },
    firstOperationNurseOpenView() {
      this.firstOperationNurseView = !this.firstOperationNurseView;
    },
    secondOperationNurseOpenView() {
      this.secondOperationNurseView = !this.secondOperationNurseView;
    },
    firstSupplyNurseOpenView() {
      this.firstSupplyNurseView = !this.firstSupplyNurseView;
    },
    secondSupplyNurseOpenView() {
      this.secondSupplyNurseView = !this.secondSupplyNurseView;
    },
    thirdSupplyNurseOpenView() {
      this.thirdSupplyNurseView = !this.thirdSupplyNurseView;
    },
    //保存
    submitJzInfo() {
      if (!this.roomMasterNo) {
        alert("请选择手术间")
        return
      }
      let params = {
        patientId: this.jzInfo.patientId,
        visitId: this.jzInfo.visitId,
        deptStayed: this.jzInfo.deptCode,
        diagBeforeOperation: this.jzInfo.diagBeforeOperation,
        bedNo: this.jzInfo.bedNo,
        scheduledDateTime: this.datetimeLocalToDate(this.operMasterTime),
        sequence: this.sequence,
        operatingRoomNo: this.roomMasterNo,
        anesthesiaMethod: this.jzInfo.anesthesiaMethod,
        anesthesiaDoctor: this.jzInfo.anesthesiaDoctorId,
        secondAnesthesiaDoctor: this.jzInfo.secondAnesthesiaDoctorId,
        anesthesiaAssistant: this.jzInfo.anesthesiaAssistantId,
        secondAnesthesiaAssistant: this.jzInfo.secondAnesthesiaAssistantId,
        qiekouClass: this.jzInfo.qiekouClass,
        qiekouNumber: this.jzInfo.qiekouNumber,
        emergencyIndicator: this.emergencyIndicator,
        surgeon: this.jzInfo.surgeonId,
        firstAssistant: this.jzInfo.firstAssistantId,
        secondAssistant: this.jzInfo.secondAssistantId,
        thirdAssistant: this.jzInfo.thirdAssistantId,
        fourthAssistant: this.jzInfo.fourthAssistantId,
        firstOperationNurse: this.jzInfo.firstOperationNurseId,
        secondOperationNurse: this.jzInfo.secondOperationNurseId,
        firstSupplyNurse: this.jzInfo.firstSupplyNurseId,
        secondOperationNurse: this.jzInfo.secondOperationNurseId,
        thirdSupplyNurse: this.jzInfo.thirdSupplyNurseId,
        operationName: this.jzInfo.operationName,
        operStatus: 0,
        operatingRoom: this.config.wardCode //手术室代码
      }
      this.api.insertEmergencyWrite(params)
        .then(res => {
          if (res.success) {
            alert("操作成功");
            this.$emit('closeJzViewChild');
          } else {
            alert("登记失败")
          }


        })
    },
    getUsers() {
      let param = {
        deptCode: this.deptCode,
        userJob: this.userJob
      }
      this.api.getAllUsers(param)
        .then(res => {
          this.$refs.test.show();
          this.$refs.test.setDataList(res);
        })
    },
    chooseOperatorA(value) {
      this.anesthesiaAssistant = value
    },
    getxshs() {
      let param = {
        deptCode: this.deptCode,
        userJob: this.userJob
      }
      this.api.getAllUsers(param)
        .then(res => {
          this.$refs.xshs.show();
          this.$refs.xshs.setDataList(res);
        })
    },
    choosexshs(value) {
      this.anesthesiaAssistant = value
    }
  },
  mounted() {
    this.deptCode = this.config.wardCode
    this.operMasterTime = this.changeDateFormat(new Date().Format('yyyy-MM-dd hh:mm'));
    this.getAllRoomNo();
    // this.$refs.test.init({
    //   loadedFun: this.getUsers,
    //   chooseAction: this.chooseOperatorA,
    //   fieldName: 'USER_NAME'
    // })
    // this.$refs.xshs.init({
    //   loadedFun: this.getxshs,
    //   chooseAction: this.choosexshs,
    //   fieldName: 'USER_NAME'
    // })
    // this.$refs.areaSelect.init(this.info.jtqhdm);
  },
  created() {},
  beforeDestroy() {},
  components: {
    jzSelect,
    userSelect,
    testSelect,
    dateTime
  },
  computed: {

  }
}

</script>
<style scoped>
.timePicker::-webkit-inner-spin-button {
  display: none;
}

</style>
