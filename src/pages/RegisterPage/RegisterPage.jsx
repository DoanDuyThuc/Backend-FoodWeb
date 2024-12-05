import React from 'react'
import backgroundAuth from '../../public/Images/backgroundauth.png'
import logo from '../../public/Images/logo.jpeg'
import './RegisterPage.scss'
import { Button, Col, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { RegisterService } from '../../services/authService'
import { toast } from 'react-toastify';
import { CreateCartService } from '../../services/CartService'

export const RegisterPage = () => {

    const { Formik } = formik;
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required("Username không được để trống"),
        email: yup.string().required("Email không được để trống"),
        password: yup.string().required("Password không được để trống"),
        numberphone: yup.string().required("Số điện thoại không được để trống"),
    });

    //mutation login

    const mutationCreateCart = useMutation({
        mutationFn: CreateCartService,
        onSuccess: (data) => {
            console.log('tạo thành công cart');

        },
        onError: (error) => {
            toast.error(`🐉 ${'lỗi tạo cart: ' + error}`, {
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

    const mutationRegister = useMutation({
        mutationFn: RegisterService,
        onSuccess: async (data) => {

            await mutationCreateCart.mutateAsync({
                userId: data?.ourUsers?.id
            });

        },
        onSettled: (data, error) => {
            navigate('/login');
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
        },
        onError: (error) => {
            toast.error(`🐉 ${'đăng ký thất bại: ' + error}`, {
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
                                        await mutationRegister.mutateAsync({
                                            email: values.email,
                                            password: values.password,
                                            name: values.name,
                                            numberphone: values.numberphone
                                        });
                                    }
                                }
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                    numberphone: '',
                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group controlId="validationFormik01">
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
                                                    placeholder='Nhập name'
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.name}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.name}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
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

                                        <Row className="mb-3">
                                            <Form.Group controlId="validationFormik01">
                                                <Form.Control
                                                    type="text"
                                                    name="numberphone"
                                                    value={values.numberphone}
                                                    placeholder='Nhập số điện thoại'
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.numberphone}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.numberphone}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3 text-end">
                                            <Form.Group className='d-flex justify-content-between align-items-center' controlId="validationFormik01" >
                                                <NavLink to={'/register'}>Đăng nhập ngay</NavLink>
                                                <Button type="submit">Đăng ký</Button>
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
