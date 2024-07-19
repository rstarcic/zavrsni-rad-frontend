<template>
    <div class="q-pa-md alignment-wrapper">
        <div class="alignment-content">
            <div class="header">
                <div class="text-h4">All Jobs You Have Posted</div>
                <div class="text-subtitle2">Review your posted jobs and manage candidate applications.</div>
            </div>

            <div v-if="loading" class="q-mt-md">
                <q-spinner-dots color="white" size="lg" />
            </div>

            <div v-else>
                <div v-if="postedJobs.length === 0" class="text-h4">You haven't posted any jobs yet.</div>

                <q-markup-table v-else separator="horizontal" flat bordered class="q-mt-md jobs-table">
                    <thead>
                        <tr>
                            <th class="text-center larger-table-text">Title</th>
                            <th class="text-center larger-table-text">Category</th>
                            <th class="text-center larger-table-text">Created Date</th>
                            <th class="text-center larger-table-text">Status</th>
                            <th class="text-center larger-table-text">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="job in postedJobs" :key="job.id">
                            <td class="text-center larger-table-text">{{ job.title }}</td>
                            <td class="text-center larger-table-text">{{ job.category }}</td>
                            <td class="text-center larger-table-text">{{ job.createdAt }}</td>
                            <td class="text-center larger-table-text">{{ job.status }}</td>
                            <td class="text-center button-group">
                                <q-btn
                                    size="sm"
                                    label="View job details"
                                    @click="viewDetails(job.id)"
                                    color="cyan-9"
                                    class="q-mx-sm"
                                    padding="7px 10px"
                                />
                                <q-btn
                                    size="sm"
                                    label="View candidates"
                                    @click="viewCandidates(job.id)"
                                    color="secondary"
                                    class="q-mx-sm"
                                    padding="7px 10px"
                                />
                            </td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </div>
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
export default {
    data() {
        return {
            postedJobs: [],
            loading: true
        };
    },
    methods: {
        sendToAnotherRoute() {
            let user = JSON.parse(sessionStorage.getItem('user'));
            if (user && user.type) {
                if (user.type === 'individual') {
                    this.$router.push(`/client/${user.type}/post-jobs`);
                } else if (user.type === 'business') {
                    this.$router.push(`/client/${user.type}/post-jobs`);
                } else {
                    console.error('Unknown user type');
                }
            } else {
                console.error('User not found in sessionStorage or user type is undefined');
            }
        },
        viewDetails(jobId) {
            console.log('View details for job:', jobId);
        },
        viewCandidates(jobId) {
            console.log('View candidates for job:', jobId);
        },
        async fetchJobs() {
            this.loading = true;
            await this.$api
                .get('/client/jobs')
                .then((response) => {
                    console.log(this.postedJobs);
                    this.postedJobs = response.data.jobs;
                    console.log('Jobs fetched successfully:', response.data.jobs);
                })
                .catch((error) => {
                    console.error('Error fetching jobs:', error);
                    Notify.create({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'error',
                        message: 'Failed to fetch jobs.'
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    mounted() {
        this.fetchJobs();
    }
};
</script>

<style scoped>
.alignment-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
    padding: 20px;
}

.alignment-content {
    text-align: center;
    max-width: 1000px;
}

.header {
    margin-bottom: 20px;
}

.no-jobs-card {
    margin-top: 20px;
}

.jobs-table {
    margin-top: 20px;
}

.q-card-actions {
    justify-content: center;
}

.larger-table-text {
    font-size: 14px;
}
</style>
