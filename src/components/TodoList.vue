<template>
    <div>
        <div class="card mt-3" v-for="(todo, index) in todos" :key="todo.id">
            <div class="card-body p-2 d-flex" @click="moveToPage(todo.id)" style="cursor:pointer">
                <div class="flex-grow-1">
                    <input type="checkbox" class="ml-2 mr-2" :checked="todo.complete" :id="todo.id" @change="toggleTodo(index, $event)" @click.stop>
                    <span :class="{todocss:todo.complete}" :for="todo.id">
                        {{ todo.subject }}
                    </span>
                </div>
                <!-- 삭제 버튼 -->
                <div>
                    <button class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <teleport to="#modal">
        <!-- 경고창 -->
        <ModalWin v-if="showModal" @close="closeModal" @delete="deleteTodo"/>
    </teleport>
</template>


<script>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router'
    import ModalWin from '@/components/ModalWin.vue'

    export default {
        components: {
            ModalWin
        },
        // props: ['todos']
        props: {
            todos: {
                type: Array,
                required: true
            }
        },
        emits: ['toggle-todo', 'delete'],
        setup(props, {emit}) {

            // 실제 삭제될 id를 보관해 둠
            const todoDeleteId = ref(null);

            // 모달창 보여지는 상태
            const showModal = ref(false);
            const openModal =  (index) => {
                showModal.value = true;
                todoDeleteId.value = index;
            }

            const closeModal = () => {
                showModal.value = false;
                todoDeleteId.value = null;
            }

            const router = useRouter();

            const toggleTodo = (index, event) => {
                // console.log(index);
                emit('toggle-todo', index, event.target.checked);
            };

            const deleteTodo = () => {
                // 삭제 버튼 클릭 시 보관해두었던 값(todoDeleteId.value)을 활용
                // 해당하는 todo의 id 값
                emit('delete-todo', todoDeleteId.value);
                showModal.value = false;
                todoDeleteId.value = null;
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
                showModal,
                openModal,
                closeModal
            };
        }
    };
    
</script>


<style>

</style>