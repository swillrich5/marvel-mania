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
    const [title, setTitle] = useState("");


    useEffect(() => {
        console.log("params = ");
        console.log(match.params);

        const getCharacters = async () => {
            const baseURL = "https://gateway.marvel.com/";
            // const charactersEndpoint = "v1/public/characters?";
            setTitle(match.params.id.substring(match.params.id.lastIndexOf("+") + 1));
            console.log(title);
            const params = match.params.id.substring(0, match.params.id.lastIndexOf("+"));
            console.log("params = " + params);
            const endpoint = 'v1/public/' + params.split('+').join('/');
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
                console.log(res.data.data);
                setCharacters(res.data.data.results);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        getCharacters();
    }, [match, title]);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="container space-background">
            <div className="jumbotron">
                <div className="row justify-content-around">
                        <h3 className="">{title} Characters</h3>
                </div>
                <div className="row">
                    {characters.map(character =>
                        <div className="card mb3" key={character.name}>
                            <div className="card-body">
                                <div className="row">
                                    <p className="lead">{character.name}</p>
                                </div>
                            </div>
                        </div>    
                    )}
                </div>
            </div>
        </div>
        )
    }
}

export default CharactersByURI;
