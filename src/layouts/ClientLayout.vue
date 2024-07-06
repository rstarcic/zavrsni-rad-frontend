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

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered dark>
      <!-- drawer content -->
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            :to="`/client/${clientType}/search-jobs`"
            :class="{ active: activeItem === 'searchJobs' }"
            clickable
            v-ripple
            @click="setActive('searchJobs')"
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-magnifying-glass" />
            </q-item-section>

            <q-item-section> Search jobs </q-item-section>
          </q-item>

          <q-item
            :to="`/client/${clientType}/posted-jobs`"
            :class="{ active: activeItem === 'postedJobs' }"
            clickable
            v-ripple
            @click="setActive('postedJobs')"
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-list" />
            </q-item-section>

            <q-item-section> Posted jobs </q-item-section>
          </q-item>

          <q-item
            :to="`/client/${clientType}/post-jobs`"
            :class="{ active: activeItem === 'postNewJob' }"
            clickable
            v-ripple
            @click="setActive('postNewJob')"
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-plus" />
            </q-item-section>

            <q-item-section> Post a new job </q-item-section>
          </q-item>

          <q-item
            :to="`/client/${clientType}/generate-contract`"
            :class="{ active: activeItem === 'generatedContracts' }"
            clickable
            v-ripple
            @click="setActive('generatedContracts')"
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-pen-to-square" />
            </q-item-section>

            <q-item-section> Generated contracts </q-item-section>
          </q-item>

          <q-item
            :to="`/client/${clientType}/profile`"
            exact
            :class="{ active: activeItem === 'profile' }"
            clickable
            v-ripple
            @click="setActive('profile')"
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-user" />
            </q-item-section>

            <q-item-section> Profile </q-item-section>
          </q-item>

          <q-separator dark />

          <q-item
            :to="`/client/${clientType}/settings`"
            :class="{ active: activeItem === 'settings' }"
            clickable
            v-ripple
            @click="setActive('settings')"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>Settings</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Client</div>
          <div>client@gmail.com</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "ClientLayout",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const leftDrawerOpen = ref(false);
    const activeItem = ref("");
    const route = useRoute();
    const user = computed(() => JSON.parse(sessionStorage.getItem("user")));
    const clientType = computed(() => props.type);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    function setActive(itemName) {
      activeItem.value = itemName;
    }
    onMounted(() => {
      const routeToItemMap = {
        [`/client/${clientType.value}/search-jobs`]: "searchJobs",
        [`/client/${clientType.value}/posted-jobs`]: "postedJobs",
        [`/client/${clientType.value}/post-jobs`]: "postNewJob",
        [`/client/${clientType.value}/generate-contract`]: "generatedContracts",
        [`/client/${clientType.value}/profile`]: "profile",
        [`/client/${clientType.value}/settings`]: "settings",
      };
      activeItem.value = routeToItemMap[route.path] || "";
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      setActive,
      activeItem,
      user,
      clientType,
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
.active {
  background-color: #6c1cd4;
  color: white;
}
</style>
