import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { API, setToken } from "./config/server";
import { UserContext } from "./context/user";
import AddProduct from "./page/addProduct";
import Cart from "./page/cart";
import Checkout from "./page/checkout";
import Dashboard from "./page/dashboard";
import Home from "./page/home";
import Product from "./page/product";
import Profile from "./page/profile";
import PrivateRoute from "./router/Router";

if (localStorage.getItem("token")) {
  setToken(localStorage.getItem("token"));
}
function App() {
  const { dispatch } = useContext(UserContext);

  const authcheck = async () => {
    try {
      const response = await API.get("/check");
      if (response.status !== 200) {
        return dispatch({ type: "AUTH_ERROR" });
      }
      let payload = response.data.data;
      payload.token = localStorage.getItem("token");
      await dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  useEffect(() => {
    authcheck();
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={Product} />

        <PrivateRoute path="/cart" component={Cart} />
        <PrivateRoute path="/checkout" component={Checkout} />
        <PrivateRoute path="/profile" component={Profile} />

        {/* OWNER */}
        <PrivateRoute exact path="/transactions" component={Dashboard} />
        <PrivateRoute exact path="/product" component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
