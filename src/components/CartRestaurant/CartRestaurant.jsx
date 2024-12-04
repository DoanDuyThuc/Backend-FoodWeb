import React from 'react'
import { Image } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import './CartRestaurant.scss'

export const CartRestaurant = () => {


    return (
        <div className='mx-1'>
            <NavLink className='CartRestaurant-Cart' to='/restaurants/1'>
                <div className='CartRestaurant-Cart__Img'>
                    <Image width={'100%'} src='https://mms.img.susercontent.com/vn-11134513-7r98o-lsv28a92wszo79@resize_ss280x175!@crop_w280_h175_cT' />
                </div>
                <div className='CartRestaurant-Cart__Info'>
                    <div className='CartRestaurant-Cart__Info__Title'>
                        <h4>Cơm Tấm, Bún Thái, Hủ Tiếu Bò Kho - Tiệm Ăn Thanh Ngọc</h4>
                        <div>271 Hùng Vương, P. Vĩnh Trung, Quận Thanh Khê, Đà Nẵng</div>
                    </div>
                    <div className='CartRestaurant-Cart__Info__Price'>
                        <span>85.000 ~ 100.000 vnđ</span>
                        <div className='CartRestaurant-Cart__Info__Price__btn'>
                            <span >Xem Ngay</span>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}
