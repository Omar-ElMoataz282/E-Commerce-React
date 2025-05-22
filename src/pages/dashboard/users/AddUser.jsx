import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../api/Axios";
import { userApi } from "../../../api/Api";
import { Form } from "react-bootstrap";
import LoadingPage from "../../../components/loading/LoadingPage";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [authErr, setAuthErr] = useState("");
  const focus = useRef(null);

  useEffect(() => {
    focus.current.focus();
  }, []);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.post(`${userApi}/add`, form);

      setLoading(false);

      navigate("/dashboard/users");
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setAuthErr("This Email Has Already Been Taken");
      } else {
        setAuthErr("Internal Server Error");
      }
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
            name="name"
            value={form.name}
            onChange={handleChange}
            ref={focus}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email..."
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your password..."
            name="password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1999">Product Manager</option>
          </Form.Select>
        </Form.Group>

        <button
          disabled={
            form.name === "" ||
            form.email === "" ||
            form.password.length < 6 ||
            form.role === ""
          }
          style={{ padding: "9px 15px" }}
          className="btn btn-primary"
        >
          Add User
        </button>

        {authErr !== "" && (
          <p style={{ margin: "10px 0" }} className="err">
            {authErr}
          </p>
        )}
      </Form>
    </>
  );
}

export default AddUser;
