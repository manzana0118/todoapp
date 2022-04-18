<template>
    <h1>Create Todo</h1>
    <TodoForm :editing="false" @new-todo="newTodo"/>
</template>


<script>
import TodoForm from '@/components/TodoForm.vue'
import { getCurrentInstance } from 'vue';

export default {
    components: {
        TodoForm
    },
    emits: ['new-todo-toast'],
    setup() {
        const { emit } = getCurrentInstance();
        const newTodo = () => {
            console.log("새글 등록");
            emit('new-todo-toast',{});
        };

        return {
            newTodo
        }
    }
}
</script>


<style>

</style>