import React from 'react'
import { Pagination } from 'react-bootstrap';

export const PanigateComponent = ({ itemsPerPage, totalItems, totalPages, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <Pagination className="justify-content-center">
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                {pageNumbers.map((number) => {
                    if (
                        number === 1 ||
                        number === totalPages ||
                        (number >= currentPage - 1 && number <= currentPage + 1)
                    ) {
                        return (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => paginate(number)}
                            >
                                {number}
                            </Pagination.Item>
                        );
                    }

                    if (number === currentPage - 2 || number === currentPage + 2) {
                        return <Pagination.Ellipsis key={number} />;
                    }

                    return null;
                })}

                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                />
            </Pagination>
        </nav>
    );
}
