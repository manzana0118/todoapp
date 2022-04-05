<template>
  <div class="container">
    <h1>Todo List</h1>
    <!-- 할일 추가 입력창 -->
    <TodoSimpleForm v-on:add-todo="AddTodo" />


    <!-- 목록 없음 안내창 -->
    <div v-if="!todos.length" class="mt-2">
      생성된 Todo 목록이 없습니다.
    </div>

    <!-- Todo 목록창  -->
    <TodoList v-bind:todos="todos"/>
  </div>  
</template>

<script>
  import {ref} from 'vue'
  import TodoSimpleForm from './components/TodoSimpleForm.vue'
  import TodoList from './components/TodoList.vue'

  export default {
    components: {
      TodoSimpleForm,
      TodoList
    },
    setup() {

      // 할일 목록(배열)을 저장
      const todos = ref([{
        id: 1,
        subject: '할일',
        completed: false
      }]);

      // TodoSimpleForm에서 
      // add-todo 이벤트로 전달된 객체를
      // 처리해 주는 콜백 함수
      const AddTodo = (todo) => {
        console.log(todo);
        todos.value.push(todo);
      }

      const DeleteTodo = (index) => {
        // console.log('지우기' + index);
        // 배열 내에서 순서 번호로부터 1개 제거
        todos.value.splice(index, 1);
      }

      return {
        todos,
        AddTodo,
        DeleteTodo
      }
    }
  }
</script>

<style>
  .todocss {
    color: gray;
    text-decoration: line-through;
  }
</style>