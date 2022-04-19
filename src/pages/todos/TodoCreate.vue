<template>
    <h1>Create Todo</h1>
    <TodoForm :editing="false" @new-todo="newTodo"/>
</template>


<script>
import TodoForm from '@/components/TodoForm.vue'

export default {
    components: {
        TodoForm
    },
    setup() {
            
        return {
            
        }
    }
}

</script>


<style>

</style>