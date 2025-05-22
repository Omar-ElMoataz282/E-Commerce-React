import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TableShow.css";
import PaginatedItems from "../pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import TransformData from "../../helpers/TransformData";

function TableShow(props) {
  const curUser = props.curUser.email || false;

  //Rerender After Del In Search State
  const [reSearch, setReSearch] = useState(false);

  //Search By Back End
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  //Search Date -[Only]-
  const [date, setDate] = useState("");

  const filteredByDate =
    date.length != 0
      ? props.data.filter((item) => TransformData(item.created_at) === date)
      : props.data;

  //Filtered Search Results By Date
  const filterSearchByDate =
    date.length !== 0
      ? filteredData.filter((item) => TransformData(item.created_at) === date)
      : filteredData;

  //Pagination To Slice Data If Search
  const start = (props.page - 1) * props.limit;
  const end = Number(start) + Number(props.limit);

  //Showing Data by Filtered Or Not
  const showingData =
    search.length > 0 ? filterSearchByDate.slice(start, end) : filteredByDate;

  //Pages Count Before And After Search
  const totalItems =
    search.length > 0 ? filterSearchByDate.length : props.total;

  //Const For Loading
  const [searchLoading, setSearchLoading] = useState(false);

  //Const For PlaceHolder Search
  const placeHldSear =
    props.search.slice(0, 1).toUpperCase() + props.search.slice(1);

  //Search Input -[Only]-
  async function getSearchInformation() {
    try {
      setSearchLoading(true);
      await Axios.post(`${props.searchLink}/search?title=${search}`).then(
        (data) => {
          setFilteredData(data.data);
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      search.length > 0 ? getSearchInformation() : setSearchLoading(false);
    }, 800);
    return () => clearTimeout(searchTimer);
  }, [search, reSearch]);

  //Header Titles
  const tHeaderShow = props.tHeader.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));

  //Show Data In Table
  const showData = showingData.map((item) => (
    <tr key={item.id} style={{ verticalAlign: "middle" }}>
      <td>{item.id}</td>

      {props.tHeader.map((dKeys, key) => (
        <td key={key}>
          {item[dKeys.key] === "1995" ? (
            "Admin"
          ) : item[dKeys.key] === "2001" ? (
            "User"
          ) : item[dKeys.key] === "1999" ? (
            "Product Manager"
          ) : dKeys.key === "created_at" || dKeys.key === "updated_at" ? (
            TransformData(item[dKeys.key])
          ) : dKeys.key === "image" ? (
            <div
              className="table-img"
              style={{
                backgroundImage: `url(${item[dKeys.key]})`,
                margin: "auto",
              }}
            ></div>
          ) : dKeys.key === "images" ? (
            <div className="d-flex ">
              {item[dKeys.key].map((item, ind) => (
                <div
                  key={ind}
                  style={{ backgroundImage: `url(${item.image})` }}
                  className="table-img table-imgs"
                ></div>
              ))}
            </div>
          ) : (
            item[dKeys.key]
          )}
          {curUser && item[dKeys.key] === curUser && " (You)"}
        </td>
      ))}

      <td>
        <div
          className="d-flex align-items-start justify-content-center gap-3"
          style={{ marginTop: "1px" }}
        >
          <Link to={`${item.id}`}>
            <FontAwesomeIcon className="point edit" icon={faPenToSquare} />
          </Link>

          {item.email !== curUser && (
            <FontAwesomeIcon
              className="point"
              fontSize={20}
              color="red"
              icon={faTrash}
              onClick={() => {
                props.delItem(item.id);
                setReSearch((prev) => !prev);
              }}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap t-header">
        <h3 className="m-0">{props.title} Page</h3>

        <div className="col-3">
          <Form.Control
            type="text"
            id="searchInput"
            aria-describedby="searchBarInput"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading(true);
              props.setPage(1);
            }}
            placeholder={`Search By ${placeHldSear}`}
          />
        </div>

        <div className="col-2">
          <Form.Control
            type="date"
            id="searchDateInput"
            aria-describedby="searchBarDateInput"
            onChange={(e) => {
              setDate(e.target.value);
              props.setPage(1);
            }}
          />
        </div>

        <Link className="" to={`/dashboard/${props.titleBtn}/add`}>
          <button className="btn btn-primary">Add {props.titleBtn}</button>
        </Link>
      </div>

      <div className="table-container mb-1">
        <Table className="text-center table-data" striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              {tHeaderShow}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {props.total === 0 ? (
              <tr>
                <td colSpan={12}>No Data Found</td>
              </tr>
            ) : props.loading ? (
              <tr>
                <td colSpan={12}>Loading...</td>
              </tr>
            ) : searchLoading ? (
              <tr>
                <td colSpan={12}>Searching...</td>
              </tr>
            ) : showingData.length === 0 ? (
              <tr>
                <td colSpan={12}>
                  Can't find {search || `Any Data`} {date && `for ${date}`}
                </td>
              </tr>
            ) : (
              showData
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-wrap p-1 gap-2">
        <div>
          {totalItems != 0 && (
            <Form.Select
              aria-label="select Num"
              onChange={(e) => {
                props.setLimit(e.target.value);
                props.setPage(1);
              }}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Form.Select>
          )}
        </div>
        <PaginatedItems
          setPage={props.setPage}
          page={props.page}
          itemsPerPage={props.limit}
          dataNums={props.data.length}
          total={totalItems}
        />
      </div>
    </>
  );
}

export default TableShow;
