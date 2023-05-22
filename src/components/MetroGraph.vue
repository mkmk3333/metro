<template>
  <el-container id="MetroGraph">
    <el-main 
    style="overflow-y: hidden;overflow-x: hidden;" 
    id="svg_parent"
    >
      <SVGMap
      :class="mysvg"
      id="svg_map"
      @click="select($event)"
      @mousedown="move($event,mysvg)" 
      @mousewheel.prevent="scale($event)"
      style=""
      >
      </SVGMap>
      <el-icon id="location" :size="30"><LocationFilled /></el-icon>
    </el-main>
  </el-container>
</template>
<script>
import { getCurrentInstance, onMounted} from 'vue'
import SVGMap from'./SVGMap.vue'

import { LocationFilled } from '@element-plus/icons-vue'
export default {
  name: "MetroGraph",
  components:{
    SVGMap,
    LocationFilled,
},
  setup() {
    const url = require("@/assets/metro2.svg")
    const url_get_station = '/station/name'
    const mysvg="mysvg"//传参需要
    const { proxy } =getCurrentInstance()
    let scale_level=1
    let dragFlag=false

    onMounted(()=>{
      const target=document.getElementById("svg_map")
      target.style.left='0px'
      target.style.top='-100px'
      target.style.transform='scale(1)'
      const icon=document.getElementById("location")
      icon.style.position='absolute'
      icon.style.visibility='hidden'
    })

    function select(event) {
      changeVisibility("hidden")
      if(!dragFlag){
        const target=event.target
        const svg_target=document.getElementById("svg_map")
        if(target.localName=='image' || target.localName=='circle'){
          console.log(event.target,svg_target.localName)
          const icon=document.getElementById("location")
          let x=event.clientX-15
          let y=event.clientY-30
          icon.style.left=x+'px'
          icon.style.top=y+'px'
          console.log("ok",icon.style.left)
          changeVisibility("visible")

          console.log(target.getAttribute("sdata"))
          proxy.$axios
          .get(url_get_station,{
            params:{
              name:target.getAttribute("sdata")
            }
          })
          .then((res)=>{
            console.log(res.data)
            
          })
          .catch((err)=>{
            console.log(err.message)
          })
        }
      }
      else{
        dragFlag=false
      }
    } 

    function move(event, s){
      changeVisibility("hidden")
      if (s) {   // 需要拖拽的元素传true
        let child = document.getElementById("svg_map");    
        let X = event.clientX
        let Y = event.clientY
        let childX = removePX(child.style.left)
        let childY = removePX(child.style.top)
        document.onmousemove = (e) => {       // 鼠标按下并移动
          dragFlag=true
          let deltaX = e.clientX - X + childX
          let deltaY = e.clientY - Y + childY

          // 移动当前元素
          child.style.left = deltaX  + 'px';
          child.style.top = deltaY  + 'px';
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        
      }
    }

    function scale(e){
      changeVisibility("hidden")
      let level=e.deltaY/125// 触发滚动次数
      scale_level-=level*0.05
      scale_level=scale_level.toFixed(2)
      const target=document.getElementById("svg_map")
      target.style.transform='scale('+scale_level.toString()+')'
      target.setAttribute("data-int",scale_level)

    }

    function removePX(s){
      if(typeof(s)!='string')return
      let tmpIndex=s.lastIndexOf('p')
      let ans=parseInt(s.substring(0,tmpIndex))
      return ans
    }
    
    function changeVisibility(bool){
      const target=document.getElementById("location")
      target.style.visibility=bool
    }
    return {
      url,
      select,
      mysvg,
      move,
      scale,
      scale_level,
    }
  }
}

export function changeSVGColor(id_array,color){
  for(let id in id_array){
    const target = document.getElementById(id)
    target.style.color=color
  }
}

</script>
<style>
#svg_map{
  position: relative;
  height:100%;
  width:100%;

}
#svg_parent{
  height:100%;
  width:100%;
}
#MetroGraph{
  height: 100%;
}
</style>