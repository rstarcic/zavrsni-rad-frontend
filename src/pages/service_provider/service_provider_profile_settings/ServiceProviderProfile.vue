<template>
    <q-page class="q-pa-xl">
        <q-card class="profile-card">
            <div class="full-width column items-center">
                <q-avatar size="150px" font-size="52px" color="teal" text-color="white" @click="triggerFileUpload">
                    <template v-if="photoUrl">
                        <img :src="photoUrl" />
                    </template>
                    <template v-else>
                        <q-icon name="cloud_upload" />
                    </template>
                </q-avatar>
            </div>
            <input type="file" ref="fileInput" @change="handleFileChange" hidden accept="image/*" />
            <q-card-section>
                <div class="q-pa-md example-row-equal-width">
                    <div class="text-h6">Personal Information</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="user.firstName"
                            label-color="#050301"
                            color="purple-5"
                            label="First Name"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                        <q-input
                            v-model="user.lastName"
                            label-color="#050301"
                            color="purple-5"
                            label="Last Name"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="user.gender"
                            label-color="#050301"
                            color="purple-5"
                            label="Gender"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                        <q-input
                            v-model="user.dateOfBirth"
                            label-color="#050301"
                            color="purple-5"
                            label="Date of Birth"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                    <div class="text-h6">Contact Information</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="user.phoneNumber"
                            label="Phone number"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                        <q-input
                            v-model="user.country"
                            label-color="#050301"
                            color="purple-5"
                            label="Country"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="user.city"
                            label-color="#050301"
                            color="purple-5"
                            label="City"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 230px"
                        />
                        <q-input
                            v-model="user.address"
                            label-color="#050301"
                            color="purple-5"
                            label="Address"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 225px"
                        />
                        <q-input
                            v-model="user.postalCode"
                            label-color="#050301"
                            color="purple-5"
                            label="Postal code"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 100px"
                        >
                        </q-input>
                    </div>
                    <div class="text-h6">Documents</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-select
                            v-model="user.documentType"
                            label-color="#050301"
                            color="purple-5"
                            label="Document type"
                            stack-label
                            :options="documentTypes"
                            popup-content-style="background-color: #642b73; color: white;"
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                        <q-input
                            v-model="user.documentNumber"
                            label-color="#050301"
                            color="purple-5"
                            label="Document number"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                </div>
            </q-card-section>

            <q-card-actions>
                <div class="q-mt-lg">
                    <q-btn
                        class="save-profile-btn"
                        color="#f2f2f2"
                        label="Save changes"
                        @click="saveProfile"
                        size="12px"
                    />
                </div>
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: {
                firstName: null,
                lastName: null,
                gender: null,
                dateOfBirth: null,
                phoneNumber: null,
                country: null,
                city: null,
                address: null,
                postalCode: null,
                documentType: null,
                documentNumber: null
            },
            education: {
                institution: null,
                degree: null,
                startDate: null,
                endDate: null
            },
            work: {
                companyName: '',
                jobTitle: '',
                startDate: '',
                endDate: ''
            },
            skills: ['Skill 1', 'Skill 2'],
            newSkill: ''
        };
    },
    methods: {
        async saveProfile() {
            const userSessionData = JSON.parse(sessionStorage.getItem('user'));
            console.log('userSessionData', userSessionData);
            const userId = userSessionData.dataValues.id;
            if (userSessionData) {
                const userDataToUpdate = { ...this.user, userId };
                console.log('userDataToUpdate', userDataToUpdate);
                await axios
                    .patch(`http://localhost:3001/api/service-provider/profile`, userDataToUpdate)
                    .then((response) => {
                        console.log('Server response:', response);
                        sessionStorage.setItem('user', JSON.stringify(response.data.user));
                    })
                    .catch((error) => {
                        console.error('There was an error!', error);
                    });
            } else {
                console.error('User session data not found');
            }
        },
        loadUserData() {
            let userData = JSON.parse(sessionStorage.getItem('user'));
            if (userData) {
                const user = userData.dataValues || userData;
                Object.assign(this.user, user);
            }
        }
    },
    mounted() {
        this.loadUserData();
    }
};
</script>

<style>
.profile-card {
    max-width: 800px;
    margin: auto;
}
.save-profile-btn {
    margin: 20px;
    background-color: #8e68b2;
}
</style>
