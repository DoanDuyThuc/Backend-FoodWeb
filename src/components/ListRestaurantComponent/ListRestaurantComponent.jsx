import React from 'react'
import { IoRestaurant } from 'react-icons/io5'
import './ListRestaurantComponent.scss'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { CartRestaurant } from '../CartRestaurant/CartRestaurant'
import Slider from 'react-slick'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const ListRestaurantComponent = () => {

    const restaurants = useSelector(state => state.restaurant.restaurants)

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={"Restaurant__Arrow "}
                style={{ ...style }}
                onClick={onClick}
            >
                <FaAngleRight />
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={"Restaurant__Arrow"}
                style={{ ...style, left: '-9px' }}
                onClick={onClick}
            >
                <FaAngleLeft />
            </div>
        );
    }
    return (
        <div className='ListRestaurant'>
            <div className='ListRestaurant__Header d-flex justify-content-between align-items-center mb-4'>
                <h4 className='d-flex align-items-center'><IoRestaurant className='me-2' /> Các nhà hàng</h4>
                <div className='ListRestaurant__Header__Btn'>
                    <NavLink to='/all' >Xem tất cả</NavLink>
                </div>
            </div>
            <div className='ListRestaurant__Content'>
                <div className="slider-container">
                    <Slider {...settings}>
                        {restaurants.map((restaurant, index) => (
                            <div key={restaurant.id}>
                                <CartRestaurant data={restaurant} />
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        </div>
    )
}
