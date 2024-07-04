<template>
  <div class="education">
    <div class="text-h6">Education</div>
    <q-list class="full-width">
      <q-item v-for="(education, index) in educationData" :key="education.id">
        <q-item-section>
          <q-input v-model="education.institution" label="Institution" dense />
          <q-input v-model="education.degree" label="Degree" dense />
          <q-input
            v-model="education.startDate"
            label="Start date"
            dense
            type="date"
            stack-label
            years-in-month-view
          />
          <q-input
            v-model="education.endDate"
            label="End date"
            dense
            type="date"
            stack-label
            years-in-month-view
          />
          <div class="remove-button q-mt-md q-gutter-sm">
            <q-btn
              color="negative"
              @click="removeEducation(index)"
              label="Remove"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="button-container">
      <q-btn
        color="primary"
        @click="addEducation"
        label="Add Education"
        class="q-mt-md"
        :disable="educationList.length > 2"
      />
      <q-btn @click="saveEducation" label="Save" class="q-mt-md" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EducationCard",
  props: {
    educationList: {
      type: Array,
      default: () => [
        { institution: "", degree: "", startDate: "", endDate: "" },
      ],
    },
  },
  data() {
    return {
      educationData: JSON.parse(JSON.stringify(this.educationList)),
    };
  },
  watch: {
    educationList: {
      handler(newList) {
        this.educationData = JSON.parse(JSON.stringify(newList));
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    saveEducation() {
      this.$emit("updateEducationData", this.educationData);
    },
    addEducation() {
      if (this.educationData.length < 2) {
        this.educationData.push({
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        });
      } else {
        console.warn("Maximum of 2 education entries can be added");
      }
    },
    removeEducation(index) {
      this.educationData.splice(index, 1);
      this.saveEducation();
    },
  },
};
</script>

<style scoped>
.education {
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
