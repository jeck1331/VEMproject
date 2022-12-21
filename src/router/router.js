import { createRouter, createWebHistory } from 'vue-router'
import About from "@/components/About";
import Home from "@/components/Home";
import Charter from "@/components/Charter";
import Persons from "@/components/Persons";
import News from "@/components/News";
import Vote from "@/components/Vote";
import Reception from "@/components/Reception";
import PhotoGallery from "@/components/PhotoGallery";
import Login from "@/components/Login";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            props: { title: 'Главная' },
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            props: { title: 'О партии' }
        },
        {
            path: '/persons',
            name: 'persons',
            component: Persons,
            props: { title: 'Лица' }
        },
        {
            path: '/charter',
            name: 'charter',
            component: Charter,
            props: { title: 'Устав' }
        },
        {
            path: '/news',
            name: 'news',
            component: News,
            props: { title: 'Новости' }
        },
        {
            path: '/vote',
            name: 'vote',
            component: Vote,
            props: { title: 'Голосование' }
        },
        {
            path: '/reception',
            name: 'reception',
            component: Reception,
            props: { title: 'Приемная' }
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: PhotoGallery,
            props: { title: 'Фотогаллерея' }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            props: { title: 'Вход / Регистрация' }
        }
    ]
})

export default router
