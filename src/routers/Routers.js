
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import AllProducts from '../admin/AllProducts';
import AddProducts from '../admin/AddProducts';
import UpdateProduct from '../admin/UpdateProduct';
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';
import Signup from '../admin/Signup';


const Routers = () => {
  return <Routes> 
        <Route path='/' element={<Navigate to = 'Home/' />}></Route>
        <Route path='home' element={<Home/>}></Route>
        <Route path='shop' element={<Shop/>}></Route>
        <Route path='cart' element={<Cart/>}></Route>
        <Route path='shop/:id' element={<ProductDetails/>}></Route>
        <Route path='checkout' element={<Checkout/>} />

        <Route path='/*' element={<ProtectedRoute/>}>
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='dashboard/all-products' element={<AllProducts/>} />
          <Route path='dashboard/add-products' element={<AddProducts/>} />
          <Route path="dashboard/edit-product/:id" element={<UpdateProduct />} /> 
          <Route path='dashboard/users' element={<Users/>} />
          <Route path='dashboard/add-user' element={<Signup/>} />
        </Route>
        
        <Route path='login' element={<Login/>}></Route>

    </Routes>
}

export default Routers