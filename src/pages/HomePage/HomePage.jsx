import React from 'react'
import './HomePage.scss'
import { HomeBannerComponent } from '../../components/HomeBannerComponent/HomeBannerComponent'
import { ListRestaurantComponent } from '../../components/ListRestaurantComponent/ListRestaurantComponent'
import { ListFoodComponent } from '../../components/ListFoodComponent/ListFoodComponent'

export const HomePage = () => {
    return (
        <>
            <section className='mt-4'>
                <HomeBannerComponent />
            </section>
            <section className='mt-4'>
                <ListRestaurantComponent />
            </section>
            <section className='mt-4'>
                <ListFoodComponent />
            </section>
        </>
    )
}
