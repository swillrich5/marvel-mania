import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from '../components/Spinner';
import './Comic.css';

const Comic = ({ match }) => {

    console.log(match.params.id);

    const [comic, setComic] = useState({});
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState("");
    const [characters, setCharacters] = useState([]);
    const [variants, setVariants] = useState([]);
    const [prices, setPrices] = useState([]);


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
                console.log(res.data.data.results[0].thumbnail.path + '/detail.jpg');
                console.log(`${res.data.data.results[0].thumbnail.path}/detail.${res.data.data.results[0].thumbnail.extension}`);
                setPic(`${res.data.data.results[0].thumbnail.path}/detail.${res.data.data.results[0].thumbnail.extension}`);
                setCharacters(res.data.data.results[0].characters.items);
                console.log(res.data.data.results[0].characters.items);
                setVariants(res.data.data.results[0].variants);
                setPrices(res.data.data.results[0].prices);
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
                <div className="row justify-content-center mt-3 pb-3">
                    <div className="col">
                        <img src={pic} className="shadow-lg rounded" alt="pic"/>
                    </div>
                </div>
    
                <div className="row justify-content-center pb-3">
                    <h4 className="text-center">{comic.title}</h4>
                    {comic.description && <p className="mx-5 mt-2">{comic.description}</p>}
                </div>
                <div className="row justify-content-center mx-5">
                    <div className="col ml-5">
                        <h5 className="text-left">Characters in this issue:</h5>
                        {characters.map(character =>
                            <ul key={character.name}className="my-0 py-0">
                                {/* regular expression to get last part of URI which is the character ID */}
                                <li className="text-left"><Link to={`/character/${/[^/]*$/.exec(character.resourceURI)[0]}`} className="lead ml-3 my-0 py-0">{character.name}</Link></li>
                            </ul>
                        )}
                    </div>

                    {(variants.length > 0)  && 
                    <div className="col ml-2">
                        <h5 className="text-left">Variant Covers:</h5>
                        {variants.map(variant =>
                            <ul key={variant.name}className="my-0 py-0">
                                {/* regular expression to get last part of URI which is the character ID */}
                                <li className="text-left"><Link to={`/comic/${/[^/]*$/.exec(variant.resourceURI)[0]}`} className="lead ml-3 my-0 py-0">{variant.name}</Link></li>
                            </ul>
                        )}
                    </div> }
                    <div className="col ml-2">
                        <h5 className="text-left">Pricing:</h5>
                        {prices.map(price =>
                            <ul key={price.name}className="my-0 py-0">
                                { (price.type === "printPrice") &&  <li className="lead text-left">Print Price: ${price.price}</li> }
                                { (price.type === "digitalPrice") &&  <li className="lead text-left">Digital Price: ${price.price}</li> }
                                {/* I don't think there's another price type, but the below will catch it just in case */}
                                { (price.type !== "digitalPrice" && price.type !== "printPrice") &&  <li className="lead text-left">Digital Price: ${price.price}</li> }
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
        )
    } 
}

export default Comic;
