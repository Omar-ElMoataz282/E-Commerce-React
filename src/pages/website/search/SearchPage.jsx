import { useContext, useEffect, useState } from "react";
import ProductCard from "../../../components/website/products/ProductCard";
import { Container } from "react-bootstrap";
import { ReData } from "../../../context/SearchDateContext";

function SearchPage() {
  //Rerender Data State To Reload Data
  const { data } = useContext(ReData);

  //Get Data From Session Storage
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    setGetData(JSON.parse(sessionStorage.getItem("Search-Result")));
  }, [data]);

  //Mapping Data To Show
  const showSearchProducts = getData.map((item, key) => (
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
        {showSearchProducts}
      </div>
    </Container>
  );
}

export default SearchPage;
