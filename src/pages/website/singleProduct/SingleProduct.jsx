import { useContext, useEffect, useRef, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../api/Axios";
import { cartApi, productApi } from "../../../api/Api";
import Stars from "../../../components/stars/Stars";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeltonPage from "../../../components/skeltonpage/SkeltonPage";
import { Cart } from "../../../context/StorageDataContext";
import PlusMinusBtn from "../../../components/PlusMinusBtn/PlusMinusBtn";
import { toast, ToastContainer } from "react-toastify";

function SinglePage() {
  const { id } = useParams();

  //Skelton Component Loading Before Fetch Data
  const [loading, setLoading] = useState(true);

  //Get All [ Images + Another-Data ] From Product
  const [productImages, setProductImages] = useState([]);
  const [productData, setProductData] = useState([]);

  //Product Errors
  const [err, setErr] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);

  //Changing State To Rerender Data Show On Cart
  const isChanged = useContext(Cart);

  //Counter Prouducts
  const [count, setCount] = useState(1);

  //Products Count After Silling
  const finalCount = useRef("");

  //If Product Add
  const notify = () => toast(`Product Added To Cart`);

  //Get Product Data To View
  useEffect(() => {
    Axios.get(`${productApi}/${id}`)
      .then((res) => {
        setProductImages(res.data[0].images);
        setProductData(res.data[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Looping Product Images To Show
  const showImages = productImages.map((img) => {
    return { original: img.image, thumbnail: img.image };
  });

  //Check Product Counts Before Add To Cart
  async function handleSubmit() {
    try {
      setLoadingCart(true);

      const getData = JSON.parse(localStorage.getItem("Products")) || [];

      const productCount = getData.filter((product) => product.id == id)?.[0]
        ?.count;

      const res = await Axios.post(`${cartApi}/check`, {
        product_id: productData.id,
        count: count + (productCount ? productCount : 0),
      });

      finalCount.current = count + (productCount ? productCount : 0);

      if (res.status === 200) {
        notify();
      }

      return true;
    } catch (err) {
      if (err.response.status === 400) {
        setErr(
          `There is only ${+productData.stock - +finalCount.current} Items`
        );
      }
      return false;
    } finally {
      setLoadingCart(false);
    }
  }

  //Add To Local Storage
  async function handleAdd() {
    const check = await handleSubmit();

    if (check) {
      const getData = JSON.parse(localStorage.getItem("Products")) || [];

      const filteredData = getData.findIndex(
        (items) => items.id === productData.id
      );

      if (filteredData !== -1) {
        if (getData[filteredData].count) {
          getData[filteredData].count += count;
        } else {
          getData[filteredData].count = count;
          if (getData[filteredData].count < 2) {
            getData[filteredData].count += count;
          }
        }
      } else {
        if (count > 1) {
          productData.count = count;
        }
        getData.push(productData);
      }

      localStorage.setItem("Products", JSON.stringify(getData));

      isChanged.setIsChanged((prev) => !prev);
    }
  }

  const finalRate = Math.round(productData.rating);
  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-lg-row flex-md-column row-gap-3 align-items-center justify-content-between flex-wrap px-sm-5 px-4 mt-4">
        {loading ? (
          <div className="col-lg-5 col-md-6 col-8 m-auto">
            <SkeltonPage countNum={1} he={300} />

            <div className="d-flex mt-1 justify-content-between">
              <SkeltonPage countNum={1} he={100} clStyle="col-4 px-2" />
              <SkeltonPage countNum={1} he={100} clStyle="col-4 px-2" />
              <SkeltonPage countNum={1} he={100} clStyle="col-4 px-2" />
            </div>
          </div>
        ) : (
          <div className="col-lg-4 col-md-8 col-sm-10 col-12 m-auto">
            <ReactImageGallery items={showImages} />
          </div>
        )}

        {loading ? (
          <SkeltonPage
            countNum={1}
            he={400}
            clStyle="col-lg-7 col-md-12 col-12 ps-4"
          />
        ) : (
          <div className="col-lg-7 col-md-12 col-12">
            <div className="ms-lg-5">
              <h1>{productData.title}</h1>
              <p className="mt-3">
                About this item:
                <span className="text-black-50 ms-2">{productData.About}</span>
              </p>
              <h3 className="mb-3">
                Details:
                <span className="text-black-50 ms-2">
                  {productData.description}
                </span>
              </h3>

              <div className="d-flex flex-wrap row-gap-2 align-items-center justify-content-between pt-4 border-top">
                <div>
                  {+productData.stock === 1 && (
                    <p className="text-danger fw-bold">There is only 1 left</p>
                  )}
                  {finalRate} <Stars ratingNum={finalRate} />
                  <div className="d-flex align-items-center gap-3">
                    <h5 className="mt-2">
                      Price:
                      <span className="ms-2 text-primary">
                        {productData.price - productData.discount} Egp
                      </span>
                      {+productData.discount > 0 && (
                        <span className="ps-2 del-price">
                          {productData.price} Egp
                        </span>
                      )}
                    </h5>
                  </div>
                </div>

                {err !== "" ? (
                  <p className="m-0 text-muted">{err}</p>
                ) : +productData.stock > 1 ? (
                  <div className="d-flex align-items-center gap-4">
                    <PlusMinusBtn setCount={(data) => setCount(data)} />

                    <div
                      className="border p-2 rounded point"
                      title="Add to Cart"
                      onClick={handleAdd}
                    >
                      {loadingCart ? (
                        " Loading... "
                      ) : (
                        <FontAwesomeIcon icon={faCartShopping} />
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="m-0 text-muted">This Product is unavailable</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SinglePage;
