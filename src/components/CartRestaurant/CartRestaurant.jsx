import React from 'react'
import { Image } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import './CartRestaurant.scss'

export const CartRestaurant = ({ data }) => {


    return (
        <div className='mx-1'>
            <NavLink className='CartRestaurant-Cart' to={`/restaurants/${data?.id}`}>
                <div className='CartRestaurant-Cart__Img'>
                    <Image style={{ objectFit: 'cover' }} height={150} width={'100%'} src={data?.url} />
                </div>
                <div className='CartRestaurant-Cart__Info'>
                    <div className='CartRestaurant-Cart__Info__Title'>
                        <h4>{data?.resTauRantName}</h4>
                        <div>{data?.address}</div>
                    </div>
                    <div className='CartRestaurant-Cart__Info__Price'>
                        <span>{data?.kindOfFood}</span>
                        <div className='CartRestaurant-Cart__Info__Price__btn'>
                            <span >Xem Ngay</span>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}
