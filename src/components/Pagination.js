import React from 'react'

const Pagination = ({totalResults}) => {
    return (
        <div>
            <h3>Pagination</h3>
            <p className="lead">There are {totalResults} total results</p>
        </div>
    )
}

export default Pagination
