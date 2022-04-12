<template>
    <div class="alert toast-box" :class="`alert-${type}`" role="alert">
        {{message}}
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                required: true
            },
            type: {
                type: String,
                defalut: 'success'
            }
        }
    }
</script>

<style>
    .toast-box {
        position: fixed;
        top: 65px;
        right: 10px;
    }
</style>