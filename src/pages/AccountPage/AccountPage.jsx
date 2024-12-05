import React, { useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import Avartar from '../../public/Images/avartar.jpg'
import './AccountPage.scss'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

export const AccountPage = () => {

    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('user'));

    const [username, setUsername] = useState(user?.name)

    return (
        <div className='mt-4 AccountPage'>
            <Row>
                <Col lg={4}>
                    <div className="AccountPage__Left">
                        <ul >
                            <li className="AccountPage__Left__Item d-flex gap-2 align-items-center mb-3">
                                <Image width={50} height={50} src={Avartar} alt='avartar' />
                                <span>{username}</span>
                            </li>

                            <li className="AccountPage__Left__Item">
                                <NavLink
                                    style={{
                                        color: location.pathname === '/account' ?
                                            '#28a745' : '#000'
                                    }}
                                    className={'d-flex gap-2 align-items-center'} to='/account'>
                                    <FaUser />
                                    <span>
                                        Thông tin tài khoản
                                    </span>
                                </NavLink>
                            </li>

                            <li className="AccountPage__Left__Item">
                                <NavLink
                                    style={{
                                        color: location.pathname === '/account/order' ?
                                            '#28a745' : '#000'
                                    }}
                                    className={'d-flex gap-2 align-items-center'} to='/account/order'>
                                    <FaShoppingCart />
                                    <span>
                                        Thông tin đơn hàng
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col lg={8}>
                    <Outlet />
                </Col>
            </Row>
        </div>
    )
}
