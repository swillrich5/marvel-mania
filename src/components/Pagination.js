import React, { useState, useEffect } from 'react';
import './Pagination.css';

const Pagination = ({totalResults, currentPage, numPages, onNextPage, onJumpToPage}) => {

    const [currentPageInput, setCurrentPageInput] = useState(currentPage);

    useEffect(() => {

    }, );
    
    const nextPage = () => {
        onNextPage(1);
    }

    const prevPage = () => {
        onNextPage(-1);
    }

    const jumpToPage = () => {
        console.log("I'm jumping to page " + currentPageInput);

        if (currentPageInput > numPages) {
            onJumpToPage(numPages);
        } else if (currentPageInput < 1) {
            onJumpToPage(1);
        } else {
            onJumpToPage(currentPageInput);
        }

    }

    const pageNumChangeHandler = (page) => {
        console.log("I'm in pageNumChangeHandler");
        setCurrentPageInput(page);
    }

    return (
        <div className="mt-4">
            <div className="row justify-content-center">
                <button disabled={+currentPage === 1} className="btn btn-primary mr-1" onClick={prevPage}>Previous</button>
                <button disabled={+currentPage === +numPages} className="btn btn-primary" onClick={nextPage}>Next</button>
            </div>
            <div className="justify-content-center mt-3 form-group row">
                <button className="btn btn-primary mr-2 pt-2" onClick={jumpToPage}>Jump to Page </button>
                <input type="text" className="form-control w-10" name="pageNumInput" id="pageNumInput" value={currentPageInput} onChange={e => pageNumChangeHandler(e.target.value)}/>
                <label className="ml-2 pt-2">of {numPages}</label>

            </div>
        </div>
    )
}

export default Pagination
