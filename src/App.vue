<template>
  <div class="container">
    <h1>Todo List</h1>

    <!-- 할일 검색 입력창 -->
    <input class="form-control mb-2" v-model="SearchText" type="text" placeholder="Search Todo List">
    <div class="red">{{error}}</div>
    <hr/>

    <!-- 할일 추가 입력창 -->
    <TodoSimpleForm v-on:add-todo="AddTodo" />


    <!-- 목록 없음 안내창 -->
    <div v-if="!todos.length" class="mt-2">
      생성된 Todo 목록이 없습니다.
    </div>

    <!-- Todo 목록창  -->
    <TodoList v-bind:todos="todos" v-on:toggle-todo="ToggleTodo" v-on:delete-todo="DeleteTodo"/>

    <!-- 페이지네이션 -->
    <hr/>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li 
        class="page-item"
        v-if="nowPage !==1"
        >
          <a class="page-link" v-on:click="GetTodo(nowPage - 1)" style="cursor:pointer" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li 
        class="page-item"
        v-for="count in numberOfPages"
        v-bind:key="count"
        v-bind:class="nowPage === count ? 'active': '' "
        >
        <a class="page-link" style="cursor:pointer" v-on:click="GetTodo(count)">{{count}}</a>
        </li>
        <li 
        class="page-item"
        v-if="nowPage !== numberOfPages"
        >
        <a class="page-link" style="cursor:pointer" v-on:click="GetTodo(nowPage + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
        </li>
      </ul>
    </nav>
  </div>  
</template>

<script>
  import {computed, ref, watch} from 'vue'
  import axios from 'axios'

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
        complete: false
      }]);

      // 에러 메세지
      const error = ref('');

      // 페이지네이션 관련
      // 전체 todos 개수가 필요하다.
      const totalTodos = ref(0);

      // 한 화면당 보여줄 todo
      const limit = 5;

      // 현재 보여주는 페이지 번호
      const nowPage = ref(1);

      // 총 페이지 숫자
      const  numberOfPages = computed( () => {
        // 총 게시물 / 페이지당 출력 수 ===> 올림
        return Math.ceil(totalTodos.value /  limit);
      });

      // 할일 검색 관련
      const SearchText = ref('');
      watch(SearchText, () => {
        GetTodo(1)
      });

      // DB에서 자료 불러오기
      const GetTodo = async(page = nowPage.value) => {
        error.value = '';
        // 전달된 값을 현재 페이지 번호로 받아들인다.
        nowPage.value = page;
        try{
          // 서버에서 자료를 요청한 후에 결과를
          // res에서 받는다. (response)
          const res = await axios.get(`http://localhost:3000/todos?subject_like=${SearchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`); 
          // 총 todos 개수 파악
          totalTodos.value = res.headers["x-total-count"];

          if(numberOfPages.value < nowPage.value) {
            GetTodo(nowPage.value - 1);
            return;
          }
          // response가 될 때 res라는 객체에 .data를 화면에 보여줄 목록으로 출력한다.
          todos.value = res.data;
        }catch(err) {
          console.log(err);
          error.value = "자료를 불러오는데 실패했습니다."
        }
      };

      // 최초의 데이터를 호출한다.
      GetTodo();

      // TodoSimpleForm에서 
      // add-todo 이벤트로 전달된 객체를
      // 처리해 주는 콜백 함수
      const AddTodo = async (todo) => {
        error.value = '';
        try {
            // DB에 저장이 되어야 하는 데이터
            await axios.post('http://localhost:3000/todos/',{
            subject: todo.subject,
            complete: todo.complete
          });
          GetTodo(1)
        }catch(err) {
          console.log(err);
          error.value = "서버를 확인해 주세요.";
        }
        
      };

      const ToggleTodo = async (index) => {
        // complete를 업데이트 하겠다.
        // id를 통해서 내용을 업데이트 하겠다.
        error.value = '';
        const id = todos.value[index].id;
        try {
          // 서버의 DB를 업데이트 한다.
          await axios.patch('http://localhost:3000/todos/' + id, {
            complete: !todos.value[index].complete
          });
          // 웹브라우저의 todo의 화면을 표현한다.
          todos.value[index].complete = !todos.value[index].complete;
        } catch(err) {
          console.log(err);
          err.value = "업데이트에 실패하였습니다.";
        }
      };

      const DeleteTodo = async (index) => {
        // console.log('지우기' + index);
        // 배열 내에서 순서 번호로부터 1개 제거
        const id = todos.value[index].id;
        error.value = '';
        try {
          // 전체 삭제가 아니라 id와 같은 DB를 삭제
          await axios.delete('http://localhost:3000/todos/' + id);
          // 서버에서 목록을 다시 호출한다.
          GetTodo(nowPage.value);
        }catch(err){
          console.log(err);
          error.value = "삭제에 실패했습니다.";
        }
      };

      return {
        todos,
        AddTodo,
        DeleteTodo,
        ToggleTodo,
        SearchText,
        error,
        GetTodo,
        totalTodos,
        limit,
        nowPage,
        numberOfPages
      };
    }
  }
</script>

<style>
.red {
  color: red;
}
.todocss {
  color: gray;
  text-decoration: line-through;
}
</style>