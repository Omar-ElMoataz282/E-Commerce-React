import { useEffect, useRef, useState } from "react";
import { loginApi } from "../../api/Api";
import "./Auth.css";
import LoadingPage from "../../components/loading/LoadingPage";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { Axios } from "../../api/Axios";
import { Link, useLocation } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
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

  //Get Redirect Checkout
  const location = useLocation();
  const redir = new URLSearchParams(location.search).get("redirect");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Axios.post(`/${loginApi}`, form);

      setLoading(false);

      const token = res.data.token;
      cookie.set("e-commerce", token);

      const role = res.data.user.role;

      const go =
        role === "1995"
          ? "/dashboard/users"
          : role === "1999"
          ? "/dashboard/categories"
          : redir || "/";

      window.location.pathname = `${go}`;
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setAuthErr("Wrong Email Or Password");
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
          <form
            className="form d-flex align-items-center align-items-lg-start"
            onSubmit={handleSubmit}
          >
            <div className="custom-form">
              <h2 style={{ marginBottom: "30px" }}>Login</h2>

              <Form.Group className="form-custom" controlId="email">
                <Form.Control
                  type="emai"
                  placeholder="Enter Your Email..."
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  ref={focus}
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
                <button className="btn btn-primary">Login</button>

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
                      <b>Log in with google</b>
                    </p>
                  </div>
                </a>
              </div>

              <Link to="/register" className="text-black fw-bold">
                Don't Have an Account?...
              </Link>

              {authErr !== "" && <p className="err">{authErr}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
