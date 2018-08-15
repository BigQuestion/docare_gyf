<template>
  <div>
    <div class="window_load" style="height:160px;width: 300px;z-index:1;position:absolute;left:20%;top: 20%;">
      <div class="load_top">
        <div>更换房间</div>
        <div @click="closeChangeRoom" class="top_active">X</div>
      </div>
      <div style="padding:10px 0 10px 10px;">
        <div>
          <span>当前房间:{{room}}</span>
        </div>
        <div style="margin-top:10px;">
          <span>更换房间：</span>
          <select style="width: 60px;" v-model="roomMasterNo">
            <option v-for="(item,index) in roomList" :value="item.roomNo">{{ item.roomNo}}</option>
          </select>
        </div>
        <div style="margin-top:30px;margin-right: 20px;text-align: center;">
          <button @click="updateMedOperationMaster">保存</button>
          <button @click="closeChangeRoom">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      roomMasterNo: '',
      roomList: [],
      room: '',
    }
  },
  methods: {
    closeChangeRoom() {
      this.$emit('closeChangeRoom');
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
    //修改
    updateMedOperationMaster() {
      if (!this.roomMasterNo) {
        alert("请选择手术间")
        return
      }
      let params = {
        patientId: this.config.userInfo.patientId,
        visitId: this.config.userInfo.visitId,
        operId: this.config.userInfo.operId,
        operatingRoomNo: this.roomMasterNo
      }
      this.api.updateMedOperationMaster(params)
        .then(res => {
          if (res.success) {
            alert("更换成功")
            this.$emit('closeChangeRoom');
          } else {
            alert("更换失败")
          }
        })
    },
  },
  mounted() {
    this.getAllRoomNo()
    this.room = this.config.userInfo.operatingRoomNo
  },
  created() {},
  beforeDestroy() {},
  components: {},
  computed: {

  }
}

</script>
