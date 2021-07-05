import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from '../components/Spinner';

const Comic = ({ match }) => {

    console.log(match.params.id);

    const [comic, setComic] = useState({});
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState("");


    useEffect(() => {
        const getComicDetail = async () => {

            // build the API URL
            console.log("I'm in useEffect for Comic");
            const baseURL = "https://gateway.marvel.com/";
            const comicsEndpoint = "v1/public/comics/";
            let comicURL = baseURL + comicsEndpoint + match.params.id;
    
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
                setComic(res.data.data.results[0]);
                console.log(res.data.data.results[0].thumbnail.path + '/portrait_incredible.jpg');
                console.log(`${res.data.data.results[0].thumbnail.path}/portrait_incredible.${res.data.data.results[0].thumbnail.extension}`);
                setPic(`${res.data.data.results[0].thumbnail.path}/portrait_incredible.${res.data.data.results[0].thumbnail.extension}`);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        getComicDetail();
    }, [match]);


    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="container space-background">
            <div className="jumbotron">
                <div className="row justify-content-center pb-3">
                    <div className="col-4">
                        {/* { (`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`) ? <img className="pl-4 col-5" src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`} alt="" /> : ""} */}
                        <img src={pic} alt="pic"/>
                    </div>
                </div>
    
                <div className="row justify-content-center">
                    <h4 className="text-center">{comic.title}</h4>
                    {comic.description && <p className="mx-5 mt-2">{comic.description}</p>}
                </div>
            </div>
        </div>
        )
    } 
}

export default Comic;
