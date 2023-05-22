<template>
    <el-container>
        <el-header>
            <h1 id="Head-Title" class="text">北京地铁导航网站</h1> 
        </el-header>
        <el-main id="Head-Main">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#409EFF"
                @select="handleSelect">

                <el-menu-item index="1" @click="toNav">地图导航</el-menu-item>

                <el-menu-item index="2" @click="toAcc">账户信息</el-menu-item>

                <el-menu-item index="3" @click="toLog">登录/注册</el-menu-item>
            </el-menu>
        </el-main>

    </el-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default{
    name:'HeadNav',
    setup(){
        const activeIndex = ref('1')
        const myrouter = useRouter()
    
        function handleSelect(key){
            console.log(key)
        }
        function toNav() {
			myrouter.push('/nav')
		}
        function toAcc() {
			myrouter.push('/acc')
		}
        function toLog() {
			myrouter.push('/log')
		}
        return{
            activeIndex,
            toNav,
            toAcc,
            toLog,
            handleSelect
        }
    }
}
</script>

<style>
/* #title{}
.text class
title */
#Head-Title{
    font-size: xx-large;
    width: 300px;
    margin: 10px auto 10px 0;
    overflow: hidden;
}
#Head-Main{
    padding: 0;
    overflow: hidden;
}
</style>