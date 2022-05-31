import {Module} from 'vuex';
import {Product} from './products';

interface CartStore {
    items: CartItem[];
}

interface CartItem {
    name: string;
    cost: number;
    count: number;
    id: number;
    groupName: number;
}

type GetItemById = (items: CartItem[], id: number) => CartItem;

export const getItemById: GetItemById = (items, id) => {
    const item = items.find(item => item.id === id);

    if (!item) {
        throw new Error(`Не удалось найти товар с id ${id}`);
    }

    return item;
};

const cart: Module<CartStore, CartStore> = {

    namespaced: true,

    state: () => ({
        items: [],
    } as CartStore),

    mutations: {
        addItem(state, payload: CartItem) {
            state.items.push(payload);
        },
        removeItemById(state, payload) {
            state.items = state.items.filter(({id}) => id !== payload);
        },
        setItemCount(state, {id, count}) {
            getItemById(state.items, id).count = count;
        },
    },

    actions: {
        changeItemCount({commit, state}, {id, count}) {
            commit('setItemCount', {id, count});

            if (getItemById(state.items, id).count <= 0) {
                commit('removeItemById', id);
            }
        },
        addItemToCart({commit}, {product, groupName}: { product: Product, groupName: string }) {
            commit('addItem', {
                groupName: groupName,
                cost: product.cost,
                name: product.name,
                id: product.id,
                count: 1,
            });
        },
        removeItem({commit}, {id}) {
            commit('removeItemById', id);
        },
    },

    getters: {
        items(state) {
            return state.items;
        },
        itemsCount(state) {
            return state.items.length
                ? state.items.reduce((acc, i) => i.count + acc, 0)
                : 0;
        },
    },
};

export default cart;
