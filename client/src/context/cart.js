import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialStateCart = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "PLUS":
      const isProduct = state.find((product) => product.id === action.payload);
      if (isProduct) {
        const updatedProduct = state.map((product) => {
          if (product.id === action.payload) {
            return {
              ...product,
              orderQuantity: product.orderQuantity + 1,
            };
          } else {
            return {
              ...product,
            };
          }
        });
        return [...updatedProduct];
      }
      return {
        ...state,
      };
    case "MINUS":
      const isProducts = state.find((product) => product.id === action.payload);
      if (isProducts) {
        const updatedProduct = state.map((product) => {
          if (product.id === action.payload) {
            return {
              ...product,
              orderQuantity: product.orderQuantity - 1,
            };
          }
          return {
            ...product,
          };
        });
        return [...updatedProduct];
      }
      return {
        ...state,
      };
    case "REMOVE":
      const lists = state.filter((x) => {
        return x.id !== action.payload;
      });
      return lists;
    case "CLEAN":
      return [];
    default:
      console.log("ERR CART");
      throw new Error("unknown cases CART");
  }
};

export const CartProvider = (props) => {
  const [CartState, cartDispatch] = useReducer(cartReducer, initialStateCart);
  return (
    <CartContext.Provider value={{ CartState, cartDispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
