import Header from "../componsnets/header";
import trash from "../common/trash.svg";
import empty from "../common/empty-cart.png";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart";
import { getProducts } from "../config/server";
import { useHistory } from "react-router-dom";

export default function Cart() {
  const { CartState, cartDispatch } = useContext(CartContext);
  const [carts, setCarts] = useState([]);
  const history = useHistory();

  console.log("CNTX:", CartState);

  const subTotal = carts
    .map((item) => item.price * item.orderQuantity)
    .reduce((prev, curr) => prev + curr, 0);

  const totalQty = CartState.map((item) => item.orderQuantity).reduce(
    (prev, curr) => prev + curr,
    0
  );

  useEffect(async () => {
    let data = await getProducts();
    let idProduct = CartState.map((cart) => {
      return cart.id;
    });
    const cartProducts = data.filter((item) => idProduct.includes(item.id));
    const cart = CartState.map((item, i) => {
      return Object.assign({}, item, cartProducts[i]);
    });

    setCarts(cart);
  }, [CartState, totalQty]);
  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <h1 className="mb-4">My Cart</h1>
            <p className="fs-4">Review Your Order</p>

            <div className="dropdown-dividerr"></div>
            {CartState.length === 0 ? (
              <img
                src={empty}
                width="250"
                style={{
                  marginLeft: "17em",
                  marginTop: "2em",
                  marginBottom: "2em",
                }}
              />
            ) : (
              carts.map((item, key) => {
                return (
                  <>
                    <div key={key} className="d-flex mb-2">
                      <img src={item.photo} className="img_cart" alt="" />
                      <p className="cart_name">{item.name}</p>
                      <div
                        onClick={() =>
                          cartDispatch({
                            type: "MINUS",
                            payload: item.id,
                          })
                        }
                        className="cart_min fs-4"
                      >
                        -
                      </div>
                      <div className="cart_count">
                        <h5 style={{ marginTop: "2px", marginLeft: "0.7em" }}>
                          {item.orderQuantity}
                        </h5>
                      </div>
                      <div
                        onClick={() =>
                          cartDispatch({
                            type: "PLUS",
                            payload: item.id,
                          })
                        }
                        className="cart_plus fs-4"
                      >
                        +
                      </div>
                      <h5 className="fw-light cart_price">
                        Rp.
                        {parseInt(
                          item.price * item.orderQuantity
                        ).toLocaleString("id")}
                      </h5>

                      <button
                        onClick={() =>
                          cartDispatch({
                            type: "REMOVE",
                            payload: item.id,
                          })
                        }
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <img src={trash} className="cart_trash" alt="" />
                      </button>
                    </div>
                    <div className="dropdown-dividerr"></div>
                  </>
                );
              })
            )}
          </div>

          <div className="col-md-4">
            <div
              className="dropdown-dividerr"
              style={{ marginTop: "7.1em" }}
            ></div>
            <div className="d-block mt-3">
              <div className="d-flex">
                <p className="fw-light fs-5">Subtotal</p>
                <p className="fw-light fs-5" style={{ marginLeft: "13.5em" }}>
                  {subTotal.toLocaleString("id")}
                </p>
              </div>

              <div className="d-flex">
                <p className="fw-light fs-5">Qty</p>
                <p className="fw-light fs-5" style={{ marginLeft: "18.5em" }}>
                  {totalQty}
                </p>
              </div>
            </div>
            <div
              className="dropdown-dividerr"
              style={{ marginTop: "1em" }}
            ></div>
            <div className="d-flex mt-2">
              <p className="fw-light fs-5">Total</p>
              <p className="fw-light fs-5" style={{ marginLeft: "15em" }}>
                {subTotal.toLocaleString("id")}
              </p>
            </div>
            <div
              className="d-grid gap-1"
              style={{
                width: "18em",
                marginTop: "1em",
                marginLeft: "8em",
              }}
            >
              <button
                type="submit"
                className="btn btn-primary py-4"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <div
                  onClick={() => history.push("/checkout")}
                  className="fs-5 fw-bold"
                  style={{ marginTop: "-0.7em" }}
                >
                  Proceed To Checkout
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
