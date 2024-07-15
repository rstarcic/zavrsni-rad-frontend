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
                        @click="this.$router.push('/')"
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
                        to="/service-provider/search-jobs"
                        exact
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
                        to="/service-provider/completed-jobs"
                        exact
                        :class="{ active: activeItem === 'completedJobs' }"
                        clickable
                        v-ripple
                        @click="setActive('completedJobs')"
                    >
                        <q-item-section avatar>
                            <q-icon name="fa-solid fa-list-check" />
                        </q-item-section>

                        <q-item-section> Completed jobs </q-item-section>
                    </q-item>

                    <q-item
                        to="/service-provider/applied-jobs"
                        exact
                        :class="{ active: activeItem === 'appliedJobs' }"
                        clickable
                        v-ripple
                        @click="setActive('appliedJobs')"
                    >
                        <q-item-section avatar>
                            <q-icon name="fa-solid fa-envelope" />
                        </q-item-section>

                        <q-item-section> Applied jobs </q-item-section>
                    </q-item>

                    <q-item
                        to="/service-provider/current-jobs"
                        exact
                        :class="{ active: activeItem === 'currentJobs' }"
                        clickable
                        v-ripple
                        @click="setActive('currentJobs')"
                    >
                        <q-item-section avatar>
                            <q-icon name="fa-solid fa-sync" />
                        </q-item-section>

                        <q-item-section> Current jobs </q-item-section>
                    </q-item>

                    <q-item
                        to="/service-provider/profile"
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
                        to="/service-provider/settings"
                        :class="{ active: activeItem === 'settings' }"
                        exact
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
                    <div class="text-weight-bold">{{ userName }}</div>
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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import defaultImage from 'src/assets/profile-account-unknown.jpg';
export default {
    name: 'ServiceProviderLayout',
    setup() {
        const leftDrawerOpen = ref(false);
        const activeItem = ref('');
        const profileImage = ref('');
        const userName = ref('');
        const userEmail = ref('');
        const route = useRoute();
        const defaultUserName = 'Guest User';
        const defaultUserEmail = 'No email set';

        function toggleLeftDrawer() {
            leftDrawerOpen.value = !leftDrawerOpen.value;
        }

        function setActive(itemName) {
            activeItem.value = itemName;
            console.log('Active item set to:', itemName);
        }

        async function loadUserData() {
            const userId = JSON.parse(sessionStorage.getItem('userId'));
            const userData = JSON.parse(sessionStorage.getItem('user'));

            if (!userData && userId) {
                try {
                    const response = await this.$api.get(`/service-provider/${userId}`);
                    const userDataFetched = response.data.user;
                    userName.value = userDataFetched.firstName + ' ' + userDataFetched.lastName;
                    userEmail.value = userDataFetched.email;
                    console.log('User data loaded and assigned', userData);
                } catch (error) {
                    console.error('There was an error fetching user data!', error);
                    userName.value = defaultUserName;
                    userEmail.value = defaultUserEmail;
                }
            } else if (userData) {
                userName.value = userData.firstName + ' ' + userData.lastName;
                userEmail.value = userData.email;
                console.error('Missing userId in sessionStorage');
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
                console.log('Loaded profile image from session storage', this.user.profileImage);
            } else if (userId) {
                try {
                    const response = await this.$api.get(`/service-provider/photo/${userId}`);
                    const userPhoto = response.data.photoUrl;
                    profileImage.value = userPhoto || defaultImage;
                    console.log('Data loaded from API and assigned', this.user);
                } catch (error) {
                    profileImage.value = defaultImage;
                    console.error('There was an error fetching user data!', error);
                }
            } else {
                profileImage.value = defaultImage;
                console.error('Missing userId in sessionStorage');
            }
        }

        onMounted(() => {
            const routeToItemMap = {
                '/service-provider/search-jobs': 'searchJobs',
                '/service-provider/completed-jobs': 'completedJobs',
                '/service-provider/applied-jobs': 'appliedJobs',
                '/service-provider/current-jobs': 'currentJobs',
                '/service-provider/profile': 'profile',
                '/service-provider/settings': 'settings'
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
            profileImage,
            userName,
            userEmail,
            loadProfileImage,
            loadUserData
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
    background-color: #cd044e;
    color: white;
}
</style>
