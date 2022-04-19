import {computed} from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore();
    const toasts = computed(()=>store.state.toast.toasts); // 보이고 안보이고
    // toastBox 관련
    // vuex의 state 접근시 ref로 설정시 즉시 반영 안됨
    // computed로 접근해서 변경된 값을 참조합니다.
    const showToast = computed(()=>store.state.toast.showToast); // 보이고 안보이고
    // getters인 경우에는 접근법이 ['경로/이름'] 이다.
    const toastMessage = computed(()=>store.getters['toast/toastSmileMessage']); // 메시지
    const toastAlertType = computed(()=>store.state.toast.toastAlertType); // Alert 타입 종류

    // 메시지가 전달되면 toastBox 보여주기
    const triggerToast = (message = '', type = 'success') => {
        store.dispatch('toast/triggerToast', {message, type});
    }

    return {
        showToast,
        toastMessage,
        triggerToast,
        toastAlertType,
        toasts
    }
}