import { useContext, useEffect, useState } from "react";
import { Cart } from "../../../context/StorageDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import PlusMinusBtn from "../../PlusMinusBtn/PlusMinusBtn";
import ChechBtn from "../checkBtn/CheckBtn";

function ModalCart(props) {
  const handleClose = () => props.setHandleOpen(false);

  //Reload Data By Context State
  const isChanged = useContext(Cart);

  //Product Counts
  const [count, setCount] = useState("");

  //Get Data From Local Storage
  const [dataStorage, setDataStorage] = useState([]);
  useEffect(() => {
    setDataStorage(JSON.parse(localStorage.getItem("Products")) || []);
  }, [isChanged.isChanged]);

  //Change Product Count
  function changeCount(id, newCount) {
    const getData = JSON.parse(localStorage.getItem("Products"));

    const filteredData = getData.find((prod) => prod.id === id);

    filteredData.count = newCount;

    localStorage.setItem("Products", JSON.stringify(getData));

    isChanged.setIsChanged((prev) => !prev);
  }

  //Delete Product In Cart
  function handleDelete(id) {
    const filteredData = dataStorage.filter((items) => items.id !== id);

    localStorage.setItem("Products", JSON.stringify(filteredData));

    setDataStorage(filteredData);

    isChanged.setIsChanged((prev) => !prev);
  }

  //Mapping To Show Cart Data
  const showCartData = dataStorage?.map((product, key) => (
    <div className="pb-3 mb-3 border-bottom position-relative" key={key}>
      <div
        className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white point"
        style={{ width: "25px", height: "25px" }}
        onClick={() => handleDelete(product.id)}
      >
        <FontAwesomeIcon icon={faXmark} width={"10px"} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <img
          src={product.images[0].image}
          height={"80px"}
          style={{ objectFit: "contain" }}
          className="rounded col-sm-3 col-12"
          alt="product-img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="mb-2 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">
              {+product.price - +product.discount}Egp
            </h5>
            {+product.discount > 0 && (
              <h6 className="m-0 del-price">{product.price}Egp</h6>
            )}
          </div>
        </div>

        <div className="">
          <PlusMinusBtn
            id={product.id}
            count={product.count || 1}
            setCount={setCount}
            changeCount={changeCount}
          />
        </div>
      </div>
    </div>
  ));

  return (
    <Modal show={props.handleOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {dataStorage.length > 0 ? (
          showCartData
        ) : (
          <p className="d-flex justify-content-center align-items-center m-0">
            No Items In Cart
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <ChechBtn setHandleOpen={props.setHandleOpen} />
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCart;
