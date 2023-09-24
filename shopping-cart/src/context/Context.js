import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { cartReducer } from './Reducers'
import { productReducer } from './Reducers';

const Cart = createContext()

const initialState = {
    products: [],
    cart: []
};

const Context = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock:false,
        byFastDelivery:false,
        byRating:0,
        searchQuery:""
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://dummyjson.com/products')
                const { products } = await response.json()
                dispatch({type:'Set_Products',payload:products})
            }catch(err){
                console.log(err);
            }
    }
    fetchData()
    },[])


    return (
        <Cart.Provider value={{ state, dispatch,productDispatch,productState }}>
            {children}

        </Cart.Provider>
    )
}

export default Context

export const CartState = () => {
    return useContext(Cart)
}
