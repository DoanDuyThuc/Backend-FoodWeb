import React from 'react'
import { IoFastFoodSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import './ListFoodComponent.scss'
import { Col, Row } from 'react-bootstrap'
import { CartRestaurant } from '../CartRestaurant/CartRestaurant'
import { CartFood } from '../CartFood/CartFood'
import { useSelector } from 'react-redux'

export const ListFoodComponent = () => {

    const foods = useSelector(state => state.restaurant.foods)


    return (
        <div className='ListFood'>
            <div className='ListFood__Header d-flex justify-content-between align-items-center mb-4'>
                <h4 className='d-flex align-items-center'><IoFastFoodSharp className='me-2' /> Các món ăn</h4>
                <div className='ListFood__Header__Btn'>
                    <NavLink to='/all' >Xem tất cả</NavLink>
                </div>
            </div>

            <div className='ListFood__Content'>
                <Row className='row-cols-5'>
                    {foods.map((food, index) => (

                        <Col key={food.id}>
                            <CartFood data={food} />
                        </Col>
                    ))}

                </Row>
            </div>
        </div>
    )
}
