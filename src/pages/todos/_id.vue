<template>    
    <h1>Todo Edit</h1>
    <TodoForm :editing="true" @update-todo="updateTodo"/>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'
export default {
    components: {
        TodoForm
    },
    emits: ['update-todo-toast'],
    setup(props, {emit}) {
        const updateTodo = () => {
            console.log("내용 갱신");
            emit('update-todo-toast',{});
        };

        return {
            updateTodo
        }
    }
}
</script>

<style>

</style>