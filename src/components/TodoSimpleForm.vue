<template>
    <!-- html 태그 작성 장소 -->
    <!-- Todo 입력 폼 -->
    <form action="" v-on:submit.prevent="AddTodo">
        <div class="d-flex">
            <div class="flex-grow-1 mr-2">
                <input type="text" placeholder="Type New Todo" class="form-control" v-model="todo">
            </div>
            <div class="">
                <button class="btn btn-primary" type="submit">Add</button>
            </div>
        </div>

        <!-- 내용 입력 안내창 -->
        <div v-if="HasError" class="alert-danger" role="alert">
            내용을 입력하세요.
        </div>
    </form>
</template>

<script>
// $emit: ['add-todo'];
import {ref} from 'vue'
// js 코딩 장소
export default {
    emits: ['add-todo'],
    setup(props, {emit}) {
        // 추가할 할일
        const todo = ref('');
        // 내용 입력 안내창 여부
        const HasError = ref(false);
                // 버튼 클릭 시 처리
        const AddTodo = () => {
            // 할 일의 내용을 배열로 추가한다.
            // 이때 상위 컴포넌트로 전달한다.
            emit('add-todo', {
                id: Date.now(),
                subject: todo.value,
                complete: false
            });
            if (todo.value == '') {
                HasError.value = true;
            } else {
                HasError.value = false;
                // todos.value.push({
                //     id: Date.now(),
                //     subject: todo.value,
                //     complete: false
                // });
            }
            todo.value = '';
        }

        return {
            todo,
            HasError,
            AddTodo,
        }
    }
}
</script>

<style>
    /* css 작성 장소 */
</style>