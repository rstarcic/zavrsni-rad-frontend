<template>
    <div class="q-pa-md job-detail-card">
        <div v-if="loading" class="spinner-container">
            <q-spinner size="lg" color="white" :thickness="10" />
        </div>
        <q-card class="card-style" v-if="job && client">
            <q-card-section class="text-center">
                <div class="text-h5">{{ job.title }}</div>
                <div class="text-subtitle1 text-grey-6">{{ job.category }}</div>
            </q-card-section>

            <q-card-section>
                <q-list>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="work" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Job Type: {{ job.jobType }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-user-cog" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Work conditions: {{ job.workConditions }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-align-left" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label> Description: {{ job.description }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-graduation-cap" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Qualifications: {{ job.qualifications }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-tools" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Equipment Needed: {{ job.equipmentNeeded }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-money-bill-wave" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Payment: {{ job.hourlyRate }} {{ job.paymentCurrency }}/h</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-clock" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Working hours: {{ job.workingHours }} h</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-credit-card" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Payment method: {{ job.paymentMethod }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-map-marker-alt" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label> Location:{{ job.location }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-hourglass-half" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Duration: {{ job.duration }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-phone" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Contact Info: {{ job.contactInfo }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-calendar-alt" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Application Deadline: {{ job.applicationDeadline }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-calendar-check" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Work Deadline: {{ job.workDeadline }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-info-circle" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Status: <q-icon name="circle" :color="statusColor" size="xs" /></q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="fas fa-history" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Last updated: {{ job.updatedAt }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar class="cursor-pointer" style="border-radius: 50%">
                            <q-avatar @click="navigateToClientProfile()">
                                <q-tooltip class="bg-purple-7"> View Client Profile </q-tooltip>
                                <img :src="client.profileImage ? client.profileImage : defaultImage" />
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>
                                Created by:
                                <span v-if="client.type === 'individual'"
                                    >{{ client.firstName }} {{ client.lastName }}</span
                                >
                                <span v-else>{{ client.companyName }}</span>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-card-actions class="justify-center align-center">
                <q-btn class="apply-btn" size="md" flat @click="applyForJob(job.id)"> Apply </q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import image from 'src/assets/profile-account-unknown.jpg';
export default {
    props: {
        id: {
            type: String,
            required: false
        },
        role: {
            type: String,
            default: 'service provider'
        }
    },
    data() {
        return {
            job: null,
            client: null,
            defaultImage: image,
            loading: false
        };
    },
    async mounted() {
        this.fetchJobDetails();
    },
    computed: {
        statusColor() {
            return this.job.status === 'active' ? 'green' : 'red';
        }
    },
    methods: {
        async fetchJobDetails() {
            this.loading = true;
            this.$api
                .get(`/service-provider/jobs/${this.id}`)
                .then((response) => {
                    this.job = response.data.job;
                    this.client = response.data.client;
                    this.loading = false;
                })
                .catch((error) => {
                    console.error('There was an error fetching job details!', error);
                });
        },
        applyForJob() {
            const jobId = this.$route.params.id;
            this.$api
                .post(`/service-provider/jobs/${jobId}/applications`)
                .then((response) => {
                    console.log('Job response: ', response.data);
                    Notify.create({
                        message: response.data.message,
                        type: 'positive',
                        position: 'bottom'
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.data.message) {
                        Notify.create({
                            color: 'negative',
                            position: 'bottom',
                            message: error.response.data.message,
                            icon: 'error'
                        });
                    } else {
                        Notify.create({
                            color: 'negative',
                            position: 'bottom',
                            message: 'Failed to apply to a job: ' + error.message,
                            icon: 'error'
                        });
                    }
                    console.error('There was an error applying to a job!', error);
                });
            console.log(`Applying for job ${jobId}`);
        },
        navigateToClientProfile() {
            this.$router.push({
                name: 'ClientProfileDetail',
                params: { clientId: this.client.id }
            });
        }
    }
};
</script>

<style scoped>
.job-detail-card {
    max-width: 600px;
    margin: 0 auto;
}
.card-style {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff1fa;
}
.text-center {
    text-align: center;
}
.q-mb-md {
    margin-bottom: 1rem;
}
.q-pa-md {
    padding: 1rem;
}
.q-item {
    margin: 0.5rem 0;
}
.apply-btn {
    background-color: #8462a5;
    color: white;
}
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    width: 100%;
}
.q-avatar {
    cursor: pointer;
}
.cursor-pointer:hover {
    transform: scale(1.1);
    transition: transform 0.4s ease;
}
</style>
