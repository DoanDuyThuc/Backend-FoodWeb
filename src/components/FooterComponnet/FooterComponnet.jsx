import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import './FooterComponnet.scss'
import { NavLink } from 'react-router-dom'
import { FaFacebook, FaYoutube } from 'react-icons/fa'

export const FooterComponnet = () => {
    return (
        <div className='Footer mt-5'>
            <Container className='mt-5'>
                <Row className='pb-5'>
                    <Col className='d-flex' lg={6}>
                        <Col lg={6} className='Footer__Item'>
                            <ul className='Footer__Item__List'>
                                <li className='Footer__Item__List__Item'>
                                    <h4>
                                        Chăm sóc khách hàng
                                    </h4>
                                </li>

                                <li className='Footer__Item__List__Item'>
                                    <NavLink to='/contact'>Trung tâm trợ giúp</NavLink>
                                </li>

                                <li className='Footer__Item__List__Item'>
                                    <NavLink to='/contact'>Hướng dẫn mua hàng</NavLink>
                                </li>

                                <li className='Footer__Item__List__Item'>
                                    <NavLink to='/contact'>Chính sách vận chuyển</NavLink>
                                </li>

                            </ul>
                        </Col>
                        <Col lg={6} className='Footer__Item'>
                            <ul className='Footer__Item__List'>
                                <li className='Footer__Item__List__Item'>
                                    <h4>
                                        Về chúng tôi
                                    </h4>
                                </li>

                                <li className='Footer__Item__List__Item'>
                                    <NavLink to='/contact'>Về chùng tôi Foody - Thức ăn nhanh online</NavLink>
                                </li>

                                <li className='Footer__Item__List__Item'>
                                    <NavLink to='/contact'>Chính sách thanh toán</NavLink>
                                </li>

                                <li className='Footer__Item__List__Item'>
                                    <NavLink to='/contact'>Điều khoản chính sách</NavLink>
                                </li>

                            </ul>
                        </Col>
                    </Col>

                    <Col className='d-flex' lg={6}>
                        <Col lg={6} className='Footer__Item'>
                            <ul className='Footer__Item__List'>
                                <li className='Footer__Item__List__Item'>
                                    <h4>
                                        Theo dõi chúng tôi
                                    </h4>
                                </li>

                                <li className='Footer__Item__List__Item d-flex align-items-center gap-1'>
                                    <FaFacebook />
                                    <NavLink to='/contact'>Facebook</NavLink>
                                </li>

                                <li className='Footer__Item__List__Item d-flex align-items-center gap-1'>
                                    <FaYoutube />
                                    <NavLink to='/contact'>Youtube</NavLink>
                                </li>
                            </ul>
                        </Col>

                        <Col lg={6} className='Footer__Item'>
                            <ul className='Footer__Item__List'>
                                <li className='Footer__Item__List__Item'>
                                    <h4>
                                        Đi tới cửa hàng FoodHub - Thực phẩm sơ chế theo yêu cầu
                                    </h4>
                                </li>

                                <div className='d-flex'>
                                    <Image width={85} height={85} src='https://cdn.abphotos.link/photos/qrcode_base64/aHR0cDovL3NoYXJlLmFicGhvdG9zLmxpbmsveXdveQ' alt='FoodHub' />
                                    <div className='d-flex flex-column justify-content-around'>
                                        <Image width={85} src='https://www.foodhub.vn/assets/images/icons/759416b55e2bd69ecc360ee2faab7ad0.png' alt='' />
                                        <Image width={85} src='https://www.foodhub.vn/assets/images/icons/2679f513b5f9e235adf2c6c288617e7b.png' alt='' />
                                    </div>
                                </div>
                            </ul>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
