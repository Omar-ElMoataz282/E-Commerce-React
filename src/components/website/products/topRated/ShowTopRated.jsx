import { useEffect, useState } from "react";
import { Axios } from "../../../../api/Axios";
import { topRated } from "../../../../api/Api";
import TopRated from "./TopRated";
import SkeltonPage from "../../../skeltonpage/SkeltonPage";

function ShowTopRated() {
  //Skelton Component Loading Before Fetch Data
  const [loading, setLoading] = useState(true);

  //Top Rated Products
  const [topItems, setTopItems] = useState([]);
  useEffect(() => {
    Axios.get(`${topRated}`)
      .then((res) => setTopItems(res.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showTopItems = topItems.map((item, key) => (
    <TopRated
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
    <div className="col-md-6 col-12" style={{ border: "2px solid #0d6efd" }}>
      <h1 className="text-container m-0 p-3 bg-primary text-white text-center">
        Top Rated
      </h1>
      <div className="px-2">
        {loading ? <SkeltonPage countNum={2} he={200} /> : showTopItems}
      </div>
    </div>
  );
}

export default ShowTopRated;
