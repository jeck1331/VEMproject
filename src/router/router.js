import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import About from "@/components/About";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HelloWorld
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
})

export default router
