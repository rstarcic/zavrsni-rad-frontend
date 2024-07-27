<template>
    <div class="q-pa-xl alignment">
        <div v-if="loading" class="spinner-container">
            <q-spinner size="lg" color="white" :thickness="10" />
        </div>
        <q-card v-else class="card-style">
            <div class="full-width column items-center profile-container">
                <q-avatar class="q-ma-md" size="150px" font-size="52px">
                    <template v-if="client.profileImage">
                        <img :src="client.profileImage" />
                    </template>
                    <template v-else>
                        <img :src="defaultImage" />
                    </template>
                </q-avatar>
            </div>
            <q-card-section>
                <div class="section-title" v-if="client.type === 'individual'">Personal Information</div>
                <div class="row justify-center q-gutter-sm" v-if="client.type === 'individual'">
                    <q-card flat bordered class="col-12 q-pa-md">
                        <div class="row">
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="account_circle" class="q-mr-sm" />
                                <strong> First Name: </strong>
                                <span> {{ client.firstName }} </span>
                            </div>
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="account_circle" class="q-mr-sm" />
                                <strong> Last Name: </strong>
                                <span> {{ client.lastName }} </span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="wc" class="q-mr-sm" />
                                <strong> Gender: </strong>
                                <span> {{ client.gender }} </span>
                            </div>
                            <div class="col-12 col-md-6">
                                <q-icon name="cake" class="q-mr-sm" />
                                <strong> Date of Birth: </strong>
                                <span> {{ client.dateOfBirth }} </span>
                            </div>
                        </div>
                    </q-card>
                </div>
                <div class="section-title" v-if="client.type === 'business'">Business</div>
                <div class="row justify-center q-gutter-sm" v-if="client.type === 'business'">
                    <q-card flat bordered class="col-12 q-pa-md">
                        <div class="row">
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="account_circle" class="q-mr-sm" />
                                <strong> Company name: </strong>
                                <span> {{ client.companyName }} </span>
                            </div>
                        </div>
                    </q-card>
                </div>
                <div class="section-title">Contact Information</div>
                <div class="row justify-center q-gutter-sm">
                    <q-card flat bordered class="col-12 q-pa-md">
                        <div class="row">
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="email" class="q-mr-sm" />
                                <strong> Email: </strong>
                                <span> {{ client.email }} </span>
                            </div>
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="phone" class="q-mr-sm" />
                                <strong> Phone Number: </strong>
                                <span> {{ client.phoneNumber }} </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="public" class="q-mr-sm" />
                                <strong> Country: </strong>
                                <span> {{ client.country }} </span>
                            </div>
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="place" class="q-mr-sm" />
                                <strong> City: </strong>
                                <span> {{ client.city }} </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="home" class="q-mr-sm" />
                                <strong> Address: </strong>
                                <span> {{ client.address }} </span>
                            </div>
                            <div class="col-12 col-md-6">
                                <q-icon name="markunread_mailbox" class="q-mr-sm" />
                                <strong> Postal Code: </strong>
                                <span> {{ client.postalCode }} </span>
                            </div>
                        </div>
                    </q-card>
                </div>

                <div class="section-title">Documents</div>
                <div class="row justify-center q-gutter-sm">
                    <q-card flat bordered class="col-12 q-pa-md">
                        <div class="row" v-if="client.type === 'individual'">
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="description" class="q-mr-sm" />
                                <strong> Document Type: </strong>
                                <span> {{ client.documentType }} </span>
                            </div>
                            <div class="col-12 col-md-6 q-mb-md">
                                <q-icon name="format_list_numbered" class="q-mr-sm" />
                                <strong> Document Number: </strong>
                                <span> {{ client.documentNumber }} </span>
                            </div>
                        </div>
                        <div class="row" v-if="client.type === 'business'">
                            <div class="col-12 col-md-12 q-mb-md">
                                <q-icon name="description" class="q-mr-sm" />
                                <strong> VAT registration number: </strong>
                                <span> {{ client.VATnumber }} </span>
                            </div>
                        </div>
                    </q-card>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import image from 'src/assets/profile-account-unknown.jpg';
export default {
    props: {
        id: {
            type: String,
            required: false
        },
        clientId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            client: [],
            defaultImage: image,
            loading: false
        };
    },
    mounted() {
        this.fetchClientDetails();
    },
    methods: {
        async fetchClientDetails() {
            this.loading = true;
            this.$api
                .get(`/client/client-profile/${this.clientId}`)
                .then((response) => {
                    this.loading = false;
                    this.client = response.data.user;
                })
                .catch((error) => {
                    console.error('There was an error fetching client details!', error);
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-style {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff1fa;
}

.section-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: left;
    color: purple;
}

.q-card {
    margin-bottom: 1rem;
}

.q-pa-md {
    padding: 1.5rem;
}

.profile-container {
    height: 180px;
    position: relative;
    background-color: purple;
}

.q-card-section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.q-mb-md {
    flex: 1 1 auto;
    min-width: 300px;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    width: 100%;
}
</style>
