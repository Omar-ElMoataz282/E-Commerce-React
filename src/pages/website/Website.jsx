import { Outlet } from "react-router-dom";
import NavBar from "../../components/website/navbar/Navbar";

function Website() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Website;
