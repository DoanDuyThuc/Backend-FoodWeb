import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Col, Image, Row } from 'react-bootstrap'
import './HomeBannerComponent.scss'
import Slider from "react-slick";
import banner1 from '../../public/Images/Banner/banner-1.png'
import banner2 from '../../public/Images/Banner/banner-2.png'
import banner3 from '../../public/Images/Banner/banner-3.png'
import banner4 from '../../public/Images/Banner/banner-4.png'
import banner1_1 from '../../public/Images/Banner/banner-1.1.png'
import banner1_2 from '../../public/Images/Banner/banner-1.2.png'

export const HomeBannerComponent = () => {

    const settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        autoplay: true,
        autoplaySpeed: 1500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, right: '25px', zIndex: 1 }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, left: '25px', zIndex: 1 }}
                onClick={onClick}
            />
        );
    }


    return (
        <div className='Home-Banner'>
            <Row>
                <Col lg={2}>
                    <div className='pt-4 h-100 Home-Banner__Left'>
                        <h4 className='mb-3' style={{ fontSize: '1.2rem', padding: '0 20px' }} >Danh mục</h4>
                        <div className='Home-Banner__Left__Menu'>
                            <li className='Home-Banner__Left__Menu__List__Item'>
                                <NavLink to='/all'>Tất Cả Sản Phẩm</NavLink>
                            </li>
                            <ul className='Home-Banner__Left__Menu__List' >
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink to='/category/1'>Sang Trọng</NavLink>
                                </li>
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink to='/category/1'>Buffet</NavLink>
                                </li>
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink to='/category/1'>Nhà Hàng</NavLink>
                                </li>
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink to='/category/1'>Ăn Vặt/Vỉa Hè</NavLink>
                                </li>
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink to='/category/1'>Tiệm Bánh</NavLink>
                                </li>
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink to='/category/1'>Cơm Văn Phòng</NavLink>
                                </li>
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink to='/category/1'>Ẩm Thực Việt</NavLink>
                                </li>
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink to='/category/1'>Món Tây</NavLink>
                                </li>
                                <li className='Home-Banner__Left__Menu__List__Item'>
                                    <NavLink style={{ borderBottom: 'none' }} to='/category/1'>Món Trung</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>

                <Col className='Home-Banner__Right' lg={10}>
                    <Row >
                        <Col lg={8}>
                            <div className="slider-container ">
                                <Slider  {...settings}>
                                    <Image style={{ objectFit: 'contain' }} src={banner1} alt='banner' />
                                    <Image style={{ objectFit: 'contain' }} src={banner2} alt='banner' />
                                    <Image style={{ objectFit: 'contain' }} src={banner3} alt='banner' />
                                    <Image style={{ objectFit: 'contain' }} src={banner4} alt='banner' />
                                </Slider>
                            </div>
                        </Col>
                        <Col className='d-flex flex-column justify-content-between' lg={4}>
                            <div className='Home-Banner__Right__BannerRight' >
                                <a href="#">
                                    <figure className='h-100 w-100'>
                                        <img style={{ objectFit: 'cover' }} height={'100%'} width={'100%'} src={banner1_1} alt="" />
                                    </figure>
                                </a>
                            </div>
                            <div className='Home-Banner__Right__BannerRight' >
                                <a href="#">
                                    <figure className='h-100 w-100'>
                                        <img style={{ objectFit: 'cover' }} height={'100%'} width={'100%'} src={banner1_1} alt="" />
                                    </figure>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}
