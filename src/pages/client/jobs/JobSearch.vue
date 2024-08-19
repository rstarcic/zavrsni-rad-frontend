<template>
    <div class="alignment">
        <div class="filters-container">
            <div class="row search">
                <q-input rounded outlined dark color="grey-9" v-model="searchModel" class="searchBar">
                    <template v-slot:append>
                        <q-icon name="search" @click="searchJobs" class="search-icon" />
                    </template>
                </q-input>
            </div>
            <div class="selected-filters">
                <q-chip
                    color="teal-4"
                    text-color="white"
                    v-for="(filter, index) in selectedFilters"
                    :key="index"
                    removable
                    @remove="removeFilter(filter)"
                    class="chip-truncate"
                >
                    {{ filter.label }}: {{ filter.value }}
                </q-chip>
            </div>
            <div class="filters">
                <q-btn-dropdown label="Title" class="dropdown-btn" icon="label">
                    <q-list>
                        <q-item
                            v-for="(option, index) in availableTitles"
                            :key="index"
                            clickable
                            v-close-popup
                            @click="applyFilter('title', option.value)"
                        >
                            <q-item-section>
                                <q-item-label>{{ option.label }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>

                <q-btn-dropdown label="Category" class="dropdown-btn" icon="fas fa-tag">
                    <q-list>
                        <q-item
                            v-for="(option, index) in availableCategories"
                            :key="index"
                            clickable
                            v-close-popup
                            @click="applyFilter('category', option.value)"
                        >
                            <q-item-section>
                                <q-item-label>{{ option.label }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>

                <q-btn-dropdown label="Location" class="dropdown-btn" icon="fas fa-location-dot">
                    <q-list>
                        <q-item
                            v-for="(option, index) in availableLocations"
                            :key="index"
                            clickable
                            v-close-popup
                            @click="applyFilter('location', option.value)"
                        >
                            <q-item-section>
                                <q-item-label>{{ option.label }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
                <div class="range-container">
                    <q-icon color="teal-9" name="fas fa-coins">
                        <q-tooltip class="bg-teal-4" :offset="[10, 10]"> Hourly rate </q-tooltip></q-icon
                    >

                    <q-range
                        v-model="filters.hourlyRate"
                        :min="1"
                        :max="100"
                        :step="1"
                        :inner-min-value="filters.hourlyRate.min"
                        :inner-max-value="filters.hourlyRate.max"
                        label-always
                        color="teal-5"
                    />
                </div>
            </div>
        </div>
        <div v-if="loading" class="loading-container q-pa-xl">
            <q-spinner size="lg" color="white" :thickness="10" />
        </div>
        <div v-else class="card-container">
            <div v-for="(job, index) in filteredJobs" :key="index">
                <jobCardComponent :job="job" :role="userRole" :type="userType" />
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

    data() {
        return {
            searchModel: null,
            jobs: [],
            userRole: null,
            userType: null,
            filters: {
                title: [],
                category: [],
                location: [],
                hourlyRate: { min: 1, max: 100 },
                contactInfo: null
            },
            availableTitles: [],
            availableCategories: [],
            availableLocations: [],
            selectedFilters: [],
            loading: true
        };
    },
    computed: {
        filteredJobs() {
            if (!this.searchModel) {
                return this.jobs;
            }
            const searchTerm = this.searchModel.toLowerCase();
            return this.jobs.filter(
                (job) =>
                    job.title.toLowerCase().includes(searchTerm) ||
                    job.category.toLowerCase().includes(searchTerm) ||
                    job.location.toLowerCase().includes(searchTerm) ||
                    job.hourlyRate.toString().toLowerCase().includes(searchTerm) ||
                    job.contactInfo.toLowerCase().includes(searchTerm)
            );
        }
    },
    methods: {
        async fetchDataForJobCard() {
            this.loading = true;
            await this.$api
                .get('/jobs/summary')
                .then((response) => {
                    this.loading = false;
                    this.jobs = response.data.jobs;
                    this.initializeDropdownData();
                    console.log('Jobs ', this.jobs);
                })
                .catch((error) => {
                    console.error('There was an error fetching user data!', error);
                });
        },
        async fetchUserRole() {
            const role = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).role : null;
            const type = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).type : null;
            if (!role) {
                this.$api
                    .get('/client/role')
                    .then((response) => {
                        this.userRole = response.data.role;
                        this.userType = response.data.type;
                    })
                    .catch((error) => {
                        console.error('Error while fetching user role:', error);
                    });
            } else {
                this.userRole = role;
                this.userType = type;
            }
        },
        async fetchFilteredJobs() {
            try {
                const params = {
                    categories: Array.isArray(this.filters.category) ? this.filters.category : [this.filters.category],
                    locations: Array.isArray(this.filters.location) ? this.filters.location : [this.filters.location],
                    titles: Array.isArray(this.filters.title) ? this.filters.title : [this.filters.title],
                    minHourlyRate: this.filters.hourlyRate.min,
                    maxHourlyRate: this.filters.hourlyRate.max
                };
                const response = await this.$api.get('/jobs/summary', {
                    params
                });
                this.jobs = response.data.jobs;
            } catch (error) {
                console.error('There was an error fetching filtered job data!', error);
            }
        },
        searchJobs() {
            this.fetchFilteredJobs();
        },
        createDropdownOptions(jobs, key) {
            const uniqueValues = new Set(jobs.map((job) => job[key]));
            return Array.from(uniqueValues).map((value) => ({
                label: value,
                value: value
            }));
        },
        initializeDropdownData() {
            this.availableTitles = this.createDropdownOptions(this.jobs, 'title');
            this.availableCategories = this.createDropdownOptions(this.jobs, 'category');
            this.availableLocations = this.createDropdownOptions(this.jobs, 'location');

            console.log('Dropdown titles:', this.availableTitles);
            console.log('Dropdown categories:', this.availableCategories);
            console.log('Dropdown locations:', this.availableLocations);
        },
        applyFilter(type, value) {
            if (Array.isArray(this.filters[type])) {
                if (!this.filters[type].includes(value)) {
                    this.filters[type].push(value);
                }
            } else {
                this.filters[type] = [value];
            }
            const existingFilterIndex = this.selectedFilters.findIndex((f) => f.label === type && f.value === value);
            if (existingFilterIndex === -1) {
                this.selectedFilters.push({ label: type, value });
            } else {
                console.log('Filter already added');
            }
            this.filters = { ...this.filters };
            this.selectedFilters = [...this.selectedFilters];
        },
        removeFilter(filter) {
            this.filters[filter.label] = null;
            this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
            this.searchJobs();
        }
    },
    mounted() {
        this.fetchDataForJobCard();
    },
    async created() {
        await this.fetchUserRole();
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
    margin-top: 30px;
}

.filters-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-bottom: 20px;
    top: 0;
    z-index: 100;
    padding: 10px;
}

.search {
    margin-bottom: 20px;
}

.searchBar {
    width: 400px !important;
}

.selected-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    max-width: 80%;
    justify-content: center;
    margin-bottom: 20px;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    width: 100%;
    max-width: 600px;
}
.range-container {
    width: 100%;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.range-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.dropdown-btn {
    background-color: #e6e6fa;
}

.search-icon:hover {
    transform: scale(1.1);
    transition: transform 0.4s ease;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>
