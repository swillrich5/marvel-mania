import React, { useState } from 'react'

const Pagination = ({totalResults, currentPage, numPages, onNextPage}) => {
    
    const [prevDisabled, setPrevDisabled] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(false);

    const nextPage = () => {
        onNextPage(1);
        
    }

    const prevPage = () => {
        onNextPage(-1);
        setPrevDisabled(false);
        if (+currentPage === 1) {
            setPrevDisabled(true);
        }
    }

    return (
        <div>
            <h3>Pagination</h3>
            <p className="lead">There are {totalResults} total results</p>
            <p className="lead">We're on page {currentPage}</p>
            <div className="row">
                <button disabled={+currentPage === 1} className="btn btn-primary mr-1" onClick={prevPage}>Previous</button>
                <button disabled={+currentPage === +numPages} className="btn btn-primary" onClick={nextPage}>Next</button>
            </div>
        </div>
    )
}

export default Pagination
