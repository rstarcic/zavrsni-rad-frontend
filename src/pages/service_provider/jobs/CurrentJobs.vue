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
        async handleContractSigned() {
            debugger;
            try {
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
