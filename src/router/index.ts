import { createRouter, createWebHistory } from "vue-router";
import RouterBypass from '../pages/Routerbypass/RouterBypass.vue'
import Cookies from 'js-cookie'

const routes = [
    {
        path: '/',
        name: 'auth',
        component: () => import('../pages/Auth/Auth.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../layouts/AppLayout.vue'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('../pages/Dashboard/Dashboard.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const authenticated = Cookies.get('auth_token')

    if (!authenticated && to.meta.requiresAuth) {
        return { name: 'auth' }
    } else if (authenticated && !to.meta.requiresAuth) {
        return { name: 'dashboard' }
    } else {
        return;
    }

})

export default router