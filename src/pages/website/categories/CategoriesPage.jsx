import { useEffect, useState } from "react";
import { Axios } from "../../../api/Axios";
import { categoriesApi } from "../../../api/Api";
import { Container } from "react-bootstrap";
import "./CategoriesPage.css";
import { Link } from "react-router-dom";
import SkeltonPage from "../../../components/skeltonpage/SkeltonPage";

function CategoriesPage() {
  //Skelton Component Loading Before Fetch Data
  const [loading, setLoading] = useState(true);

  //Get All Categories Data
  const [categories, setCategoris] = useState([]);
  useEffect(() => {
    Axios.get(`${categoriesApi}`)
      .then((res) => setCategoris(res.data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showCategories = categories.map((item, key) => (
    <div key={key} className="category-item col-12 col-sm-6 col-md-4">
      <Link to={`/category/${item.id}`}>
        <div className="category-item-inner">
          <img src={item.image} alt="Cat-Img" />
          <div className="overlay">
            <h4>{item.title}</h4>
          </div>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="bg-secondary py-5">
      <Container>
        <div className="d-flex flex-wrap">
          {loading ? (
            <SkeltonPage countNum={12} clStyle="category-item" he={400} />
          ) : (
            showCategories
          )}
        </div>
      </Container>
    </div>
  );
}

export default CategoriesPage;
