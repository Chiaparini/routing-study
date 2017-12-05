<template>
    <nav class="navbar is-primary">
        <router-link class="navbar-item is-primary" v-for="nav in navigation" :key="nav.id" :to="nav.name"> {{ nav.name }} </router-link>
    </nav>
</template>

<script>
    export default {
        name: 'MainHeader',
        props: {
            navigation: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar-item 
    {
        color: #42b983;
    }
</style>
