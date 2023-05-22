import { createRouter,createWebHistory } from "vue-router";
import HelloWorld from '@/components/HelloWorld.vue'
import TestComponent from '@/components/TestComponent.vue'
import AsideNav from '@/components/AsideNav.vue'
import MetroGraph from '@/components/MetroGraph.vue'
import HeadNav from '@/components/HeadNav.vue'
import SearchDiv from '@/components/SearchDiv.vue'

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
                'Head':HeadNav,
                'Main':HelloWorld,
                'Aside':AsideNav,
                
            }
        },
        {
            path:'/test',
            name:'Test',
            components:{
                'Head':HeadNav,
                'Main':TestComponent,
            }
        },
        {
            path:'/map',
            name:'Map',
            components:{
                'Head':HeadNav,
                'Main':MetroGraph,
                'Aside':AsideNav,
                'Search':SearchDiv,
            }
        }
    ]
}
)
export default router;