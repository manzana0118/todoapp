<template>
<NavBar/>
<!-- 라우터 화면 보여주기 -->
<div class="container">
  <router-view />
  <!-- 안내창 -->
    <ToastBox/>
</div>
</template>

<script>
import ToastBox from '@/components/ToastBox.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    ToastBox,
    NavBar
  },
  setup() {
      
    return {
  
    }
  }
}
</script>

<style>

</style>