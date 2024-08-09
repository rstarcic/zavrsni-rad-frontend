<template>
    <div class="alignment">
        <q-spinner v-if="loading" color="white" size="lg" :thickness="10" />
        <div class="card-container">
            <applied-job-card-component
                v-for="application in applications"
                :key="application.id"
                :job="application.JobAd"
                :application="application"
                :client="application.JobAd.Client"
                @contract-signed="handleContractSigned"
            />
        </div>
        <div v-if="!loading && applications.length === 0" class="text-subtitle2">
            You currently have no jobs applied for.
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import AppliedJobCardComponent from 'src/components/AppliedJobCardComponent.vue';
export default {
    components: {
        AppliedJobCardComponent
    },
    data() {
        return {
            applications: [],
            loading: false
        };
    },
    methods: {
        async handleContractSigned({ job }) {
            debugger;
            try {
                await this.createProductPriceAndCustomer(job);
                this.fetchJobAndApplicationData();
            } catch (error) {
                console.error('Error handling contract signing:', error);
            }
        },
        async fetchJobAndApplicationData() {
            debugger;
            this.loading = true;
            await this.$api
                .get('/service-provider/applications/applied')
                .then((response) => {
                    this.applications = response.data.applications;
                    console.log('Applications and job data fetched successfully:', response.data.applications);
                })
                .catch((error) => {
                    console.error('Error fetching jobs:', error);
                    Notify.create({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'error',
                        message: 'Failed to fetch applications.'
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async createProductPriceAndCustomer(job) {
            try {
                debugger;
                const response = await this.$api.post(`/service-provider/jobs/${job.id}/create-stripe-product`);
                if (response.data.success) {
                    Notify.create({
                        color: 'green-5',
                        textColor: 'white',
                        icon: 'check',
                        message: 'Stripe product and price created successfully.'
                    });
                }
            } catch (error) {
                console.error('Error creating Stripe product and price:', error);
                Notify.create({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'error',
                    message: 'Failed to create Stripe product and price.'
                });
            }
        }
    },
    mounted() {
        this.fetchJobAndApplicationData();
    }
};
</script>

<style scoped>
.alignment {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
}
</style>
