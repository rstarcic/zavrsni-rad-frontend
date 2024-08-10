<template>
    <div class="alignment">
        <q-spinner v-if="loading" color="white" size="lg" :thickness="10" />
        <div class="card-container">
            <current-job-card-component
                v-for="application in applications"
                :key="application.id"
                :job="application.JobAd"
                :application="application"
                :client="application.JobAd.Client"
                @job-done="handleContractSigned"
            />
        </div>
        <div v-if="!loading && applications.length === 0" class="text-subtitle2">
            You currently have no ongoing jobs.
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import CurrentJobCardComponent from 'src/components/CurrentJobCardComponent.vue';
export default {
    components: {
        CurrentJobCardComponent
    },
    data() {
        return {
            applications: [],
            loading: false
        };
    },
    methods: {
        async handleContractSigned({ job, client }) {
            debugger;
            try {
                await this.createInvoice(job.id, client.id);
                this.fetchJobAndApplicationData();
            } catch (error) {
                console.error('Error handling job done:', error);
            }
        },
        async fetchJobAndApplicationData() {
            this.loading = true;
            await this.$api
                .get('/service-provider/applications/current')
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
        async createInvoice(jobId, clientId) {
            try {
                debugger;
                const response = await this.$api.post(
                    `/service-provider/jobs/${jobId}/client/${clientId}/create-invoice`
                );
                if (response.data.success) {
                    Notify.create({
                        color: 'green-5',
                        textColor: 'white',
                        icon: 'check',
                        message: `Stripe invoice for ${jobId} created successfully.`
                    });
                }
            } catch (error) {
                console.error('Error creating Stripe invoice:', error);
                Notify.create({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'error',
                    message: 'Failed to create Stripe invoice for ${jobId}.'
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
