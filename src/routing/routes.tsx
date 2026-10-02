import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
const Login = lazy(() => import('../pages/logIn/index'))
const ToDos = lazy(() => import('../pages/todos/ToDos'))
const CreatePost = lazy(() => import('../components/CreatePost'))
const Users = lazy(() => import("../pages/users"))
const RecoveryPass = lazy(() => import("../pages/recovery-pass"))
const Profile = lazy(() => import("../pages/profile"))
const Products = lazy(() => import("../pages/products"))
const PostDetails = lazy(() => import("../pages/posts/components/Details"))
const Posts = lazy(() => import("../pages/posts"))
const NotFound = lazy(() => import("../pages/not-found"))
const Home = lazy(() => import("../pages/home"))
const Cart = lazy(() => import("../pages/cart"))
const AboutUs = lazy(() => import("../pages/about-us"))
const TestContext = lazy(() => import("../pages/Drop-drilling copy"))
const DropDrilling = lazy(() => import("../pages/Drop-drilling"))
const AppLayout = lazy(() => import("../components/design-system/AppLayout"))

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="bg-slate-500 text-gray-900 flex justify-center items-center top-0 left-0 text-4xl w-screen h-screen">LOading...</div>}>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recoveryPass" element={<RecoveryPass />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/app" element={<Navigate to="/app/home" />} />

      <Route path="/app" element={<AppLayout />}>

        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="todos" element={<ToDos />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/create" element={<CreatePost />} />
        <Route path="posts/:id" element={<PostDetails />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
        <Route path="dropDriling" element={<DropDrilling />} />
        <Route path="test-Context" element={<TestContext />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
      
      </Route>

    </Routes>
    </Suspense>
  );
};
export default AppRoutes;
