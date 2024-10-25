import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./stores/store";
import { Provider } from "react-redux";
import "./index.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
