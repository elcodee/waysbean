import Header from "../componsnets/header";
import product from "../common/addprod.svg";
import noImg from "../common/noimg.png";
import { useState } from "react";
import { addProduct } from "../config/server";

function AddProduct() {
  const [previewImage, setPreviewImage] = useState({
    photo: null,
  });

  const [uploadPhoto, setUploadphoto] = useState({
    name: null,
    stock: null,
    price: null,
    description: null,
    photo: null,
  });

  const handleChange = (e) => {
    setUploadphoto({
      ...uploadPhoto,
      [e.target.name]: e.target.value,
    });
  };

  const handlephoto = (e) => {
    setPreviewImage({
      photo: URL.createObjectURL(e.target.files[0]),
    });

    setUploadphoto({
      ...uploadPhoto,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(uploadPhoto);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="mt-5 mb-4">Add Product</h1>

            <form onSubmit={handleSubmit}>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  class="form-control"
                  id="name"
                  placeholder="Name"
                />
                <label for="name">Name</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  name="stock"
                  onChange={(e) => handleChange(e)}
                  class="form-control"
                  id="stock"
                  placeholder="Stock"
                />
                <label for="stock">Stock</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  name="price"
                  onChange={(e) => handleChange(e)}
                  class="form-control"
                  id="price"
                  placeholder="Price"
                />
                <label for="price">Price</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control"
                  name="description"
                  onChange={(e) => handleChange(e)}
                  placeholder="Description"
                  id="desc"
                  style={{ height: "100px" }}
                ></textarea>
                <label for="desc">Description</label>
              </div>

              <label
                className="form-control mb-3"
                style={{ width: "15em", height: "3.5em" }}
              >
                <p style={{ marginTop: "0.2em" }}>Photo Product</p>
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
                />
                <img
                  src={product}
                  style={{ marginTop: "-8.5em", marginLeft: "12em" }}
                />
              </label>

              <div
                className="d-grid gap-5"
                style={{
                  width: "20em",
                  marginLeft: "7em",
                  marginTop: "2em",
                }}
              >
                <button className="btn btn-primary py-4" type="submit">
                  <div className="fs-5 fw-bold" style={{ marginTop: "-0.6em" }}>
                    Add Product
                  </div>
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <img
              src={previewImage.photo ? previewImage.photo : noImg}
              style={{ width: "75%", marginTop: "4em", marginLeft: "10em" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
