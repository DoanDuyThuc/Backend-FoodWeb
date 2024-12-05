import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { GetOrderUserService } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';

export const AccountOrder = () => {

    const orders = useSelector(state => state.auth.orders);


    return (
        <div className='AccountPage__Right'>
            <div className='AccountPage__Right__Header'>
                <span>Thông tin đơn hàng</span>
            </div>

            <div className='mt-5 AccountPage__Right__OrderList'>
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
                                <td className='text-center align-middle'>
                                    <Button variant={order.OrderStatus === 'Đang chờ' ? "secondary" :
                                        order.OrderStatus === 'Đang giao' ? "warning" : "success"
                                    }>{order.OrderStatus}</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div >
    )
}
