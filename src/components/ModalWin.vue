<template>
    <div class="modal-wrapper">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">경고창</h5>
                    <button type="button" class="close">
                        <span @click="onClose">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    해당 항목을 삭제하시겠습니까?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="onClose">취소</button>
                    <button type="button" class="btn btn-danger" @click="onDelete">삭제</button>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    export default {
        emits: ['close', 'delete'],
        setup(props, {emit}) {

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
    .modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 9;
    }
</style>