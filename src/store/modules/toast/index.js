export default {
    // 분류를 하고 난 이후에 접근시 구분하려는
    // 경우에는 namespaced를 true로 셋팅후
    // 별도의 state, muation, actions, getter 작성
    namespaced: true,
    // vux 에 데이터 변수 설정
    state: {    
        // 메세지 및 타입 목록
        toasts: [],
        // toastBox 관련
        showToast : false
    },
    mutations: {
        // 메세지가 추가될 때
        ADD_TOAST(state, payload){
            state.toasts.push(payload);
        },
        // 메세지가 제거될 때
        REMOVE_TOAST(state){
            state.toasts.shift();
        },
        UPDATE_TOAST_STATUS (state, payload) {
            state.showToast = payload;
        }, 
    },
    actions: {
        triggerToast( { commit }, {message, type} ) {            
            commit('UPDATE_TOAST_STATUS', true);
            // commit('UPDATE_TOAST_MESSAGE', message);
            // commit('UPDATE_TOAST_ALERT_TYPE', type);
            commit('ADD_TOAST', {
                id: Date.now(),
                message, 
                type
            });
            setTimeout( () => {
                commit('UPDATE_TOAST_STATUS', false);
                // commit('UPDATE_TOAST_MESSAGE', '');
                // commit('UPDATE_TOAST_ALERT_TYPE', '');
                commit('REMOVE_TOAST');
            }, 3000);
            
        }
    },
    getters :  {
        toastSmileMessage(state){
        return state.toastMessage + "^^~~";
        }  
    }
}