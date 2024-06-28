<template>
  <div class="alignment">
    <q-card class="signup-card shadow-10">
      <q-icon size="64px">
        <img src="../assets/employment.png" alt="Employment" />
      </q-icon>
      <q-card-section>
        <div class="text-h6 title text-purple-1">SIGN UP</div>
        <div class="text-subtitle2 subtitle text-purple-1">
          Dear user, please sign up as a
          <div class="dynamic-text">
            <span v-if="clientType === 'individual'">Private Individual</span>
            <span v-else>Business Company</span>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <SignupForm :clientType="clientType" @sign-up="signUp" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import SignupForm from "../components/RegistrationForm.vue";

export default {
  name: "SignupClient",
  props: {
    clientType: {
      type: String,
      required: true,
    },
  },
  components: {
    SignupForm,
  },
  methods: {
    signUp(userData) {
      axios
        .post(`http://localhost:3001/api/auth/signup/client`, userData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          const user = response.data.user;
          sessionStorage.setItem("user", JSON.stringify(user));
          console.log("Use auth signup client role:", user);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
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

.title,
.subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.dynamic-text {
  display: inline;
  margin-left: 5px;
}
</style>
