import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage/HomePage'
import { DefaultComponent } from '../components/DefaultComponent/DefaultComponent'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { RegisterPage } from '../pages/RegisterPage/RegisterPage'
import { AllRestaurantPage } from '../pages/AllRestaurantPage/AllRestaurantPage'
import { AccountPage } from '../pages/AccountPage/AccountPage'
import { DetailsRestaurantPage } from '../pages/DetailsRestaurantPage/DetailsRestaurantPage'
import { CheckOutPage } from '../pages/CheckOutPage/CheckOutPage'
import { AccountInfo } from '../pages/AccountPage/AccountInfo'
import { DefaultAdmin } from '../pages/AdminPage/DefaultAdmin'
import { ManagerRestaurant } from '../pages/AdminPage/ManagerRestaurant'
import { AddRestaurant } from '../pages/AdminPage/Action/AddRestaurant'
import { UpdateRestaurant } from '../pages/AdminPage/Action/UpdateRestaurant'
import { ManagerFood } from '../pages/AdminPage/ManagerFood'
import { UpdateFood } from '../pages/AdminPage/Action/UpdateFood'
import { ManagerUser } from '../pages/AdminPage/ManagerUser'
import { useSelector } from 'react-redux'
import { AccountOrder } from '../pages/AccountPage/AccountOrder'
import { ManagerOrder } from '../pages/AdminPage/ManagerOrder'

const Routers = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const currentRole = useSelector(state => state.auth.role);

    return (
        <Routes>

            {/* auth */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            {/* home page */}
            <Route path="/" element={<DefaultComponent />} >
                <Route index element={<HomePage />} />
                {/* check out */}
                <Route path="checkout" element={<CheckOutPage />} />

                {/* all restaurant */}
                <Route path='all' element={<AllRestaurantPage />} />

                {/* Profile */}
                <Route path="account" element={<AccountPage />}>
                    <Route index element={<AccountInfo />} />
                    <Route path="order" element={<AccountOrder />} />
                </Route>

                {/* details restaurant */}
                <Route path="restaurants/:id" element={<DetailsRestaurantPage />} />
            </Route>

            {/* manager admin */}
            {(user?.role || currentRole) === 'ADMIN' && (
                <Route path="admin" element={<DefaultAdmin />} >
                    <Route index element={<ManagerRestaurant />} />
                    <Route path="addRestaurant" element={<AddRestaurant />} />
                    <Route path="updateRestaurant/:id" element={<UpdateRestaurant />} />
                    <Route path="detailRestaurant/:id" element={<ManagerFood />} />
                    <Route path="updateFood/:id" element={<UpdateFood />} />
                    <Route path="managerUser" element={<ManagerUser />} />
                    <Route path="managerOrder" element={<ManagerOrder />} />
                </Route>
            )}

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Routers