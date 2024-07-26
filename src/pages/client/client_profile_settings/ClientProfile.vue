<template>
    <div class="alignment q-mt-xl">
        <q-card class="profile-card q-pa-md">
            <div class="flex flex-center">
                <div class="full-width column items-center profile-container">
                    <q-avatar size="150px" font-size="52px" color="teal" text-color="white">
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
                <div class="q-pa-md example-row-equal-width">
                    <div v-if="user.type === 'business'">
                        <div class="row q-pb-md text-subtitle1">Business information</div>
                        <div class="col">
                            <q-input
                                v-model="user.companyName"
                                label-color="#050301"
                                color="purple-5"
                                label="Company name"
                                stack-label
                            >
                            </q-input>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row q-pb-md text-subtitle1">Personal information</div>
                        <div class="row justify-center q-gutter-sm">
                            <div class="col">
                                <q-input
                                    v-model="user.firstName"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="First name"
                                    stack-label
                                >
                                </q-input>
                            </div>
                            <div class="col">
                                <q-input
                                    v-model="user.lastName"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="Last name"
                                    stack-label
                                >
                                </q-input>
                            </div>
                        </div>

                        <div class="row justify-center q-gutter-sm">
                            <div class="col">
                                <q-select
                                    v-model="user.gender"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="Gender"
                                    stack-label
                                    :options="genderOptions"
                                    popup-content-style="background-color: #642b73; color: white;"
                                />
                            </div>

                            <div class="col">
                                <q-input
                                    v-model="user.dateOfBirth"
                                    type="date"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="Date of birth"
                                    stack-label
                                    years-in-month-view
                                >
                                </q-input>
                            </div>
                        </div>
                    </div>

                    <div class="row q-pt-lg q-pb-md text-subtitle1">Contact information</div>
                    <div class="row justify-center q-gutter-sm">
                        <div class="col">
                            <q-input
                                v-model="user.phoneNumber"
                                type="tel"
                                mask="(###) ### - ####"
                                label-color="#050301"
                                color="purple-5"
                                label="Phone number"
                                stack-label
                            />
                        </div>

                        <div class="col">
                            <q-select
                                v-model="user.country"
                                :options="countries"
                                label-color="#050301"
                                color="purple-5"
                                label="Country"
                                stack-label
                                popup-content-style="background-color: #642b73; color: white; width:200px;"
                                use-input
                                input-debounce="0"
                                @filter="filterCountries"
                            >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey"> No results </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                    </div>

                    <div class="row justify-center q-gutter-sm">
                        <div class="col">
                            <q-input
                                v-model="user.city"
                                label-color="#050301"
                                color="purple-5"
                                label="City"
                                stack-label
                                style="max-width: 200px"
                            />
                        </div>

                        <div class="col">
                            <q-input
                                v-model="user.address"
                                label-color="#050301"
                                color="purple-5"
                                label="Address"
                                stack-label
                                style="max-width: 200px"
                            />
                        </div>

                        <div class="col">
                            <q-input
                                v-model="user.postalCode"
                                label-color="#050301"
                                color="purple-5"
                                label="Postal code"
                                stack-label
                                style="max-width: 200px"
                            >
                            </q-input>
                        </div>
                    </div>

                    <div class="row text-subtitle1 q-pt-lg q-pb-md">Documents</div>
                    <div v-if="user.type === 'individual'">
                        <div class="row justify-center q-gutter-sm">
                            <div class="col">
                                <q-select
                                    v-model="user.documentType"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="Document type"
                                    stack-label
                                    :options="documentTypes"
                                    popup-content-style="background-color: #642b73; color: white;"
                                />
                            </div>

                            <div class="col">
                                <q-input
                                    v-model="user.documentNumber"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="Document number"
                                    stack-label
                                />
                            </div>
                        </div>
                    </div>
                    <div v-if="user.type === 'business'">
                        <div class="col">
                            <q-input
                                v-model="user.VATnumber"
                                :rules="vatNumberRules"
                                label-color="#050301"
                                color="purple-5"
                                label="VAT registration number"
                                stack-label
                            />
                        </div>
                    </div>
                    <div class="save-changes-container">
                        <div class="q-mt-lg">
                            <q-btn class="save-changes-btn q-my-lg" @click="saveProfileChanges">Save changes</q-btn>
                        </div>
                    </div>
                </div>
            </div>
        </q-card>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import { countries } from 'src/assets/location';
import configuration from 'src/configuration';
import utils from 'src/utils';
import image from 'src/assets/profile-account-unknown.jpg';
export default {
    name: 'ClientProfile',
    data() {
        return {
            user: {
                profileImage: null,
                type: null,
                companyName: null,
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
                VATnumber: null
            },
            defaultImage: image,
            documentTypes: configuration.documentTypes,
            countries: countries,
            genderOptions: configuration.genderOptions,
            vatNumberRules: utils.vatNumberRules
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
        async loadUserData() {
            let userData = JSON.parse(sessionStorage.getItem('user'));
            let userId = JSON.parse(sessionStorage.getItem('userId'));
            if (!userData && userId) {
                await this.$api
                    .get('/client/data')
                    .then((response) => {
                        userData = response.data.userDataFetched;
                        sessionStorage.setItem('user', JSON.stringify(response.data.userDataFetched));
                        console.log('repsonse image:', response.data.userDataFetched.profileImage);
                        console.log('repsonse user:', response.data.userDataFetched);
                        Object.assign(this.user, userData);
                        console.log('Api assigned', this.user);
                    })
                    .catch((error) => {
                        console.error('There was an error fetching user data!', error);
                    });
            } else if (userData) {
                this.user = { ...userData };
                console.log('Session storage assigned', this.user);
            }
        },
        async saveProfileChanges() {
            const userId = JSON.parse(sessionStorage.getItem('userId'));
            if (userId) {
                const userDataToUpdate = {
                    user: this.user,
                    userId
                };
                await this.$api
                    .patch(`/client/profile`, userDataToUpdate)
                    .then((response) => {
                        console.log('repsonse image:', response.data.userDataUpdated.profileImage);
                        sessionStorage.setItem('user', JSON.stringify(response.data.userDataUpdated));
                        console.log('repsonse user:', response.data.userDataUpdated);
                        this.user.profileImage = response.data.userDataUpdated.profileImage;
                        console.log('Server response:', response.data.userDataUpdated);
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

<style scoped>
.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-card {
    background-color: #fff1fa !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.save-changes-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.save-changes-btn {
    background-color: #8462a5;
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
    top: 80%;
    right: 38%;
    transform: translateY(-50%);
}
</style>
