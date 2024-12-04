import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const LoadingComponent = ({ message = "Đang tải..." }) => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" role="status" />
                <p className="mt-3">{message}</p>
            </div>
        </Container>
    );
};

export default LoadingComponent;
