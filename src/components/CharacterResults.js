import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from './Spinner';
import Pagination from './Pagination';


const CharacterResults = ({ characterName }) => {

    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const onNextPage = (direction) => {
        if (direction > 0) {
            console.log("We're going to the next page of results");
            setOffset(offset + itemsPerPage);
            setCurrentPage(currentPage + 1);
            if (currentPage >= numPages) {
                // we eventually want to disable the next button
            }
        }
        else {
            console.log("We're going to the previous page of results");
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                setOffset(offset - itemsPerPage);
            }
            if (+currentPage === 1) {
            }
        }
    }


    useEffect(() => {
        const getCharacters = async () => {
            console.log("characterName = " + characterName);
            const baseURL = "https://gateway.marvel.com/";
            const charactersEndpoint = "v1/public/characters?";
            let characterURL = baseURL + charactersEndpoint;

            const ts = Number(new Date());      // timestamp for hash
            const hash = md5.create();
            console.log(process.env.REACT_APP_PRIVATE_KEY);
            console.log(process.env.REACT_APP_PUBLIC_KEY);
            hash.update(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
            console.log(hash);

            try {
                const URL = characterURL + "apikey=" + process.env.REACT_APP_PUBLIC_KEY + "&ts=" + ts + 
                    "&hash=" + hash + "&nameStartsWith=" + characterName + "&offset=" + offset;
                console.log(URL);
                setLoading(true);
                const res = await axios.get(URL);
                console.log(res.data);
                setCharacters(res.data.data.results);
                setTotalResults(res.data.data.total);
                setNumPages(Math.ceil(res.data.data.total / itemsPerPage));
                console.log("totalResults = " + totalResults);
                setItemsPerPage(20);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        getCharacters();
    }, [characterName, totalResults, itemsPerPage, offset]);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div>
                <div className="row">
                {characters.map(character =>
                    <div key={character.id} className='col-lg-4 col-md-6 col-sm-12 justify-content-around'>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className='row'>
                                    <img className="pl-4 col-5" src={character.thumbnail.path + '/portrait_small.jpg'} alt="" />
                                    <h5 className="card-title col-7 mt-2 pl-0">{character.name}</h5>
                                </div>
                                {/* <p className="card-subtitle scroll mb-2">{character.description}</p> */}
                                {/* <Link to={`/character/${character.id}`} className='btn btn-dark btn-sm my-2'>More</Link> */}
                            </div>
                        </div>
                    </div>
                )}
                </div>
                <Pagination totalResults={totalResults} currentPage={currentPage} numPages={numPages} onNextPage={onNextPage}/>
            </div>

        )
    }
}

export default CharacterResults
