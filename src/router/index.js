import { createRouter,createWebHistory } from "vue-router";
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
                'Main':MetroGraph,
                'Aside':AsideNav,
                'Search':SearchDiv,
                
            }
        },
    ]
}
)
export default router;