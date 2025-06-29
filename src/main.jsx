import { createRoot } from "react-dom/client";
import App from "./App";
import "./global.css";
import { DataProvider } from "./api/DataContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <App />
  </DataProvider>
);
