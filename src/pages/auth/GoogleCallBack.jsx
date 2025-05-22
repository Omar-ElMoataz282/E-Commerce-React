import axios from "axios";
import { useEffect } from "react";
import { GoogleApi, masterApi } from "../../api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

function GoogleCallBack() {
  const location = useLocation();
  const cookie = new Cookie();

  //Sign With Google And Add His Token To Cookie
  useEffect(() => {
    async function googleCallback() {
      try {
        const res = await axios.get(
          `${masterApi}/${GoogleApi}${location.search}`
        );

        const token = res.data.access_token;
        cookie.set("e-commerce", token);

        window.history.replaceState({}, "", "/");

        window.location.pathname = "/";
      } catch (err) {
        console.log(err);
      }
    }
    googleCallback();
  }, []);
  return;
}

export default GoogleCallBack;
