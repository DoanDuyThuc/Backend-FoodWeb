import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import { GoRelFilePath } from 'react-icons/go'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { UpdateStatusOrderService } from '../../services/AdminService';
import { toast } from 'react-toastify';

export const ManagerOrder = () => {

    const orders = useSelector(state => state.auth.orders);

    const queryClient = useQueryClient();

    const [orderStatus, setOrderStatus] = useState('Đang chờ');

    const mutationUpdateOrderStatus = useMutation({
        mutationFn: UpdateStatusOrderService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllOrder');
            const previousValue = queryClient.getQueryData('GetAllOrder');
            queryClient.setQueryData('GetAllOrder', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {

            toast.success(`🐉 cập nhập trạng thái thành công`, {
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
            queryClient.invalidateQueries('GetAllOrder');
        },
        onError: (error) => {
            toast.error(`🐉 ập nhập trạng thái thất bại`, {
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

    const handleStatusChange = async (e, orderId) => {
        const newStatus = e.target.value;
        setOrderStatus(newStatus);

        await mutationUpdateOrderStatus.mutateAsync(
            {
                orderId: orderId,
                OrderStatus: newStatus
            });

    };

    return (
        <div className='ManagerOrder'>
            <span className='ManagerOrder__path d-flex align-items-center' >
                <GoRelFilePath />
                <NavLink to='/admin/managerOrder'>quản lý đơn hàng</NavLink>
            </span>
            <h1 className='mt-1'>Quản lý đơn hàng</h1>

            <div className='mt-4'>
                <Table variant="dark" bordered hover size="lg">
                    <thead>
                        <tr>
                            <th className='text-center align-middle'>#</th>
                            <th className='text-center align-middle'>Số lượng món ăn</th>
                            <th className='text-center align-middle'>Địa chỉ nhận hàng</th>
                            <th className='text-center align-middle'>Tổng tiền</th>
                            <th className='text-center align-middle'>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td className='text-center align-middle'>{index + 1}</td>
                                <td className='text-center align-middle'>{order.OrderNumber}</td>
                                <td className='text-center align-middle'>{order.Localtion}</td>
                                <td className='text-center align-middle'>
                                    <span style={{ fontWeight: '600' }}>{order.OrderPrice} vnđ</span>
                                </td>
                                <td className='d-flex justify-content-center align-middle'>
                                    <Form.Select
                                        aria-label="Chọn trạng thái đơn hàng"
                                        onChange={(e) => handleStatusChange(e, order.orderId)}
                                        value={order.OrderStatus}
                                        className='ManagerOrder__statusSelect'
                                        style={{
                                            backgroundColor: order.OrderStatus === 'Đang chờ' ? '#6c757d' :
                                                order.OrderStatus === 'Đang giao' ? '#ffc107' : '#198754'
                                        }}
                                    >
                                        <option value="Đang chờ">
                                            Đang chờ
                                        </option>
                                        <option value="Đang giao">Đang giao</option>
                                        <option value="Đã giao">Đã giao</option>
                                    </Form.Select>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
