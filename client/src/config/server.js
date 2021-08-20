import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const setToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// MEMBER CONNECTION
export const getProducts = async () => {
  try {
    let response = await API.get("/products");
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log("ERR CONFIG GET PRODUCT: ", error);
  }
};

export const getProduct = async (id) => {
  try {
    let response = await API.get(`/product/${id}`);
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log("ERR GET PRODUCT: ", error);
  }
};

export const registerUser = async (inputData) => {
  try {
    let response = await API.post("/register", inputData, {
      "Content-Type": "application/json",
    });
    const data = await response.data.data;
    console.log("REGISTER: ", data);
  } catch (error) {
    console.log("ERR CONFIG LOGIN: ", error);
  }
};

export const loginUser = async (inputData) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };
    let response = await API.post("/login", inputData, config);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = async (id) => {
  try {
    let response = await API.get(`/user/${id}`);
    return response.data.data;
  } catch (error) {
    console.log("ERR CONFIG GET USER BY ID: ", error);
  }
};

export const addTransaction = async (newOrder) => {
  try {
    const formData = new FormData();
    formData.append("name", newOrder.name);
    formData.append("email", newOrder.email);
    formData.append("phone", newOrder.phone);
    formData.append("postCode", newOrder.postCode);
    formData.append("address", newOrder.address);
    formData.append("products", newOrder.products);
    formData.append("attachment", newOrder.attachment);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    let response = await API.post("/transactionn", formData, config);
    return response.data.data;
  } catch (error) {
    console.log("ERR ADD: ", error);
    // return error.response.data;
  }
};

export const getMyTransactions = async () => {
  try {
    const response = await API.get("/my-transactions");
    return response.data.data.transactions;
  } catch (error) {
    return error.response.data;
  }
};

// OWNER CONNECTION
export const getTransactions = async () => {
  try {
    let response = await API.get("/transactions");
    return response.data.data.transactions;
  } catch (error) {
    console.log("ERR GET PRODUCT: ", error);
  }
};

export const addProduct = async (input) => {
  try {
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("stock", input.stock);
    formData.append("price", input.price);
    formData.append("description", input.description);
    formData.append("photo", input.photo);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    let response = await API.post("/product", formData, config);
    return response.data.data;
  } catch (error) {
    console.log("ERR ADD: ", error.response);
    // return error.response.data;
  }
};

export const editTransaction = async (status) => {
  try {
    const data = {
      status: status.status,
    };

    const config = {
      "Content-Type": "application/json",
    };

    let response = await API.patch(
      `/transaction/${parseInt(status.id)}`,
      data,
      config
    );
    return response.data.data;
  } catch (error) {
    console.log("ERR ADD: ", error.response.data);
    // return error.response.data;
  }
};
