import { Link } from "react-router-dom";
import "./SideBar.css";
import { useContext } from "react";
import { Menu } from "../../../../context/MenuContext";

function SideBar(props) {
  const menu = useContext(Menu);

  return (
    <>
      <div
        className="glass-page"
        style={{
          display: props.isOpen ? "block" : "none",
        }}
        onClick={() => {
          menu.setIsOpen(false);
        }}
      ></div>

      <div className={`cat-sidebar ${props.isOpen ? "left0" : "left-hide"}`}>
        <div className="d-flex flex-column">
          <p
            className="exit-catPage"
            onClick={() => {
              menu.setIsOpen((prev) => !prev);
            }}
          >
            X
          </p>
          {props.showCat}
          <Link className="text-black category-title" to="/categories">
            Show All
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideBar;
