import { useEffect, useState } from "react";
import { Axios } from "../../../api/Axios";
import { productApi, productsApi } from "../../../api/Api";
import TableShow from "../../../components/table/TableShow";

function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [getData, setGetData] = useState(false);

  //Add Limit Categories To Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState("");

  //Add Loading When Data Loading
  const [loading, setLoading] = useState(false);

  const tHeader = [
    { key: "title", name: "Title" },
    { key: "images", name: "Images" },
    { key: "description", name: "Description" },
    { key: "price", name: "Price" },
    { key: "rating", name: "Rating" },
    { key: "stock", name: "Stock" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  //Delete Product By Id
  async function deleteProduct(proId) {
    try {
      await Axios.delete(`${productApi}/${proId}`);
      setDataProducts((prev) => prev.filter((item) => item.id !== proId));
    } catch (err) {
      console.log(err);
    }
  }

  //Get All Products Data
  useEffect(() => {
    try {
      setLoading(true);
      Axios.get(`/${productsApi}?limit=${limit}&page=${page}`)
        .then((data) => {
          setDataProducts(data.data.data);
          setTotal(data.data.total);
        })
        .then(() => setGetData(true))
        .finally(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
  }, [page, limit]);

  return (
    <div className="w-100 p-3 bg-white">
      <TableShow
        title="Products"
        titleBtn="Product"
        tHeader={tHeader}
        data={dataProducts}
        curUser
        delItem={deleteProduct}
        getData={getData}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
        loading={loading}
        search="title"
        searchLink={productApi}
      />
    </div>
  );
}

export default Products;
