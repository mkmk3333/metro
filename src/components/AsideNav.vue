<template>
	<el-affix>
		<el-container>
			<el-main style="padding: 0;">
				<el-menu id="containerMain" default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
					<el-sub-menu index="1" :disabled="info_disabled">
						<template #title>
							<el-icon>
								<location />
							</el-icon>
							<span>站点信息</span>
						</template>
						<p>{{ name }}站</p>
						<p>所属线路：{{ line }}</p>
						<p>换乘站：{{ transfer }}</p>
					</el-sub-menu>
					<!-- <el-menu-item index="2">
					<el-icon>
						<Menu />
					</el-icon>
					<template #title>Navigator Two</template>
				</el-menu-item>
				<el-menu-item index="3">
					<el-icon>
						<document />
					</el-icon>
					<template #title>Navigator Three</template>
				</el-menu-item> -->
					<el-sub-menu index="2" :disabled="path_disabled">
						<template #title>
							<el-icon>
								<share />
							</el-icon>
							<span>路线信息</span>
						</template>
						<el-radio-group v-model="mode" style="margin-bottom: 20px" @change="changeMode()">
							<el-radio-button :label="false">路程最短</el-radio-button>
							<el-radio-button :label="true">换乘最少</el-radio-button>
						</el-radio-group>
						<div id="pathContent">
							<p>乘车时间：{{ time }}分钟</p>
							<p>总里程：{{ mileage/1000 }}公里</p>
							<p>路线：</p>
							<p v-for="p in path" :key="p">
								{{ p }}
							</p>
						</div>
						
						
					</el-sub-menu>
				</el-menu>
			</el-main>

		</el-container>
	</el-affix>
</template>
    
<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'

export default {
	name: 'AsideNav',
	setup() {
		const isCollapse = ref(true)
		const station = reactive({
			arr: []
		})
		const path = ref([])
		const name = ref("")
		const line = ref("")
		const transfer = ref("")
		const time = ref(0)
		const mileage = ref(0)
		const mode = ref(false)
		const { proxy } = getCurrentInstance()
		const path_disabled = ref(true)
		const info_disabled = ref(true)

		onMounted(() => {
			proxy.emitter.on("selectStation", (data) => {
				station.arr = data;
				name.value = data.data.name
				line.value = data.data.line
				if (data.data.transfer == 1) {
					transfer.value = "是"
				}
				else {
					transfer.value = "否"
				}
				path_disabled.value = true
				info_disabled.value = false
				isCollapse.value = false
			})
			proxy.emitter.on("closeStationInfo", () => {
				path.value.length=0
				time.value=0
				mileage.value=0
				info_disabled.value = true
				path_disabled.value = true
				isCollapse.value = true
			})
			proxy.emitter.on("showPath", (data) => {
				path.value.length=0
				time.value = data.time
				mileage.value = data.mileage
				info_disabled.value = true
				path_disabled.value = false
				let line=data.path[0].y
				let str=line+": "+data.path[0].x
				let i=0
				for(const p of data.path){
					if(p.y==line){
						str+='->'
						str+=p.x
					}
					else{
						
						str+='->'
						str+=p.x
						path.value[i]=str
						i+=1
						str=p.y+': '+p.x
						line=p.y
					}
				}
				path.value[i]=str
				isCollapse.value = false
			})
		})

		function changeMode() {
			let str=""
			if(mode.value==false){
				str="distance"
			}
			else{
				str="transfer"
			}
			proxy.emitter.emit("selectMode", str)
		}

		return {
			isCollapse,
			station,
			name,
			line,
			transfer,
			time,
			mileage,
			info_disabled,
			path_disabled,
			mode,
			changeMode,
			path,
		}
	}
}
</script>
    
<style>

.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 300px;
	height: 500px;

}

.el-menu{
	border-right: solid 1px var(--el-menu-border-color);
	border-top: solid 1px var(--el-menu-border-color);
	border-bottom: solid 1px var(--el-menu-border-color);
	
}

.el-sub-menu {
	overflow: hidden;
}

#containerMain{
	overflow-y: auto;
	overflow-x: hidden;
}

.el-menu--collapse{
	overflow: hidden;
}

.el-radio-group{
	margin: 20px 0px;
}
</style>
