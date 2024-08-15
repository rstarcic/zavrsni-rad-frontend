<template>
    <q-card v-if="job && application" class="job-card text-white">
        <q-card-section>
            <div class="text-h6">{{ job.title }}</div>
            <div class="text-left row-item">
                <q-icon :name="icons.category" class="icon" />
                Category: {{ job.category }}
            </div>
            <div class="text-left row-item">
                <q-icon :name="icons.hourlyRate" class="icon" />
                Hourly Rate: {{ job.hourlyRate }} {{ job.paymentCurrency }}/h
            </div>
            <div class="text-left row-item">
                <q-icon :name="icons.location" class="icon" />
                Location: {{ job.location }}
            </div>
            <div class="text-left row-item">
                <q-icon :name="icons.contactInfo" class="icon" />
                Contact Info: {{ job.contactInfo }}
            </div>
            <div class="text-left row-item" v-if="client.type === 'individual'">
                <q-icon :name="icons.individual" class="icon" />
                Created by: {{ client.firstName }} {{ client.lastName }}
            </div>
            <div class="text-left row-item" v-else>
                <q-icon :name="icons.business" class="icon" />
                Created by: {{ client.companyName }}
            </div>
            <q-separator inset class="my-separator" />
            <div class="text-left row-item">
                <q-icon :name="icons.applicationStatus" class="icon" />
                Application Status: {{ application.applicationStatus }}
            </div>
            <div class="text-left row-item">
                <q-icon :name="icons.jobStatus" class="icon" />
                Job Status: {{ application.jobStatus }}
            </div>
            <div class="text-left row-item">
                <q-icon :name="icons.appliedAt" class="icon" />
                Applied At: {{ application.appliedAt }}
            </div>
        </q-card-section>
        <q-separator inset />
        <q-card-actions align="center">
            <q-btn icon="fas fa-check" size="md" color="green" dense @click="jobDone">
                <q-tooltip class="bg-grey-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Click when job is done
                </q-tooltip>
            </q-btn>
            <q-btn icon="fas fa-eye" size="md" color="grey-9" dense @click="showDetails">
                <q-tooltip class="bg-grey-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Show job details you've applied to
                </q-tooltip>
            </q-btn>
            <q-btn icon="fas fa-file-download" size="md" color="grey-9" @click="fetchContract">
                <q-tooltip class="bg-grey-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Download contract
                </q-tooltip>
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

const emit = defineEmits(['job-done']);
const props = defineProps({
    job: {
        type: Object,
        required: true
    },
    application: {
        type: Object,
        required: true
    },
    client: { type: Object, required: true }
});

const icons = ref({
    category: 'fas fa-tag',
    hourlyRate: 'fas fa-coins',
    location: 'fas fa-location-dot',
    contactInfo: 'fas fa-address-book',
    individual: 'fas fa-user',
    business: 'fas fa-building',
    applicationStatus: 'fas fa-clipboard-check',
    jobStatus: 'fas fa-briefcase',
    appliedAt: 'fas fa-calendar-alt'
});

const router = useRouter();
const $api = inject('$api');

const showDetails = () => {
    router.push({ path: `/service-provider/jobs/${props.job.id}` });
};

const fetchContract = async () => {
    try {
        const response = await $api.get(`/service-provider/jobs/${props.job.id}/generate`, {
            responseType: 'blob'
        });
        console.log(response);
        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'contract.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } else {
            Notify.create({
                type: 'negative',
                message: 'Failed to download contract'
            });
        }
    } catch (error) {
        console.error('Error downloading contract:', error);
        Notify.create({
            type: 'negative',
            message: 'Error downloading contract'
        });
    }
};

const jobDone = async () => {
    try {
        const response = await $api.patch(`/service-provider/applications/${props.job.id}/complete`);
        if (response && response.status === 200) {
            Notify.create({
                color: 'purple',
                message: '🎉 Congratulations! You completed your job. You can now wait for your payment 🚀',
                position: 'bottom',
                timeout: 4000
            });
            emit('job-done');
        } else {
            Notify.create({
                type: 'negative',
                message: 'Failed to mark job as completed.'
            });
        }
    } catch (error) {
        console.error('Error updating job status:', error);
        Notify.create({
            type: 'negative',
            message: 'Error setting job as done. Try again'
        });
    }
};
</script>

<style scoped>
.job-card {
    padding: 15px 30px;
    width: 320px;
    background-color: #fff1fa;
}
.text-left {
    color: black;
    font-weight: 350;
}
.text-h6 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    color: black;
}

.icon {
    padding-right: 10px;
}

.row-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.q-btn {
    padding: 5px 12px;
}

.my-separator {
    margin-top: 16px;
    margin-bottom: 16px;
}

.title {
    margin: 0;
    font-size: 16px;
}
</style>
