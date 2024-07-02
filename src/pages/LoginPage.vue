<template>
  <div class="alignment">
    <q-card class="login-card shadow-10">
      <q-card-section>
        <div class="text-h6">LOGIN</div>
        <div class="text-subtitle2">Dear user, please login</div>
      </q-card-section>
      <q-input
        v-model="email"
        label-color="purple-2"
        color="purple-2"
        label="Email"
        stack-label
        dark
      >
        <template v-slot:append>
          <q-icon class="fas fa-envelope" size="20px"></q-icon>
        </template>
      </q-input>
      <q-input
        label="Password"
        label-color="purple-2"
        color="purple-2"
        stack-label
        v-model="password"
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
      <q-btn
        class="login-btn"
        color="#f2f2f2"
        label="Sign Up"
        @click="login"
        size="12px"
      />
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      IsPasswordShowed: false,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3001/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          const user = response.data.user;
          console.log(user);
          if (user.dataValues.role === "service provider") {
            this.$router.push("/service-provider/search-jobs");
          } else if (user.dataValues.role === "client") {
            if (user.dataValues.type === "individual")
              this.$router.push("/client/individual/search-jobs");
            else if (user.dataValues.type === "business") {
              this.$router.push("/client/business/search-jobs");
            } else {
              console.error("Unknown client type:", user.dataValues.type);
            }
          } else {
            console.error("Unknown role:", userRole);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.errorMessage = "Incorrect email or password.";
          } else {
            console.error("There was an error!", error);
            this.errorMessage = "An error occurred. Please try again later.";
          }
        });
    },
    togglePasswordVisibility() {
      this.IsPasswordShowed = !this.IsPasswordShowed;
    },
  },
};
</script>

<style scoped>
.login-card {
  width: 400px;
  height: 400px;
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
  height: 80vh;
}

.text-h6,
.text-subtitle2 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  color: #f2f2f2;
}

.login-btn {
  margin: 20px;
}

.q-input {
  margin: 5px 0px;
}
</style>
