import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import facebook from "../../../assets/facebook.png";
import insta from "../../../assets/insta.png";
import x from "../../../assets/x.png";

function Footer() {
  return (
    <div className="footer bg-dark text-white py-4 mt-2">
      <Container>
        <div className="d-flex flex-wrap row-gap-5">
          <div className="col-12 col-sm-6 col-md-4 text-center text-sm-start">
            <h4 className="mb-4" style={{ color: "gray" }}>
              Company
            </h4>

            <div className="d-flex flex-column gap-4">
              <Link className="text-white" to="#">
                About
              </Link>

              <Link className="text-white" to="#">
                Our Services
              </Link>

              <Link className="text-white" to="#">
                Privacy Police
              </Link>

              <Link className="text-white" to="#">
                Affitiate Program
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 text-center text-sm-start">
            <h4 className="mb-4" style={{ color: "gray" }}>
              GET Help
            </h4>

            <div className="d-flex flex-column gap-4">
              <Link className="text-white" to="#">
                FAQ
              </Link>

              <Link className="text-white" to="#">
                Shipping
              </Link>

              <Link className="text-white" to="#">
                Returns
              </Link>

              <Link className="text-white" to="#">
                Order Status
              </Link>

              <Link className="text-white" to="#">
                Payment Options
              </Link>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-4 text-center text-sm-start">
            <h4 className="mb-4" style={{ color: "gray" }}>
              Follow Us
            </h4>

            <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-3">
              <Link to="#">
                <img
                  src={facebook}
                  width={"50px"}
                  height={"50px"}
                  alt="facebook"
                />
              </Link>

              <Link to="#">
                <img
                  src={insta}
                  width={"45px"}
                  height={"45px"}
                  alt="facebook"
                  className=" rounded-circle"
                />
              </Link>

              <Link to="#">
                <img
                  src={x}
                  width={"38"}
                  alt="x"
                  className="bg-white rounded-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
