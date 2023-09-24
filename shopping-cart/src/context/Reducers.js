export const cartReducer = (state, action) => {
    switch (action.type) {

        case 'Set_Products':
            return { ...state, products: action.payload }
        case 'Add_To_Cart':
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
        case 'Remove_From_Cart':
            return { ...state, cart: state.cart.filter((c) => c.id !== action.payload.id) }
        case 'Change_Cart_Qty':
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item
                )
            };
        default:
            return state;
    }

}
export const productReducer = (state, action) => {
    switch (action.type) {

        case 'Sort_By_Price':
            return { ...state, sort: action.payload }
        case 'Filter_By_Stock':
            return { ...state, byStock: !state.byStock }
        case 'Filter_By_Delivery':
            return { ...state, byFastDelivery: !state.byFastDelivery }
        case 'Filter_By_Rating':
            return { ...state, byRating: action.payload }
        case 'Filter_By_Search':
            return { ...state, searchQuery: action.payload }
        case 'Clear_Filters':
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: ''
            }
        default:
            return state
    }
}