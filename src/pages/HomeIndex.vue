<template>
    <h1>Home Page</h1>
    {{count}}
    <button class="btn btn-primary ml-3" @click="count++">증가</button>
</template>


<script>
import {useCount} from '@/composables/count.js'

export default {
    setup() {
        // 분해해서 사용한다
        const {count} = useCount();
        return {
            count
        }
    }
}
</script>


<style>

</style>