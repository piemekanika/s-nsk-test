import {Module} from 'vuex';

interface Group {
    products: Product[];
    name: string;
    id: number;
}

export interface Product {
    groupId: number;
    count: number;
    name: string;
    cost: number;
    id: number;
}

interface ProductsStore {
    isLoading: boolean;
    groups: Group[];
}

const products: Module<ProductsStore, any> = {

    namespaced: true,

    state: () => ({
        isLoading: false,
        groups: [],
    } as ProductsStore),

    mutations: {
        setLoading: (state: ProductsStore, payload: boolean) => {
            state.isLoading = payload;
        },
        setProducts: (state: ProductsStore, payload: Group[]) => {
            state.groups = payload;
        },
    },

    actions: {
        async load({commit}) {

            commit('setLoading', true);

            const [data, names] = await Promise.all([
                fetch(`${window.location.href}data.json`)
                    .then(r => r.json()),
                fetch(`${window.location.href}names.json`)
                    .then(r => r.json()),
            ]);

            const groups: Group[] = Object.entries(names).map(([key, value]) => {
                return {
                    name: (value as any).G,
                    id: Number(key),
                    products: [],
                };
            });

            const products: Product[] = data.Value.Goods.map((good: any) => {
                const name = names[good.G].B[good.T].N;

                return {
                    name,
                    cost: good.C,
                    count: good.P,
                    id: good.T,
                    groupId: good.G,
                };
            })

            products.forEach(product => {
                const group = groups.find(({id}) => id === product.groupId);

                if (group) {
                    group.products.push(product);
                }
            })

            commit('setProducts', groups);

            commit('setLoading', false);
        },
    },

    getters: {
        productsFlatArray(state) {
            return state.groups.map(g => g.products).flat();
        },
    },
};

export default products
