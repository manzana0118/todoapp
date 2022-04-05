<template>
  <div class="container">
    <h1>Todo List</h1>
    <!-- 할일 추가 입력창 -->
    <form action="" class="d-flex" v-on:submit.prevent="OnSubmit">
      <div class="flex-grow-1 mr-2">
        <input 
        type="text" 
        placeholder="Type New Todo"
        class="form-control"
        v-model="todo"
        >
      </div>
      <div class="">
        <button class="btn btn-primary" type="submit">Add</button>
      </div>    
    </form>

    <!-- 내용 입력 안내창 -->
    <div v-if="HasError" class="alert-danger" role="alert">
        내용을 입력하세요.
    </div>

    <!-- Todo 목록창  -->
    <div 
      class="card mt-3"
      v-for = "(todo, index) in todos"
      v-bind:key="todo.id"
    >
    <div class="card-body p-2 d-flex">
      <div class="form-check flex-grow-1">
        <input 
          type="checkbox"  
          class="form-check-input" 
          v-model="todo.complete"
          v-bind:id="todo.id"
        >
        <label 
          class="form-check-label"  
          v-bind:class="{todocss:todo.complete}"
          v-bind:for="todo.id"
        >
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
import {ref} from 'vue'
  export default {
  setup(){
    // 할일 목록(배열)을 저장
    const todos = ref([
      {id: 1, subject: '할일 1', complete: true},
      {id: 2, subject: '할일 2', complete: false},
      {id: 3, subject: '할일 3', complete: false},
      {id: 4, subject: '할일 4', complete: false}
    ]);
    // 추가할 할일
    const todo = ref('');
    // 버튼 클릭 시 처리
    const OnSubmit = () => {
      // 할 일의 내용을 배열로 추가한다.
      if (todo.value == '') {
        HasError.value = true;
      } else {
        HasError.value = false;
        todos.value.push({
        id: Date.now(),
        subject: todo.value,
        complete: false
        });
      }
      todo.value = '';
    }

    const HasError = ref(false);

    // Todo의 스타일시트
    const TodoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const DeleteTodo = (index) => {
      // console.log('지우기' + index);
      // 배열 내에서 순서 번호로부터 1개 제거
      todos.value.splice(index, 1);
    }
    
    return {
      todos,
      todo,
      OnSubmit,
      HasError,
      TodoStyle,
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
