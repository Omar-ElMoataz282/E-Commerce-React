import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MenuContext from "./context/MenuContext.jsx";
import WindowContext from "./context/WindowContext.jsx";
import StorageDataContext from "./context/StorageDataContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "./css/Media.css";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-image-gallery/styles/css/image-gallery.css";
import SeachDataContext from "./context/SearchDateContext.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <WindowContext>
      <MenuContext>
        <SeachDataContext>
          <StorageDataContext>
            <App />
          </StorageDataContext>
        </SeachDataContext>
      </MenuContext>
    </WindowContext>
  </BrowserRouter>
);
