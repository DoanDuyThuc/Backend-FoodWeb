import React, { useState } from 'react'
import { Button, Col, Image, Offcanvas, Row } from 'react-bootstrap'
import './DetailsRestaurantPage.scss'
import { MdOutlineWatchLater } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import Logo from '../../public/Images/logo.jpeg'
import { CanvasOrder } from '../../components/CanvasOrder/CanvasOrder'

export const DetailsRestaurantPage = () => {

    const [showCanvas, setShowCanvas] = useState(false);

    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => {
        setShowCanvas(true);
    }

    return (
        <>
            <div className='DetailsRestaurant mt-4'>
                <div className='DetailsRestaurant__Header'>
                    <Row>
                        <Col lg={5}>
                            <div className='DetailsRestaurant__Header__Left'>
                                <Image src='https://down-bs-vn.img.susercontent.com/vn-11134513-7r98o-lsttvkvjwkw44a@resize_ss640x400!@crop_w640_h400_cT' alt='imge' />
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className='DetailsRestaurant__Header__Right'>
                                <h1>Tứ Hải Quán - Cơm Gà & Cơm Sườn</h1>
                                <div className='DetailsRestaurant__Header__Right__Title'>23 Xô Viết Nghệ Tĩnh, P. Hòa Cường Nam, Quận Hải Châu, Đà Nẵng</div>
                                <div className='DetailsRestaurant__Header__Right__Content'>
                                    <div className='DetailsRestaurant__Header__Right__Content__Time'>
                                        <span>
                                            <span className='me-1'></span>
                                            Mở cửa
                                        </span>
                                        <div className='d-flex gap-1 align-items-center'>
                                            <MdOutlineWatchLater />
                                            <span style={{ fontWeight: '500' }} > 00:00 - 23:59</span>
                                        </div>
                                    </div>
                                    <div className='DetailsRestaurant__Header__Right__Content__Intro'>
                                        <span>Giới thiệu : </span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='DetailsRestaurant__Header__utility'>
                                <div className='DetailsRestaurant__Header__utility__Item'>
                                    <div className='DetailsRestaurant__Header__utility__Item__Title'>
                                        Phí dịch vụ
                                    </div>
                                    <div className='DetailsRestaurant__Header__utility__Item__Content'>
                                        <span>
                                            0.0% Phí phục vụ
                                        </span>
                                    </div>
                                </div>

                                <div className='DetailsRestaurant__Header__utility__line'>

                                </div>

                                <div className='DetailsRestaurant__Header__utility__Item'>
                                    <div className='DetailsRestaurant__Header__utility__Item__Title'>
                                        Dịch vụ bởi
                                    </div>
                                    <div className='DetailsRestaurant__Header__utility__Item__Content'>
                                        <span>
                                            Foodey
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='DetailsRestaurant__Body mt-4'>
                    <div className='DetailsRestaurant__Body__Tab pt-2'>
                        <h6>THỰC ĐƠN</h6>
                    </div>

                    <Row className='DetailsRestaurant__Body__Content justify-content-between '>

                        <Col lg={4}>
                            <div className='DetailsRestaurant__Body__Content__Search'>
                                <input type='text' placeholder='Tìm kiếm món ăn' />
                                <Button variant="outline-success">
                                    <FaSearch />
                                </Button>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className='DetailsRestaurant__Body__Content__Item'>
                                <Row>
                                    <Col lg={2}>
                                        <div className='DetailsRestaurant__Body__Content__Item__Image'>
                                            <Image width={60} height={60} src='https://down-bs-vn.img.susercontent.com/vn-11134517-7r98o-lw8i2mb2ktzt35' />
                                        </div>
                                    </Col>
                                    <Col lg={7}>
                                        <div className='DetailsRestaurant__Body__Content__Item__Info'>
                                            <h2>Combo 3: Cơm Má Đùi + Coca</h2>
                                            <div>1 phần Cơm Má Đùi + 1 chai Coca</div>
                                            <span>best seller</span>
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <Row className='align-items-center'>
                                            <Col lg={8}>
                                                <div className='DetailsRestaurant__Body__Content__Item__Price'>
                                                    <span>50.000đ</span>
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='DetailsRestaurant__Body__Content__Item__Button'>
                                                    <Button onClick={handleShowCanvas} variant="outline-danger">
                                                        <IoMdAdd />
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
            <CanvasOrder showCanvas={showCanvas} handleCloseCanvas={handleCloseCanvas} />
        </>
    )
}
