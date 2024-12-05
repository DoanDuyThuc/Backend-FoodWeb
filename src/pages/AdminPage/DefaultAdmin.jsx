import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Logo from '../../public/Images/logo.jpeg'
import './AdminPage.scss'
import { MdAddBusiness, MdOutlineRestaurantMenu } from 'react-icons/md'
import { CiLogout } from 'react-icons/ci'
import { FaUserCog } from 'react-icons/fa'
import { VscListUnordered } from 'react-icons/vsc'

export const DefaultAdmin = () => {

    const location = useLocation()
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <Container>
            <div className='AdminPage'>
                <Row>
                    <Col lg={4}>
                        <div className='AdminPage__Left'>
                            <div className='text-center mb-3'>
                                <NavLink to='/'>
                                    <Image height={100} width={100} src={Logo} />
                                </NavLink>
                                <h4>{user.name}</h4>
                            </div>

                            <div className='AdminPage__Left__List'>
                                <ul>
                                    <li className='AdminPage__Left__List__Item'>
                                        <NavLink
                                            style={{
                                                color: location.pathname === '/admin' ?
                                                    '#28a745' : '#000'
                                            }}
                                            to='/admin'>
                                            <MdOutlineRestaurantMenu style={{ fontSize: '1.5rem' }} className='me-2' />
                                            Quản lý cửa hàng
                                        </NavLink>
                                    </li>

                                    <li className='AdminPage__Left__List__Item'>
                                        <NavLink
                                            style={{
                                                color: location.pathname === '/admin/addRestaurant' ?
                                                    '#28a745' : '#000'
                                            }}
                                            to='/admin/addRestaurant'>
                                            <MdAddBusiness style={{ fontSize: '1.5rem' }} className='me-2' />
                                            Thêm cửa hàng mới
                                        </NavLink>
                                    </li>

                                    <li className='AdminPage__Left__List__Item'>
                                        <NavLink
                                            style={{
                                                color: location.pathname === '/admin/managerUser' ?
                                                    '#28a745' : '#000'
                                            }}
                                            to='/admin/managerUser'>
                                            <FaUserCog style={{ fontSize: '1.5rem' }} className='me-2' />
                                            Quản lý người dùng
                                        </NavLink>
                                    </li>

                                    <li className='AdminPage__Left__List__Item'>
                                        <NavLink
                                            style={{
                                                color: location.pathname === '/admin/managerOrder' ?
                                                    '#28a745' : '#000'
                                            }}
                                            to='/admin/managerOrder'>
                                            <VscListUnordered style={{ fontSize: '1.5rem' }} className='me-2' />
                                            Quản lý đơn hàng
                                        </NavLink>
                                    </li>

                                    <li style={{ width: '90%' }} className='AdminPage__Left__List__Item position-absolute bottom-0 mb-1'>
                                        <NavLink
                                            className={'w-100'}
                                            to='#'>
                                            <CiLogout style={{ fontSize: '1.5rem' }} className='me-2' />
                                            Đăng xuất
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
