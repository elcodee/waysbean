import { useState } from "react";
import { registerUser } from "../config/server";

export default function RegisterModal() {
  const [data, setData] = useState({});

  const handleInput = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(data);
  };

  return (
    <div
      className="modal fade"
      id="register"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content register_custom">
          <h2 className="fw-bold mb-4" id="exampleModalLabel">
            Register
          </h2>
          <div className="modal-body">
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
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  name="role"
                  onChange={handleInput}
                  aria-label="Default select example"
                  required
                >
                  <option selected>Select Role ...</option>
                  <option value="owner">Owner</option>
                  <option value="member">Member</option>
                </select>
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
                      Register
                    </div>
                  </button>
                </div>
                <p className="text-center mt-4">
                  Already have an account ?
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#login"
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
