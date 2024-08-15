<template>
    <div class="alignment">
        <q-spinner v-if="loading" size="lg" color="white" :thickness="10" />

        <div v-if="!loading && paymentComplete">
            <q-card class="q-mt-md">
                <q-card-section class="text-center">
                    <q-icon name="fab fa-stripe" size="xl" class="q-mb-md"></q-icon>
                    <div class="text-h6 q-mb-md">{{ message }}</div>

                    <router-link :to="`/client/${this.clientType}/posted-jobs/${this.jobId}/candidates`">
                        <q-btn color="purple-7" label="Go to Candidates" icon="arrow_forward" class="q-mt-md" v-ripple>
                            <q-tooltip class="bg-purple text-body2"> Click here and download your invoice. </q-tooltip>
                        </q-btn>
                    </router-link>
                </q-card-section>
            </q-card>
        </div>

        <div v-if="!loading && !paymentComplete">
            <q-card class="q-mt-md">
                <q-card-section class="text-center">
                    <q-icon name="fab fa-stripe" size="xl" class="q-mb-md"></q-icon>
                    <div class="text-h6 q-mb-md">Payment Interrupted</div>
                    <q-btn color="purple-7" @click="retryPayment" label="Retry Payment" />
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentStatus',
    data() {
        return {
            sessionId: null,
            jobId: null,
            paymentFailed: false,
            loading: false,
            message: null,
            paymentComplete: null,
            clientType: null
        };
    },
    created() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.clientType = user.type;
    },
    async mounted() {
        this.sessionId = this.$route.query.session_id;
        this.jobId = this.$route.query.jobId;

        if (this.sessionId && this.jobId) {
            await this.checkPaymentStatus();
        } else {
            this.message = 'Missing session ID or job ID.';
            this.loading = false;
        }
    },
    methods: {
        async retryPayment() {
            this.loading = true;
            try {
                debugger;
                console.log('this.jobId', this.jobId);
                const response = await this.$api.post(`/client/jobs/${this.jobId}/pay`);

                if (response.data.success) {
                    window.location.href = response.data.url;
                } else {
                    this.message = 'Failed to retry payment.';
                }
            } catch (error) {
                console.error('Error retrying payment:', error);
                this.message = 'Error retrying payment.';
            } finally {
                this.loading = false;
            }
        },
        async checkPaymentStatus() {
            this.loading = true;
            if (this.sessionId) {
                try {
                    debugger;
                    const response = await this.$api.post('/client/confirm-payment', {
                        session_id: this.sessionId,
                        jobId: this.jobId
                    });

                    if (response.data.success) {
                        this.paymentComplete = true;
                        this.message = 'Payment completed successfully!';
                    } else {
                        this.paymentComplete = false;
                        this.message = 'Payment failed. Please try again.';
                    }
                } catch (error) {
                    this.paymentComplete = false;
                    this.message = 'Error checking payment status.';
                    console.error('Error:', error);
                } finally {
                    this.loading = false;
                }
            } else {
                this.message = 'No session ID provided.';
                this.loading = false;
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
