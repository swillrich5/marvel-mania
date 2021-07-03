import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import Spinner from './Spinner';
import Pagination from './Pagination';


const CharacterResults = ({ characterName }) => {

    const [ totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);

    const updatePage = () => {

    }


    useEffect(() => {
        const getCharacters = async () => {
            console.log("characterName = " + characterName);
            const baseURL = "https://gateway.marvel.com/";
            const charactersEndpoint = "v1/public/characters?";
            let characterURL = baseURL + charactersEndpoint;

            const ts = Number(new Date());      // timestamp for hash
            const hash = md5.create();
            console.log(process.env.REACT_APP_PRIVATE_KEY);
            console.log(process.env.REACT_APP_PUBLIC_KEY);
            hash.update(ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
            console.log(hash);

            try {
                const URL = characterURL + "apikey=" + process.env.REACT_APP_PUBLIC_KEY + "&ts=" + ts + "&hash=" + hash + "&nameStartsWith=" + characterName;
                console.log(URL);
                setLoading(true);
                const res = await axios.get(URL);
                console.log(res.data);
                setCharacters(res.data.data.results);
                setTotalResults(res.data.data.total);
                console.log("totalResults = " + totalResults);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        getCharacters();
    }, [characterName, totalResults]);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div>
                <div className="row">
                {characters.map(character =>
                    <div key={character.id} className='col-lg-4 col-md-6 col-sm-12 justify-content-around'>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className='row'>
                                    <img className="pl-4 col-5" src={character.thumbnail.path + '/portrait_small.jpg'} alt="" />
                                    <h5 className="card-title col-7 mt-2 pl-0">{character.name}</h5>
                                </div>
                                {/* <p className="card-subtitle scroll mb-2">{character.description}</p> */}
                                {/* <Link to={`/character/${character.id}`} className='btn btn-dark btn-sm my-2'>More</Link> */}
                            </div>
                        </div>
                    </div>
                )}
                </div>
                <Pagination totalResults={totalResults} page={page}/>
            </div>

        )
    }
}

export default CharacterResults
