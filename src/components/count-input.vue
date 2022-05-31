<template>
    <div class="has-validation">
        <div
            class="input-group input-group-sm"
            style="max-width: 110px;"
        >
            <button
                class="btn btn-outline-secondary"
                @click="decrease"
            >
                <i class="bi bi-dash"></i>
            </button>
    
            <input
                v-model="value"
                class="form-control text-center"
                type="number"
            >
    
            <button
                class="btn btn-outline-secondary"
                :disabled="count === max"
                @click="increase"
            >
                <i class="bi bi-plus"></i>
            </button>
        </div>

        <div
            v-if="error" class="invalid-feedback"
            style="display: block; margin-top: 0;"
        >
            {{ error }}
        </div>
    </div>
</template>

<script>

const DEBOUNCE_TIME = 1000;

export default {
    props: {
        count: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            error: '',
            value: this.count,
        };
    },
    watch: {
        count(val) {
            this.value = val;
        },
        value(val) {
            this.validate();
            
            // пользователь может стереть старое значение чтобы ввести новое
            if (!val) {
                
                // если долго не вводит новое значение, значит отправляем то что есть
                setTimeout(() => {
                    if (!this.value) {
                        this.$emit('change', Number(this.value));
                    }
                }, DEBOUNCE_TIME);

                return;
            }

            if (!this.error) {
                this.$emit('change', Number(val));
            }
        },
    },
    methods: {
        increase() {
            this.change(this.count + 1);
        },
        decrease() {
            this.change(this.count - 1);
        },
        change(count) {
            this.$emit('change', count);
        },
        validate() {
            if (this.value <= this.max) {
                this.error = '';
            } else {
                this.error = 'слишком много';
            }
        },
    },
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
