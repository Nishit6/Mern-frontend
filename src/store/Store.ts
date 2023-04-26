import { createSlice, configureStore } from "@reduxjs/toolkit";
import Product from "../models/product";



export interface ProductState {
    name: string;
    desc: string;
    img: string;
    quantity: number;
    price: string;
}

const initialState: ProductState = { name: '', desc: '', img: '', price: '', quantity: 0 }

const addProductSlice = createSlice({
    name: 'add-product',
    initialState: initialState,
    reducers: {
        addProductName(state, action) {
            state.name = action.payload
        },
        addDescription(state, action) {
            state.desc = action.payload
        },
        addPrice(state, action) {
            state.price = action.payload
        },
        addQuantity(state, action) {
            state.quantity = action.payload
        },
        addImageUrl(state, action) {
            state.img = action.payload
        }

    }
})


export interface ProductList {
    products: Product[]
}

const productListSlice = createSlice({
    name: 'product-list',
    initialState: { productList: [] },
    reducers: {
        storeProducts(state, action) {
            state.productList = action.payload
        }


    }
})

export interface ProductList {
    products: Product[]
}

const productFilteredSlice = createSlice({
    name: 'product-list-filtered',
    initialState: { productList: [] },
    reducers: {
        storeFilteredProducts(state, action) {
            state.productList = action.payload
        }


    }
})


export interface AuthState {

    isLoggedIn: boolean
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {


        isLoggedIn(state, action) {
            state.isLoggedIn = action.payload

        }

    }
})




const store = configureStore({
    reducer: { addProductState: addProductSlice.reducer, productList: productListSlice.reducer, auth: authSlice.reducer, filteredProducts: productFilteredSlice.reducer }
})


export type RootState = ReturnType<typeof store.getState>
export const addProductActions = addProductSlice.actions;
export const productListActions = productListSlice.actions;
export const productFilteredListActions = productFilteredSlice.actions;
export const authActions = authSlice.actions;
export default store;