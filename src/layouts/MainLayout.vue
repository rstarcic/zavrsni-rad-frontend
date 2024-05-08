<template>
  <q-layout view="hHh lpR fFf" class="background-color">
    <q-header elevated class="bg-header-color" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <img
            src="../assets/blackJobifyLogo.png"
            alt="Jobify Logo"
            style="max-width: 150px"
            @click="this.$router.push('/')"
          />
        </q-toolbar-title>
        <q-btn
          class="loginBtn q-mx-md"
          size="md"
          padding="xs lg"
          @click="this.$router.push('/login')"
          >Login</q-btn
        >
        <q-btn-dropdown
          label="Sign Up"
          dropdown-icon="change_history"
          class="signupBtn"
          size="md"
          padding="xs md"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onItemClick('/signup/employer')"
            >
              <q-item-section>
                <q-item-label>Employer</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="onItemClick('/signup/job-seeker')"
            >
              <q-item-section>
                <q-item-label>Job seeker</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
      <q-toolbar inset class="bg2-header-color justify-center"> </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <img
          src="/assets/blackJobifyLogo.png"
          alt="Jobify Logo"
          style="max-width: 150px"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  name: "MainLayout",
  methods: {
    onItemClick(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.bg-header-color {
  background-color: #050301;
}
.bg2-header-color {
  background-color: #12151b;
}
.loginBtn {
  border: 3px solid;
  border-image: linear-gradient(100deg, #ce9ffc, #a582f7, #8e68b2) 1;
  border-radius: 0%;
}
.signupBtn {
  background: linear-gradient(180deg, #ce9ffc 0%, #a582f7 50%, #8e68b2 100%);
  border-radius: 0px;
}
.background-color {
  background-color: #8e68b2;
}
</style>