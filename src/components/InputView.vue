<template>
    <div class="form-group">
        <label>{{label}}</label>
        <input 
            type="text" 
            class="form-control" 
            :value="modelValue"
            @input="onInput"
        >
        <div 
            v-if="err" 
            class="red-text bold-text"
        >
            {{err}}
        </div>
    </div>
</template>

<script>
    import { getCurrentInstance } from 'vue';
    export default {
        props: {
            label: {
                type: String,
                required: true
            },
            err: {
                type: String,
                required: true
            },
            modelValue: {
                type: String,
                required: true
            }
        },
        emits: ['update-subject'],
        setup() {
            const { emit } = getCurrentInstance();
            const onInput = (event) => {
                emit('update:modelValue', event.target.value);
            }

            return {
                onInput
            }
        }
    }
</script>

<style scoped>
    .red-text {
        color: red;
    }
    .bold-text {
        font-weight: bold;
    }
</style>
