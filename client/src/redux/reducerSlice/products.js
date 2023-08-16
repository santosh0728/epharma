import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   
    wishList:[],
    cartList:[],
  
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      addToCart(state, actions) {
        
        const existingCartState=[...state.cartList]
        existingCartState.push(actions.payload)
        return{
            ...state,
            cartList:existingCartState
        }

            }
      },
     
    },
  )

export const { addToCart } = productsSlice.actions;
export default productsSlice.reducer;