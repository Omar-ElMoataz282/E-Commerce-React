import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutApi } from "../../api/Api";
import { Axios } from "../../api/Axios";
import Cookie from "cookie-universal";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function LogOut() {
  const cookie = Cookie();

  async function handleLogOut() {
    try {
      await Axios.get(`/${logoutApi}`);

      cookie.remove("e-commerce");

      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div onClick={handleLogOut} className="d-flex gap-2 align-items-center">
      <FontAwesomeIcon icon={faRightFromBracket} />
      <p className="m-0">Log Out</p>
    </div>
  );
}

export default LogOut;
