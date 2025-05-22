import UserLogo from "../../../assets/blue-circle-with-white-user_78370-4707.avif";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../../api/Axios";
import { userApi } from "../../../api/Api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./Sign.css";
import LogOut from "../../../pages/auth/LogOut";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sign() {
  //Get Token
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  const [currentUser, setCurrentUser] = useState("");

  const userRole =
    currentUser.role === "1995"
      ? " ( Admin )"
      : currentUser.role === "1999"
      ? " ( P-Manager )"
      : "";

  //Get Current User
  useEffect(() => {
    if (token) {
      Axios.get(`/${userApi}`)
        .then((data) => {
          setCurrentUser(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      {token ? (
        <DropdownButton
          className="profile-logo"
          id="dropdown-basic-button"
          title={<img src={UserLogo} width={"40px"} />}
        >
          <Dropdown.Item disabled className="fw-bold text-center mb-2">
            {currentUser.name} {userRole}
          </Dropdown.Item>

          {currentUser.role === "1995" ? (
            <Dropdown.Item href="/dashboard/users" className="fs-18 py-2">
              <FontAwesomeIcon icon={faSliders} /> Dashboard
            </Dropdown.Item>
          ) : currentUser.role === "1999" ? (
            <Dropdown.Item href="/dashboard/categories" className="fs-18 py-2">
              <FontAwesomeIcon icon={faSliders} /> Dashboard
            </Dropdown.Item>
          ) : (
            ""
          )}
          <Dropdown.Item className="fs-18 py-2">
            <LogOut />
          </Dropdown.Item>
        </DropdownButton>
      ) : (
        <DropdownButton
          className="profile-logo"
          id="dropdown-basic-button"
          title={<img src={UserLogo} width={"40px"} />}
        >
          <Dropdown.Item href="/register" className="fs-18 py-2 mb-2">
            Register
          </Dropdown.Item>
          <Dropdown.Item href="/login" className="fs-18 py-2">
            Login
          </Dropdown.Item>
        </DropdownButton>
      )}
    </>
  );
}

export default Sign;
