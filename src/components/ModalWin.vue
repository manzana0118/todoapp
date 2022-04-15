<template>
    <div class="modal-wrapper">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <!-- 타이틀 slot -->
                        <slot name="title"></slot>
                    </h5>
                    <button type="button" class="close">
                        <span @click="onClose">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- 경고창 본문 slot -->
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <!-- 하단 버튼 slot -->
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    export default {
        emits: ['close-win'],
        setup(props, {emit}) {

            const onClose = () => {
                emit('close-win');
            }

            return {
                onClose
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