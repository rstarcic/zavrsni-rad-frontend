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
            <q-btn
                :icon="'fas fa-file-contract'"
                :size="'md'"
                :color="buttonConfig.color"
                :disabled="buttonConfig.disabled"
                :dense="true"
                @click="showDialog = true"
            >
                <q-tooltip
                    v-if="buttonConfig.tooltip"
                    class="bg-grey-7"
                    :anchor="'top middle'"
                    :self="'bottom middle'"
                    :offset="[10, 10]"
                >
                    {{ buttonConfig.tooltip }}
                </q-tooltip>
            </q-btn>
            <q-dialog v-model="showDialog" persistent>
                <q-card class="q-card">
                    <q-card-section class="q-card-section-title">
                        <div class="row items-center justify-between">
                            <div class="col">
                                <h6 class="text-center title">Sign contract</h6>
                            </div>
                            <div class="col-auto">
                                <q-btn icon="close" flat round dense @click="showDialog = false"></q-btn>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section class="q-card-section">
                        <div class="signature-container">
                            <vue-signature ref="signature" :sigOption="option" :w="'100%'" :h="'200px'"></vue-signature>
                        </div>
                    </q-card-section>
                    <q-card-actions align="center">
                        <q-btn icon="description" label="Generate" color="primary" @click="save"></q-btn>
                        <q-btn size="md" icon="clear" label="Clear" color="primary" @click="clear"></q-btn>
                        <q-btn icon="undo" label="Undo" color="primary" @click="undo"></q-btn>
                    </q-card-actions>
                </q-card>
            </q-dialog>
            <q-btn icon="fas fa-eye" size="md" color="grey-9" dense @click="showDetails">
                <q-tooltip class="bg-grey-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Show job details you've applied to
                </q-tooltip>
            </q-btn>
            <q-btn v-if="contractSigned" icon="fas fa-file-download" size="md" color="grey-9" @click="fetchContract">
                <q-tooltip class="bg-grey-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Download contract
                </q-tooltip>
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { computed, ref, inject, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Notify } from 'quasar';
import VueSignature from 'vue-signature';
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
const option = {
    penColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)'
};

const router = useRouter();
const route = useRoute();
const $api = inject('$api');
const showDialog = ref(false);
const signature = ref(null);
const contractSigned = ref(false);

onMounted(async () => {
    try {
        const response = await $api.get(`/service-provider/jobs/${props.job.id}/contract/signed`);
        contractSigned.value = response.data?.signed;
    } catch (error) {
        console.error('Failed to check contract status:', error);
    }
});

const showDetails = () => {
    router.push({ path: `/service-provider/jobs/${props.job.id}` });
};

const buttonConfig = computed(() => {
    const status = props.application.applicationStatus;
    if (contractSigned.value) {
        return {
            color: 'grey-9',
            tooltip: 'Contract is already signed',
            disabled: true
        };
    } else if (status === 'selected') {
        return {
            color: 'green',
            tooltip: 'Sign the contract for your selected job',
            disabled: false
        };
    } else if (status === 'rejected') {
        return {
            color: 'red-8',
            tooltip: 'You have been rejected for this job',
            disabled: true
        };
    } else {
        return {
            color: 'blue-7',
            tooltip: 'Waiting for client decision',
            disabled: true
        };
    }
});

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

const save = async () => {
    debugger;
    const dataURL = signature.value.save();
    console.log('props.client', props.client.id);
    try {
        const response = await $api.post(
            `/service-provider/jobs/${props.job.id}/client/${props.client.id}/generate`,
            {
                signature: dataURL
            },
            {
                responseType: 'blob'
            }
        );
        console.log(response);
        debugger;
        const downloadUrl = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'contract.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
        showDialog.value = false;
    } catch (error) {
        console.error('Error saving signature and generating contract:', error);
        Notify.create({
            type: 'negative',
            message: 'An error occurred while generating or downloading the contract.'
        });
    }
};

const clear = () => {
    signature.value.clear();
};

const undo = () => {
    if (signature.value) {
        signature.value.undo();
    } else {
        console.error('Signature pad not found');
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

.q-card-section-title {
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    padding: 5px;
}

.signature-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
}
</style>
