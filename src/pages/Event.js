
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from '../components/Spinner';

const Event = ({ match }) => {

    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState("");
    const [characters, setCharacters] = useState([]);
    const [variants, setVariants] = useState([]);
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const getEventDetail = async () => {

            // build the API URL
            console.log("I'm in useEffect for Event");
            const baseURL = "https://gateway.marvel.com/";
            const eventsEndpoint = "v1/public/events/";
            let comicURL = baseURL + eventsEndpoint + match.params.id;
    
            const ts = Number(new Date());      // timestamp for hash
            const hash = md5.create();
            hash.update(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
            console.log(hash);

            try {
                setLoading(true);
                const URL = comicURL + "?apikey=" + process.env.REACT_APP_PUBLIC_KEY + "&ts=" + ts + "&hash=" + hash;
                console.log(URL);
                const res = await axios.get(URL);
                console.log(res.data);
                console.log(res.data.data.results[0]);
                setEvent(res.data.data.results[0]);
                console.log(res.data.data.results[0].thumbnail.path + '/portrait_incredible.jpg');
                console.log(`${res.data.data.results[0].thumbnail.path}/portrait_incredible.${res.data.data.results[0].thumbnail.extension}`);
                setPic(`${res.data.data.results[0].thumbnail.path}/portrait_incredible.${res.data.data.results[0].thumbnail.extension}`);
                setLoading(false);
                setCharacters(res.data.data.results[0].characters.items);
                console.log(res.data.data.results[0].characters.items);
                console.log("Hello from space");
                setVariants(res.data.data.results[0].variants);
                setPrices(res.data.data.results[0].prices);
            }
            catch(err) {
                console.log(err);
            }
        }
        getEventDetail();
    }, [match]);

if (loading) {
    return <Spinner />
    } else {
        return (
            <div className="container space-background">
                <div className="jumbotron">
                    <div className="row justify-content-center pb-3">
                        <div className="col-4">
                            <img src={pic} className="shadow-lg bg-white rounded" alt="pic"/>
                        </div>
                    </div>
        
                    <div className="row justify-content-center pb-3">
                        <h4 className="text-center">{event.title}</h4>
                        {event.description && <p className="mx-5 mt-2">{event.description}</p>}
                    </div>
                    <div className="row">
                        <div className="col">
                            <h5 className="text-left">Characters in this event: </h5>
                            {characters.map(character =>
                                <ul key={character.name} className="my-0 py-0">
                                    {/* regular expression to get last part of URI which is the character ID */}
                                    <li className="text-left"><Link to={`/character/${/[^/]*$/.exec(character.resourceURI)[0]}`} className="lead ml-3 my-0 py-0">{character.name}</Link></li>
                                </ul>    
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event;
