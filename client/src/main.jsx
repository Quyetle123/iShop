import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./router/index.jsx";
import "./index.css";
import { store } from "./redux/store.jsx";
import "./firebase/config.jsx";
import { socket } from "./utils/socket.jsx";
import { getToken } from "./utils/token.jsx";

const handleLoad = () => {
  const token = getToken();
  if (token) {
    socket.emit("login", { accountId: token?.id });
  }
};

window.addEventListener("load", handleLoad);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
