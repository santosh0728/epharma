import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

  wishList: [],
  cartList: [],

};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartList.find((item) => item._id === newItem._id);

      if (existingItem) {
        // If the item is already in the cart, increment its quantity
        existingItem.quantity += 1;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        state.cartList.push({ ...newItem, quantity: 1 });
      }

      // Explicit return statement with the updated state
      return state;
    },
    

    addToWishList(state, actions) {

      const existingWishListState = [...state.wishList]
      existingWishListState.push(actions.payload)
      return {
        ...state,
        wishList: existingWishListState
      }

    },
    initializeCartAndWishList(state,actions){
      state=initialState
      return state
    },
    removeFromCart(state,actions){
      let initialCart=[...state.cartList];

      const deleteItem=actions.payload;
      initialCart=initialCart.filter((item)=>item._id!==deleteItem._id)
      return{
        ...state,
        cartList:initialCart
      }
    }

  },
}
)

export const { addToCart, addToWishList ,initializeCartAndWishList,removeFromCart} = productsSlice.actions;
export default productsSlice.reducer;