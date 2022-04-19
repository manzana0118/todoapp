<template>
    <!-- 상단메뉴 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
            <router-link class="nav-link" :to="{name: 'Todos'}">Todos</router-link>
            <router-link class="nav-link" :to="{name: 'About'}">About</router-link>
            <router-link class="nav-link" :to="{name:'Profile'}">Profile</router-link>
        </div>
    </nav>
</template>

<script>
    export default {

    }
</script>

<style>

</style>