<template>
<el-container>
  <el-main>
    <p>{{i}}</p>
  <p>{{j}}</p>
  <p>{{person}}</p>
  <button @click="changeI">changeI</button>
  <button @click="changeJ">changeJ</button>
  <button @click="changeP">changeP</button>
  </el-main>
</el-container>

</template>

<script>
import {ref,reactive} from 'vue'
export default {
    "name":"TestComponent",
    setup(){
        const i=ref("0")
        const person=reactive({
            "name":"111"
        })
        let j=1
        let k=0
        function changeI(){
            if(k%2==0){
                i.value=999
                k+=1
            }
            else{
                i.value=0
                k+=1
            }    
        }
        function changeJ(){
            j=999
            console.log(j)
        }
        function changeP(){
            person.value["name"]="zrc"
        }
        return{
            changeI,
            changeJ,
            changeP,
            person,
            i,
            j,
        }
    }
}
</script>

<style>

</style>