<template>
    <div>
        <candidate-card-component :serviceProviderData="candidateData"></candidate-card-component>
    </div>
</template>

<script>
import CandidateCardComponent from 'src/components/CandidateCardComponent.vue';
export default {
    components: {
        CandidateCardComponent
    },
    data() {
        return {
            candidateData: this.getCandidateData()
        };
    },
    methods: {
        getCandidateData() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: user.address,
                city: user.city,
                country: user.country,
                phoneNumber: user.phoneNumber,
                profileImage: user.profileImage
            };
        }
    }
};
</script>
