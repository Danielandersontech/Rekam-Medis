import { createRoot } from "react-dom/client";
import "./tailwind.css";
import ListProduct from "./ListProduct";

createRoot(document.getElementById("root")).render(
  <div>
    <ListProduct/>
  </div>
);