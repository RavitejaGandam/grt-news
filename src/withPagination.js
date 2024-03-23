// withPagination.js (HOC)
import React, { useState } from 'react';

function withPagination(Component, itemsPerPage) {
  return function WithPaginationWrapper(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(props.data.length / itemsPerPage);
    const paginatedData = props.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = page => {
      setCurrentPage(page);
    };

    return (
      <>
        <Component data={paginatedData} />
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </>
    );
  };
}

export default withPagination;


// <------------Another way of doing pagination-------------->

import React, { useState, useEffect } from 'react';

function withPagination(WrappedComponent, fetchData) {
  return function WithPaginationComponent(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData(currentPage)
        .then((response) => {
          setData(response.data);
          setTotalPages(response.totalPages);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, [currentPage]);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <>
        <WrappedComponent data={data} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </>
    );
  };
}
