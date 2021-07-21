import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from './Spinner';
import Pagination from './Pagination';
import '../pages/Home.css';


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
        }
        else {
            console.log("We're going to the previous page of results");
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                setOffset(offset - itemsPerPage);
            }
        }
    }

    const onJumpToPage = (pageNum) => {
        console.log("We're going to page " + pageNum);
        setCurrentPage(pageNum);
        setOffset((pageNum - 1) * itemsPerPage);
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
                <div className="row mt-5">
                {characters.map(character =>
                    <Link to={`/character/${character.id}`} key={character.id} className='col mx-1 my-2' style={{width: "200px"}}>
                        <div className="card character-img" style={{width: "200px"}}>
                            <img className="card-img-top p-0" src={character.thumbnail.path + '/standard_xlarge.jpg'} alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{character.name}</h5>
                                </div>
                        </div>
                    </Link>
                )}
                </div>
                <Pagination totalResults={totalResults} currentPage={currentPage} numPages={numPages} onNextPage={onNextPage} onJumpToPage={onJumpToPage}/>
            </div>

        )
    }
}

export default CharacterResults;
