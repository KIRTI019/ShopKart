import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { importantRoutes, mainRoutes } from "./routes/routes";
import { CssBaseline } from "@mui/material";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Routes>
        {mainRoutes.map((item, index) => (
          <Route key={index} element={item.element} path={item.path} />
        ))}
        {importantRoutes.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={isAuth ? item.element : <Navigate to="/login" />}
          />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
