<template>
    <div class="alignment q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 600px">
            <q-card class="q-pa-md">
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="purple-5"
                    indicator-color="purple-5"
                    narrow-indicator
                >
                    <q-tab name="password" label="Change password" icon="fas fa-lock" />
                    <q-tab name="deletion" label="Delete account" icon="fas fa-trash" />
                    <q-tab name="deactivation" label="Deactivate account" icon="fas fa-user-xmark" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="password">
                        <div class="centered-content q-pa-md">
                            <div class="text-h6">Change your password</div>
                            <p>Enter a new password below to change your password.</p>
                            <div class="q-pa-md">
                                <q-input
                                    v-model="newPassword"
                                    :rules="passwordRules"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="New password"
                                    stack-label
                                    style="max-width: 250px"
                                    :type="IsNewPasswordShowed ? 'text' : 'password'"
                                >
                                    <template v-slot:append>
                                        <q-icon
                                            :name="IsNewPasswordShowed ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                            size="18px"
                                            class="cursor-pointer"
                                            @click="toggleNewPasswordVisibility"
                                        /> </template
                                ></q-input>
                                <q-input
                                    v-model="confirmedPassword"
                                    :rules="passwordRules"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="New password confirmation"
                                    stack-label
                                    style="max-width: 250px"
                                    :type="IsConfirmedPasswordShowed ? 'text' : 'password'"
                                >
                                    <template v-slot:append>
                                        <q-icon
                                            :name="IsConfirmedPasswordShowed ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                            size="18px"
                                            class="cursor-pointer"
                                            @click="toggleConfirmedPasswordVisibility"
                                        /> </template
                                ></q-input>
                            </div>
                            <q-btn class="q-mt-md" color="positive" label="Change password" @click="changePassword" />
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="deletion">
                        <div class="text-h6">Delete account</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <q-btn color="negative" label="Delete Account" @click="deleteAccount" />
                    </q-tab-panel>

                    <q-tab-panel name="deactivation">
                        <div class="text-h6">Movies</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        <q-btn color="primary" label="Deactivate Account" @click="deactivateAccount" />
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
    </div>
</template>

<script>
import utils from 'src/utils';
export default {
    data() {
        return {
            tab: 'password',
            newPassword: '',
            confirmedPassword: '',
            IsNewPasswordShowed: false,
            IsConfirmedPasswordShowed: false,
            passwordRules: utils.passwordRules
        };
    },
    methods: {
        toggleNewPasswordVisibility() {
            this.IsNewPasswordShowed = !this.IsNewPasswordShowed;
        },
        toggleConfirmedPasswordVisibility() {
            this.IsConfirmedPasswordShowed = !this.IsConfirmedPasswordShowed;
        },
        changePassword() {
            console.log('Password changed');
        }
    }
};
</script>

<style scoped>
.alignment {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70vh;
}
.centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>
