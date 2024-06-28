<template>
  <div class="selection-container">
    <q-card class="selection-card shadow-10">
      <q-card-section>
        <div class="text-h6 title text-purple-1">Select Client Type</div>
        <div class="text-subtitle2 subtitle text-purple-1">
          Please select your client type
        </div>
      </q-card-section>
      <div class="q-pa-md selection-buttons">
        <q-btn
          size="22px"
          class="q-px-xl q-py-xs q-mx-md"
          color="purple"
          label="Private Individual"
          @click="this.$router.push('/signup/client/individual')"
        />
        <q-btn
          size="22px"
          class="q-px-xl q-py-xs q-mx-md"
          color="purple"
          label="Business Company"
          @click="this.$router.push('/signup/client/business')"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "SelectClientType",
  data() {
    return {
      type: "",
    };
  },
};
</script>

<style scoped>
.selection-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.selection-card {
  background-color: #642b73 !important;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title,
.subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.selection-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.client-btn {
  margin: 20px;
  width: 150px;
}
</style>
