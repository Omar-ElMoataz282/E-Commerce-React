# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# E-Commerce React.Js
- A professional E-Commerce web application built with **React** and styled using **React-Bootstrap**.
- It integrates with a **Laravel PHP backend API** and includes a dynamic dashboard with role-based access (Admin & P-Manager).

- # Features
- **Fully Responsive UI** using React-Bootstrap.
- **Role-Based Dashboard**:
  - **Admin**: Full access to manage users, products, categories, and more.
  - **P-Manager**: Limited access to product-related operations only.
- **Data Fetching From Laravel API**.
- **React Router v6**: For smooth routing with:
  - Dynamic routing with `useParams`.
  - Programmatic navigation using `useNavigate`.
  - Protected routes with role checks.
- **Error Pages**:
  - Custom 403 Forbidden.
  - Custom 404 Not Found.
- **React Hooks** used extensively:
 - useState, useEffect, useContext, useRef.
 - Global State Management using React Context API.
 - Pagination for large data sets.
 - Image Gallery for product images.
 - Loading Skeletons while fetching data.

## Token Storage
- Authentication tokens are stored securely using **cookies** with the help of the **universal-cookie library**.
- This approach enhances security, especially when combined with flags like HttpOnly and Secure.
- Depending on the use case, **localStorage** can also be used, but **cookies** are generally preferred for handling **sensitive authentication data**.

## Technologies Used
- React
- React-Bootstrap
- React Router v6
- Context API
- PHP Laravel API (Backend)
- Pagination Library
- Image Gallery Library
- Loading Skeleton Library
- cookie universal
- axios

## Link Live Server
- **Before you click the link, you need to clone the backend using**:
  -- git clone https://github.com/Omar-ElMoataz282/E-Commerce-BackEnd
  -- download XAMPP and run it as admininistrator and click in MySQL (Actions) start
  -- In the backend folder, click on the file path, type cmd, and in the command prompt: php artisan serve
- https://e-commerce-meroo.netlify.app
