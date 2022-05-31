<template>
    <div>
        <div class="mb-4">
            <router-link to="/" class="text-decoration-none">
                <i class="bi bi-arrow-left-short"></i>
                
                <span>
                    вернуться к покупкам
                </span>
            </router-link>
        </div>
        
        <div v-if="hasItems" class="border rounded">
            <cart-item
                v-for="(item, index) in items"
                :key="item.id"
                :item="item"
                :last="index === items.length - 1"
            ></cart-item>
            
            <div class="p-4">
                <div class="fw-semibold">
                    Итого: {{ totalCost }}
                </div>
            </div>
        </div>
        
        <div v-else class="border rounded p-4 text-muted">
            Корзина пуста.
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import cartItem from './cartItem.vue';
import formatCurrency from '@/helpers/formatCurrency';

export default {
    components: {
        cartItem,
    },
    computed: {
        ...mapGetters('cart', {
            items: 'items',
        }),
        hasItems() {
            return !!this.items.length;
        },
        totalCost() {
            const notFormatted = this.items.reduce((acc, cur) => acc + (cur.cost * cur.count), 0);
            
            return formatCurrency(notFormatted * 68.5);
        },
    },
};
</script>
