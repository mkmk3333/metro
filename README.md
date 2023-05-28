# metro

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Project Info

### command

git pull --allow-unrelated-histories origin/zrc

### bugs&fixes

&#60;image&#62;与&#60;img&#62;<br/>
&#60;img&#62;路径相对于项目路径<br/>
&#60;image&#62;路径相对于网页路径<br/>

svg:来源于北京地铁官网<br/>
svg中使用https获取.png会有跨域请求问题，无法显示<br/>
采用base64编码后插入svg显示<br/>

DOM对象样式只能改变一次，通过向元素添加类名和调用类名选择器来进行css样式修改<br/>
child.style.left获取的是left属性值，为xxx px，为字符串类型<br/>
需对child.style.left进行处理<br/>

prevent阻止默认事件（滚轮滚动页面）改为缩放<br/>

尝试使用css动画，失败（animation未能正确触发,可能是浏览器不支持css3参数attr()）<br/>

14号线西铁营至东管头段未给出站点间据与站点信息，故不参与计算    p.s.根据京港地铁给出的数据修复此问题<br/>

丽泽商务区站各个官网数据与地图存在差异，地图显示非换乘站，数据显示换乘站，按换乘站处理    p.s.高德地图显示为换乘站<br/>

使用dijkstra算法开始时需push起点与其所有换乘站<br/>

木樨地站应为换乘站<br/>

苏州街站应为换乘站<br/>

后端存储svg组件名时，组件大于8个将会超过储存上限，修改Column：SVGid的类型为varchar(255),text,longtext,longblob均超过上限。对于组件数较多的西郊线与亦庄T1线，程序只存储线路外部红色区域<br/>


### version
| version         | description                                                                 |
| :-------------- | :------------------------------------------------------------------------- |
| v0.1.1-v0.1.6   | 前期版本，创建AsideNav，HelloWorld，TestComponent，TitleLogo组件            |      
| v0.1.7-v0.1.12  | 创建MetroGraph组件，使用img引入地铁图svg，v0.1.12完成img对应的拖拽缩放功能    |
| v0.1.13         | 创建SVGMap组件，使用内联方式嵌入svg，完成对应的拖拽缩放功能                   |
| v0.1.14         | 创建SearchDiv组件，添加首页站点搜索栏，更新svg，调试前后端交互，建立后端数据库 |
| v0.2.1          | 编写完善后端dijkstra算法，完善数据库数据，初步完成导航功能，但每次查询均需重新初始化 |

