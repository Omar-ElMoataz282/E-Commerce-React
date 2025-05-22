import {
  faUserPlus,
  faUsers,
  faCartShopping,
  faCartPlus,
  faTruckFast,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    pathLink: "users",
    icon: faUsers,
    text: "Users",
    role: "1995",
  },
  {
    pathLink: "user/add",
    icon: faUserPlus,
    text: "Add User",
    role: "1995",
  },
  {
    pathLink: "categories",
    icon: faCartShopping,
    text: "Categories",
    role: ["1995", "1999"],
  },
  {
    pathLink: "category/add",
    icon: faCartPlus,
    text: "Add Category",
    role: ["1995", "1999"],
  },
  {
    pathLink: "products",
    icon: faTruckFast,
    text: "Products",
    role: ["1995", "1999"],
  },
  {
    pathLink: "product/add",
    icon: faPlus,
    text: "Add Product",
    role: ["1995", "1999"],
  },
];
