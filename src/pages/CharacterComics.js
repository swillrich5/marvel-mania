import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from '../components/Spinner';
import './Home.css';
import './CharacterComic.css';

const CharacterComics = ({ match }) => {

    console.log("params = " + match.params.id);

    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    "&ts=" + ts + "&hash=" + hash + "&limit=100" +
                    "&orderBy=-onsaleDate";
                console.log(URL);
                const res = await axios.get(URL);
                console.log(res.data.data.results);
                setComics(res.data.data.results);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        getCharacterDetail();
    }, [match.params.id]);

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
                            <Link to={`/comic/${comic.id}`} key={comic.id} className='col-lg-4 col-md-6 col-sm-12 justify-content-around'>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className='row'>
                                            <img className="pl-4 col-5" src={comic.thumbnail.path + '/portrait_small.jpg'} alt="" />
                                            <h5 className="card-title col-7 mt-2 pl-0">{comic.title}</h5>
                                        </div>
                                        {comic.dates.map(comicDate =>
                                            <div key={comicDate.type} className="row ml-3">
                                                <div>
                                                    {/* conditional rendering allows only one of the four statements to show up on screen depening on the what type of date we're displaying */}
                                                    { comicDate.type === "onsaleDate" && <p className="card-text my-1">On Sale Date: {(comicDate.date.charAt(0) === '-') ? 'N/A' : new Date(comicDate.date).toLocaleDateString()}</p>}
                                                    { comicDate.type === "focDate" && <p className="card-text my-1">Final Order Cutoff: {(comicDate.date.charAt(0) === '-') ? 'N/A' : new Date(comicDate.date).toLocaleDateString()}</p>}
                                                    { comicDate.type === "unlimitedDate" && <p className="card-text my-1">Marvel Unlimited Access: {(comicDate.date.charAt(0) === '-') ? 'N/A' : new Date(comicDate.date).toLocaleDateString()}</p>}
                                                    { comicDate.type === "digitalPurchaseDate" && <p className="card-text my-1">Digital Purchase: {(comicDate.date.charAt(0) === '-') ? 'N/A' : new Date(comicDate.date).toLocaleDateString()}</p>}

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
        </div>
        )    
    }

}

export default CharacterComics;
