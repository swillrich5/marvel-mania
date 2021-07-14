import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from '../components/Spinner';


// The purpose of this page is to render characters whether they are coming from an individual
// comic book, an event, or a series.  The URL is build from the parameter coming in as the IDs
const CharactersByURI = ({ match }) => {


    const [loading, setLoading] = useState(false);
    const [characters, setCharacters] = useState([]);


    useEffect(() => {
        console.log("params = ");
        console.log(match.params);

        const getCharacters = async () => {
            const baseURL = "https://gateway.marvel.com/";
            // const charactersEndpoint = "v1/public/characters?";
            const endpoint = 'v1/public/' + match.params.id.split('+').join('/');
            let fullEndpoint = baseURL + endpoint;

            const ts = Number(new Date());      // timestamp for hash
            const hash = md5.create();
            console.log(process.env.REACT_APP_PRIVATE_KEY);
            console.log(process.env.REACT_APP_PUBLIC_KEY);
            hash.update(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
            console.log(hash);

            try {
                const URL = fullEndpoint + "?apikey=" + process.env.REACT_APP_PUBLIC_KEY + "&ts=" + ts + 
                    "&hash=" + hash;
                console.log(URL);
                setLoading(true);
                const res = await axios.get(URL);
                console.log(res.data);
                setCharacters(res.data.data.results);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        getCharacters();
    }, []);

    return (
        <div>
            <h1> =============== This is Characters.js ================ </h1>
        </div>
    )
}

export default CharactersByURI;
