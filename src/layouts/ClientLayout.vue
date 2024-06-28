<template>
  <q-layout view="hHh lpR fFf" class="background-color">
    <q-header elevated class="bg-header-color" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <img
            src="../assets/blackJobifyLogo.png"
            alt="Jobify Logo"
            style="max-width: 150px"
            @click="this.$router.push('/')"
          />
        </q-toolbar-title>
        <q-btn
          class="logoutBtn q-mx-md"
          size="md"
          padding="xs lg"
          @click="this.$router.push('/')"
          >Logout</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ClientLayout",
  setup() {
    const leftDrawerOpen = ref(false);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.background-color {
  background-color: #8e68b2;
}
.bg-header-color {
  background-color: #050301;
}
.logoutBtn {
  border: 3px solid;
  border-image: linear-gradient(100deg, #ce9ffc, #a582f7, #8e68b2) 1;
  border-radius: 0%;
}
</style>
