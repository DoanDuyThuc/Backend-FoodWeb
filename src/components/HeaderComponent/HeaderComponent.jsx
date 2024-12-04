import React, { useState } from 'react'
import './HeaderComponent.scss'
import { Col, Container, Row, Image, InputGroup, Button, Badge, Offcanvas } from 'react-bootstrap'
import { FaPhoneAlt, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { MdContactSupport } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../public/Images/logo.jpeg'
import { ControlAuthor } from './ControlAuthor/ControlAuthor'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'

export const HeaderComponent = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const [showCanvas, setShowCanvas] = useState(false);
    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);

    const handleOpenCheckout = () => {
        navigate('/checkout');
        handleCloseCanvas();
    }

    return (
        <>
            <div className='HeaderComponent'>
                <Container>
                    <Row className='HeaderComponent__Top row-cols-2'>
                        <Col className='d-flex align-items-center' lg={6}>
                            <span className='me-3'>ứng dụng Foodey - Đặt đồ ăn bạn muốn </span>
                            <div className='d-flex align-items-center'>
                                <FaPhoneAlt className='me-2' />
                                <span>0123456789</span>
                            </div>
                        </Col>
                        <Col className='d-flex justify-content-end align-items-center' lg={6}>
                            <ul className='HeaderComponent__Top__Right '>
                                <li className='HeaderComponent__Top__Right__Item'>
                                    <NavLink to='/contact'>
                                        <MdContactSupport className='me-1' />
                                        Liên Hệ
                                    </NavLink>
                                </li>

                                {user ? (
                                    <li className='HeaderComponent__Top__Right__Item'>
                                        <ControlAuthor />
                                    </li>

                                ) : (
                                    <>
                                        <li className='HeaderComponent__Top__Right__Item'>
                                            <NavLink to='/register'>
                                                Đăng Ký
                                            </NavLink>
                                        </li>
                                        <li className='HeaderComponent__Top__Right__separator'>
                                            <div></div>
                                        </li>
                                        <li className='HeaderComponent__Top__Right__Item'>
                                            <NavLink to='/login'>
                                                Đăng Nhập
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                            </ul>
                        </Col>
                    </Row>
                </Container>
                <div className='HeaderComponent__Bottom'>
                    <Container className='h-100 d-flex align-items-center'>
                        <h1 >
                            <NavLink className='HeaderComponent__Bottom__Logo' to='/'>
                                <Image width={80} height={80} src={Logo} alt='Logo' />
                            </NavLink>
                        </h1>
                        <div className='HeaderComponent__Bottom__Search position-relative'>
                            <div className='w-100'>
                                <input className='w-100 HeaderComponent__Bottom__Search__Input' placeholder='Tìm kiếm ...' type="text" />
                            </div>
                            <Button variant="dark" className='HeaderComponent__Bottom__Search__Btn d-flex align-items-center justify-content-center'>
                                <FaSearch />
                            </Button>
                        </div>

                        <div className='HeaderComponent__Bottom__Cart text-center'>
                            <button onClick={() => handleShowCanvas()} type="button" className="position-relative">
                                <FaShoppingCart />
                                <span style={{ height: '20px', width: '20px' }} className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger ">
                                    2
                                </span>
                            </button>
                        </div>
                    </Container>
                </div>
            </div>

            <Offcanvas style={{ width: 500 }} show={showCanvas} onHide={handleCloseCanvas} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ borderBottom: '1px solid #e5e5e5' }} className='w-100 text-center pb-2'>
                        <h5>Giỏ đồ ăn</h5>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className=''>
                    <div className='CartCanvas'>
                        <div className='CartCanvas__Title pt-0' >
                            <h5>Cafe & Bánh Mỳ Vân Trinh</h5>
                            <div className='CartCanvas__Title__List' >
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='CartCanvas__Title__List__Item'>
                                    <Row>
                                        <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }} >1</div>
                                            <span style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                        </Col>
                                        <Col lg={2}>
                                            <Image width={48} height={48} src='https://food-cms.grab.com/compressed_webp/items/VNITE2024091116210344962/photo/menueditor_item_c63c92be654d49f38eb8870e77f1527a_1726071654525656429.webp' />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                            <div style={{ fontWeight: '500' }}>Nước ép cà chua</div>
                                            <span>20.000 vnđ</span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>

                        <div className='CartCanvas__Footer'>
                            <Row className='mb-4'>
                                <Col style={{ fontSize: '1.2rem' }} lg={4}>
                                    Tổng cộng
                                </Col>
                                <Col style={{ fontWeight: '600', fontSize: '1.2rem' }} className='text-end' lg={8}>
                                    40.000 ₫
                                </Col>
                            </Row>
                            <div className='CartCanvas__Footer__Btn'>
                                <Button onClick={() => handleOpenCheckout()} className='w-100' variant="success">Xem lại đơn hàng</Button>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
