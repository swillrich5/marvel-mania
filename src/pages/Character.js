import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import './Character.css';
import Spinner from '../components/Spinner';


const Character = ({ match }) => {
    console.log(match.params.id);

    const [character, setCharacter] = useState();

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
                    <div className="row justify-content-center pb-3">
                        <div className="col-4">
                            <img src={character.thumbnail.path + '/portrait_incredible.jpg'} className="shadow-lg" alt="" />
                        </div>
                        <div className="col-4">
                            <Link to={`/charactercomics/${character.id}`} className="my-1">Comics: {character.comics.available}</Link>
                            {/* <Link to={`/comics/${character.comics.collectionURI}`} className="my-1">Comics: {character.comics.available}</Link> */}
                            <p className="my-1">Comics: {character.comics.available}</p>
                            <p className="my-1">Events: {character.events.available}</p>
                            <p className="my-1">Series: {character.series.available}</p>
                            <p className="my-1">Stories: {character.stories.available}</p>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <h4>{character.name}</h4>
                        <p className="mx-5 mt-2">{character.description}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<Spinner />)
    }

}

export default Character;