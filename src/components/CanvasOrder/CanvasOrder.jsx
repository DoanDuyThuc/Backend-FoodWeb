import React from 'react'
import { Button, Col, Image, Offcanvas, Row } from 'react-bootstrap'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import Logo from '../../public/Images/logo.jpeg'
import './CanvasOrder.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateCartItemService, UpdateQualityCartItemService } from '../../services/CartService'
import { toast } from 'react-toastify'

export const CanvasOrder = ({ showCanvas, handleCloseCanvas }) => {

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));

    const carts = useSelector(state => state.cart.carts);
    const currentCartId = useSelector(state => state.auth.cartId);
    const foodItem = useSelector(state => state.restaurant.foodItem);

    const queryClient = useQueryClient();

    //mutation
    const mutationAddFoodToCart = useMutation({
        mutationFn: CreateCartItemService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetCartId');
            const previousValue = queryClient.getQueryData('GetCartId');
            queryClient.setQueryData('GetCartId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {

            handleCloseCanvas();

            toast.success(`🐉 Thêm thành công`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries('GetCartId');
        },
        onError: (error) => {
            toast.error(`🐉 Thêm thất bại`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
    });

    const mutationUpdateQualityFoodToCart = useMutation({
        mutationFn: UpdateQualityCartItemService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetCartId');
            const previousValue = queryClient.getQueryData('GetCartId');
            queryClient.setQueryData('GetCartId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {

            handleCloseCanvas();

            toast.success(`🐉 update thành công`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries('GetCartId');
        },
        onError: (error) => {
            toast.error(`🐉 update thất bại`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
    });


    const handleAddQuality = () => {
        dispatch({ type: 'restaurant/AddQuality' });
    }

    const handleRemoveQuality = () => {
        dispatch({ type: 'restaurant/RemoveQuality' });
    }

    const handleSubmiOrder = async () => {

        if (carts.some(item => item.foodId === foodItem.foodId)) {
            const cartItem = carts.find(item => item.foodId === foodItem.foodId);
            await mutationUpdateQualityFoodToCart.mutateAsync(
                {
                    quantity: foodItem.foodQuality,
                    cartItemId: cartItem.cartItemId
                });

            return;
        }

        await mutationAddFoodToCart.mutateAsync(
            {
                quantity: foodItem.foodQuality,
                foodId: foodItem.foodId,
                cartId: user?.cartId || currentCartId
            });
    }


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
                                    <Image width={70} height={70} src={foodItem?.url} />
                                </div>
                            </Col>
                            <Col lg={7}>
                                <div className='CanvasOrder__HeaderCanvas__Mid'>
                                    <h5>{foodItem?.foodName}</h5>
                                    <div>{foodItem?.foodDescription}</div>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <h5 style={{ fontWeight: '600' }}>
                                    {foodItem?.foodPrice}đ
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
                                <Button disabled={foodItem?.foodQuality === 1} onClick={() => handleRemoveQuality()} variant="outline-success"><IoMdRemove /></Button>
                                <div style={{ fontSize: '1.2rem', fontWeight: '600' }} >{foodItem?.foodQuality}</div>
                                <Button onClick={() => handleAddQuality()} variant="outline-success"><IoMdAdd /></Button>
                            </Col>

                            <Col className='pe-0'>
                                <Button onClick={() => handleSubmiOrder()} className='w-100' variant="success">Thêm vào giỏ hàng</Button>
                            </Col>
                        </Row>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
