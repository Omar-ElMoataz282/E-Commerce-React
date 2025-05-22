import { useEffect, useState } from "react";
import { Axios } from "../../../api/Axios";
import { categoriesApi, categoryApi } from "../../../api/Api";
import TableShow from "../../../components/table/TableShow";

function Categories() {
  const [dataCategories, setDataCategories] = useState([]);
  const [getData, setGetData] = useState(false);

  //Add Limit Categories To Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState("");

  //Add Loading When Data Loading
  const [loading, setLoading] = useState(false);

  const tHeader = [
    { key: "title", name: "Title" },
    { key: "image", name: "Image" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  //Delete Category By Id
  async function deleteCategory(catId) {
    try {
      await Axios.delete(`${categoryApi}/${catId}`);
      setDataCategories((prev) => prev.filter((item) => item.id !== catId));
    } catch (err) {
      console.log(err);
    }
  }

  //Get All Categories Data
  useEffect(() => {
    try {
      setLoading(true);
      Axios.get(`/${categoriesApi}?limit=${limit}&page=${page}`)
        .then((data) => {
          setDataCategories(data.data.data);
          setTotal(data.data.total);
        })
        .then(() => setGetData(true))
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, [page, limit]);

  return (
    <div className="w-100 p-3 bg-white">
      <TableShow
        title="Categories"
        titleBtn="Category"
        tHeader={tHeader}
        data={dataCategories}
        curUser
        delItem={deleteCategory}
        getData={getData}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
        loading={loading}
        search="title"
        searchLink={categoryApi}
      />
    </div>
  );
}

export default Categories;
