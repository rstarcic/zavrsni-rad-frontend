<template>
    <div class="alignment">
        <div class="row search">
            <q-input rounded outlined dark color="yellow-5" v-model="searchModel" class="searchBar">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
        <div class="card-container">
            <div v-for="(job, index) in jobs" :key="index">
                <jobCardComponent :job="job" />
            </div>
        </div>
    </div>
</template>

<script>
import jobCardComponent from 'src/components/JobCardComponent.vue';
export default {
    components: {
        jobCardComponent
    },
    props: [],
    data() {
        return {
            searchModel: null,
            jobs: []
        };
    },
    methods: {
        async fetchDataForJobCard() {
            console.log('Fetching job data...');
            await this.$api
                .get('/jobs/summary')
                .then((response) => {
                    this.jobs = response.data.jobs;
                    console.log('Jobs ', this.jobs);
                })
                .catch((error) => {
                    console.error('There was an error fetching user data!', error);
                });
        }
    },
    mounted() {
        this.fetchDataForJobCard();
    }
};
</script>

<style scoped>
.alignment {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
}

.search {
    margin-bottom: 100px;
}

.searchBar {
    width: 300px !important;
}
</style>
