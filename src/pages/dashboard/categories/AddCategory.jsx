import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../api/Axios";
import { categoryApi } from "../../../api/Api";
import LoadingPage from "../../../components/loading/LoadingPage";
import { Form } from "react-bootstrap";

function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const focus = useRef(null);

  useEffect(() => {
    focus.current.focus();
  }, []);

  const form = new FormData();
  form.append("title", title);
  form.append("image", image);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.post(`${categoryApi}/add`, form);

      setLoading(false);

      navigate("/dashboard/categories");
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
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Category Name..."
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={focus}
            required
          />
        </Form.Group>

        <Form.Group controlId="fileUpload" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
            required
          />
        </Form.Group>

        <button
          disabled={title === "" || image === ""}
          style={{ padding: "9px 15px" }}
          className="btn btn-primary"
        >
          Add Category
        </button>
      </Form>
    </>
  );
}

export default AddCategory;
