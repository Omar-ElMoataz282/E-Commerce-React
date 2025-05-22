import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SliceText from "../../../../helpers/SliceText";
import Stars from "../../../stars/Stars";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function LastProducts(props) {
  const finalRate = Math.round(props.rate);
  return (
    <NavLink
      to={`/product/${props.id}`}
      className="col-lg-6 col-md-12 col-sm-6 col-10 text-black"
    >
      <div className="m-1 border rounded p-3 h-100 d-flex flex-column justify-content-between pro-card-center">
        <div>
          <p className="fw-bold">{SliceText(props.title, 25)}</p>
          <p className="m-0 mb-lg-2 text-black-50">
            {SliceText(props.desc, 40)}
          </p>
          <div className="px-2 py-2 position-relative">
            {props.sale > 0 && (
              <p className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center sale-style">
                Sale
              </p>
            )}
            <img src={props.img} alt="" className="img-fluid img-pro" />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-2">
          <div>
            <div className="mb-2">
              <Stars ratingNum={finalRate} />
            </div>
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.price - props.sale}</h5>
              <h6 className="m-0 del-price">
                {+props.sale > 0 && props.price}
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded point" title="Add to Cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default LastProducts;
