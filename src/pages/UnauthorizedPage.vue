<template>
    <div class="unauthorized">
        <h1>Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
        <q-btn align="around" icon="fas fa-house" size="md" to="/" label="Go home" />
    </div>
</template>

<script>
export default {
    name: 'UnauthorizedPage'
};
</script>

<style scoped>
.unauthorized {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: #642b73;
    color: white;
}
</style>
