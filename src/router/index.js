import { createRouter, createWebHistory } from "vue-router";
import HomeIndex from '../pages/HomeIndex.vue'
import TodosIndex from '../pages/todos/TodosIndex.vue'
import AboutIndex from '../pages/AboutIndex.vue'
import ProfileIndex from '../pages/ProfileIndex.vue'
import Todo from '../pages/todos/_id.vue'

// vue에서 화면을 연결하는 경우에 활용 
const router  = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeIndex
        },
        {
            path: '/todos',
            name: 'Todos',
            component: TodosIndex
        },
        {
            path: '/about',
            name: 'About',
            component: AboutIndex
        },
        {
            path: '/profile',
            name: 'Profile',
            component: ProfileIndex
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo
        }
    ]
});

export default router;