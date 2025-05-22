import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import SliceText from "../../../../helpers/SliceText";
import Stars from "../../../stars/Stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function TopRated(props) {
  const finalRate = Math.round(props.rate);

  return (
    <NavLink to={`/product/${props.id}`}>
      <div className="m-1 border-bottom py-3 h-100 d-flex gap-4 topR-item flex-md-column align-items-md-center flex-lg-row text-black handle-topRated">
        <img
          src={props.img}
          alt=""
          className="img-fluid rounded"
          height={100}
          width={180}
        />
        <div className="w-100">
          <p className="fw-bold">{SliceText(props.title, 25)}</p>
          <p className="text-black-50">{SliceText(props.desc, 40)}</p>

          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 border-top pt-3">
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
      </div>
    </NavLink>
  );
}

export default TopRated;
