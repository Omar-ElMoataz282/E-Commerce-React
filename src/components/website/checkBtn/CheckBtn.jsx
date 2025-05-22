import { Button } from "react-bootstrap";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

function ChechBtn(props) {
  const token = Cookie().get("e-commerce");

  const navigate = useNavigate();

  function handleCheck() {
    //To Close Cart
    props.setHandleOpen(false);

    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=/checkout");
    }
  }

  return (
    <Button variant="primary" onClick={handleCheck}>
      Checkout
    </Button>
  );
}

export default ChechBtn;
