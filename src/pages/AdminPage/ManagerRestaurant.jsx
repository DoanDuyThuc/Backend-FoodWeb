import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Button, Image, Table } from 'react-bootstrap'
import { GoRelFilePath } from 'react-icons/go'
import { IoIosAdd, IoIosSearch } from 'react-icons/io'
import { DeleteRestaurantService } from '../../services/AdminService'
import { useDispatch, useSelector } from 'react-redux'
import { FaEye } from 'react-icons/fa'
import { MdAutoFixHigh, MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { NavLink, useNavigate } from 'react-router-dom'

export const ManagerRestaurant = () => {

    const jwttoken = localStorage.getItem('token');
    const navigate = useNavigate();

    const restaurants = useSelector(state => state.restaurant.restaurants)

    const queryClient = useQueryClient();

    //mutation
    const mutationDeleteRestaurant = useMutation({
        mutationFn: DeleteRestaurantService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllRestaurant');
            const previousValue = queryClient.getQueryData('GetAllRestaurant');
            queryClient.setQueryData('GetAllRestaurant', (old) => {
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
            queryClient.invalidateQueries('GetAllRestaurant');
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

    //handle
    const handleDeleteRestaurant = async (id) => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa tất cả user đã chọn không?");
        if (isConfirmed) {
            await mutationDeleteRestaurant.mutateAsync({ token: jwttoken, id: id });
        }
    }

    if (mutationDeleteRestaurant.isPending) return <LoadingComponent message="Đang xóa dữ liệu, vui lòng chờ..." />;

    return (
        <div className='ManagerRestaurant'>
            <span className='ManagerRestaurant__path d-flex align-items-center' >
                <GoRelFilePath />
                <NavLink to='/admin'>quản lý cửa hàng</NavLink>
            </span>
            <h1 className='mt-1'>Quản lý các cửa hàng</h1>

            <div className='ManagerRestaurant__Search'>
                <input type="text" placeholder='Tìm kiếm cửa hàng' />
                <Button variant='outline-success'>
                    <IoIosSearch />
                </Button>
            </div>

            <div className='mt-4'>
                <Table variant="dark" bordered hover size="lg">
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Tên Quán</th>
                            <th className='text-center'>thumbnail</th>
                            <th className='text-center'>số điện thoại</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant, index) => (
                            <tr key={restaurant.id} >
                                <td className='text-center align-middle' >{index + 1}</td>
                                <td className='text-center align-middle' >{restaurant.resTauRantName}</td>
                                <td className='text-center align-middle' >
                                    <Image style={{ objectFit: 'cover' }} height={50} width={50} src={restaurant.url} alt={restaurant.resTauRantName} />
                                </td>
                                <td className='text-center align-middle' >{restaurant.numberphone}</td>
                                <td className='text-center align-middle' >
                                    <Button onClick={() => navigate(`/admin/detailRestaurant/${restaurant.id}`)} variant='outline-success' size='sm'><FaEye /></Button>
                                    <Button onClick={() => navigate(`/admin/updateRestaurant/${restaurant.id}`)} className='mx-2' variant='outline-primary' size='sm'><MdAutoFixHigh /></Button>
                                    <Button onClick={() => handleDeleteRestaurant(restaurant.id)} variant='outline-danger' size='sm'><MdDelete /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
