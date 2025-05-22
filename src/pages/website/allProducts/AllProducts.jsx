import { useEffect, useState } from "react";
import { Axios } from "../../../api/Axios";
import { productsApi } from "../../../api/Api";
import ProductCard from "../../../components/website/products/ProductCard";
import { Container } from "react-bootstrap";
import PaginatedItems from "../../../components/pagination/Pagination";
import SkeltonPage from "../../../components/skeltonpage/SkeltonPage";

function AllProducts() {
  const limit = 12;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");

  //Get Skelton To Loading
  const [loading, setLoading] = useState(false);

  //Get All Products Data
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    setLoading(true);
    Axios.get(`${productsApi}?limit=${limit}&page=${page}`)
      .then((res) => {
        setProductsData(res.data.data);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const showProducts = productsData.map((item, key) => (
    <ProductCard
      key={key}
      id={item.id}
      title={item.title}
      desc={item.description}
      price={item.price}
      sale={item.discount}
      img={item.images[0]?.image}
      rate={item.rating}
    />
  ));

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-stretch row-gap-2 flex-wrap">
        {loading ? (
          <SkeltonPage
            countNum={limit}
            he={400}
            clStyle="col-lg-3 col-md-6 col-sm-6 col-10 px-2"
          />
        ) : (
          showProducts
        )}
      </div>

      <div className="w-100 mt-3 mb-3 d-flex justify-content-center">
        <PaginatedItems
          setPage={setPage}
          page={page}
          itemsPerPage={limit}
          total={total}
        />
      </div>
    </Container>
  );
}

export default AllProducts;
