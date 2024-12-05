import React from 'react'
import backgroundAuth from '../../public/Images/backgroundauth.png'
import logo from '../../public/Images/logo.jpeg'
import './LoginPage.scss'
import { Button, Col, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query'
import { LoginService } from '../../services/authService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

export const LoginPage = () => {

    const { Formik } = formik;
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().required("Email không được để trống"),
        password: yup.string().required("Password không được để trống"),
    });

    const mutationLogin = useMutation({
        mutationFn: LoginService,
        onSuccess: (data) => {
            if (data.statusCode === 500) {
                toast.error(`🐉 Đăng nhập thất bại ${data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else if (data.statusCode === 200) {
                localStorage.setItem('token', data?.token);
                localStorage.setItem('user', JSON.stringify({
                    email: data?.email,
                    name: data?.name,
                    numberphone: data?.numberphone,
                    role: data?.role,
                    cartId: data?.cartId,
                    id: data?.id,
                }));

                dispatch({
                    type: 'auth/setUserInfo', payload:
                    {
                        role: data?.role,
                        id: data?.id,
                        cartId: data?.cartId
                    }
                });

                navigate('/');
                toast.success(`🐉 ${data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },
        onError: (error) => {
            toast.error(`🐉 ${'đăng nhập thất bại: ' + error}`, {
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

    return (
        <div className='AuthPage'>
            <div className='AuthPage__background'>
                <Image src={backgroundAuth} alt='background' />
            </div>

            <div className='AuthPage__inner'>
                <div className='AuthPage__inner__content'>
                    <div onClick={() => navigate('/')} className='AuthPage__inner__content__logo'>
                        <Image width={120} height={120} src={logo} alt='logo' />
                    </div>

                    <Row className='justify-content-center' >
                        <div className='AuthPage__inner__content__form col-sm-4 col-sm-offset-4 p-4'>
                            <Formik

                                validationSchema={schema}
                                onSubmit={
                                    async (values) => {
                                        await mutationLogin.mutateAsync({
                                            email: values.email,
                                            password: values.password,
                                        })

                                    }
                                }
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group controlId="validationFormik01">
                                                <Form.Control
                                                    type="text"
                                                    name="email"
                                                    value={values.email}
                                                    placeholder='Nhập email'
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group controlId="validationFormik01">
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    placeholder='Nhập password'
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3 text-end">
                                            <Form.Group className='d-flex justify-content-between align-items-center' controlId="validationFormik01" >
                                                <NavLink to={'/register'}>Đăng ký ngay</NavLink>
                                                <Button type="submit">Đăng nhập</Button>
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </Row>
                </div>
            </div>
        </div>
    )
}
