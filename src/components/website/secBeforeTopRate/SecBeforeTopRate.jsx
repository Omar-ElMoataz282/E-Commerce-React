import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShampoLogo from "../../../assets/shampoo_PNG99887.png";

function SecBeforeTopRated() {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap sec-page">
      <Container>
        <div className="d-flex justify-content-between align-items-center flex-wrap overflow-hidden">
          <div className="col-lg-5 col-md-6 col-12 text-md-start text-center sec-content">
            <h4 className="display-2 fw-bold">Shampoo SunSilk</h4>
            <h5 style={{ color: "grey" }} className="fw-normal">
              Hair Care is a crown every woman wears; taking care of it is a way
              of celebrating her beauty
            </h5>

            <Link
              to="/all-products"
              className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light rounded-3"
            >
              Shopping Now
            </Link>
          </div>

          <img src={ShampoLogo} className="sec-img" alt="Shampoo" />
        </div>
      </Container>
    </div>
  );
}

export default SecBeforeTopRated;
