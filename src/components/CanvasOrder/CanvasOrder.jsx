import React from 'react'
import { Button, Col, Image, Offcanvas, Row } from 'react-bootstrap'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import Logo from '../../public/Images/logo.jpeg'
import './CanvasOrder.scss'

export const CanvasOrder = ({ showCanvas, handleCloseCanvas }) => {
    return (
        <div className='CanvasOrder'>
            <Offcanvas style={{ width: 500 }} show={showCanvas} onHide={handleCloseCanvas} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <Image width={60} height={60} src={Logo} />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='h-100 position-relative'>
                    <div className='CanvasOrder__HeaderCanvas py-3'>
                        <Row className='align-items-center'>
                            <Col lg={2}>
                                <div className='CanvasOrder__HeaderCanvas__Image'>
                                    <Image width={70} height={70} src='https://down-bs-vn.img.susercontent.com/vn-11134517-7r98o-lw8i2mb2ktzt35' />
                                </div>
                            </Col>
                            <Col lg={7}>
                                <div className='CanvasOrder__HeaderCanvas__Mid'>
                                    <h5>Combo 3: Cơm Má Đùi + Coca</h5>
                                    <div>1 phần Cơm Má Đùi + 1 chai Coca</div>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <h5 style={{ fontWeight: '600' }}>
                                    50.000đ
                                </h5>
                            </Col>
                        </Row>
                    </div>

                    <div className='CanvasOrder__BodyCanvas'>
                        <div className='CanvasOrder__BodyCanvas__Tab'>
                            <h6>Ghi chú đặc biệt với cửa hàng</h6>
                        </div>
                        <div className='CanvasOrder__BodyCanvas__Content'>
                            <textarea placeholder='Nhập ghi chú' />
                        </div>
                    </div>

                    <div className='CanvasOrder__FooterCanvas position-absolute '>
                        <Row className=''>
                            <Col className='d-flex justify-content-around align-items-center'>
                                <Button variant="outline-success"><IoMdAdd /></Button>
                                <div style={{ fontSize: '1.2rem', fontWeight: '600' }} >1</div>
                                <Button variant="outline-success"><IoMdRemove /></Button>
                            </Col>

                            <Col className='pe-0'>
                                <Button className='w-100' variant="success">Thêm vào giỏ hàng</Button>
                            </Col>
                        </Row>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
