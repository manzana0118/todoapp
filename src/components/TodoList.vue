<template>
    <div>
        <div class="card mt-3" v-for="(todo, index) in todos" :key="todo.id">
            <div class="card-body p-2 d-flex" @click="moveToPage(todo.id)">
                <div class="form-check flex-grow-1">
                    <input type="checkbox" class="form-check-input" :checked="todo.complete" :id="todo.id" @change="toggleTodo(index, $event)" @click.stop>
                    <label class="form-check-label" :class="{todocss:todo.complete}" :for="todo.id">
                        {{ todo.subject }}
                    </label>
                </div>
                <!-- 삭제 버튼 -->
                <div>
                    <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { useRouter } from 'vue-router'

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
            const router = useRouter();

            const toggleTodo = (index, event) => {
                // console.log(index);
                emit('toggle-todo', index, event.target.checked);
            };
            const deleteTodo = (index) => {
                emit('delete-todo', index);
            };

            // 클릭된 id를 전달한다.
            const moveToPage = (todoId) => {
                // 아이디를 전달한다.
                router.push({
                    name: 'Todo',
                    params: {
                        id: todoId
                    }
                });
            }

            return {
                toggleTodo,
                deleteTodo,
                moveToPage,
            };
        }
    };
    
</script>


<style>

</style>