import React from 'react'

const Pagination = ({totalResults, page}) => {
    

    const turnPage = (direction) => {
        if (direction === 1 ) {

        }
    }
    return (
        <div>
            <h3>Pagination</h3>
            <p className="lead">There are {totalResults} total results</p>
            <p className="lead">We're on page {page}</p>
            <div className="row">
                <button className="btn btn-primary mr-1 disabled" onClick={() => {turnPage(1)}}>Previous</button>
                <button className="btn btn-primary">Next</button>
            </div>
        </div>
    )
}

export default Pagination
