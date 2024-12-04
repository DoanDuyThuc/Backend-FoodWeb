import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HeaderComponent } from '../HeaderComponent/HeaderComponent'
import { FooterComponnet } from '../FooterComponnet/FooterComponnet'

export const DefaultComponent = () => {
    return (
        <div>
            <HeaderComponent />
            <Container >
                <Outlet />
            </Container>
            <FooterComponnet />
        </div>
    )
}
