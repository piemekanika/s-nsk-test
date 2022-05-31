<template>
    <div class="border rounded shadow-sm">
        
        <div class="p-3 bg-light d-flex justify-content-between">
            <div class="fw-semibold">
                {{ group.name }}
            </div>
            
            <div>
                <i class="bi bi-chevron-down"></i>
            </div>
        </div>
        
        <div>
            <product
                v-for="(product, index) in group.products"
                :key="product.id"
                :last="index === group.products.length - 1"
                :product="product"
                :group-name="group.name"
            ></product>
        </div>
    </div>
</template>

<script>
import Product from "@/pages/products/product";
export default {
    props: {
        group: {
            type: Object,
            required: true,
        },
    },
    components: {
        Product,
    },
};
</script>
