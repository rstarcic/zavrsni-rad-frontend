<template>
    <div class="q-pa-md">
        <q-card class="my-card" flat bordered>
            <q-card-section class="row no-wrap">
                <q-img
                    class="col-4"
                    :src="serviceProviderData.profileImage ? serviceProviderData.profileImage : defaultImage"
                    style="width: 200px; height: 180px"
                />
                <div class="col">
                    <div class="q-px-md">
                        <div class="first-last-name-text">
                            {{ serviceProviderData.firstName }} {{ serviceProviderData.lastName }}
                        </div>
                        <div class="text-body2">{{ serviceProviderData.email }}</div>
                        <div class="text-body2">{{ serviceProviderData.phoneNumber }}</div>
                        <div class="text-body2">{{ serviceProviderData.address }}</div>
                        <div class="text-body2">{{ serviceProviderData.city }}, {{ serviceProviderData.country }}</div>
                    </div>
                    <q-card-actions align="center" class="q-gutter-sm q-pt-xl">
                        <q-btn icon="fas fa-file-contract" size="md" color="purple-8" dense>
                            <q-tooltip class="bg-purple-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                Generate contract
                            </q-tooltip>
                        </q-btn>
                        <q-btn icon="fas fa-eye" size="md" color="yellow-8" dense @click="goToServiceProviderProfile()">
                            <q-tooltip class="bg-yellow-7" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                View candidate profile
                            </q-tooltip>
                        </q-btn>
                    </q-card-actions>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import image from 'src/assets/profile-account-unknown.jpg';
export default {
    props: {
        serviceProviderData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            defaultImage: image
        };
    },
    methods: {
        goToServiceProviderProfile() {
            const jobId = this.$route.params.jobId;
            if (jobId) {
                this.$router.push({
                    name: 'ServiceProviderProfileDetail',
                    params: {
                        jobId: jobId,
                        candidateId: this.serviceProviderData.id
                    }
                });
            } else {
                console.error('User type is undefined or user not found');
            }
        }
    }
};
</script>

<style scoped>
.my-card {
    width: 400px;
    height: auto;
    background-color: #ffffff;
}
.q-img {
    width: 100%;
    height: auto;
}
.q-btn {
    padding: 5px 12px;
}
.first-last-name-text {
    font-size: 17px;
    font-weight: 400;
}
</style>
