import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap handle-page">
      <Container>
        <div className="col-lg-6 col-md-8 col-12 text-md-start text-center">
          <h1 className="display-2 fw-bold">Shop Smart, Live Better</h1>
          <h5 style={{ color: "grey" }} className="fw-normal">
            Discover Quality Products at Great Prices - You Can Shopping for
            EveryThing You Need
          </h5>

          <Link
            to="/all-products"
            className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light rounded-3"
          >
            Shopping Now
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Landing;
