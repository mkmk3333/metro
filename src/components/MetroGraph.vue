<template>
  <el-container>
    <el-main 
    style="overflow-y: hidden;overflow-x: hidden;" 
    id="svg_parent"
    >
      <SVGMap
      :class="mysvg"
      id="svg_map"
      @mouseclick="select($event)"
      @mousedown.stop="move($event,mysvg)" 
      @mousewheel.prevent="scale($event)"
      style=""
      >
      </SVGMap>
    </el-main>
  </el-container>
</template>
<script>
import { onMounted} from 'vue'
import SVGMap from'./SVGMap.vue'
export default {
  name: "MetroGraph",
  components:{
    SVGMap,
  },
  setup() {
    const url = require("@/assets/metro2.svg")
    const mysvg="mysvg"//传参需要
    let scale_level=1
    onMounted(()=>{
      const target=document.getElementById("svg_map")
      target.style.left='0px'
      target.style.top='0px'
      target.style.transform='scale(1)'
    })
    function select(event) {
      console.log(event.target)
    } 
    function move(event, s){
      if (s) {   // 需要拖拽的元素传true
        let child = document.getElementById("svg_map");    
        console.log(child.getAttribute('drag-flag'))
        let X = event.clientX
        let Y = event.clientY
        let childX = removePX(child.style.left)
        let childY = removePX(child.style.top)
        document.onmousemove = (e) => {       // 鼠标按下并移动
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
      let level=e.deltaY/125// 触发滚动次数
      scale_level-=level*0.05
      const target=document.getElementById("svg_map")
      target.style.transform='scale('+scale_level.toString()+')'
    }
    function removePX(s){
      if(typeof(s)!='string')return
      let tmpIndex=s.lastIndexOf('p')
      let ans=parseInt(s.substring(0,tmpIndex))
      return ans
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
</script>
<style>
#svg_map{
  position: relative;
  height:100%;
  width:100%;
}
#svg_parent{
  height:550px;
  width:978px;
}
</style>