<template>
  <div view="hHh lpR fFf">
    <div class="row justify-between">
      <q-parallax :height="700" :speed="0.7" src="../assets/trafficJam.png">
        <div class="parallax-text absolute-left">
          <h3 class="text-white">
            Revolutinizing <br />How You Work <br />
            Find Gigs & <br />
            Gigs Find You
          </h3>
        </div>
      </q-parallax>
    </div>
    <div class="text-h4 text-offset alignment">
      Newest <span class="job-color">&nbsp;jobs&nbsp;</span> for you
    </div>
    <div>
      <div class="row text-offset">
        <div
          class="card alignment col-xs-4 col-sm-6 col-md-4"
          v-for="(job, index) in jobAds"
          :key="index"
        >
          <JobCardComponent :job="job" :color="color"></JobCardComponent>
        </div>
      </div>
    </div>
    <div class="rectangle-div">
      <div class="rectangle">
        <h3 class="heading-class">Your Next Gig is a Click Away</h3>
        <p class="paragraph-class">
          Don't miss out on your dream gig. Join Jobify today and take the first
          step towards a more flexible, fulfilling, and rewarding work life.
        </p>
        <q-btn
          no-caps
          color="#FFFFFF"
          class="signup-button"
          @click="this.$router.push('/signup/service-provider')"
          >Join Jobify</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JobCardComponent from "../components/JobCardComponent.vue";

export default {
  name: "HomePage",
  components: {
    JobCardComponent,
  },
  data() {
    return {
      jobAds: [
        {
          id: 1,
          title: "Front-End Developer Wanted",
          details: [
            { icon: "fas fa-shapes", text: "Web Development" },
            { icon: "fas fa-euro-sign", text: "40e/hr" },
            { icon: "fas fa-location-dot", text: "Remote" },
            { icon: "fas fa-address-book", text: "ivan@company.com" },
          ],
        },
        {
          id: 2,
          title: "House Painter",
          details: [
            { icon: "fas fa-shapes", text: "Painting" },
            { icon: "fas fa-euro-sign", text: "30e/hr" },
            {
              icon: "fas fa-location-dot",
              text: "Milanovićeva ulica 23, Zagreb",
            },
            { icon: "fas fa-address-book", text: "contact@painter.com" },
          ],
        },
        {
          id: 3,
          title: "Graphic Designer for Logo",
          details: [
            { icon: "fas fa-shapes", text: "Graphic Design" },
            { icon: "fas fa-euro-sign", text: "45e/hr" },
            {
              icon: "fas fa-location-dot",
              text: "Argonautska ulica 58, Virovitica",
            },
            { icon: "fas fa-address-book", text: "design@graphics.com" },
          ],
        },
        {
          id: 4,
          title: "Gardening Assistance Required",
          details: [
            { icon: "fas fa-shapes", text: "Gardening" },
            { icon: "fas fa-euro-sign", text: "25e/hr" },
            { icon: "fas fa-location-dot", text: "Istarska ulica, Osijek" },
            { icon: "fas fa-address-book", text: "gardenhelp@landscaping.com" },
          ],
        },
        {
          id: 5,
          title: "Pet Sitting for the Weekend",
          details: [
            { icon: "fas fa-shapes", text: "Pet Service" },
            { icon: "fas fa-euro-sign", text: "20e/hr" },
            { icon: "fas fa-location-dot", text: "Trpinjska cesta 7, Rijeka" },
            { icon: "fas fa-address-book", text: "petsitter@animals.com" },
          ],
        },
        {
          id: 6,
          title: "Event Planner",
          details: [
            { icon: "fas fa-shapes", text: "Event Planning" },
            { icon: "fas fa-euro-sign", text: "50e/hr" },
            {
              icon: "fas fa-location-dot",
              text: "Krčka ulica 14, Mali Lošinj",
            },
            { icon: "fas fa-address-book", text: "events@planner.com" },
          ],
        },
        {
          id: 7,
          title: "Tutor Needed for Math Tutoring",
          details: [
            { icon: "fas fa-shapes", text: "Tutoring" },
            { icon: "fas fa-euro-sign", text: "35e/hr" },
            { icon: "fas fa-location-dot", text: "Zadarska ulica 29, Zadar" },
            { icon: "fas fa-address-book", text: "mathtutor@education.com" },
          ],
        },
        {
          id: 8,
          title: "Furniture Assembly",
          details: [
            { icon: "fas fa-shapes", text: "Furniture Assembly" },
            { icon: "fas fa-euro-sign", text: "25e/hr" },
            {
              icon: "fas fa-location-dot",
              text: "Ulica Eugena Kvaternika, Vinkovci",
            },
            { icon: "fas fa-address-book", text: "assembly@furniture.com" },
          ],
        },
        {
          id: 9,
          title: "Photographer for Family Event",
          details: [
            { icon: "fas fa-shapes", text: "Photography" },
            { icon: "fas fa-euro-sign", text: "50e/hr" },
            { icon: "fas fa-location-dot", text: "123 Main Street, Your City" },
            { icon: "fas fa-address-book", text: "photographer@example.com" },
          ],
        },
      ],
      color: "#642b73",
    };
  },
  methods: {},
};
</script>

<style scoped>
.parallax-text h3 {
  margin-top: 100px;
  margin-left: 200px;
}

.alignment {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.my-card {
  width: 100%;
  max-width: 200px;
}

.card {
  margin-bottom: 50px;
}

.job-color {
  font-weight: 800;
  font-style: normal;
  font-size: 30px;
  color: #643f7d !important;
}

.text-offset {
  margin-top: 50px;
}

.rectangle-div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  height: 300px;
  position: relative;
}

.rectangle {
  padding: 30px;
  background-color: #643f7d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  animation: slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.heading-class,
.paragraph-class {
  color: #f2f2f2;
  text-align: center;
}

@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
