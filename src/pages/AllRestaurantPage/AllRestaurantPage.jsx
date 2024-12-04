import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CartRestaurant } from '../../components/CartRestaurant/CartRestaurant'
import { PanigateComponent } from '../../components/PanigateComponent/PanigateComponent'

export const AllRestaurantPage = () => {
    return (
        <div className='AllRestaurant mt-4'>
            <Container>
                <h3>Danh sách cửa hàng</h3>

                <div className='mt-4'>
                    <Row className='row-cols-5'>
                        <Col>
                            <CartRestaurant />
                        </Col>
                        <Col>
                            <CartRestaurant />
                        </Col>
                        <Col>
                            <CartRestaurant />
                        </Col>
                        <Col>
                            <CartRestaurant />
                        </Col>
                        <Col>
                            <CartRestaurant />
                        </Col>
                        <Col>
                            <CartRestaurant />
                        </Col>
                    </Row>

                    <div>
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
