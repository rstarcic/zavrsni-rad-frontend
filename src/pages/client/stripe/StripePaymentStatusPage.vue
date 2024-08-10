<template>
    <div></div>
</template>
<!-- <template>
    <div class="status-container">
        <h1>{{ message }}</h1>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PaymentStatus',
    data() {
        return {
            message: 'Checking payment status...'
        };
    },
    async mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (sessionId) {
            try {
                const response = await axios.post('http://localhost:3002/api/payments/confirm', {
                    session_id: sessionId
                });

                const data = response.data;
                if (data.success) {
                    this.message = 'Payment completed successfully!';
                } else {
                    this.message = 'Payment failed. Please try again.';
                }
            } catch (error) {
                this.message = 'Error checking payment status.';
                console.error('Error:', error);
            }
        } else {
            this.message = 'No session ID provided.';
        }
    }
};
</script>

<style scoped>
.status-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
}

.status-container h1 {
    font-size: 2em;
    color: #4caf50;
}
</style> -->
