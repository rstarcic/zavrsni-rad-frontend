<template>
  <div class="work-experience">
    <div class="text-h6">Work Experience</div>
    <q-list class="full-width">
      <q-item
        v-for="(experience, index) in workExperienceData"
        :key="experience.id"
      >
        <q-item-section>
          <q-input
            v-model="experience.companyName"
            label="Company name"
            dense
          />
          <q-input v-model="experience.jobTitle" label="Job title" dense />
          <q-input
            v-model="experience.startDate"
            label="Start date"
            dense
            type="date"
            stack-label
            years-in-month-view
          />
          <q-input
            v-model="experience.endDate"
            label="End date"
            dense
            type="date"
            stack-label
            years-in-month-view
          />
          <div class="remove-button q-mt-md q-gutter-sm">
            <q-btn
              color="negative"
              @click="removeWorkExperience(index)"
              label="Remove"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="button-container">
      <q-btn
        color="primary"
        @click="addWorkExperience"
        label="Add work experience"
        class="q-mt-md"
      />
      <q-btn @click="saveWorkExperience" label="Save" class="q-mt-md" />
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkExperienceComponent",
  props: {
    workExperienceList: {
      type: Array,
      default: () => [
        { companyName: "", jobTitle: "", startDate: "", endDate: "" },
      ],
    },
  },
  data() {
    return {
      workExperienceData: JSON.parse(JSON.stringify(this.workExperienceList)),
    };
  },
  watch: {
    workExperienceList: {
      handler(newList) {
        this.workExperienceData = JSON.parse(JSON.stringify(newList));
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    saveWorkExperience() {
      this.$emit("updateWorkExperienceData", this.workExperienceData);
    },
    addWorkExperience() {
      if (this.workExperienceData.length < 3) {
        this.workExperienceData.push({
          companyName: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
        });
      } else {
        console.warn("Maximum of 3 work experience entries can be added");
      }
    },
    removeWorkExperience(index) {
      this.workExperienceData.splice(index, 1);
      this.saveWorkExperience();
    },
  },
};
</script>

<style scoped>
.work-experience {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  background-color: #ffffff;
  padding: 5px;
}
.remove-button {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
}
</style>
