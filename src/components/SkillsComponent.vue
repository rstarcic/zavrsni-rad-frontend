<template>
  <div class="skills-list">
    <div class="text-h6">Skills</div>
    <ul>
      <li v-for="(skill, index) in skills" :key="index">
        <q-input v-model="skill.name" label="Skill" />
        <q-btn @click="removeSkill(index)" icon="delete" color="negative" />
      </li>
    </ul>
    <div class="button-container">
      <q-btn
        @click="addSkill"
        label="Add Skill"
        color="primary"
        class="q-mt-md"
        :disable="skills.length > 5"
      />
      <q-btn @click="saveSkills" label="Save" class="q-mt-md" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillsComponent",
  props: {
    skillsData: {
      type: Array,
      default: () => [{ name: "" }],
    },
  },
  data() {
    return {
      skills: [],
    };
  },
  watch: {
    skillsData(newSkills) {
      this.skills = newSkills;
    },
  },
  methods: {
    saveSkills() {
      this.$emit("updateSkillsData", this.skills);
    },
    addSkill() {
      if (this.skills.length < 5) {
        this.skills.push({ name: "" });
      }
    },
    removeSkill(index) {
      this.skills.splice(index, 1);
    },
  },
};
</script>

<style>
.skills-list ul {
  padding-left: 20px;
}
.skills-list li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
}

.skills-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
}
</style>
