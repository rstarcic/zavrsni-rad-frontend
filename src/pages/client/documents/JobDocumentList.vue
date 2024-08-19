<template>
    <div class="q-pa-md alignment-wrapper">
        <div class="alignment-content">
            <div
                v-if="!loading && (!contracts || !contracts.JobAds || contracts.JobAds.length === 0)"
                class="no-jobs text-subtitle2"
            >
                You haven't generated any contracts yet.
            </div>

            <div v-if="loading" class="q-mt-md">
                <q-spinner-dots color="white" size="lg" />
            </div>

            <div v-else>
                <div v-if="contracts && contracts.JobAds && contracts.JobAds.length > 0">
                    <div class="header">
                        <div class="text-h4">Your Contracts</div>
                        <div class="text-subtitle2">Review your contracts.</div>
                    </div>

                    <q-markup-table separator="horizontal" flat bordered class="q-mt-md jobs-table">
                        <thead>
                            <tr>
                                <th class="text-center larger-table-text">Job title</th>
                                <th class="text-center larger-table-text">Last updated</th>
                                <th class="text-center larger-table-text">Candidate signed</th>
                                <th class="text-center larger-table-text">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="jobAd in contracts.JobAds" :key="jobAd.id">
                                <template v-for="contract in jobAd.JobContracts" :key="contract.id">
                                    <td class="text-center larger-table-text">{{ jobAd.title }}</td>
                                    <td class="text-center larger-table-text">
                                        {{ contract.updatedAt }}
                                    </td>
                                    <td class="text-center larger-table-text">
                                        <q-icon
                                            :name="contractStatus(contract.status).icon"
                                            :color="contractStatus(contract.status).color"
                                            size="xs"
                                        />
                                    </td>
                                    <td class="text-center button-group">
                                        <q-btn
                                            size="sm"
                                            icon="fas fa-file-download"
                                            color="cyan-9"
                                            class="q-mx-sm"
                                            padding="7px 10px"
                                            @click="downloadContract(contract.id)"
                                        >
                                            <q-tooltip
                                                class="bg-cyan-9"
                                                anchor="top middle"
                                                self="bottom middle"
                                                :offset="[10, 10]"
                                                >Download contract</q-tooltip
                                            ></q-btn
                                        >
                                    </td>
                                </template>
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
            contracts: null,
            loading: true
        };
    },
    methods: {
        async fetchContracts() {
            this.loading = true;
            await this.$api
                .get('/client/contracts')
                .then((response) => {
                    this.contracts = response.data.contracts;
                    console.log('Contracts fetched successfully:', response.data.contracts);
                })
                .catch((error) => {
                    console.error('Error fetching contracts:', error);
                    Notify.create({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'error',
                        message: 'Failed to fetch contracts.'
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        downloadContract(contractId) {
            this.$api
                .get(`/client/contracts/${contractId}/download`, {
                    responseType: 'blob'
                })
                .then((response) => {
                    console.log('Contract fetched successfully:', response);
                    const blob = new Blob([response.data], { type: 'application/pdf' });
                    const downloadUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = `contract_${contractId}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(downloadUrl);
                })
                .catch((error) => {
                    console.error('Error downloading contract:', error);
                    Notify.create({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'error',
                        message: 'Failed to download contract.'
                    });
                });
        },
        contractStatus(status) {
            if (status === 'completed') {
                return { icon: 'thumb_up', color: 'green' };
            } else if (status === 'pending') {
                return { icon: 'thumb_down', color: 'red' };
            } else {
                return { icon: 'help', color: 'grey' };
            }
        }
    },
    mounted() {
        this.fetchContracts();
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
