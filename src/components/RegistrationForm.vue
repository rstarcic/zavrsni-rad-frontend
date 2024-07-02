<template>
  <div class="q-pa-md example-row-equal-width">
    <div
      class="row q-pt-lg q-pb-md text-subtitle1 text-purple-1"
      v-if="clientType === 'business'"
    >
      Business information
    </div>
    <div class="col" v-if="clientType === 'business'">
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
    <div
      class="row q-pb-md text-subtitle1 text-purple-1"
      v-if="clientType === 'individual'"
    >
      Personal information
    </div>
    <div
      class="row justify-center q-gutter-sm"
      v-if="clientType === 'individual'"
    >
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

    <div
      class="row justify-center q-gutter-sm"
      v-if="clientType === 'individual'"
    >
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

    <div class="row q-pt-lg q-pb-md text-subtitle1 text-purple-1">
      Contact information
    </div>
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

    <div class="row text-subtitle1 q-pt-lg q-pb-md text-purple-1">
      Documents
    </div>
    <div class="row justify-center q-gutter-sm">
      <div class="col" v-if="clientType === 'individual'">
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

      <div class="col" v-if="clientType === 'individual'">
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

      <div class="col" v-if="clientType === 'business'">
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
    <q-btn
      class="login-btn"
      color="#f2f2f2"
      label="Sign Up"
      @click="emitSignUp"
      size="12px"
    />
  </div>
</template>

<script>
import axios from "axios";
import { countries } from "../assets/location";

export default {
  name: "SignupForm",
  props: {
    clientType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
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
      email: "",
      password: "",
      IsPasswordShowed: false,
      countries: countries,
      genderOptions: ["Male", "Female"],
      documentTypes: [
        "ID",
        "Passport",
        "Driving license",
        "Health insurance card",
      ],
      companyNameRules: [
        (val) => !!val || "Company name is required",
        (val) =>
          /^[A-Za-zČĆŠĐŽčćšđž][A-Za-zČĆŠĐŽčćšđž0-9\s\.\,\&\-\']*$/.test(val) ||
          "Invalid company name",
      ],
      firstNameRules: [
        (val) => !!val || "First name is required",
        (val) =>
          /^[A-ZČĆŠĐŽ][a-zčćšđž]*$/.test(val) ||
          "First name must start with a capital letter",
      ],
      lastNameRules: [
        (val) => !!val || "Last name is required",
        (val) =>
          /^[A-ZČĆŠĐŽ][a-zčćšđž]*$/.test(val) ||
          "Last name must start with a capital letter",
      ],
      genderRules: [(val) => !!val || "Gender is required"],
      vatNumberRules: [(val) => !!val || "VAT number is required"],
      dateOfBirthRules: [
        (val) => !!val || "Date of birth is required",
        (val) => {
          if (!val) return true;
          const currentDate = new Date();
          const birthDate = new Date(val);
          const age = currentDate.getFullYear() - birthDate.getFullYear();
          const isOlderThan18 =
            age > 18 ||
            (age === 18 && birthDate.getMonth() < currentDate.getMonth());
          return (
            isOlderThan18 || "You must be older than 18 or exactly 18 years old"
          );
        },
      ],

      phoneNumberRules: [
        (val) => !!val || "Phone number is required",
        (val) =>
          /^\(\d{3}\)\s\d{3}\s-\s\d{4}$/.test(val) || "Invalid phone number",
      ],
      countryRules: [(val) => !!val || "Country is required"],
      cityRules: [(val) => !!val || "City is required"],
      addressRules: [(val) => !!val || "Address is required"],
      postalCodeRules: [
        (val) => !!val || "Postal code is required",
        (val) =>
          /^\d{5,9}$/.test(val) ||
          "ZIP / Postal Code must be between 5 and 9 digits",
      ],
      documentTypeRules: [(val) => !!val || "Document type is required"],
      documentNumberRules: [(val) => !!val || "Document number is required"],
      emailRules: [
        (val) => !!val || "Email is required",
        (val) => /.+@.+\..+/.test(val) || "Invalid email",
      ],
      passwordRules: [
        (val) => !!val || "Password is required",
        (val) =>
          val.length >= 6 || "Password must be at least 6 characters long",
      ],
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.IsPasswordShowed = !this.IsPasswordShowed;
    },
    filterCountries(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.countries = this.countries.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    emitSignUp() {
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
      this.$emit("sign-up", userData);
    },
  },
};
</script>

<style scoped>
.login-btn {
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
