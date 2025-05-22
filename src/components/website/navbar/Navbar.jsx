import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Blue Modern Illustrative Online E-Commerce Shop Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../api/Axios";
import { categoriesApi } from "../../../api/Api";
import SliceText from "../../../helpers/SliceText";
import SkeltonPage from "../../skeltonpage/SkeltonPage";
import { windowSize } from "../../../context/WindowContext";
import SideBar from "./sidebar/SideBar";
import { Menu } from "../../../context/MenuContext";
import ModalCart from "./ModalCart";
import Sign from "../sign/Sign";
import SearchBar from "../search/SearchBar";

function NavBar() {
  //Opening Bars
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;

  //Media Query
  const windowWidth = useContext(windowSize);
  const mediaQuery = windowWidth.windowWidth;

  //Modal-Cart Component To handle Open And Close
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);

  //Skelton Component Loading Before Fetch Data
  const [loading, setLoading] = useState(true);
  const clStyle = `col-1`;

  //Get All Categories Data
  const [categories, setCategoris] = useState([]);
  useEffect(() => {
    Axios.get(`${categoriesApi}`)
      .then((res) => setCategoris(res.data.slice(-8)))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Mapping To Show Categories Data
  const showCategories = categories.map((item, key) => (
    <Link
      to={`/category/${item.id}`}
      key={key}
      className="m-0 category-title text-black text-md-center
      "
    >
      {SliceText(item.title, 20)}
    </Link>
  ));

  return (
    <>
      <ModalCart handleOpen={show} setHandleOpen={setShow} />

      <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <Link className="col-3" to="/">
              <img width="200px" src={Logo} alt="Logo-Page" />
            </Link>

            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 position-relative">
              <SearchBar />
            </div>

            <div className="col-1 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
              <div className="btn p-0 mt-1 border-0" onClick={handleOpen}>
                <FontAwesomeIcon
                  style={{ fontSize: "20px" }}
                  icon={faCartShopping}
                />
              </div>

              <Sign />

              {mediaQuery < "768" && (
                <FontAwesomeIcon
                  icon={faBars}
                  className="point"
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    menu.setIsOpen((prev) => !prev);
                  }}
                />
              )}
            </div>
          </div>

          {mediaQuery > "767" ? (
            <div className="mt-3">
              <div className="d-flex align-items-center justify-content-center gap-4">
                {loading ? (
                  <SkeltonPage countNum={9} clStyle={clStyle} />
                ) : (
                  showCategories
                )}
                {!loading && (
                  <Link
                    className="text-black category-title text-md-center"
                    to="/categories"
                  >
                    Show All
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <SideBar showCat={showCategories} isOpen={isOpen} />
          )}
        </Container>
      </nav>
    </>
  );
}

export default NavBar;
