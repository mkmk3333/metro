import { createRouter,createWebHistory } from "vue-router";
import HelloWorld from '@/components/HelloWorld.vue'
import TestComponent from '@/components/TestComponent.vue'
import AsideNav from '@/components/AsideNav.vue'
import MetroGraph from '@/components/MetroGraph.vue'

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
                'Aside':AsideNav,
            }
        },
        {
            path:'/test',
            name:'Test',
            components:{
                'Main':TestComponent,
            }
        },
        {
            path:'/map',
            name:'Map',
            components:{
                'Main':MetroGraph,
            }
        }
    ]
}
)
export default router;