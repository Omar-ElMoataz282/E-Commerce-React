import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard d-flex align-items-start">
      <Sidebar />
      <div className="w-100 px-2 main-content overflow-hidden">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
