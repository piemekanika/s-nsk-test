<template>
    <div class="bg-light" style="min-height: 100vh">
        <header class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container-fluid" style="width: 992px;">
                <router-link to="/">
                    <div class="navbar-brand">
                        Azon
                    </div>
                </router-link>

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/cart">
                            <a class="nav-link">
                                <i class="bi bi-cart"></i>

                                Корзина

                                <span v-if="cartItemsCount">
                                    ({{ cartItemsCount }} шт.)
                                </span>
                            </a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </header>

        <main
            class="px-3 py-4 shadow-sm rounded border my-4 mx-auto bg-white"
            style="width: 992px;"
        >
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters('cart', {
            cartItemsCount: 'itemsCount',
        }),
    },
};
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>
