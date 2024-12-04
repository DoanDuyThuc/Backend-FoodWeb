import React from 'react'
import './CheckOutPage.scss'
import { Col, Image, Row, Form, Button } from 'react-bootstrap'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { FaRegMoneyBillAlt } from 'react-icons/fa'

export const CheckOutPage = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='CheckOut'>
                <div className='CheckOut__Header text-center'>
                    <h3>Bước cuối cùng - Thanh toán</h3>
                    <h5>Bánh Mì Má Hải - Trà Chanh Kenbar</h5>
                </div>

                <div className='CheckOut__Body mt-4'>
                    <h5>Giao đến</h5>

                    <div className='CheckOut__Body__Address d-flex gap-5 align-items-center'>
                        <div className='CheckOut__Body__Address__Left'>
                            <h6 style={{ color: '#28a745' }} >Nhập địa chỉ nhận hàng</h6>
                        </div>

                        <div className='CheckOut__Body__Address__Input'>
                            <textarea className='w-100' type="text" placeholder='Nhập địa chỉ của bạn' />
                        </div>
                    </div>
                </div>

                <div className='CheckOut__Summary mt-4'>
                    <h5>Tóm tắt đơn hàng</h5>
                    <div className='CheckOut__Summary__Item'>
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
                    <div className='mt-3 d-flex justify-content-between'>
                        <h6>Tổng tạm tính</h6>
                        <h6>30.000 ₫</h6>
                    </div>
                </div>

                <div className='CheckOut__PayDetail mt-4'>
                    <h5>Chi tiết thanh toán</h5>

                    <div className='CheckOut__PayDetail__Content'>
                        <div className='mb-2'>
                            Phương thức thanh toán
                        </div>
                        <div className='position-relative'>
                            <FaRegMoneyBillAlt style={{ fontSize: '1.4rem', left: '8px' }} className='position-absolute h-100' />
                            <Form.Select className='CheckOut__PayDetail__Content__Select' aria-label="Default select example">
                                <option value="tienmat">Tiền mặt</option>
                                <option disabled={true} value="">Phương thức chưa hổ trợ</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>

                <Row className='CheckOut__Footer align-items-center mt-4'>
                    <Col>
                        <h5>Tổng cộng</h5>
                        <h4>51.000 ₫</h4>
                    </Col>

                    <Col lg={5}>
                        <Button className='w-100' variant="success">Thanh toán</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
