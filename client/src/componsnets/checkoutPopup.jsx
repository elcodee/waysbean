import { Link } from "react-router-dom";

export default function CheckoutPopup() {
  return (
    <div
      className="modal fade"
      id="checkoutPopup"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content checkoutPopup_custom">
          <div className="modal-body">
            <p className="fw-bold mb-4 text-success text-center">
              Thank you for ordering us, please wait 1x 24 hours to verify you
              order
              <Link to="/profile">
                <div
                  className="mt-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Click Here
                </div>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
