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
    <el-footer>
      <button @click='toMain'>Main</button>
    </el-footer>
</el-container>

</template>

<script>
import {ref,reactive} from 'vue'
import { useRouter } from 'vue-router'
export default {
    "name":"TestComponent",
    setup(){
        const i=ref("0")
        const myrouter=useRouter()
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
        function toMain(){
            myrouter.push('/main')
        }
        return{
            changeI,
            changeJ,
            changeP,
            person,
            i,
            j,
            toMain
        }
    }
}
</script>

<style>

</style>