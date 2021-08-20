import Header from "../componsnets/header";
import photo from "../common/photo.svg";
import logo from "../common/jumbotron.svg";
import barcode from "../common/barcode.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import wait from "../common/waitapprove.svg";
import complate from "../common/approved.svg";
import success from "../common/complate.svg";
import empty from "../common/emptycart.jpg";
import { getMyTransactions, getUser } from "../config/server";
import moment from "moment";

function Profile() {
  const { state } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [isErr, setIserr] = useState(false);

  console.log("TRANSACTION: ", orders);
  console.log("PRODUCTS: ", transaction);

  useEffect(async () => {
    const user = await getUser(state.user.id);
    setUser(user.user);

    const getTrx = await getMyTransactions();

    if (getTrx.length == 0) {
      setIserr(true);
    } else {
      // reducing an array of arrays to a one-dimensional array
      let mapTransactions = getTrx.map((a) => {
        return a.products;
      });
      let transactions = mapTransactions.reduce(
        (acc, curVal) => acc.concat(curVal),
        []
      );

      setOrders(transactions);
      setTransaction(getTrx);
    }
  }, []);
  return (
    <>
      <Header />
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-5">
            <h1 className="mb-5">My Profile</h1>

            <div className="d-flex">
              <img src={photo} width="35%" className="me-5" />
              <div className="d-block">
                <h3>Full Name</h3>
                <p className="fs-4">{user.fullName}</p>

                <h3>Email</h3>
                <p className="fs-4">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h1 className="mb-5">My Transactions</h1>
            {isErr ? (
              <img src={empty} alt="" />
            ) : (
              transaction.map((transactions, a) =>
                orders.map((products, b) => (
                  <div key={a} className="card card_custom mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={products.photo}
                          className="img-fluid rounded-start img_custom"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-8">
                              <h3 className="fw-bold">{products.name}</h3>
                              <div className="d-flex">
                                <b>
                                  {moment(transactions.createdAt).format(
                                    "LLLL"
                                  )}
                                </b>
                              </div>
                              <br />
                              <p className="text-sm-start fw-light">
                                Price : Rp.{" "}
                                {products.price.toLocaleString("id")}
                              </p>
                              <p className="text-sm-start fw-light">
                                Qty :{" "}
                                {products.orderQuantity.qty.toLocaleString(
                                  "id"
                                )}
                              </p>
                              <p className="text-sm-start fw-bold">
                                Sub Total :{" "}
                                {parseInt(
                                  products.price * products.orderQuantity.qty
                                ).toLocaleString("id")}
                              </p>
                            </div>
                            <div className="col-md-4">
                              <img
                                src={logo}
                                width="120"
                                style={{ marginLeft: "-5px" }}
                              />
                              <img
                                src={barcode}
                                width="120"
                                className="mt-2"
                                style={{ marginLeft: "-5px" }}
                              />
                              <div className="d-flex">
                                {transactions.status == "Waiting Approve" ? (
                                  <img src={wait} className="mt-3 trx_status" />
                                ) : transactions.status == "Approve" ? (
                                  <img
                                    src={complate}
                                    className="mt-3 trx_status"
                                  />
                                ) : (
                                  transactions.status == "Cancel" && (
                                    <img
                                      src={success}
                                      className="mt-3 trx_status"
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
