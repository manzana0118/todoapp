import {onUnmounted, ref} from 'vue'

export const useToast = () => {
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
            toastAlertType.value='';
            showToast.value = false;
        }, 1000 )
    }

    // Lifecycle Hooks
    // 컴포넌트 해제
    const toastTimeout = ref(null);
    onUnmounted( () => { 
        // 타이머 실행을 막아준다. 메모리 절약  
        clearTimeout(toastTimeout);        
    });

    return {
        showToast,
        toastMessage,
        triggerToast,
        toastAlertType
    }
}