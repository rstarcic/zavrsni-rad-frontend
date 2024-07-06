<template>
  <div class="flex flex-center">
    <div class="full-width column items-center">
      <q-avatar
        size="150px"
        font-size="52px"
        color="teal"
        text-color="white"
        @click="triggerFileUpload"
      >
        <template v-if="photoUrl">
          <img :src="photoUrl" />
        </template>
        <template v-else>
          <q-icon name="cloud_upload" />
        </template>
      </q-avatar>

      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        hidden
        accept="image/*"
      />
    </div>
    <div class="q-pa-md example-row-equal-width">
      <div v-if="clientType === 'business'">
        <div class="row q-pb-md text-subtitle1">Business information</div>
        <div class="col">
          <q-input
            v-model="companyName"
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
              v-model="firstName"
              label-color="#050301"
              color="purple-5"
              label="First name"
              stack-label
            >
            </q-input>
          </div>

          <div class="col">
            <q-input
              v-model="lastName"
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
              v-model="gender"
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
              v-model="dateOfBirth"
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
            v-model="phoneNumber"
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
            v-model="country"
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
            v-model="city"
            label-color="#050301"
            color="purple-5"
            label="City"
            stack-label
            style="max-width: 200px"
          />
        </div>

        <div class="col">
          <q-input
            v-model="address"
            label-color="#050301"
            color="purple-5"
            label="Address"
            stack-label
            style="max-width: 200px"
          />
        </div>

        <div class="col">
          <q-input
            v-model="postalCode"
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
      <div v-if="clientType === 'individual'">
        <div class="row justify-center q-gutter-sm">
          <div class="col">
            <q-select
              v-model="documentType"
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
              v-model="documentNumber"
              label-color="#050301"
              color="purple-5"
              label="Document number"
              stack-label
            />
          </div>
        </div>
      </div>
      <div v-if="clientType === 'business'">
        <div class="col">
          <q-input
            v-model="VATnumber"
            :rules="vatNumberRules"
            label-color="#050301"
            color="purple-5"
            label="VAT registration number"
            stack-label
          />
        </div>
      </div>
      <div class="center">
        <q-btn class="save-changes-btn q-my-lg" @click="emitSaveChanges"
          >Save changes</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { countries } from "../assets/location";
export default {
  name: "UpdateClientProfile",
  data() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return {
      clientType: user ? user.dataValues.type : null,
      companyName: "",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
      country: "",
      city: "",
      address: "",
      postalCode: "",
      documentType: "",
      documentNumber: "",
      VATnumber: "",
      photoUrl: null,
      genderOptions: ["Male", "Female"],
      documentTypes: [
        "ID",
        "Passport",
        "Driving license",
        "Health insurance card",
      ],
      countries: countries,
      vatNumberRules: [
        (val) => !!val || "VAT number is required",
        (val) => (val && val.length === 10) || "VAT number must be 10 digits",
      ],
    };
  },
  methods: {
    emitSaveChanges() {
      const userData = {
        type: this.clientType,
        companyName: this.companyName,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
        documentType: this.documentType,
        documentNumber: this.documentNumber,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        VATnumber: this.VATnumber,
        country: this.country,
        city: this.city,
        address: this.address,
        postalCode: this.postalCode,
      };

      if (this.clientType === "individual") {
        userData.type = this.clientType;
        userData.firstName = this.firstName;
        userData.lastName = this.lastName;
        userData.gender = this.gender;
        userData.dateOfBirth = this.dateOfBirth;
        userData.documentType = this.documentType;
        userData.documentNumber = this.documentNumber;
        userData.email = this.email;
        userData.password = this.password;
        userData.phoneNumber = this.phoneNumber;
        userData.country = this.country;
        userData.city = this.city;
        userData.address = this.address;
        userData.postalCode = this.postalCode;
      } else if (this.clientType === "business") {
        userData.type = this.clientType;
        userData.companyName = this.companyName;
        userData.phoneNumber = this.phoneNumber;
        userData.country = this.country;
        userData.city = this.city;
        userData.address = this.address;
        userData.postalCode = this.postalCode;
        userData.VATnumber = this.VATnumber;
        userData.email = this.email;
        userData.password = this.password;
      }
      this.$emit("updateClientProfileData", userData);
    },
    loadUserData() {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      const user = userData.dataValues || userData;
      if (user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.gender = user.gender;
        this.dateOfBirth = user.dateOfBirth;
        this.phoneNumber = user.phoneNumber;
        this.country = user.country;
        this.city = user.city;
        this.address = user.address;
        this.postalCode = user.postalCode;
        this.documentType = user.documentType;
        this.documentNumber = user.documentNumber;
      }
    },
  },
  created() {
    this.loadUserData();
  },
};
</script>
