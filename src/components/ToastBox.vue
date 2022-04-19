<template>
    <div class="toast-box">
        <!-- slide transition 걸어주기 -->
        <transition-group name="slide">
            <div 
                v-for="item in toasts"
                :key="item.id"
                class="alert" 
                :class="`alert-${item.type}`" 
                role="alert">
                {{item.message}}
            </div>
        </transition-group>    
    </div>
</template>

<script>
import {useToast} from '@/composables/toast.js'
    export default {
        setup() {
        const {toasts} = useToast();
        return {
            toasts
        }
    }
}
</script>

<style scoped>
    .toast-box {
        position: fixed;
        top: 65px;
        right: 10px;
    }
    .slide-enter-active,
    .slide-leave-active {
    transition: all 0.5s ease;    
}

    .slide-enter-from,
    .slide-leave-to {  
    opacity: 0;
    transform: translateY(-30px);  
}

    .slide-enter-to,
    .slide-levave-from {
    opacity: 1;
    transform: translateY(0px);
}
</style>