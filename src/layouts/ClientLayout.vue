<template>
    <q-layout view="hHh lpR fFf" class="background-color">
        <q-header elevated class="bg-header-color" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <img
                        src="../assets/blackJobifyLogo.png"
                        alt="Jobify Logo"
                        style="max-width: 150px"
                        @click="goToHomePage"
                    />
                </q-toolbar-title>
                <q-btn class="logoutBtn q-mx-md" size="md" padding="xs lg" @click="logout">Logout</q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered dark>
            <!-- drawer content -->
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item
                        :to="`/client/${clientType}/search-jobs`"
                        :class="{ active: activeItem === 'searchJobs' }"
                        clickable
                        v-ripple
                        @click="setActive('searchJobs')"
                    >
                        <q-item-section avatar>
                            <q-icon name="fa-solid fa-magnifying-glass" />
                        </q-item-section>

                        <q-item-section> Search jobs </q-item-section>
                    </q-item>

                    <q-item
                        :to="`/client/${clientType}/posted-jobs`"
                        :class="{ active: activeItem === 'postedJobs' }"
                        clickable
                        v-ripple
                        @click="setActive('postedJobs')"
                    >
                        <q-item-section avatar>
                            <q-icon name="fa-solid fa-list" />
                        </q-item-section>

                        <q-item-section> Posted jobs </q-item-section>
                    </q-item>

                    <q-item
                        :to="`/client/${clientType}/post-jobs`"
                        :class="{ active: activeItem === 'postNewJob' }"
                        clickable
                        v-ripple
                        @click="setActive('postNewJob')"
                    >
                        <q-item-section avatar>
                            <q-icon name="fa-solid fa-plus" />
                        </q-item-section>

                        <q-item-section> Post a new job </q-item-section>
                    </q-item>

                    <q-item
                        :to="`/client/${clientType}/generated-contracts`"
                        :class="{ active: activeItem === 'generatedContracts' }"
                        clickable
                        v-ripple
                        @click="setActive('generatedContracts')"
                    >
                        <q-item-section avatar>
                            <q-icon name="fa-solid fa-pen-to-square" />
                        </q-item-section>

                        <q-item-section> Generated contracts </q-item-section>
                    </q-item>

                    <q-item
                        :to="`/client/${clientType}/profile`"
                        exact
                        :class="{ active: activeItem === 'profile' }"
                        clickable
                        v-ripple
                        @click="setActive('profile')"
                    >
                        <q-item-section avatar>
                            <q-icon name="fa-solid fa-user" />
                        </q-item-section>

                        <q-item-section> Profile </q-item-section>
                    </q-item>

                    <q-separator dark />

                    <q-item
                        :to="`/client/${clientType}/settings`"
                        :class="{ active: activeItem === 'settings' }"
                        clickable
                        v-ripple
                        @click="setActive('settings')"
                    >
                        <q-item-section avatar>
                            <q-icon name="settings" />
                        </q-item-section>

                        <q-item-section>Settings</q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>

            <q-img class="absolute-top" style="height: 150px">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="56px" class="q-mb-sm">
                        <img :src="profileImage" />
                    </q-avatar>
                    <div class="text-weight-bold">{{ displayName }}</div>
                    <div>{{ userEmail }}</div>
                </div>
            </q-img>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import defaultImage from 'src/assets/profile-account-unknown.jpg';
export default {
    name: 'ClientLayout',
    props: {
        type: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const $api = inject('$api');
        const leftDrawerOpen = ref(false);
        const activeItem = ref('');
        const route = useRoute();
        const user = computed(() => JSON.parse(sessionStorage.getItem('user')));
        const clientType = computed(() => props.type);
        const profileImage = ref('');
        const userName = ref('');
        const companyName = ref('');
        const userEmail = ref('');
        const defaultUserName = 'Guest User';
        const defaultUserEmail = 'No email';
        const router = useRouter();
        const previousRoute = ref(sessionStorage.getItem('previousRoute'));

        const goToHomePage = () => {
            sessionStorage.setItem('previousRoute', route.fullPath);
            router.push('/');
        };
        function toggleLeftDrawer() {
            leftDrawerOpen.value = !leftDrawerOpen.value;
        }

        function setActive(itemName) {
            activeItem.value = itemName;
        }

        const displayName = computed(() => {
            return user.value && user.value.type === 'business' ? companyName.value : userName.value;
        });

        async function loadUserData() {
            const userId = JSON.parse(sessionStorage.getItem('userId'));
            const userData = JSON.parse(sessionStorage.getItem('user'));

            if (!userData && userId) {
                try {
                    const response = await $api.get('/client/data');
                    const userDataFetched = response.data.user;
                    if (userDataFetched.type === 'business') {
                        companyName.value = userDataFetched.companyName;
                    } else {
                        userName.value = userDataFetched.firstName + ' ' + userDataFetched.lastName;
                    }
                    userEmail.value = userDataFetched.email;
                } catch (error) {
                    userName.value = defaultUserName;
                    userEmail.value = defaultUserEmail;
                }
            } else if (userData) {
                if (userData.type === 'business') {
                    companyName.value = userData.companyName;
                } else {
                    userName.value = userData.firstName + ' ' + userData.lastName;
                }
                userEmail.value = userData.email;
            } else {
                userName.value = defaultUserName;
                userEmail.value = defaultUserEmail;
            }
        }

        async function loadProfileImage() {
            const userId = JSON.parse(sessionStorage.getItem('userId'));
            let userData = JSON.parse(sessionStorage.getItem('user'));

            if (userData && userData.profileImage) {
                profileImage.value = userData.profileImage || defaultImage;
            } else if (userId) {
                try {
                    const response = await $api.get(`/client/photo/${userId}`);
                    const userPhoto = response.data.encodedImage;
                    profileImage.value = userPhoto || defaultImage;
                } catch (error) {
                    profileImage.value = defaultImage;
                }
            } else {
                profileImage.value = defaultImage;
            }
        }

        onMounted(() => {
            const routeToItemMap = {
                [`/client/${clientType.value}/search-jobs`]: 'searchJobs',
                [`/client/${clientType.value}/posted-jobs`]: 'postedJobs',
                [`/client/${clientType.value}/post-jobs`]: 'postNewJob',
                [`/client/${clientType.value}/generated-contracts`]: 'generatedContracts',
                [`/client/${clientType.value}/profile`]: 'profile',
                [`/client/${clientType.value}/settings`]: 'settings'
            };
            activeItem.value = routeToItemMap[route.path] || '';
            loadUserData();
            loadProfileImage();
        });

        return {
            leftDrawerOpen,
            toggleLeftDrawer,
            setActive,
            activeItem,
            user,
            clientType,
            profileImage,
            userName,
            companyName,
            userEmail,
            displayName,
            defaultUserName,
            defaultUserEmail,
            loadProfileImage,
            loadUserData,
            previousRoute,
            goToHomePage
        };
    },
    methods: {
        logout() {
            sessionStorage.clear();
            localStorage.removeItem('token');
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.background-color {
    background-color: #8e68b2;
}
.bg-header-color {
    background-color: #050301;
}
.logoutBtn {
    border: 3px solid;
    border-image: linear-gradient(100deg, #ce9ffc, #a582f7, #8e68b2) 1;
    border-radius: 0%;
}
.active {
    background-color: #6c1cd4;
    color: white;
}
</style>
