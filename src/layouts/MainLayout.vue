<template>
    <q-layout view="hHh lpR fFf" class="background-color">
        <q-header elevated class="bg-header-color" height-hint="100">
            <q-toolbar>
                <q-toolbar-title>
                    <img
                        src="../assets/blackJobifyLogo.png"
                        alt="Jobify Logo"
                        style="max-width: 180px"
                        @click="this.$router.push('/')"
                    />
                </q-toolbar-title>
                <div v-if="!isAuthenticated">
                    <q-btn class="loginBtn q-mx-md" size="md" padding="xs lg" @click="this.$router.push('/login')"
                        >Login</q-btn
                    >
                    <q-btn-dropdown
                        label="Sign Up"
                        dropdown-icon="change_history"
                        class="signupBtn"
                        size="md"
                        padding="xs md"
                    >
                        <q-list>
                            <q-item clickable v-close-popup @click="onItemClick('/signup/client')">
                                <q-item-section>
                                    <q-item-label>Client</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="onItemClick('/signup/service-provider')">
                                <q-item-section>
                                    <q-item-label>Service provider</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>
                <div v-else>
                    <q-btn
                        text-color="white"
                        label="Go Back"
                        icon-right="arrow_forward"
                        flat
                        @click="goBack"
                        class="goBackBtn q-mx-md"
                    >
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'MainLayout',
    setup() {
        const router = useRouter();
        const isAuthenticated = computed(() => !!localStorage.getItem('token'));

        const goBack = () => {
            const prevRoute = sessionStorage.getItem('previousRoute');
            if (prevRoute) {
                router.push(prevRoute);
            }
        };

        return { isAuthenticated, goBack };
    },
    methods: {
        onItemClick(path) {
            this.$router.push(path);
        }
    }
};
</script>

<style scoped>
.bg-header-color {
    background-color: #050301;
}
.loginBtn {
    border: 3px solid;
    border-image: linear-gradient(100deg, #ce9ffc, #a582f7, #8e68b2) 1;
    border-radius: 0%;
}
.signupBtn {
    background: linear-gradient(180deg, #ce9ffc 0%, #a582f7 50%, #8e68b2 100%);
    border-radius: 0px;
}
.background-color {
    background-color: #8e68b2;
}
.goBackBtn {
    border: 3px solid;
    border-image: linear-gradient(100deg, #5485be, #b5458a, #900e93) 1;
    border-radius: 0%;
}
</style>
