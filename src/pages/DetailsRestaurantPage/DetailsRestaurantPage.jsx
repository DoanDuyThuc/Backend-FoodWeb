import React, { useState } from 'react'
import { Button, Col, Image, Offcanvas, Row } from 'react-bootstrap'
import './DetailsRestaurantPage.scss'
import { MdOutlineWatchLater } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import Logo from '../../public/Images/logo.jpeg'
import { CanvasOrder } from '../../components/CanvasOrder/CanvasOrder'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetRestaurantIdService } from '../../services/RestaurantService';
import { useDispatch } from 'react-redux'

export const DetailsRestaurantPage = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    //query
    const { data } = useQuery({
        queryKey: ['GetRestaurantId', { id: id }],
        queryFn: async ({ queryKey }) => {
            const [, { id }] = queryKey;
            const res = await GetRestaurantIdService({ id });
            return res;
        },
        enabled: !!id,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    const [showCanvas, setShowCanvas] = useState(false);

    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = (food) => {
        setShowCanvas(true);
        dispatch({ type: 'restaurant/setFoodItem', payload: food });
    }

    return (
        <>
            <div className='DetailsRestaurant mt-4'>
                <div className='DetailsRestaurant__Header'>
                    <Row>
                        <Col lg={5}>
                            <div className='DetailsRestaurant__Header__Left'>
                                <Image src={data?.url} />
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className='DetailsRestaurant__Header__Right'>
                                <h1>{data?.resTauRantName}</h1>
                                <div className='DetailsRestaurant__Header__Right__Title'>{data?.address}</div>
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
                                            {data?.kindOfFood}
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
                            {data?.foodRequests && data?.foodRequests.map((food, index) => (
                                <div key={index} className='DetailsRestaurant__Body__Content__Item'>
                                    <Row>
                                        <Col lg={2}>
                                            <div className='DetailsRestaurant__Body__Content__Item__Image'>
                                                <Image width={60} height={60} src={food?.url} />
                                            </div>
                                        </Col>
                                        <Col lg={7}>
                                            <div className='DetailsRestaurant__Body__Content__Item__Info'>
                                                <h2>{food?.foodName}</h2>
                                                <div>{food?.foodDescription}</div>
                                                <span>{food?.kindOfFood}</span>
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <Row className='align-items-center'>
                                                <Col lg={8}>
                                                    <div className='DetailsRestaurant__Body__Content__Item__Price'>
                                                        <span>{food?.foodPrice}đ</span>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className='DetailsRestaurant__Body__Content__Item__Button'>
                                                        <Button onClick={() => handleShowCanvas(food)} variant="outline-danger">
                                                            <IoMdAdd />
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                            }


                        </Col>
                    </Row>
                </div>
            </div>
            <CanvasOrder showCanvas={showCanvas} handleCloseCanvas={handleCloseCanvas} />
        </>
    )
}
