<template>
  <el-container>
    <el-main 
      style="overflow-y: hidden;overflow-x: hidden;" 
      id="svg_parent"
      >
      <img 
      :class="mysvg"
      id="svg_map"
      :src="url"
      @mousedown="move($event,mysvg)" 
      @mousewheel="scale($event)"
      
      draggable="false"
      >
    </el-main>
    <el-footer>
      {{ flag }}
    </el-footer>
    <!-- <img src="@/assets/test.svg"> -->

  </el-container>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  name: "MetroGraph",
  setup() {
    const url = require("@/assets/metro2.svg")
    const mysvg="mysvg"//传参需要
    const flag = ref("none")
    let ratio=1
    onMounted(()=>{
      const target=document.getElementById("svg_map")
      ratio=target.offsetHeight/target.offsetWidth
    })
    function drag_down() {
      flag.value = "down"
      console.log("down")
    }
    function drag_up() {
      flag.value = "up"
      console.log("up")
    }
    function select() {
      flag.value = "click"
      console.log("up")
    } 
    function move(e, s){
      flag.value = "down"
      if (s) {   // 需要拖拽的元素传true
        let child = e.target;        // 获得触发事件的子元素
        let parent=document.getElementById("svg_parent")// 装载svg的父元素
        let style = window.getComputedStyle(parent, null)
        let paddingLeft=parseFloat(style.getPropertyValue('padding-left'))
        let paddingTop=parseFloat(style.getPropertyValue('padding-top'))// 获得padding信息
        // console.log("parent:",parent)
        // console.log("child:",child)
        // console.log("parent left,top:",parent.offsetLeft,parent.offsetTop)
        // console.log("child left,top:",child.offsetLeft,child.offsetTop)
        // console.log("mouse left,top:",e.clientX,e.clientY)
        // console.log("padding left,top:",paddingLeft,paddingTop)
        //算出鼠标相对svg的位置
        let disX = e.clientX - child.offsetLeft;
        let disY = e.clientY - child.offsetTop;
        // console.log("relative:",disX,disY)
        document.onmousemove = (e) => {       // 鼠标按下并移动
          let left = e.clientX - disX - parent.offsetLeft - paddingLeft;// style中的left值
          let top = e.clientY - disY - parent.offsetTop - paddingTop;// style中的top值
          // console.log(left,top)
          // 移动当前元素
          child.style.left = left + 'px';
          child.style.top = top + 'px';
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    }
    function scale(e){
      // console.log(e)
      let level=e.deltaY/125// 触发滚动次数
      const target=e.target//触发滚动的文档元素
      // console.log(target)
      let height=target.offsetHeight
      let width=target.offsetWidth
      // console.log(ratio)
      document.onwheel = () => {
        target.style.height=(height-50*level*ratio)+'px'//改变宽高
        target.style.width=(width-50*level)+'px'
      }
    }
    return {
      url,
      flag,
      drag_down,
      drag_up,
      select,
      mysvg,
      move,
      scale,
    }
  }
}
</script>
<style>

#svg_map{
  /* -webkit-touch-callout: none; 
  -webkit-user-select: none; 
  -khtml-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none; */
  position: relative;
}
</style>