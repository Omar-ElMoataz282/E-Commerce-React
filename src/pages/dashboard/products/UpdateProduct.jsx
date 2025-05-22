import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../api/Axios";
import { categoriesApi, productApi } from "../../../api/Api";
import LoadingPage from "../../../components/loading/LoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import uploadImage from "../../../assets/upload.jpg";
import "./Products.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UpdateProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });
  const [categories, setCategories] = useState([]);

  //Err Price And Discount
  const [errPrice, setErrPrice] = useState(false);

  const [images, setImages] = useState([]);
  const imgIds = useRef([]);

  //Image Uploading To Disapled Button
  const [imageUpload, setImageUpload] = useState(false);

  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [imgIdsFromServer, setImgIdsFromServer] = useState([]);

  const { id } = useParams();

  //Get Product Data To Update
  useEffect(() => {
    try {
      Axios.get(`/${productApi}/${id}`).then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  //To Increase Progress Number
  const progRef = useRef([]);

  //To Add Check Icon If Download Done
  const checkRef = useRef([]);

  const navigate = useNavigate();

  //For Loading Page
  const [loading, setLoading] = useState(false);

  //Focus The First Input (Categories List)
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  //Open Images File To Upload
  const openImage = useRef(null);
  function handleOpen() {
    openImage.current.click();
  }

  //Change Values Func
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //Get All Category Data
  useEffect(() => {
    try {
      Axios.get(`/${categoriesApi}`).then((data) => {
        setCategories(data.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  //Looping Data To Do Options Category
  const showOptions = categories.map((items, index) => (
    <option key={index} value={items.id}>
      {items.title}
    </option>
  ));

  // => Real Data Will Send [as Edit , Send Images Before Send Data]
  //Send Images Before Real Data
  const j = useRef(-1);
  async function handleImages(e) {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + imagesFromServer.length + selectedFiles.length > 5) {
      alert("Only Five Images :)");
      return;
    }

    setImages((prev) => [
      ...prev,
      ...Array.from(e.target.files).map((file) => ({ file })),
    ]);

    const imagesForm = new FormData();
    const imagesFile = e.target.files;

    for (let i = 0; i < imagesFile.length; i++) {
      j.current++;
      imagesForm.append("image", imagesFile[i]);
      imagesForm.append("product_id", id);

      try {
        setImageUpload((prev) => !prev);

        const res = await Axios.post("/product-img/add", imagesForm, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;

            const percentage = Math.floor((loaded * 100) / total);

            if (percentage % 10 === 0) {
              progRef.current[j.current].style.width = `${percentage}%`;

              if (progRef.current[j.current].style.width === "100%") {
                checkRef.current[j.current].style.visibility = "visible";
              }
            }
          },
        });

        if (res.status === 201) {
          imgIds.current[j.current] = res.data.id;
        } else {
          throw new Error("Failed To Upload Image");
        }
      } catch {
        setImages((prev) =>
          prev.map((image, index) =>
            index === j.current ? { ...image, error: true } : image
          )
        );
      } finally {
        setImageUpload((prev) => !prev);
      }
    }
  }

  //Delete Image From Uploading Images
  async function handleImageDelete(img, index) {
    const imageId = imgIds.current[index];

    try {
      await Axios.delete(`product-img/${imageId}`);

      setImages((prev) => prev.filter((image) => image !== img));

      imgIds.current = imgIds.current.filter((id) => id !== imageId);

      --j.current;
    } catch (err) {
      console.log(err);
    }
  }

  //Delete Image From Server
  function handleImageFromServerDelete(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));

    setImgIdsFromServer((prev) => [...prev, id]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (+form.price > +form.discount) {
        for (let i = 0; i < imgIdsFromServer.length; i++) {
          await Axios.delete(`product-img/${imgIdsFromServer[i]}`);
        }

        await Axios.post(`${productApi}/edit/${id}`, form);

        navigate("/dashboard/products");
      } else {
        setErrPrice(true);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //Looping Images From Server To Show
  const showImagesFromServer = imagesFromServer.map((images, key) => (
    <div key={key} className="border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <img
          src={images.image}
          className="w-100"
          style={{ height: "140px", objectFit: "cover" }}
          alt=""
        />

        <div
          style={{ cursor: "pointer" }}
          className="position-absolute bg-danger  text-white del"
          onClick={() => handleImageFromServerDelete(images.id)}
        >
          X
        </div>
      </div>
    </div>
  ));

  //Looping Images Uploaded To Show
  const showImages = images.map((items, index) => {
    const isFile = items.error || false;

    return (
      <div
        key={index}
        id={index}
        className="d-flex align-items-center justify-content-start w-100 gap-2 img-con"
        style={{ backgroundColor: items.error ? "red" : "" }}
      >
        <img
          src={URL.createObjectURL(items.file)}
          width="100px"
          style={{ borderRadius: "7px" }}
          alt=""
        />

        <div className="mb-1 w-100">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <p className="mb-1">{items.file.name}</p>

              <p className="mb-1">
                {!isFile ? (
                  items.file.size / 1024 < 900 ? (
                    (items.file.size / 1024).toFixed(1) + " KB "
                  ) : (
                    (items.file.size / (1024 * 1024)).toFixed(1) + " MB "
                  )
                ) : (
                  <span className="text-white">Failed Uploading Photo</span>
                )}

                {!isFile && (
                  <FontAwesomeIcon
                    ref={(e) => (checkRef.current[index] = e)}
                    icon={faCheck}
                    style={{ visibility: "hidden" }}
                    color="green"
                  />
                )}
              </p>
            </div>
            <div>
              <Button
                variant="danger"
                onClick={() => {
                  if (!isFile) {
                    handleImageDelete(items, index);
                  } else {
                    setImages((prev) =>
                      prev.filter((images, ind) => ind !== index)
                    );
                    --j.current;
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="custom-progress">
            <span
              ref={(e) => (progRef.current[index] = e)}
              className="inner-progress"
              style={{
                backgroundColor: isFile && "red",
                border: isFile && "5px solid #ddd",
              }}
            ></span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {loading && <LoadingPage />}
      <Form className="bg-white w-100 m-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Categories:</Form.Label>
          <Form.Select
            ref={focus}
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option disabled>Select Category</option>
            {showOptions}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title..."
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="desc">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description..."
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price..."
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="disc">
          <Form.Label>Discount:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Discount..."
            name="discount"
            value={form.discount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errPrice && (
          <p className="err m-0 mb-2">Price should be higher than discount</p>
        )}

        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About:</Form.Label>
          <Form.Control
            type="text"
            placeholder="About..."
            name="About"
            value={form.About}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Stock..."
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="fileUpload" className="mb-1">
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleImages}
            ref={openImage}
            hidden
          />
        </Form.Group>

        <div
          className="d-flex align-items-center justify-content-center gap-2 mb-2 py-2 w-100 flex-column b-upload"
          onClick={handleOpen}
          style={{ borderColor: "#0086fe" }}
        >
          <img src={uploadImage} alt="Upluad Image" width="100px" />
        </div>

        <div className="d-flex align-items-start flex-wrap gap-2 mb-2">
          {showImagesFromServer}
        </div>

        <div className="d-flex align-items-start flex-wrap gap-2 mb-2">
          {showImages}
        </div>

        <button
          disabled={
            form.title === "" ||
            form.description === "" ||
            +form.price < 1 ||
            +form.discount < 0 ||
            form.discount === "" ||
            form.About === "" ||
            +form.stock < 1 ||
            imageUpload ||
            (imagesFromServer.length === 0 && images.length === 0)
          }
          style={{ padding: "9px 15px" }}
          className="btn btn-primary"
        >
          Update Product
        </button>
      </Form>
    </>
  );
}

export default UpdateProduct;
