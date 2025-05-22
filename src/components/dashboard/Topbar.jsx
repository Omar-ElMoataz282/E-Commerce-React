import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../context/MenuContext";
import { Axios } from "../../api/Axios";
import { userApi } from "../../api/Api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import LogOut from "../../pages/auth/LogOut";

function Topbar() {
  const [currentUser, setCurrentUser] = useState("");

  const menu = useContext(Menu);
  const isOpen = menu.setIsOpen;

  //Get Current User
  useEffect(() => {
    Axios.get(`${`${userApi}`}`).then((data) => {
      setCurrentUser(data.data.name);
    });
  }, []);

  return (
    <div className="top-bar">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-2">
          <h4 className="m-0" style={{ cursor: "default" }}>
            E-Commerce
          </h4>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            className="bar-icon"
            icon={faBars}
            onClick={() => {
              isOpen((prev) => !prev);
            }}
          />
        </div>

        <div>
          <DropdownButton
            id="dropdown-basic-button"
            className="special-style-drop"
            title={currentUser === "" ? "Loading..." : currentUser}
          >
            <Dropdown.Item className="fs-18 py-2" href="/">
              <FontAwesomeIcon icon={faHome} /> Web Site
            </Dropdown.Item>
            <Dropdown.Item className="fs-18 py-2">
              <LogOut />
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
