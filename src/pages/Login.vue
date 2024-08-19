<template>
    <div class="alignment">
        <q-card v-if="!deactivationMessage" class="login-card shadow-10">
            <q-card-section>
                <div class="text-h6">LOGIN</div>
                <div class="text-subtitle2">Dear user, please login</div>
            </q-card-section>
            <q-input v-model="email" label-color="purple-2" color="purple-2" label="Email" stack-label dark>
                <template v-slot:append>
                    <q-icon class="fas fa-envelope" size="18px"></q-icon>
                </template>
            </q-input>
            <q-input
                label="Password"
                label-color="purple-2"
                color="purple-2"
                stack-label
                v-model="password"
                :type="IsPasswordShowed ? 'text' : 'password'"
                dark
            >
                <template v-slot:append>
                    <q-icon
                        :name="IsPasswordShowed ? 'fas fa-eye' : 'fas fa-eye-slash'"
                        size="18px"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                    />
                </template>
            </q-input>
            <q-btn class="login-btn" color="#f2f2f2" label="Sign Up" @click="login" size="12px" />
        </q-card>
        <q-card v-if="deactivationMessage" class="login-card shadow-10">
            <q-card-section>
                <div class="text-h6">Account Deactivated</div>
                <div class="text-subtitle2">{{ deactivationMessage }}</div>
                <q-input
                    v-model="reactivationEmail"
                    label-color="purple-2"
                    color="purple-2"
                    label="Email"
                    stack-label
                    dark
                >
                    <template v-slot:append>
                        <q-icon class="fas fa-envelope" size="18px"></q-icon>
                    </template>
                </q-input>
                <q-input
                    label="Password"
                    label-color="purple-2"
                    color="purple-2"
                    stack-label
                    v-model="reactivationPassword"
                    :type="IsPasswordShowed ? 'text' : 'password'"
                    dark
                >
                    <template v-slot:append>
                        <q-icon
                            :name="IsPasswordShowed ? 'fas fa-eye' : 'fas fa-eye-slash'"
                            size="18px"
                            class="cursor-pointer"
                            @click="togglePasswordVisibility"
                        />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-actions class="flex justify-center">
                <q-btn color="positive" label="Reactivate" @click="reactivateAccount" />
                <q-btn color="negative" label="Cancel" @click="cancelReactivation" />
            </q-card-actions>
        </q-card>
    </div>
</template>

<script>
import { Notify } from 'quasar';
export default {
    name: 'LoginPage',
    data() {
        return {
            email: null,
            password: null,
            reactivationPassword: null,
            reactivationEmail: null,
            IsPasswordShowed: false,
            deactivationMessage: null
        };
    },
    methods: {
        login() {
            this.$api
                .post('/auth/login', {
                    email: this.email,
                    password: this.password
                })
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('user', JSON.stringify(response.data.user));
                    const user = response.data.user;
                    sessionStorage.setItem('userId', user.id);
                    if (user.role === 'service provider') {
                        this.$router.push('/service-provider/search-jobs');
                    } else if (user.role === 'client' && user.type === 'individual') {
                        this.$router.push('/client/individual/search-jobs');
                    } else if (user.role === 'client' && user.type === 'business') {
                        this.$router.push('/client/business/search-jobs');
                    } else {
                        console.error('Unknown role:', user.role);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 403) {
                        this.deactivationMessage = error.response.data.message;
                    } else if (error.response.status === 401) {
                        Notify.create({
                            color: 'negative',
                            position: 'bottom',
                            message: 'Incorrect email or password. Please try again.',
                            icon: 'error'
                        });
                    } else {
                        Notify.create({
                            color: 'negative',
                            position: 'bottom',
                            message: 'Failed to login: ' + error.message,
                            icon: 'error'
                        });
                    }
                });
        },
        togglePasswordVisibility() {
            this.IsPasswordShowed = !this.IsPasswordShowed;
        },
        reactivateAccount() {
            this.$api
                .patch('/account/reactivate', {
                    email: this.reactivationEmail,
                    password: this.reactivationPassword
                })
                .then((response) => {
                    sessionStorage.setItem('user', JSON.stringify(response.data.user));
                    const user = response.data.user;
                    sessionStorage.setItem('userId', user.id);
                    localStorage.setItem('token', response.data.token);
                    if (user.role === 'service provider') {
                        this.$router.push('/service-provider/search-jobs');
                    } else if (user.role === 'client' && user.type === 'individual') {
                        this.$router.push('/client/individual/search-jobs');
                    } else if (user.role === 'client' && user.type === 'business') {
                        this.$router.push('/client/business/search-jobs');
                    } else {
                        console.error('Unknown role:', user.role);
                    }
                    this.deactivationMessage = null;
                })
                .catch((error) => {
                    Notify.create({
                        color: 'negative',
                        position: 'bottom',
                        message: 'Failed to reactivate account: ' + error.message,
                        icon: 'error'
                    });
                });
        },
        cancelReactivation() {
            this.deactivationMessage = null;
        }
    }
};
</script>

<style scoped>
.login-card {
    width: 400px;
    height: 400px;
    background-color: #642b73 !important;
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.banner {
    background-color: #d1b32f !important;
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}

.text-h6,
.text-subtitle2 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    color: #f2f2f2;
}

.login-btn {
    margin: 20px;
}

.q-input {
    margin: 5px 0px;
}
</style>
