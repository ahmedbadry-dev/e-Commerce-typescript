import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


// pages
import Home from '@pages/Home';
import Categories from '@pages/Categories';
import Products from '@pages/Products';
import AboutUs from '@pages/AboutUs';
import Login from '@pages/Login';
import Register from '@pages/Register';


// layouts
import { MainLayout } from '@layouts/index'



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='categories' element={<Categories />} />
            <Route path='products/:prefix' element={<Products />} />
            <Route path='about-us' element={<AboutUs />} />
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