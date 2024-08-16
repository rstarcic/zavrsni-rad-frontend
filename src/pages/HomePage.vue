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
        <div class="text-h4 text-offset alignment">Newest <span class="job-color">&nbsp;jobs&nbsp;</span> for you</div>
        <div>
            <div class="row text-offset">
                <div class="card alignment col-xs-4 col-sm-6 col-md-4" v-for="(job, index) in jobs" :key="index">
                    <HomeJobCardComponent :job="job" :color="color"></HomeJobCardComponent>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="text-h4 service-provider-title">Service providers</div>
            <div class="steps-row">
                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-briefcase" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Explore Job Listings</div>
                    </div>
                    <q-card-section>
                        Browse a wide array of job opportunities that align with your skills and expertise.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-users" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Review Clients</div>
                    </div>
                    <q-card-section>
                        Explore the profiles of clients who have posted jobs that interest you, ensuring they align with
                        your work preferences and expectations.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-paper-plane" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Apply to a Job</div>
                    </div>
                    <q-card-section>
                        Easily apply to jobs that catch your interest. Track your application status and communicate
                        with clients.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-tasks" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Manage Your Jobs</div>
                    </div>
                    <q-card-section>
                        Keep track of your current, applied, and completed jobs all in one place.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fab fa-stripe" class="step-icon" size="md" color="purple"></q-icon>
                        <div class="text-h6 step-title">Get Paid Securely</div>
                    </div>
                    <q-card-section>
                        Receive payments directly through secure payment system powered by Stripe.
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="section">
            <div class="text-h4 client-title">Clients</div>
            <div class="steps-row">
                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-pen" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Post a Job</div>
                    </div>
                    <q-card-section>
                        Create detailed job postings to attract the right service providers for your project.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-users" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Review Applicants</div>
                    </div>
                    <q-card-section>
                        Browse through applications from service providers and select the best candidate for your job.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-folder-open" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Manage Projects</div>
                    </div>
                    <q-card-section>
                        Oversee the progress of jobs you have posted, communicate with service providers.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-file-alt" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Generate Documents</div>
                    </div>
                    <q-card-section>
                        Easily generate contracts and other documents for your projects directly through the platform.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fab fa-stripe" class="step-icon" size="md" color="purple"></q-icon>
                        <div class="text-h6 step-title">Pay Securely</div>
                    </div>
                    <q-card-section>
                        Use our integrated Stripe payment system to securely pay service providers once you're satisfied
                        with the work.
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="section">
            <div class="text-h4 stripe-title">Stripe-Powered Payment Features</div>
            <div class="steps-row">
                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-user-plus" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Easy Onboarding</div>
                    </div>
                    <q-card-section>
                        Service Providers can quickly connect their Stripe accounts to start receiving payments
                        immediately after job completion.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-money-bill-wave" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Instant Payments</div>
                    </div>
                    <q-card-section>
                        Clients can pay for completed work instantly through Stripe, ensuring that Service Providers are
                        compensated without delays.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-chart-line" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Payment Tracking</div>
                    </div>
                    <q-card-section>
                        Both Clients and Service Providers can track payment statuses directly within the platform, with
                        full transparency on pending and completed payments.
                    </q-card-section>
                </q-card>

                <q-card class="step-card">
                    <div class="step-header">
                        <q-icon name="fas fa-lock" class="step-icon" size="sm" color="purple"></q-icon>
                        <div class="text-h6 step-title">Secure Transactions</div>
                    </div>
                    <q-card-section>
                        All payments are processed through Stripe, a leading payment processor known for its stringent
                        security standards, ensuring that your transactions are safe and secure.
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="rectangle-div">
            <div class="rectangle">
                <h4 class="heading-class">Your Next Gig is a Click Away</h4>
                <p class="paragraph-class">
                    Don't miss out on your dream gig. Join Jobify today and take the first step towards a more flexible,
                    fulfilling, and rewarding work life.
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
import HomeJobCardComponent from '../components/HomeJobCardComponent.vue';

export default {
    name: 'HomePage',
    components: {
        HomeJobCardComponent
    },
    data() {
        return {
            jobs: [],
            color: '#642b73'
        };
    },
    methods: {
        async fetchDataForHomePage() {
            await this.$api
                .get('/jobs/home', { params: { limit: 9 } })
                .then((response) => {
                    this.jobs = response.data.jobs;
                    console.log('Jobs ', this.jobs);
                })
                .catch((error) => {
                    console.error('There was an error fetching user data!', error);
                });
        }
    },
    mounted() {
        this.fetchDataForHomePage();
    }
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
    background-color: #eee7e7;
    height: 300px;
    position: relative;
}

.rectangle {
    padding: 30px;
    background-color: #643f7d;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    top: 25px;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    animation: slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    text-align: center;
}

.heading-class,
.paragraph-class {
    color: #f2f2f2;
    text-align: center;
}
.steps-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}

.step-card {
    flex: 1;
    padding: 20px;
    background-color: #eee7e7;
    border-radius: 25px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    min-width: 200px;
    margin: 10px;
}

.step-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    justify-content: center;
}

.step-icon {
    margin-right: 10px;
}

.step-title {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #333;
}

.section {
    text-align: center;
    margin-bottom: 50px;
}

.service-provider-title {
    margin-bottom: 20px;
}

.client-title {
    margin-bottom: 20px;
}

.stripe-title {
    margin-bottom: 20px;
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
