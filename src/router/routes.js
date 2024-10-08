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
                path: 'jobs/:id',
                component: () => import('src/pages/client/jobs/JobDetails.vue'),
                props: (route) => ({
                    id: route.params.id,
                    role: 'client'
                }),
                meta: { requiresRole: 'client' }
            },
            {
                path: 'jobs/:id/client/:clientId',
                name: 'OtherClientProfileDetail',
                component: () => import('src/pages/client/other_client_profile/ClientProfileDetail.vue'),
                props: true,
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
            },
            {
                path: 'posted-jobs/:jobId/candidates/:candidateId',
                name: 'ServiceProviderProfileDetail',
                component: () => import('src/pages/client/service_provider_profile/ServiceProviderProfileDetail.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            },
            {
                path: 'generated-contracts',
                component: () => import('src/pages/client/documents/JobDocumentList.vue'),
                props: true,
                meta: { requiresRole: 'client' }
            },
            {
                path: 'payment-status',
                name: 'PaymentStatus',
                component: () => import('src/pages/client/stripe/StripePaymentStatusPage.vue'),
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
                path: 'jobs/:id',
                component: () => import('src/pages/service_provider/jobs/JobDetails.vue'),
                props: (route) => ({
                    id: route.params.id,
                    role: 'service provider'
                }),
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'jobs/:id/client/:clientId',
                name: 'ClientProfileDetail',
                component: () => import('src/pages/service_provider/client_profile/ClientProfileDetail.vue'),
                props: true,
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'applied-jobs',
                component: () => import('src/pages/service_provider/jobs/AppliedJobs.vue'),
                props: true,
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'current-jobs',
                component: () => import('src/pages/service_provider/jobs/CurrentJobs.vue'),
                props: true,
                meta: { requiresRole: 'service provider' }
            },
            {
                path: 'completed-jobs',
                component: () => import('src/pages/service_provider/jobs/CompletedJobs.vue'),
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
            },
            {
                path: ':serviceProviderId/stripe-onboarding',
                component: () => import('src/pages/service_provider/stripe/StripeOnboarding.vue'),
                props: true,
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
