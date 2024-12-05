import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CartRestaurant } from '../../components/CartRestaurant/CartRestaurant'
import { PanigateComponent } from '../../components/PanigateComponent/PanigateComponent'
import { useSelector } from 'react-redux'

export const AllRestaurantPage = () => {

    const restaurants = useSelector(state => state.restaurant.restaurants)


    return (
        <div className='AllRestaurant mt-4'>
            <Container>
                <h3>Danh sách cửa hàng</h3>

                <div className='mt-4'>
                    <Row className='row-cols-5'>
                        {restaurants.map((restaurant, index) => (
                            <Col key={restaurant.id}>
                                <CartRestaurant data={restaurant} />
                            </Col>
                        ))}

                    </Row>

                    <div className='mt-4'>
                        < PanigateComponent
                            itemsPerPage={5}
                            totalItems={50}
                            totalPages={10}
                            paginate={() => { }}
                            currentPage={1}
                        />
                    </div>
                </div>
            </Container>
        </div>
    )
}
