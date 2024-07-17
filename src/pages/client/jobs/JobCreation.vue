<template>
    <div class="alignment">
        <q-card class="job-card-design">
            <q-card-section>
                <div class="text-h6 title-style">Post new job ad</div>
                <div class="text-subtitle-1 title-style">
                    Dear user, please fill in the details of the job you are posting.
                </div>
            </q-card-section>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="jobData.title"
                    label-color="purple-2"
                    color="purple-2"
                    label="Job title"
                    dark
                    class="col"
                />
                <q-select
                    v-model="jobData.category"
                    :options="categoryOptions"
                    label-color="purple-2"
                    color="purple-2"
                    label="Category"
                    dark
                    class="col"
                    :debounce="300"
                    use-input
                    @filter="filterCategories"
                    popup-content-style="background-color: #642b73; color: white; width:200px;"
                    ><template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey"> No results </q-item-section>
                        </q-item>
                    </template></q-select
                >
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="jobData.jobType"
                    label-color="purple-2"
                    color="purple-2"
                    label="Job type"
                    dark
                    class="col"
                    disable
                    value="One-time"
                />
                <q-input
                    v-model="jobData.workConditions"
                    label-color="purple-2"
                    color="purple-2"
                    label="Work conditions"
                    dark
                    class="col"
                />
            </div>
            <q-input
                v-model="jobData.description"
                label-color="purple-2"
                color="purple-2"
                label="Description"
                type="textarea"
                dark
                class="col"
            />
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="jobData.qualifications"
                    label-color="purple-2"
                    color="purple-2"
                    label="Qualifications"
                    dark
                    class="col"
                />
                <q-input
                    v-model="jobData.equipmentNeeded"
                    label-color="purple-2"
                    color="purple-2"
                    label="Equipment needed"
                    dark
                    class="col"
                />
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="jobData.hourlyRate"
                    label-color="purple-2"
                    color="purple-2"
                    label="Hourly Rate"
                    suffix="per hour"
                    dark
                    class="col"
                />
                <q-select
                    v-model="jobData.paymentCurrency"
                    :options="currencyOptions"
                    label-color="purple-2"
                    color="purple-2"
                    label="Currency"
                    dark
                    class="col"
                    use-input
                    :debounce="300"
                    @filter="filterCurrencies"
                    popup-content-style="background-color: #642b73; color: white; width:200px;"
                    ><template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey"> No results </q-item-section>
                        </q-item>
                    </template>
                </q-select>
                <q-input
                    v-model="jobData.workingHours"
                    label-color="purple-2"
                    color="purple-2"
                    label="Working hours per day"
                    suffix="hour/hours"
                    dark
                    class="col"
                />
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="jobData.paymentMethod"
                    label-color="purple-2"
                    color="purple-2"
                    label="Payment method"
                    disable
                    dark
                    class="col"
                />
                <q-input
                    v-model="jobData.location"
                    label-color="purple-2"
                    color="purple-2"
                    label="Location"
                    dark
                    class="col"
                />
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="jobData.duration"
                    label-color="purple-2"
                    color="purple-2"
                    label="Duration"
                    dark
                    class="col"
                    hint="Indicate the expected duration of the job (e.g., 3 weeks, 6 months)."
                />
                <q-input
                    v-model="jobData.contactInfo"
                    label-color="purple-2"
                    color="purple-2"
                    label="Contact information"
                    dark
                    class="col"
                />
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="jobData.applicationDeadline"
                    type="date"
                    label-color="purple-2"
                    color="purple-2"
                    label="Application deadline"
                    dark
                    :rules="dateIsValidFormatRule"
                    years-in-month-view
                    class="col"
                />
                <q-input
                    v-model="jobData.workDeadline"
                    type="date"
                    label-color="purple-2"
                    color="purple-2"
                    label="Work deadline"
                    :rules="deadlineRules"
                    dark
                    class="col"
                />
            </div>
            <q-card-actions class="flex justify-center">
                <q-btn color="#f2f2f2" size="14px" label="Post a job" @click="postNewJob" />
            </q-card-actions>
        </q-card>
    </div>
</template>

<script>
import { categories } from 'src/assets/categories.js';
import { stripeCurrencies } from 'src/assets/currencies.js';
import utils from 'src/utils.js';
import { Notify } from 'quasar';
export default {
    data() {
        return {
            jobData: {
                title: null,
                category: null,
                jobType: 'One-time',
                workConditions: null,
                description: null,
                qualifications: null,
                equipmentNeeded: null,
                hourlyRate: null,
                paymentCurrency: null,
                workingHours: null,
                paymentMethod: 'Payment processed through Stripe',
                location: null,
                duration: null,
                contactInfo: null,
                applicationDeadline: null,
                workDeadline: null
            },
            categoryOptions: categories,
            currencyOptions: stripeCurrencies,
            dateIsValidFormatRule: utils.dateIsValidFormatRule,
            deadlineRules: utils.deadlineRules
        };
    },
    methods: {
        filterCategories(val, update) {
            update(() => {
                const needle = val.toLowerCase();
                this.categoryOptions = categories.filter((cat) => cat.toLowerCase().includes(needle));
            });
        },
        filterCurrencies(val, update) {
            update(() => {
                const needle = val.toLowerCase();
                this.currencyOptions = stripeCurrencies.filter((cur) => cur.toLowerCase().includes(needle));
            });
        },
        async postNewJob() {
            this.$api
                .post('/client/jobs', this.jobData)
                .then((response) => {
                    console.log('Job posted successfully:', response.data);
                    Notify.create({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'cloud_done',
                        message: 'Job posted successfully!'
                    });
                })
                .catch((error) => {
                    Notify.create({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'error',
                        message: 'Failed to post job.'
                    });
                    console.log('Login failed: ', error);
                });
        }
    }
};
</script>
<style scoped>
.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.job-card-design {
    width: 100%;
    max-width: 900px;
    background-color: #642b73;
    padding: 20px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
}

.card-header {
    background-color: #5e35b1;
    color: white;
    text-align: center;
    padding: 12px 20px;
}

@media (max-width: 600px) {
    .job-card-design {
        padding: 10px;
    }
}

.custom-row {
    margin-bottom: 20px;
}

.title-style {
    color: white;
    text-align: center;
    width: 100%;
    margin-bottom: 15px;
}
</style>
