import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function PlusMinusBtn(props) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    props.setCount(count);

    if (props.changeCount) {
      props.changeCount(props.id, count);
    }
  }, [count]);

  useEffect(() => {
    if (props.count) {
      setCount(props.count);
    }
  }, [props.count]);

  return (
    <div className="input-group d-flex align-items-center gap-2">
      <span className="input-group-btn p-0">
        <button
          type="button"
          className="btn btn-danger btn-number"
          datatype="minus"
          data-field="quant[2]"
          style={{ padding: "0.375rem 0.75rem" }}
          onClick={() => {
            if (count > 1) {
              setCount((prev) => --prev);
            } else {
              setCount(1);
            }
          }}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </span>

      <div>
        <input
          type="number"
          name="quant[2]"
          className="form-control input-number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => {
            if (+e.target.value > 1) {
              setCount(Number(e.target.value));
            } else {
              setCount(1);
            }
          }}
        />
      </div>

      <span className="input-group-btn">
        <button
          type="button"
          className="btn btn-success btn-number"
          datatype="plus"
          data-field="quant[2]"
          style={{ padding: "0.375rem 0.75rem" }}
          onClick={() => setCount((prev) => ++prev)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
}

export default PlusMinusBtn;
