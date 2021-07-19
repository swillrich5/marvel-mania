import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import './Character.css';
import Spinner from '../components/Spinner';

import comicbook from '../images/comicbook.jpg';
import event from '../images/event-civil-war.jpg';
import seriesimg from '../images/series-image.jpg';


const Character = ({ match }) => {
    console.log(match.params.id);

    const [character, setCharacter] = useState();
    const [comicCount, setComicCount] = useState(0);
    const [seriesCount, setSeriesCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);

    useEffect(() => {
        const getCharacterDetail = async () => {

            // build the API URL
            const baseURL = "https://gateway.marvel.com/";
            const charactersEndpoint = "v1/public/characters/";
            let characterURL = baseURL + charactersEndpoint + match.params.id;
    
            const ts = Number(new Date());      // timestamp for hash
            const hash = md5.create();
            hash.update(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
            console.log(hash);

            try {
                const URL = characterURL + "?apikey=" + process.env.REACT_APP_PUBLIC_KEY + "&ts=" + ts + "&hash=" + hash;
                console.log(URL);
                const res = await axios.get(URL);
                console.log(res.data.data.results[0]);
                setCharacter(res.data.data.results[0]);
                setComicCount(res.data.data.results[0].comics.available);
                setSeriesCount(res.data.data.results[0].series.available);
                setEventCount(res.data.data.results[0].events.available);
            }
            catch(err) {
                console.log(err);
            }
        }
        getCharacterDetail();
    }, [match.params.id]);

    if (character) {
        return (
            <div className="container space-background">
                <div className="jumbotron">
                <h1 className="mb-3">{character.name}</h1>
                    <div className="row justify-content-center pb-3">
                        <div className="col">
                            <img src={character.thumbnail.path + '/detail.jpg'} className="shadow-lg" alt="" />
                        </div>
                        <div className="col">
                            <p className="mx-5 mt-2">{character.description}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <h4 className="mt-5">{character.name} Appearances</h4>
                    </div>
                    <div className="row justify-content-center">
                        <div className="row mt-5 justify-content-center">
                            <Link to={`/charactercomics/${character.id}`} className="col-3">
                                <div className="card d-inline-flex bg-info text-white justify-content-center p-0 m-0" >
                                    <img src={comicbook} alt="" className="card-img-top" />
                                    <div className="card-body">
                                        <h6 className="card-title bg-info text-white">Comics: {comicCount}</h6>
                                    </div>
                                </div>
                            </Link>            
                            <div className="col-3">
                                <div className="card d-inline-flex bg-info text-white justify-content-center p-0 m-0" >
                                    <img src={event} alt="" className="card-img-top" />
                                    <div className="card-body">
                                        <h6 className="card-title bg-info text-white">Events: {eventCount}</h6>
                                    </div>
                                </div>
                            </div>                   
                            <div className="col-3">
                                <div className="card d-inline-flex bg-info text-white justify-content-center p-0 m-0" >
                                    <img src={seriesimg} alt="" className="card-img-top" />
                                    <div className="card-body">
                                        <h6 className="card-title bg-info text-white">Events: {seriesCount}</h6>
                                    </div>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<Spinner />)
    }

}

export default Character;