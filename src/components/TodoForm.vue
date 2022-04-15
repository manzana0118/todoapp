<template>
    <div v-if="loading">Loading...</div>
    <form v-else @submit.prevent="onSave">
        <div class="row">
            <!-- 제목 수정 및 입력 창 -->
            <div class="col-6">
                <InputView
                    label="제목"
                    :err="subjectError"
                    v-model="todo.subject"
                />
            </div>
            <!-- 상태 수정 창 -->
            <div class="col-6" v-if="editing">
                <div class="form-group">
                    <label>완료여부</label>
                    <div>
                        <button class="btn" :class="todo.complete ? 'btn-success' : 'btn-danger' "
                            @click="toggleTodoState" type="button">
                            {{ todo.complete ? 'Complete' : 'Incomplete' }}
                        </button>
                    </div>
                </div>
            </div>
            <!-- 본문내용 입력 및 수정 창 -->
            <div class="col-12">
                <div class="form-group">
                    <label for="">본문</label>
                    <textarea class="form-control" cols="30" rows="10" v-model="todo.body"></textarea>
                </div>
            </div>
        </div>
        <button class="btn btn-primary" type="submit" :disabled="todoUpdate">{{editing ? '수정': '생성'}}</button>
        <button class="btn btn-outline-dark ml-2" @click="moveBack" type="button">취소</button>
    </form>

    <transition name="fade">
        <!-- 안내창 -->
        <ToastBox v-if="showToast" :message="toastMessage" :type="toastAlertType" />
    </transition>
</template>

<script>
    import {useRoute, useRouter} from 'vue-router';
    import axios from 'axios';
    import {computed, ref, onUpdated} from 'vue';
    import _ from 'lodash';
    import ToastBox from '@/components/ToastBox.vue';
    import {useToast} from '@/composables/toast.js';
    import InputView from '@/components/InputView.vue';
    export default {

        components: {
            ToastBox,
            InputView
        },
        props: {
            editing: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update-todo', 'new-todo'],
        setup(props, {emit}) {

            onUpdated( () => {
                // console.log(todo.value.subject);
            });

            const route = useRoute();
            const router = useRouter();
            // 현재 진행 및 수정 중인 todo 정보를 저장하고 있는 객체
            const todo = ref({
                subject: '',
                complete: false,
                body: ''
            });

            // 원래 가지고 있었던 todo 저장를 저장하고 있는 객체
            const originalTodo = ref(null);

            // 내용을 가지고 올때만(편집) 활용
            const loading = ref(false);

            // id는 읽어올때 사용, 저장할 때 사용
            const todoId = route.params.id;

            // toastBox 관련
            const {
                showToast,
                toastMessage,
                triggerToast,
                toastAlertType
            } = useToast();

            const getTodo = async () => {
                // 내용을 가지고 올때 로딩 보여주고
                loading.value = true;
                try {
                    const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                    todo.value = {
                        ...res.data
                    }; // spread 연산으로 내용물만 복사
                    originalTodo.value = {
                        ...res.data
                    };
                    // 결과가 오게 되면
                    loading.value = false;

                } catch (error) {
                    // 결과가 오게 되면
                    loading.value = false;

                    console.log(error);
                    triggerToast('서버에서 자료를 호출하는데 실패하였습니다.', 'danger');
                }
            }

            // todo 객체와 origialTodo를 비교한다.
            // 늘 비교한다.
            const todoUpdate = computed(() => {
                return _.isEqual(todo.value, originalTodo.value);
            });

            // 편집이라면 아래 구문을 실행한다.
            if (props.editing) {
                getTodo();
            }

            const toggleTodoState = () => {
                todo.value.complete = !todo.value.complete
            }

            const moveBack = () => {
                router.push({
                    name: 'Todos'
                });
            }

            // 제목 미입력시 경고창
            const subjectError = ref('');

            const onSave = async () => {
                subjectError.value='';
                // 만약에 제목이 없으면 등록 및 편집 불가
                if(!todo.value.subject){
                    subjectError.value ='제목을 입력해주세요.';
                    triggerToast('제목을 입력해주세요.', 'danger');
                    return;
                }
                try {
                    let res;
                    const data = {
                        subject: todo.value.subject,
                        complete: todo.value.complete,
                        body: todo.value.body
                    }
                    if (props.editing) {
                        // 편집으로 진입한 경우
                        res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
                        // console.log(res);
                        // 원본이 갱신 되었으므로 이를 반영하여 새로 저장해 줌.
                        originalTodo.value = {...res.data};
                        emit('update-todo',{});
                        triggerToast('데이터 업데이트에 성공하였습니다.', 'success');
                    }else{
                        // 신규 등록인 경우
                        res = await axios.post(`http://localhost:3000/todos/`, data);
                        emit('new-todo',{});
                        triggerToast('데이터 저장에 성공하였습니다.', 'success');
                    }
                    // 제목, 내용을 비운다
                    todo.value.subject = '';
                    todo.value.body = '';
                    // 목록으로 돌아간다
                    router.push({
                        name: 'Todos'
                    });
                } catch (error) {
                    console.log(error);
                    if(props.editing){
                        triggerToast("데이터 업데이트에 실패하였습니다.", 'danger');   
                    }else{
                        triggerToast("데이터 저장에 실패하였습니다.", 'danger');
                    }
                }

            };

            return {
                todo,
                loading,
                toggleTodoState,
                moveBack,
                onSave,
                todoUpdate,

                showToast,
                toastMessage,
                triggerToast,
                toastAlertType,
                subjectError
            }

        }
    }
</script>

<style>
    
</style>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    }
</style>

