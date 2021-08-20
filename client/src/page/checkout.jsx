import Header from "../componsnets/header";
import product from "../common/addprod.svg";
import logo from "../common/jumbotron.svg";
import { useContext, useEffect, useState } from "react";
import { addTransaction, getProducts } from "../config/server";
import { CartContext } from "../context/cart";
import moment from "moment";
import CheckoutPopup from "../componsnets/checkoutPopup";

export default function Checkout() {
  const { CartState, cartDispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [userOrder, setUserorder] = useState({
    name: null,
    email: null,
    phone: null,
    postCode: null,
    address: null,
    attachment: null,
    products: [],
  });

  const newProducts = JSON.stringify(
    CartState.map((item) => {
      return { id: item.id, orderQuantity: item.orderQuantity };
    })
  );

  const handleChange = (e) => {
    setUserorder({
      ...userOrder,
      [e.target.name]: e.target.value,
      products: newProducts,
    });
  };

  const handlephoto = (e) => {
    setUserorder({
      ...userOrder,
      attachment: e.target.files[0],
    });
  };

  const submitTransaction = async () => {
    const newOrders = await addTransaction(userOrder);
    console.log("NEW ORDERS: ", newOrders);
    cartDispatch({
      type: "CLEAN",
    });
  };

  useEffect(async () => {
    const getProduct = await getProducts();

    const myArrayFiltered = getProduct.filter((el) => {
      return CartState.some((f) => {
        return f.id === el.id;
      });
    });

    setProducts(myArrayFiltered);
  }, []);
  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-5">
            <h1>Shipping</h1>

            <div className="mb-3">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="form-control"
                placeholder="Name"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                name="phone"
                onChange={handleChange}
                className="form-control"
                placeholder="Phone"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="postCode"
                onChange={handleChange}
                className="form-control"
                placeholder="Post Code"
                required
              />
            </div>

            <div className="mb-3">
              <textarea
                placeholder="Address"
                name="address"
                onChange={handleChange}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                required
              ></textarea>

              <label
                className="form-control mt-3 mb-3"
                style={{ width: "15em", height: "3.5em" }}
              >
                <p style={{ marginTop: "0.2em" }}>Payment Proof</p>
                <input
                  type="file"
                  class="form-control"
                  onInput={(e) => handlephoto(e)}
                  style={{
                    width: "15em",
                    marginTop: "-1em",
                    marginLeft: "-1em",
                    opacity: "0",
                  }}
                  id="price"
                  placeholder="Price"
                  required
                />
                <img
                  src={product}
                  style={{ marginTop: "-8.5em", marginLeft: "12em" }}
                />
              </label>
            </div>
          </div>
          <div className="col-md-7 mt-5">
            {products.map((product, i) =>
              CartState.map((cartId) => {
                if (product.id == cartId.id) {
                  return (
                    <div
                      className="card card_custom mb-3"
                      style={{ width: "50em", height: "13em" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-3">
                          <img
                            src={product.photo}
                            className="img-fluid rounded-start img_custom"
                            style={{ height: "12em", padding: "5px" }}
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-8">
                                <h3 className="fw-bold">{product.name}</h3>
                                <div className="d-flex">
                                  <b>{moment().format("LLLL")}</b>
                                </div>
                                <br />
                                <p className="text-sm-start fw-light">
                                  Price : Rp.{" "}
                                  {product.price.toLocaleString("id")}
                                </p>
                                <p className="text-sm-start fw-light">
                                  Qty : {cartId.orderQuantity}
                                </p>
                                <p className="text-sm-start fw-bold">
                                  Sub Total :{" "}
                                  {(
                                    product.price * cartId.orderQuantity
                                  ).toLocaleString("id")}
                                </p>
                              </div>
                              <div className="col-md-4">
                                <img
                                  src={logo}
                                  width="120"
                                  style={{ marginLeft: "-5px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            )}
            <button
              onClick={submitTransaction}
              className="btn btn-primary py-4"
              data-bs-toggle="modal"
              data-bs-target="#checkoutPopup"
            >
              <div
                className="fs-5 fw-bold"
                style={{ width: "39em", marginTop: "-0.6em" }}
              >
                Pay
              </div>
            </button>
          </div>
        </div>
      </div>

      <CheckoutPopup />
    </>
  );
}
