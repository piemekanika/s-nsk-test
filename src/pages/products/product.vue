<template>
    <div class="d-flex flex-column p-3" :class="{'border-bottom': !last}">
        <div>
            {{ product.name }}
        </div>

        <div class="mt-2">
            <span class="fw-semibold">Цена: </span>

            {{ cost }}
        </div>

        <div class="mb-2">
            <span class="fw-semibold">Осталось (шт.): </span>

            {{ countLeft }}
        </div>

        <div class="d-flex align-items-start mt-2">
            <template v-if="!productInCart">
                <button
                    class="btn btn-outline-primary btn-sm"
                    @click="add"
                >
                    добавить в корзину
                </button>
            </template>

            <template v-else>
                <count-input
                    :max="product.count"
                    :count="productInCart.count"
                    @change="onCountChange"
                ></count-input>

                <button
                    class="btn btn-outline-danger btn-sm mx-2"
                    @click="remove"
                >
                    убрать из корзины
                </button>
            </template>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import countInput from '@/components/count-input';
import formatCurrency from '@/helpers/formatCurrency';

export default {
    components: {
        countInput,
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
        groupName: {
            type: String,
            required: true,
        },
        last: {
            type: Boolean,
        },
    },
    computed: {
        ...mapGetters('cart', {
            items: 'items',
        }),
        cost() {
            const rubbleCost = this.product.cost * 68.5;

            return formatCurrency(rubbleCost);
        },
        countLeft() {
            const takenCount = this.productInCart?.count || 0;

            return this.product.count - takenCount;
        },
        productInCart() {
            return this.items.find(({id}) => this.product.id === id);
        },
    },
    methods: {
        ...mapActions('cart', {
            addItemToCart: 'addItemToCart',
            removeItem: 'removeItem',
            changeItemCount: 'changeItemCount',
        }),
        add() {
            this.addItemToCart({
                product: this.product,
                groupName: this.groupName
            });
        },
        remove() {
            this.removeItem({id: this.product.id});
        },
        onCountChange(count) {
            this.changeItemCount({id: this.product.id, count});
        }
    },
};
</script>
