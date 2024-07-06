<template>
    <div class="alignment">
        <q-card v-if="!selectionMade" class="selection-card shadow-10">
            <q-card-section>
                <div class="text-h6 title text-purple-1">Select Client Type</div>
                <div class="text-subtitle2 subtitle text-purple-1">Please select your client type</div>
            </q-card-section>
            <div class="q-pa-md selection-buttons">
                <q-btn
                    size="22px"
                    class="q-px-xl q-py-xs q-mx-md"
                    color="purple"
                    label="Private Individual"
                    @click="checkClientType('individual')"
                />
                <q-btn
                    size="22px"
                    class="q-px-xl q-py-xs q-mx-md"
                    color="purple"
                    label="Business Company"
                    @click="checkClientType('business')"
                />
            </div>
        </q-card>

        <q-card class="signup-card" v-if="selectionMade">
            <q-icon size="64px">
                <img src="../../../assets/employment.png" alt="Employment" />
            </q-icon>
            <q-card-section>
                <div class="text-h6 title text-purple-1">SIGN UP</div>
                <div class="text-subtitle2 subtitle text-purple-1">
                    Dear user, please sign up as {{ isBusiness ? 'Business Company' : 'Private Individual' }}
                </div>
            </q-card-section>
            <div v-if="!isBusiness" class="q-pa-md example-row-equal-width">
                <div class="row q-pb-md text-subtitle1 text-purple-1">Personal information</div>
                <div class="row justify-center q-gutter-sm">
                    <div class="col">
                        <q-input
                            v-model="firstName"
                            :rules="firstNameRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="First name"
                            stack-label
                            dark
                        >
                        </q-input>
                    </div>

                    <div class="col">
                        <q-input
                            v-model="lastName"
                            :rules="lastNameRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Last name"
                            stack-label
                            dark
                        >
                        </q-input>
                    </div>
                </div>
                <div class="row justify-center q-gutter-sm">
                    <div class="col">
                        <q-select
                            v-model="gender"
                            :rules="genderRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Gender"
                            stack-label
                            :options="genderOptions"
                            popup-content-style="background-color: #642b73; color: white;"
                            dark
                        />
                    </div>

                    <div class="col">
                        <q-input
                            v-model="dateOfBirth"
                            :rules="dateOfBirthRules"
                            type="date"
                            label-color="purple-2"
                            color="purple-2"
                            label="Date of birth"
                            stack-label
                            dark
                            years-in-month-view
                        >
                        </q-input>
                    </div>
                </div>
                <div class="row q-pt-lg q-pb-md text-subtitle1 text-purple-1">Contact information</div>
                <div class="row justify-center q-gutter-sm">
                    <div class="col">
                        <q-input
                            v-model="phoneNumber"
                            :rules="phoneNumberRules"
                            type="tel"
                            mask="(###) ### - ####"
                            label-color="purple-2"
                            color="purple-2"
                            label="Phone number"
                            stack-label
                            dark
                        />
                    </div>

                    <div class="col">
                        <q-select
                            v-model="country"
                            :rules="countryRules"
                            :options="countries"
                            label-color="purple-2"
                            color="purple-2"
                            label="Country"
                            stack-label
                            popup-content-style="background-color: #642b73; color: white; width:200px;"
                            dark
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
                            v-model="city"
                            :rules="cityRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="City"
                            stack-label
                            style="max-width: 200px"
                            dark
                        />
                    </div>

                    <div class="col">
                        <q-input
                            v-model="address"
                            :rules="addressRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Address"
                            stack-label
                            style="max-width: 200px"
                            dark
                        />
                    </div>

                    <div class="col">
                        <q-input
                            v-model="postalCode"
                            :rules="postalCodeRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Postal code"
                            stack-label
                            style="max-width: 200px"
                            dark
                        >
                        </q-input>
                    </div>
                </div>
                <div class="row text-subtitle1 q-pt-lg q-pb-md text-purple-1">Documents</div>
                <div class="row justify-center q-gutter-sm">
                    <div class="col">
                        <q-select
                            v-model="documentType"
                            :rules="documentTypeRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Document type"
                            stack-label
                            :options="documentTypes"
                            popup-content-style="background-color: #642b73; color: white;"
                            dark
                        />
                    </div>

                    <div class="col">
                        <q-input
                            v-model="documentNumber"
                            :rules="documentNumberRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Document number"
                            stack-label
                            dark
                        />
                    </div>
                </div>
                <div class="row text-subtitle1 q-pt-lg q-pb-md text-purple-1">Account</div>
                <div class="row justify-center q-gutter-sm">
                    <div class="col">
                        <q-input
                            v-model="email"
                            :rules="emailRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Email"
                            stack-label
                            dark
                        >
                        </q-input>
                    </div>

                    <div class="col">
                        <q-input
                            v-model="password"
                            :rules="passwordRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Password"
                            stack-label
                            :type="IsPasswordShowed ? 'text' : 'password'"
                            dark
                        >
                            <template v-slot:append>
                                <q-icon
                                    :name="IsPasswordShowed ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                    size="20px"
                                    class="cursor-pointer"
                                    @click="togglePasswordVisibility"
                                />
                            </template>
                        </q-input>
                    </div>
                </div>
            </div>
            <div v-else class="q-pa-md example-row-equal-width">
                <div class="row q-pt-lg q-pb-md text-subtitle1 text-purple-1">Business information</div>
                <div class="col">
                    <q-input
                        v-model="companyName"
                        :rules="companyNameRules"
                        label-color="purple-2"
                        color="purple-2"
                        label="Company name"
                        stack-label
                        dark
                    >
                    </q-input>
                </div>
                <div class="row q-pt-lg q-pb-md text-subtitle1 text-purple-1">Contact information</div>
                <div class="row justify-center q-gutter-sm">
                    <div class="col">
                        <q-input
                            v-model="phoneNumber"
                            :rules="phoneNumberRules"
                            type="tel"
                            mask="(###) ### - ####"
                            label-color="purple-2"
                            color="purple-2"
                            label="Phone number"
                            stack-label
                            dark
                        />
                    </div>

                    <div class="col">
                        <q-select
                            v-model="country"
                            :rules="countryRules"
                            :options="countries"
                            label-color="purple-2"
                            color="purple-2"
                            label="Country"
                            stack-label
                            popup-content-style="background-color: #642b73; color: white; width:200px;"
                            dark
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
                            v-model="city"
                            :rules="cityRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="City"
                            stack-label
                            style="max-width: 200px"
                            dark
                        />
                    </div>

                    <div class="col">
                        <q-input
                            v-model="address"
                            :rules="addressRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Address"
                            stack-label
                            style="max-width: 200px"
                            dark
                        />
                    </div>

                    <div class="col">
                        <q-input
                            v-model="postalCode"
                            :rules="postalCodeRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Postal code"
                            stack-label
                            style="max-width: 200px"
                            dark
                        >
                        </q-input>
                    </div>
                </div>
                <div class="row text-subtitle1 q-pt-lg q-pb-md text-purple-1">Documents</div>
                <div class="row justify-center q-gutter-sm">
                    <div class="col">
                        <q-input
                            v-model="VATnumber"
                            :rules="vatNumberRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="VAT registration number"
                            stack-label
                            dark
                        />
                    </div>
                </div>
                <div class="row text-subtitle1 q-pt-lg q-pb-md text-purple-1">Account</div>
                <div class="row justify-center q-gutter-sm">
                    <div class="col">
                        <q-input
                            v-model="email"
                            :rules="emailRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Email"
                            stack-label
                            dark
                        >
                        </q-input>
                    </div>

                    <div class="col">
                        <q-input
                            v-model="password"
                            :rules="passwordRules"
                            label-color="purple-2"
                            color="purple-2"
                            label="Password"
                            stack-label
                            :type="IsPasswordShowed ? 'text' : 'password'"
                            dark
                        >
                            <template v-slot:append>
                                <q-icon
                                    :name="IsPasswordShowed ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                    size="20px"
                                    class="cursor-pointer"
                                    @click="togglePasswordVisibility"
                                />
                            </template>
                        </q-input>
                    </div>
                </div>
            </div>
            <div class="row justify-center q-mt-lg">
                <q-btn class="signup-btn" color="#f2f2f2" label="Sign Up" @click="signUp" size="12px" /></div
        ></q-card>
    </div>
</template>

<script>
import axios from 'axios';
import utils from 'src/utils.js';
import configuration from 'src/configuration.js';
import { countries } from 'src/assets/location.js';
export default {
    data() {
        return {
            isBusiness: false,
            selectionMade: false,
            IsPasswordShowed: false,
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
            VATnumber: null,
            email: null,
            password: null,
            genderOptions: configuration.genderOptions,
            countries: countries,
            documentTypes: configuration.documentTypes,
            companyNameRules: utils.companyNameRules,
            firstNameRules: utils.firstNameRules,
            lastNameRules: utils.lastNameRules,
            genderRules: utils.genderRules,
            vatNumberRules: utils.vatNumberRules,
            dateOfBirthRules: utils.dateOfBirthRules,
            phoneNumberRules: utils.phoneNumberRules,
            countryRules: utils.countryRules,
            cityRules: utils.cityRules,
            addressRules: utils.addressRules,
            postalCodeRules: utils.postalCodeRules,
            documentTypeRules: utils.documentTypeRules,
            documentNumberRules: utils.documentNumberRules,
            emailRules: utils.emailRules,
            passwordRules: utils.passwordRules
        };
    },
    methods: {
        checkClientType(type) {
            this.isBusiness = type === 'business';
            this.selectionMade = true;
        },
        togglePasswordVisibility() {
            this.IsPasswordShowed = !this.IsPasswordShowed;
        },
        filterCountries(val, update) {
            update(() => {
                const needle = val.toLowerCase();
                this.countries = this.countries.filter((v) => v.toLowerCase().indexOf(needle) > -1);
            });
        },
        signUp() {
            const baseData = {
                email: this.email,
                password: this.password,
                phoneNumber: this.phoneNumber,
                country: this.country,
                city: this.city,
                address: this.address,
                postalCode: this.postalCode
            };

            let userData = this.isBusiness
                ? {
                      ...baseData,
                      companyName: this.companyName,
                      VATnumber: this.VATnumber,
                      type: 'business'
                  }
                : {
                      ...baseData,
                      firstName: this.firstName,
                      lastName: this.lastName,
                      gender: this.gender,
                      dateOfBirth: this.dateOfBirth,
                      documentType: this.documentType,
                      documentNumber: this.documentNumber,
                      type: 'individual'
                  };
            axios
                .post(`http://localhost:3001/api/auth/signup/client`, userData)
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    const user = response.data.user;

                    sessionStorage.setItem('user', JSON.stringify(user));
                    console.log('Use auth signup client role:', user);

                    if (user.role === 'client' && user.type === 'individual') {
                        this.$router.push('/client/individual/search-jobs');
                    } else if (user.role === 'client' && user.type === 'business') {
                        this.$router.push('/client/business/search-jobs');
                    }
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        }
    }
};
</script>

<style scoped>
.signup-card {
    background-color: #642b73 !important;
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 130vh;
}
.signup-btn {
    margin: 20px;
}

.col {
    margin-top: 20px;
}

.title,
.subtitle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
}

.q-input {
    margin: 0px;
    width: 100%;
    width: 300px;
}
</style>
