import CommentsPage from "../pages/CommentsPage/CommentsPage"
import Login from "../pages/Login/Login"
import OffsPage from "../pages/OffsPage/OffsPage"
import OrdersPage from "../pages/OrdersPage/OrdersPage"
import ProductsPage from "../pages/ProductsPage/ProductsPage"
import UsersPage from "../pages/UsersPage/UsersPage"

const routes = [
    { path: '/', element: <ProductsPage /> },
    { path: '/products', element: <ProductsPage /> },
    { path: '/comments', element: <CommentsPage /> },
    { path: '/users', element: <UsersPage /> },
    { path: '/orders', element: <OrdersPage /> },
    { path: '/offs', element: <OffsPage /> },
    { path: '/login', element: <Login /> },
]

export default routes 