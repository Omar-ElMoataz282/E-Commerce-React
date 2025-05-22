import { useContext, useState } from "react";
import { Axios } from "../../../api/Axios";
import { Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReData } from "../../../context/SearchDateContext";

function SearchBar() {
  //Search Input Text
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  //Alert If No Data Found
  const [show, setShow] = useState(false);

  //Rerender Data State To Reload Data
  const reloadData = useContext(ReData);

  //Test Search
  async function searchData() {
    try {
      if (search.length >= 1) {
        const res = await Axios.post(`/public-search?title=${search}`);

        if (res.data.length >= 1) {
          sessionStorage.setItem("Search-Result", JSON.stringify(res.data));

          navigate("search-result");

          reloadData.setData((prev) => !prev);
        } else {
          setShow(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {show && (
        <Alert variant="danger" className="position-absolute w-100 z-3">
          No Data Found
          <span
            onClick={() => setShow((prev) => !prev)}
            style={{ width: "25px", height: "25px", borderRadius: "50%" }}
            className="point position-absolute end-0 top-0 bg-white d-flex justify-content-center align-items-center"
          >
            x
          </span>
        </Alert>
      )}

      <Form.Control
        type="search"
        className="form-control custom-search py-3 rounded-4 input-pr"
        placeholder="Search Product"
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={searchData}
        className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-4 d-flex align-items-center justify-content-center"
      >
        Search
      </button>
    </>
  );
}

export default SearchBar;
