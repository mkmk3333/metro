<template>
	<el-container>
		<el-main>
			<el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen()"
				@close="handleClose()" @mouseenter="enter()" @mouseleave="leave()">
				<el-sub-menu index="1">
					<template #title>
						<el-icon>
							<location />
						</el-icon>
						<span>Navigator One</span>
					</template>
					<el-menu-item-group>
						<template #title><span>Group One</span></template>
						<el-menu-item index="1-1">item one</el-menu-item>
						<el-menu-item index="1-2">item two</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="Group Two">
						<el-menu-item index="1-3">item three</el-menu-item>
					</el-menu-item-group>
					<el-sub-menu index="1-4">
						<template #title><span>item four</span></template>
						<el-menu-item index="1-4-1">item one</el-menu-item>
					</el-sub-menu>
				</el-sub-menu>
				<el-menu-item index="2">
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
				</el-menu-item>
				<el-menu-item index="4">
					<el-icon>
						<setting />
					</el-icon>
					<template #title>Navigator Four</template>
				</el-menu-item>
			</el-menu>
		</el-main>

	</el-container>
</template>
    
<script>
import { ref } from 'vue'

export default {
	name: 'AsideNav',
	setup() {
		const isCollapse = ref(true)

		const handleOpen = (key, keyPath) => {
			console.log(key, keyPath)
		}
		const handleClose = (key, keyPath) => {
			console.log(key, keyPath)
		}
		function enter() {
			isCollapse.value=false
		}
		function leave() {
			isCollapse.value=true
		}
		return {
			handleClose,
			handleOpen,
			isCollapse,
			enter,
			leave,
		}
	}
}
</script>
    
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>