<template>
  <div v-if="!settingView" style="height:100%;position:relative;overflow-y:hidden;" @click="allNone()">
    <div class="head">
      <div class="logo">
        <div :style="logo">
          <!-- <img src="../../assets/logo.jpg"> -->
        </div>
        <div :style="logo1" style="background-color: rgb(21,111,174);color:white;line-height: 30px;box-sizing:border-box;padding-left:5px;">
          <span style="margin-left: 30px;font-size:13px;">{{nowTime}}</span>
        </div>
      </div>
      <div class="currentPatientInfo">
        <span style="color:#CD5C5C;font-size:24px;font-weight: bold;">{{lockedPatientInfo.operatingRoomNo}}</span>
        <img style="margin:0 6px;" src="../../assets/people.png" alt="">
        <div style="width:90px;">
          <div style="padding-bottom:5px;border-bottom:1px solid #8B8B8B;font-size:16px;">{{lockedPatientInfo.patientId}}</div>
          <div style="color:#001AFA;font-size:18px;">{{lockedPatientInfo.patientName}}</div>
        </div>
      </div>
      <div class="procedure" style="position: relative;">
        <div style="display: flex;height:70px;" v-if="lockedPatientInfo.patientId">
          <div style="margin:0px 4px;">
            <div class="lightBox" @contextmenu.prevent="showDoubleListOne(lockedPatientInfo.operStatus)">
              <img v-if="lockedPatientInfo.operStatus == 0" style="display:block" src="../../assets/grayLight.png" alt="">
              <img v-else-if="lockedPatientInfo.operStatus == 5" style="display:block" src="../../assets/redLight.png" alt="">
              <img v-else style="display:block" src="../../assets/light.png" alt="">
              <span style="font-size:18px;">入手术室</span>
              <div v-if="doShowDataOne" class="inseide">
                <div class="insideHover" @click="finalStatus('0')">取消状态【入手术室】</div>
              </div>
            </div>
            <div style="position: relative;">
              <!-- <input type="" name="" @click="testclick"> -->
              <input ref="intest" id="intest" class="timePicker" type="datetime-local" v-model="inDateTime" @blur="changeStatus('5','inDateTime',$event)">
            </div>
          </div>
          <div style="margin:0px 4px;" v-if="inDateTime">
            <div class="lightBox" @contextmenu.prevent="showDoubleListTwo(lockedPatientInfo.operStatus)">
              <img v-if="lockedPatientInfo.operStatus == 10" style="display:block" src="../../assets/redLight.png" alt="">
              <img v-else-if="lockedPatientInfo.operStatus == 5" style="display:block" src="../../assets/grayLight.png" alt="">
              <img v-else style="display:block" src="../../assets/light.png" alt="">
              <span style="font-size:18px;">麻醉开始</span>
              <div v-if="doShowDataTwo" class="inseide">
                <div class="insideHover" @click="finalStatus('5')">转入状态【入手术室】</div>
              </div>
            </div>
            <div>
              <input class="timePicker" type="datetime-local" name="" v-model="anesStartTime" @blur="changeStatus('10','anesStartTime',$event)">
              <!-- <vue-date-calendar id="demo1" :option.sync="option"></vue-date-calendar> -->
            </div>
          </div>
          <div style="margin:0px 4px;" v-if="anesStartTime">
            <div class="lightBox" @contextmenu.prevent="showDoubleListThree(lockedPatientInfo.operStatus)">
              <img v-if="lockedPatientInfo.operStatus == 10" style="display:block" src="../../assets/grayLight.png" alt="">
              <img v-else-if="lockedPatientInfo.operStatus == 15" style="display:block" src="../../assets/redLight.png" alt="">
              <img v-else style="display:block" src="../../assets/light.png" alt="">
              <span style="font-size:18px;">手术开始</span>
              <div v-if="doShowDataThree" class="inseide">
                <div class="insideHover" @click="finalStatus('10')">转入状态【麻醉开始】</div>
              </div>
            </div>
            <div>
              <input class="timePicker" type="datetime-local" name="" v-model="startDateTime" @blur="changeStatus('15','startDateTime',$event)">
            </div>
          </div>
          <div style="margin:0px 4px;" v-if="startDateTime">
            <div class="lightBox" @contextmenu.prevent="showDoubleListFour(lockedPatientInfo.operStatus)">
              <img v-if="lockedPatientInfo.operStatus == 15" style="display:block" src="../../assets/grayLight.png" alt="">
              <img v-else-if="lockedPatientInfo.operStatus == 25" style="display:block" src="../../assets/redLight.png" alt="">
              <img v-else style="display:block" src="../../assets/light.png" alt="">
              <span style="font-size:18px;">手术结束</span>
              <div v-if="doShowDataFour" class="inseide">
                <div class="insideHover" @click="finalStatus('15')">转入状态【手术开始】</div>
              </div>
            </div>
            <div>
              <input class="timePicker" type="datetime-local" name="" v-model="endDateTime" @blur="changeStatus('25','endDateTime',$event)">
            </div>
          </div>
          <div style="margin:0px 4px;" v-if="endDateTime">
            <div class="lightBox" @contextmenu.prevent="showDoubleListFive(lockedPatientInfo.operStatus)">
              <img v-if="lockedPatientInfo.operStatus == 25" style="display:block" src="../../assets/grayLight.png" alt="">
              <img v-else-if="lockedPatientInfo.operStatus == 30" style="display:block" src="../../assets/redLight.png" alt="">
              <img v-else style="display:block" src="../../assets/light.png" alt="">
              <span style="font-size:18px;">麻醉结束</span>
              <div v-if="doShowDataFive" class="inseide">
                <div class="insideHover" @click="finalStatus('25')">转入状态【手术结束】</div>
              </div>
            </div>
            <div>
              <input class="timePicker" type="datetime-local" name="" v-model="anesEndTime" @blur="changeStatus('30','anesEndTime',$event)">
            </div>
          </div>
          <div style="margin:0px 4px;" v-if="anesEndTime">
            <div ref="area" @contextmenu.prevent="showDoubleListSix(lockedPatientInfo.operStatus)" class="lightBox">
              <img v-if="lockedPatientInfo.operStatus == 30" style="display:block" src="../../assets/grayLight.png" alt="">
              <img v-else-if="lockedPatientInfo.operStatus == 35" style="display:block" src="../../assets/redLight.png" alt="">
              <img v-else style="display:block" src="../../assets/light.png" alt="">
              <span style="font-size:18px;">出手术室</span>
              <div v-if="doShowDataSix" class="inseide">
                <div class="insideHover" @click="finalStatus('30')">转入状态【麻醉结束】</div>
                <div class="insideHover" @click="finalStatus('60')">转入病房</div>
                <div class="insideHover" @click="finalStatus('45')">进复苏室</div>
                <div class="insideHover" @click="finalStatus('65')">转入ICU</div>
              </div>
            </div>
            <div>
              <input class="timePicker" type="datetime-local" name="" v-model="outDateTime" @blur="changeStatus('35','outDateTime',$event)">
            </div>
          </div>
        </div>
        <div v-if="lockedPatientInfo.patientId" style="height: 30px;position: absolute;bottom: 0px;width: 90%;border-top: 1px solid black;display:flex;box-sizing:border-box;margin-left:5px;">
          <div v-for="item in medBillList" @click="selectMedFormTemp(item)" :class="{bindClass:item.bindClassData}" class="listButton">
            {{item.formName}}
          </div>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="left" style="overflow-y: auto;">
        <div style="height: auto;background-color: rgb(29,117,181);margin-bottom:5px;">
          <div class="stretch">
            <div style="display:flex;">
              <img style="height:21px;padding-right:3px;" src="../../assets/icon_1.png" alt=""> 电子病历
            </div>
            <div class="active_back" @click="concealmentOne"><img :class="{transform:isTransformOne}" src="../../assets/bottom.png"></div>
          </div>
          <div v-if="concealmentOneData" style="padding:5px;display:flex;flex-wrap:wrap;">
            <button class="list_button">检查信息</button>
            <button class="list_button">检查结果</button>
            <button class="list_button">医嘱信息</button>
            <button class="list_button">病例病程</button>
          </div>
        </div>
        <div style="height: auto;background-color: rgb(29,117,181);margin-bottom:5px;" v-if="lockedPatientInfo.patientId">
          <div class="stretch">
            <div style="display:flex;">
              <img style="height:21px;padding-right:3px;" src="../../assets/icon_2.jpg" alt=""> 患者操作
            </div>
            <div class="active_back" @click="concealmentTwe"><img :class="{transform:isTransformTwe}" src="../../assets/bottom.png"></div>
          </div>
          <div v-if="concealmentTweData" style="padding:5px;display:flex;flex-wrap:wrap;">
            <button v-if="formDetail" class="list_button" @click="monitor">监护仪</button>
            <button v-if="formDetail" class="list_button" @click="getOperationRegister">术中登记</button>
            <button v-if="lockedPatientInfo.patientId" class="list_button" @click="getPatientOperationInfo">手术信息</button>
            <button @click="cancel" class="list_button">取消手术</button>
          </div>
        </div>
        <div style="height: auto;background-color: rgb(29,117,181);margin-bottom:5px;">
          <div class="stretch">
            <div style="display:flex;">
              <img style="height:21px;padding-right:3px;" src="../../assets/icon_3.png" alt=""> 常用功能
            </div>
            <div class="active_back" @click="concealmentThree"><img :class="{transform:isTransformThree}" src="../../assets/bottom.png"></div>
          </div>
          <div v-if="concealmentThreeData" style="padding:5px;display:flex;flex-wrap:wrap;">
            <button @click="dictShow" class="list_button">字典</button>
            <button class="list_button">模板管理</button>
          </div>
        </div>
        <div style="height: auto;background-color: rgb(29,117,181);margin-bottom:5px;">
          <div class="stretch">
            <div style="display:flex;">
              <img style="height:21px;padding-right:3px;" src="../../assets/icon_4.png" alt=""> 其他
            </div>
            <div class="active_back" @click="concealmentFour"><img :class="{transform:isTransformFour}" src="../../assets/bottom.png"></div>
          </div>
          <div v-if="concealmentFourData" style="padding:5px;display:flex;flex-wrap:wrap;">
            <button class="list_button">系统配置</button>
            <button @click="getAboutUs" class="list_button">关于</button>
            <button @click="exitSystem" class="list_button">退出系统</button>
            <button class="list_button">修改密码</button>
          </div>
        </div>
      </div>
      <div class="content">
        <!-- <div class="patientList" :class="{animationClassNone:showData,animationClassShow:showDataTwo}"> -->
        <div class="patientList" v-show="showData">
          <div style="height:105px;border-bottom:1px solid rgb(175,205,242);box-sizing:border-box;">
            <div>
              <div class="container" style="padding-left: 5px;margin-bottom:10px;margin-top:5px;align-items:center;">
                <img style="margin-right:10px;height:20px;" src="../../assets/people.png" alt="">
                <div style="line-height:24px;display:flex;align-items:center;">
                  <input type="radio" id="all" @click="searchPatientList" v-model="operStatus" value="">
                  <label for="all">全部</label>
                  <input type="radio" id="one" @click="searchPatientList" value="0" v-model="operStatus">
                  <label for="one">术前</label>
                  <input type="radio" id="two" @click="searchPatientList" value="15" v-model="operStatus">
                  <label for="two">术中</label>
                  <input type="radio" id="three" @click="searchPatientList" value="25" v-model="operStatus">
                  <label for="three">术后</label>
                  <br>
                </div>
              </div>
              <div class="container" style="padding-left: 5px;margin-bottom:10px;">
                <div class="left15" style="margin-left:5px;display:flex;height:22px;line-height:22px;">
                  <span>ID</span>
                  <input @keyup.enter='searchPatientList' style="width: 84px;font-size:12px;" type="text" v-model="patientId">
                </div>
                <div class="left15" style="margin-left:5px;display:flex;height:22px;line-height:22px;">
                  <span>姓名</span>
                  <input @keyup.enter='searchPatientList' type="text" style="width: 60px;font-size:12px;" v-model="patientName">
                </div>
                <div class="left15" style="margin-left:5px;display:flex;height:22px;line-height:22px;">
                  <span>日期</span>
                  <input v-model="getTime" type="date" style="width: 125px;font-size:12px;" @keyup.enter='searchPatientList'>
                  <!-- <myDatepicker :date="startTime" :option="option" :limit="limit"></myDatepicker> -->
                </div>
              </div>
            </div>
            <div style="padding-left: 5px;">
              <button style="font-size:12px;" @click='openJzView'>急诊登记</button>
              <button style="font-size:12px;" @click='searchPatientList'>搜索</button>
            </div>
          </div>
          <div style="overflow-y: auto;height:calc(100% - 105px - 80px);font-size:12px;">
            <div v-for="item in patientList" class="listBorder" :class="{thisClickBackClass:item.thisClickBack}" v-on:click="patientDeatilInfo(item)" v-on:dblclick="lockedPatient(item)">
              <div class="patientContent title_back">
                <span>手术间 {{item.operatingRoomNo}}</span>
              </div>
              <ul style="padding-left:5px;">
                <li>患者 {{item.patientName}} {{item.patientId}} 住院号 {{item.inpNo}}</li>
                <li>手术 {{item.operationName}}</li>
                <li v-if="item.inDateTime==null">时间 {{item.scheduledDateTime}}</li>
                <li v-if="item.inDateTime!=null">时间 {{item.inDateTime}}</li>
                <li>术者 {{item.surgeonName}} 麻醉 {{item.anesthesiaDoctorName}} {{item.anesthesiaAssistantName}}</li>
              </ul>
            </div>
          </div>
          <div v-if="pageShowData" class="pageClass">
            <div>
              <div style="display:flex;items-align:center;padding-top:3px;">
                <span>患者数量:</span>
                <span style="color:rgb(0, 26, 250);padding:0 5px;">{{pageLength}}</span>
                <span style="padding-right:5px;">共{{pages}}页</span>
                <span>每页显示</span>
                <input style="width:50px;" type="number" min="5" max="100" @change="dataInSize($event)" v-model="size">
              </div>
              <div style="display:flex;items-align:center;padding-top:10px;">
                <button @click="firstPage" style="width:60px;font-size:12px;">首页</button>
                <button @click="pageRe" style="width:60px;font-size:12px;">上一页</button>
                <div @click="showSelect" class="pageInDiv">
                  <span>{{pageNum}}</span>
                  <div @click.stop="noClick" v-if="dataInSelect" class="pageInSelect">
                    <div @click="pageChoose(item.number)" v-for="item in dataTypeInAllSelect">{{item.number}}</div>
                  </div>
                </div>
                <button @click="pageAd" style="width:60px;font-size:12px;">下一页</button>
                <button @click="lastPage" style="width:60px;font-size:12px;">末页</button>
              </div>
            </div>
            <div>
              <span>排序方式</span>
              <div @click="sort1">
                <input type="radio" id="house" name="sort">
                <label for="house">术间</label>
              </div>
              <div @click="sort0">
                <input type="radio" id="timeHo" name="sort">
                <label for="timeHo">时间</label>
              </div>
            </div>
          </div>
        </div>
        <div class="leftNoneBox" @click="leftNone">
          <div :class="{trans:transData}" class="leftNoneImg">
            <img src="../../assets/left.png" alt="">
            <img src="../../assets/left.png" alt="">
            <img src="../../assets/left.png" alt="">
            <img src="../../assets/left.png" alt="">
          </div>
        </div>
        <div class="patientInfo" v-if="viewInfo">
          <div class="pat_title title_back">患者详情</div>
          <div style="margin-top: 5px;">
            <div class="title_back" style="border:1px solid rgb(177,207,243);padding-left: 20px;">基本信息</div>
            <div class="patientContentBox">
              <div class="container">
                <div>患者ID</div>
                <div class="in_con" style="width:100px;">
                  {{patientInfo.PATIENT_ID}}
                </div>
                <div class="left15">住院号</div>
                <div class="in_con" style="width:80px;">
                  {{patientInfo.INP_NO}}
                </div>
                <div class="left15">姓名</div>
                <div class="in_con" style="width:60px;">
                  {{patientInfo.NAME}}
                </div>
                <div class="left15">年龄</div>
                <div class="in_con" style="width:60px;">
                  {{patientInfo.PAT_AGE}}
                </div>
                <div class="left15">性别</div>
                <div class="in_con" style="width:50px;">
                  {{patientInfo.SEX}}
                </div>
              </div>
              <div class="container">
                <div>所在科室</div>
                <div class="in_con" style="width:130px;">
                  {{patientInfo.DEPT_NAME}}
                </div>
                <div>床号</div>
                <div class="in_con" style="width:50px;">
                  {{patientInfo.BED_NO}}
                </div>
                <div class="left15">付费方式</div>
                <div class="in_con">
                  {{patientInfo.NAME}}
                </div>
              </div>
              <div class="container">
                <div>住址</div>
                <div class="in_con" style="width: 400px;">{{patientInfo.MAILING_ADDRESS}}</div>
                <div class="left15">职业</div>
                <div class="in_con" style="width: 200px;"> </div>
              </div>
              <div class="container">
                <div>身份证号</div>
                <div class="in_con" style="width: 200px;">
                  {{patientInfo.ID_NO}}
                </div>
                <div class="left15">联系电话</div>
                <div class="in_con">
                  {{patientInfo.NEXT_OF_KIN_PHONE}}
                </div>
                <div class="left15">联系人</div>
                <div class="in_con">
                  {{patientInfo.NEXT_OF_KIN}}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="title_back" style="border:1px solid rgb(177,207,243);padding-left: 20px;">手术信息</div>
            <div class="patientContentBox">
              <div class="container">
                <div>主要诊断</div>
                <div class="in_con" style="width: 600px;">{{patientInfo.DIAG_BEFORE_OPERATION}}</div>
              </div>
              <div class="container">
                <div>病情</div>
                <div class="in_con" style="width: 600px;">{{patientInfo.PATIENT_CONDITION}}</div>
              </div>
              <div class="container">
                <div>手术名称</div>
                <div class="in_con" style="width: 450px;max-height:42px;">{{patientInfo.OPERATION_NAME}}</div>
                <div class="left15">急诊择期</div>
                <div class="in_con" style="width:100px;">
                  <span v-if="patientInfo.EMERGENCY_INDICATOR=='1'">急诊</span>
                  <span v-if="patientInfo.EMERGENCY_INDICATOR=='0'">急诊</span>
                </div>
              </div>
              <div class="container">
                <div>手术时间</div>
                <div class="in_con" style="width: 160px;">{{patientInfo.SCHEDULED_DATE_TIME}}</div>
                <div class="left15">台次</div>
                <div class="in_con" style="width: 60px;">
                  {{patientInfo.SEQUENCE}}
                </div>
                <div class="left15">手术间</div>
                <div class="in_con" style="width: 45px;">
                  {{patientInfo.OPERATING_ROOM_NO}}
                </div>
                <div class="left15">隔离</div>
                <div class="in_con" style="width:60px;">{{patientInfo.ISOLATION_INDICATOR}}</div>
                <div class="left15">手术等级</div>
                <div class="in_con" style="width:60px;">
                  {{patientInfo.OPERATION_SCALE}}
                </div>
              </div>
              <div class="container">
                <div>麻醉方法</div>
                <div class="in_con" style="width: 300px;">
                  {{patientInfo.ANESTHESIA_METHOD}}
                </div>
                <div class="left15">切口等级</div>
                <div class="in_con" style="width: 90px;">{{patientInfo.QIEKOU_CLASS}}</div>
                <div class="left15">切口个数</div>
                <div class="in_con" style="width: 90px;">
                  {{patientInfo.QIEKOU_NUMBER}}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="title_back" style="border:1px solid rgb(177,207,243);padding-left: 20px;">手术人员</div>
            <div class="patientContentBox">
              <div class="container">
                <div>麻醉医师</div>
                <div class="in_con100">{{patientInfo.ANESTHESIA_DOCTOR_NAME}}</div>
                <div class="in_con100">{{patientInfo.ANESTHESIA_ASSISTANT_NAME}}</div>
                <div class="in_con100">{{patientInfo.THIRD_ANESTHESIA_DOCTOR_NAME}}</div>
                <!--  <div class="left30">灌注医师</div>
                                                                                                                  <div class="in_con">
                                                                                                                    {{patientInfo.QIEKOU_NUMBER}}
                                                                                                                  </div> -->
              </div>
              <div class="container">
                <div>手术医师</div>
                <div class="in_con100">{{patientInfo.SURGEON_NAME}}</div>
                <div class="left30">手术助手</div>
                <div class="in_con100">{{patientInfo.FIRST_ASSISTANT_NAME}}</div>
                <div class="in_con100">{{patientInfo.SECOND_ASSISTANT_NAME}}</div>
                <div class="in_con100">{{patientInfo.THIRD_ASSISTANT_NAME}}</div>
                <div class="in_con100">{{patientInfo.FOURTH_ASSISTANT_NAME}}</div>
              </div>
              <div class="container">
                <div>洗手护士</div>
                <div class="in_con100">{{patientInfo.FIRST_OPERATION_NURSE_NAME}}</div>
                <div class="in_con100">{{patientInfo.SECOND_OPERATION_NURSE_NAME}}</div>
                <div class="left30">巡回护士</div>
                <div class="in_con100">{{patientInfo.FIRST_SUPPLY_NURSE_NAME}}</div>
                <div class="in_con100">{{patientInfo.SECOND_SUPPLY_NURSE_NAME}}</div>
                <div class="in_con100">{{patientInfo.THIRD_SUPPLY_NURSE_NAME}}</div>
              </div>
            </div>
          </div>
        </div>
        <!--单子信息-->
        <div class="information" v-if="formDetail" :class="{allWidth:widthData}">
          <div>
            <div class="designArea" ref="normal" :style="{height: areaheight+'px'}">
              <div v-if="item.type == 'div'&&(item.width/2) <= 450" class="item" style="position:absolute;min-height: 3px;min-width:3px;" :class="{choosed:item.chosen}" v-for="item in formItems" :style="{left:('450' - (item.width/2))+'px'}">
                <form-element ref="formElement" :value="item" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="lockedPatientInfo"></form-element>
              </div>
              <div v-if="item.type == 'div'&&(item.width/2) >= 451" class="item" style="position:absolute;min-height: 3px;min-width:3px;left:0;" :class="{choosed:item.chosen}" v-for="item in formItems">
                <form-element ref="formElement" :value="item" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="lockedPatientInfo"></form-element>
              </div>
              <div v-if="item.type !== 'div'" class="item" style="position:absolute;min-height: 3px;min-width:3px;" :class="{choosed:item.chosen}" v-for="item in formItems" :style="{left:item.x+'px',top:item.y+'px'}">
                <form-element ref="formElement" :value="item" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="lockedPatientInfo"></form-element>
              </div>
            </div>
          </div>
          <div ref="mybox" id="mybox" style="display: none; ">
            <div class="designArea" style="font-size: 9pt;font-family: STSong;">
              <div v-if="item.type == 'div'&&(item.width/2) <= 450" class="item" style="position:absolute;min-height: 3px;min-width:3px;" :class="{choosed:item.chosen}" v-for="item in formItems" :style="{left:('450*0.75' - (item.width/2)*0.75)+'pt'}">
                <form-element-print :value="item" :isPrint="isPrint" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="lockedPatientInfo"></form-element-print>
              </div>
              <div v-if="item.type == 'div'&&(item.width/2) >= 451" class="item" style="position:absolute;min-height: 3px;min-width:3px;left:0;" :class="{choosed:item.chosen}" v-for="item in formItems">
                <form-element-print :value="item" :isPrint="isPrint" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="lockedPatientInfo"></form-element-print>
              </div>
              <div v-if="item.type !== 'div'" class="item" style="position:absolute;min-height: 3px;min-width:3px;" :class="{choosed:item.chosen}" v-for="item in formItems" :style="{left:item.x*0.75+'pt',top:item.y*0.75+'pt'}">
                <form-element-print :value="item" :isPrint="isPrint" :isPage="atherInput" v-on:toTopEvent="getValue" :objectItem="lockedPatientInfo"></form-element-print>
              </div>
            </div>
          </div>
          <div v-if="formDetail" style="position: absolute;bottom:30px;right: 20px;">
            <button v-if="pageButtonView" @click="toChangePage(0)">首页</button>
            <button v-if="pageButtonView" @click="toChangePage(-1)">上一页</button>
            <button v-if="pageButtonView" @click="toChangePage(1)">下一页</button>
            <button v-if="tempButtonView" @click="applyTemplateFun">应用模板</button>
            <button v-if="tempButtonView" @click="openSaveTemView">保存模板</button>
            <button @click="submitSaveForm">保存</button>
            <button @click="printPdf">打印</button>
            <button @click="formSetting">配置</button>
            <button @click="refreshForm">刷新</button>
          </div>
        </div>
        <!-- 显示个性化体征设置 -->
        <div v-if="personStyleView" style="position: absolute;top: 15%;left:30%;">
          <personStyle></personStyle>
        </div>
      </div>
    </div>
    <monitor v-if="monitorDataShow.noneData" :dataOfNoneClick="firstRoom" :parentToChild="monitorDataShow"></monitor>
    <patientOperationInfo v-if="patientOperationInfoView.dataInParent" :info="patientInfo" :parentToChild="patientOperationInfoView" v-on:submitSave="submitPatientInfo" v-on:turnToSetting="toSetting"></patientOperationInfo>
    <operationRegister @refreshTime="timeChangeBus()" v-if="operationRegisterView.dataInParent" :objectItem="lockedPatientInfo" :parentToChild="operationRegisterView"></operationRegister>
    <aboutUs v-if="aboutUsData.dataInParent" :parentToChild="aboutUsData"></aboutUs>
    <div v-if="dictView" class="dictionaries">
      <div class="window_load">
        <div class="load_top">
          <div>字典</div>
          <div @click="dictNone" class="top_active">X</div>
        </div>
        <div style="height: 50px;line-height: 50px;font-weight: bold;border-bottom: 2px solid rgb(177,207,243);">
          <span style="margin-left: 30px;">字典维护</span>
        </div>
        <div style="display: flex;padding-left:10px;padding-top: 5px;">
          <div class="tab_div" :class="{backWight:isBackOne}" @click="getComType">
            <span>常用术语</span>
          </div>
          <div class="tab_div" :class="{backWight:isBackTwo}" @click="getEvent">
            <span>麻醉事件</span>
          </div>
          <div class="tab_div" :class="{backWight:isBackThree}" @click="getMethods">
            <span>麻醉方法</span>
          </div>
          <div class="tab_div" :class="{backWight:isBackFour}" @click="getConstant">
            <span>麻醉常用量</span>
          </div>
        </div>
        <!-- 字典按钮内容 -->
        <div v-if="commoTerms" style="height:310px;">
          <div style="display: flex;height: 100%;background:white;margin:10px;">
            <!-- 显示类别 -->
            <div class="dictionaryBox">
              <ul v-for="item in comTypeList">
                <li class="hoverStyle" style="cursor:pointer;" @click="getTypeDetail(item)">
                  <div style="margin-left: 20px;">{{item.typeName}}</div>
                </li>
              </ul>
            </div>
            <!-- 显示详细内容 -->
            <div style="width: 70%;margin-top:5px;">
              <div style="display: flex;margin-left: 10px;box-sizing:border-box;padding-right:18px;">
                <div class="topList" v-for="cell in contentConfig">{{cell.text}}</div>
              </div>
              <div style="overflow-y: auto;height:280px;box-sizing:border-box;" :class="{paddingRight18:this.paddingRight18}">
                <div v-for="list in commonTypeList" style="display: flex;margin-left: 10px;" @click="getItem(list)">
                  <div v-for="cl in contentConfig" style="width: 160px;border:1px solid rgb(177, 207, 243);">
                    <div style="height:calc(100% - 2px);" v-if="cl.status=='inable'">
                      <input v-if="list.writeAble" type="text" v-model="list[cl.value]" @blur="inputBlur(list)" @change="change" style="display:block;width:100%;border:0;height:100%;outline:none;">
                      <input v-if="!list.writeAble" type="text" v-model="list[cl.value]" readonly="readonly" @click="valueWriteAble(list)" style="display:block;width:100%;border:0;height:100%;outline:none;">
                    </div>
                    <div v-if="cl.status!='inable'">
                      {{list[cl.value]}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align: right;margin-right: 30px;">
            <button style="width: 80px;height: 25px;font-size:12px;" @click="addMedAnesthesiaInputDict" :disabled="isAdd">新增</button>
            <button style="width: 80px;height: 25px;font-size:12px;" :disabled="isSave" @click="saveValue">保存</button>
            <button style="width: 80px;height: 25px;font-size:12px;" @click="cancleEdit" :disabled="isCancle">取消</button>
            <button style="width: 80px;height: 25px;font-size:12px;" :disabled="isDelete" @click="deleteByMedAnesthesiaInputDict">删除</button>
          </div>
        </div>
        <anaesthesiaEvent v-if="anaesthesiaEvent" :eventChildData="eventDataType"></anaesthesiaEvent>
        <anestheticMethod v-if="anestheticMethod"></anestheticMethod>
        <anestheticConstant v-if="anestheticConstant"></anestheticConstant>
      </div>
    </div>
    <div>
      <!-- 急诊登记 -->
      <jzRegisterContent v-if="jzPatientView" v-on:closeJzViewChild="closeJzView"></jzRegisterContent>
    </div>
    <cancel v-if="cancelData.dataInParent" :dataInParent="cancelData"></cancel>
  </div>
  <div v-else style="height: 100%;width: 100%;z-index: 99;position:relative;">
    <div class="load_top">
      <div>表单设计器</div>
      <div @click="formSetting" class="top_active">X</div>
    </div>
    <formDesigner :dataInfo="selectFormItemTemp"></formDesigner>
  </div>
</template>
<script>
import formDesigner from '@/components/formDesigner/formDesigner.vue';
import personStyle from '@/components/drawTable/personStyle.vue';
import formElement from '@/components/formElement/formElement.vue';
import formElementPrint from '@/components/formElement/formElementPrint.vue';
import patientOperationInfo from '@/components/patientOperationInfo/patientOperationInfo.vue';
import operationRegister from '@/components/operationRegister/operationRegister.vue';
import aboutUs from '@/components/aboutUs/aboutUs.vue';
import anaesthesiaEvent from '@/components/dictionaryComponents/anaesthesiaEvent.vue';
import anestheticMethod from '@/components/dictionaryComponents/anestheticMethod.vue';
import anestheticConstant from '@/components/dictionaryComponents/anestheticConstant.vue';
import jzRegisterContent from '@/components/jzRegisterContent/jzRegisterContent.vue';
import monitor from '@/components/monitor/monitor.vue';
import cancel from '@/components/cancel/cancel.vue';
import { getLodop } from '@/assets/js/LodopFuncs';
import Bus from '@/bus.js';
// import vueDateCalendar from 'vue-date-calendar';
import myDatepicker from '@/components/plugins/vue-datepicker.vue';
let LODOP
export default {
  data() {
    return {
      printed: false,
      isPrint: false,
      doShowDataOne: false,
      doShowDataTwo: false,
      doShowDataThree: false,
      doShowDataFour: false,
      doShowDataFive: false,
      doShowDataSix: false,
      patientList: [],
      widthData: false,
      pageShowData: false,
      pages: '',
      sortData: '',
      size: 6,
      pageNum: 1,
      dataInSelect: false,
      pageLength: '',
      dataTypeInAllSelect: [],
      formItems: [],
      bindClassData: '',
      newDataIndex: '',
      viewInfo: false,
      patientInfo: {},
      nowTime: "",
      dateTime: "",
      count: "",
      getTime: "",
      operStatus: "",
      patientId: "",
      patientName: "",
      comTypeList: [],
      eventDataType: [],
      itemClass: "",
      obj: "",
      tempTypeItem: "",
      itemName: "",
      isAdd: true,
      isCancle: true,
      tempSerNo: "",
      isSave: true,
      isDelete: true,
      medBillList: [],
      lockedPatientInfo: "",
      formDetail: false,
      inRoomDateTime: "",
      cancelData: { dataInParent: false },
      anesStartTime: "",
      startDateTime: "",
      endDateTime: "",
      anesEndTime: "",
      outDateTime: "",
      transData: false,
      showData: true,
      showDataTwo: true,
      nextDATA: '',
      patientOperationInfoView: { dataInParent: false },
      operationRegisterView: { dataInParent: false },
      // aboutUsData: { dataInParent: false },
      aboutUsData: { dataInParent: false },
      commoTerms: true,
      anaesthesiaEvent: false,
      anestheticMethod: false,
      anestheticConstant: false,
      paddingRight18: false,
      contentConfig: [{
          text: "序号",
          value: "serialNo"
        },
        {
          text: "分类",
          value: "itemClass"
        },
        {
          text: "名称",
          value: "newItemName",
          status: "inable"
        },
        {
          text: "编码",
          value: "newItemCode",
          status: "inable"
        },
      ],
      commonTypeList: [],
      dictView: false,
      res: '',
      logo: {
        backgroundImage: "url(" + require("../../assets/Logo.jpg") + ")",
        backgroundRepeat: "no-repeat",
        height: "70px",
        backgroundSize: "cover",
      },
      logo1: {
        backgroundImage: "url(" + require("../../assets/clock.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "5px 3px",
        height: "30px",
      },
      concealmentOneData: true,
      concealmentTweData: true,
      concealmentThreeData: true,
      concealmentFourData: true,
      isTransformOne: false,
      isTransformTwe: false,
      isTransformThree: false,
      isTransformFour: false,
      isBackOne: false,
      isBackTwo: false,
      isBackThree: false,
      isBackFour: false,
      updateFormsData: [],
      settingView: false,
      selectFormItemTemp: '', //获取选中的单子
      atherInput: { isPage: false },
      monitorDataShow: { noneData: false },
      pageButtonView: false, //翻页按钮
      firstRoom: { noneData: false },
      personStyleView: false, //是否显示个性化体征
      currentPageNum: 1,
      timeTestVal: '',
      tempButtonView: false,
      jzPatientView: false, //急诊登记视图
      areaheight: 300,
      setTimeId: '',
      // for Vue 2.0
      startTime: {
        time: this.getTime
      },
      startTime1: {
        time: ''
      },
      endtime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['一', '二', '三', '四', '五', '六', '日'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY/MM/DD',
        placeholder: '',
        inputStyle: {
          'display': 'inline-block',
          'line-height': '20px',
          'font-size': '12px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F',
          'width': '100px'
        },
        color: {
          // header: '#ccc',
          // headerText: '#f00'
        },
        buttons: {
          // ok: '确定',
          cancel: '取消'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: "YYYY-MM-DD HH:mm"
      },
      limit: [
        // {
        //     type: 'weekday',
        //     available: [1, 2, 3, 4, 5, 6, 7, ]
        //   },
        {
          type: 'fromto',
          from: '2016-02-01',
          to: '2020-02-20'
        }
      ]


    }
  },
  methods: {
    printPdf() {
      this.printed = true;
      this.$set(this.config, 'isPrintedView', true);
      this.isPrint = true;
      Bus.$emit('print', "print");
      //LODOP.PRINT();
      const _this = this;
      this.CreateOneFormPage();
      if (LODOP.CVERSION) CLODOP.On_Return = function(TaskID, Value) {
        //不在打印预览界面
        if (Value == 0) {
          _this.$set(_this.config, 'isPrintedView', false);
          Bus.$emit('noprint', "print");
          _this.isPrint = false;
          _this.toChangePage(0);
        }

      };
    },
    CreateOneFormPage() {
      LODOP = getLodop();
      LODOP.SET_PRINT_PAGESIZE(0, "176mm", "250mm", "B5")
      this.currentPageNum = 1;
      this.printPage(this.currentPageNum)
    },
    printPage(index) {
      if (this.selectFormItemTemp.formName == '手术清点单') {

        setTimeout(() => {
          LODOP.ADD_PRINT_IMAGE(1, 1, "100%", "BottomMargin:1mm", this.$refs.normal.innerHTML);
          LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);
          LODOP.PREVIEW();
        }, 1000)
      } else {
        setTimeout(() => {
          LODOP.ADD_PRINT_IMAGE(1, 1, "100%", "BottomMargin:1mm", this.$refs.mybox.innerHTML);
          LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);
          LODOP.NewPageA();
          if (index + 1 <= this.config.pageTotal) {
            this.toChangePage(1);
            this.currentPageNum++;
            this.printPage(this.currentPageNum);
          } else {
            LODOP.PREVIEW();
          }
        }, 1000)
      }


    },
    inputBlur(list) {
      list.writeAble = false;
    },
    valueWriteAble(list) {
      list.writeAble = true;
    },
    searchPatientList() {
      // this.getTime = this.startTime1.time;
      if (this.getTime == "" && this.operStatus == "" && this.patientName == "" && this.patientId == "") {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString();
        var day = (now.getDate()).toString();
        if (month.length == 1) {
          month = "0" + month;
        }
        if (day.length == 1) {
          day = "0" + day;
        }
        this.getTime = year + "-" + month + "-" + day;
      }
      let params = {
        count: this.size,
        page: this.pageNum,
        dateTime: this.getTime,
        operStatus: this.operStatus,
        patientName: this.patientName,
        patientId: this.patientId
      }
      this.api.getMedOperationMasterList(params)
        .then(
          res => {
            for (var p = 0; p < res.list.length; p++) {
              this.$set(res.list[p], 'thisClickBack', false);
            }
            if (res.total > 5) {
              this.pageShowData = true;
              this.pages = res.pages;
              this.patientList = res.list;
              this.pageLength = res.total;
              this.sortData = '';
              this.dataTypeInAllSelect = [];
              for (var i = 1; i <= this.pages; i++) {
                this.dataTypeInAllSelect.push({
                  number: i
                })
              }
              let paramsTwo = {
                count: this.size,
                page: this.pageNum,
                dateTime: this.getTime,
                operStatus: this.operStatus,
                patientName: this.patientName,
                patientId: this.patientId
              }
              this.api.getMedOperationMasterList(paramsTwo)
                .then(
                  res => {
                    for (var p = 0; p < res.list.length; p++) {
                      this.$set(res.list[p], 'thisClickBack', false);
                    }
                    this.pageShowData = true;
                    this.pages = res.pages;
                    this.patientList = res.list;
                    this.pageLength = res.total;
                    this.sortData = '';
                    this.dataTypeInAllSelect = [];
                    for (var i = 1; i <= this.pages; i++) {
                      this.dataTypeInAllSelect.push({
                        number: i
                      })
                    }
                  });
            } else {
              this.patientList = res.list;
              this.pageShowData = false;
              this.size = 6;
              this.pageNum = 1;
              this.sortData = '';
            }
          });
    },
    sort0() {
      this.sortData = 0;
      let params = {
        count: this.size,
        page: this.pageNum,
        orderFlag: this.sortData,
        dateTime: this.getTime,
        operStatus: this.operStatus,
        patientName: this.patientName,
        patientId: this.patientId
      }
      this.api.getMedOperationMasterList(params)
        .then(
          res => {
            for (var p = 0; p < res.list.length; p++) {
              this.$set(res.list[p], 'thisClickBack', false);
            }
            this.patientList = res.list;
          });
    },
    sort1() {
      this.sortData = 1;
      let params = {
        count: this.size,
        page: this.pageNum,
        orderFlag: this.sortData,
        dateTime: this.getTime,
        operStatus: this.operStatus,
        patientName: this.patientName,
        patientId: this.patientId
      }
      this.api.getMedOperationMasterList(params)
        .then(
          res => {
            for (var p = 0; p < res.list.length; p++) {
              this.$set(res.list[p], 'thisClickBack', false);
            }
            this.patientList = res.list;
          });
    },
    searchPatientListScreen() {
      if (this.getTime == "" && this.operStatus == "" && this.patientName == "" && this.patientId == "") {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString();
        var day = (now.getDate()).toString();
        if (month.length == 1) {
          month = "0" + month;
        }
        if (day.length == 1) {
          day = "0" + day;
        }
        this.getTime = year + "-" + month + "-" + day;
      }
      let params = {
        count: this.size,
        page: this.pageNum,
        orderFlag: this.sortData,
        dateTime: this.getTime,
        operStatus: this.operStatus,
        patientName: this.patientName,
        patientId: this.patientId
      }
      this.api.getMedOperationMasterList(params)
        .then(
          res => {
            for (var p = 0; p < res.list.length; p++) {
              this.$set(res.list[p], 'thisClickBack', false);
            }
            this.patientList = res.list;
          });
    },
    showSelect() {
      this.dataInSelect = !this.dataInSelect;
    },
    noClick() {},
    // 选择麻醉列表显示数量
    dataInSize(value) {
      this.pageNum = 1;
      this.size = value.srcElement._value;
      this.pages = Math.ceil(this.pageLength / this.size)
      this.dataTypeInAllSelect = [];
      for (var i = 1; i <= this.pages; i++) {
        this.dataTypeInAllSelect.push({
          number: i
        })
      }
      this.searchPatientListScreen();
    },
    // 第一页
    firstPage() {
      this.pageNum = 1;
      this.searchPatientListScreen();
    },
    // 当前页减一
    pageRe() {
      if (this.pageNum == 1) {} else {
        this.pageNum = this.pageNum - 1;
        this.searchPatientListScreen();
      }
    },
    // 当前页加一
    pageAd() {
      if (this.pages == this.pageNum) {} else {
        this.pageNum = this.pageNum + 1;
        this.searchPatientListScreen();
      }
    },
    // 最后一页
    lastPage() {
      this.pageNum = this.pages;
      this.searchPatientListScreen();
    },
    // 选择下拉框其中一页
    pageChoose(pageC) {
      this.pageNum = pageC;
      this.searchPatientListScreen();
      this.dataInSelect = false;
    },
    patientDeatilInfo(item) {
      for (var p = 0; p < this.patientList.length; p++) {
        this.patientList[p].thisClickBack = false;
      }
      item.thisClickBack = true;
      for (var i = 0; i <= this.medBillList.length - 1; i++) {
        this.$set(this.medBillList[i], 'bindClassData', this.bindClassData);
      }
      this.formDetail = false;
      let params = {
        patientId: item.patientId,
        operId: item.operId,
        visitId: item.visitId
      }
      this.api.getPatienDetailInfo(params)
        .then(
          res => {
            this.patientInfo = res;
          });
      this.viewInfo = true;
    },
    setIntervaled() {
      var _this = this;
      var t = '';
      setInterval(function() {
        var dateObj = new Date(); //表示当前系统时间的Date对象
        var year = dateObj.getFullYear(); //当前系统时间的完整年份值
        var month = dateObj.getMonth() + 1; //当前系统时间的月份值
        var date = dateObj.getDate(); //当前系统时间的月份中的日
        var day = dateObj.getDay(); //当前系统时间中的星期值 
        var hour = dateObj.getHours(); //当前系统时间的小时值
        var minute = dateObj.getMinutes(); //当前系统时间的分钟值
        var second = dateObj.getSeconds(); //当前系统时间的秒钟值
        //如果月、日、小时、分、秒的值小于10，在前面补0
        if (month < 10) {
          month = "0" + month;
        }
        if (date < 10) {
          date = "0" + date;
        }
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        if (second < 10) {
          second = "0" + second;
        }
        var time = new Date();
        // 程序计时的月从0开始取值后+1
        var m = time.getMonth() + 1;
        t = year + "-" + month + "-" +
          date + " " + time.getHours() + ":" +
          minute + ":" + second;
        _this.nowTime = t;
      }, 1000);
    },
    lockedPatient(item) {
      this.lockedPatientInfo = item;
      //当前病人信息存储起来
      this.config.userInfo = item;
      this.inDateTime = this.changeDateFormat(item.inDateTime);
      this.anesStartTime = this.changeDateFormat(item.anesStartTime);
      this.startDateTime = this.changeDateFormat(item.startDateTime);
      this.endDateTime = this.changeDateFormat(item.endDateTime);
      this.anesEndTime = this.changeDateFormat(item.anesEndTime);
      this.outDateTime = this.changeDateFormat(item.outDateTime);
      this.initComponementConfig();

    },
    // 撤销手术室操作并修改病人状态
    finalStatus(sta) {
      let params;
      if (sta == 0) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
          inDateTime: '',
        }
      } else if (sta == 5) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
          anesStartTime: '',
        }
      } else if (sta == 10) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
          startDateTime: '',
        }
      } else if (sta == 15) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
          endDateTime: '',
        }
      } else if (sta == 25) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
          anesEndTime: '',
        }
      } else if (sta == 30) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
          outDateTime: '',
        }
      } else if (sta == 45) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
        }
      } else if (sta == 60) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
        }
      } else if (sta == 65) {
        params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          operStatus: sta,
        }
      }

      this.nextDATA = params;
      // console.log(params)
      this.api.changeBeforeStatus(params)
        .then(
          res => {
            if (res.success == true) {
              this.api.selectMedOperationMaster({
                patientId: this.lockedPatientInfo.patientId,
                visitId: this.lockedPatientInfo.visitId,
                operId: this.lockedPatientInfo.operId,
              }).then(
                afs => {
                  // console.log(afs)
                  this.lockedPatientInfo = afs;
                  //当前病人信息存储起来
                  this.config.userInfo = afs;
                  this.inDateTime = this.changeDateFormat(afs.inDateTime);
                  this.anesStartTime = this.changeDateFormat(afs.anesStartTime);
                  this.startDateTime = this.changeDateFormat(afs.startDateTime);
                  this.endDateTime = this.changeDateFormat(afs.endDateTime);
                  this.anesEndTime = this.changeDateFormat(afs.anesEndTime);
                  this.outDateTime = this.changeDateFormat(afs.outDateTime);
                  this.searchPatientListScreen();
                }
              )
              this.doShowData = false;
            } else {
              alert(res.msg)
            }

          });

    },
    allNone() {
      this.doShowDataOne = false;
      this.doShowDataTwo = false;
      this.doShowDataThree = false;
      this.doShowDataFour = false;
      this.doShowDataFive = false;
      this.doShowDataSix = false;
    },
    showDoubleListOne(status) {
      if (status == 5) {
        this.doShowDataOne = true;
      }
    },
    showDoubleListTwo(status) {
      if (status == 10) {
        this.doShowDataTwo = true;
      }
    },
    showDoubleListThree(status) {
      if (status == 15) {
        this.doShowDataThree = true;
      }
    },
    showDoubleListFour(status) {
      if (status == 25) {
        this.doShowDataFour = true;
      }
    },
    showDoubleListFive(status) {
      if (status == 30) {
        this.doShowDataFive = true;
      }
    },
    showDoubleListSix(status) {
      if (status == 35) {
        this.doShowDataSix = true;
      }
    },
    getComType() {
      this.isBackOne = true;
      this.isBackTwo = false;
      this.isBackThree = false;

      this.isBackFour = false;
      this.commoTerms = true;
      this.anaesthesiaEvent = false;
      this.anestheticMethod = false;
      this.anestheticConstant = false;
      let params = {}
      this.api.getMedAnesthesiaCommType(params)
        .then(
          res => {
            this.comTypeList = res.list;
          });
    },
    getEvent() {
      this.isBackOne = false;
      this.isBackTwo = true;
      this.isBackThree = false;
      this.isBackFour = false;
      this.commoTerms = false;
      this.anaesthesiaEvent = true;
      this.anestheticMethod = false;
      this.anestheticConstant = false;
      let params = {}
      this.api.allMedAnesthesiaEventType(params)
        .then(
          res => {
            this.eventDataType = res.list;
          });
    },
    getMethods() {
      this.isBackOne = false;
      this.isBackTwo = false;
      this.isBackThree = true;
      this.isBackFour = false;
      this.commoTerms = false;
      this.anaesthesiaEvent = false;
      this.anestheticMethod = true;
      this.anestheticConstant = false;
    },
    getConstant() {
      this.isBackOne = false;
      this.isBackTwo = false;
      this.isBackThree = false;
      this.isBackFour = true;
      this.commoTerms = false;
      this.anaesthesiaEvent = false;
      this.anestheticMethod = false;
      this.anestheticConstant = true;
      // let params = {
      // }
      // this.api.allMedAnesthesiaEventType(params)
      //     .then(
      //     res => {
      //         console.log(res.list)
      //         this.eventDataType = res.list;
      //     });
    },
    getTypeDetail(item) {
      this.tempTypeItem = item;
      this.isAdd = false;
      let params = {
        itemClass: item.typeName
      }
      this.api.getMedAnesthesiaCommDictByItemClass(params)
        .then(
          res => {
            var m = res.list.length;
            if (m > 12) {
              this.paddingRight18 = false;
            } else {
              this.paddingRight18 = true;
            }
            for (var i = 0; i < m; i++) {
              res.list[i].newItemName = res.list[i].itemName;
              res.list[i].newItemCode = res.list[i].itemCode;

            }
            this.commonTypeList = res.list;
          });
    },
    dictShow() {
      this.dictView = true;
    },
    dictNone() {
      this.dictView = false;
    },
    getItem(item) {
      this.obj = item;
      this.isDelete = false;
    },
    deleteByMedAnesthesiaInputDict() {
      let params = {
        itemClass: this.obj.itemClass,
        itemName: this.obj.itemName
      }
      this.api.deleteByMedAnesthesiaInputDict(params)
        .then(
          res => {
            this.getTypeDetail(this.tempTypeItem);
          });
    },
    addMedAnesthesiaInputDict() {
      this.commonTypeList.push({ serialNo: this.commonTypeList.length, itemClass: this.tempTypeItem.typeName, newItemName: "", newItemCode: "", itemName: "", itemCode: "" });
      this.isAdd = this.isCancle;
      this.isCancle = !this.isAdd;
    },
    cancleEdit() {
      this.getTypeDetail(this.tempTypeItem);
      this.isCancle = this.isAdd;
      this.isAdd = !this.isCancle;
      this.isSave = true;
    },
    change() {
      this.isSave = false;
    },
    saveValue() {
      var li = this.commonTypeList;
      var k = li.length;
      let params = [];
      for (var i = 0; i < k; i++) {
        if ((li[i].newItemName != li[i].itemName || li[i].newItemCode != li[i].itemCode) && li[i].itemName != "") {
          params.push({
            itemClass: li[i].itemClass,
            oldItemName: li[i].itemName,
            itemName: li[i].newItemName,
            itemCode: li[i].newItemCode,
          });
        }
        if (li[i].itemName == "" && li[i].itemCode == "") {
          let params1 = {
            itemClass: li[i].itemClass,
            oldItemName: li[i].itemName,
            itemName: li[i].newItemName,
            itemCode: li[i].newItemCode,
            serialNo: this.commonTypeList.length - 1
          }
          this.api.insertMedAnesthesiaInputDict(params1)
            .then(
              res => {
                this.getTypeDetail(this.tempTypeItem);
              });
        }
      }
      if (params.length > 0) {
        this.api.updateMedAnesthesiaInputDict(params)
          .then(
            res => {
              this.getTypeDetail(this.tempTypeItem);
            });
      }
      this.isCancle = true;
      this.isAdd = false;
      this.isSave = true;
    },
    selectMedFormList() {
      let params = {}
      this.api.selectMedFormList(params)
        .then(
          res => {
            this.medBillList = res.list;
            this.bindClassData = false;
            for (var i = 0; i <= res.list.length - 1; i++) {
              this.$set(this.medBillList[i], 'bindClassData', this.bindClassData);
            }

          });
    },
    selectMedFormTemp(item) {
      let timeParam = {
        "patientId": this.lockedPatientInfo.patientId,
        "visitId": this.lockedPatientInfo.visitId,
        "operId": this.lockedPatientInfo.operId,
      }
      for (var i = 0; i <= this.medBillList.length - 1; i++) {
        this.$set(this.medBillList[i], 'bindClassData', this.bindClassData);
      }
      this.newDataIndex = !item.bindClassData;
      this.$set(item, 'bindClassData', this.newDataIndex);
      this.formDetail = true;
      this.viewInfo = false;
      item.isPage = false;
      this.selectFormItemTemp = item;

      if (item.formName == '麻醉记录单') {
        this.getMaxTime();

        let inDateTime = this.config.userInfo.inDateTime
        this.tempButtonView = false;
        //查找病人的最晚时间
        this.api.selectMaxTime(timeParam)
          .then(res => {
            let t1 = 0
            let i = 0
            //获取病人在手术室里面最早时间
            this.api.getBeginTime(timeParam)
              .then(rest => {
                if (rest.TIME) {
                  //如果存在病人的入手术时间
                  if (inDateTime) {
                    if (new Date(rest.TIME) > new Date(inDateTime)) {
                      this.config.startMinTime = inDateTime
                    } else {
                      this.config.startMinTime = rest.TIME
                    }
                  } else {
                    this.config.startMinTime = rest.TIME
                  }
                } else {
                  if (inDateTime) {
                    this.config.startMinTime = inDateTime
                  } else {
                    this.config.startMinTime = new Date().Format("yyyy-MM-dd") + " 08:00:00";
                  }
                }
                if (res.TIME) {
                  this.config.patientMaxTime = res.TIME;
                  t1 = this.coutTimes(this.config.startMinTime, res.TIME, 'minute');
                  i = Math.ceil(t1 / 250);
                  this.config.pageTotal = i;
                  if (t1 > 250) {
                    this.pageButtonView = true
                  } else {
                    this.pageButtonView = false
                  }
                }
                var timeDate = new Date(this.config.startMinTime);
                this.config.initTime = new Date(this.config.startMinTime);
                this.config.initTime = new Date(this.timeSetOper(this.config.initTime));
                // let time = this.config.initTime
                // let getMinute = time.getMinutes()
                // debugger
                // if (getMinute < 5) {
                //   time = time.setMinutes(0)
                // } else if (getMinute > 4 && getMinute < 10) {
                //   time = time.setMinutes(5)
                // } else {
                //   let i1 = getMinute.toString().substring(0, 1)
                //   let i2 = getMinute.toString().substring(1, 2)
                //   if (i2 < 5) {
                //     time = time.setMinutes(Number(i1 + '0'))
                //   } else {
                //     time = time.setMinutes(Number(i1 + '5'))
                //   }
                // }
                // this.config.initTime = new Date(time)
                this.config.maxTime = new Date(timeDate.getTime() + 1000 * 60 * 5 * 50);
              })
            let params = {
              formName: item.formName,
              id: item.id
            }
            let arry = [];
            // this.formItems = [];
            this.api.selectMedFormTemp(params)
              .then(
                res => {
                  if (res.formContent == "null" || res.formContent == null) {
                    return;
                  }
                  let tempItems = JSON.parse(res.formContent);
                  this.formItems = JSON.parse(res.formContent);
                  var list = this.formItems;
                  for (var i = 0; i < list.length; i++) {
                    if (list[i].fieldName) {
                      arry.push({
                        "patientId": this.lockedPatientInfo.patientId,
                        "visitId": this.lockedPatientInfo.visitId,
                        "operId": this.lockedPatientInfo.operId,
                        "tableName": list[i].tableName,
                        "coluName": list[i].fieldName,
                        "dictShowFiled": list[i].dictShowFiled, //字典显示字段名称
                        "dictTableName": list[i].dictTableName, //字典表名称
                        "dictField": list[i].dictField, //字典字段名称
                        "dictSelect": list[i].dictSelect,
                      })
                    }
                  }
                  this.api.getFormSqlResult(arry)
                    .then(
                      result => {
                        for (var i = 0; i < list.length; i++) {
                          if (list[i].fieldName) {
                            let obj = this.formItems[i];
                            obj.value = result[list[i].tableName + list[i].fieldName];
                            let tempObj = JSON.parse(JSON.stringify(obj));
                            this.$set(this.formItems, i, tempObj);
                          }
                        }
                      });
                  // this.formItems = tempItems;
                });
            if (this.setTimeId) {
              this.$nextTick(function() {

                Bus.$emit('timeSetChange');
              })
            }
          })
      } else if (item.formName == '手术清点单') {
        let params = {
          formName: item.formName,
          id: item.id
        }
        let arry = [];
        // this.formItems = [];
        this.api.selectMedFormTemp(params)
          .then(
            res => {
              if (res.formContent == "null" || res.formContent == null) {
                return;
              }
              let tempItems = JSON.parse(res.formContent);
              this.formItems = JSON.parse(res.formContent);
            })
        this.tempButtonView = true;
        this.initComponementConfig();
      } else {
        this.tempButtonView = false;
        this.initComponementConfig();
        let params = {
          formName: item.formName,
          id: item.id
        }
        let arry = [];
        // this.formItems = [];
        this.api.selectMedFormTemp(params)
          .then(
            res => {
              if (res.formContent == "null" || res.formContent == null) {
                return;
              }
              let tempItems = JSON.parse(res.formContent);
              this.formItems = JSON.parse(res.formContent);
            })
      }
    },
    //修改病人手术状态
    changeStatus(status, timeType, event) {
      this.nextDATA = '';
      let TrueData = false;
      if (timeType == 'inDateTime') {
        TrueData = true;
      } else if (timeType == 'anesStartTime') {
        if (new Date(this.anesStartTime).getTime() >= new Date(this.inDateTime).getTime()) {
          TrueData = true;
        }
      } else if (timeType == 'startDateTime') {
        if (new Date(this.startDateTime).getTime() >= new Date(this.anesStartTime).getTime()) {
          TrueData = true;
        }
      } else if (timeType == 'endDateTime') {
        if (new Date(this.endDateTime).getTime() >= new Date(this.startDateTime).getTime()) {
          TrueData = true;
        }
      } else if (timeType == 'anesEndTime') {
        if (new Date(this.anesEndTime).getTime() >= new Date(this.endDateTime).getTime()) {
          TrueData = true;
        }
      } else if (timeType == 'outDateTime') {
        if (new Date(this.outDateTime).getTime() >= new Date(this.anesEndTime).getTime()) {
          TrueData = true;
        }
      }
      if (TrueData) {
        let params = {
          patientId: this.lockedPatientInfo.patientId,
          visitId: this.lockedPatientInfo.visitId,
          operId: this.lockedPatientInfo.operId,
          inDateTime: this.datetimeLocalToDate(this.inDateTime),
          anesStartTime: this.datetimeLocalToDate(this.anesStartTime),
          startDateTime: this.datetimeLocalToDate(this.startDateTime),
          endDateTime: this.datetimeLocalToDate(this.endDateTime),
          anesEndTime: this.datetimeLocalToDate(this.anesEndTime),
          outDateTime: this.datetimeLocalToDate(this.outDateTime),
          operStatus: status,
          operatingRoom: this.lockedPatientInfo.operatingRoom,
          operatingRoomNo: this.lockedPatientInfo.operatingRoomNo
        }
        this.nextDATA = params;
        this.api.changeOperationStatus(params)
          .then(
            res => {
              if (res.success == true) {
                if (this.lockedPatientInfo.operStatus === 0 && status == 5) {
                  this.firstRoom.noneData = false;
                  this.monitorDataShow.noneData = true;
                }
                this.searchPatientList();
                this.api.selectMedOperationMaster({
                  patientId: this.lockedPatientInfo.patientId,
                  visitId: this.lockedPatientInfo.visitId,
                  operId: this.lockedPatientInfo.operId,
                }).then(
                  ref => {
                    this.lockedPatientInfo = ref;
                    this.config.userInfo = ref;
                    this.timeChangeBus();
                  }
                )
              } else {
                if (status == 5 && this.anesStartTime == '') {
                  this.inDateTime = '';
                } else if (status == 10 && this.startDateTime == '') {
                  this.anesStartTime = '';
                } else if (status == 15 && this.endDateTime == '') {
                  this.startDateTime = '';
                } else if (status == 25 && this.anesEndTime == '') {
                  this.endDateTime = '';
                } else if (status == 30 && this.outDateTime == '') {
                  this.anesEndTime = '';
                } else if (status == 35) {
                  this.outDateTime = '';
                }
                alert(res.msg)
              }
            });
      } else {
        alert('当前时间不能小于之前时间！')
      }

    },
    //手术信息
    getPatientOperationInfo() {
      this.patientOperationInfoView.dataInParent = !this.patientOperationInfoView.dataInParent;
    },
    //术中登记
    getOperationRegister() {
      this.operationRegisterView.dataInParent = !this.operationRegisterView.dataInParent;
    },
    // 监护仪
    monitor() {
      this.monitorDataShow.noneData = !this.monitorDataShow.noneData;
      this.firstRoom.noneData = true;
    },
    // 取消手术
    cancel() {
      this.cancelData.dataInParent = true;
      // if (confirm("是否要取消该手术?")) {
      //   console.log('还未调用接口')
      //   alert("手术已取消");
      // } else {}

      // var a = prompt("请输入你要取消手术的原因", "");
      // if (a !== "" && a !== null) {
      //   alert("手术已取消！");
      // } else {
      //   // 取消了操作
      // }

    },
    // 关于
    getAboutUs() {
      this.aboutUsData.dataInParent = !this.aboutUsData.dataInParent;
    },
    // 退出系统
    exitSystem() {
      if (confirm("是否要退出系统？")) {
        this.$router.push({
          path: 'login'
        })
      } else {}
    },
    // 左部选项按下拉显示隐藏及图片切换
    concealmentOne() {
      this.concealmentOneData = !this.concealmentOneData;
      this.isTransformOne = !this.isTransformOne;
    },
    concealmentTwe() {
      this.concealmentTweData = !this.concealmentTweData;
      this.isTransformTwe = !this.isTransformTwe;
    },
    concealmentThree() {
      this.concealmentThreeData = !this.concealmentThreeData;
      this.isTransformThree = !this.isTransformThree;
    },
    concealmentFour() {
      this.concealmentFourData = !this.concealmentFourData;
      this.isTransformFour = !this.isTransformFour;
    },
    // 病人列表显示隐藏
    leftNone() {
      this.transData = !this.transData;
      this.showData = !this.showData;
      this.widthData = !this.widthData;
      this.showDataTwo = !this.showDataTwo;
    },
    //获取单子修改的数据
    getValue(dataValue) {
      var modifyValue = '';
      if (dataValue.dictShowFiled != '' && dataValue.dictShowFiled != null) {
        modifyValue = dataValue.modifyFiledValue
      } else {
        modifyValue = dataValue.value;
      }
      var tempData = this.updateFormsData;
      if (modifyValue == null || modifyValue == 'null') {
        return
      }
      if (tempData.length > 0) {
        var count = 0;
        for (var i = 0; i < this.updateFormsData.length; i++) {
          //如果之前传入有相同的表名与字段名则更新值
          if (this.updateFormsData[i].tableName === dataValue.tableName && this.updateFormsData[i].coluName === dataValue.fieldName) {
            this.updateFormsData[i].updateStr = modifyValue;
          } else {
            count++;
          }
        }
        if (count == this.updateFormsData.length) {
          this.updateFormsData.push({
            "tableName": dataValue.tableName,
            "coluName": dataValue.fieldName,
            "updateStr": modifyValue,
            "patientId": this.lockedPatientInfo.patientId,
            "visitId": this.lockedPatientInfo.visitId,
            "operId": this.lockedPatientInfo.operId,
          });
        }
      } else {
        this.updateFormsData.push({
          "tableName": dataValue.tableName,
          "coluName": dataValue.fieldName,
          "updateStr": modifyValue,
          "patientId": this.lockedPatientInfo.patientId,
          "visitId": this.lockedPatientInfo.visitId,
          "operId": this.lockedPatientInfo.operId,
        });
      }
    },
    //提交单子修改
    submitSaveForm() {
      if (this.selectFormItemTemp.formName == '手术清点单') {
        Bus.$emit('saveFun', '保存');
      } else {
        let params = []
        params = this.updateFormsData;
        // return
        if (this.updateFormsData.length > 0) {
          this.api.updateSqlBatch(params)
            .then(res => {
              this.updateFormsData = [];
              if (res.success) {
                alert("保存成功")
              } else {
                alert("保存失败")
              }
              // this.selectMedFormTemp(this.selectFormItemTemp);
            })
        }
      }

    },
    //提交手术信息修改
    submitPatientInfo(arry) {
      if (arry.length > 0) {
        let params = []
        params = arry;
        this.api.updateSqlBatch(params)
          .then(res => {})
      }
    },
    toSetting(item) {
      this.selectFormItemTemp = item;
      this.selectFormItemTemp.isPage = !this.selectFormItemTemp.isPage;
      this.settingView = !this.settingView;
    },
    //配置跳转
    formSetting() {
      this.settingView = !this.settingView;
      this.selectFormItemTemp.isPage = !this.selectFormItemTemp.isPage;
      this.toChangePage(0);
    },
    //单子刷新按钮
    refreshForm() {
      this.selectMedFormTemp(this.selectFormItemTemp);
      // Bus.$emit('timeSetChange');
    },
    //单子首页
    toChangePage(num) {
      if (num == 0) {
        this.config.pagePercentNum = 1;
        this.config.pageOper = num;
        this.setBusInitTime();
      }
      if (num == -1) {
        if (this.config.pagePercentNum > 2) {
          this.config.pagePercentNum = this.config.pagePercentNum - 1;
          this.config.pageOper = num;
          var m = new Date(this.config.initTime).getTime() - 250 * 60 * 1000;
          this.setFormTime(m);
        } else if (this.config.pagePercentNum == 2) {
          this.config.pagePercentNum = 1;
          this.config.pageOper = 0;
          var m = new Date(this.config.initTime).getTime() - 250 * 60 * 1000;
          this.setFormTime(m);
        } else {
          return
        }
        this.$nextTick(function() {
          Bus.$emit('test', num);
        })
      }
      if (num == 1) {
        if (this.config.pagePercentNum < this.config.pageTotal) {
          this.config.pagePercentNum = this.config.pagePercentNum + 1;
          this.config.pageOper = num;
          var m = new Date(this.config.maxTime).getTime();
          this.setFormTime(m);
        } else {

          return
        }
        this.$nextTick(function() {
          Bus.$emit('test', num);
        })
      }



    },
    //初始化表格配置信息
    initComponementConfig() {
      this.updateFormsData = [];
      this.config.pageOper = 0;
      this.config.maxTime = '';
      this.config.initTime = '';
      this.config.startMinTime = '';
      this.config.pagePercentNum = 1;
      this.pageButtonView = false;
      this.formItems = [];
      this.updateFormsData = [];
      if (this.setTimeId) {
        clearTimeout(this.setTimeId);
      }

    },
    //保存模板
    openSaveTemView() {
      Bus.$emit('saveTemp', 'save');
    },
    applyTemplateFun() {
      Bus.$emit('openApplyTemp', 'open');
    },
    openJzView() {
      this.jzPatientView = true;

    },
    closeJzView() {
      this.jzPatientView = false;
      this.searchPatientList();

    },
    //获取高度
    getHeight() {
      this.areaheight = window.innerHeight - 200;
    },
    //设置单子显示最小最大时间
    setFormTime(time) {
      var timeDate = new Date(time);
      this.config.initTime = new Date(time);
      this.config.initTime = new Date(this.timeSetOper(this.config.initTime));
      this.config.maxTime = new Date(timeDate.getTime() + 1000 * 60 * 5 * 50);
    },
    //首页的时候重新设置时间，当DOM更新完之后再通知事件
    setBusInitTime() {
      let inDateTime = this.config.userInfo.inDateTime
      let startMinTime = this.config.startMinTime
      let timeParam = {
        "patientId": this.lockedPatientInfo.patientId,
        "visitId": this.lockedPatientInfo.visitId,
        "operId": this.lockedPatientInfo.operId,
      }
      this.api.getBeginTime(timeParam)
        .then(rest => {
          if (rest.TIME) {
            //如果存在病人的入手术时间
            if (inDateTime) {
              if (new Date(rest.TIME) > new Date(inDateTime)) {
                this.config.startMinTime = inDateTime
              } else {
                this.config.startMinTime = rest.TIME
              }
            } else {
              this.config.startMinTime = rest.TIME
            }
          } else {
            if (inDateTime) {
              this.config.startMinTime = inDateTime
            } else {
              this.config.startMinTime = new Date().Format("yyyy-MM-dd") + " 08:00:00";
            }
          }
          var timeDate = new Date(this.config.startMinTime);
          this.config.initTime = new Date(this.config.startMinTime);
          this.config.initTime = new Date(this.timeSetOper(this.config.initTime));
          this.config.maxTime = new Date(timeDate.getTime() + 1000 * 60 * 5 * 50);
          this.$nextTick(function() {
            Bus.$emit('test');
          })
        })
    },
    //术中登记或者其他时间发生改变时触发
    timeChangeBus() {
      var time = '';
      let inDateTime = this.config.userInfo.inDateTime
      let startMinTime = this.config.startMinTime
      let timeParam = {
        "patientId": this.lockedPatientInfo.patientId,
        "visitId": this.lockedPatientInfo.visitId,
        "operId": this.lockedPatientInfo.operId,
      }
      this.api.getBeginTime(timeParam)
        .then(rest => {
          if (rest.TIME) {
            //如果存在病人的入手术时间
            if (inDateTime) {
              if (new Date(rest.TIME) > new Date(inDateTime)) {
                time = inDateTime
              } else {
                time = rest.TIME
              }
            } else {
              time = rest.TIME
            }
          } else {
            if (inDateTime) {
              time = inDateTime
            } else {
              time = new Date().Format("yyyy-MM-dd") + " 08:00:00";
            }
          }
          if (startMinTime) {
            //判断时间差值
            let time1 = new Date(time).getTime();
            let time2 = new Date(startMinTime).getTime();
            if (time1 < time2) {
              this.config.initTime = new Date(new Date(this.config.initTime).getTime() - (time2 - time1));
              this.config.initTime = new Date(this.timeSetOper(this.config.initTime));
              this.config.startMinTime = new Date(time);
              this.config.maxTime = new Date(new Date(this.config.maxTime).getTime() - (time2 - time1));
            } else {
              this.config.initTime = new Date(new Date(this.config.initTime).getTime() + (time1 - time2));
              this.config.initTime = new Date(this.timeSetOper(this.config.initTime));
              this.config.startMinTime = new Date(time);
              this.config.maxTime = new Date(new Date(this.config.maxTime).getTime() + (time1 - time2));
            }
          }
          this.getMaxTime();
          this.$nextTick(function() {

            Bus.$emit('timeSetChange');
          })
        })
    },
    getMaxTime() {
      if (this.setTimeId) {
        this.getMaxTimeNoset();
      }
      let timeParam = {
        "patientId": this.lockedPatientInfo.patientId,
        "visitId": this.lockedPatientInfo.visitId,
        "operId": this.lockedPatientInfo.operId,
      }
      //查找病人的最晚时间
      this.api.selectMaxTime(timeParam)
        .then(res => {
          if (res.TIME) {

            if (this.config.userInfo.outDateTime) {
              if (new Date(this.config.userInfo.outDateTime) > new Date(res.TIME)) {
                this.config.patientMaxTime = this.config.userInfo.outDateTime;
              } else {
                this.config.patientMaxTime = res.TIME
              }
            } else {
              this.config.patientMaxTime = res.TIME
            }
          }
          this.setTimeId = setTimeout(_ => this.getMaxTime(), 300000)
        })
    },
    getMaxTimeNoset() {
      if (this.setTimeId) {
        clearTimeout(this.setTimeId);
      }
      let timeParam = {
        "patientId": this.lockedPatientInfo.patientId,
        "visitId": this.lockedPatientInfo.visitId,
        "operId": this.lockedPatientInfo.operId,
      }
      //查找病人的最晚时间
      this.api.selectMaxTime(timeParam)
        .then(res => {
          if (res.TIME) {

            if (this.config.userInfo.outDateTime) {
              if (new Date(this.config.userInfo.outDateTime) > new Date(res.TIME)) {
                this.config.patientMaxTime = this.config.userInfo.outDateTime;
              } else {
                this.config.patientMaxTime = res.TIME
              }
            } else {
              this.config.patientMaxTime = res.TIME
            }
          }
        })
    },
    testclick() {
      this.$refs.intest.click();
    },
    //处理格子时间5的倍数
    timeSetOper(time) {
      let returnTime
      let getMinute = time.getMinutes()
      if (getMinute < 5) {
        time = time.setMinutes(0)
      } else if (getMinute > 4 && getMinute < 10) {
        time = time.setMinutes(5)
      } else {
        let i1 = getMinute.toString().substring(0, 1)
        let i2 = getMinute.toString().substring(1, 2)
        if (i2 < 5) {
          time = time.setMinutes(Number(i1 + '0'))
        } else {
          time = time.setMinutes(Number(i1 + '5'))
        }
      }
      returnTime = time;
      return returnTime
    },

  },
  mounted() {
    if (this.setTimeId) {
      clearTimeout(this.setTimeId);
    }
    this.searchPatientList();
    this.setIntervaled();
    this.selectMedFormList();
    this.getHeight();
    // this.$toast("保存成功");
  },
  created() {
    Bus.$on('showPersonStyle', (val) => {
      this.personStyleView = false
    })
  },
  beforeDestroy() {
    Bus.$off('showPersonStyle', (val) => {
      this.personStyleView = false
    });
    clearTimeout(this.setTimeId);
  },
  components: {
    // vueDateCalendar,
    formElement,
    formElementPrint,
    formDesigner,
    patientOperationInfo,
    operationRegister,
    aboutUs,
    anaesthesiaEvent,
    anestheticMethod,
    anestheticConstant,
    monitor,
    cancel,
    personStyle,
    jzRegisterContent,
    myDatepicker,

  },
}

</script>
<style scoped>
.lightBox {
  padding-top: 5px;
  display: flex;
  align-items: center;
  position: relative;
  /* padding-left: 5px; */
  /* box-sizing: border-box; */
}

.inseide {
  position: absolute;
  width: 140px;
  height: auto;
  top: 37px;
  left: 5px;
  padding-left: 20px;
  background-color: #D6E5F3;
  border: 1px solid #77A3DC;
  /* box-sizing: border-box; */
  z-index: 999;
}

.insideHover {
  width: 100%;
  height: 20px;
  color: #222;
  font-size: 12px;
  background-color: #F5F7F9;
  border-left: 1px solid #D9E3ED;
  box-sizing: border-box;
  line-height: 20px;
  padding-left: 5px;
  cursor: pointer;
}

.insideHover:hover {
  background: url('../../assets/hoverBac.jpg');
}

.timePicker {
  width: 155px;
  font-size: 12px;
}

.timePicker::-webkit-inner-spin-button {
  display: none;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  left: 0px;
  top: 0px;
}

.patientList {
  height: 100%;
  width: 383px;
  min-width: 383px;
}

.patientContent {
  height: 26px;
  border-bottom: 1px solid rgb(177, 207, 243);
  line-height: 26px;
  color: rgb(23, 68, 140);
  padding-left: 5px;
}

.procedure {
  flex: 1;
  background: url('../../assets/timeBack.jpg') no-repeat;
  background-size: cover;
}

.logo {
  min-width: 175px;
  /*background: #0080FF;*/
}

.currentPatientInfo {
  box-sizing: border-box;
  padding-left: 5px;
  width: 220px;
  background: url('../../assets/msgBack.jpg') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  border-right: 2px solid #0046A7;
  border-bottom: 2px solid #0046A7;
}

.head {
  height: 100px;
  width: 100%;
  background: #CCC;
  display: flex;
}

.down {
  width: 100%;
  height: calc(100% - 100px);
  background: #B3B3B3;
  display: flex;
}

.left {
  width: 175px;
  height: 100%;
  background: rgb(142, 193, 238);
  min-width: 175px;
}

.content {
  display: flex;
  width: calc(100% - 185px);
  height: 100%;
  background: rgb(227, 239, 255);
  min-width: 1178px;
}

.listBorder {
  border: 1px solid rgb(177, 207, 243);
  padding-bottom: 5px;
  /* padding-left: 5px; */
}

.thisClickBackClass {
  background-color: rgb(192, 255, 192);
}

.leftNoneBox {
  height: 100%;
  min-width: 8px;
  background-color: #8DB8F0;
  position: relative;
  cursor: pointer;
  border-right: 1px solid #7F7F7F;
  border-left: 1px solid #7F7F7F;
}

.leftNoneImg {
  width: 7px;
  height: 82px;
  position: absolute;
  top: calc(50% - 41px);
}

.leftNoneImg img {
  display: block;
  width: 7px;
  height: 7px;
  margin: 10px 0;
}

.trans {
  transform: rotate(180deg);
}

.patientInfo {
  width: calc(100% - 395px);
  box-sizing: border-box;
  padding-left: 5px;
  /* min-width: 898px; */
}

.patientContentBox {
  padding: 15px 5px 10px 30px;
  border: 1px solid rgb(177, 207, 243);
  box-sizing: border-box;
}

.pat_title {
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  border: 1px solid rgb(177, 207, 243);
  font-size: 16px;
}

.title_back {
  color: #15428B;
  background: url('../../assets/contentTitleBack.jpg')no-repeat;
  background-size: cover;
}

.container {
  display: -webkit-box;
  /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
  display: -moz-box;
  /* Firefox 17- */
  display: -webkit-flex;
  /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
  display: -moz-flex;
  /* Firefox 18+ */
  display: -ms-flexbox;
  /* IE 10 */
  display: flex;
  /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
  margin-bottom: 10px;
  font-size: 12px;
}

.in_con {
  width: 150px;
  border: 1px solid rgb(197, 197, 197);
  margin-left: 10px;
}

.left15 {
  margin-left: 15px;
}

.in_con100 {
  width: 100px;
  border: 1px solid rgb(197, 197, 197);
  margin-left: 10px;
}

.left30 {
  margin-left: 30px;
}

.tab_div {
  height: 30px;
  line-height: 30px;
  width: 100px;
  border: 1px solid rgb(177, 207, 243);
  background: rgb(76, 121, 187);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
  color: white;
  margin-left: 1px;
  cursor: pointer;
}

.tab_div:hover span {
  text-shadow: 18px 15px 20px #E3EFFF,
  -15px 15px 20px #E3EFFF;
}

.dictionaryBox {
  box-sizing: border-box;
  height: 100%;
  width: 30%;
  overflow: auto;
  padding-top: 5px;
  border-right: 2px solid rgb(177, 207, 243);
}

.backWight {
  background-color: #E1EEFD;
  color: rgb(76, 121, 187);
}

.information {
  position: relative;
  width: calc(100% - 391px);
  height: 100%;
  box-sizing: border-box;
  padding-left: 5px;
}

.allWidth {
  width: calc(100% - 11px) !important;
}

.designArea {
  position: relative;
  height: 720px;
  width: 100%;
  background: white;
  /*border: 1px solid black;*/
  overflow: auto;
  box-sizing: border-box;
}

.paddingRight18 {
  padding-right: 18px;
}

.hoverStyle:hover {
  background-color: #316AC5;
  color: #fff;
}

.topList {
  width: 160px;
  border: 1px solid rgb(177, 207, 243);
  color: #4C79BB;
  background: url('../../assets/contentTitleBack.jpg')no-repeat;
  background-size: cover;
}

.stretch {
  height: 30px;
  /* background-color: rgb(0, 22, 116); */
  background: url('../../assets/linkButton.jpg') no-repeat;
  background-size: cover;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* line-height: 30px; */
  box-sizing: border-box;
  padding: 0 5px;
}

.active_back {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(0, 0, 0, 0);
  transform: rotate(180deg);
}

.active_back:hover {
  border: 1px solid #659adb;
  background: linear-gradient(#e3ebf5, #cbe5f7, #dbecf9);
  /* background:url("../../assets/ButtonBak.png") no-repeat;
    background-size: cover; */
}

.active_back:active {
  border: 1px solid #659adb;
  background: linear-gradient(#91b4e2, #d7e2f0, #b8cde7, #ebf1f9);
}

.active_back img {
  width: 14px;
  display: block;
  margin: 2px auto 0;
}

.list_button {
  width: 74px;
  margin: 0 0 5px 5px;
  font-size: 12px;
}

.transform {
  transform: rotate(180deg);
}

.listButton {
  cursor: pointer;
  width: 150px;
  border-left: 1px solid black;
  border-right: 1px solid rgba(0, 0, 0, 0);
  height: 100%;
  text-align: center;
  line-height: 30px;
  /* border-top-left-radius: 3px;
    border-top-right-radius: 3px; */
}

.listButton:last-child {
  border-right: 1px solid black;
}

.bindClass {
  background: linear-gradient(#e3ebf5, #b9d5ee, #9fc9ee);
  color: rgb(35, 78, 147);
  /* border-top-left-radius: 3px;
    border-top-right-radius: 3px; */
  border-right: 1px solid rgb(121, 169, 228);
  border-left: 1px solid black;
}

.bindClass:hover {
  background: linear-gradient(#e3ebf5, #cbe5f7, #dbecf9);
}

.printFont {
  font-size: 8pt;
}

.no-printFont {
  font-size: 16px;
}

.pageClass {
  border-top: 1px solid rgb(172, 205, 242);
  height: 75px;
  /* background-color: lightblue; */
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 5px;
  font-size: 14px;
}

.pageInDiv {
  width: 60px;
  height: 24px;
  position: relative;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #B4C7FF;
}

.pageInSelect {
  position: absolute;
  top: -120px;
  height: 120px;
  width: 60px;
  overflow-y: auto;
  border: 1px solid #446EA3;
  background-color: #fff;
  box-sizing: border-box;
}

.pageInSelect div:hover {
  cursor: pointer;
  background-color: #316AC5;
  color: #fff;
}





/*::-webkit-datetime-edit-year-field {
  display: none;
}*/

</style>
