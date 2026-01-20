import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


// pages
import Home from '@pages/Home';
import Categories from '@pages/Categories';
import Products from '@pages/Products';
import AboutUs from '@pages/AboutUs';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Error from '@pages/Error/Error';
import Cart from '@pages/Cart';

// layouts
import { MainLayout } from '@layouts/index'



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
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
        </Route>
    ),
    {
        basename: import.meta.env.BASE_URL,
    }
)

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter