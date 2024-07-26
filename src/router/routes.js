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
                path: 'settings',
                component: () => import('src/pages/client/client_profile_settings/ClientSettings.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            },
            {
                path: 'search-jobs',
                component: () => import('src/pages/client/jobs/JobSearch.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            },
            {
                path: 'job/:id',
                component: () => import('src/pages/client/jobs/JobDetails.vue'),
                props: (route) => ({
                    id: route.params.id,
                    role: 'client'
                }),
                meta: { requiresRole: 'client' }
            },
            {
                path: 'post-jobs',
                component: () => import('src/pages/client/jobs/JobCreation.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            },
            {
                path: 'posted-jobs',
                component: () => import('src/pages/client/jobs/PostedJobs.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            },
            {
                path: 'posted-jobs/:jobId/details',
                component: () => import('src/pages/client/jobs/PostedJobDetail.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            },
            {
                path: 'posted-jobs/:jobId/candidates',
                component: () => import('src/pages/client/service_provider_profile/ServiceProviderProfileSummary.vue'),
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
                component: () => import('src/pages/service_provider/jobs/JobSearch.vue'),
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'job/:id',
                component: () => import('src/pages/service_provider/jobs/JobDetails.vue'),
                props: (route) => ({
                    id: route.params.id,
                    role: 'service provider'
                }),
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'applied-jobs',
                component: () => import('src/pages/service_provider/jobs/AppliedJobs.vue'),
                props: true,
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'profile',
                component: () =>
                    import('src/pages/service_provider/service_provider_profile_settings/ServiceProviderProfile.vue'),
                name: 'service-provider-profile',
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'settings',
                component: () =>
                    import('src/pages/service_provider/service_provider_profile_settings/ServiceProviderSettings.vue'),
                meta: { requiresRole: 'service provider' }
            }
        ]
    },
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('src/pages/UnauthorizedPage.vue')
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
];

export default routes;
