<template>
    <el-container>
        <el-header>
            <el-row>
                <h1 id="Head-Title" class="text">北京地铁导航网站</h1>
                <p id="user" style="visibility: hidden;">用户名：{{ username }}</p>
            </el-row>

        </el-header>
        <el-main id="Head-Main">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
                text-color="#fff" active-text-color="#409EFF">

                <el-menu-item index="1" @click="toNav()">地图导航</el-menu-item>

                <el-menu-item index="2" @click="showInfo()">账户信息</el-menu-item>

                <el-menu-item index="3" @click="toLog()">登录/注册</el-menu-item>
            </el-menu>
        </el-main>

        <el-dialog v-model="loginVisible" :align-center="true">
            <template #header>
                <h1>登录</h1>
            </template>


            <el-form :model="form" id="form_login">
                <el-form-item label="账户" :label-width="formLabelWidth">
                    <el-input v-model="form_login.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form_login.password" autocomplete="off" />
                </el-form-item>
            </el-form>


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="change()">
                        <p>注册</p>
                    </el-button>
                    <el-button type="primary" @click="login()">
                        <p>登录</p>
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="registerVisible" :align-center="true">
            <template #header>
                <h1>注册</h1>
            </template>


            <el-form :model="form" id="form_register">
                <el-form-item label="账户" :label-width="formLabelWidth">
                    <el-input v-model="form_register.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form_register.password" autocomplete="off" />
                </el-form-item>
            </el-form>


            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="registerVisible = false">
                        <p>取消</p>
                    </el-button>
                    <el-button type="primary" @click="register()">
                        <p>注册</p>
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="infoVisible" :align-center="true">
            <template #header>
                <h1>用户信息</h1>
            </template>

            <el-descriptions title="User Info">
                <el-descriptions-item label="Username: ">{{ info.username }}</el-descriptions-item>
                <el-descriptions-item label="State: ">{{ info.deleted }}</el-descriptions-item>
            </el-descriptions>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="infoVisible = false">
                        <p>返回</p>
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </el-container>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
export default {
    name: 'HeadNav',
    setup() {
        const activeIndex = ref('1')
        const myrouter = useRouter()
        const loginVisible = ref(false)
        const registerVisible = ref(false)
        const infoVisible=ref(false)
        const formLabelWidth = '140px'
        const username = ref("")
        const { proxy } = getCurrentInstance()
        const url_login = "/user/login"
        const url_register = "/user/register"
        const url_info = '/user/name'

        const form_login = reactive({
            username: '',
            password: '',
        })

        const form_register = reactive({
            username: '',
            password: '',
        })

        const info = reactive({
            username: '',
            deleted: '',
        })

        function toNav() {
            myrouter.push('/map')
        }

        function toLog() {
            loginVisible.value = true
        }

        function login() {
            proxy.$axios.get(url_login, {
                params: {
                    username: form_login.username,
                    password: form_login.password,
                }
            })
                .then((res) => {
                    proxy.emitter.emit("userLogin", res.data.data)
                    username.value = res.data.data.username
                    const target = document.getElementById("user")
                    target.style.visibility = 'visible'
                    ElMessage({
                        message: "登陆成功！",
                        type: 'success',
                    })
                    loginVisible.value = false
                    activeIndex.value = 1
                })
                .catch((err) => {
                    ElMessage({
                        message: err.message,
                        type: 'error',
                    })
                })

        }
        function register() {
            proxy.$axios.post(url_register, form_register)
                .then(() => {
                    ElMessage({
                        message: "注册成功！",
                        type: 'success',
                    })
                    registerVisible.value = false
                    activeIndex.value = 1
                })
                .catch((err) => {
                    ElMessage({
                        message: err.message,
                        type: 'error',
                    })
                })
        }
        function change() {
            loginVisible.value = false
            registerVisible.value = true
        }
        function showInfo() {
            if (username.value == '') {
                ElMessage({
                    message: '请先登录！',
                    type: 'error',
                })
                return
            }
            proxy.$axios.get(url_info, {
                params: {
                    name: username.value
                }
            }).then((res)=>{
                console.log(res)
                info.username=res.data.username
                if(!res.data.deleted){
                    info.deleted='not deleted'
                }
                else{
                    info.deleted='deleted'
                }
                infoVisible.value=true
            }).catch((err)=>{
                ElMessage({
                    message: err.message,
                    type: 'error',
                })
            })
        }
        return {
            activeIndex,
            toNav,
            toLog,
            loginVisible,
            registerVisible,
            infoVisible,
            formLabelWidth,
            form_login,
            form_register,
            login,
            register,
            username,
            change,
            info,
            showInfo,
        }
    }
}
</script>

<style>
/* #title{}
.text class
title */
#Head-Title {
    font-size: xx-large;
    width: 300px;
    margin: 10px auto 10px 0;
    overflow: hidden;
}

#Head-Main {
    padding: 0;
    overflow: hidden;
}



#form {
    width: 400px;
    margin: auto;
}
</style>