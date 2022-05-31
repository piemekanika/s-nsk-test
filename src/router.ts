import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import products from '@/pages/products/products.vue';
import cart from '@/pages/cart/cart.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: products,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: cart,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
