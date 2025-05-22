import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { userApi } from "../../api/Api";
import LoadingPage from "../../components/loading/LoadingPage";
import { Axios } from "../../api/Axios";
import Err403 from "../403/403";

function RequireAuth({ allowedRole }) {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  const [currentUser, setCurrentUser] = useState("");

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

  return token ? (
    currentUser === "" ? (
      <LoadingPage />
    ) : allowedRole.includes(currentUser.role) ? (
      <Outlet />
    ) : (
      <Err403 role={currentUser.role} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

export default RequireAuth;
