import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


// pages
const Home = lazy(() => import("@pages/Home"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Categories = lazy(() => import("@pages/Categories"));
const Cart = lazy(() => import("@pages/Cart"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Profile = lazy(() => import('@pages/Profile'))
import Error from '@pages/Error/Error';
import { LottieHandler } from '@components/feedback';


// protect route
import ProtectedRoute from '@components/Auth/ProtectedRoute';

// layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />} errorElement={<Error />}>
            <Route index element={<Home />} />
            <Route path='categories' element={<Categories />} />
            <Route
                path='categories/products/:prefix'
                element={<Products />}
                loader={({ params }) => {
                    if (
                        typeof params.prefix !== "string" ||
                        !/^[a-z]+$/i.test(params.prefix)
                    ) {
                        throw new Response("Bad Request", {
                            statusText: "Category not found",
                            status: 400,
                        })
                    }
                    return true  // if there is no return true the user can not access page for correct params
                }}
            />
            <Route path='about-us' element={<AboutUs />} />
            <Route path='cart' element={<Cart />} />
            <Route path='wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
    ),
    {
        basename: import.meta.env.BASE_URL,
    }
)

const AppRouter = () => {
    return (
        <Suspense fallback={
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <LottieHandler type="layoutLoading" />
            </div>
        }>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default AppRouter