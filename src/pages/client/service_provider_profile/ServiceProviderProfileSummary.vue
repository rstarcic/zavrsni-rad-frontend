<template>
    <div>
        <div v-if="loading" class="spinner-container">
            <q-spinner size="lg" color="white" :thickness="10" />
        </div>
        <div v-else>
            <div v-if="candidateData.length" class="candidate-container">
                <candidate-card-component
                    v-for="candidate in candidateData"
                    :key="candidate.id"
                    :serviceProviderData="candidate.serviceProvider"
                    :applicationStatus="candidate.applicationStatus"
                    class="candidate-card"
                    @refreshCandidates="fetchCandidateData"
                ></candidate-card-component>
            </div>
            <div class="alignment text-subtitle2" v-else>
                <p>No candidates have applied for this job yet. Please check back later.</p>
            </div>
        </div>
    </div>
</template>

<script>
import CandidateCardComponent from 'src/components/CandidateCardComponent.vue';
export default {
    components: {
        CandidateCardComponent
    },
    data() {
        return {
            candidateData: [],
            loading: false
        };
    },
    methods: {
        async fetchCandidateData() {
            const jobId = this.$route.params.jobId;
            console.log(jobId);
            this.loading = true;
            this.$api
                .get(`/client/jobs/${jobId}/candidates`)
                .then((response) => {
                    console.log(response.data);
                    this.candidateData = response.data.candidates;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    mounted() {
        this.fetchCandidateData();
    }
};
</script>

<style scoped>
.candidate-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
}

.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    width: 100%;
}
</style>
