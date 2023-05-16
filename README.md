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

DOM对象样式智能改变一次<br/>
child.style.left获取的是left属性值，为xxx px，为字符串类型<br/>
需对child.style.left进行处理<br/>

.prevent阻止默认事件（滚轮滚动页面）改为缩放<br/>

### version
v0.1.1-v0.1.6   前期版本，创建AsideNav，HelloWorld，TestComponent，TitleLogo组件
v0.1.7-v0.1.12  创建MetroGraph组件，使用img引入地铁图svg，v0.1.12完成img对应的拖拽缩放功能
v0.1.13         创建SVGMap组件，使用内联方式嵌入svg，完成对应的拖拽缩放功能
