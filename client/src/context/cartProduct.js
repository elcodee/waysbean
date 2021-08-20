import React, { createContext, useReducer } from "react";

export const CartProductContext = createContext();

let initialStateCartProduct = [];

const cartProductReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload];
    case "PLUS":
      console.log("PLUS CART PRODUCT STATE");
    default:
      console.log("ERR CART");
      throw new Error("unknown cases CART");
  }
};

export const CartProductProvider = (props) => {
  const [CartProductState, cartProductDispatch] = useReducer(
    cartProductReducer,
    initialStateCartProduct
  );
  return (
    <CartProductContext.Provider
      value={{ CartProductState, cartProductDispatch }}
    >
      {props.children}
    </CartProductContext.Provider>
  );
};
