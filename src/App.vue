<template>
	<el-container class="outer">
		<el-container>
			<!-- <el-aside>
				<el-affix>
					<router-view name="Aside"></router-view>
				</el-affix>
			</el-aside> -->
			<el-main>
				<router-view name='Main'></router-view>
			</el-main>
		</el-container>
		<el-footer >
			<el-affix>
				<button @click="toMap">Map</button>
				<button @click="toTest">Test</button>
				<button @click="toMain">Main</button>
			</el-affix>
		</el-footer>

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
	margin-top: 60px;
}
.outer{
	height:640px;
}
</style>
