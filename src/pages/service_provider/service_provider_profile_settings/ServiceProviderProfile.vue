<template>
    <q-page class="q-pa-xl">
        <q-card class="profile-card">
            <div class="full-width column items-center profile-container">
                <q-avatar class="q-ma-md" size="170px" font-size="52px" color="teal" text-color="white">
                    <template v-if="user.profileImage">
                        <img :src="user.profileImage" />
                    </template>
                    <template v-else>
                        <img :src="defaultImage" />
                    </template>
                </q-avatar>
                <label for="file-upload" class="custom-file-upload">
                    <q-icon name="create" size="24px" />
                </label>
                <input id="file-upload" hidden type="file" ref="fileInput" @change="upload" accept="image/*" />
            </div>
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
                        <q-select
                            v-model="user.country"
                            :options="countries"
                            label-color="#050301"
                            color="purple-5"
                            label="Country"
                            stack-label
                            use-input
                            class="col q-ma-md"
                            style="max-width: 300px"
                            @filter="filterCountries"
                        >
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey"> No results </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
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
import { Notify } from 'quasar';
import configuration from 'src/configuration.js';
import { countries } from 'src/assets/location';
import utils from 'src/utils';
import image from 'src/assets/profile-account-unknown.jpg';
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
            defaultImage: image,
            documentTypes: configuration.documentTypes,
            countries: countries,
            proficiencyLevels: configuration.proficiencyLevels,
            dateOfBirthRules: utils.dateOfBirthRules,
            phoneNumberRules: utils.phoneNumberRules
        };
    },
    methods: {
        upload(e) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e) => {
                this.user.profileImage = e.target.result;
            };
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
                await this.$api
                    .patch(`/service-provider/profile`, userDataToUpdate)
                    .then((response) => {
                        console.log('Server response:', response);
                        sessionStorage.setItem('user', JSON.stringify(response.data.user) || {});
                        console.log('response.data.updatedUser', response.data.user.profileImage);
                        this.user.profileImage = response.data.user.profileImage;
                        sessionStorage.setItem('workExperience', JSON.stringify(response.data.workExperience || {}));
                        sessionStorage.setItem('education', JSON.stringify(response.data.education || {}));
                        sessionStorage.setItem('languages', JSON.stringify(response.data.language || []));
                        Notify.create({
                            message: 'Profile successfully saved!',
                            type: 'positive',
                            position: 'bottom'
                        });
                    })
                    .catch((error) => {
                        console.error('There was an error!', error);
                        Notify.create({
                            message: 'Failed to save profile. Please try again.',
                            type: 'negative',
                            position: 'bottom'
                        });
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
                await this.$api
                    .get('/service-provider/data')
                    .then((response) => {
                        const userDataFetched = response.data;
                        this.user = userDataFetched.user || {};
                        this.skills = userDataFetched.user?.skills.length
                            ? userDataFetched.user.skills
                            : [{ name: '' }, { name: '' }, { name: '' }];
                        console.log('userDataFetched.user.skills', userDataFetched.user.skills);
                        this.education = userDataFetched.education || {};
                        this.workExperience = userDataFetched.workExperience || {};
                        this.languages = userDataFetched.languages.length
                            ? userDataFetched.languages
                            : [
                                  { language: '', proficiency: '' },
                                  { language: '', proficiency: '' }
                              ];
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
                this.user = userData || {};
                this.skills = userData.skills || [];
                console.log('userData.skills', userData.skills);
                this.education = education || {};
                this.workExperience = workExperience || {};
                this.languages = languages || [];
                console.log('Session storage assigned', this.user);
            } else {
                console.error('Missing userId in sessionStorage');
            }
        },
        filterCountries(val, update) {
            update(() => {
                const needle = val.toLowerCase();
                this.countries = this.countries.filter((v) => v.toLowerCase().indexOf(needle) > -1);
            });
        }
    },
    async created() {
        await this.loadUserData();
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
    color: #f2f2f2;
}

.profile-container {
    position: relative;
}

.custom-file-upload {
    border: 2px solid #f5f5f5;
    border-radius: 50%;
    background-color: #c4b4d3;
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    position: absolute;
    top: 75%;
    right: 39%;
    transform: translateY(-50%);
}
</style>
