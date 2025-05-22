import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../api/Axios";
import { categoryApi } from "../../../api/Api";
import LoadingPage from "../../../components/loading/LoadingPage";
import { Form } from "react-bootstrap";

function UpdateCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const form = new FormData();
  form.append("title", title);
  form.append("image", image);

  const { id } = useParams();
  // const id = window.location.pathname.split("/").slice(-1)[0];

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Get Category Info
  useEffect(() => {
    setLoading(true);
    Axios.get(`${categoryApi}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setImage(data.data.image);
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
      await Axios.post(`${categoryApi}/edit/${id}`, form);

      navigate("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <LoadingPage />}
      <Form className="bg-white w-100 m-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Category Name..."
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="fileUpload" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>

        <button
          disabled={title === "" || image === ""}
          style={{ padding: "9px 15px" }}
          className="btn btn-primary"
        >
          Update
        </button>
      </Form>
    </>
  );
}

export default UpdateCategory;
