<template>    
    <h1>Todo Edit</h1>
    <div v-if="loading">Loading...</div>
    <form v-else @submit.prevent="onSave">
        <!-- 제목 수정 창 -->
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" class="form-control" v-model="todo.subject">
                </div>
            </div>

            <!-- 상태 수정 창 -->
            <div class="col-6">
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button class="btn" :class="todo.complete ? 'btn-success' : 'btn-danger' " @click="toggleTodoState" type="button">{{ todo.complete ? 'Complete' : 'Incomplete'}}</button>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-primary" type="submit" :disabled="todoUpdate">저장</button>
        <button class="btn btn-outline-dark ml-2" @click="moveBack" type="button">취소</button>
    </form>
    <ToastBox v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import {computed, ref} from 'vue'
import _ from 'lodash'
import ToastBox from '@/components/ToastBox.vue'

export default {
    components: {
        ToastBox
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        // 현재 진행 및 수정 중인 todo 정보를 저장하고 있는 객체
        const todo =  ref(null);
        // 원래 가지고 있었던 todo 저장를 저장하고 있는 객체
        const originalTodo = ref(null);

        const loading = ref(true);

        // id는 읽어올 때 사용, 저장할 때 사용
        const todoId= route.params.id;

        // toastBox 관련
        const showToast = ref(false); // 보이고 안 보이고
        const toastMessage = ref(''); // 메세지창
        const toastAlertType = ref(''); // Alert 타입 종류

        // 메세지가 전달되면 toastBox 보여주기
        const triggerToast = (message='', type='success') => {
            toastMessage.value = message;
            showToast.value = true;
            toastAlertType.value = type;

            setTimeout( () => {
                toastMessage.value='';
                showToast.value = false;
            }, 3000 )
        }

        const getTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);            
                todo.value = {...res.data }; // spread 연산으로 내용물 만 복사
                originalTodo.value = { ...res.data }; // spread 연산으로 내용물 만 복사
                loading.value = false;
            }catch(error){
                triggerToast('서버에서 자료를 가지고 오는데 실패하였습니다. ', 'danger');
            }
            const res = await axios.get(`http://localhost:3000/todos/${route.params.id}`);
            // res.data 를 그냥 전달하면, 원본이 같이 참조가 되므로
            // 복사본이 이라고 할 수 가 없다.
            // 왜냐하면, 내용을 복사한 것이 아니라, 주소를 복사 했으므로 그렇다.
            todo.value = {...res.data};
            originalTodo.value = {...res.data};
            loading.value = false;
        }

        // todo 객체와 originalTodo를 비교합니다. (항상)
        const todoUpdate = computed( () => {
            return _.isEqual(todo.value, originalTodo.value);
        });

        getTodo();

        const toggleTodoState = () => {
            todo.value.complete = !todo.value.complete
        }

        const moveBack = () => {
            router.push({
                name: 'Todos'
            })
        }

        const onSave = async () => {
            try {
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject: todo.value.subject,
                complete: todo.value.complete
                });
                //v console.log(res);
                // 원본이 갱신 되었으므로 이를 반영하여 새로 저장해 줌.
                originalTodo.value = {...res.data};
                triggerToast('데이터 저장에 성공하였습니다.', 'success');
            }catch(error){
                triggerToast('데이터 저장에 실패하였습니다.', 'danger')
            }
        }

        return {
            todo,
            loading,
            toggleTodoState,
            moveBack,
            onSave,
            originalTodo,
            todoUpdate,
            toastMessage,
            showToast,
            triggerToast,
            toastAlertType
        }
    }
}
</script>

<style>

</style>