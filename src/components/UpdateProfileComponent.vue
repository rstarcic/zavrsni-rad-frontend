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
      <div class="center">
        <q-btn class="save-changes-btn q-my-lg" @click="saveChanges"
          >Save changes</q-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { countries } from "../assets/location";

export default {
  name: "UpdateProfileComponent",
  data() {
    return {
      file: null,
      userId: "",
      photoUrl: "",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
      country: "",
      countries: countries,
      city: "",
      address: "",
      postalCode: "",
      documentType: "",
      documentNumber: "",
      genderOptions: ["Male", "Female"],
      documentTypes: [
        "ID",
        "Passport",
        "Driving license",
        "Health insurance card",
      ],
    };
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      var sessionStorageData = JSON.parse(sessionStorage.getItem("user"));
      console.log(sessionStorageData.dataValues.id);
      formData.append("userId", sessionStorageData.dataValues.id);

      try {
        const response = await axios.post(
          "http://localhost:3001/api/service-provider/profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Server response:", response);
        this.fetchPhoto();
      } catch (error) {
        console.error(
          "Upload error:",
          error.response ? error.response.data : error.message
        );
      }
    },
    fetchPhoto() {
      const sessionStorageData = JSON.parse(sessionStorage.getItem("user"));
      const userId = sessionStorageData.dataValues.id;
      axios
        .get(`http://localhost:3001/api/service-provider/profile/${userId}`)
        .then((response) => {
          console.log(response.data.photoUrl);
          this.photoUrl = response.data.photoUrl;
          console.log("Photo URL:", this.photoUrl);
        })
        .catch((error) => {
          console.error("Error fetching photo:", error);
        });
    },
    loadUserData() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      user = user.dataValues;
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
    saveChanges() {
      this.$emit("updateProfileData", {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
        phoneNumber: this.phoneNumber,
        country: this.country,
        city: this.city,
        address: this.address,
        postalCode: this.postalCode,
        documentType: this.documentType,
        documentNumber: this.documentNumber,
      });
    },
  },
  mounted() {
    this.fetchPhoto();
  },
  created() {
    this.loadUserData();
  },
};
</script>

<style scoped>
.title,
.subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  color: "#050301";
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
