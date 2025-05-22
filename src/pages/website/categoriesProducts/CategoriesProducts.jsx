import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../api/Axios";
import { categoryApi, productsApi } from "../../../api/Api";
import { Container } from "react-bootstrap";
import ProductCard from "../../../components/website/products/ProductCard";
import SkeltonPage from "../../../components/skeltonpage/SkeltonPage";

function CategoriesProducts() {
  const { id } = useParams();

  //Loading Skelton
  const [loading, setLoading] = useState(true);

  //Get Products Data
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    setLoading(true);
    Axios.get(`${productsApi}/${categoryApi}/${id}`)
      .then((res) => setProductsData(res.data))
      .finally(() => setLoading(false));
  }, [id]);

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
            countNum={8}
            he={400}
            clStyle="col-12 col-sm-6 col-md-6 col-lg-3 px-2"
          />
        ) : (
          showProducts
        )}
      </div>
    </Container>
  );
}

export default CategoriesProducts;
