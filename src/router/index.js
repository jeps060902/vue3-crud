import {createRouter, createWebHistory} from 'vue-router' 
const routes=[ 
    {
        path:'/',
        name:'home',
        component : () => import('../views/home.vue')
    },
    {
        path:'/Alumni',
        name:'Alumni.index',
        component : () => import('../views/Alumni/index.vue')
    },
    {
        path:'/Create',
        name:'Alumni.create',
        component : () => import('../views/Alumni/create.vue')
    },
    {
        path:'/edit/:id',
        name:'Alumni.edit',
        component : () => import('../views/Alumni/edit.vue')
    }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Lalu ekspor
export default router