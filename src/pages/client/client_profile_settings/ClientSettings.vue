<template>
    <div class="alignment q-mt-xl">
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
                                    v-model="currentPassword"
                                    :rules="passwordRules"
                                    label-color="#050301"
                                    color="purple-5"
                                    label="Current password"
                                    stack-label
                                    style="max-width: 250px"
                                    :type="IsCurrentPasswordShowed ? 'text' : 'password'"
                                >
                                    <template v-slot:append>
                                        <q-icon
                                            :name="IsCurrentPasswordShowed ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                            size="18px"
                                            class="cursor-pointer"
                                            @click="toggleCurrentPasswordVisibility"
                                        /> </template
                                ></q-input>
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
                        <div class="centered-content q-pa-md">
                            <div class="text-h6">Delete account</div>
                            <p>Are you sure you want to delete your account?</p>
                            <q-btn color="negative" label="Delete Account" @click="showDeletionDialog" />
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="deactivation">
                        <div class="centered-content q-pa-md">
                            <div class="text-h6">Deactivate account</div>
                            <p>Are you sure you want to deactivate your account?</p>
                            <q-btn color="amber-8" label="Deactivate Account" @click="showDeactivationDialog" />
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
            <q-dialog v-model="isDeletionDialogVisible">
                <q-card>
                    <q-card-section class="row items-center">
                        <q-icon name="warning" size="2em" color="red" />
                        <span class="text-h6 q-ml-sm">Confirm Deletion</span>
                    </q-card-section>

                    <q-card-section>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                    </q-card-section>

                    <q-card-actions>
                        <q-btn label="Cancel" color="primary" v-close-popup />
                        <q-btn label="Delete" color="negative" @click="deleteAccount" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
            <q-dialog v-model="isDeactivationDialogVisible">
                <q-card>
                    <q-card-section class="row items-center">
                        <q-icon name="warning" size="2em" color="orange" />
                        <span class="text-h6 q-ml-sm">Confirm Deactivation</span>
                    </q-card-section>

                    <q-card-section>
                        <p>Are you sure you want to deactivate your account?</p>
                    </q-card-section>

                    <q-card-actions>
                        <q-btn label="Cancel" color="primary" v-close-popup />
                        <q-btn label="Deactivate" color="negative" @click="deactivateAccount" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import utils from 'src/utils';
export default {
    data() {
        return {
            tab: 'password',
            currentPassword: null,
            newPassword: null,
            confirmedPassword: null,
            IsCurrentPasswordShowed: null,
            IsNewPasswordShowed: false,
            IsConfirmedPasswordShowed: false,
            isDeactivationDialogVisible: false,
            isDeletionDialogVisible: false,
            passwordRules: utils.passwordRules
        };
    },
    methods: {
        toggleCurrentPasswordVisibility() {
            this.IsCurrentPasswordShowed = !this.IsCurrentPasswordShowed;
        },
        toggleNewPasswordVisibility() {
            this.IsNewPasswordShowed = !this.IsNewPasswordShowed;
        },
        toggleConfirmedPasswordVisibility() {
            this.IsConfirmedPasswordShowed = !this.IsConfirmedPasswordShowed;
        },
        async changePassword() {
            const userId = sessionStorage.getItem('userId');
            if (!userId) {
                Notify.create({
                    color: 'negative',
                    position: 'bottom',
                    message: 'User id not available.',
                    icon: 'error'
                });
                return;
            }
            if (this.newPassword !== this.confirmedPassword) {
                Notify.create({
                    color: 'negative',
                    position: 'bottom',
                    message: 'Passwords do not match.',
                    icon: 'report_problem'
                });
                return;
            }
            await this.$api
                .patch('/client/account/password', {
                    userId: userId,
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword,
                    confirmedPassword: this.confirmedPassword
                })
                .then((response) => {
                    Notify.create({
                        color: 'positive',
                        position: 'bottom',
                        message: 'Password successfully changed.',
                        icon: 'check_circle'
                    });
                })
                .catch((error) => {
                    Notify.create({
                        color: 'negative',
                        position: 'bottom',
                        message: 'Failed to change password: ' + error.message,
                        icon: 'error'
                    });
                });
        },
        showDeactivationDialog() {
            this.isDeactivationDialogVisible = true;
        },
        showDeletionDialog() {
            this.isDeletionDialogVisible = true;
        },
        async deactivateAccount() {
            await this.$api
                .patch('/client/account/deactivate')
                .then((response) => {
                    Notify.create({
                        color: 'positive',
                        position: 'bottom',
                        message: 'Account successfully deactivated.',
                        icon: 'check_circle'
                    });
                    sessionStorage.clear();
                    localStorage.removeItem('token');
                    this.$router.push('/');
                })
                .catch((error) => {
                    Notify.create({
                        color: 'negative',
                        position: 'bottom',
                        message: 'Failed to deactivate account: ' + error.message,
                        icon: 'error'
                    });
                })
                .finally(() => {
                    this.isDeactivationDialogVisible = false;
                });
        },
        async deleteAccount() {
            await this.$api
                .delete('/client/account')
                .then((response) => {
                    Notify.create({
                        color: 'positive',
                        position: 'bottom',
                        message: 'Account successfully deleted.',
                        icon: 'check_circle'
                    });
                    sessionStorage.clear();
                    localStorage.removeItem('token');
                    this.$router.push('/');
                })
                .catch((error) => {
                    Notify.create({
                        color: 'negative',
                        position: 'bottom',
                        message: 'Failed to delete account: ' + error.message,
                        icon: 'error'
                    });
                })
                .finally(() => {
                    this.isDeletionDialogVisible = false;
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
.centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.button-row {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}
</style>
