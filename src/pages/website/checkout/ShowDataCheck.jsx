import { useContext, useEffect, useState } from "react";
import { Cart } from "../../../context/StorageDataContext";
import { Table } from "react-bootstrap";

function ShowDataCheck() {
  const { isChanged } = useContext(Cart);

  //Get Data From Local Storage
  const [dataStorage, setDataStorage] = useState([]);
  useEffect(() => {
    setDataStorage(JSON.parse(localStorage.getItem("Products")) || []);
  }, [isChanged]);

  //Get Total Final Price
  const finalPri = dataStorage.reduce((acc, item) => {
    const price = +item.price;
    const discount = +item.discount;
    const count = +item.count || 1;

    return acc + (price - discount) * count || 1;
  }, 0);

  //Get Total Discount Price
  const finalDis = dataStorage.reduce(
    (acc, cur) => acc + Number(cur.discount) * cur.count,
    0
  );

  //Show Data After Looping
  const showData = dataStorage.map((item, ind) => (
    <tr key={ind} style={{ verticalAlign: "middle" }}>
      <td>
        <img className="table-img" src={item.images[0]?.image} />
      </td>
      <td>{item.title}</td>
      <td>{item.count || 1}</td>
      <td>{item.price}</td>
      <td>{item.discount}</td>
      <td>{+item.price - +item.discount}</td>
      <td>{Number((item.price - item.discount) * item.count || 1)}</td>
    </tr>
  ));

  return (
    <div className="w-100 mb-4 bg-white table-container">
      <Table className="text-center table-data" striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Count</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Final Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>{showData}</tbody>

        <tfoot>
          <tr>
            <th colSpan={3}>Total Price</th>
            <td colSpan={4}>{finalPri}</td>
          </tr>

          <tr>
            <th colSpan={3}>Total Discount</th>
            <td colSpan={4}>{finalDis}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default ShowDataCheck;
