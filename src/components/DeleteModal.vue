<template>
    <ModalWin>
        <!-- 타이틀 자리 -->
        <template v-slot:title>
            삭제 경고창
        </template>

        <!-- body 자리 -->
        <template v-slot:body>
            해당 항목을 삭제하시겠습니까?
        </template>

        <!-- footer 자리 -->
        <template v-slot:footer>
            <button 
                type="button" 
                class="btn btn-secondary" 
                @click="onClose"
            >
                취소
            </button>
            <button 
                type="button" 
                class="btn btn-danger" 
                @click="onDelete"
            >
                삭제
            </button>
        </template>
    </ModalWin>
</template>

<script>
import ModalWin from '@/components/ModalWin.vue'
import { getCurrentInstance } from 'vue';

export default {
    components: {
        ModalWin
    },
    emits: ['close', 'delete'],
    setup() {
        const { emit } = getCurrentInstance();
        const onClose = () => {
            emit('close');
        }

        const onDelete = () => {
            emit('delete');
        }

        return {
            onClose,
            onDelete
        }
    }
}
</script>

<style>

</style>