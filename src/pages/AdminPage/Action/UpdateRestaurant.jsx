import React, { useState } from 'react'
import { Button, Form, Image, Row } from 'react-bootstrap';
import { GoRelFilePath } from 'react-icons/go';
import * as formik from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { GetRestaurantIdService, UpdateRestaurantService } from '../../../services/AdminService';
import { toast } from 'react-toastify';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';

export const UpdateRestaurant = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const jwttoken = localStorage.getItem('token');

    const queryClient = useQueryClient();

    const [previewUrl, setPreviewUrl] = useState(null);

    const { Formik } = formik;

    const schema = yup.object().shape({
        image: yup.string().required("Ảnh không được để trống"),
        resTauRantName: yup.string().required("Tên cửa hàng không được để trống"),
        address: yup.string().required("Địa chỉ không được để trống"),
        numberphone: yup.string().required("Số điện thoại không được để trống"),
        kindOfFood: yup.string().required("Loại món ăn không được để trống"),
    });

    //query
    const { data } = useQuery({
        queryKey: ['GetRestaurantId', { token: jwttoken, id: id }],
        queryFn: async ({ queryKey }) => {
            const [, { token, id }] = queryKey;
            const res = await GetRestaurantIdService({ token, id });
            return res;
        },
        enabled: !!id,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    //mutation
    const mutationUpdateRestaurant = useMutation({
        mutationFn: UpdateRestaurantService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetRestaurantId');
            const previousValue = queryClient.getQueryData('GetRestaurantId');
            queryClient.setQueryData('GetRestaurantId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {
            navigate('/admin');
            toast.success(`🐉 Update thành công`, {
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
            queryClient.invalidateQueries('GetRestaurantId');
        },
        onError: (error) => {
            toast.error(`🐉 Update thất bại`, {
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

    const handleFileChange = (e, setFieldValue) => {
        const file = e.target.files[0];

        setFieldValue('image', file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    if (mutationUpdateRestaurant.isPending) return <LoadingComponent message="Đang Update dữ liệu, vui lòng chờ..." />;

    return (
        <div className='AddRestaurant'>
            <span className='AddRestaurant__path d-flex align-items-center' >
                <GoRelFilePath />
                <NavLink to='/admin'>quản lý cửa hàng</NavLink>
                <GoRelFilePath />
                <NavLink to={`/admin/updateRestaurant/${id}`}>update nhà hàng</NavLink>
            </span>
            <h1 className='mt-1'>Update nhà hàng</h1>

            <div className='AddRestaurant__Form mt-4'>
                <Formik
                    enableReinitialize={true}
                    validationSchema={schema}
                    onSubmit={
                        async (values) => {

                            const formData = new FormData();

                            if (values.image instanceof File) {
                                formData.append('image', values.image);
                            } else {
                                formData.append('image', values.image);
                            }
                            formData.append('resTauRantName', values.resTauRantName);
                            formData.append('address', values.address);
                            formData.append('numberphone', values.numberphone);
                            formData.append('kindOfFood', values.kindOfFood);

                            await mutationUpdateRestaurant.mutateAsync({ token: jwttoken, data: formData, id: id });


                        }
                    }
                    initialValues={{
                        image: data?.url || '',
                        resTauRantName: data?.resTauRantName || '',
                        address: data?.address || '',
                        numberphone: data?.numberphone || '',
                        kindOfFood: data?.kindOfFood || '',
                    }}
                >
                    {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>

                            <Row className="mb-3">
                                <Form.Group >
                                    <Form.Label>Chọn Hình Ảnh</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        id="file-upload"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                    />
                                </Form.Group>

                                {previewUrl ? (
                                    <div className="text-start mt-3">
                                        <Image width={60} height={60} src={previewUrl} alt="Preview" thumbnail />
                                    </div>
                                ) : (
                                    <div className='text-start mt-3'>
                                        <Image width={60} height={60} src={values.image} alt="Preview" thumbnail />
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
                                    <Button type='submit' variant="success">Update Nhà Hàng</Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
