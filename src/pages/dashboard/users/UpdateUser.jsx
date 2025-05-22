import { Form } from "react-bootstrap";
import "../../auth/Auth.css";
import { useEffect, useState } from "react";
import { Axios } from "../../../api/Axios";
import { userApi } from "../../../api/Api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../components/loading/LoadingPage";

function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();
  // const id = window.location.pathname.split("/").slice(-1)[0];

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Get User Info
  useEffect(() => {
    setLoading(true);
    Axios.get(`${userApi}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false);
      })
      .catch(() => {
        navigate("/dashboard/users/page/404", { replace: true });
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.post(`${userApi}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });

      navigate("/dashboard/users");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <LoadingPage />}
      <Form className="bg-white w-100 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1999">Product Manager</option>
          </Form.Select>
        </Form.Group>

        <button
          disabled={name === "" || email === "" || role === ""}
          style={{ padding: "9px 15px" }}
          className="btn btn-primary"
        >
          Update
        </button>
      </Form>
    </>
  );
}

export default UpdateUser;
