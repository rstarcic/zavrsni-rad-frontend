<template>
  <div class="alignment q-mt-xl">
    <q-card class="profile-card q-pa-md">
      <update-profile-component
        @updateProfileData="handleUserData"
      ></update-profile-component>
    </q-card>
    <q-card class="info-card q-pa-md">
      <education-component
        :educationList="educationList"
        @updateEducationData="handleUpdateEducation"
      />
    </q-card>
    <q-card class="info-card q-pa-md">
      <work-experience-component
        :workExperienceList="workExperienceList"
        @updateWorkExperienceData="handleUpdateWorkExperience"
      />
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
      <skills-component
        :skillsData="skills"
        @updateSkillsData="handleUpdateSkills"
      />
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
    return {
      educationList: [],
      aboutMeText: "",
      skills: [],
      workExperienceList: [],
    };
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
    async handleUpdateWorkExperience(workExperienceList) {
      const userSessionData = JSON.parse(sessionStorage.getItem("user"));
      const userId = userSessionData.dataValues.id;
      try {
        const response = await axios.post(
          `http://localhost:3001/api/service-provider/profile/work-experience`,
          { workExperienceList, userId }
        );
        sessionStorage.setItem(
          "work-experience",
          JSON.stringify(response.data.workExperienceCreated)
        );
        console.log("Work experience updated successfully.");
      } catch (error) {
        console.error("Error updating work experience:", error);
      }
    },
    async handleUpdateSkills(newSkills) {
      try {
        const userSessionData = JSON.parse(sessionStorage.getItem("user"));
        const userId = userSessionData.dataValues.id;
        const response = await axios.patch(
          `http://localhost:3001/api/service-provider/profile/skills`,
          { skills: newSkills, userId }
        );

        if (response.status === 200) {
          console.log("Skills updated successfully:", response.data.skills);
          this.skills = response.data.skills;
        } else {
          console.error("Error response from server:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating skills:", error);
      }
    },
    async saveAboutMe() {
      try {
        const userSessionData = JSON.parse(sessionStorage.getItem("user"));
        const userId = userSessionData.dataValues.id;
        const response = await axios.patch(
          `http://localhost:3001/api/service-provider/profile/about-me`,
          { aboutMe: this.aboutMeText, userId }
        );
        if (response.status === 200) {
          userSessionData.aboutMeSummary = response.data.aboutMe;
          sessionStorage.setItem("user", JSON.stringify(userSessionData));
          console.log("About me text saved successfully");
        } else {
          console.error("Error response from server:", response.data.message);
        }
      } catch (error) {
        console.error("Error saving About Me text:", error);
      }
    },
    async loadEducationData() {
      const userSessionData = JSON.parse(sessionStorage.getItem("user"));
      if (!userSessionData) {
        console.error("User session data not found");
        return;
      }
      const userId = userSessionData.dataValues.id;
      try {
        const response = await axios.get(
          `http://localhost:3001/api/service-provider/profile/education/${userId}`
        );
        if (response.data && response.data.educationFetched) {
          this.educationList = response.data.educationFetched;
        } else {
          this.educationList = [
            { id: 1, degree: "", institution: "", startYear: "", endYear: "" },
          ];
        }
        sessionStorage.setItem("education", JSON.stringify(this.educationList));
      } catch (error) {
        console.error("Error loading education data:", error);
      }
    },
    async loadAboutMeText() {
      try {
        const userSessionData = JSON.parse(sessionStorage.getItem("user"));
        if (!userSessionData) {
          throw new Error("User session data not found");
        }
        if (userSessionData.dataValues.aboutMeSummary) {
          console.log("about me iz sesije");
          this.aboutMeText = userSessionData.dataValues.aboutMeSummary;
        } else {
          const userId = userSessionData.dataValues.id;
          const response = await axios.get(
            `http://localhost:3001/api/service-provider/profile/about-me/${userId}`
          );
          if (response.data && response.data.aboutMeTextFetched) {
            console.log("about me iz baze");
            this.aboutMeText = response.data.aboutMeTextFetched;
            userSessionData.dataValues.aboutMeSummary = this.aboutMeText;
            sessionStorage.setItem("user", JSON.stringify(userSessionData));
          }
        }
      } catch (error) {
        console.error("Error loading About Me text:", error);
      }
    },
    async loadSkillsData() {
      const userSessionData = JSON.parse(sessionStorage.getItem("user"));
      if (userSessionData.dataValues.skills) {
        this.skills = userSessionData.dataValues.skills;
        console.log("skills iz sesije", this.skills);
      } else {
        const userId = userSessionData.dataValues.id;
        const response = await axios.get(
          `http://localhost:3001/api/service-provider/profile/skills/${userId}`
        );
        if (response.data && response.data.skillsFetched) {
          console.log("skills iz baze", response.data.skillsFetched);
          this.skills = response.data.skillsFetched;
          userSessionData.dataValues.skills = this.skills;
          sessionStorage.setItem("user", JSON.stringify(userSessionData));
        }
      }
    },
    async loadWorkExperience() {
      const userSessionData = JSON.parse(sessionStorage.getItem("user"));
      if (!userSessionData) {
        console.error("User session data not found");
        return;
      }
      const userId = userSessionData.dataValues.id;
      try {
        const response = await axios.get(
          `http://localhost:3001/api/service-provider/profile/work-experience/${userId}`
        );
        if (response.data && response.data.workExperienceFetched) {
          this.workExperienceList = response.data.workExperienceFetched;
        } else {
          this.workExperienceList = [
            {
              id: 1,
              companyName: "",
              jobTitle: "",
              startDate: "",
              endDate: "",
            },
          ];
        }
        sessionStorage.setItem(
          "work-experience",
          JSON.stringify(this.workExperienceList)
        );
      } catch (error) {
        console.error("Error loading work experience data:", error);
      }
    },
  },
  mounted() {
    this.loadEducationData();
    this.loadAboutMeText();
    this.loadSkillsData();
    this.loadWorkExperience();
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
