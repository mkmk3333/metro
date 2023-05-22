<template>
    <el-container class="filled">
        <el-header id="Search-Head" class="radius" :style="{ boxShadow: `var(--el-box-shadow)` }">
            <el-row class="filled">
                <el-col :span="20" id="Search-Path-inner" class="filled">
                    <el-row class="input-row">
                        <el-input 
                        size="small" 
                        :model-value="startStation" 
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
                        :model-value="endStation" 
                        @input="inputEnd($event)"
                        placeholder="Please input"
                        suffix-icon="Search"
                        >
                            <template #prepend>终点站：</template>
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
                        :model-value="searchStation" 
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
import { ref } from 'vue'

export default {
    name: "SearchDiv",
    setup() {
        const startStation = ref('')
        const endStation = ref('')
        const searchStation = ref('')
        function swap() {
            let tmp = startStation.value
            startStation.value = endStation.value
            endStation.value = tmp
        }
        function inputStart(event) {
            startStation.value = event
        }
        function inputEnd(event) {
            endStation.value = event
        }
        function inputSearch(event) {
            searchStation.value = event
        }
        return {
            startStation,
            endStation,
            searchStation,
            swap,
            inputStart,
            inputEnd,
            inputSearch,
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