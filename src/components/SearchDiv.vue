<template>
    <el-container class="filled">
        <el-header id="Search-Head" class="radius" :style="{ boxShadow: `var(--el-box-shadow)` }">
            <el-row class="filled">
                <el-col :span="20" id="Search-Path-inner" class="filled">
                    <el-row class="input-row">
                        <el-input 
                        size="small" 
                        :model-value="start" 
                        @input="inputStart($event)"
                        placeholder="Please input"
                        >
                            <template #prepend>起点站：</template>
                        </el-input>
                    </el-row>
                    <el-divider style=" width: 85%;margin: 0 20px 0 20px;"></el-divider>
                    <el-row class="input-row">
                        <el-input 
                        size="small" 
                        :model-value="end" 
                        @input="inputEnd($event)"
                        placeholder="Please input"
                        >
                            <template #prepend>终点站：</template>
                            <template #append>
                                <el-button @click="navagation()">
                                    <el-icon><Search/></el-icon>
                                </el-button>
                            </template>
                        </el-input>
                    </el-row>
                </el-col>
                <el-col :span="4">
                    <el-row style="align-items: center;height: 100%;">
                        <div @click="swap()">
                            <el-icon style="margin: auto;" size="24">
                                <Sort />
                            </el-icon>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </el-header>
        <el-main id="Search-Main" class="radius" :style="{ boxShadow: `var(--el-box-shadow)` }">
            <el-row class="filled">
                <div id="Search-Station-inner" class="filled">
                    <el-row style="padding: 5px 20px 0px 20px;">
                        <el-input 
                        size="small" 
                        :model-value="search" 
                        @input="inputSearch($event)"
                        placeholder="Please input"
                        suffix-icon="Search"
                        >
                            <template #prepend>搜索站点：</template>
                        </el-input>
                    </el-row>
                </div>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
export default {
    name: "SearchDiv",
    setup() {
        const start = ref('')
        const end = ref('')
        const search = ref('')
        const {proxy} = getCurrentInstance()
        const url='/map/navagation'
        function swap() {
            let tmp = start.value
            start.value = end.value
            end.value = tmp
        }
        function inputStart(event) {
            start.value = event
        }
        function inputEnd(event) {
            end.value = event
            console.log(end.value)
        }
        function inputSearch(event) {
            search.value = event
        }
        function navagation(){
            proxy.$axios.get(url,{
                params:{
                    startStation:start.value,
                    endStation:end.value,
                },
            }).then((res)=>{
                console.log(res.data.data)
                let string=""
                for(const str of res.data.data.stationSVG){
                    string+=','
                    string+=str
                }
                for(const str of res.data.data.pathSVG){
                    string+=','
                    string+=str
                }
                const svgs=document.querySelectorAll(`line[id^="Svgjs"],path[id^="Svgjs"],text[id^="Svgjs"],image[id^="Svgjs"],circle[id^="Svgjs"],rect[id^="Svgjs"]`)
                for(const target of svgs){
                    if(!string.includes(target.getAttribute("id"))){
                        target.style.opacity=0.15
                    }
                }
            }).catch((err)=>{
                console.log(err.message)
            })
        }
        return {
            start,
            end,
            search,
            swap,
            inputStart,
            inputEnd,
            inputSearch,
            navagation,
        }
    }
}
</script>
<style>
.radius {
    border-radius: 20px;
}

#Search {
    height: 100%;
}

.filled {
    height: 100%;
    width: 100%;
}

input {
    margin: 2px;

}

#Search-Head {
    height: 70%;
    padding: 5px;
    background-color: whitesmoke;
    margin-bottom: 10px;
}

#Search-Main {
    height: 30%;
    padding: 5px;
    background-color: whitesmoke;
}

.input-row {
    height: 50%;
    padding: 20px;
}</style>