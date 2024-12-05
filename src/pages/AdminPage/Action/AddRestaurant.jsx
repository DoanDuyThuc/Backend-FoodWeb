import React, { useState } from 'react'
import { Button, Form, Image, Row } from 'react-bootstrap'
import { GoRelFilePath } from 'react-icons/go'
import * as formik from 'formik';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRestaurantService } from '../../../services/AdminService';
import { toast } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';

export const AddRestaurant = () => {

    const [previewUrl, setPreviewUrl] = useState(null);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleFileChange = (e, setFieldValue) => {
        const file = e.target.files[0];

        setFieldValue('image', file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const { Formik } = formik;

    const schema = yup.object().shape({
        image: yup.string().required("Ảnh không được để trống"),
        resTauRantName: yup.string().required("Tên cửa hàng không được để trống"),
        address: yup.string().required("Địa chỉ không được để trống"),
        numberphone: yup.string().required("Số điện thoại không được để trống"),
        kindOfFood: yup.string().required("Loại món ăn không được để trống"),
    });

    //mutation
    const mutationCreateRestaurant = useMutation({
        mutationFn: CreateRestaurantService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllRestaurant');
            const previousValue = queryClient.getQueryData('GetAllRestaurant');
            queryClient.setQueryData('GetAllRestaurant', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {

            navigate('/admin');
            toast.success(`🐉 Tạo thành công`, {
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
            queryClient.invalidateQueries('GetAllRestaurant');
        },
        onError: (error) => {
            toast.error(`🐉 Tạo thất bại`, {
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

    if (mutationCreateRestaurant.isPending) return <LoadingComponent message="Đang tải dữ liệu, vui lòng chờ..." />;


    return (
        <div className='AddRestaurant'>
            <span className='AddRestaurant__path d-flex align-items-center' >
                <GoRelFilePath />
                <NavLink to='/admin/addRestaurant'>thêm của hàng mới</NavLink>
            </span>
            <h1 className='mt-1'>Thêm của hàng mới</h1>

            <div className='AddRestaurant__Form mt-4'>
                <Formik

                    validationSchema={schema}
                    onSubmit={
                        async (values) => {
                            const formData = new FormData();
                            formData.append('image', values.image);
                            formData.append('resTauRantName', values.resTauRantName);
                            formData.append('address', values.address);
                            formData.append('numberphone', values.numberphone);
                            formData.append('kindOfFood', values.kindOfFood);

                            await mutationCreateRestaurant.mutateAsync({ token: localStorage.getItem('token'), data: formData });

                        }
                    }
                    initialValues={{
                        image: '',
                        resTauRantName: '',
                        address: '',
                        numberphone: '',
                        kindOfFood: '',
                    }}
                >
                    {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>

                            <Row className="mb-3">
                                <Form.Group >
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        id="file-upload"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                    />
                                </Form.Group>

                                {previewUrl && (
                                    <div className="text-start mt-3">
                                        <Image width={60} height={60} src={previewUrl} alt="Preview" thumbnail />
                                    </div>
                                )}
                                <Form.Control.Feedback type="invalid">
                                    {errors.image}
                                </Form.Control.Feedback>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="validationFormik01">
                                    <Form.Control
                                        type="text"
                                        name="resTauRantName"
                                        value={values.resTauRantName}
                                        placeholder='Nhập tên nhà hàng'
                                        onChange={handleChange}
                                        isInvalid={!!errors.resTauRantName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.resTauRantName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="validationFormik01">
                                    <Form.Control
                                        type="address"
                                        name="address"
                                        value={values.address}
                                        placeholder='Nhập địa chỉ nhà hàng'
                                        onChange={handleChange}
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="validationFormik01">
                                    <Form.Control
                                        type="numberphone"
                                        name="numberphone"
                                        value={values.numberphone}
                                        placeholder='Nhập số điện thoại nhà hàng'
                                        onChange={handleChange}
                                        isInvalid={!!errors.numberphone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.numberphone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="validationFormik01">
                                    <Form.Control
                                        type="kindOfFood"
                                        name="kindOfFood"
                                        value={values.kindOfFood}
                                        placeholder='Nhà hàng này phục vụ loại món ăn gì - hải sản , thức ăn nhanh ...'
                                        onChange={handleChange}
                                        isInvalid={!!errors.kindOfFood}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.kindOfFood}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3 text-end">
                                <Form.Group controlId="validationFormik01" >
                                    <Button type='submit' variant="success">Tạo nhà hàng</Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
