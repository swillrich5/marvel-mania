import React, { useState } from 'react';
import CharacterResults from '../components/CharacterResults';

const SearchCharacters = () => {

    const [characterName, setCharacterName] = useState("");
    const [timeToSearch, setTimeToSearch] = useState(false);


    const searchCharacters = async (e) => {
        e.preventDefault();
        if (characterName !== "") {
            setTimeToSearch(true);
        }

    }


    const characterNameChangeHandler = (e) => {
        setCharacterName(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="container space-background">
            <div className="jumbotron">
                <div className="row justify-content-center">
                    <form id="search-form" className="col-lg-6 col-md-12">  
                        <h2>Search Marvel Characters</h2>
                        <div className="form-group form-inline row ml-5">
                            <label htmlFor="characterName" className="space-right">Character Name: </label>
                            <input type="text" name={characterName} value={characterName} onChange={characterNameChangeHandler} className="form-control" id="character-name" />
                            <p>Search by either a full or partial character name</p>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary mt-4 mb-4" onClick={searchCharacters}>Submit</button>
                        </div>
                    </form>
                </div>
                { timeToSearch && <CharacterResults characterName={characterName}/> }
            </div>
        </div>
    )
}

export default SearchCharacters
