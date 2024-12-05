import React from 'react'
import '../HeaderComponent.scss'
import Avartar from '../../../public/Images/avartar.jpg'
import { FaCaretDown } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const ControlAuthor = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch({ type: 'auth/removeUserInfo' })
        dispatch({ type: 'cart/resetCart' })
        navigate('/')

    }

    return (
        <div className='ControlAuthor d-flex align-items-center gap-2 ms-4'>
            <div>
                <img width={25} height={25} src={Avartar} alt="avartar" />
            </div>
            <div className='d-flex align-items-center gap-1'>
                <span>{user.name}</span>
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
                        <span onClick={() => handleDelete()} >Đăng xuất</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
