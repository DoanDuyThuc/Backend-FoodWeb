import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './CartFood.scss'
import { CanvasOrder } from '../CanvasOrder/CanvasOrder'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export const CartFood = ({ data }) => {

    const token = localStorage.getItem('token');

    const [showCanvas, setShowCanvas] = useState(false);
    const dispatch = useDispatch();

    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => {
        setShowCanvas(true);
    }

    const handleOrder = () => {
        if (!token) {
            toast.error('Vui lòng đăng nhập để thực hiện chức năng này');
            return;
        }

        handleShowCanvas();
        dispatch({ type: 'restaurant/setFoodItem', payload: data });
    }

    return (
        <>
            <div >
                <div className='CartFood-Cart' >
                    <div className='CartFood-Cart__Img'>
                        <Image style={{ objectFit: 'cover' }} height={150} width={'100%'} src={data?.url} />
                    </div>
                    <div className='CartFood-Cart__Info'>
                        <div className='CartFood-Cart__Info__Title'>
                            <h4>{data?.foodName}</h4>
                            <div>{data?.address}</div>
                        </div>
                        <div className='CartFood-Cart__Info__Price'>
                            <p>{data?.foodPrice} vnđ</p>
                            <Button onClick={() => handleOrder()} variant="danger" >Đặt ngay</Button>
                        </div>
                    </div>
                </div>
            </div>

            <CanvasOrder showCanvas={showCanvas} handleCloseCanvas={handleCloseCanvas} />
        </>
    )
}
