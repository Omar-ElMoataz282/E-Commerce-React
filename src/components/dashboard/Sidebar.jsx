import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../context/MenuContext";
import { windowSize } from "../../context/WindowContext";
import { links } from "./NavLinks";
import { Axios } from "../../api/Axios";
import { userApi } from "../../api/Api";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [currentUser, setCurrentUser] = useState("");

  const menu = useContext(Menu);
  const isOpen = menu.isOpen;

  const windowScreen = useContext(windowSize);
  const windowMedia = windowScreen.windowWidth;

  const navigate = useNavigate();

  //Get Current User
  useEffect(() => {
    Axios.get(`/${userApi}`)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="glass-page"
        style={{
          display: windowMedia <= "768" && isOpen ? "block" : "none",
        }}
        onClick={() => {
          menu.setIsOpen(false);
        }}
      ></div>

      <div
        className="side-bar"
        style={{
          left: windowMedia <= "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: windowMedia <= "768" ? "fixed" : "",
        }}
      >
        {windowMedia <= "768" && isOpen && (
          <FontAwesomeIcon
            icon={faClose}
            className="close"
            onClick={() => {
              menu.setIsOpen(false);
            }}
          />
        )}
        {isOpen && <h4 className="mb-3">Dashboard</h4>}
        {links.map(
          (link, key) =>
            link.role.includes(currentUser.role) && (
              <NavLink
                key={key}
                to={link.pathLink}
                className="d-flex align-items-center gap-2 side-bar-link"
                onClick={() => {
                  windowMedia <= "768" && menu.setIsOpen(false);
                }}
                title={link.text}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  style={{ padding: isOpen ? "12px 2px 10px 15px" : "12px" }}
                />
                <p
                  className="m-0"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  {link.text}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}

export default Sidebar;
