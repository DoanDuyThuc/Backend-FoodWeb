import React, { useEffect, useState } from 'react'
import './HeaderComponent.scss'
import { Col, Container, Row, Image, InputGroup, Button, Badge, Offcanvas } from 'react-bootstrap'
import { FaPhoneAlt, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { MdContactSupport } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../public/Images/logo.jpeg'
import { ControlAuthor } from './ControlAuthor/ControlAuthor'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteCartItemService, GetCartIdService, UpdateQualityCartItemService } from '../../services/CartService'
import { toast } from 'react-toastify'
import { FaRegTrashCan } from 'react-icons/fa6'

export const HeaderComponent = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const currentCartId = useSelector(state => state.auth.cartId);

    const carts = useSelector(state => state.cart.carts);
    const totalPriceCart = useSelector(state => state.cart.totalPriceCart);

    const dispatch = useDispatch();

    const [numberphone, setNumberphone] = useState(user?.numberphone)

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const [showCanvas, setShowCanvas] = useState(false);
    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);

    //query
    const { data } = useQuery({
        queryKey: ['GetCartId', { cartId: user?.cartId || currentCartId }],
        queryFn: async ({ queryKey }) => {
            const [, { cartId }] = queryKey;
            const res = await GetCartIdService({ cartId });
            return res;
        },
        enabled: !!user?.cartId,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

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

    useEffect(() => {
        if (data) {
            dispatch({ type: 'cart/setCards', payload: data.cartItemRequests });
        }
    }, [data, dispatch])


    const handleOpenCheckout = async () => {
        setShowCanvas(false)
        navigate('/checkout');
    }

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

    const handleRemoveCartItem = async (item) => {
        await mutationDeleteCartItem.mutateAsync(
            {
                cartItemId: item.cartItemId
            });
    }

    return (
        <>
            <div className='HeaderComponent'>
                <Container>
                    <Row className='HeaderComponent__Top row-cols-2'>
                        <Col className='d-flex align-items-center' lg={6}>
                            <span className='me-3'>ứng dụng Foodey - Đặt đồ ăn bạn muốn </span>
                            <div className='d-flex align-items-center'>
                                <FaPhoneAlt className='me-2' />
                                <span>{numberphone}</span>
                            </div>
                        </Col>
                        <Col className='d-flex justify-content-end align-items-center' lg={6}>
                            <ul className='HeaderComponent__Top__Right '>
                                <li className='HeaderComponent__Top__Right__Item'>
                                    <NavLink to='/contact'>
                                        <MdContactSupport className='me-1' />
                                        Liên Hệ
                                    </NavLink>
                                </li>

                                {user ? (
                                    <li className='HeaderComponent__Top__Right__Item'>
                                        <ControlAuthor />
                                    </li>

                                ) : (
                                    <>
                                        <li className='HeaderComponent__Top__Right__Item'>
                                            <NavLink to='/register'>
                                                Đăng Ký
                                            </NavLink>
                                        </li>
                                        <li className='HeaderComponent__Top__Right__separator'>
                                            <div></div>
                                        </li>
                                        <li className='HeaderComponent__Top__Right__Item'>
                                            <NavLink to='/login'>
                                                Đăng Nhập
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                            </ul>
                        </Col>
                    </Row>
                </Container>
                <div className='HeaderComponent__Bottom'>
                    <Container className='h-100 d-flex align-items-center'>
                        <h1 >
                            <NavLink className='HeaderComponent__Bottom__Logo' to='/'>
                                <Image width={80} height={80} src={Logo} alt='Logo' />
                            </NavLink>
                        </h1>
                        <div className='HeaderComponent__Bottom__Search position-relative'>
                            <div className='w-100'>
                                <input className='w-100 HeaderComponent__Bottom__Search__Input' placeholder='Tìm kiếm ...' type="text" />
                            </div>
                            <Button variant="dark" className='HeaderComponent__Bottom__Search__Btn d-flex align-items-center justify-content-center'>
                                <FaSearch />
                            </Button>
                        </div>

                        <div className='HeaderComponent__Bottom__Cart text-center'>
                            <button onClick={() => handleShowCanvas()} type="button" className="position-relative">
                                <FaShoppingCart />
                                <span style={{ height: '20px', width: '20px' }} className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger ">
                                    {carts.length}
                                </span>
                            </button>
                        </div>
                    </Container>
                </div>
            </div>

            {showCanvas && (
                <Offcanvas style={{ width: 500 }} show={showCanvas} onHide={handleCloseCanvas} placement='end'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title style={{ borderBottom: '1px solid #e5e5e5' }} className='w-100 text-center pb-2'>
                            <h5>Giỏ đồ ăn</h5>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className=''>
                        <div className='CartCanvas'>
                            <div className='CartCanvas__Title pt-0' >
                                <div className='CartCanvas__Title__List' >
                                    {carts.map((item, index) => (
                                        <div key={index} className='CartCanvas__Title__List__Item'>
                                            <Row>
                                                <Col className='d-flex align-items-center justify-content-around p-0' lg={2}>
                                                    <span onClick={() => handleRemoveQualityCart(item)} style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdRemove /></span>
                                                    <div style={{ fontSize: '1rem', fontWeight: '600' }} >{item.quantity}</div>
                                                    <span onClick={() => handleAddQualityCart(item)} style={{ cursor: 'pointer', fontSize: '1rem', color: '#28a745' }} ><IoMdAdd /></span>
                                                </Col>
                                                <Col lg={2}>
                                                    <Image style={{ objectFit: 'cover' }} width={48} height={48} src={item.url} />
                                                </Col>
                                                <Col className='d-flex align-items-center justify-content-between' lg={7}>
                                                    <div style={{ fontWeight: '500' }}>{item.foodName}</div>
                                                    <span>{item.foodPrice * item.quantity} vnđ</span>
                                                </Col>

                                                <Col className='d-flex align-items-center justify-content-between' lg={1}>
                                                    <FaRegTrashCan onClick={() => handleRemoveCartItem(item)} style={{ cursor: 'pointer', color: 'red', fontSize: '1.2rem' }} />
                                                </Col>
                                            </Row>
                                        </div>

                                    ))}
                                </div>
                            </div>

                            <div className='CartCanvas__Footer'>
                                <Row className='mb-4'>
                                    <Col style={{ fontSize: '1.2rem' }} lg={4}>
                                        Tổng cộng
                                    </Col>
                                    <Col style={{ fontWeight: '600', fontSize: '1.2rem' }} className='text-end' lg={8}>
                                        {totalPriceCart} ₫
                                    </Col>
                                </Row>
                                <div className='CartCanvas__Footer__Btn'>
                                    <Button disabled={carts.length === 0} onClick={() => handleOpenCheckout()} className='w-100' variant="success">Xem lại đơn hàng</Button>
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            )}

        </>
    )
}
