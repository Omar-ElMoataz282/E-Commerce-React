import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Users from "./pages/dashboard/users/Users";
import GoogleCallBack from "./pages/auth/GoogleCallBack";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./pages/auth/RequireAuth";
import UpdateUser from "./pages/dashboard/users/UpdateUser";
import AddUser from "./pages/dashboard/users/AddUser";
import Err404 from "./pages/404/404";
import RequireSign from "./pages/auth/RequireSign";
import Categories from "./pages/dashboard/categories/Categories";
import AddCategory from "./pages/dashboard/categories/AddCategory";
import UpdateCategory from "./pages/dashboard/categories/UpdateCategory";
import Products from "./pages/dashboard/products/Products";
import AddProduct from "./pages/dashboard/products/AddProduct";
import UpdateProduct from "./pages/dashboard/products/UpdateProduct";
import HomePage from "./pages/website/homepage/HomePage";
import CategoriesPage from "./pages/website/categories/CategoriesPage";
import Website from "./pages/website/Website";
import SinglePage from "./pages/website/singleProduct/SingleProduct";
import SearchPage from "./pages/website/search/SearchPage";
import CategoriesProducts from "./pages/website/categoriesProducts/CategoriesProducts";
import AllProducts from "./pages/website/allProducts/AllProducts";
import Checkout from "./pages/website/checkout/Checkout";

function App() {
  return (
    <Routes>
      <Route element={<Website />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="category/:id" element={<CategoriesProducts />} />

        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/product/:id" element={<SinglePage />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/search-result" element={<SearchPage />} />
      </Route>

      <Route element={<RequireSign />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/auth/google/callback" element={<GoogleCallBack />} />

      <Route path="/*" element={<Err404 />} />

      <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth allowedRole={["1995"]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UpdateUser />} />
            <Route path="user/add" element={<AddUser />} />
          </Route>

          <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:id" element={<UpdateCategory />} />
            <Route path="category/add" element={<AddCategory />} />

            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<UpdateProduct />} />
            <Route path="product/add" element={<AddProduct />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
