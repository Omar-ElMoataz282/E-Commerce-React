import { useEffect, useRef, useState } from "react";
import { registerApi } from "../../api/Api";
import "./Auth.css";
import LoadingPage from "../../components/loading/LoadingPage";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { Axios } from "../../api/Axios";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [authErr, setAuthErr] = useState("");

  //Focus The First Input
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  const [loading, setLoading] = useState(false);

  const cookie = Cookie();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Axios.post(`/${registerApi}`, form);

      setLoading(false);

      const token = res.data.token;
      cookie.set("e-commerce", token);

      const role = res.data.user.role;

      const go =
        role === "1995"
          ? "/dashboard/users"
          : role === "1999"
          ? "/dashboard/categories"
          : "/";

      window.location.pathname = `${go}`;
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
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form
            className="form d-flex align-items-center align-items-lg-start"
            onSubmit={handleSubmit}
          >
            <div className="custom-form">
              <h2>Register Now</h2>

              <Form.Group className="form-custom" controlId="name">
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name..."
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  ref={focus}
                  required
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="email">
                <Form.Control
                  type="emai"
                  placeholder="Enter Your Email..."
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password..."
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>

              <div className="Sign-buttons mb-3">
                <button className="btn btn-primary">Register</button>

                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-btn">
                    <div className="google-icon-wrapper">
                      <img
                        className="google-icon"
                        src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business.png"
                        alt="sign in with google"
                      />
                    </div>
                    <p className="btn-text">
                      <b>Sign in with google</b>
                    </p>
                  </div>
                </a>
              </div>
              <Link to="/login" className="text-black fw-bold">
                Already Have Account...
              </Link>
              {authErr !== "" && <p className="err">{authErr}</p>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
