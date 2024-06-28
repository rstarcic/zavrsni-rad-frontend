<template>
  <q-card class="job-card text-white">
    <q-card-section>
      <div class="text-h6">{{ job.title }}</div>
      <div
        class="row card-text"
        v-for="(detail, index) in job.details"
        :key="index"
      >
        <q-icon class="icon" :name="detail.icon" :color="iconColor"></q-icon>
        <span>{{ detail.text }}</span>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn flat>Show details</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import axios from "axios";
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  iconColor: {
    type: String,
    default: "#642b73",
  },
});

defineOptions({
  name: "JobCardComponent",
  methods: {},
});
</script>

<style scoped>
.job-card {
  padding: 15px 30px;
  max-width: 400px;
  background-color: #643f7d;
}

.text-h6 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.icon {
  padding-right: 10px;
}
.card-text {
  display: flex;
  align-items: left;
  justify-content: left;
}
</style>
