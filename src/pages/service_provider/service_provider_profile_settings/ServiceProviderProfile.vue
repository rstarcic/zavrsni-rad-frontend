<template>
    <q-page class="q-pa-xl">
        <q-card class="profile-card">
            <div class="full-width column items-center">
                <q-avatar size="150px" font-size="52px" color="teal" text-color="white" @click="triggerFileUpload">
                    <template v-if="user.profileImage">
                        <img :src="user.profileImage" />
                    </template>
                    <template v-else>
                        <q-icon name="cloud_upload" />
                    </template>
                </q-avatar>
            </div>
            <input type="file" ref="fileInput" @change="handleFileChange" hidden accept="image/*" />
            <q-card-section>
                <div class="q-pa-md example-row-equal-width">
                    <div class="text-h6 q-mx-xl q-my-sm">About Me</div>
                    <div class="q-pa-md q-gutter-sm">
                        <q-editor
                            class="q-mx-xl"
                            v-model="user.aboutMeSummary"
                            min-height="5rem"
                            placeholder="Write something about yourself..."
                        />
                    </div>
                    <div class="text-h6 q-mx-xl">Personal Information</div>
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
                            :rules="dateOfBirthRules"
                            type="date"
                            label-color="#050301"
                            color="purple-5"
                            label="Date of Birth"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                    <div class="text-h6 q-mx-xl q-my-md">Contact Information</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="user.phoneNumber"
                            :rules="phoneNumberRules"
                            type="tel"
                            mask="(###) ### - ####"
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
                    <div class="text-h6 q-mx-xl q-my-md">Documents</div>
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
                    <div class="text-h6 q-mx-xl q-my-md">Present or most recent education</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="education.institution"
                            label-color="#050301"
                            color="purple-5"
                            label="Institution"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                        <q-input
                            v-model="education.degree"
                            label-color="#050301"
                            color="purple-5"
                            label="Degree"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="education.startDate"
                            type="date"
                            label-color="#050301"
                            color="purple-5"
                            label="Start date"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                        <q-input
                            v-model="education.endDate"
                            type="date"
                            label-color="#050301"
                            color="purple-5"
                            label="End date"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                    <div class="text-h6 q-mx-xl q-my-md">Present or most recent work experience</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="workExperience.companyName"
                            label-color="#050301"
                            color="purple-5"
                            label="Company name"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                        <q-input
                            v-model="workExperience.jobTitle"
                            label-color="#050301"
                            color="purple-5"
                            label="Job title"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                    <div class="row justify-center q-gutter-sm">
                        <q-input
                            v-model="workExperience.startDate"
                            type="date"
                            label-color="#050301"
                            color="purple-5"
                            label="Start date"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                        <q-input
                            v-model="workExperience.endDate"
                            type="date"
                            label-color="#050301"
                            color="purple-5"
                            label="End date"
                            stack-label
                            class="col q-ma-md"
                            style="max-width: 300px"
                        />
                    </div>
                    <div class="text-h6 q-mx-xl q-my-md">Languages</div>
                    <div class="row justify-center q-gutter-sm">
                        <div v-for="(language, index) in languages" :key="'language' + index" class="col-12 col-md-6">
                            <q-input
                                v-model="language.language"
                                label-color="#050301"
                                color="purple-5"
                                label="Language"
                                stack-label
                                class="col q-ma-l"
                                style="max-width: 300px"
                            />

                            <q-select
                                v-model="language.proficiency"
                                :options="proficiencyLevels"
                                popup-content-style="background-color: #642b73; color: white;"
                                label-color="#050301"
                                color="purple-5"
                                label="Proficiency"
                                stack-label
                                class="col q-ma-l"
                                style="max-width: 300px"
                            />
                        </div>
                    </div>
                    <div class="text-h6 q-mx-xl q-my-md">Skills</div>
                    <div class="row justify-center q-gutter-sm">
                        <div v-for="(skill, index) in skills" :key="index" class="q-ma-md">
                            <q-input
                                v-model="skill.name"
                                label-color="#050301"
                                color="purple-5"
                                label="Skill"
                                stack-label
                                style="max-width: 300px"
                            />
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions class="save-profile-btn-container">
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
import configuration from 'src/configuration.js';
import utils from 'src/utils';
import axios from 'axios';
export default {
    data() {
        return {
            user: {
                aboutMeSummary: null,
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
                documentNumber: null,
                profileImage: null
            },
            education: {
                institution: null,
                degree: null,
                startDate: null,
                endDate: null
            },
            workExperience: {
                companyName: null,
                jobTitle: null,
                startDate: null,
                endDate: null
            },
            languages: [
                { language: null, proficiency: null },
                { language: null, proficiency: null }
            ],
            skills: [{ name: '' }, { name: '' }, { name: '' }],
            selectedFile: null,
            documentTypes: configuration.documentTypes,
            proficiencyLevels: configuration.proficiencyLevels,
            dateOfBirthRules: utils.dateOfBirthRules,
            phoneNumberRules: utils.phoneNumberRules
        };
    },
    methods: {
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },
        async saveProfile() {
            const userId = JSON.parse(sessionStorage.getItem('userId'));
            if (userId) {
                const userDataWithSkillsData = { ...this.user, skills: this.skills };
                const userDataToUpdate = {
                    user: userDataWithSkillsData,
                    education: this.education,
                    workExperience: this.workExperience,
                    language: this.languages,
                    userId
                };
                console.log('userDataToUpdate', userDataToUpdate);
                await axios
                    .patch(`http://localhost:3001/api/service-provider/profile`, userDataToUpdate)
                    .then((response) => {
                        console.log('Server response:', response);
                        sessionStorage.setItem('user', JSON.stringify(response.data.user));
                        sessionStorage.setItem('workExperience', JSON.stringify(response.data.workExperience));
                        sessionStorage.setItem('education', JSON.stringify(response.data.education));
                        sessionStorage.setItem('languages', JSON.stringify(response.data.language));
                    })
                    .catch((error) => {
                        console.error('There was an error!', error);
                    });
            } else {
                console.error('UserId not found in sessionStorage');
            }
        },
        async loadUserData() {
            let userId = JSON.parse(sessionStorage.getItem('userId'));
            let userData = JSON.parse(sessionStorage.getItem('user'));
            let education = JSON.parse(sessionStorage.getItem('education'));
            let workExperience = JSON.parse(sessionStorage.getItem('workExperience'));
            let languages = JSON.parse(sessionStorage.getItem('languages'));
            if (userId) {
                await axios
                    .get(`http://localhost:3001/api/service-provider/${userId}`)
                    .then((response) => {
                        const userDataFetched = response.data;
                        this.user = userDataFetched.user;
                        this.skills = userDataFetched.user.skills;
                        console.log('userDataFetched.user.skills', userDataFetched.user.skills);
                        this.education = userDataFetched.education;
                        this.workExperience = userDataFetched.workExperience;
                        this.languages = userDataFetched.languages;

                        sessionStorage.setItem('user', JSON.stringify(this.user));
                        sessionStorage.setItem('education', JSON.stringify(this.education));
                        sessionStorage.setItem('workExperience', JSON.stringify(this.workExperience));
                        sessionStorage.setItem('languages', JSON.stringify(this.languages));

                        console.log('Data loaded from API and assigned', this.user);
                    })
                    .catch((error) => {
                        console.error('There was an error fetching user data!', error);
                    });
            } else if (userData && education && workExperience && languages) {
                this.user = userData;
                this.skills = userData.skills;
                console.log('userData.skills', userData.skills);
                this.education = education;
                this.workExperience = workExperience;
                this.languages = languages;
                console.log('Session storage assigned', this.user);
            } else {
                console.error('Missing userId in sessionStorage');
            }
        },
        async uploadProfileImage() {
            const userId = JSON.parse(sessionStorage.getItem('userId'));
            if (userId && this.selectedFile) {
                const formData = new FormData();
                formData.append('profileImage', this.selectedFile);
                formData.append('userId', userId);
                try {
                    const response = await axios.post('http://localhost:3001/api/service-provider/profile', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('Profile image uploaded:', response);
                    this.user.profileImage = response.data.profileImage;
                } catch (error) {
                    console.error('There was an error uploading the profile image!', error);
                }
            } else {
                console.error('No file selected or UserId not found in sessionStorage');
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

.save-profile-btn-container {
    display: flex;
    justify-content: center;
}

.save-profile-btn {
    margin: 20px;
    background-color: #8e68b2;
}
</style>
