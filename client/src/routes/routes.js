import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import AdminPage from "../pages/AdminPage";
import ProfileDetail from "../components/ProfileDetail";
import ProductSearch from "../pages/ProductSearch";
// import OrderPage from "../pages/OrderPage"

 export const importantRoutes = [
  {
    path: "/profile",
    element: <ProfilePage />,
    state: "profile",
  },
  {
    path: "/cart",
    element: <CartPage />,
    state: "cart",
  },
  {
    path: "/admin-panel",
    element: <AdminPage />,
    state: "admin",
  },
  {
    path: "/profile/:profileId",
    element: <ProfileDetail />,
    state: "profile-detail",
  },
//   {
//     path: "/order",
//     element: <OrderPage />,
//     state: "order",
//   },
 ];

export const mainRoutes = [
  {
    path: "/",
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/login",
    element: <LoginPage />,
    state: "login",
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
    state: "productDetail",
  },
  {
    path: "/search",
    element: <ProductSearch />,
    state: "productSearch",
  },
  {
    path: "/payment",
    element: <PaymentDetail />,
    state: "paymentForm"
  },
];
