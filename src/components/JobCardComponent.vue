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
        <q-card-actions>
            <q-btn>Show details</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    job: {
        type: Object,
        required: true
    },
    iconColor: {
        type: String,
        default: '#642b73'
    }
});

const icons = ref({
    category: 'fas fa-shapes',
    hourlyRate: 'fas fa-coins',
    location: 'fas fa-location-dot',
    contactInfo: 'fas fa-address-book'
});
</script>

<style scoped>
.job-card {
    padding: 15px 30px;
    width: 300px;
    background-color: #643f7d;
}

.text-h6 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
}

.icon {
    padding-right: 15px;
}

.row-item {
    margin-bottom: 10px;
}
</style>
