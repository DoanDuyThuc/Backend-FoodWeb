import React from 'react'
import backgroundAuth from '../../public/Images/backgroundauth.png'
import logo from '../../public/Images/logo.jpeg'
import { Button, Col, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query'
import { ForgetPassService, LoginService } from '../../services/authService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'

export const ForgetPassWordPage = () => {

    const { Formik } = formik;
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().required("Email không được để trống"),
    });

    const mutationForgetPass = useMutation({
        mutationFn: ForgetPassService,
        onSuccess: (data) => {
            toast.error(`🐉 chúng tôi đã gửi 1 email đến tài khoản của bạn !`)
        },
        onError: (error) => {
            toast.success(`🐉 ${'thất bại: ' + error}`, {
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

    if (mutationForgetPass.isPending) return <LoadingComponent message="Đang gửi đến bạn 1 email, vui lòng chờ..." />;

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

                                        await mutationForgetPass.mutateAsync({
                                            email: values.email,
                                        })

                                    }

                                }
                                initialValues={{
                                    email: '',
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
                                                    placeholder='Nhập email để lấy lại mật khẩu'
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3 text-end">
                                            <Form.Group className='d-flex justify-content-between align-items-center' controlId="validationFormik01" >
                                                <NavLink to={'/login'}>Đăng nhập ngay</NavLink>
                                                <Button type="submit">Lấy lại mật khẩu</Button>
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
