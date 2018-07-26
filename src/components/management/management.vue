<template>
    <div>
        <div style="width:670px;height:480px;border:1px solid #222;display:flex;margin-left:10px;">
            <div style="width:420px;height:100%;">
                <div style="height:24px;width:100%;background-color:#F0F0F0;">
                    <div style="height:100%;width:53px;padding:0 5px;line-height:24px;font-size:12px;background-color:#fff;">
                        筛选用户
                    </div>
                    <div style="border:1px solid #222;margin-top:10px;height:400px;margin-left:5px;">
                        <div style="background-color:#F2F3F5;display:flex;font-size:12px;height:25px;line-height:25px;border-bottom:1px solid #A2A2A2;">
                            <div style="padding:0 10px;border-right:1px solid #A2A2A2;">用户登陆名称</div>
                            <div style="padding:0 10px;">用户名称</div>
                        </div>
                        <div style="overflow-y:auto;overflow-x:hidden;height:376px;width:100%;box-sizing:border-box;padding-top:4px;">
                            <div style="background-color:#fff;display:flex;font-size:12px;height:25px;line-height:25px;border-top:1px solid #A2A2A2;border-bottom:1px solid #A2A2A2;">
                                <div style="padding:0 10px;border-right:1px solid #A2A2A2;width:72px;">zxc</div>
                                <div style="padding:0 10px;">123</div>
                            </div>
                            <div style="background-color:#fff;display:flex;font-size:12px;height:25px;line-height:25px;border-top:1px solid #A2A2A2;border-bottom:1px solid #A2A2A2;">
                                <div style="padding:0 10px;border-right:1px solid #A2A2A2;width:72px;">zxc</div>
                                <div style="padding:0 10px;">123</div>
                            </div>
                            <div style="background-color:#fff;display:flex;font-size:12px;height:25px;line-height:25px;border-top:1px solid #A2A2A2;border-bottom:1px solid #A2A2A2;">
                                <div style="padding:0 10px;border-right:1px solid #A2A2A2;width:72px;">zxc</div>
                                <div style="padding:0 10px;">123</div>
                            </div>
                        </div>
                    </div>
                    <div style="display:flex;margin-top:10px;">
                        <button style="font-size:12px;height:21px;width:70px;line-height:21px;">新用户</button>
                        <button style="font-size:12px;height:21px;width:90px;margin-left:10px;line-height:21px;">修改用户信息</button>
                        <button style="font-size:12px;height:21px;width:70px;margin-left:10px;line-height:21px;">修改密码</button>
                        <button style="font-size:12px;height:21px;width:70px;margin-left:10px;line-height:21px;">停用</button>
                        <button style="font-size:12px;height:21px;width:70px;margin-left:10px;line-height:21px;">启用</button>
                    </div>
                </div>
            </div>
            <div style="width:240px;height:100%;margin-left:10px;">
                <h2>用户基本信息</h2>
                <p>所在科室</p>
                <input type="text">
                <p>用户名称</p>
                <input type="text">
                <p>登陆名称</p>
                <input type="text">
                <p>密码</p>
                <input type="text">
                <p>确认密码</p>
                <input type="text">
                <div style="display:flex;margin-top:10px;">
                    <button style="font-size:12px;height:21px;width:70px;line-height:21px;">保存</button>
                    <button style="font-size:12px;height:21px;width:70px;margin-left:10px;line-height:21px;">取消</button>
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

        }
    },
    methods: {
        fun() {

        },

    },
    mounted() {

    }

}
</script>
<style scoped>

</style>
