<template>
	<el-container id="App">
		<el-header id="App-Head">
			<router-view name="Head"></router-view>
		</el-header>
		
		<el-main  id="App-Main" draggable="false">
			<router-view name='Main'></router-view>
		</el-main>
		<el-footer id="App-Footer">
			<div id="Footer">
				
			</div>
		</el-footer>
		<el-container id="App-Aside" draggable="false">
			<router-view name="Aside"></router-view>
		</el-container>
		<el-container id="App-Search">
			<router-view name="Search"></router-view>
		</el-container>
		<el-container>
			<router-view name="Flow"></router-view>
		</el-container>
	</el-container>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
	name: 'App',
	setup() {
		const myrouter = useRouter()
		function toMap() {
			myrouter.push('/map')
		}
		function toMain() {
			myrouter.push('/main')
		}
		function toTest() {
			myrouter.push('/test')
		}
		
		return {
			toMap,
			toMain,
			toTest,
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
	width: 100%;
	overflow: hidden;
}
#App-Aside{
	position: absolute;
	overflow: hidden;
	left:28px;
	top:150px;
	z-index:1;
}
#App-Search{
	position: absolute;
	width: 300px;
	height: 200px;
	right: 50px;
	top: 150px;
	z-index: 1;
}
#App-Main{
	height: auto;
	width: 100%;
	padding: 0 20px 0 20px;
	z-index: 0;
	overflow: hidden;
} 
#App-Head{
	height: auto;

}
#App-Footer{
	height:30px;
}
html{
    height: 98%;
	margin: 8px;
	overflow: hidden;
}
body{
	height: 100%;
	margin:auto;
}
#App{
	height: 100%;
}

#Footer{
	background-color: rgb(84, 92, 100);
	height: 100%;
}
</style>
