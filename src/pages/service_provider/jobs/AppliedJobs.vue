<template>
    <div class="alignment">
        <div class="card-container">
            <applied-job-card-component
                v-for="application in applications"
                :key="application.id"
                :job="application.JobAd"
                :application="application"
                :client="application.JobAd.Client"
            />
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
            applications: []
        };
    },
    methods: {
        async fetchJobAndApplicationData() {
            this.loading = true;
            await this.$api
                .get('/service-provider/applications')
                .then((response) => {
                    debugger;
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
