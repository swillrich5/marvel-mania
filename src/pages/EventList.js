import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                    <div className="row d-block justify-content-center">
                        <h2 className="pb-3">Marvel Comics Events</h2>
                        <p className="lead text-justify px-5">For decades, especially in the 1960's, Marvel has been telling stories not only in standalone comics,
                        but in major plotlines that span multiple comics.  Known as events, these have detailed the first appearance of characters, character deaths, as well as others
                        important developments in the Marvel Comic Universe.  They have ramifications for characters, franchises, and even shared universes.  Here's a 
                        isting of Marvel's major events.</p>
                    </div>
                    <div className="row">
                        {events.map(event =>
                            <Link to={`/event/${event.id}`} key={event.id} className='col-lg-4 col-md-6 col-sm-12 justify-content-around'>
                                <div className="card mx-0 px-0 mb-3">
                                    <div className="card-body mx-0 px-0">
                                        <div className='row d-block align-content-center px-0 mx-0'>
                                            <img className="mb-1 mx-0" src={event.thumbnail.path + '/portrait_uncanny.jpg'} alt="" />
                                            <p className="text-center mt-2 pl-0">{event.title}</p>
                                        </div>
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

export default EventList
