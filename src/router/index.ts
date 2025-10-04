import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/HomeView.vue'),
            meta: { title: 'Clearless - Home' },
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/LoginView.vue'),
            meta: { requiresGuest: true, title: 'Clearless - Login' },
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/RegisterView.vue'),
            meta: { requiresGuest: true, title: 'Clearless - Register' },
        },
        {
            path: '/thread/:id',
            name: 'Thread',
            component: () => import('@/views/ThreadView.vue'),
            props: true,
            meta: { requiresAuth: true, title: 'Clearless - Thread' },
        },
        {
            path: '/thread/create',
            name: 'CreateThread',
            component: () => import('@/views/CreateThreadView.vue'),
            meta: { requiresAuth: true, title: 'Clearless - Create Thread' },
        },
        {
            path: '/profile',
            name: 'Profile',
            component: () => import('@/views/ProfileView.vue'),
            meta: { requiresAuth: true, title: 'Clearless - Profile' },
        },
    ],
});

router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title as string;
    } else {
        document.title = 'Clearless';
    }
});

router.beforeEach(async (to, _, next) => {
    const authStore = useAuthStore();

    await authStore.checkAuth();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
