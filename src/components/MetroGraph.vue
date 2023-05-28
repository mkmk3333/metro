<template>
  <el-container id="MetroGraph">
    <el-main style="overflow-y: hidden;overflow-x: hidden;" id="svg_parent">
      <SVGMap :class="mysvg" id="svg_map" @click="select($event)" @mousedown="move($event, mysvg)"
        @mousewheel.prevent="scale($event)" style="">
      </SVGMap>
      <el-icon id="location" :size="30">
        <LocationFilled />
      </el-icon>
    </el-main>
    <el-footer>
      <el-button sdata="1号线" @click="setOpacity($event)">1号线</el-button>
      <el-button sdata="2号线" @click="setOpacity($event)">2号线</el-button>
      <el-button sdata="4号线" @click="setOpacity($event)">4号线</el-button>
      <el-button sdata="5号线" @click="setOpacity($event)">5号线</el-button>
      <el-button sdata="6号线" @click="setOpacity($event)">6号线</el-button>
      <el-button sdata="7号线" @click="setOpacity($event)">7号线</el-button>
      <el-button sdata="8号线" @click="setOpacity($event)">8号线</el-button>
      <el-button sdata="9号线" @click="setOpacity($event)">9号线</el-button>
      <el-button sdata="10号线" @click="setOpacity($event)">10号线</el-button>
      <el-button sdata="11号线" @click="setOpacity($event)">11号线</el-button>
      <el-button sdata="13号线" @click="setOpacity($event)">13号线</el-button>
      <el-button sdata="14号线" @click="setOpacity($event)">14号线</el-button>
      <el-button sdata="15号线" @click="setOpacity($event)">15号线</el-button>
      <el-button sdata="16号线" @click="setOpacity($event)">16号线</el-button>
      <el-button sdata="17号线" @click="setOpacity($event)">17号线</el-button>
      <el-button sdata="19号线" @click="setOpacity($event)">19号线</el-button>
      <el-button sdata="大兴机场线" @click="setOpacity($event)">大兴机场线</el-button>
      <el-button sdata="西郊线" @click="setOpacity($event)">西郊线</el-button>
      <el-button sdata="S1线" @click="setOpacity($event)">S1线</el-button>
      <el-button sdata="燕房线" @click="setOpacity($event)">燕房线</el-button>
      <el-button sdata="大兴线" @click="setOpacity($event)">大兴线</el-button>
      <el-button sdata="昌平线" @click="setOpacity($event)">昌平线</el-button>
      <el-button sdata="房山线" @click="setOpacity($event)">房山线</el-button>
      <el-button sdata="亦庄线" @click="setOpacity($event)">亦庄线</el-button>
      <el-button sdata="首都机场线" @click="setOpacity($event)">首都机场线</el-button>
      <el-button sdata="亦庄T1线" @click="setOpacity($event)">亦庄T1线</el-button>
    </el-footer>
  </el-container>
</template>
<script>
import { getCurrentInstance, onMounted } from 'vue'
import SVGMap from './SVGMap.vue'

import { LocationFilled } from '@element-plus/icons-vue'
export default {
  name: "MetroGraph",
  components: {
    SVGMap,
    LocationFilled,
  },
  setup() {
    const url = require("@/assets/metro2.svg")
    const url_get_station = '/station/name'
    const url_get_svg='/map/SVG'
    const mysvg = "mysvg"//传参需要
    const { proxy } = getCurrentInstance()
    let scale_level = 1
    let dragFlag = false

    onMounted(() => {
      const target = document.getElementById("svg_map")
      target.style.left = '0px'
      target.style.top = '-100px'
      target.style.transform = 'scale(1)'
      const icon = document.getElementById("location")
      icon.style.position = 'absolute'
      icon.style.visibility = 'hidden'
    })

    function select(event) {
      changeVisibility("hidden")
     
      if (!dragFlag) {
        removeOpacity()
        const target = event.target
        const svg_target = document.getElementById("svg_map")
        if (target.localName == 'image' || target.localName == 'circle') {
          console.log(event.target, svg_target.localName)
          const icon = document.getElementById("location")
          let x = event.clientX - 15
          let y = event.clientY - 30
          icon.style.left = x + 'px'
          icon.style.top = y + 'px'
          console.log("ok", icon.style.left)
          changeVisibility("visible")

          console.log(target.getAttribute("sdata"))
          proxy.$axios
            .get(url_get_station, {
              params: {
                name: target.getAttribute("sdata")
              }
            })
            .then((res) => {
              console.log(res.data)

            })
            .catch((err) => {
              console.log(err.message)
            })
        }
      }
      else {
        dragFlag = false
      }
    }

    function move(event, s) {
      changeVisibility("hidden")
      if (s) {   // 需要拖拽的元素传true
        let child = document.getElementById("svg_map");
        let X = event.clientX
        let Y = event.clientY
        let childX = removePX(child.style.left)
        let childY = removePX(child.style.top)
        document.onmousemove = (e) => {       // 鼠标按下并移动
          dragFlag = true
          let deltaX = e.clientX - X + childX
          let deltaY = e.clientY - Y + childY

          // 移动当前元素
          child.style.left = deltaX + 'px';
          child.style.top = deltaY + 'px';
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };

      }
    }

    function scale(e) {
      changeVisibility("hidden")
      let level = e.deltaY / 125// 触发滚动次数
      scale_level -= level * 0.05
      scale_level = scale_level.toFixed(2)
      const target = document.getElementById("svg_map")
      target.style.transform = 'scale(' + scale_level.toString() + ')'
      target.setAttribute("data-int", scale_level)
    }

    function removePX(s) {
      if (typeof (s) != 'string') return
      let tmpIndex = s.lastIndexOf('p')
      let ans = parseInt(s.substring(0, tmpIndex))
      return ans
    }

    function changeVisibility(bool) {
      const target = document.getElementById("location")
      target.style.visibility = bool
    }

    function setOpacity(event){
      //console.log(event.target)
      removeOpacity();
      let target=event.target
      if(event.target.localName=="span"){
        target=target.parentElement
      }
      proxy.$axios.get(url_get_svg,
        {params : {
          linename:target.getAttribute("sdata"),
        }}
      ).then((res)=>{
        console.log(res.data.data)
        const svgs=document.querySelectorAll(`line[id^="Svgjs"],path[id^="Svgjs"],text[id^="Svgjs"],image[id^="Svgjs"],circle[id^="Svgjs"],rect[id^="Svgjs"]`)
        for(const target of svgs){
          let breakflag=0;
          for (const str of res.data.data.path){
            if(str.includes(target.getAttribute('id'))){
              breakflag=1;
            }
          }
          for (const str of res.data.data.station){
            if(str.includes(target.getAttribute('id'))){
              breakflag=1;
            }
          }
          if(res.data.data.line.includes(target.getAttribute('id'))){
            breakflag=1;
          }
          if(breakflag==1){
            //console.log("continue!")
            continue;
          }
          target.style.opacity="0.15";
        }
      }).catch((err)=>{
        console.log(err.message)
      })
    }

    function removeOpacity(){
      const svgs=document.querySelectorAll(`line[id^="Svgjs"],path[id^="Svgjs"],text[id^="Svgjs"],image[id^="Svgjs"],circle[id^="Svgjs"],rect[id^="Svgjs"]`)
      for(const svg of svgs){
        svg.style.opacity="1";
      }
    }

    return {
      url,
      select,
      mysvg,
      move,
      scale,
      scale_level,
      setOpacity,
    }
  }
}


</script>
<style>
#svg_map {
  position: relative;
  height: 100%;
  width: 100%;

}

#svg_parent {
  height: 100%;
  width: 100%;
}

#MetroGraph {
  height: 100%;
}
.svg_dark{
  filter: brightness(0.5);
}
</style>