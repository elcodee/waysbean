import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, setToken } from "../config/server";
import { UserContext } from "../context/user";

export default function LoginModal() {
  const [data, setData] = useState({});
  const [isError, setIserror] = useState(false);
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const handleInput = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let login = await loginUser(data);

      setIserror(false);
      setToken(login.user.token);
      localStorage.setItem("token", login.user.token);
      dispatch({
        type: "LOGIN",
        payload: login.user,
      });

      login.user.role == "owner"
        ? history.push("/transactions")
        : history.push("/");
    } catch (error) {
      setIserror(true);
      console.log("ERR LOGIN: ", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="login"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content signin_custom">
          <div className="modal-body">
            <h2 className="fw-bold mb-4" id="exampleModalLabel">
              Login
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputEmail1"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div className="mb-3">
                <div
                  className="d-grid gap-1"
                  style={{
                    width: "21em",
                    marginTop: "1em",
                  }}
                >
                  <button
                    type="submit"
                    className="btn btn-primary py-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <div
                      className="fs-5 fw-bold"
                      style={{ marginTop: "-0.7em" }}
                    >
                      Login
                    </div>
                  </button>
                </div>
                <p className="text-center mt-4">
                  Don't have an account ?
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#register"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    &nbsp; Klik Here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
