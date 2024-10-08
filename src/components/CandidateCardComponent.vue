<template>
    <div class="q-pa-md">
        <q-card class="my-card" flat bordered>
            <q-card-section class="row no-wrap">
                <q-img
                    class="col-4"
                    :src="serviceProviderData.profileImage ? serviceProviderData.profileImage : defaultImage"
                    style="width: 200px; height: 180px"
                />
                <div class="col">
                    <div class="q-px-md">
                        <div class="first-last-name-text">
                            {{ serviceProviderData.firstName }} {{ serviceProviderData.lastName }}
                        </div>
                        <div class="text-body2">{{ serviceProviderData.email }}</div>
                        <div class="text-body2">{{ serviceProviderData.phoneNumber }}</div>
                        <div class="text-body2">{{ serviceProviderData.address }}</div>
                        <div class="text-body2">{{ serviceProviderData.city }}, {{ serviceProviderData.country }}</div>
                    </div>
                    <q-card-actions align="center" class="q-gutter-sm q-pt-xl">
                        <q-btn
                            v-if="jobStatus === 'completed'"
                            icon="fab fa-cc-stripe"
                            size="md"
                            :color="getColorPayBtn(jobStatus, applicationStatus)"
                            dense
                            :disable="isPayBtnDisabled(jobStatus, applicationStatus)"
                            @click="handlePayClick"
                        >
                            <q-tooltip v-if="isPayBtnDisabled(jobStatus, applicationStatus)">
                                {{ getPayTooltip(jobStatus, applicationStatus) }}
                            </q-tooltip>
                            <q-tooltip
                                v-else
                                class="bg-green-7"
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                            >
                                Pay this candidate
                            </q-tooltip>
                        </q-btn>
                        <q-btn
                            v-if="jobStatus !== 'completed'"
                            icon="fas fa-file-contract"
                            size="md"
                            :color="getColor(applicationStatus)"
                            dense
                            :disable="isButtonDisabled(applicationStatus)"
                            @click="showDialog = true"
                        >
                            <q-tooltip v-if="isButtonDisabled(applicationStatus)">
                                {{ getTooltip(applicationStatus) }}
                            </q-tooltip>
                            <q-tooltip
                                v-else
                                class="bg-purple-7"
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                            >
                                Generate contract
                            </q-tooltip>
                        </q-btn>
                        <q-btn
                            v-if="jobStatus === 'completed' && applicationStatus === 'completed'"
                            icon="fas fa-file-invoice"
                            size="md"
                            :color="getColorInvoiceBtn(applicationStatus)"
                            dense
                            @click="fetchInvoice"
                        >
                            <q-tooltip class="bg-purple-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                Download paid invoice
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
                                        <vue-signature
                                            ref="signature"
                                            :sigOption="option"
                                            :w="'100%'"
                                            :h="'200px'"
                                        ></vue-signature>
                                    </div>
                                </q-card-section>
                                <q-card-actions align="center">
                                    <q-btn icon="description" label="Generate" color="primary" @click="save"></q-btn>
                                    <q-btn size="md" icon="clear" label="Clear" color="primary" @click="clear"></q-btn>
                                    <q-btn icon="undo" label="Undo" color="primary" @click="undo"></q-btn>
                                </q-card-actions>
                            </q-card>
                        </q-dialog>
                        <q-btn icon="fas fa-eye" size="md" color="yellow-8" dense @click="goToServiceProviderProfile()">
                            <q-tooltip class="bg-yellow-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                View candidate profile
                            </q-tooltip>
                        </q-btn>
                    </q-card-actions>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import image from 'src/assets/profile-account-unknown.jpg';
import { ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import vueSignature from 'vue-signature';
import { Notify } from 'quasar';
export default {
    components: {
        vueSignature
    },
    props: {
        serviceProviderData: {
            type: Object,
            required: true
        },
        applicationStatus: {
            type: String,
            required: true
        },
        jobStatus: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const $api = inject('$api');
        const defaultImage = ref(image);
        const showDialog = ref(false);
        const signature = ref(null);
        const option = {
            penColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(255, 255, 255)'
        };
        const route = useRoute();
        const router = useRouter();

        const goToServiceProviderProfile = () => {
            const jobId = route.params.jobId;
            if (jobId) {
                router.push({
                    name: 'ServiceProviderProfileDetail',
                    params: {
                        jobId: jobId,
                        candidateId: props.serviceProviderData.id
                    }
                });
            } else {
                console.error('User type is undefined or user not found');
            }
        };
        const save = async () => {
            const dataURL = signature.value.save();
            try {
                const jobId = route.params.jobId;
                const response = await $api.post(
                    `/client/jobs/${jobId}/candidates/${props.serviceProviderData.id}/generate`,
                    {
                        signature: dataURL
                    },
                    {
                        responseType: 'blob'
                    }
                );

                const downloadUrl = window.URL.createObjectURL(response.data);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = 'contract.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);
                Notify.create({
                    color: 'primary',
                    textColor: 'white',
                    icon: 'error',
                    message: 'Contract successfully generated. Wait for service provider to sign.'
                });
                showDialog.value = false;
                emit('refreshCandidates');
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

        const isButtonDisabled = (applicationStatus) => {
            return (
                applicationStatus === 'selected' ||
                applicationStatus === 'rejected' ||
                applicationStatus === 'completed'
            );
        };

        const getTooltip = (applicationStatus) => {
            if (applicationStatus === 'completed') {
                return 'Contract already generated for this candidate.';
            } else if (applicationStatus === 'selected') {
                return 'You have already generated contract for this candidate.';
            } else if (applicationStatus === 'rejected') {
                return 'You rejected candidate.';
            } else {
                return 'Generate contract';
            }
        };

        const getColor = (applicationStatus) => {
            if (applicationStatus === 'selected' || applicationStatus === 'completed') {
                return 'grey-9';
            } else if (applicationStatus === 'rejected') {
                return 'red-8';
            } else {
                return 'purple-8';
            }
        };

        const getColorPayBtn = (jobStatus, applicationStatus) => {
            if (jobStatus === 'completed' && applicationStatus === 'selected') {
                return 'green-7';
            } else if (jobStatus === 'completed' && applicationStatus === 'completed') {
                return 'grey-9';
            } else {
                return 'purple-8';
            }
        };

        const getColorInvoiceBtn = (applicationStatus) => {
            if (applicationStatus === 'completed') {
                return 'purple-8';
            }
        };

        const isPayBtnDisabled = (jobStatus, applicationStatus) => {
            return applicationStatus === 'completed' && jobStatus === 'completed';
        };

        const getPayTooltip = (jobStatus, applicationStatus) => {
            if (jobStatus === 'completed' && applicationStatus === 'completed') {
                return 'You have already paid this candidate.';
            } else if (jobStatus === 'completed' && applicationStatus === 'selected') {
                return 'Pay this candidate.';
            } else {
                return 'Something went wrong';
            }
        };

        const handlePayClick = async () => {
            try {
                const jobId = route.params.jobId;
                const response = await $api.post(`/client/jobs/${jobId}/pay`);
                if (response.data.url) {
                    window.location.href = response.data.url;
                } else {
                    Notify.create({
                        type: 'negative',
                        message: 'Failed to initiate payment.'
                    });
                }
            } catch (error) {
                console.error('Error initiating payment:', error);
                Notify.create({
                    type: 'negative',
                    message: 'An error occurred while initiating the payment.'
                });
            }
        };

        const fetchInvoice = async () => {
            try {
                const jobId = route.params.jobId;
                const response = await $api.get(`/client/jobs/${jobId}/invoice`, {
                    responseType: 'blob'
                });
                if (response.status === 200) {
                    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = `invoice_${jobId}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(downloadUrl);

                    Notify.create({
                        color: 'primary',
                        textColor: 'white',
                        icon: 'cloud_download',
                        message: 'Invoice successfully downloaded.'
                    });
                }
            } catch (error) {
                console.error('Error downloading invoice:', error);
                Notify.create({
                    type: 'negative',
                    message: 'Failed to download invoice.'
                });
            }
        };

        return {
            defaultImage,
            showDialog,
            signature,
            option,
            fetchInvoice,
            getColorPayBtn,
            isPayBtnDisabled,
            getPayTooltip,
            handlePayClick,
            getColorInvoiceBtn,
            isButtonDisabled,
            getTooltip,
            getColor,
            goToServiceProviderProfile,
            save,
            clear,
            undo
        };
    }
};
</script>

<style scoped>
.my-card {
    width: 425px;
    height: auto;
    background-color: #ffffff;
}
.q-img {
    width: 100%;
    height: auto;
}
.q-btn {
    padding: 5px 12px;
}
.first-last-name-text {
    font-size: 17px;
    font-weight: 400;
}

.q-card-section-title {
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    padding: 5px;
}
.title {
    margin: 0;
    font-size: 16px;
}
.signature-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
}
</style>
