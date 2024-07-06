<template>
  <div class="alignment q-mt-xl">
    <q-card class="profile-card q-pa-md">
      <update-client-profile
        @updateClientProfileData="handleUserData"
      ></update-client-profile>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import UpdateClientProfile from "src/components/UpdateClientProfile.vue";
export default {
  name: "ClientProfile",
  props: {
    clientType: {
      type: String,
      required: true,
    },
  },
  components: {
    UpdateClientProfile,
  },
  data() {
    return {};
  },
  methods: {
    async handleUserData(userData) {
      const userSessionData = JSON.parse(sessionStorage.getItem("user"));
      if (!userSessionData) {
        console.error("No user session data found");
        return;
      }
      console.log("userSessionData", userSessionData);
      const userId = userSessionData.dataValues.id;
      console.log("this.clientType", this.clientType);
      if (userSessionData) {
        const userDataToUpdate = { ...userData, userId };
        await axios
          .patch(
            `http://localhost:3001/client/${this.clientType}/profile'`,
            userDataToUpdate
          )
          .then((response) => {
            if (response.data && response.data.userDataUpdated) {
              console.log("Update successful:", response.data.userDataUpdated);
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
  },
};
</script>

<style>
.alignment {
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-card {
  background-color: #ffffff !important;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.about-me-card {
  width: 500px;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
