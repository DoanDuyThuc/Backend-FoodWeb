import React, { useState } from 'react'
import './CheckOutPage.scss'
import { Col, Image, Row, Form, Button } from 'react-bootstrap'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddOrderService, DeleteAllCartService, DeleteCartItemService, UpdateQualityCartItemService } from '../../services/CartService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CheckOutPage = () => {

    const queryClient = useQueryClient();

    const user = JSON.parse(localStorage.getItem('user'));
    const cartId = useSelector(state => state.auth.cartId);
    const userId = useSelector(state => state.auth.id);

    const navigate = useNavigate();

    const carts = useSelector(state => state.cart.carts);
    const totalPriceCart = useSelector(state => state.cart.totalPriceCart);

    const [inputAddress, setInputAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    //mutation
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

    const mutationDeleteCartItem = useMutation({
        mutationFn: DeleteCartItemService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetCartId');
            const previousValue = queryClient.getQueryData('GetCartId');
            queryClient.setQueryData('GetCartId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {
            toast.success(`🐉 đã xóa món ăn`, {
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
            toast.error(`🐉 delete thất bại`, {
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

    const mutationDeleteAllCart = useMutation({
        mutationFn: DeleteAllCartService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetCartId');
            const previousValue = queryClient.getQueryData('GetCartId');
            queryClient.setQueryData('GetCartId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {

        },
        onSettled: () => {
            queryClient.invalidateQueries('GetCartId');
        },
        onError: (error) => {
            toast.error(`🐉 delete thất bại`, {
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

    const mutationAddOrderItem = useMutation({
        mutationFn: AddOrderService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetCartId');
            const previousValue = queryClient.getQueryData('GetCartId');
            queryClient.setQueryData('GetCartId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: async (data) => {
            await mutationDeleteAllCart.mutateAsync(
                {
                    cartId: user?.cartId || cartId
                }
            )
            navigate('/account/order');
            toast.success(`🐉 Thanh toán thành công`, {
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
            toast.error(`🐉 delete thất bại`, {
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

    const handleAddQualityCart = async (item) => {
        await mutationUpdateQualityFoodToCart.mutateAsync(
            {
                quantity: item.quantity + 1,
                cartItemId: item.cartItemId
            });
    }

    const handleRemoveQualityCart = async (item) => {
        if (item.quantity === 1) {
            await mutationDeleteCartItem.mutateAsync(
                {
                    cartItemId: item.cartItemId
                });
            return
        }
        await mutationUpdateQualityFoodToCart.mutateAsync(
            {
                quantity: item.quantity - 1,
                cartItemId: item.cartItemId
            });
    }

    const handleSubmitPay = async () => {
        if (!inputAddress.trim()) {
            setErrorMessage("Trường này không được để trống!");
            toast.error(`🐉 Địa chỉ không được để trống`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            setErrorMessage("");
            await mutationAddOrderItem.mutateAsync(
                {
                    userId: user?.id || userId,
                    OrderNumber: `${carts.length} món ăn`,
                    OrderPrice: totalPriceCart,
                    OrderStatus: 'Đang chờ',
                    Localtion: inputAddress,
                })
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='CheckOut'>
                <div className='CheckOut__Header text-center'>
                    <h3>Bước cuối cùng - Thanh toán</h3>
                    {/* <h5>Bánh Mì Má Hải - Trà Chanh Kenbar</h5> */}
                </div>

                <div className='CheckOut__Body mt-4'>
                    <h5>Giao đến</h5>

                    <div className='CheckOut__Body__Address d-flex gap-5 align-items-center'>
                        <div className='CheckOut__Body__Address__Left'>
                            <h6 style={{ color: '#28a745' }} >Nhập địa chỉ nhận hàng</h6>
                        </div>

                        <div className="CheckOut__Body__Address__Input">
                            <textarea
                                onChange={(e) => setInputAddress(e.target.value)}
                                className="w-100"
                                placeholder="Nhập địa chỉ của bạn"
                            />
                            {errorMessage && <p style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</p>}
                        </div>
                    </div>
                </div>

                <div className='CheckOut__Summary mt-4'>
                    <h5>Tóm tắt đơn hàng</h5>

                    <div>
                        {carts.map((item, index) => (

                            <div key={index} className='CheckOut__Summary__Item'>
                                <Row>
                                    <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                        <span onClick={() => handleRemoveQualityCart(item)} style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                        <div style={{ fontSize: '1rem', fontWeight: '600' }} >{item.quantity}</div>
                                        <span onClick={() => handleAddQualityCart(item)} style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                    </Col>
                                    <Col lg={2}>
                                        <Image style={{ objectFit: 'cover' }} width={48} height={48} src={item.url} />
                                    </Col>
                                    <Col className='d-flex align-items-center justify-content-between' lg={8}>
                                        <div style={{ fontWeight: '500' }}>{item.foodName}</div>
                                        <span>{item.foodPrice} vnđ</span>
                                    </Col>
                                </Row>
                            </div>
                        ))}

                    </div>
                    <div className='mt-3 d-flex justify-content-between'>
                        <h6>Tổng tạm tính</h6>
                        <h6>{totalPriceCart} ₫</h6>
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
                        <h4>{totalPriceCart} ₫</h4>
                    </Col>

                    <Col lg={5}>
                        <Button onClick={() => handleSubmitPay()} className='w-100' variant="success">Thanh toán</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
