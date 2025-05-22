import { Container } from "react-bootstrap";
import Landing from "../../../components/website/landing/Landing";
import LatSaleProduct from "../latSale/LatSaleProduct";
import SecBeforeTopRated from "../../../components/website/secBeforeTopRate/SecBeforeTopRate";
import "./HomePage.css";
import ShowTopRated from "../../../components/website/products/topRated/ShowTopRated";
import ShowLastProducts from "../../../components/website/products/lastProducts/ShowLastProducts";
import Footer from "../../../components/website/footer/Footer";

function HomePage() {
  return (
    <div>
      <Landing />
      <LatSaleProduct />
      <SecBeforeTopRated />
      <Container>
        <div className="d-flex flex-wrap mt-2">
          <ShowTopRated />
          <ShowLastProducts />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
