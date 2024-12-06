import React from 'react'
import backgroundAuth from '../../public/Images/backgroundauth.png'
import logo from '../../public/Images/logo.jpeg'
import { Button, Col, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import * as formik from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query'
import { ChangePassService, LoginService } from '../../services/authService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

export const ResetPassPage = () => {

    const { Formik } = formik;
    const dispatch = useDispatch();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const navigate = useNavigate();

    const schema = yup.object().shape({
        password: yup.string().required("password không được để trống"),
    });

    const mutationChangePassword = useMutation({
        mutationFn: ChangePassService,
        onSuccess: (data) => {
            toast.error(`🐉 cập nhập mật khẩu mới thành công !`)
            navigate('/login');
        },
        onError: (error) => {
            toast.success(`🐉 ${'đăng nhập thất bại: ' + error}`, {
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
                                        await mutationChangePassword.mutateAsync({
                                            tokenChange: token,
                                            password: values.password,
                                        })

                                    }

                                }
                                initialValues={{
                                    password: '',
                                }}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group controlId="validationFormik01">
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    placeholder='Nhập password mới'
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
                                                <NavLink to={'/login'}>Đăng nhập ngay</NavLink>
                                                <Button type="submit">Xác nhận mật khẩu mới</Button>
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
