<template>
    <q-page class="q-pa-xl">
        <q-card class="profile-card">
            <div class="full-width column items-center profile-container">
                <q-avatar class="q-ma-md" size="170px" font-size="52px">
                    <template v-if="user.profileImage">
                        <img :src="user.profileImage" />
                    </template>
                    <template v-else>
                        <img :src="defaultImage" />
                    </template>
                </q-avatar>
            </div>
            <q-card-section>
                <div class="q-pa-md example-row-equal-width">
                    <div class="text-h6 q-mx-xl q-my-md text-align">About Me</div>
                    <q-card flat bordered class="col-12 col-md-5 q-mx-md q-my-sm">
                        <q-card-section class="q-pa-md">
                            <div v-html="user.aboutMeSummary" class="text-subtitle1"></div>
                        </q-card-section>
                    </q-card>

                    <div class="text-h6 q-mx-xl q-my-md text-align">Personal Information</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-card flat bordered class="col-8 q-pa-md">
                            <div class="row">
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="account_circle" class="q-mr-sm" />
                                    <strong> First Name: </strong>
                                    <span> {{ user.firstName }} </span>
                                </div>
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="account_circle" class="q-mr-sm" />
                                    <strong> Last Name: </strong>
                                    <span> {{ user.lastName }} </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="wc" class="q-mr-sm" />
                                    <strong> Gender: </strong>
                                    <span> {{ user.gender }} </span>
                                </div>
                                <div class="col-12 col-md-6">
                                    <q-icon name="cake" class="q-mr-sm" />
                                    <strong> Date of Birth: </strong>
                                    <span> {{ user.dateOfBirth }} </span>
                                </div>
                            </div>
                        </q-card>
                    </div>

                    <div class="text-h6 q-mx-xl q-my-md text-align">Contact Information</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-card flat bordered class="col-9 q-pa-md">
                            <div class="row">
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="email" class="q-mr-sm" />
                                    <strong> Email: </strong>
                                    <span> {{ user.email }} </span>
                                </div>
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="phone" class="q-mr-sm" />
                                    <strong> Phone Number: </strong>
                                    <span> {{ user.phoneNumber }} </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="public" class="q-mr-sm" />
                                    <strong> Country: </strong>
                                    <span> {{ user.country }} </span>
                                </div>
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="place" class="q-mr-sm" />
                                    <strong> City: </strong>
                                    <span> {{ user.city }} </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="home" class="q-mr-sm" />
                                    <strong> Address: </strong>
                                    <span> {{ user.address }} </span>
                                </div>
                                <div class="col-12 col-md-6">
                                    <q-icon name="markunread_mailbox" class="q-mr-sm" />
                                    <strong> Postal Code: </strong>
                                    <span> {{ user.postalCode }} </span>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="text-h6 q-mx-xl q-my-md text-align">Documents</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-card flat bordered class="col-10 q-pa-md">
                            <div class="row">
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="description" class="q-mr-sm" />
                                    <strong> Document Type: </strong>
                                    <span> {{ user.documentType }} </span>
                                </div>
                                <div class="col-12 col-md-6 q-mb-md">
                                    <q-icon name="format_list_numbered" class="q-mr-sm" />
                                    <strong> Document Number: </strong>
                                    <span> {{ user.documentNumber }} </span>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="text-h6 q-mx-xl q-my-md text-align">Present or Most Recent Education</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-card flat bordered class="col-12 col-md-6 q-pa-md">
                            <div class="q-mb-md">
                                <q-icon name="school" class="q-mr-sm" />
                                <strong>Institution:</strong>
                                <span>{{ education.institution }}</span>
                            </div>
                            <div class="q-mb-md">
                                <q-icon name="local_library" class="q-mr-sm" />
                                <strong>Degree:</strong>
                                <span>{{ education.degree }}</span>
                            </div>
                            <div class="q-mb-md">
                                <q-icon name="event" class="q-mr-sm" />
                                <strong>Start Date:</strong>
                                <span>{{ education.startDate }}</span>
                            </div>
                            <div>
                                <q-icon name="date_range" class="q-mr-sm" />
                                <strong> End Date: </strong>
                                <span> {{ education.endDate }} </span>
                            </div>
                        </q-card>
                    </div>

                    <div class="text-h6 q-mx-xl q-my-md text-align">Present or Most Recent Work Experience</div>
                    <div class="row justify-center q-gutter-sm">
                        <q-card flat bordered class="col-12 col-md-6 q-pa-md">
                            <div class="q-mb-md">
                                <q-icon name="business" class="q-mr-sm" />
                                <strong> Company Name: </strong>
                                <span> {{ workExperience.companyName }} </span>
                            </div>
                            <div class="q-mb-md">
                                <q-icon name="assignment_ind" class="q-mr-sm" />
                                <strong> Job Title: </strong>
                                <span> {{ workExperience.jobTitle }} </span>
                            </div>
                            <div class="q-mb-md">
                                <q-icon name="date_range" class="q-mr-sm" />
                                <strong> Start Date: </strong>
                                <span> {{ workExperience.startDate }} </span>
                            </div>
                            <div>
                                <q-icon name="date_range" class="q-mr-sm" />
                                <strong> End Date: </strong>
                                <span> {{ workExperience.endDate }} </span>
                            </div>
                        </q-card>
                    </div>
                    <div class="text-h6 q-mx-xl q-my-md text-align">Languages</div>
                    <div class="row justify-center q-gutter-sm">
                        <div
                            v-for="(language, index) in languages"
                            :key="'language' + index"
                            class="col-12 col-md-6 q-mb-md"
                        >
                            <q-card flat bordered class="q-pa-md">
                                <div class="q-mb-md">
                                    <q-icon name="language" class="q-mr-sm" />
                                    <strong> Language: </strong>
                                    <span> {{ language.language }} </span>
                                </div>
                                <div>
                                    <q-icon name="trending_up" class="q-mr-sm" />
                                    <strong> Proficiency: </strong>
                                    <span> {{ language.proficiency }} </span>
                                </div>
                            </q-card>
                        </div>
                    </div>

                    <div class="text-h6 q-mx-xl q-my-md text-align">Skills</div>
                    <div class="row justify-center q-gutter-sm">
                        <div v-for="(skill, index) in skills" :key="index" class="q-ma-md">
                            <q-chip v-if="skill.name" color="purple-7" text-color="white" class="q-ma-sm" icon="circle">
                                {{ skill.name }}
                            </q-chip>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { Notify } from 'quasar';
import configuration from 'src/configuration.js';
import utils from 'src/utils';
import image from 'src/assets/profile-account-unknown.jpg';
export default {
    props: {
        jobId: {
            type: String,
            required: true
        },
        candidateId: {
            type: String,
            required: true
        }
    },
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
            proficiencyLevels: configuration.proficiencyLevels,
            dateOfBirthRules: utils.dateOfBirthRules,
            phoneNumberRules: utils.phoneNumberRules
        };
    },
    methods: {
        async fetchServiceProviderData() {
            await this.$api
                .get(`/client/candidates/${this.candidateId}`)
                .then((response) => {
                    const data = response.data;
                    console.log('Service provider profile data', response.data);
                    this.user = data.user;
                    this.skills = data.user?.skills.length
                        ? data.user.skills
                        : [{ name: '' }, { name: '' }, { name: '' }];
                    this.education = data.education || {};
                    this.workExperience = data.workExperience || {};
                    this.languages = data.languages.length
                        ? data.languages
                        : [
                              { language: '', proficiency: '' },
                              { language: '', proficiency: '' }
                          ];
                })
                .catch((error) => {
                    console.error('There was an error fetching user data!', error);
                });
        }
    },
    async mounted() {
        await this.fetchServiceProviderData();
    }
};
</script>

<style scoped>
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

.text-align {
    margin-left: 100px;
}
</style>
