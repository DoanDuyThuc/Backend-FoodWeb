import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './CartFood.scss'
import { CanvasOrder } from '../CanvasOrder/CanvasOrder'

export const CartFood = () => {

    const [showCanvas, setShowCanvas] = useState(false);

    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => {
        setShowCanvas(true);
    }

    const handleOrder = () => {
        handleShowCanvas();
    }
    return (
        <>
            <div >
                <div className='CartFood-Cart' >
                    <div className='CartFood-Cart__Img'>
                        <Image width={'100%'} src='https://mms.img.susercontent.com/vn-11134513-7r98o-lsv28a92wszo79@resize_ss280x175!@crop_w280_h175_cT' />
                    </div>
                    <div className='CartFood-Cart__Info'>
                        <div className='CartFood-Cart__Info__Title'>
                            <h4>Cơm Tấm, Bún Thái, Hủ Tiếu Bò Kho - Tiệm Ăn Thanh Ngọc</h4>
                            <div>271 Hùng Vương, P. Vĩnh Trung, Quận Thanh Khê, Đà Nẵng</div>
                        </div>
                        <div className='CartFood-Cart__Info__Price'>
                            <p>100.000 vnđ</p>
                            <Button onClick={() => handleOrder()} variant="danger" >Đặt ngay</Button>
                        </div>
                    </div>
                </div>
            </div>

            <CanvasOrder showCanvas={showCanvas} handleCloseCanvas={handleCloseCanvas} />
        </>
    )
}
