import React from 'react'
import '../HeaderComponent.scss'
import Avartar from '../../../public/Images/avartar.jpg'
import { FaCaretDown } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export const ControlAuthor = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='ControlAuthor d-flex align-items-center gap-2 ms-4'>
            <div>
                <img width={25} height={25} src={Avartar} alt="avartar" />
            </div>
            <div className='d-flex align-items-center gap-1'>
                <span>Đoàn Thức</span>
                <FaCaretDown />
            </div>

            <div className='ControlAuthor__List'>
                <ul>
                    <li className='ControlAuthor__List__Item' >
                        <NavLink to='/account'>Trang cá nhân</NavLink>
                    </li>
                    {user.role === 'ADMIN' && (
                        <li className='ControlAuthor__List__Item' >
                            <NavLink to='/admin'>Quản lý Cửa hàng</NavLink>
                        </li>
                    )}
                    <li className='ControlAuthor__List__Item'>
                        <NavLink onClick={() => {
                            localStorage.removeItem('user')
                            localStorage.removeItem('token')

                        }} to='#'>Đăng xuất</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
