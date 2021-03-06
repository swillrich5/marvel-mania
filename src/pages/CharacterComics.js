import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import './Home.css';
import './CharacterComic.css';

const CharacterComics = ({ match }) => {

    console.log("params = " + match.params.id);

    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(false);

    // useState variables for pagination
    const [totalResults, setTotalResults] = useState(0);
    const [numPages, setNumPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const getCharacterDetail = async () => {

            // build the API URL
            const baseURL = "https://gateway.marvel.com/";
            const comicsEndpoint = "v1/public/characters/";
            let comicsURL = baseURL + comicsEndpoint + match.params.id + "/comics";
    
            const ts = Number(new Date());      // timestamp for hash
            const hash = md5.create();
            hash.update(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
            console.log(hash);

            try {
                setLoading(true);
                const URL = comicsURL + "?apikey=" + process.env.REACT_APP_PUBLIC_KEY + 
                    "&ts=" + ts + "&hash=" + hash + "&limit=25" + "&offset=" + offset +
                    "&orderBy=-onsaleDate";
                console.log(URL);
                const res = await axios.get(URL);
                console.log(res.data.data);
                console.log(res.data.data.results);
                setComics(res.data.data.results);
                setTotalResults(res.data.data.total);
                setNumPages(Math.ceil(res.data.data.total / itemsPerPage));
                setItemsPerPage(25);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        getCharacterDetail();
    }, [match, totalResults, itemsPerPage, offset]);



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


    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="container space-background">
            <div className="jumbotron">
                <h2>Comics by Character</h2>
                <p className="lead text-center pb-3 px-5">All comics for the character are listed below in chronological order.</p>
                <div className="row">
                        {comics.map(comic =>
                            <Link to={`/comic/${comic.id}`} key={comic.id} className='col justify-content-around'>
                                <div className="card character-img mb-4">
                                    <img src={comic.thumbnail.path + '/portrait_uncanny.jpg'} alt=""  className="card-img-top"></img>
                                    <div className="card-body mx-0 px-0 bg-dark text-white">
                                        <h6 className="card-title font-weight-bold">{comic.title}</h6>
                                        {comic.dates.map(comicDate =>
                                            <div key={comicDate.type} className="row ml-3">
                                                <div>
                                                    {/* conditional rendering allows only one of the four statements to show up on screen depening on the what type of date we're displaying */}
                                                    { comicDate.type === "onsaleDate" && <p className="card-text my-0" id="small-font">On Sale Date: {(comicDate.date.charAt(0) === '-') ? 'N/A' : new Date(comicDate.date).toLocaleDateString()}</p>}
                                                    { comicDate.type === "focDate" && <p className="card-text my-0" id="small-font">Final Order Cutoff: {(comicDate.date.charAt(0) === '-') ? 'N/A' : new Date(comicDate.date).toLocaleDateString()}</p>}
                                                    { comicDate.type === "unlimitedDate" && <p className="card-text my-0" id="small-font">Marvel Unlimited Access: {(comicDate.date.charAt(0) === '-') ? 'N/A' : new Date(comicDate.date).toLocaleDateString()}</p>}
                                                    { comicDate.type === "digitalPurchaseDate" && <p className="card-text my-0" id="small-font">Digital Purchase: {(comicDate.date.charAt(0) === '-') ? 'N/A' : new Date(comicDate.date).toLocaleDateString()}</p>}

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                    <Pagination totalResults={totalResults} currentPage={currentPage} numPages={numPages} onNextPage={onNextPage} onJumpToPage={onJumpToPage}/>
                </div>
        </div>
        )    
    }

}

export default CharacterComics;
