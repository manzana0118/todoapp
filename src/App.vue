<template>
<!-- 상단메뉴 -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
      <router-link class="nav-link" :to="{name: 'Todos'}">Todos</router-link>
      <router-link class="nav-link" :to="{name: 'About'}">About</router-link>
      <router-link class="nav-link" :to="{name:'Profile'}">Profile</router-link>      
    </div>
  </nav>
<!-- 라우터 화면 보여주기 -->
<div class="container">
  <router-view @update-todo-toast="updateTodo" @new-todo-toast="newTodo" />
  <!-- 안내창 -->
        <ToastBox v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
</div>


</template>

<script>
import ToastBox from '@/components/ToastBox.vue'
import { useToast } from '@/composables/toast.js'

export default {
  components: {
    ToastBox,
  },
  setup() {
    // ToastBox 관련
      const {
        showToast,
        toastMessage,
        triggerToast,
        toastAlertType
      } = useToast();

    const updateTodo = () => {
      triggerToast('목록이 업데이트 되었습니다.', 'success');
    };
    const newTodo = () => {
      triggerToast('새로운 글이 추가되었습니다.', 'success');
    };

    return {
      updateTodo,
      newTodo,
      showToast,
      toastMessage,
      triggerToast,
      toastAlertType
    }
  }
}
</script>

<style>

</style>