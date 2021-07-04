import React from 'react'

const Pagination = ({totalResults, currentPage, onNextPage}) => {
    

    const nextPage = () => {
        onNextPage(1);
    }

    const prevPage = () => {
        onNextPage(-1);
    }

    return (
        <div>
            <h3>Pagination</h3>
            <p className="lead">There are {totalResults} total results</p>
            <p className="lead">We're on page {currentPage}</p>
            <div className="row">
                <button className="btn btn-primary mr-1" onClick={prevPage}>Previous</button>
                <button className="btn btn-primary" onClick={nextPage}>Next</button>
            </div>
        </div>
    )
}

export default Pagination
