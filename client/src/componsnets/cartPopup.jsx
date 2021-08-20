export default function CartPopup() {
  return (
    <div
      className="modal fade"
      id="cartPopup"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content cartPopup_custom">
          <div className="modal-body">
            <p
              className="fw-bold mb-4 text-success text-center"
              id="exampleModalLabel"
            >
              Success Add Product
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
