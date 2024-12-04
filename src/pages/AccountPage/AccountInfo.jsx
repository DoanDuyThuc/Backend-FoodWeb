import React, { useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import Avartar from '../../public/Images/avartar.jpg'

export const AccountInfo = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const [username, setUsername] = useState(user?.name)

    return (
        <div className='AccountPage__Right'>
            <div className='AccountPage__Right__Header'>
                <span>Thông tin người dùng</span>
            </div>

            <div className='AccountPage__Right__Content'>
                <div className='text-center'>
                    <Image width={120} height={120} src={Avartar} alt='avartar' />
                </div>

                <div className='AccountPage__Right__Content__Info p-4'>
                    <Row className='mb-3 d-flex align-items-center'>
                        <Col lg={2}>
                            <label className='me-3'>Họ và tên:</label>
                        </Col>
                        <Col lg={10}>
                            <input onChange={(e) => setUsername(e.target.value)} className='AccountPage__Right__Content__Info__Input' type="text" value={username} />
                        </Col>
                    </Row>

                    <Row className='mt-4 d-flex align-items-center'>
                        <Col lg={2}>

                        </Col>
                        <Col className='text-end' lg={10}>
                            <button className='btn btn-primary'>Lưu Thay đổi</button>
                        </Col>
                    </Row>
                </div>

            </div>
        </div>
    )
}
