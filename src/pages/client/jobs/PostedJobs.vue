<template>
    <div class="q-pa-md alignment-wrapper">
        <div class="alignment-content">
            <div v-if="!loading && postedJobs.length === 0" class="no-jobs text-subtitle2">
                You haven't posted any jobs yet.
            </div>

            <div v-if="loading" class="q-mt-md">
                <q-spinner-dots color="white" size="lg" />
            </div>

            <div v-else>
                <div v-if="postedJobs.length > 0">
                    <div class="header">
                        <div class="text-h4">All Jobs You Have Posted</div>
                        <div class="text-subtitle2">Review your posted jobs and manage candidate applications.</div>
                    </div>

                    <q-markup-table separator="horizontal" flat bordered class="q-mt-md jobs-table">
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
                                <td class="text-center larger-table-text">
                                    <q-icon name="circle" :color="jobStatusColor(job.status)" size="xs" />
                                </td>
                                <td class="text-center button-group">
                                    <q-btn
                                        size="sm"
                                        icon="edit"
                                        @click="viewDetails(job.id)"
                                        color="cyan-9"
                                        class="q-mx-sm"
                                        padding="7px 10px"
                                    >
                                        <q-tooltip
                                            class="bg-cyan-9"
                                            anchor="top middle"
                                            self="bottom middle"
                                            :offset="[10, 10]"
                                            >View posted job details</q-tooltip
                                        ></q-btn
                                    >
                                    <q-btn
                                        size="sm"
                                        icon="fas fa-users"
                                        @click="viewCandidates(job.id)"
                                        color="teal-4"
                                        class="q-mx-sm"
                                        padding="7px 10px"
                                    >
                                        <q-tooltip
                                            class="bg-teal-4"
                                            anchor="top middle"
                                            self="bottom middle"
                                            :offset="[10, 10]"
                                            >View your candidates</q-tooltip
                                        ></q-btn
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </q-markup-table>
                </div>
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
        viewDetails(jobId) {
            let user = JSON.parse(sessionStorage.getItem('user'));
            if (user && user.type) {
                this.$router.push(`/client/${user.type}/posted-jobs/${jobId}/details`);
            } else {
                console.error('User type is undefined or user not found');
            }
        },
        viewCandidates(jobId) {
            let user = JSON.parse(sessionStorage.getItem('user'));
            if (user && user.type) {
                this.$router.push(`/client/${user.type}/posted-jobs/${jobId}/candidates`);
            } else {
                console.error('User type is undefined or user not found');
            }
        },
        async fetchJobs() {
            this.loading = true;
            await this.$api
                .get('/client/jobs/created')
                .then((response) => {
                    this.postedJobs = response.data.jobs;
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
        },
        jobStatusColor(status) {
            return status === 'active' ? 'green' : 'red';
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
    height: 80vh;
    padding: 20px;
}

.alignment-content {
    text-align: center;
    max-width: 1000px;
}

.header {
    margin-bottom: 20px;
}

.no-jobs {
    margin-top: 200px;
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
