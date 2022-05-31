<template>
    <div class="border-bottom p-4">
        <div class="row">
            <div class="col-10">
                <div>
                    <span class="fw-semibold">{{ item.groupName }}.</span>

                    {{ item.name }}
                </div>

                <div class="my-2">
                    Цена:

                    {{ cost }}

                    ({{ costPerThing }} за шт.)
                </div>

                <div class="my-2">
                    <count-input
                        :max="maxCount"
                        :count="item.count"
                        @change="onCountChange"
                    ></count-input>
                </div>
            </div>

            <div class="col-2 d-flex justify-content-end align-items-start">
                <button
                    class="btn btn-outline-danger btn-sm"
                    @click="remove"
                >
                    удалить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import CountInput from '@/components/count-input';
import formatCurrency from '@/helpers/formatCurrency';

export default {
    components: {
        CountInput,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters('products', {
            products: 'productsFlatArray',
        }),
        costPerThingNotFormatted() {
            return this.item.cost * 68.5;
        },
        costPerThing() {
            return formatCurrency(this.costPerThingNotFormatted);
        },
        cost() {
            return formatCurrency(this.costPerThingNotFormatted * this.item.count);
        },
        maxCount() {
            return this.products.find(p => p.id === this.item.id).count;
        },
    },
    methods: {
        ...mapActions('cart', {
            removeFromCart: 'removeItem',
            changeItemCount: 'changeItemCount',
        }),
        onCountChange(count) {
            this.changeItemCount({
                id: this.item.id,
                count,
            });
        },
        remove() {
            this.removeFromCart({
                id: this.item.id,
            });
        },
    },
};
</script>
