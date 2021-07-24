
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from '../components/Spinner';
import comicbook from '../images/comicbook.jpg';
import characterimg from '../images/captain-marvel.jpg';
import creators from '../images/stan-lee-comic-img.jpg';

const Event = ({ match }) => {

    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState("");
    const [comicCount, setComicCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [creatorCount, setCreatorCount] = useState(0);
    const [collectionURI, setCollectionURI] = useState("");

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
                console.log(res.data.data.results[0].thumbnail.path + '/detail.jpg');
                console.log(`${res.data.data.results[0].thumbnail.path}/detail.${res.data.data.results[0].thumbnail.extension}`);
                setPic(`${res.data.data.results[0].thumbnail.path}/detail.${res.data.data.results[0].thumbnail.extension}`);
                setLoading(false);
                console.log(res.data.data.results[0].characters.items);
                setComicCount(res.data.data.results[0].comics.available);
                setCharacterCount(res.data.data.results[0].characters.available);
                setCreatorCount(res.data.data.results[0].creators.available);
                setCollectionURI(res.data.data.results[0].characters.collectionURI.replace("http://gateway.marvel.com/v1/public/","").split('/').join('+') + "+" + res.data.data.results[0].title);
                console.log("URI = " + res.data.data.results[0].characters.collectionURI.replace("http://gateway.marvel.com/v1/public/","").split('/').join('+'));
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
                        <div className="col my-3">
                            <img src={pic} className="shadow-lg bg-white rounded" alt="pic"/>
                        </div>
                    </div>
        
                    <div className="row justify-content-center pb-3">
                        <h4 className="text-center">{event.title}</h4>
                        {event.description && <p className="mx-5 mt-2">{event.description}</p>}
                    </div>
                    <div className="row justify-content-center">
                        <Link to={`/charactersbyuri/${collectionURI}`} className="col-3">
                            <div className="card d-inline-flex bg-info text-white justify-content-center p-0 m-0" >
                                <img src={characterimg} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h6 className="card-title bg-info text-white">Characters: {characterCount}</h6>
                                </div>
                            </div>
                        </Link>
                        <div className="col-3">
                            <div className="card d-inline-flex bg-info text-white justify-content-center p-0 m-0" >
                                <img src={comicbook} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h6 className="card-title bg-info text-white">Comics: {comicCount}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card d-inline-flex bg-info text-white justify-content-center p-0 m-0" >
                                <img src={creators} alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h6 className="card-title bg-info text-white">Creators: {creatorCount} </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event;
