import { useEffect, useState } from "react";
import { userApi, usersApi } from "../../../api/Api";
import { Axios } from "../../../api/Axios";
import TableShow from "../../../components/table/TableShow";

function Users() {
  const [dataUsers, setDataUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [getData, setGetData] = useState(false);

  //Add Limit Categories To Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState("");

  //Add Loading When Data Loading
  const [loading, setLoading] = useState(false);

  const tHeader = [
    { key: "name", name: "Name" },
    { key: "email", name: "Email" },
    { key: "role", name: "Role" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  //Get Current User
  useEffect(() => {
    Axios.get(`${`${userApi}`}`)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .then(() => setGetData(true));
  }, []);

  //Delete User By Id
  async function deleteUser(userId) {
    try {
      if (currentUser.id !== userId) {
        await Axios.delete(`${userApi}/${userId}`);
        setDataUsers((prev) => prev.filter((item) => item.id !== userId));
      }
    } catch (err) {
      console.log(err);
    }
  }

  //Get All Users Data
  useEffect(() => {
    try {
      setLoading(true);
      Axios.get(`/${usersApi}?limit=${limit}&page=${page}`)
        .then((data) => {
          setDataUsers(data.data.data);
          setTotal(data.data.total);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
  }, [page, limit]);

  return (
    <div className="w-100 p-3 bg-white">
      <TableShow
        title="Users"
        titleBtn="User"
        tHeader={tHeader}
        data={dataUsers}
        curUser={currentUser}
        delItem={deleteUser}
        getData={getData}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
        loading={loading}
        search="name"
        searchLink={userApi}
      />
    </div>
  );
}

export default Users;
