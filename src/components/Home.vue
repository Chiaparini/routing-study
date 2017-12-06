<template>
    <div class="section">
        <div class="container is-fluid" v-if="!isAuthenticated">
            <a class="button is-success" @click="login">Sign in with Spotify</a>
        </div>
        <div class="container is-fluid" v-if="isAuthenticated">
            <h2>You're authenticated! :D</h2>
        </div>
    </div>
</template>

<script>
    import auth from '../services/auth'

    export default {
        name: 'Home',
        data() {
            return {
                isAuthenticated: auth.isAuthenticated()
            }
        },
        mounted() {

        },
        methods: {
            login() {
                auth.login()
            }
        }
    }
    
</script>

<style lang="scss" scoped>

</style>

