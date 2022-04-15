<template>
    <div 
        class="card mt-3" 
        v-for="(item, index) in items" 
        :key="item.id">

        <!-- 반복될 내용 영역 -->
        <slot :item="item" :index="index"></slot>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>