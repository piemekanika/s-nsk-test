<template>
    <div class="row row-cols-2">
        <div
            v-for="(group, index) in notEmptyGroups"
            :key="group.id"
            class="col"
            :class="{ 'mb-4': index !== notEmptyGroups.length - 1 }"
        >
            <product-group
                :group="group"
            ></product-group>
        </div>
    </div>
</template>

<script>
import ProductGroup from '@/pages/products/product-group';
import {mapActions, mapState} from 'vuex';

export default {
    components: {
        ProductGroup,
    },
    mounted() {
        this.load();
    },
    computed: {
        ...mapState('products', {
            groups: state => state.groups,
            isLoading: state => state.isLoading,
        }),
        notEmptyGroups() {
            return this.groups.filter(group => group.products.length);
        },
    },
    methods: {
        ...mapActions({
            load: 'products/load',
        }),
    },
};
</script>
