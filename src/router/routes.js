import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/HomePage.vue') },
            { path: '/login', component: () => import('src/pages/Login.vue') }
        ]
    },
    {
        path: '/signup',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'client',
                component: () => import('src/pages/client/signup/ClientSignup.vue'),
                props: { clientType: 'individual' }
            },
            {
                path: 'service-provider',
                component: () => import('pages/service_provider/signup/ServiceProviderSignup.vue')
            }
        ]
    },
    {
        path: '/client/:type',
        component: () => import('layouts/ClientLayout.vue'),
        props: true,
        children: [
            {
                path: 'profile',
                component: () => import('src/pages/client/client_profile_settings/ClientProfile.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            },
            {
                path: 'search-jobs',
                component: () => import('src/pages/SearchJobs.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            }
        ]
    },
    {
        path: '/service-provider',
        component: () => import('layouts/ServiceProviderLayout.vue'),
        children: [
            {
                path: 'search-jobs',
                component: () => import('src/pages/SearchJobs.vue'),
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'profile',
                component: () =>
                    import('src/pages/service_provider/service_provider_profile_settings/ServiceProviderProfile.vue'),
                name: 'service-provider-profile',
                meta: { requiresRole: 'service provider' }
            }
        ]
    },
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('src/components/UnauthorizedComponent.vue')
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

function hasRole(role) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user && user.role === role;
}

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresRole)) {
        const role = to.meta.requiresRole;
        if (!hasRole(role)) {
            next({ path: '/unauthorized' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default routes;
