import { createRouter,createWebHistory } from "vue-router";
import HelloWorld from '@/components/HelloWorld.vue'
import TestComponent from '@/components/TestComponent.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {//默认路由
            path:'/',
            redirect:'/main'
        },
        {//主页面
            path:'/main',
            name:'Main',
            components: {
                'Main':HelloWorld,
            }
        },
        {
            path:'/test',
            name:'test',
            components:{
                'Main':TestComponent,
            }
        },
    ]
}
)
export default router;