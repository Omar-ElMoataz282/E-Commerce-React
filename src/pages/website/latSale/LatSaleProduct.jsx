import { useEffect, useState } from "react";
import { Axios } from "../../../api/Axios";
import { latestSale } from "../../../api/Api";
import { Container } from "react-bootstrap";
import ProductCard from "../../../components/website/products/ProductCard";
import SkeltonPage from "../../../components/skeltonpage/SkeltonPage";

function LatSaleProduct() {
  //Skelton Component Loading Before Fetch Data
  const [loading, setLoading] = useState(true);
  const clStyle = "col-lg-3 col-md-6 col-sm-6 col-10 px-2 mb-2";

  //Latest Sale Products
  const [latestSaleProduct, setLatestSaleProduct] = useState([]);
  useEffect(() => {
    Axios.get(`${latestSale}`)
      .then((res) => setLatestSaleProduct(res.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Mapping Data To Show
  const showLatSale = latestSaleProduct.map((item, key) => (
    <ProductCard
      key={key}
      id={item.id}
      title={item.title}
      desc={item.description}
      price={item.price}
      sale={item.discount}
      img={item.images[0].image}
      rate={item.rating}
    />
  ));

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Latest Sale Products:</h1>
      <div className="d-flex justify-content-center align-items-stretch row-gap-2 flex-wrap">
        {loading ? (
          <SkeltonPage countNum={4} clStyle={clStyle} he={400} />
        ) : (
          showLatSale
        )}
      </div>
    </Container>
  );
}

export default LatSaleProduct;
