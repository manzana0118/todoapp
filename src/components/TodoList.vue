<template>
    <div>
        <div class="card mt-3" v-for="(todo, index) in todos" v-bind:key="todo.id">
            <div class="card-body p-2 d-flex">
                <div class="form-check flex-grow-1">
                    <input type="checkbox" class="form-check-input" v-bind:checked="todo.complete" v-bind:id="todo.id" v-on:change="ToggleTodo(index)">
                    <label class="form-check-label" v-bind:class="{todocss:todo.complete}" v-bind:for="todo.id">
                        {{ todo.subject }}
                    </label>
                </div>
                <!-- 삭제 버튼 -->
                <div>
                    <button class="btn btn-danger btn-sm" @click="DeleteTodo(index)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        // props: ['todos']
        props: {
            todos: {
                type: Array,
                required: true
            }
        },
        emits: ['toggle-todo', 'delete-todo'],
        setup(props, {emit}) {
            const ToggleTodo = (index) => {
                // console.log(index);
                emit('toggle-todo', index);
            };
            const DeleteTodo = (index) => {
                emit('delete-todo', index);
            }
            return {
                ToggleTodo,
                DeleteTodo
            }
        }
    };
    
</script>


<style>

</style>