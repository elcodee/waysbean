import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartPopup from "../componsnets/cartPopup";
import Header from "../componsnets/header";
import LoginModal from "../componsnets/loginModal";
import RegisterModal from "../componsnets/registerModal";
import { getProduct } from "../config/server";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";

export default function Product() {
  const [product, setProduct] = useState({});
  const { state } = useContext(UserContext);
  const { cartDispatch } = useContext(CartContext);
  let { id } = useParams();

  const handleClik = (e) => {
    e.preventDefault();
    let order = {
      id: product.id,
      orderQuantity: 1,
      // price: product.price,
    };
    cartDispatch({
      type: "ADD",
      payload: order,
    });
  };

  useEffect(async () => {
    let data = await getProduct(id);
    setProduct(data);
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="d-flex">
            <div className="col-4">
              <img src={product.photo} width="110%" className="img_detail" />
            </div>
            <div className="col-8">
              <h1 className="text_detail fw-bolder">{product.name}</h1>
              <p className="text_stock">Stock : {product.stock}</p>
              <p className="text_desc fs-5 text-dark">{product.description}.</p>
              <h2
                className="text_price fw-bolder"
                style={{
                  marginTop: "4em",
                }}
              >
                Rp.{parseInt(product.price).toLocaleString("id-ID")}
              </h2>

              <div
                className="d-grid gap-5"
                style={{
                  width: "45.7em",
                  marginLeft: "7.7em",
                  marginTop: "4em",
                }}
              >
                <button
                  className="btn btn-primary py-4"
                  onClick={handleClik}
                  type="button"
                >
                  {state.isLogin ? (
                    <div
                      className="fs-5 fw-bold"
                      style={{ marginTop: "-0.6em" }}
                      data-bs-toggle="modal"
                      data-bs-target="#cartPopup"
                    >
                      Add Cart
                    </div>
                  ) : (
                    <div
                      className="fs-5 fw-bold"
                      style={{ marginTop: "-0.6em" }}
                      data-bs-toggle="modal"
                      data-bs-target="#login"
                    >
                      Add Cart
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartPopup />
      <LoginModal />
      <RegisterModal />
    </>
  );
}
