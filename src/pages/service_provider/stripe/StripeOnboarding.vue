<template>
    <div class="alignment">
        <q-spinner v-if="loading" size="lg" color="white" :thickness="10" />

        <div v-if="!loading && onboardingComplete">
            <q-card class="q-mt-md">
                <q-card-section class="text-center">
                    <q-icon name="fab fa-stripe" size="xl" class="q-mb-md"></q-icon>
                    <div class="text-h6 q-mb-md">Onboarding Complete</div>
                    <p class="q-mt-lg">Your Stripe account has been successfully set up!</p>
                </q-card-section>
            </q-card>
        </div>

        <div v-if="!loading && !onboardingComplete">
            <q-card class="q-mt-md">
                <q-card-section class="text-center">
                    <q-icon name="fab fa-stripe" size="xl" class="q-mb-md"></q-icon>
                    <div class="text-h6 q-mb-md">Onboarding Interrupted</div>
                    <p class="q-mt-lg">It looks like your onboarding process was interrupted. Please try again.</p>
                    <q-btn color="purple-7" @click="retryOnboarding" label="Retry Onboarding" />
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            onboardingComplete: false
        };
    },
    async mounted() {
        const mode = this.$route.query.mode;

        if (mode === 'return') {
            await this.handleReturn();
        } else if (mode === 'refresh') {
            await this.handleRefresh();
        } else {
            this.$q.notify({
                color: 'negative',
                position: 'bottom',
                message: 'Invalid operation mode.',
                icon: 'error'
            });
            this.loading = false;
        }
    },
    methods: {
        async handleReturn() {
            try {
                this.loading = true;
                const accountId = this.$route.query.account_id;
                const response = await this.$api.get(`/service-provider/stripe-status/${accountId}`);
                this.onboardingComplete = response.data.onboardingComplete;
            } catch (error) {
                this.$q.notify({
                    color: 'negative',
                    position: 'bottom',
                    message: 'Failed to verify onboarding status: ' + error.message,
                    icon: 'error'
                });
            } finally {
                this.loading = false;
            }
        },
        async handleRefresh() {
            this.loading = true;
            this.$q.notify({
                color: 'warning',
                position: 'bottom',
                message: 'Your Stripe onboarding process was interrupted. Please try again.',
                icon: 'warning',
                timeout: 5000
            });
            const retry = confirm('Would you like to retry the Stripe onboarding process?');
            if (retry) {
                await this.retryOnboarding();
            }
        },
        async retryOnboarding() {
            try {
                this.loading = true;
                const response = await this.$api.post(`/service-provider/stripe-connected-account`);
                if (response.data && response.data.url) {
                    window.location.href = response.data.url;
                } else {
                    throw new Error('Failed to get Stripe onboarding URL.');
                }
            } catch (error) {
                this.$q.notify({
                    color: 'negative',
                    position: 'bottom',
                    message: 'Failed to restart onboarding: ' + error.message,
                    icon: 'error'
                });
            }
        }
    }
};
</script>

<style scoped>
.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}
.q-card-section.text-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.q-card {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
.q-mt-md {
    margin-top: 16px;
}
.q-mt-lg {
    margin-top: 24px;
}
.text-h6 {
    font-size: 1.25rem;
    font-weight: 600;
}
.q-mb-md {
    margin-bottom: 16px;
}
</style>
