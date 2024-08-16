<template>
    <div class="alignment">
        <q-card class="job-details-card">
            <q-card-section class="header q-pa-md">
                <div class="text-h6 text-center title-style">Job details</div>
                <q-btn flat @click="isEditing = !isEditing" class="edit-btn">
                    <q-transition appear name="fade">
                        <q-icon v-if="isEditing" name="fas fa-xmark" />
                        <q-icon v-else name="edit" />
                    </q-transition>
                </q-btn>
            </q-card-section>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="postedJob.title"
                    label-color="#050301"
                    color="purple-5"
                    label="Job title"
                    class="col"
                    :rules="requiredRule"
                    :readonly="!isEditing"
                />
                <q-select
                    v-model="postedJob.category"
                    :options="categoryOptions"
                    label-color="#050301"
                    color="purple-5"
                    label="Category"
                    class="col"
                    :debounce="300"
                    use-input
                    :rules="requiredRule"
                    @filter="filterCategories"
                    popup-content-style="background-color: #642b73; color: white; width:200px;"
                    :readonly="!isEditing"
                    ><template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey"> No results </q-item-section>
                        </q-item>
                    </template></q-select
                >
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="postedJob.jobType"
                    label-color="#050301"
                    color="purple-5"
                    label="Job type"
                    class="col"
                    readonly
                    value="One-time"
                    :rules="requiredRule"
                />
                <q-input
                    v-model="postedJob.workConditions"
                    label-color="#050301"
                    color="purple-5"
                    label="Work conditions"
                    class="col"
                    :rules="requiredRule"
                    :readonly="!isEditing"
                />
            </div>
            <q-input
                v-model="postedJob.description"
                label-color="#050301"
                color="purple-5"
                label="Description"
                type="textarea"
                class="col"
                :rules="requiredRule"
                :readonly="!isEditing"
            />
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="postedJob.qualifications"
                    label-color="#050301"
                    color="purple-5"
                    label="Qualifications"
                    class="col"
                    :rules="requiredRule"
                    :readonly="!isEditing"
                />
                <q-input
                    v-model="postedJob.equipmentNeeded"
                    label-color="#050301"
                    color="purple-5"
                    label="Equipment needed"
                    class="col"
                    :rules="requiredRule"
                    :readonly="!isEditing"
                />
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="postedJob.hourlyRate"
                    label-color="#050301"
                    color="purple-5"
                    label="Hourly Rate"
                    suffix="per hour"
                    class="col"
                    :rules="requiredRule"
                    :readonly="!isEditing"
                />
                <q-select
                    v-model="postedJob.paymentCurrency"
                    :options="currencyOptions"
                    label-color="#050301"
                    color="purple-5"
                    label="Currency"
                    class="col"
                    use-input
                    :debounce="300"
                    :rules="requiredRule"
                    @filter="filterCurrencies"
                    popup-content-style="background-color: #642b73; color: white; width:200px;"
                    :readonly="!isEditing"
                    ><template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey"> No results </q-item-section>
                        </q-item>
                    </template>
                </q-select>
                <q-input
                    v-model="postedJob.workingHours"
                    label-color="#050301"
                    color="purple-5"
                    label="Working hours per day"
                    suffix="hour/hours"
                    class="col"
                    :rules="requiredRule"
                    :readonly="!isEditing"
                />
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="postedJob.paymentMethod"
                    label-color="#050301"
                    color="purple-5"
                    label="Payment method"
                    readonly
                    class="col"
                    :rules="requiredRule"
                />
                <q-input
                    v-model="postedJob.location"
                    label-color="#050301"
                    color="purple-5"
                    label="Location"
                    class="col"
                    :rules="requiredRule"
                    :readonly="!isEditing"
                />
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="postedJob.duration"
                    label-color="#050301"
                    color="purple-5"
                    label="Duration"
                    class="col"
                    type="number"
                    hint="Indicate the expected duration of the job in days."
                    :rules="dayNumberRules"
                    :readonly="!isEditing"
                />
                <q-input
                    v-model="postedJob.contactInfo"
                    label-color="#050301"
                    color="purple-5"
                    label="Contact information"
                    class="col"
                    :rules="requiredRule"
                    :readonly="!isEditing"
                />
            </div>
            <div class="row q-gutter-lg custom-row">
                <q-input
                    v-model="postedJob.applicationDeadline"
                    type="date"
                    label-color="#050301"
                    color="purple-5"
                    label="Application deadline"
                    :rules="deadlineRules"
                    years-in-month-view
                    class="col"
                    :readonly="!isEditing"
                />
                <q-input
                    v-model="postedJob.workDeadline"
                    type="date"
                    label-color="#050301"
                    color="purple-5"
                    label="Work deadline"
                    :rules="deadlineRules"
                    class="col"
                    :readonly="!isEditing"
                />
            </div>
            <p>Last updated: {{ postedJob.updatedAt }}</p>
            <div class="status-icon-wrapper">
                <p>Status: <q-icon name="circle" :color="statusColor" size="xs" /></p>
            </div>
            <q-card-actions class="flex justify-center">
                <q-btn color="purple-8" size="14px" label="Save changes" @click="updateClientPostedJob" />
            </q-card-actions>
            <q-card-actions class="flex justify-center">
                <q-btn color="amber-8" size="14px" @click="deactivateClientPostedJob">
                    <q-icon name="fas fa-power-off" /><q-tooltip
                        class="bg-amber-7"
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                        >{{
                            postedJob.status === 'active'
                                ? 'Deactivate job advertisement'
                                : 'Activate job advertisement'
                        }}</q-tooltip
                    ></q-btn
                >
                <q-btn color="red-8" size="14px" @click="deleteClientPostedJob">
                    <q-icon name="fas fa-trash" /><q-tooltip
                        class="bg-red-7"
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                        >Delete job advertisement</q-tooltip
                    ></q-btn
                >
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
    props: {
        jobId: {
            type: String,
            required: true
        }
    },
    created() {
        console.log(`Loading details for job with ID: ${this.jobId}`);
    },
    data() {
        return {
            postedJob: {
                title: null,
                category: null,
                jobType: null,
                workConditions: null,
                description: null,
                qualifications: null,
                equipmentNeeded: null,
                hourlyRate: null,
                paymentCurrency: null,
                workingHours: null,
                paymentMethod: null,
                location: null,
                duration: null,
                contactInfo: null,
                applicationDeadline: null,
                workDeadline: null,
                updatedAt: null
            },
            isEditing: false,
            categoryOptions: categories,
            currencyOptions: stripeCurrencies,
            dateIsValidFormatRule: utils.dateIsValidFormatRule,
            deadlineRules: utils.deadlineRules,
            requiredRule: utils.required,
            dayNumberRules: utils.dayNumberRules
        };
    },
    computed: {
        statusColor() {
            return this.postedJob.status === 'active' ? 'green' : 'red';
        }
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
        async fetchClientPostedJob() {
            await this.$api
                .get(`/client/jobs/${this.jobId}/detail`)
                .then((response) => {
                    this.postedJob = response.data.job;
                    console.log('Jobs fetched successfully:', response.data.job);
                })
                .catch((error) => {
                    console.error('Error fetching jobs:', error);
                });
        },
        async updateClientPostedJob() {
            await this.$api
                .patch(`/client/jobs/${this.jobId}/detail`, this.postedJob)
                .then((response) => {
                    this.postedJob = response.data.jobs;
                    Notify.create({
                        message: response.data.message,
                        type: 'positive',
                        position: 'bottom'
                    });
                    console.log('Jobs fetched successfully:', response.data.jobs);
                })
                .catch((error) => {
                    Notify.create({
                        message: 'Failed to update job ad. Please try again.',
                        type: 'negative',
                        position: 'bottom'
                    });
                    console.error('Error fetching jobs:', error);
                });
        },
        async deleteClientPostedJob() {
            await this.$api
                .delete(`/client/jobs/${this.jobId}/detail`)
                .then((response) => {
                    console.log('Job deleted successfully');
                    const clientType = JSON.parse(sessionStorage.getItem('user')).type;
                    this.$router.push(`/client/${clientType}/posted-jobs`);
                })
                .catch((error) => {
                    console.error('Error deleting job:', error);
                });
        },
        async deactivateClientPostedJob() {
            const currentStatus = this.postedJob.status;
            await this.$api
                .patch(`/client/jobs/${this.jobId}/status`, { status: currentStatus })
                .then((response) => {
                    this.postedJob.status = response.data.status;
                    if (response.data.status === 'active') {
                        Notify.create({
                            message: 'Ad is successfully activated.',
                            type: 'positive',
                            position: 'bottom'
                        });
                    } else if (response.data.status === 'inactive') {
                        Notify.create({
                            message: 'Ad is successfully inactivated.',
                            type: 'positive',
                            position: 'bottom'
                        });
                    }
                    console.log('Jobs fetched successfully:', response.data.jobs);
                })
                .catch((error) => {
                    Notify.create({
                        message: 'Failed to update job ad status. Please try again.',
                        type: 'negative',
                        position: 'bottom'
                    });
                    console.error('Error fetching jobs:', error);
                });
        }
    },
    async created() {
        await this.fetchClientPostedJob();
    }
};
</script>

<style scoped>
.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 140vh;
}
.job-details-card {
    width: 100%;
    max-width: 900px;
    background-color: #fff1fa;
    padding: 20px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
}

.title-style {
    color: rgb(0, 0, 0);
    margin-top: 20px;
}

.header {
    background-color: #775991;
    height: 100px;
    position: relative;
}

.edit-btn {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
