import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { GoRelFilePath } from 'react-icons/go'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { GetFoodIdService } from '../../../services/RestaurantService';
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Form, Image, Row } from 'react-bootstrap';
import { UpdateFoodService } from '../../../services/AdminService';
import { toast } from 'react-toastify';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';

export const UpdateFood = () => {

    const { id } = useParams();
    const jwttoken = localStorage.getItem('token');

    const navigate = useNavigate();


    const queryClient = useQueryClient();

    const [previewUrl, setPreviewUrl] = useState(null);

    const { Formik } = formik;

    const schema = yup.object().shape({
        image: yup.string().required("Ảnh không được để trống"),
        foodName: yup.string(),
        foodDescription: yup.string(),
        foodPrice: yup.string(),
    });


    //query
    const { data } = useQuery({
        queryKey: ['GetFoodId', { id: id }],
        queryFn: async ({ queryKey }) => {
            const [, { id }] = queryKey;
            const res = await GetFoodIdService({ id });
            return res;
        },
        enabled: !!id,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    //mutation
    const mutationUpdateRestaurant = useMutation({
        mutationFn: UpdateFoodService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetFoodId');
            const previousValue = queryClient.getQueryData('GetFoodId');
            queryClient.setQueryData('GetFoodId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (Data) => {
            navigate(`/admin/detailRestaurant/${data?.restaurantId}`);
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
            queryClient.invalidateQueries('GetFoodId');
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

    if (mutationUpdateRestaurant.isPending) return <LoadingComponent message='đang upload dữ liệu ...' />

    return (
        <div className='UpdateFood'>
            <span className='UpdateFood__path d-flex align-items-center' >
                <GoRelFilePath />
                <NavLink to='/admin'>quản lý cửa hàng</NavLink>
                <GoRelFilePath />
                <NavLink to={`/admin/detailRestaurant/${data?.restaurantId}`}>bánh canh cua</NavLink>
                <GoRelFilePath />
                <NavLink to={`/admin/updateRestaurant/${id}`}>update Food</NavLink>
            </span>
            <h1 className='mt-1'>Update Food</h1>

            <div className='UpdateFood__Form mt-4'>
                <Formik
                    enableReinitialize={true}
                    validationSchema={schema}
                    onSubmit={
                        async (values) => {

                            const formData = new FormData();

                            if (values.image instanceof File) {
                                formData.append('image', values.image);
                            } else {
                                formData.append('image', null);
                            }

                            formData.append('foodName', values.foodName);
                            formData.append('foodDescription', values.foodDescription);
                            formData.append('foodPrice', values.foodPrice);
                            formData.append('restaurantId', data?.restaurantId);

                            await mutationUpdateRestaurant.mutateAsync({ token: jwttoken, data: formData, id: id });

                        }
                    }
                    initialValues={{
                        image: data?.url || '',
                        foodName: data?.foodName || '',
                        foodDescription: data?.foodDescription || '',
                        foodPrice: data?.foodPrice || '',
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
                                        name="foodName"
                                        value={values.foodName}
                                        placeholder='Nhập tên món ăn'
                                        onChange={handleChange}
                                        isInvalid={!!errors.foodName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.foodName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="validationFormik01">
                                    <Form.Control
                                        type="text"
                                        name="foodDescription"
                                        as="textarea"
                                        value={values.foodDescription}
                                        placeholder='Nhập mô tả món ăn'
                                        onChange={handleChange}
                                        isInvalid={!!errors.foodDescription}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.foodDescription}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="validationFormik01">
                                    <Form.Control
                                        type="foodPrice"
                                        name="foodPrice"
                                        value={values.foodPrice}
                                        placeholder='Nhập giá món ăn'
                                        onChange={handleChange}
                                        isInvalid={!!errors.foodPrice}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.foodPrice}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3 text-end">
                                <Form.Group controlId="validationFormik01" >
                                    <Button type='submit' variant="success">Update món ăn</Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
