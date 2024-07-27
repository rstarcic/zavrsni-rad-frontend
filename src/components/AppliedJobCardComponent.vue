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
            <q-btn icon="fas fa-file-contract" size="md" color="grey-9" dense>
                <q-tooltip class="bg-grey-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Sign contract
                </q-tooltip>
            </q-btn>
            <q-btn icon="fas fa-eye" size="md" color="grey-9" dense @click="showDetails">
                <q-tooltip class="bg-grey-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Show job details you've applied to
                </q-tooltip>
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
const showDetails = () => {
    router.push({ path: `/service-provider/jobs/${props.job.id}` });
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
</style>
