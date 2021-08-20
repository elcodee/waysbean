import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import icon from "../common/jumbotron.svg";
import profile from "../common/profile.svg";
import cart from "../common/cart.svg";
import user from "../common/user.svg";
import count from "../common/notif.svg";
import bean from "../common/bean.svg";
import logout from "../common/logout.svg";
import { UserContext } from "../context/user";
import { setToken } from "../config/server";
import { CartContext } from "../context/cart";

export default function Header() {
  const { state, dispatch } = useContext(UserContext);
  const { CartState } = useContext(CartContext);
  const history = useHistory();

  const handleLogout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
    setToken();
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container px-0">
          {state.isLogin && state.user.role === "owner" ? (
            <Link to="/transactions">
              <div className="navbar-brand">
                <img src={icon} className="img-fluid" width="110" />
              </div>
            </Link>
          ) : (
            <Link to="/">
              <div className="navbar-brand">
                <img src={icon} className="img-fluid" width="110" />
              </div>
            </Link>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <span className="navbar-text ms-auto">
              {state?.isLogin ? (
                <>
                  <div className="d-flex">
                    {state.user.role === "owner" ? (
                      <div></div>
                    ) : (
                      state.user.role === "member" && (
                        <>
                          {CartState.length != 0 ? (
                            <>
                              <img
                                src={cart}
                                onClick={() => history.push("/cart")}
                                className=" me-4"
                                width="35"
                                id="dropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              />
                              <img src={count} className="notif_cart" />
                              <p className="notif_cart_text me-4 text-light">
                                {CartState.length}
                              </p>
                            </>
                          ) : (
                            <>
                              <img
                                src={cart}
                                onClick={() => history.push("/cart")}
                                className=" me-4"
                                width="35"
                                id="dropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              />
                            </>
                          )}
                        </>
                      )
                    )}
                    <div className="dropdown">
                      <img
                        src={profile}
                        className="img-fluid"
                        width="50"
                        id="dropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu" aria-labelledby="dropdown">
                        <div className="arrow-up"></div>
                        <li className="dropdown_menu_custom">
                          {state.user.role === "owner" ? (
                            <Link
                              to="/product"
                              className="text-decoration-none"
                            >
                              <img src={bean} className="me-3" width="30" />
                              Add Product
                            </Link>
                          ) : (
                            state.user.role === "member" && (
                              <Link
                                className="text-decoration-none"
                                to="/profile"
                              >
                                <img src={user} className="me-3" width="30" />
                                Profile
                              </Link>
                            )
                          )}
                        </li>
                        <li>
                          <hr className="dropdown-divider" />{" "}
                        </li>
                        <li className="dropdown_menu_custom">
                          <button
                            className="dropdown-item"
                            type="submit"
                            onClick={handleLogout}
                            style={{ fontSize: "20px" }}
                          >
                            <img
                              src={logout}
                              width="30"
                              style={{
                                marginLeft: "-10px",
                                marginRight: "12px",
                              }}
                            />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#login"
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#register"
                  >
                    Register
                  </button>
                </>
              )}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
