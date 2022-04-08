<template>
    <h1>{{apptitle}}</h1>
</template>

<script>
export default {
    // props: ['apptitle']
    props: {
        apptitle: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>