<template>
    <q-card class="job-card text-white">
        <q-card-section>
            <div class="text-h6"><q-icon :name="icons.title" :color="iconColor" class="icon" /> {{ job.title }}</div>
            <div class="text-left row-item">
                <q-icon :name="icons.category" :color="iconColor" class="icon" />{{ job.category }}
            </div>
            <div class="text-left row-item">
                <q-icon :name="icons.hourlyRate" :color="iconColor" class="icon" />{{ job.hourlyRate }}
                {{ job.paymentCurrency }}/h
            </div>
            <div class="text-left row-item">
                <q-icon :name="icons.location" :color="iconColor" class="icon" />{{ job.location }}
            </div>
            <div class="text-left row-item">
                <q-icon :name="icons.contactInfo" :color="iconColor" class="icon" />{{ job.contactInfo }}
            </div>
        </q-card-section>
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
    iconColor: {
        type: String,
        default: '#642b73'
    },
    role: {
        type: String,
        default: 'client'
    },
    type: {
        type: String,
        required: false
    }
});

const icons = ref({
    category: 'fas fa-tag',
    hourlyRate: 'fas fa-coins',
    location: 'fas fa-location-dot',
    contactInfo: 'fas fa-address-book'
});

const router = useRouter();
const showDetails = () => {
    if (props.role === 'service provider') {
        router.push({ path: `/service-provider/jobs/${props.job.id}` });
    } else if (props.role === 'client') {
        router.push({ path: `/client/${props.type}/jobs/${props.job.id}` });
    }
};
</script>

<style scoped>
.job-card {
    padding: 15px 30px;
    width: 300px;
    background-color: #eee7e7;
}

.text-h6 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    color: black;
}

.text-left {
    color: black;
}

.icon {
    padding-right: 15px;
}

.row-item {
    margin-bottom: 10px;
}
.action-section {
    background-color: rgb(106, 25, 126);
}
</style>
