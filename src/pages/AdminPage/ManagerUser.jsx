import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Modal, Row, Table } from 'react-bootstrap'
import { GoRelFilePath } from 'react-icons/go'
import { IoIosSearch } from 'react-icons/io'
import { IoAddOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { DeleteUserService, GetAllUserService } from '../../services/AdminService'
import { FaEye } from 'react-icons/fa'
import { MdAutoFixHigh, MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as formik from 'formik';
import * as yup from 'yup';


export const ManagerUser = () => {

    const jwttoken = localStorage.getItem('token');
    const users = JSON.parse(localStorage.getItem('user'));
    const queryClient = useQueryClient();

    const [dataUsers, setDataUsers] = useState([])
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleClose = () => {
        selectedUserId(null);
        setShowUpdateUser(false);
    }
    const handleShowUpdateUser = (id) => {
        setSelectedUserId(id);
        setShowUpdateUser(true);
    }

    const { Formik } = formik;

    const schema = yup.object().shape({
        name: yup.string().required("Tên món ăn không được để trống"),
        username: yup.string().required("Tên món ăn không được để trống"),
        numberphone: yup.string().required("Tên món ăn không được để trống"),
    });


    //query
    const { data } = useQuery({
        queryKey: ['GetAllUser', { token: jwttoken }],
        queryFn: async ({ queryKey }) => {
            const [, { token }] = queryKey;
            const res = await GetAllUserService({ token });
            return res;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    const mutationDeleteUser = useMutation({
        mutationFn: DeleteUserService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllUser');
            const previousValue = queryClient.getQueryData('GetAllUser');
            queryClient.setQueryData('GetAllUser', (old) => {
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
            queryClient.invalidateQueries('GetAllUser');
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
            setDataUsers(data)
        }
    }, [data])

    //handle
    const handleDeleteUser = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            await mutationDeleteUser.mutateAsync({ token: jwttoken, id: id });
        }
    }

    if (mutationDeleteUser.isPending) return <LoadingComponent message="Đang xóa dữ liệu, vui lòng chờ..." />;

    return (
        <>
            <div className='ManagerUser'>
                <span className='ManagerUser__path d-flex align-items-center' >
                    <GoRelFilePath />
                    <NavLink to='/admin/managerUser'>quản lý người dùng</NavLink>
                </span>
                <h1 className='mt-1'>Quản lý người dùng</h1>

                <div className='ManagerUser__Search'>
                    <input type="text" placeholder='Tìm kiếm người dùng' />
                    <Button variant='outline-success'>
                        <IoIosSearch />
                    </Button>
                </div>

                <div className='mt-4'>
                    <Table variant="dark" bordered hover size="lg">
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th className='text-center'>Tên</th>
                                <th className='text-center'>Email</th>
                                <th className='text-center'>Số điện thoại</th>
                                <th className='text-center'>role</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataUsers
                                .sort((a, b) => (a.email === users.email ? -1 : b.email === users.email ? 1 : 0))
                                .map((user, index) => (
                                    <tr key={user.id} >
                                        <td className='text-center align-middle' >{index + 1}</td>
                                        <td className='text-center align-middle' >{user.name}</td>
                                        <td className='text-center align-middle' >
                                            {user.email}
                                        </td>
                                        <td className='text-center align-middle' >{user.numberphone}</td>
                                        <td className='text-center align-middle' >{user.role}</td>
                                        <td className='text-center align-middle' >
                                            {/* <Button onClick={() => handleShowUpdateUser(user.id)} className='mx-2' variant='outline-primary' size='sm'><MdAutoFixHigh /></Button> */}
                                            <Button onClick={() => handleDeleteUser(user.id)} disabled={user.email === users.email ? true : false} variant='outline-danger' size='sm'><MdDelete /></Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            <Modal size="lg" centered show={showUpdateUser} onHide={handleClose}>
                <div className='FoodModal'>
                    <h5>Tạo món ăn cho nhà hàng - {data?.resTauRantName}</h5>

                    <Formik

                        validationSchema={schema}
                        onSubmit={
                            async (values) => {
                                console.log(values);
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
