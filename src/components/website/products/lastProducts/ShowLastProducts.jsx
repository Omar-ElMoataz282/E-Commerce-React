import { useEffect, useState } from "react";
import { Axios } from "../../../../api/Axios";
import { lastProducts } from "../../../../api/Api";
import LastProducts from "./LastProducts";
import SkeltonPage from "../../../skeltonpage/SkeltonPage";

function ShowLastProducts() {
  //Skelton Component Loading Before Fetch Data
  const [loading, setLoading] = useState(true);
  const clStyle = "col-lg-6 col-md-12 col-sm-6 col-12 px-1";

  //Top Rated Products
  const [lastItems, setLastItems] = useState([]);
  useEffect(() => {
    Axios.get(`${lastProducts}`)
      .then((res) => setLastItems(res.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showLastItems = lastItems.map((item, key) => (
    <LastProducts
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
    <div className="col-md-6 col-12">
      <h1 className="text-container text-center m-0 p-3">Last Products</h1>
      <div className="d-flex justify-content-center flex-wrap row-gap-2">
        {loading ? (
          <SkeltonPage countNum={4} clStyle={clStyle} he={200} />
        ) : (
          showLastItems
        )}
      </div>
    </div>
  );
}

export default ShowLastProducts;
