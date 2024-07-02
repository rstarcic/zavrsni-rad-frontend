<template>
  <div class="alignment q-mt-xl">
    <q-card class="profile-card q-pa-md">
      <update-profile-component
        @updateProfileData="handleUserData"
      ></update-profile-component>
    </q-card>
    <q-card class="info-card q-pa-md">
      <education-component @updateEducationData="handleUpdateEducation" />
    </q-card>
    <q-card class="info-card q-pa-md">
      <work-experience-component />
    </q-card>
    <q-card class="about-me-card q-pa-md">
      <div class="text-h6">About Me</div>
      <div class="q-pa-md q-gutter-sm">
        <q-editor
          v-model="aboutMeText"
          min-height="5rem"
          placeholder="Write something about yourself..."
        />
        <div class="center">
          <q-btn class="q-mt-md" @click="saveAboutMe">Save</q-btn>
        </div>
      </div>
    </q-card>
    <q-card class="info-card q-pa-md">
      <skills-component />
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import UpdateProfileComponent from "src/components/UpdateProfileComponent.vue";
import EducationComponent from "src/components/EducationComponent.vue";
import WorkExperienceComponent from "src/components/WorkExperienceComponent.vue";
import SkillsComponent from "src/components/SkillsComponent.vue";
export default {
  name: "ServiceProviderProfile",
  data() {
    return {};
  },
  components: {
    UpdateProfileComponent,
    EducationComponent,
    WorkExperienceComponent,
    SkillsComponent,
  },
  methods: {
    async handleUserData(userData) {
      const userSessionData = JSON.parse(sessionStorage.getItem("user"));
      console.log("userSessionData", userSessionData);
      const userId = userSessionData.dataValues.id;
      if (userSessionData) {
        const userDataToUpdate = { ...userData, userId };
        console.log("userDataToUpdate", userDataToUpdate);
        await axios
          .patch(
            `http://localhost:3001/api/service-provider/profile`,
            userDataToUpdate
          )
          .then((response) => {
            console.log("Server response:", response);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      } else {
        console.error("User session data not found");
      }
    },
    async handleUpdateEducation(educationList) {
      const userSessionData = JSON.parse(sessionStorage.getItem("user"));
      const userId = userSessionData.dataValues.id;
      try {
        const response = await axios.post(
          `http://localhost:3001/api/service-provider/profile/education`,
          { educationList, userId }
        );
        sessionStorage.setItem(
          "education",
          JSON.stringify(response.data.educationCreated)
        );
        console.log("Education updated successfully.");
      } catch (error) {
        console.error("Error updating education:", error);
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
