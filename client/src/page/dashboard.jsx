import { useEffect, useState } from "react";
import Header from "../componsnets/header";
import { editTransaction, getTransactions } from "../config/server";

// ICON
import success from "../common/success.svg";
import cancel from "../common/cancel.svg";

export default function Dashboard() {
  const [listTrx, setListtrx] = useState([]);

  console.log("LIST TRX: ", listTrx);

  const handleChange = async (e, val) => {
    e.preventDefault();
    editTransaction(val);

    const data = await getTransactions();
    setListtrx(data);
  };

  useEffect(async () => {
    const data = await getTransactions();
    setListtrx(data);
  }, []);
  return (
    <>
      <Header />
      <div className="container py-4">
        <h1>Income Transactions</h1>
        <table className="table responsive table-bordered text-center">
          <thead>
            <tr style={{ backgroundColor: "#E5E5E5" }}>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Address</th>
              <th scope="col">Post Code</th>
              <th scope="col">Products Order</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listTrx?.map((item, key) => (
              <tr>
                <th key={key} scope="row">
                  {key + 1}
                </th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.postCode}</td>
                <td>
                  {item.products.map((a) => {
                    return `${a.name}, `;
                  })}
                </td>
                <td>
                  {item.status == "Waiting Approve" ? (
                    <div className="text-warning">Waiting Approve</div>
                  ) : item.status == "Approve" ? (
                    <div className="text-success">Success</div>
                  ) : (
                    item.status == "Cancel" && (
                      <div className="text-danger">Cancel</div>
                    )
                  )}
                </td>
                <td>
                  {item.status == "Waiting Approve" ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) =>
                          handleChange(e, { id: item.id, status: "Cancel" })
                        }
                        className="btn btn-danger me-3"
                        width="100"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={(e) =>
                          handleChange(e, { id: item.id, status: "Approve" })
                        }
                        className="btn btn-success me-3"
                        width="100"
                      >
                        Approve
                      </button>
                    </>
                  ) : item.status == "Approve" ? (
                    <img src={success} alt="" />
                  ) : (
                    item.status == "Cancel" && <img src={cancel} alt="" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
