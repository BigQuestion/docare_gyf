<template>
  <div style="margin: 10px 30px;width: 1300px;padding-top:100px;">
    <div>
      <input type="date" v-model="dateTimeValue">
      <button @click="getView">查询</button>
      <button @click="print">打印</button>
    </div>
    <div ref="tableView">
      <table style="border-collapse:collapse;width: 100%;font-size: 10.5pt;background: white;text-align: center;" border="1" cellspacing="0" cellpadding="0">
        <thead>
          <th v-for="item in tableTitleList" style="font-weight: normal;padding: 5px">
            {{item.title}}
          </th>
        </thead>
        <tbody>
          <tr v-for="tr in viewList">
            <td v-for="td in tableTitleList" style="word-wrap:break-word;word-break:break-all;">
              {{tr[td.field]}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getLodop } from '@/assets/js/LodopFuncs';
let LODOP
export default {
  data() {
    return {
      viewList: [],
      dateTimeValue: '',
      tableTitleList: [{
          title: '预约时间',
          field: 'SCHEDULED_TIME'
        },
        {
          title: '间次',
          field: 'OPERATING_ROOM_NO_SEQUENCE'
        }, {
          title: '姓名',
          field: 'PAT_NAME'
        }, {
          title: '性别',
          field: 'SEX'
        }, {
          title: '年龄',
          field: 'PAT_AGE'
        }, {
          title: '病区',
          field: 'OPERATING_DEPT_NAME'
        }, {
          title: '床号',
          field: 'BED_NO'
        }, {
          title: '手术名称',
          field: 'OPERATION_NAME'
        }, {
          title: '麻醉方式',
          field: 'ANESTHESIA_METHOD'
        }, {
          title: '主麻医生',
          field: 'ANESTHESIA_DOCTOR_NAME'
        }, {
          title: '副麻医生',
          field: ''
        }, {
          title: '麻醉助手',
          field: 'ANESTHESIA_ASSISTANT_NAME'
        }, {
          title: '主刀医师',
          field: 'SURGEON_NAME'
        }, {
          title: '洗手护士',
          field: 'FIRST_OPERATION_NURSE_NAME'
        }, {
          title: '巡回护士',
          field: 'FIRST_SUPPLY_NURSE_NAME'
        },
      ]
    }
  },
  methods: {
    getView() {
      let params = {
        dateTime: this.dateTimeValue
      }
      this.api.getScheduleReportView(params)
        .then(res => {
          if (res.list.length == 0) {
            alert("所选日期没有手术")
          }
          this.viewList = res.list;
        })
    },
    print() {
      LODOP = getLodop();
      // LODOP.ADD_PRINT_TABLE(100, 1, "99.8%", 250, this.$refs.tableView.innerHTML);
      LODOP.ADD_PRINT_TABLE(10, 5, "99%", "BottomMargin:1mm", this.$refs.tableView.innerHTML);

      LODOP.PREVIEW();
    }
  },
  mounted() {
    this.dateTimeValue = new Date().Format("yyyy-MM-dd");
    this.getView()

  }
}

</script>
