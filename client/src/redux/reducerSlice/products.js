import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

  wishList: [],
  cartList: [],

};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart(state, actions) {

      const existingCartState = [...state.cartList]
      existingCartState.push(actions.payload)
      return {
        ...state,
        cartList: existingCartState
      }

    },
    addToWishList(state, actions) {

      const existingWishListState = [...state.wishList]
      existingWishListState.push(actions.payload)
      return {
        ...state,
        wishList: existingWishListState
      }

    }
  },

},
)

export const { addToCart, addToWishList } = productsSlice.actions;
export default productsSlice.reducer;