<template>
    <div>
        <div style="width:670px;height:480px;border:1px solid #222;display:flex;margin-left:10px;">
            <div style="width:420px;height:100%;">
                <div style="height:24px;width:100%;background-color:#F0F0F0;">
                    <div style="height:100%;width:53px;padding:0 5px;line-height:24px;font-size:12px;background-color:#fff;">
                        筛选用户
                    </div>
                    <div style="border:1px solid #222;margin-top:10px;height:400px;margin-left:5px;">
                        <div class="userBox" style="background-color: #F2F3F5;cursor:auto;">
                            <div style="padding:0 10px;border-right:1px solid #A2A2A2;">用户登陆名称</div>
                            <div style="padding:0 10px;">用户名称</div>
                        </div>
                        <div style="overflow-y:auto;overflow-x:hidden;height:373px;width:100%;box-sizing:border-box;padding-top:4px;">
                            <div class="userBox" v-for="item in userList" @click="getItem(item)" :class="{chooseOne:item.clickData}">
                                <div style="padding:0 10px;border-right:1px solid #A2A2A2;width:72px;">{{item.loginName}}</div>
                                <div style="padding:0 10px;">{{item.userName}}</div>
                            </div>
                        </div>
                    </div>
                    <div style="display:flex;margin-top:10px;margin-left:5px;">
                        <button class="firstButton" :class="{buttonBackground:disabledAdd}" v-bind:disabled="disabledAdd" @click="addUser()">新增用户</button>
                        <button class="buttonClass" :class="{buttonBackground:disabledChange}" v-bind:disabled="disabledChange" @click="changeUser()" style="width:90px;">修改用户信息</button>
                        <button class="buttonClass" :class="{buttonBackground:disabledWord}" v-bind:disabled="disabledWord" @click="changePassWord()">修改密码</button>
                        <button class="buttonClass buttonBackground">停用</button>
                        <button class="buttonClass buttonBackground">启用</button>
                    </div>
                </div>
            </div>
            <div style="width:240px;height:100%;margin-left:10px;">
                <h2>用户基本信息</h2>
                <p>所在科室</p>
                <input v-if="readOnlyDep" type="text" :class="{backgroundGray:readOnlyDep}" v-bind:readonly="readOnlyDep" v-model="deptName">
                <select v-else style="width:159px;height:18px;" v-model="oldDeptData">
                    <option v-for="(item,index) in deptList" :value="item.deptCode">{{item.deptName}}</option>
                </select>
                <p>用户名称</p>
                <input style="width:159px;box-sizing:border-box;" type="text" :class="{backgroundGray:readOnlyUser}" v-bind:readonly="readOnlyUser" v-model="userName">
                <p>登陆名称</p>
                <input style="width:159px;box-sizing:border-box;" type="text" :class="{backgroundGray:readOnlyLogin}" v-bind:readonly="readOnlyLogin" v-model="loginName">
                <p>密码</p>
                <input style="width:159px;box-sizing:border-box;" type="password" :class="{backgroundGray:readOnlyWord}" v-bind:readonly="readOnlyWord" v-model="passWord">
                <p>确认密码</p>
                <input style="width:159px;box-sizing:border-box;" type="password" :class="{backgroundGray:readOnlyWordRept}" v-bind:readonly="readOnlyWordRept" v-model="passWordRept">
                <div style="display:flex;margin-top:10px;">
                    <button class="firstButton" @click="save()">保存</button>
                    <button class="buttonClass" @click="cancel()">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'management',
    data() {
        return {
            allowClick: true,
            userList: [],
            deptName: '',
            userName: '',
            loginName: '',
            oldPassWord:'',
            passWord: '',
            passWordRept: '',
            readOnlyDep: true,
            readOnlyUser: true,
            readOnlyLogin: true,
            readOnlyWord: true,
            readOnlyWordRept: true,
            disabledAdd: false,
            disabledChange: true,
            disabledWord: true,
            deptList: [],
            thisNewFun: false,
            thisChangeUserFun: false,
            thisChangePassWord: false,
        }
    },
    methods: {
        // 清空输入框内容，且取消左边选中
        empty() {
            for (var a = 0; a < this.userList.length; a++) {
                this.userList[a].clickData = false;
            }
            this.oldDeptData = '';
            this.deptName = '';
            this.userName = '';
            this.loginName = '';
            this.passWord = '';
            this.passWordRept = '';
        },
        // 获取所有科室
        getAllDept() {
            this.api.getAllDept()
                .then(res => {
                    this.deptList = res
                })
        },
        // 获取用户信息列表
        getList() {
            this.api.medUsersList()
                .then(res => {
                    this.userList = res.list;
                    for (var a = 0; a < this.userList.length; a++) {
                        this.$set(this.userList[a], 'clickData', false);
                    }
                })
        },
        // 选中列表的一个
        getItem(item) {
            console.log(item)
            if (this.allowClick == false) {

            } else {
                this.disabledChange = false;
                this.disabledWord = false;
                for (var a = 0; a < this.userList.length; a++) {
                    this.userList[a].clickData = false;
                }
                item.clickData = true;
                this.deptName = item.deptName;
                this.userName = item.userName;
                this.loginName = item.loginName;
                this.oldPassWord = item.loginPwd;
            }
        },
        // 新增
        addUser() {
            this.allowClick = false;
            this.empty();
            this.disabledAdd = false;
            this.disabledChange = true;
            this.disabledWord = true;
            this.oldDeptData = '';
            this.readOnlyDep = false;
            this.readOnlyUser = false;
            this.readOnlyLogin = false;
            this.readOnlyWord = false;
            this.readOnlyWordRept = false;
            this.thisNewFun = true;
            this.thisChangeUserFun = false;
            this.thisChangePassWord = false;
        },
        // 修改病人信息
        changeUser() {
            this.allowClick = false;
            this.disabledAdd = true;
            this.disabledChange = false;
            this.disabledWord = true;
            for (var i = 0; i < this.deptList.length; i++) {
                if (this.deptList[i].deptName == this.deptName) {
                    this.oldDeptData = this.deptList[i].deptCode;
                }
            }
            this.readOnlyDep = false;
            this.readOnlyUser = false;
            this.readOnlyLogin = false;
            this.readOnlyWord = true;
            this.readOnlyWordRept = true;
            this.thisNewFun = false;
            this.thisChangeUserFun = true;
            this.thisChangePassWord = false;
        },
        // 修改密码
        changePassWord() {
            this.allowClick = false;
            this.disabledAdd = true;
            this.disabledChange = true;
            this.disabledWord = false;

            this.readOnlyDep = true;
            this.readOnlyUser = true;
            this.readOnlyLogin = true;
            this.readOnlyWord = false;
            this.readOnlyWordRept = false;
            this.thisNewFun = false;
            this.thisChangeUserFun = false;
            this.thisChangePassWord = true;
        },
        // 取消
        cancel() {
            this.deptName = '';
            this.allowClick = true;
            this.empty();
            this.disabledAdd = false;
            this.disabledChange = true;
            this.disabledWord = true;

            this.readOnlyDep = true;
            this.readOnlyUser = true;
            this.readOnlyLogin = true;
            this.readOnlyWord = true;
            this.readOnlyWordRept = true;
        },
        // 保存
        save() {
            console.log(this.oldDeptData)
            console.log(this.userName)
            console.log(this.loginName)
            console.log(this.passWord)
            console.log(this.passWordRept)

            if (this.thisNewFun == true && this.thisChangeUserFun == false && this.thisChangePassWord == false) {
                // 新增
                if (this.passWord == this.passWordRept) {  //判断密码是否一致
                    var dataBody = {
                        loginName: this.loginName,
                        userName: this.userName,
                        loginPwd: this.passWord,
                        deptId: this.oldDeptData,
                    }
                    this.api.userRegister(dataBody)
                        .then(newD => {
                            if (newD.success) {
                                alert(newD.msg)
                                this.cancel();
                                this.getList();
                            }
                        })
                }

            } else if (this.thisNewFun == false && this.thisChangeUserFun == true && this.thisChangePassWord == false) {
                // 修改用户信息
                var dataBody = {
                    loginName: this.loginName,
                    userName: this.userName,
                    deptId: this.oldDeptData,
                }
                this.api.updateMedUsers(dataBody)
                    .then(change => {
                        console.log(change)
                        if (change.success) {
                            alert(change.msg)
                            this.cancel();
                            this.getList();
                        }
                    })
            } else if (this.thisNewFun == false && this.thisChangeUserFun == false && this.thisChangePassWord == true) {
                // 修改密码
                var dataBody = {
                    oldPassword: this.oldPassWord,
                    newPassword: this.passWord,
                    loginName: this.loginName,
                }
                this.api.updateUserPassword(dataBody)
                    .then(change => {
                        console.log(change)
                        if (change.success) {
                            alert(change.msg)
                            this.cancel();
                            this.getList();
                        }else{
                            alert(change.msg)
                        }
                    })
            }
        }

    },
    mounted() {
        this.getList();
        this.getAllDept();
    }

}
</script>
<style scoped>
input {
    border: 1px solid #A9A9A9;
}

.chooseOne {
    background-color: #009A52 !important;
    color: #fff;
}

.userBox {
    background-color: #fff;
    display: flex;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    border-bottom: 1px solid #A2A2A2;
}

.userBox:first-child {
    border-top: 1px solid #A2A2A2;
}

.userBox:hover {
    background-color: #009A52;
    cursor: pointer;
}

.backgroundGray {
    background-color: #F2F3F5;
}

.buttonBackground {
    background: linear-gradient(#ddd, #ddd, #ddd);
}

.firstButton {
    font-size: 12px;
    height: 21px;
    width: 70px;
    line-height: 21px;
}

.buttonClass {
    font-size: 12px;
    height: 21px;
    width: 70px;
    margin-left: 10px;
    line-height: 21px;
}
</style>
