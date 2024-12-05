import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Modal, Row, Table } from 'react-bootstrap'
import { GoRelFilePath } from 'react-icons/go'
import { IoIosSearch } from 'react-icons/io'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { CreateFoodService, DeleteFoodService, GetRestaurantIdService } from '../../services/RestaurantService'
import { IoAddOutline } from 'react-icons/io5'
import { MdAutoFixHigh, MdDelete } from 'react-icons/md'
import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'

export const ManagerFood = () => {

    const jwttoken = localStorage.getItem('token');

    const [dataFood, setDataFood] = useState([]);
    const [showCreateFood, setShowCreateFood] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);


    const handleClose = () => setShowCreateFood(false);
    const handleShowCreateFood = () => setShowCreateFood(true);

    const { id } = useParams();

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
        foodName: yup.string().required("Tên món ăn không được để trống"),
        foodDescription: yup.string().required("Mô tả món ăn không được để trống"),
        foodPrice: yup.string().required("Giá món ăn không được để trống"),
    });

    //query
    const { data } = useQuery({
        queryKey: ['GetRestaurantId', { id: id }],
        queryFn: async ({ queryKey }) => {
            const [, { id }] = queryKey;
            const res = await GetRestaurantIdService({ id });
            return res;
        },
        enabled: !!id,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    //mutation
    const mutationCreateFood = useMutation({
        mutationFn: CreateFoodService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetRestaurantId');
            const previousValue = queryClient.getQueryData('GetRestaurantId');
            queryClient.setQueryData('GetRestaurantId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {

            handleClose();
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
            queryClient.invalidateQueries('GetRestaurantId');
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

    const mutationDeleteFood = useMutation({
        mutationFn: DeleteFoodService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetRestaurantId');
            const previousValue = queryClient.getQueryData('GetRestaurantId');
            queryClient.setQueryData('GetRestaurantId', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {

            toast.success(`🐉 Xóa thành công`, {
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
            toast.error(`🐉 Xóa thất bại`, {
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
            setDataFood(data);
        }
    }, [data])


    //handle
    const handleDeleteFood = async (foodId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa món ăn này không?')) {
            await mutationDeleteFood.mutateAsync({ token: jwttoken, FoodId: foodId });
        }
    }


    if (mutationCreateFood.isPending) return <LoadingComponent message="Đang tạo dữ liệu, vui lòng chờ..." />;
    if (mutationDeleteFood.isPending) return <LoadingComponent message="Đang xóa dữ liệu, vui lòng chờ..." />;


    return (
        <>
            <div className='ManagerFood'>
                <span className='ManagerFood__path d-flex align-items-center' >
                    <GoRelFilePath />
                    <NavLink to='/admin'>quản lý cửa hàng</NavLink>
                    <GoRelFilePath />
                    <NavLink to={`/admin/detailRestaurant/${id}`}>{dataFood?.resTauRantName}</NavLink>
                </span>
                <h1 className='mt-1'>Cửa hàng - {dataFood?.resTauRantName}</h1>

                <div className='ManagerFood__Search'>
                    <input type="text" placeholder='Món Ăn' />
                    <Button variant='outline-success'>
                        <IoIosSearch />
                    </Button>
                </div>

                <div className='mt-2 ManagerFood__AddBtn'>
                    <Button onClick={handleShowCreateFood} variant="outline-warning"><IoAddOutline /></Button>
                </div>

                <div className='ManagerFood__List mt-3'>
                    <h5>Các món ăn của cửa hàng</h5>
                    <Table variant="dark" bordered hover size="lg">
                        <thead>
                            <tr>
                                <th className='text-center align-middle'>#</th>
                                <th className='text-center align-middle'>Tên món</th>
                                <th className='text-center align-middle'>Thumbnail</th>
                                <th className='text-center align-middle'>Giá</th>
                                <th className='text-center align-middle'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataFood.foodRequests && dataFood.foodRequests.map((food, index) => (
                                <tr key={food.foodId}>
                                    <td className='text-center align-middle'>{index + 1}</td>
                                    <td className='text-center align-middle'>{food.foodName}</td>
                                    <td className='text-center align-middle'>
                                        <Image style={{ objectFit: 'cover' }} height={50} width={50} src={food.url} />
                                    </td>
                                    <td className='text-center align-middle'>
                                        {food.foodPrice} VNĐ
                                    </td>
                                    <td className='text-center align-middle'>
                                        <Button onClick={() => navigate(`/admin/updateFood/${food.foodId}`)} className='mx-2' variant='outline-primary' size='sm'><MdAutoFixHigh /></Button>
                                        <Button onClick={() => handleDeleteFood(food.foodId)} variant='outline-danger' size='sm'><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            <Modal size="lg" centered show={showCreateFood} onHide={handleClose}>
                <div className='FoodModal'>
                    <h5>Tạo món ăn cho nhà hàng - {data?.resTauRantName}</h5>

                    <Formik

                        validationSchema={schema}
                        onSubmit={
                            async (values) => {
                                const formData = new FormData();
                                formData.append('image', values.image);
                                formData.append('foodName', values.foodName);
                                formData.append('foodDescription', values.foodDescription);
                                formData.append('foodPrice', values.foodPrice);
                                formData.append('restaurantId', id);

                                await mutationCreateFood.mutateAsync({ token: jwttoken, data: formData });

                            }
                        }
                        initialValues={{
                            image: '',
                            foodName: '',
                            foodDescription: '',
                            foodPrice: '',
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
                                            placeholder='Chọn hình ảnh'
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
                                            as="textarea"
                                            name="foodDescription"
                                            value={values.foodDescription}
                                            placeholder='Mô tả về món ăn'
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
                                            placeholder='Nhập số tiền món ăn'
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
                                        <Button type='submit' variant="success">Tạo món ăn</Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    )
}
