import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from '../components/Spinner';
import './Home.css';
import './CharacterComic.css';

const EventList = () => {

    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getComicEvents = async () => {

            // build the API URL
            const baseURL = "https://gateway.marvel.com/";
            const comicsEndpoint = "v1/public/events";
            let comicsURL = baseURL + comicsEndpoint;
    
            const ts = Number(new Date());      // timestamp for hash
            const hash = md5.create();
            hash.update(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
            console.log(hash);

            try {
                setLoading(true);
                const URL = comicsURL + "?apikey=" + process.env.REACT_APP_PUBLIC_KEY + 
                    "&ts=" + ts + "&hash=" + hash + "&orderBy=name";
                console.log(URL);
                const res = await axios.get(URL);
                console.log(res.data.data.results);
                setEvents(res.data.data.results);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        getComicEvents();
    }, []);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="container space-background">
                <div className="jumbotron">
                    <div className="row justify-content-center">
                        <h2>Marvel Comics Events</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventList
